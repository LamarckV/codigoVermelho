import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// Pure textContent extractor as mandated by user instructions
export function extractTextContent(html, { applyHyphenationFix = true } = {}) {
  // 1. Remove comments
  let s = html.replace(/<!--[\s\S]*?-->/g, '');
  // 2. Remove SVGs
  s = s.replace(/<svg\b[\s\S]*?<\/svg>/gi, '');
  // 3. Remove data-ui-chrome and data-excerpt
  s = s.replace(/<([a-z0-9]+)\b[^>]*data-ui-chrome=["']true["'][\s\S]*?<\/\1>/gi, '');
  s = s.replace(/<([a-z0-9]+)\b[^>]*data-excerpt=["']true["'][\s\S]*?<\/\1>/gi, '');
  // 4. Handle hyphenation fix: "consti- tucional" -> "constitucional"
  if (applyHyphenationFix) {
    s = s.replace(/consti-\s*<br\s*\/?>\s*tucional/gi, 'constitucional');
    s = s.replace(/consti-\s+tucional/gi, 'constitucional');
  }
  // 5. Replace block element boundaries with a space to separate paragraphs/headings cleanly
  s = s.replace(/<br\s*\/?>/gi, ' ');
  s = s.replace(/<\/(p|div|li|h[1-6]|header|section|article|aside|figcaption)>/gi, ' ');
  // 6. Inline semantic tags (a, strong, em, span, b, i, mark, picture, source) -> replace with EMPTY string ''
  //    This ensures injected tags like <a href="...">text</a> never inject false spaces around punctuation
  s = s.replace(/<[^>]+>/g, '');
  // 7. Decode HTML entities and normalize whitespace
  return decodeEntities(s).replace(/\s+/g, ' ').trim();
}

export function getAttr(tagHtml, attrName) {
  const re = new RegExp(`\\b${attrName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const m = tagHtml.match(re);
  if (!m) return null;
  return decodeEntities(m[1] ?? m[2] ?? m[3] ?? '');
}

export function extractImages(htmlFragment) {
  // Ignore images inside UI chrome
  let cleaned = htmlFragment.replace(/<!--[\s\S]*?-->/g, '');
  cleaned = cleaned.replace(/<([a-z0-9]+)\b[^>]*data-ui-chrome=["']true["'][\s\S]*?<\/\1>/gi, '');
  const imgs = [];
  const re = /<img\b[^>]*>/gi;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const tag = m[0];
    const src = getAttr(tag, 'src') || '';
    const alt = getAttr(tag, 'alt') ?? '';
    const asset = src.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    imgs.push({
      src,
      basename: path.posix.basename(asset),
      alt,
    });
  }
  return imgs;
}

export function extractCharts(htmlFragment) {
  let cleaned = htmlFragment.replace(/<!--[\s\S]*?-->/g, '');
  cleaned = cleaned.replace(/<([a-z0-9]+)\b[^>]*data-ui-chrome=["']true["'][\s\S]*?<\/\1>/gi, '');
  const charts = [];
  const re = /<figure\b[^>]*>/gi;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const type = getAttr(m[0], 'data-chart');
    if (type) charts.push(type);
  }
  return charts;
}

export function parseSectionsFromHtml(htmlContent) {
  const tagRe = /<(section)\b([^>]*)>|<\/(section)>/gi;
  const stack = [];
  const sections = [];
  let m;
  while ((m = tagRe.exec(htmlContent)) !== null) {
    if (m[1]) {
      const attrs = m[2];
      stack.push({
        contentStart: tagRe.lastIndex,
        attrs,
        id: getAttr(`<section ${attrs}>`, 'id'),
        dataPage: getAttr(`<section ${attrs}>`, 'data-page'),
        ariaLabel: getAttr(`<section ${attrs}>`, 'aria-label'),
        ariaLabelledby: getAttr(`<section ${attrs}>`, 'aria-labelledby')
      });
    } else if (m[3]) {
      const item = stack.pop();
      if (item && item.id) {
        const innerHtml = htmlContent.slice(item.contentStart, m.index);
        const normalizedText = extractTextContent(innerHtml, { applyHyphenationFix: true });
        const images = extractImages(innerHtml);
        const charts = extractCharts(innerHtml);
        sections.push({
          id: item.id,
          dataPage: item.dataPage,
          ariaLabel: item.ariaLabel,
          ariaLabelledby: item.ariaLabelledby,
          normalizedText,
          images: images.map(i => ({ basename: i.basename, alt: i.alt })),
          charts,
          innerHtml
        });
      }
    }
  }
  return sections;
}

export function generateSnapshot(origHtmlPath, targetJsonPath) {
  const origHtml = fs.readFileSync(origHtmlPath, 'utf8');
  const sections = parseSectionsFromHtml(origHtml);
  
  const thematicGroups = [
    { group: 'capa', sectionIds: ['capa'] },
    { group: 'sumario', sectionIds: ['sumario'] },
    { group: 'editorial', sectionIds: ['editorial-1', 'editorial-2'] },
    { group: 'contexto', sectionIds: ['contexto-1', 'contexto-2'] },
    { group: 'reportagem', sectionIds: ['reportagem-1', 'reportagem-2'] },
    { group: 'direito', sectionIds: ['direito-1', 'direito-2'] },
    { group: 'subemprego', sectionIds: ['subemprego', 'subemprego-2'] },
    { group: 'intervencao', sectionIds: ['intervencao'] },
    { group: 'expediente', sectionIds: ['expediente'] },
    { group: 'referencias', sectionIds: ['referencias'] }
  ].map(g => {
    const matched = sections.filter(s => g.sectionIds.includes(s.id));
    const combinedText = matched.map(s => s.normalizedText).join(' ');
    const images = matched.flatMap(s => s.images);
    const charts = matched.flatMap(s => s.charts);
    return {
      group: g.group,
      sectionIds: g.sectionIds,
      normalizedText: combinedText,
      images,
      imageCount: images.length,
      chartCount: charts.length + images.filter(i => i.basename.startsWith('grafico-')).length,
      sha256: crypto.createHash('sha256').update(combinedText).digest('hex')
    };
  });

  const allImages = sections.flatMap(s => s.images);
  const allCharts = sections.flatMap(s => s.charts);
  const fullText = sections.map(s => s.normalizedText).join(' ');
  const snapshot = {
    source: path.basename(origHtmlPath),
    generatedAt: new Date().toISOString(),
    pageCount: sections.length,
    thematicGroupCount: thematicGroups.length,
    totalImages: allImages.length,
    totalCharts: allCharts.length + allImages.filter(i => i.basename.startsWith('grafico-')).length,
    globalHash: crypto.createHash('sha256').update(fullText).digest('hex'),
    sections: sections.map(s => ({
      id: s.id,
      dataPage: s.dataPage,
      ariaLabel: s.ariaLabel,
      ariaLabelledby: s.ariaLabelledby,
      normalizedText: s.normalizedText,
      images: s.images,
      charts: s.charts,
      sha256: crypto.createHash('sha256').update(s.normalizedText).digest('hex')
    })),
    thematicGroups
  };

  if (!fs.existsSync(path.dirname(targetJsonPath))) {
    fs.mkdirSync(path.dirname(targetJsonPath), { recursive: true });
  }
  fs.writeFileSync(targetJsonPath, JSON.stringify(snapshot, null, 2), 'utf8');
  return snapshot;
}

export function verifySite(siteHtmlPath, snapshotJsonPath) {
  const snapshot = JSON.parse(fs.readFileSync(snapshotJsonPath, 'utf8'));
  const siteHtml = fs.readFileSync(siteHtmlPath, 'utf8');
  const siteSections = parseSectionsFromHtml(siteHtml);

  const errors = [];
  const warnings = [];

  // 1. Verificação de seções e contagem
  if (siteSections.length < snapshot.pageCount) {
    errors.push(`Contagem de seções insuficiente: esperado ${snapshot.pageCount}, obtido ${siteSections.length}`);
  }

  // 2. Verificação de imagens
  const allSiteImages = extractImages(siteHtml);
  const allSiteCharts = siteSections.flatMap(s => s.charts);
  const expectedCharts = snapshot.sections.flatMap(s => s.charts ?? []);
  const countByType = charts => charts.reduce((counts, type) => {
    counts.set(type, (counts.get(type) || 0) + 1);
    return counts;
  }, new Map());
  const expectedChartCounts = countByType(expectedCharts);
  const actualChartCounts = countByType(allSiteCharts);
  for (const type of new Set([...expectedChartCounts.keys(), ...actualChartCounts.keys()])) {
    const expected = expectedChartCounts.get(type) || 0;
    const actual = actualChartCounts.get(type) || 0;
    if (expected !== actual) {
      errors.push(`Contagem do gráfico "${type}" divergente: esperado ${expected}, obtido ${actual}`);
    }
  }
  for (const expectedImg of snapshot.sections.flatMap(s => s.images)) {
    const found = allSiteImages.find(i => i.basename === expectedImg.basename);
    if (!found) {
      errors.push(`Imagem esperada ausente: ${expectedImg.basename}`);
    } else if (found.alt !== expectedImg.alt) {
      errors.push(`Alt text divergente para ${expectedImg.basename}:\nEsperado: "${expectedImg.alt}"\nObtido:   "${found.alt}"`);
    }
  }

  // 3. Verificação estrita de textContent por seção
  for (const origSec of snapshot.sections) {
    const target = siteSections.find(s => s.id === origSec.id || s.dataPage === origSec.dataPage);
    if (!target) {
      errors.push(`Seção original #${origSec.id} (p. ${origSec.dataPage}) não encontrada no site`);
      continue;
    }

    if (target.normalizedText !== origSec.normalizedText) {
      errors.push(`Divergência de texto em #${origSec.id} (p. ${origSec.dataPage}):\nEsperado [${origSec.normalizedText.length}c]: "${origSec.normalizedText.slice(0, 100)}..."\nObtido   [${target.normalizedText.length}c]: "${target.normalizedText.slice(0, 100)}..."`);
    }
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    verifiedPages: snapshot.pageCount,
    verifiedImages: allSiteImages.length,
    verifiedCharts: allSiteCharts.length,
    globalHash: snapshot.globalHash
  };
}

if (process.argv[1] && process.argv[1].endsWith('verify-content.mjs')) {
  const mode = process.argv[2] || '--verify';
  const inSiteDir = fs.existsSync(path.resolve('_audit/original-content.json'));
  const origHtml = inSiteDir ? path.resolve('index.html') : path.resolve('site/index.html');
  const snapshotJson = inSiteDir ? path.resolve('_audit/original-content.json') : path.resolve('site/_audit/original-content.json');
  const siteHtml = inSiteDir ? path.resolve('index.html') : path.resolve('site/index.html');
  if (mode === '--snapshot') {
    const res = generateSnapshot(origHtml, snapshotJson);
    console.log(`[Snapshot gerado] ${snapshotJson} | Páginas: ${res.pageCount} | Imagens: ${res.totalImages} | Gráficos: ${res.totalCharts}`);
  } else if (mode === '--verify') {
    const res = verifySite(siteHtml, snapshotJson);
    if (res.success) {
      console.log(`\n======================================================`);
      console.log(`✓ GUARDIÃO DO CONTEÚDO: APROVADO`);
      console.log(`======================================================`);
      console.log(`- Páginas verificadas: ${res.verifiedPages} (TODAS)`);
      console.log(`- Imagens verificadas: ${res.verifiedImages}`);
      console.log(`- Gráficos interativos verificados: ${res.verifiedCharts}`);
      console.log(`- Divergências de texto: ZERO (fiel ao snapshot canônico)`);
      console.log(`- Textos, imagens e tipos de gráfico comparados com o snapshot.`);
    } else {
      console.error(`\n======================================================`);
      console.error(`✗ GUARDIÃO DO CONTEÚDO: REPROVADO (${res.errors.length} erros)`);
      console.error(`======================================================`);
      res.errors.forEach(e => console.error(`- ${e}`));
      process.exit(1);
    }
  }
}
