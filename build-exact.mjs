import fs from 'node:fs';
import path from 'node:path';
import { extractTextContent, verifySite } from './_audit/verify-content.mjs';

const origHtml = fs.readFileSync('index.html', 'utf8');

// Extract each section
const secRe = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
const sections = {};
let m;
while ((m = secRe.exec(origHtml)) !== null) {
  const openAttrs = m[1];
  const innerHtml = m[2];
  const idMatch = openAttrs.match(/\bid=["']([^"']+)["']/i);
  if (idMatch) {
    sections[idMatch[1]] = { openAttrs, innerHtml };
  }
}

function replaceOnce(str, search, replacement) {
  if (!str.includes(search)) {
    console.error(`NOT FOUND: "${search}"`);
    return str;
  }
  return str.replace(search, replacement);
}

const processed = {};
for (const [id, sec] of Object.entries(sections)) {
  let content = sec.innerHtml;

  // Path adjustments
  content = content.replace(/dist\/assets\//g, 'assets/');

  // Replace manual hyphenation in #direito-1
  if (id === 'direito-1') {
    content = content.replace(/consti-\s*<br\s*\/?>\s*tucional/gi, 'constitucional');
  }

  // Links in #editorial-1
  if (id === 'editorial-1') {
    content = replaceOnce(content, 'Matteo Pasquinelli', '<a href="#ref-pasquinelli-2023">Matteo Pasquinelli</a>');
    content = replaceOnce(content, 'Daron Acemoglu e Pascual Restrepo', '<a href="#ref-acemoglu-2018">Daron Acemoglu e Pascual Restrepo</a>');
    content = replaceOnce(content, '"proteção em face da automação"', '"<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">proteção em face da automação</a>"');
    content = replaceOnce(content, 'Convenção nº 158 da Organização Internacional do Trabalho (OIT)', '<a href="#ref-oit-158">Convenção nº 158 da Organização Internacional do Trabalho (OIT)</a>');
    content = replaceOnce(content, 'Tema 638', '<a href="https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=638" target="_blank" rel="noopener noreferrer">Tema 638</a>');
    content = replaceOnce(content, 'Artigo 20 da Lei Geral de Proteção de Dados (LGPD)', '<a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer">Artigo 20 da Lei Geral de Proteção de Dados (LGPD)</a>');
    content = replaceOnce(content, 'Artigo 2º da CLT', '<a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener noreferrer">Artigo 2º da CLT</a>');
    content = replaceOnce(content, 'Súmula 443 do TST', '<a href="#ref-tst-443">Súmula 443 do TST</a>');
  }

  // Links in #editorial-2
  if (id === 'editorial-2') {
    content = replaceOnce(content, 'Fórum Econômico Mundial', '<a href="#ref-wef-2023">Fórum Econômico Mundial</a>');
    content = replaceOnce(content, 'CAGED', '<a href="#ref-caged-2023">CAGED</a>');
  }

  // Links in #contexto-1
  if (id === 'contexto-1') {
    content = replaceOnce(content, 'Estrada, 2022', '<a href="#ref-estrada-2022">Estrada, 2022</a>');
    content = replaceOnce(content, 'Oliveira, 2025', '<a href="#ref-oliveira-2025">Oliveira, 2025</a>');
    content = replaceOnce(content, 'Matteo Pasquinelli', '<a href="#ref-pasquinelli-2023">Matteo Pasquinelli</a>');
    content = replaceOnce(content, 'Mary Gray', '<a href="#ref-gray-2019">Mary Gray</a>');
  }

  // Links in #contexto-2
  if (id === 'contexto-2') {
    content = replaceOnce(content, 'CAGED', '<a href="#ref-caged-2023">CAGED</a>');
    content = replaceOnce(content, 'Barbosa, 2023', '<a href="#ref-barbosa-2023">Barbosa, 2023</a>');
  }

  // Links in #direito-1
  if (id === 'direito-1') {
    content = replaceOnce(content, 'proteção em face da automação, na forma da lei', '<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">proteção em face da automação, na forma da lei</a>');
    content = replaceOnce(content, 'Artigo 7º, inciso XXVII', '<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">Artigo 7º, inciso XXVII</a>');
    content = replaceOnce(content, 'Convenção nº 158 da Organização Internacional do Trabalho (OIT)', '<a href="#ref-oit-158">Convenção nº 158 da Organização Internacional do Trabalho (OIT)</a>');
    content = replaceOnce(content, '(ADI 1625)', '(<a href="https://portal.stf.jus.br/processos/detalhe.asp?incidente=1693351" target="_blank" rel="noopener noreferrer">ADI 1625</a>)');
  }

  // Links in #direito-2
  if (id === 'direito-2') {
    content = replaceOnce(content, 'Artigo 20 da Lei Geral de Proteção de Dados (LGPD)', '<a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer">Artigo 20 da Lei Geral de Proteção de Dados (LGPD)</a>');
    content = replaceOnce(content, 'Artigo 2º da CLT', '<a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener noreferrer">Artigo 2º da CLT</a>');
    content = replaceOnce(content, 'Súmula 443 do TST', '<a href="#ref-tst-443">Súmula 443 do TST</a>');
  }

  // Links in #subemprego
  if (id === 'subemprego') {
    content = replaceOnce(content, 'Organização Internacional do Trabalho (OIT)', '<a href="#ref-oit-158">Organização Internacional do Trabalho (OIT)</a>');
    content = replaceOnce(content, 'CESIT', '<a href="#ref-cesit-2016">CESIT</a>');
    content = replaceOnce(content, 'Pesquisa Nacional por Amostra de Domicílios Contínua (PNAD Contínua) do IBGE', '<a href="#ref-ibge-pnad">Pesquisa Nacional por Amostra de Domicílios Contínua (PNAD Contínua) do IBGE</a>');
  }

  // Links in #subemprego-2
  if (id === 'subemprego-2') {
    content = replaceOnce(content, 'Ricardo Antunes', '<a href="#ref-antunes-2018">Ricardo Antunes</a>');
  }

  // Links in #intervencao
  if (id === 'intervencao') {
    content = replaceOnce(content, 'Projetos de Lei nº 1.091/2019', '<a href="https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2192770" target="_blank" rel="noopener noreferrer">Projetos de Lei nº 1.091/2019</a>');
    content = replaceOnce(content, 'nº 2.421/2023', '<a href="https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2362483" target="_blank" rel="noopener noreferrer">nº 2.421/2023</a>');
    content = replaceOnce(content, 'Artigo 7º, incisos I e XXVII da Constituição Federal', '<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">Artigo 7º, incisos I e XXVII da Constituição Federal</a>');
    content = replaceOnce(content, 'Convenção nº 158 da OIT', '<a href="#ref-oit-158">Convenção nº 158 da OIT</a>');
    content = replaceOnce(content, 'Cunha, 2024', '<a href="#ref-cunha-2024">Cunha, 2024</a>');
    content = replaceOnce(content, 'Artigo 20 da LGPD', '<a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer">Artigo 20 da LGPD</a>');
  }

  // References IDs
  if (id === 'referencias') {
    const refIds = [
      'ref-acemoglu-2018', 'ref-acemoglu-2020', 'ref-antunes-2018', 'ref-antunes-2020',
      'ref-azevedo-1985', 'ref-barbosa-2023', 'ref-cf88', 'ref-clt',
      'ref-lgpd', 'ref-pl-1091', 'ref-pl-2421', 'ref-caged-2023',
      'ref-caliendo-2024', 'ref-cesit-2016', 'ref-cunha-2024', 'ref-estrada-2022',
      'ref-fgv-2023', 'ref-gray-2019', 'ref-ibge-pnad', 'ref-oliveira-2025',
      'ref-oit-158', 'ref-pasquinelli-2023', 'ref-adi-1625', 'ref-tema-638',
      'ref-tst-443', 'ref-wef-2023'
    ];
    let refIdx = 0;
    content = content.replace(/<p>/g, () => `<p id="${refIds[refIdx++]}">`);
  }

  // Wrap images in <picture>
  content = content.replace(/<img\b([^>]*)src=["']assets\/([^"']+\.png)["']([^>]*)>/gi, (match, before, filename, after) => {
    const base = filename.replace(/\.png$/, '');
    const isHero = base === 'capa-foto' || base === 'codigo-vermelho-logo' || base === 'editora-404-logo';
    const lazyAttr = isHero ? '' : ' loading="lazy"';
    return `<picture><source srcset="assets/${base}.webp" type="image/webp"><img ${before}src="assets/${filename}"${after}${lazyAttr}></picture>`;
  });

  // Add chart zoom button with data-ui-chrome="true"
  content = content.replace(/(<figure\b[^>]*class=["'][^"']*\bchart\b[^"']*["'][^>]*>)/gi, `$1<button class="chart-zoom-btn" type="button" data-ui-chrome="true" aria-label="Ampliar gráfico em alta resolução">Ampliar ⤢</button>`);

  processed[id] = content;
}

// 2. Assembly of Blocks
// Bloco A: Header + Capa + Sumário
const headerChrome = `
<header class="site-header" role="banner" data-ui-chrome="true">
  <div class="reading-progress-track" aria-hidden="true">
    <span class="reading-progress-bar" id="readingProgressBar"></span>
  </div>
  <a class="site-header__brand" href="#capa" aria-label="Código Vermelho - Voltar à Capa">
    <img class="site-header__logo" src="assets/codigo-vermelho-logo.png" alt="Código Vermelho" width="354" height="144">
    <span class="site-header__tagline">Revista Digital // Ed. 1</span>
  </a>
  <nav class="site-nav" id="siteNav" aria-label="Navegação principal da revista Código Vermelho">
    <ul class="site-nav__list">
      <li><a class="site-nav__link" href="#capa">Capa</a></li>
      <li><a class="site-nav__link" href="#sumario">Sumário</a></li>
      <li><a class="site-nav__link" href="#editorial-1">Editorial</a></li>
      <li><a class="site-nav__link" href="#contexto-1">Contexto</a></li>
      <li><a class="site-nav__link" href="#reportagem-1">Reportagem</a></li>
      <li><a class="site-nav__link" href="#direito-1">Direito</a></li>
      <li><a class="site-nav__link" href="#subemprego">Subemprego</a></li>
      <li><a class="site-nav__link" href="#intervencao">Proposta</a></li>
      <li><a class="site-nav__link" href="#expediente">Equipe</a></li>
      <li><a class="site-nav__link" href="#referencias">Fontes</a></li>
    </ul>
  </nav>
  <div class="site-header__controls">
    <span class="reading-counter" id="readingCounter" aria-live="polite" aria-atomic="true">01 / 10</span>
    <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="siteNav" aria-label="Abrir menu de navegação">
      ☰
    </button>
  </div>
</header>
`;

const blockA = `
${headerChrome}

<!-- Frame 01 · Capa -->
<section id="capa" class="page page-cover site-hero" data-page="01" aria-label="Capa">
${processed['capa']}
</section>

<!-- Frame 02 · Sumário -->
<section id="sumario" class="page page-light page-summary site-summary" data-page="02" aria-labelledby="sumario-title">
${processed['sumario']}
</section>
`;

// Bloco B: Editorial (p.3 + p.4) + Contextualização (p.5 + p.6)

const blockB = `

<!-- Frame 03 · Editorial p. 03 -->
<section id="editorial-1" class="page page-light site-section site-editorial" data-page="03" aria-label="Editorial, página 3">
${processed['editorial-1']}
</section>

<!-- Frame 04 · Editorial p. 04 -->
<section id="editorial-2" class="page page-light site-section site-editorial" data-page="04" aria-label="Editorial, página 4">
${processed['editorial-2']}
</section>

<!-- Frame 05 · Contextualização p. 05 -->
<section id="contexto-1" class="page page-light site-section site-contexto" data-page="05" aria-label="Contextualização, página 5">
${processed['contexto-1']}
</section>

<!-- Frame 06 · Contextualização p. 06 -->
<section id="contexto-2" class="page page-light site-section site-contexto" data-page="06" aria-label="Contextualização, página 6">
${processed['contexto-2']}
</section>
`;

// Bloco C: Reportagem Escura (p.7 + p.8) + Direito em Xeque (p.9 + p.10)
const blockC = `
<!-- Frame 07 · Reportagem p. 07 -->
<section id="reportagem-1" class="page page-dark site-section site-reportagem site-dark" data-page="07" aria-label="Reportagem, página 7">
${processed['reportagem-1']}
</section>

<!-- Frame 08 · Reportagem p. 08 -->
<section id="reportagem-2" class="page page-dark site-section site-reportagem site-dark" data-page="08" aria-label="Reportagem, página 8">
${processed['reportagem-2']}
</section>

<!-- Frame 09 · Direito em Xeque p. 09 -->
<section id="direito-1" class="page page-light site-section site-direito" data-page="09" aria-label="Direito em Xeque, página 9">
${processed['direito-1']}
</section>

<!-- Frame 10 · Direito em Xeque p. 10 -->
<section id="direito-2" class="page page-light site-section site-direito" data-page="10" aria-label="Direito em Xeque, página 10">
${processed['direito-2']}
</section>
`;

// Bloco D: Subemprego (p.11 + p.12) + Proposta de Intervenção (p.13)
const blockD = `
<!-- Frame 11 · O Labirinto do Subemprego p. 11 -->
<section id="subemprego" class="page page-light site-section site-subemprego" data-page="11" aria-label="O Labirinto do Subemprego, página 11">
${processed['subemprego']}
</section>

<!-- Frame 12 · O Labirinto do Subemprego p. 12 -->
<section id="subemprego-2" class="page page-light site-section site-subemprego" data-page="12" aria-label="O Labirinto do Subemprego, página 12">
${processed['subemprego-2']}
</section>

<!-- Frame 13 · Proposta de Intervenção p. 13 -->
<section id="intervencao" class="page page-light site-section site-intervencao" data-page="13" aria-label="Proposta de Intervenção, página 13">
${processed['intervencao']}
</section>
`;

// Bloco E: Expediente (p.14) + Referências (p.15) + Footer
const footerChrome = `
<footer class="site-footer" data-ui-chrome="true">
  <div class="site-footer__inner">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <img src="assets/codigo-vermelho-logo.png" alt="Código Vermelho" width="220" style="filter: brightness(0) invert(1); margin-bottom: 8px;">
        <p style="margin: 0; font-family: var(--font-body); font-size: 14px; opacity: 0.9;">Trabalho descartável: até quando vamos fingir que isso é progresso?</p>
      </div>
      <a class="back-to-top" href="#capa" id="backToTopBtn" aria-label="Voltar ao topo da página">
        Voltar ao topo ↑
      </a>
    </div>
  </div>
</footer>

<dialog class="chart-dialog" id="chartDialog" aria-labelledby="chartDialogCaption" data-ui-chrome="true">
  <button type="button" class="chart-dialog__close" id="chartDialogClose" aria-label="Fechar janela de visualização do gráfico">×</button>
  <img class="chart-dialog__img" id="chartDialogImg" src="" alt="">
  <p class="chart-dialog__caption" id="chartDialogCaption"></p>
</dialog>
`;

const blockE = `
<!-- Frame 14 · Expediente e Integrantes p. 14 -->
<section id="expediente" class="page page-light site-section site-expediente" data-page="14" aria-label="Expediente e Integrantes, página 14">
${processed['expediente']}
</section>

<!-- Frame 15 · Referências Bibliográficas p. 15 -->
<section id="referencias" class="page page-light page-refs site-section site-referencias" data-page="15" aria-label="Referências Bibliográficas, página 15">
  <div class="references-tools" data-ui-chrome="true" style="margin-bottom: 24px; max-width: 480px;">
    <input type="search" class="references-filter-input" id="refFilterInput" placeholder="Filtrar por autor, lei ou instituição..." aria-label="Filtrar referências bibliográficas" style="width: 100%; padding: 10px 14px; border: 2px solid var(--navy); font-family: var(--sans); font-size: 13px;">
  </div>
${processed['referencias']}
</section>

${footerChrome}
`;

// Write blocks
fs.writeFileSync('site/_blocks/block-a.html', blockA.trim(), 'utf8');
fs.writeFileSync('site/_blocks/block-b.html', blockB.trim(), 'utf8');
fs.writeFileSync('site/_blocks/block-c.html', blockC.trim(), 'utf8');
fs.writeFileSync('site/_blocks/block-d.html', blockD.trim(), 'utf8');
fs.writeFileSync('site/_blocks/block-e.html', blockE.trim(), 'utf8');

// Full index.html
const fullHtml = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#163a56">
  <meta name="description" content="Código Vermelho — revista digital em formato landing page sobre inteligência artificial, demissões corporativas, precarização e direitos dos trabalhadores.">
  <title>Código Vermelho — 1ª edição | Trabalho descartável</title>
  
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <a class="skip-link" href="#capa" data-ui-chrome="true">Pular para o conteúdo principal</a>

  <main id="conteudo-principal" class="site-content">
${blockA}
${blockB}
${blockC}
${blockD}
${blockE}
  </main>

  <script src="js/main.js"></script>
</body>
</html>
`;

fs.writeFileSync('site/index.html', fullHtml.trim(), 'utf8');
console.log('Build de precisão concluído com sucesso!');
