# RELATÓRIO DE AUDITORIA TÉCNICA: SEQUÊNCIA DE ENCERRAMENTO
**Alvos auditados:** `#intervencao` (p. 13), `#expediente` (p. 14), `#referencias` (p. 15) e `.site-footer`
**Arquivos inspecionados:** `site/index.html`, `site/css/editorial.css`, `site/css/layout-repair.css`, `site/css/responsive.css`, `site/css/landing.css`, `site/css/components.css`, `site/js/main.js`

---

## 1. `#expediente` (Frame 14 · p. 14)

### 1.1 Título INTEGRANTES (`.integrantes-vertical`) quebrando letra a letra verticalmente e vazando 382px
* **Localização no HTML:** `site/index.html:448`
  ```html
  <div class="integrantes-vertical abs" style="--x:1330;--y:380;--w:60;--h:340" aria-hidden="true">INTEGRANTES</div>
  ```
* **Seletores e propriedades CSS responsáveis:**
  * `site/css/editorial.css:1382-1393`:
    ```css
    .integrantes-vertical {
      font-family: var(--display);
      font-size: calc(40 * var(--u));
      font-weight: 400;
      color: var(--red);
      writing-mode: vertical-rl;
      text-orientation: upright;
      letter-spacing: calc(6 * var(--u));
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: calc(2 * var(--u)) calc(2 * var(--u)) 0 var(--navy);
    }
    ```
  * `site/css/layout-repair.css:172-187`:
    ```css
    .site-content .page:not(.page-cover) > .abs {
      position: relative !important;
      inset: auto !important;
      width: 100% !important;
      height: auto !important;
    }
    ```
  * `site/css/layout-repair.css:926-935`:
    ```css
    @media (min-width: 1025px) {
      #expediente {
        display: grid !important;
        grid-template-columns: 460px 1fr !important;
        grid-template-areas:
          "folio folio"
          "title title"
          "info  grid" !important;
      }
    }
    ```
  * `site/css/editorial.css:2197-2199` e `site/css/responsive.css:113`:
    `display: none;` está declarado **apenas** dentro de `@media (max-width: 1023px)` e `@media (max-width: 1024px)`.
* **Causa Raiz Técnica:**
  1. **Quebra letra a letra:** `writing-mode: vertical-rl;` combinado com `text-orientation: upright;` força o navegador a rotacionar o fluxo do texto em 90° mantendo os glifos na orientação natural. A palavra "INTEGRANTES" (11 letras) vira uma pilha vertical onde cada letra fica isolada sobre a outra.
  2. **Vazamento de 382px:** No desktop (`min-width: 1025px`), a classe `.integrantes-vertical` **não é ocultada** por nenhum `@media`. Como `layout-repair.css` converteu `.abs` em `position: relative !important;` e definiu `grid-template-areas` contendo apenas `folio`, `title`, `info` e `grid`, o elemento `.integrantes-vertical` fica órfão no grid. O algoritmo de auto-placement do CSS Grid cria uma 4ª linha implícita abaixo de `info grid`. A altura calculada da pilha de 11 caracteres (`40px` de fonte + `6px` de letter-spacing + line-height) atinge exatos **~382px**. Como `#expediente` possui `max-height: calc(100vh - 76px) !important; overflow-y: auto !important;` (`layout-repair.css:108`), essa linha implícita de 382px transborda a altura máxima da lâmina e gera uma barra de rolagem vertical espúria.

---

### 1.2 Fotos dos 6 integrantes pequenas no canto de molduras cinzas vazias
* **Localização no HTML:** `site/index.html:416-447`
  ```html
  <div class="member-card">
    <figure class="member-photo">
      <picture>
        <source srcset="assets/enzo-casares-original.webp" type="image/webp">
        <img src="assets/enzo-casares-original.png" alt="Foto de Enzo Casares" loading="lazy">
      </picture>
    </figure>
    <span class="member-name">Enzo Casares</span>
  </div>
  ```
* **Seletores e propriedades CSS conflitantes:**
  * `site/css/editorial.css:1351-1357`:
    ```css
    .member-photo {
      width: calc(180 * var(--u));
      height: calc(180 * var(--u));
      border: calc(4 * var(--u)) solid var(--red);
      overflow: hidden;
      background: #e0e0e0; /* Moldura cinza fixa */
      box-shadow: var(--shadow-hard-sm-navy);
    }
    ```
  * `site/css/layout-repair.css:968-974`:
    ```css
    #expediente .member-card img {
      width: 80px !important;
      height: 80px !important;
      object-fit: cover !important;
      margin-bottom: 6px !important;
      border: 1px solid var(--navy) !important;
    }
    ```
* **Causa Raiz Técnica:**
  A camada de reparo (`layout-repair.css`) tentou reduzir a foto para caber no grid de 3 colunas alterando diretamente a tag `img` para `80px × 80px`, mas **esqueceu de sobrescrever o container pai `<figure class="member-photo">`**.
  O container `.member-photo` permaneceu com `width: 180px; height: 180px; background: #e0e0e0;`. Como a imagem interna encolheu para 80px sem preenchimento total, a foto de 80px ficou encostada no canto superior esquerdo da caixa cinza de 180px, deixando uma área ociosa de 100px cinza em volta. Além disso, gerou-se um aninhamento triplo de bordas: a borda da `.member-card` (navy + red top), a borda da `.member-photo` (red) e a borda da própria `img` (navy).

---

### 1.3 Cabeçalho do card institucional azul-marinho sem contraste legível
* **Localização no HTML:** `site/index.html:379-380`
  ```html
  <div class="expediente-info abs" style="--x:45;--y:258;--w:740">
    <h3>EXPEDIENTE | EDITORA 4:04</h3>
  ```
* **Seletores e propriedades CSS conflitantes:**
  * `site/css/editorial.css:1264-1273`:
    ```css
    .expediente-info h3 {
      display: inline-block;
      padding: calc(4 * var(--u)) calc(12 * var(--u));
      background: var(--navy); /* Fundo #163a56 */
      color: var(--paper);
    }
    ```
  * `site/css/layout-repair.css:949-953`:
    ```css
    #expediente .expediente-info h3 {
      font-size: 0.88rem !important;
      margin: 10px 0 2px !important;
      color: var(--navy) !important; /* Texto sobrescrito para #163a56 */
    }
    ```
* **Causa Raiz Técnica:**
  `editorial.css:1266` aplicou `background: var(--navy);`. Quando `layout-repair.css:952` adicionou `color: var(--navy) !important;`, **não removeu o background** (faltou `background: transparent !important;`).
  Resultado: texto azul-marinho (`#163a56`) desenhado sobre fundo azul-marinho (`#163a56`), resultando em taxa de contraste 1:1 (totalmente invisível e inacessível por WCAG AA).

---

### 1.4 Espaços vazios em `#expediente`
* **Seletores e propriedades CSS responsáveis:**
  * `site/css/layout-repair.css:926-935`:
    `grid-template-columns: 460px 1fr;` com `align-items: start !important;`.
* **Causa Raiz Técnica:**
  Em monitores desktop (1360px), a coluna da esquerda (`.expediente-info`, 460px) possui muito conteúdo vertical (ficha técnica, corpo editorial com 3 blocos e 9 emails, agradecimentos), atingindo ~680px de altura. A coluna da direita (`1fr` = ~868px de largura) possui apenas o grid de membros em 3 colunas com 2 linhas de cards baixos (~280px de altura).
  Com `align-items: start`, a coluna da direita termina antes da metade da lâmina, gerando um vazio enorme de mais de 350px de espaço branco desaproveitado abaixo dos cards dos integrantes.

---

## 2. `#intervencao` (Frame 13 · p. 13)

### 2.1 Vazio enorme entre folio e título
* **Localização no HTML:** `site/index.html:356-363`
  ```html
  <header class="folio abs" style="--x:39;--w:1362"><b>06.</b><strong>Proposta de Intervenção</strong><span>p. 13</span></header>
  <figure class="chart abs" style="--x:38;--y:238;--w:534;--h:294">...</figure>
  <figure class="chart abs" style="--x:38;--y:585;--w:534;--h:330">...</figure>
  <div class="abs text-right" style="--x:612;--y:135;--w:766">
    <h2 class="display-title title-red title-intervencao">Além do lucro dos<br>algoritmos</h2>
  ...
  ```
* **Causa Raiz Técnica:**
  1. **No design com coordenadas absolutas (`editorial.css`):** O `.folio` está posicionado em `y: 84` (altura 42px, finalizando em `y: 126`). O título da matéria começa apenas em `--y: 135` na coluna direita, enquanto o primeiro infográfico da coluna esquerda só começa em `--y: 238`. Há um vácuo vertical de 112px a 154px sem nenhum elemento entre o topo da página e os blocos de conteúdo.
  2. **No grid do `layout-repair.css:865-874`:** O grid foi modelado como:
     ```css
     grid-template-areas:
       "folio  charts"
       "header charts"
       "copy   charts" !important;
     ```
     Como `.folio` recebeu `display: inline-flex !important; width: auto !important; margin-bottom: 14px !important;` (`layout-repair.css:239`), ele ocupa apenas uma fração da linha superior, deixando o restante da linha 1 ocioso antes do `header` na linha 2.

---

### 2.2 Título à direita
* **Localização no HTML:** `site/index.html:360`
  ```html
  <div class="abs text-right" style="--x:612;--y:135;--w:766">
    <h2 class="display-title title-red title-intervencao">Além do lucro dos<br>algoritmos</h2>
  ```
* **Seletores e propriedades CSS responsáveis:**
  * `site/css/editorial.css:353-357`:
    ```css
    .title-intervencao {
      font-size: calc(64 * var(--u));
      line-height: calc(65 * var(--u));
      text-align: right;
    }
    ```
  * `site/css/editorial.css:124`: `.text-right { text-align: right; }`
* **Causa Raiz Técnica:**
  O elemento possui as classes hardcoded `.text-right` e `.title-intervencao`, e coordenadas fixas `--x: 612` (iniciando no centro e indo até a margem direita da prancha de 1440px). Essa diagramação colocou o título principal da matéria colado na margem direita extrema com alinhamento textual à direita, invertendo o fluxo natural ocidental de leitura (da esquerda para a direita) e distanciando o título dos gráficos à esquerda.

---

### 2.3 Gráficos empilhados
* **Localização no HTML:** `site/index.html:357-358`
  * Gráfico 1: `assets/grafico-fundo-social.webp` (`--x:38;--y:238;--w:534;--h:294`)
  * Gráfico 2: `assets/grafico-marco-legal.webp` (`--x:38;--y:585;--w:534;--h:330`)
* **Seletores e propriedades CSS responsáveis:**
  * `site/css/layout-repair.css:867-874` e `site/css/layout-repair.css:901-917`:
    `grid-template-areas: "folio charts" "header charts" "copy charts" !important;`
    `#intervencao .chart { max-height: 230px !important; ... }`
* **Causa Raiz Técnica:**
  1. Em `editorial.css`, os dois infográficos ocupavam a mesma coluna X (`--x: 38`, largura 534px) sobrepostos verticalmente (um em `y: 238` e o outro em `y: 585`), aglomerando a coluna esquerda inteira.
  2. Em `layout-repair.css:867`, criou-se a área `"charts"` na 2ª coluna, mas o seletor `#intervencao .chart` **não recebeu a propriedade `grid-area: charts;`**. Sem atribuição explícita de área, os dois elementos `<figure class="chart">` disputam o auto-placement no grid. Ambos acabam empilhados numa coluna estreita de 480px com altura limitada a 200px (`max-height: 200px !important`), prejudicando a leitura dos dados técnicos (porcentagens 40/30/20/10 e comparativos da regulação).

---

### 2.4 Texto cortando no rodapé
* **Localização no HTML:** `site/index.html:364-370`
* **Seletores e propriedades CSS responsáveis:**
  * `site/css/editorial.css:67-82`:
    ```css
    .page {
      aspect-ratio: 1440 / 1024;
      overflow: hidden;
    }
    ```
  * `site/css/layout-repair.css:108`:
    ```css
    .site-content .page:not(.page-cover) {
      max-height: calc(100vh - var(--header-height, 56px) - 20px) !important;
      overflow-y: auto !important;
    }
    ```
* **Causa Raiz Técnica:**
  O bloco de prosa de `#intervencao` possui 4 parágrafos densos e longos sobre o Marco Legal, o Fundo Social, a CSAS e auditorias algorítmicas do MPT/ANPD.
  1. Em `editorial.css`, o container começa em `--y: 348`. Da coordenada 348 até o limite de 1024 da página restam apenas 676px. O texto precisa de mais de 850px para ser exibido integralmente. Com `overflow: hidden;` na lâmina, o 4º parágrafo é decepado na linha final.
  2. Em `layout-repair.css:891`, dividiu-se a coluna de texto em `column-count: 2 !important;` com fonte comprimida (`clamp(12px, 0.84vw, 13.2px)`). Apesar de amenizar o corte, em viewports de altura inferior a 900px, o texto em 2 colunas continua excedendo a altura do grid, forçando o aparecimento de barra de rolagem interna ou corte na borda inferior.

---

## 3. `#referencias` (Frame 15 · p. 15)

### 3.1 Campo de busca/filtro solto acima do título
* **Localização no HTML:** `site/index.html:453-457`
  ```html
  <section id="referencias" class="page page-light page-refs site-section site-referencias" data-page="15" aria-label="Referências Bibliográficas, página 15">
    <div class="references-tools" data-ui-chrome="true" style="margin-bottom: 24px; max-width: 480px;">
      <input type="search" class="references-filter-input" id="refFilterInput" placeholder="Filtrar por autor, lei ou instituição..." ...>
    </div>

    <header class="folio abs" style="--x:39;--w:1362"><b>08.</b><strong>Referências Bibliográficas</strong><span>p. 15</span></header>
  ```
* **Seletores e propriedades CSS responsáveis:**
  * `site/css/layout-repair.css:1010-1015`:
    ```css
    @media (min-width: 1025px) {
      #referencias {
        display: flex !important;
        flex-direction: column !important;
        gap: 10px !important;
      }
    }
    ```
* **Causa Raiz Técnica:**
  No DOM de `index.html`, o elemento `.references-tools` foi inserido como o **primeiro filho direto** de `<section id="referencias">`, **antes** do `<header class="folio">`.
  Como `layout-repair.css` transformou `#referencias` em flexbox de coluna (`flex-direction: column`), a ordem visual obedece rigorosamente à ordem do DOM. O input de busca aparece flutuando sozinho acima da régua de cabeçalho "08. Referências Bibliográficas p. 15", rompendo a convenção editorial na qual o título do capítulo introduz a seção e as ferramentas ficam subordinadas a ele.

---

### 3.2 Hairline/linha divisória cruzando colunas
* **Seletores e propriedades CSS responsáveis:**
  * `site/css/editorial.css:2146-2151`:
    ```css
    #referencias .references-list p::before {
      content: "";
      display: block;
      width: calc(24 * var(--u));
      margin: 0 0 calc(3 * var(--u));
      border-top: calc(2 * var(--u)) solid var(--red);
    }
    ```
  * `site/css/layout-repair.css:1026` e `site/css/layout-repair.css:1030`:
    ```css
    #referencias .references-list {
      column-count: 2 !important;
      column-gap: 32px !important;
      column-rule: 1px solid var(--rule, #e5e5e5) !important;
    }
    #referencias .references-list li { /* <--- SELETOR ERRADO! */
      break-inside: avoid !important;
    }
    ```
  * `site/css/editorial.css:181-182`:
    ```css
    .folio {
      border-top: 1px solid rgba(22, 58, 86, 0.22);
      border-bottom: calc(2.5 * var(--u)) solid var(--navy);
    }
    ```
* **Causa Raiz Técnica:**
  1. **Seletor quebrado:** No HTML, as 26 referências são elementos `<p id="ref-...">`, e **não** `<li>`. Como `layout-repair.css:1030` declarou `#referencias .references-list li`, nenhuma regra de controle de quebra foi aplicada aos parágrafos.
  2. **Filetes transversais multiplicados:** Prevalece a regra de `editorial.css:2146`, onde cada um dos 26 `<p>` insere um `::before` com `border-top: 2px solid var(--red)`. Conforme os parágrafos quebram entre as 2 colunas do CSS multi-column, pequenos filetes vermelhos cortam horizontalmente o fluxo do texto em pontos desbalanceados.
  3. **Conflito de borda do `.folio`:** Na transição para fluxo relativo, a barra inferior de 2.5px navy do `.folio` se choca com a margem superior da lista multi-column e sua `column-rule` vertical central de 1px.

---

## 4. Rodapé (`.site-footer`)

### 4.1 Desconectado com barra escura e linha vermelha
* **Localização no HTML:** `site/index.html:490-505`
  ```html
  <footer class="site-footer" data-ui-chrome="true">
    <div class="site-footer__inner">
      <div class="site-footer__top">...</div>
      <div class="site-footer__bottom">...</div>
    </div>
  </footer>
  ```
* **Seletores e propriedades CSS responsáveis:**
  * `site/css/layout-repair.css:1042-1049`:
    ```css
    .site-footer {
      background-color: var(--navy, #163a56) !important;
      color: #ffffff !important;
      border-top: 4px solid var(--red, #e00508) !important;
      padding: 32px 0 20px !important;
      margin-top: 20px !important;
      width: 100% !important;
    }
    ```
  * `site/css/landing.css:381-387`:
    ```css
    .site-footer {
      background: var(--navy);
      color: #ffffff;
      padding: clamp(40px, 5vw, 64px) clamp(16px, 4vw, 48px);
      border-top: 4px solid var(--red);
      width: 100%;
    }
    ```
* **Causa Raiz Técnica:**
  1. **Ruptura de metáfora visual (Full-bleed vs Prancha Centralizada):**
     Todas as lâminas da revista (`.page`) são tratadas como pranchas editoriais centralizadas (`width: min(1360px, calc(100vw - 32px)); box-shadow: 0 4px 16px rgba(0,0,0,0.08); background: #f6f6f6;`) sobre um fundo geral escuro (`body { background-color: var(--canvas, #1e1e1e); }`).
     Logo após o término da página de referências, `.site-footer` quebra essa linguagem e expande-se para `width: 100% !important;`, estendendo-se de ponta a ponta da janela. Isso transforma abruptamente a revista digital num template genérico de site institucional com barra inferior escura.
  2. **Filete vermelho estridente (`border-top: 4px solid var(--red)`):**
     A linha vermelha grossa de 4px cria uma barreira visual pesada e agressiva imediatamente após o papel marfim/cinza claro da lâmina 15, sem zona de respiro ou transição tipográfica.
  3. **Inconsistência de classe BEM no botão "Voltar ao topo":**
     Em `layout-repair.css:1082`, definiu-se `.site-footer__back-to-top`, mas no HTML linha 497 o link está como `<a class="back-to-top" id="backToTopBtn">`. Os estilos específicos do botão no repair sheet não alcançam o botão real.
  4. **Semântica HTML de landmarks:**
     O `<footer class="site-footer">` está aninhado dentro de `<main id="conteudo-principal" class="site-content">` (linha 490), violando a semântica correta de landmark de fechamento de página.

---

## 5. Matriz Sintética de Correção Recomendada

| Seção / Elemento | Arquivo / Linha | Causa Identificada | Correção Técnica Recomendada |
| :--- | :--- | :--- | :--- |
| **`.integrantes-vertical`** | `css/editorial.css:1382`<br>`css/layout-repair.css:926` | `writing-mode: vertical-rl` em linha implícita do grid vazando 382px. | Adicionar `display: none !important;` definitivo em desktop, ou integrá-lo horizontalmente como tag de apoio no cabeçalho do grid. |
| **`.member-photo` / `img`** | `css/editorial.css:1351`<br>`css/layout-repair.css:968` | `img` reduzida a 80px dentro de `.member-photo` de 180px com `background: #e0e0e0`. | Ajustar `.member-photo` para `width: 88px; height: 88px; background: transparent;`, removendo a moldura cinza e centralizando a imagem. |
| **`.expediente-info h3`** | `css/layout-repair.css:952`<br>`css/editorial.css:1266` | Texto navy (`#163a56`) sobre fundo navy herdado. | Adicionar `background: transparent !important;` e `padding: 0 !important;` ou manter fundo navy com `color: #ffffff !important;`. |
| **Grid `#expediente`** | `css/layout-repair.css:926` | Coluna esquerda com 680px e coluna direita com 280px gerando 350px vazios. | Balancear grid para 2 colunas proporcionais (ex: 50% / 50% ou 1.1fr / 1.3fr), expandindo os cards com função/email de cada estudante. |
| **`#intervencao` Título** | `index.html:360`<br>`css/editorial.css:356` | Classe `.text-right` e título jogado para a direita. | Mudar para alinhamento à esquerda natural, posicionando título e deck acima do texto corrido na coluna editorial. |
| **`#intervencao .chart`** | `css/layout-repair.css:867` | Gráficos empilhados e sem atribuição explícita de `grid-area: charts;`. | Atribuir `grid-area: charts;`, organizando os dois infográficos com proporções legíveis e respiro interno. |
| **`#intervencao .copy`** | `css/layout-repair.css:889` | 4 parágrafos comprimidos cortando na dobra inferior. | Ajustar `aspect-ratio: auto !important; height: auto !important;` com fluxo natural para eliminar corte de texto. |
| **`#referencias` Input** | `index.html:453` | `.references-tools` posicionado antes do `<header class="folio">`. | Mover o input para baixo do `.folio` no HTML ou integrá-lo na mesma linha da barra de ferramentas do folio. |
| **`#referencias` Hairlines** | `css/layout-repair.css:1030`<br>`css/editorial.css:2146` | Seletor incorreto `li` vs `p`, mantendo os `p::before` cortando as colunas. | Corrigir o seletor para `#referencias .references-list p`, aplicar `break-inside: avoid;` e remover o `::before` redundante. |
| **`.site-footer`** | `css/layout-repair.css:1042`<br>`index.html:490` | Barra 100% full-bleed desconectada das pranchas da revista e linha vermelha agressiva. | Integrar o footer à largura da revista (`max-width: 1360px; margin: 32px auto 0; border-radius: 4px;`), suavizar o filete superior e mover para fora do `<main>`. |