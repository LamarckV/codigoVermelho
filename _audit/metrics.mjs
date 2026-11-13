import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const WIDTHS = [320, 390, 768, 1024, 1280, 1440, 1920, 2560];

const BROWSER_PATHS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
];

function getBrowserPath() {
  for (const p of BROWSER_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Nenhum executável de navegador compatível encontrado');
}

export function measureCss(cssDir) {
  const files = ['tokens.css', 'editorial.css', 'landing.css', 'sections.css', 'styles.css'];
  let totalBytes = 0;
  let totalImportant = 0;
  const breakdown = {};

  for (const f of files) {
    const fullPath = path.join(cssDir, f);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const bytes = Buffer.byteLength(content, 'utf8');
      const importantMatches = content.match(/!important/g) || [];
      breakdown[f] = {
        bytes,
        importantCount: importantMatches.length
      };
      totalBytes += bytes;
      totalImportant += importantMatches.length;
    }
  }

  return {
    totalBytes,
    totalImportant,
    breakdown
  };
}

export async function runMetrics({
  takeScreenshots = false,
  screenshotDir = '_audit/screenshots/baseline',
  saveBaseline = false,
  baselinePath = '_audit/baseline.json'
} = {}) {
  const browserPath = getBrowserPath();
  const cssDir = path.resolve('css');
  const indexHtml = path.resolve('index.html');
  const fileUrl = 'file:///' + indexHtml.replace(/\\/g, '/');

  const cssMetrics = measureCss(cssDir);

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1']
  });

  const report = {
    timestamp: new Date().toISOString(),
    css: cssMetrics,
    widths: {}
  };

  try {
    for (const width of WIDTHS) {
      console.log(`[metrics] Analisando largura ${width}px...`);
      const page = await browser.newPage();
      await page.setViewport({ width, height: 900 });
      await page.goto(fileUrl, { waitUntil: 'load' });

      // Rolar até o fim e voltar para disparar observers e transições
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 800;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 30);
        });
      });
      await new Promise((r) => setTimeout(r, 200));

      const evaluation = await page.evaluate(() => {
        // (a) Seções com aspect-ratio fixo, max-height ou overflow != visible
        const sections = Array.from(document.querySelectorAll('section'));
        const offendingSections = [];
        const sectionIds = [];

        sections.forEach((sec) => {
          const comp = window.getComputedStyle(sec);
          const id = sec.id || sec.getAttribute('data-page') || 'sem-id';
          sectionIds.push(id);
          const hasFixedAspect = comp.aspectRatio && comp.aspectRatio !== 'auto';
          const hasMaxHeight = comp.maxHeight && comp.maxHeight !== 'none';
          const hasOverflowIssue = comp.overflowY !== 'visible' || comp.overflowX !== 'visible';

          if (hasFixedAspect || hasMaxHeight || hasOverflowIssue) {
            offendingSections.push({
              id,
              aspectRatio: comp.aspectRatio,
              maxHeight: comp.maxHeight,
              overflowX: comp.overflowX,
              overflowY: comp.overflowY
            });
          }
        });

        // (b) Elementos cuja caixa excede a do contêiner direto
        const overflowingElements = [];
        const allElements = Array.from(document.querySelectorAll('section *'));
        allElements.forEach((el) => {
          if (el.tagName === 'SVG' || el.tagName === 'PATH') return;
          const parent = el.parentElement;
          if (!parent) return;
          const rect = el.getBoundingClientRect();
          const pRect = parent.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0 || pRect.width === 0) return;

          // Se passar mais de 3px da borda do contêiner
          const overflowsRight = rect.right > pRect.right + 3;
          const overflowsLeft = rect.left < pRect.left - 3;
          const overflowsBottom = rect.bottom > pRect.bottom + 3;

          const parentComp = window.getComputedStyle(parent);
          if (parentComp.overflowY === 'hidden' || parentComp.overflowY === 'auto' || parentComp.overflowY === 'scroll') {
            if (overflowsBottom) {
              overflowingElements.push({
                tag: el.tagName.toLowerCase(),
                className: el.className || '',
                parentId: parent.id || parent.className || parent.tagName,
                reason: `Corta verticalmente no container (${Math.round(rect.bottom - pRect.bottom)}px)`
              });
            }
          }

          if (overflowsRight || overflowsLeft) {
            // Ignorar elementos intencionais de full-bleed ou pseudo
            if (el.classList.contains('site-header') || el.classList.contains('site-nav')) return;
            overflowingElements.push({
              tag: el.tagName.toLowerCase(),
              className: el.className || '',
              parentId: parent.id || parent.className || parent.tagName,
              reason: `Excede largura do container (${Math.round(rect.right - pRect.right)}px)`
            });
          }
        });

        // (c) scrollWidth > innerWidth
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        const hasHorizontalScroll = scrollWidth > innerWidth;

        // (d) Texto corrido com text-align != justify
        // Avaliar parágrafos que são prosa (ignora folios, títulos, botões, legendas curtas, links do menu)
        const paragraphs = Array.from(document.querySelectorAll('section p'));
        const unjustifiedParagraphs = [];
        let totalProseParagraphs = 0;

        paragraphs.forEach((p) => {
          const comp = window.getComputedStyle(p);
          const text = p.textContent.trim();
          // Avaliar exclusivamente parágrafos que são prosa/texto corrido (não justificar o que não é prosa: boxes, standfirst, expediente, referências com recuo)
          const isNotProse = p.closest('.box') || p.closest('.expediente-info') || p.closest('.references-list') || p.classList.contains('standfirst') || p.classList.contains('deck') || p.closest('.site-nav') || p.closest('.site-header') || p.classList.contains('folio');
          if (text.length > 70 && !isNotProse) {
            totalProseParagraphs++;
            if (comp.textAlign !== 'justify') {
              unjustifiedParagraphs.push({
                textSnippet: text.slice(0, 50) + '...',
                textAlign: comp.textAlign,
                sectionId: p.closest('section')?.id || 'fora'
              });
            }
          }
        });

        // (e) Altura total do documento
        const scrollHeight = document.documentElement.scrollHeight;

        return {
          sectionIds,
          offendingSections,
          overflowingElementsCount: overflowingElements.length,
          overflowingSample: overflowingElements.slice(0, 5),
          hasHorizontalScroll,
          scrollWidth,
          innerWidth,
          totalProseParagraphs,
          unjustifiedCount: unjustifiedParagraphs.length,
          unjustifiedSample: unjustifiedParagraphs.slice(0, 5),
          scrollHeight
        };
      });

      report.widths[width] = evaluation;

      // Screenshots se solicitado
      if (takeScreenshots) {
        const targetDir = path.resolve(screenshotDir, String(width));
        fs.mkdirSync(targetDir, { recursive: true });

        // Screenshot página inteira
        await page.screenshot({
          path: path.join(targetDir, 'fullpage.png'),
          fullPage: true
        });

        // Screenshots por seção
        const sections = await page.$$('section');
        for (const sec of sections) {
          const id = await sec.evaluate((el) => el.id || el.getAttribute('data-page') || 'sem-id');
          try {
            await sec.screenshot({
              path: path.join(targetDir, `${id}.png`)
            });
          } catch (e) {
            // Caso seção tenha tamanho 0
          }
        }
      }

      await page.close();
    }

    if (saveBaseline) {
      fs.mkdirSync(path.dirname(path.resolve(baselinePath)), { recursive: true });
      fs.writeFileSync(path.resolve(baselinePath), JSON.stringify(report, null, 2), 'utf8');
      console.log(`[metrics] Baseline gravado com sucesso em ${baselinePath}`);
    }

    return report;
  } finally {
    await browser.close();
  }
}

// Execução direta por CLI
if (process.argv[1] && process.argv[1].endsWith('metrics.mjs')) {
  const isBaseline = process.argv.includes('--baseline');
  const isFinal = process.argv.includes('--final');
  const withScreenshots = process.argv.includes('--screenshots') || isBaseline || isFinal;
  const isCompare = process.argv.includes('--compare') || isFinal;
  const screenshotDir = isFinal ? '_audit/screenshots/final' : '_audit/screenshots/baseline';

  console.log(`======================================================`);
  console.log(`METRICS & AUDITORIA DE LAYOUT (site/_audit/metrics.mjs)`);
  console.log(`Modo: ${isBaseline ? 'GRAVAR BASELINE' : isFinal ? 'AUDITORIA FINAL & COMPARACAO' : isCompare ? 'COMPARAR COM BASELINE' : 'AUDITORIA'}`);
  console.log(`Screenshots: ${withScreenshots ? 'SIM (' + screenshotDir + ')' : 'NÃO'}`);
  console.log(`======================================================\n`);

  runMetrics({
    takeScreenshots: withScreenshots,
    screenshotDir,
    saveBaseline: isBaseline
  }).then((report) => {
    console.log(`\nRESUMO DE CSS:`);
    console.log(`- Tamanho total: ${report.css.totalBytes} bytes`);
    console.log(`- Total de !important: ${report.css.totalImportant}`);

    console.log(`\nRESUMO POR LARGURA:`);
    for (const w of WIDTHS) {
      const data = report.widths[w];
      console.log(`\n[${w}px]`);
      console.log(`  - Altura total: ${data.scrollHeight}px`);
      console.log(`  - Overflow horizontal: ${data.hasHorizontalScroll ? `SIM (scrollWidth: ${data.scrollWidth}px > innerWidth: ${data.innerWidth}px)` : 'NÃO'}`);
      console.log(`  - Seções com aspect-ratio / max-height / overflow != visible: ${data.offendingSections.length}`);
      console.log(`  - Elementos com overflow no container: ${data.overflowingElementsCount}`);
      console.log(`  - Parágrafos de prosa não-justificados: ${data.unjustifiedCount} / ${data.totalProseParagraphs}`);
    }

    if (isCompare) {
      const baselineFile = path.resolve('_audit/baseline.json');
      if (fs.existsSync(baselineFile)) {
        const baseline = JSON.parse(fs.readFileSync(baselineFile, 'utf8'));
        console.log(`\n======================================================`);
        console.log(`COMPARAÇÃO COM BASELINE:`);
        console.log(`- CSS Bytes: ${baseline.css.totalBytes} -> ${report.css.totalBytes} (${report.css.totalBytes - baseline.css.totalBytes >= 0 ? '+' : ''}${report.css.totalBytes - baseline.css.totalBytes})`);
        console.log(`- !important: ${baseline.css.totalImportant} -> ${report.css.totalImportant} (${report.css.totalImportant - baseline.css.totalImportant >= 0 ? '+' : ''}${report.css.totalImportant - baseline.css.totalImportant})`);
        for (const w of WIDTHS) {
          const b = baseline.widths[w];
          const c = report.widths[w];
          console.log(`[${w}px] Altura: ${b.scrollHeight}px -> ${c.scrollHeight}px | Seções rígidas: ${b.offendingSections.length} -> ${c.offendingSections.length} | Prosa não-justificada: ${b.unjustifiedCount} -> ${c.unjustifiedCount}`);
        }
        console.log(`======================================================\n`);
      }
    }
  }).catch((err) => {
    console.error('Erro ao executar metrics:', err);
    process.exit(1);
  });
}
