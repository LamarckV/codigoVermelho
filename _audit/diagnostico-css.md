# DIAGNÓSTICO CONSOLIDADO DE CSS & ARQUITETURA
**Projeto:** Revista Digital "Código Vermelho" — 1ª Edição  
**Data:** 22 de Outubro de 2026  
**Autoria:** Orquestrador Técnico e Bateria de Subagentes Especialistas (Cascata, Final, Fluxo Contínuo e Tipografia)

---

## 1. Auditoria de Cascata e a Guerra dos 670 `!important`

### 1.1 Mapeamento da Cascata e Requisições
Atualmente, `site/css/styles.css` importa sequencialmente cinco arquivos CSS:
1. `tokens.css` (4.4 KB, 0 `!important`): variáveis e tokens semânticos em `:root`.
2. `editorial.css` (52.6 KB, 5 `!important`): artboards conceituais rígidos de 1440×1024px derivados do Figma, baseados na unidade `--u: calc(100cqw / 1440)` e posicionamento `.abs` com variáveis inline `--x/--y/--w/--h`.
3. `landing.css` (9.7 KB, 2 `!important`): componentes de casca web (header fixo, barra de leitura, modal de gráficos `<dialog>`, footer institucional).
4. `responsive.css` (9.6 KB, 3 `!important`): media queries que tentavam aliviar a rigidez do `editorial.css` no mobile/tablet.
5. `layout-repair.css` (34.2 KB, **656 `!important`**): camada de emergência adicionada para tentar transformar lâminas de Figma em grids, quebrando a cascata com especificidade extrema e 656 declarações `!important`.

### 1.2 O Arquivo Órfão `components.css`
O arquivo `site/css/components.css` (21.5 KB, 1.052 linhas) está completamente **órfão** (não é importado em `styles.css` nem chamado no `index.html`).
- Ele contém código de um redesign prévio que já previa estrutura contínua (`.site-section`, `.editorial-flow`), mas foi esquecido no disco.
- Elementos como `.references-tools` e `.references-filter-input` no HTML dependiam dele e ficaram sem estilização, forçando estilos inline no HTML.

### 1.3 Regras Mortas e Duplicatas
- **Seletores sem correspondência no DOM:**
  - `.magazine`: estilizado em `editorial.css` e `responsive.css` (~60 linhas). O contêiner real no DOM é `.site-content`.
  - `.cv-hud`, `.cv-hud-progress`, `.cv-hud-status`, `.cv-step-meter`: sistema de telemetria inexistente no DOM e no JS (~135 linhas de CSS morto).
  - `.cv-lightbox`: lightbox legado substituído pelo `<dialog class="chart-dialog">` nativo (~78 linhas de CSS morto).
  - `[data-stamp]` e `[data-kpi]`: nenhum elemento utiliza esses atributos no `index.html`.
  - Variáveis inline `--x, --y, --w, --h` em mais de 40 elementos: neutralizadas forçadamente por `layout-repair.css`.
- **Breakpoints conflitantes:**
  - `1024px` vs `1025px`: `editorial.css` ativa desktop em `>= 1024px`, enquanto `layout-repair.css` só ativa grids em `>= 1025px`. Em monitores de 1024px exatos (e tablets horizontais), ocorre colisão direta ou ausência de regras ("dead zone" em `#intervencao:2089` e `2154`).

---

## 2. Auditoria de Fluxo Contínuo: O Efeito "Blocos e Fatias"

O usuário relatou a sensação incômoda de "páginas/slides/seções separados". Identificamos os fatores exatos que produzem essa ilusão de cartões fatiados sobre uma mesa:

1. **Aspect-Ratio Fixo (`1440 / 1024`):**
   - Em `editorial.css:70-75`, `.page` possui `aspect-ratio: 1440 / 1024; width: min(1440px, calc(100vw - 48px));`. Isso força a proporção geométrica de um slide de PowerPoint/Figma.
2. **Rolagem Interna Forçada (`max-height` + `overflow-y: auto`):**
   - Em `layout-repair.css:108-111`, aplicou-se `.site-content .page:not(.page-cover) { max-height: calc(100vh - 76px) !important; overflow-y: auto !important; }`.
   - **Consequência:** Cada seção do site virou uma janela independente com barra de rolagem cinza embutida. O leitor rola uma seção internamente e depois rola a página mãe, quebrando completamente a leitura fluida.
3. **Sombras de Lâmina e Margens Artificiais:**
   - Em `layout-repair.css:112-114`, margens verticais `margin: 0 auto clamp(24px, 3.5vh, 44px) !important` e sombras tridimensionais `box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important` isolam cada seção como uma folha de papel solta.
4. **Fundo Escuro do Canvas (`#1e1e1e`) Vazando:**
   - Em `styles.css:15` e `editorial.css:26`, `body { background-color: var(--canvas, #1e1e1e); }`. Como as páginas são cartões cinzas com margens, o fundo escuro aparece ao redor e entre todas as seções.
5. **Marcas de Corte e Vinco de Dobra de Revista:**
   - Em `editorial.css:85-155`, `.page::before` desenha 8 gradientes simulando marcas técnicas de gráfica nos 4 cantos da prancha.
   - `.page::after` desenha um vinco vertical escuro de 1px simulando a lombada física de uma revista impressa aberta, cortando parágrafos de texto no meio.
6. **Folios como Cabeçalhos de Slide:**
   - 13 ocorrências de `<header class="folio abs">` no topo de cada bloco criam divisões rígidas de "01. // EDITORIAL // p. 03".

---

## 3. Auditoria do Final do Site (Prioridade Máxima)

### 3.1 Proposta de Intervenção (`#intervencao` · p. 13)
- **Vácuo vertical inicial:** O folio fica em `y: 84`, o título em `--y: 135` na coluna direita e o primeiro gráfico em `--y: 238` na coluna esquerda, gerando um vazio de mais de 150px.
- **Título desalinhado à direita:** A classe `.text-right` e `--x: 612` colam o título "Além do lucro dos algoritmos" no canto direito da tela, invertendo o fluxo de leitura ocidental.
- **Gráficos empilhados sem área de grid:** Os gráficos (`grafico-fundo-social.webp` e `grafico-marco-legal.webp`) não receberam `grid-area: charts;` explícita em `layout-repair.css:867`, caindo em auto-placement numa coluna espremida de 480px com `max-height: 200px !important`, tornando os números quase ilegíveis.
- **Texto cortando no rodapé:** Os 4 parágrafos densos ultrapassam a altura máxima calculada da lâmina (restavam apenas 676px para 850px de texto), ativando rolagem interna ou corte na borda.

### 3.2 Expediente e Integrantes (`#expediente` · p. 14)
- **Título INTEGRANTES (`.integrantes-vertical`) vazando 382px:**
  - `editorial.css:1382` define `writing-mode: vertical-rl; text-orientation: upright;`. A palavra de 11 letras fica empilhada verticalmente.
  - No desktop, `layout-repair.css:926` define grid-areas apenas para `folio`, `title`, `info` e `grid`. O elemento `.integrantes-vertical` fica em auto-placement numa 4ª linha implícita abaixo do grid, vazando 382px para fora da seção e gerando barra de rolagem gigante.
- **Fotos dos 6 integrantes pequenas no canto de molduras cinzas:**
  - `editorial.css:1351` define `.member-photo { width: 180px; height: 180px; background: #e0e0e0; }`.
  - `layout-repair.css:968` forçou `img { width: 80px; height: 80px; }` sem alterar o container `.member-photo`.
  - **Resultado:** Uma foto minúscula de 80px fica empacada no canto superior esquerdo de um quadrado cinza ocioso de 180px.
- **Cabeçalho institucional azul-marinho ilegível (Contraste 1:1):**
  - `editorial.css:1264` aplicou `background: var(--navy);` (#163a56).
  - `layout-repair.css:952` aplicou `color: var(--navy) !important;` (#163a56) sem remover o fundo (`background: transparent`).
  - **Resultado:** Texto azul-marinho sobre fundo azul-marinho. Completamente invisível.
- **Espaço ocioso sob a grade:**
  - A coluna da esquerda (`.expediente-info`) atinge ~680px de altura, enquanto a coluna da direita com os membros atinge apenas ~280px. Há mais de 350px de vazio branco abaixo dos membros.

### 3.3 Referências Bibliográficas (`#referencias` · p. 15)
- **Filtro solto acima do título:** O elemento `.references-tools` está posicionado antes do `<header class="folio">` no HTML, aparecendo isolado no topo da lâmina antes de qualquer identificação da seção.
- **Hairlines cortando colunas:**
  - `editorial.css:2146` coloca um `::before` com `border-top: 2px solid var(--red)` em cada um dos 26 parágrafos.
  - `layout-repair.css:1030` tentou aplicar `break-inside: avoid;` usando o seletor errado `#referencias .references-list li` (as referências no HTML são `<p>`, não `<li>`).
  - **Resultado:** Os 26 parágrafos quebram de forma arbitrária entre as duas colunas, com pequenos traços vermelhos cortando o texto.

### 3.4 Rodapé Institucional (`.site-footer`)
- **Desconexão visual total:** Apresenta-se como uma faixa escura de largura 100% com uma barra vermelha espessa de 4px no topo, quebrando subitamente a linguagem editorial do site e parecendo um rodapé colado de outro template.
- O botão "Voltar ao topo" tem seletor desencontrado (`.site-footer__back-to-top` no CSS vs `.back-to-top` no HTML).

---

## 4. Auditoria de Tipografia e Justificação

1. **Atributo `lang="pt-BR"`:** Confirmado e presente na tag `<html lang="pt-BR">` (linha 2 de `index.html`).
2. **Justificação e Hifenização:**
   - `layout-repair.css:204` impôs `text-align: justify !important; text-justify: inter-word !important;` globalmente em `.copy p`.
   - Porém, **nenhuma regra de hifenização automática (`hyphens: auto`) foi aplicada ao corpo do texto**.
   - **Consequência:** O navegador abre espaços vazios gigantescos ("rios brancos") entre as palavras em português para forçar a justificação nas margens, prejudicando severamente a legibilidade.
3. **Variáveis Não Definidas em `:root`:**
   - Em `tokens.css`, as fontes foram declaradas como `--font-display`, `--font-body`, `--font-mono`.
   - Em `editorial.css`, o código tenta consumir `var(--sans)`, `var(--display)`, `var(--headline)`, `var(--mono)`. Nenhuma dessas foi declarada em `:root`, caindo em fontes de fallback genéricas do sistema.
4. **Medida de Linha (Caracteres por Linha):**
   - Desktop 2 colunas: 45–55 caracteres por linha (excelente).
   - Desktop 1 coluna (`#contexto-2` e `#subemprego`): 95–105 caracteres (excessivo).
   - Tablet (641px–1024px): 90–125 caracteres (péssimo, pois o colunamento era desativado e o texto esticava a 100% da tela com fonte em ~13px).
   - Mobile: 38–50 caracteres (bom comprimento, mas prejudicado pela justificação sem hifenização).
5. **Capitulares (`.dropcap`):**
   - Em `#editorial-1` e `#editorial-2`, todos os 4 parágrafos possuem a classe `.dropcap`, criando uma repetição visual incorreta de letras gigantes consecutivas. Apenas o parágrafo inicial de uma peça deve receber destaque capitular.

---

## 5. Diretrizes para a Fase 2 (Arquitetura) e Fase 3 (Execução)

1. **Eliminar o Motor de 1440x1024:**
   - Substituir `aspect-ratio: 1440 / 1024`, `max-height`, `overflow-y: auto`, `box-shadow` de página, fundos `#1e1e1e` isolados e pseudo-elementos de vinco/corte.
   - Tornar `<main class="site-content">` e todas as 15 `<section>` um fluxo vertical único, contínuo, elegante e fluido.
2. **Unificar a Largura Útil e Gutters:**
   - Contêiner padrão de leitura (ex: `max-width: 1200px` ou `1280px`, com padding lateral consistente de `clamp(16px, 4vw, 32px)`).
3. **Limpar a Guerra de 670 `!important`:**
   - Eliminar as regras mortas e o conflito `editorial.css` vs `layout-repair.css`.
   - Adotar uma arquitetura de camadas limpa ou modular sem regras concorrentes.
4. **Tipografia Sólida:**
   - Vincular as variáveis de fonte reais (`--sans`, `--display`, etc.).
   - Ativar `hyphens: auto; text-align: justify; text-justify: inter-word;` no corpo de texto com `text-align-last: left;` e salvaguarda para mobile (`text-align: left; hyphens: auto;` em larguras muito estreitas onde a justificação gera espaçamentos distorcidos).
5. **Correção Cirúrgica do Final:**
   - `#intervencao`: grid de 2 colunas integrado, título e texto legíveis, infográficos lado a lado ou proporcionais com `object-fit: contain` e botões de zoom preservados.
   - `#expediente`: título horizontal claro, card institucional com contraste alto, molduras dos integrantes ajustadas sem sobras cinzas (`object-fit: cover` sem corte de rosto), grid balanceado.
   - `#referencias`: filtro integrado sob o título, lista em recuo francês (`text-indent: -1.5rem; padding-left: 1.5rem;`), sem hairlines cruzando.
   - Footer: integrado ao fluxo, com respiro confortável e alinhamento à mesma largura útil.
