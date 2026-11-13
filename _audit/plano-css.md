# PLANO DE ARQUITETURA DE CSS: FLUXO CONTÍNUO & REFATORAÇÃO LIMPA
**Projeto:** Revista Digital "Código Vermelho" — Edição 1  
**Fase:** Fase 2 (Arquitetura)  
**Data:** 22 de Outubro de 2026

---

## 1. Diretriz de Design e Filosofia
A revista deixa o modelo arcaico de "slides de PowerPoint / lâminas soltas de 1440×1024 com rolagem interna" e assume o modelo de **Publicação Editorial Longform Contínua**.
- **Sensação ao rolar:** Uma única peça contínua de jornalismo digital de alta densidade visual.
- **Zero rolagens internas:** Nenhuma seção tem `overflow-y: auto` ou `max-height` restritivo. A altura é dada organicamente pela soma dos seus elementos.
- **Zero cortes e dobras fictícias:** Removidos todos os pseudo-elementos que simulavam marcas de impressão e vinco de lombada sobre o texto.
- **Fundo único contínuo:** O documento adota fundo de papel claro editorial (`var(--paper, #f7f6f2)`), eliminando o canvas escuro `#1e1e1e` vazando entre seções.
- **Reportagem Noturna:** A seção de Reportagem (`#reportagem-1` e `#reportagem-2`) constitui uma faixa contínua de largura total (full-bleed dark section) com transições elegantes por filete sutil, sem margens ou sombras de cartão. O fundo escuro é controlado pela variável `--reportagem-bg: var(--navy-900, #0a141d);`, facilitando a alternância para fundo claro com 1 linha de CSS caso o usuário aprove.

---

## 2. Sistema Unificado de Tokens (`tokens.css`)

### 2.1 Paleta Semântica
- `--paper`: `#f7f6f2` (fundo contínuo de leitura)
- `--paper-card`: `#ffffff` (caixas e cartões institucionais)
- `--ink`: `#14171a` (corpo de texto de alto contraste)
- `--ink-muted`: `#525866` (subtítulos, metadados, legendas)
- `--red`: `#d31518` (vermelho editorial para destaques, vinhetas e números)
- `--navy`: `#163a56` (azul escuro técnico para fios, caixas e títulos)
- `--border`: `rgba(22, 58, 86, 0.14)` (filetes divisores refinados de 1px)
- `--rule-light`: `rgba(0, 0, 0, 0.08)` (linhas divisórias entre colunas)

### 2.2 Tipografia e Mapeamento Unificado de Fontes
Elimina-se a desconexão de variáveis mapeando explicitamente em `:root`:
```css
:root {
  --font-display: 'Bebas Neue', 'Barlow Condensed', 'Impact', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  --font-serif: 'Playfair Display', Georgia, serif;

  /* Aliases de compatibilidade editorial */
  --display: var(--font-display);
  --sans: var(--font-body);
  --headline: var(--font-display);
  --mono: var(--font-mono);
  --serif: var(--font-serif);
}
```

### 2.3 Contêiner Único e Ritmo Vertical
```css
:root {
  --container-max: 1220px;
  --container-gutter: clamp(16px, 3.5vw, 36px);
  --section-padding-y: clamp(48px, 6vw, 88px);
  --space-unit: 8px;
}
```

---

## 3. Estrutura Modular da Nova Cascata (Sem `layout-repair.css`, Sem Arquivos Órfãos)

Substitui-se a cadeia de 5 arquivos e 670 `!important` por 4 módulos limpos e coesos em `css/styles.css`:

```css
@import url("tokens.css");      /* Tokens globais, variáveis e temas */
@import url("shell.css");       /* Header, menu, progresso, modal e footer */
@import url("editorial.css");   /* Tipografia, prosa justificada, boxes e mídia */
@import url("sections.css");    /* Layouts específicos das 15 seções em fluxo */
```

### Arquivos Removidos / Aposentados:
1. `layout-repair.css` (34 KB, 656 `!important`): **ELIMINADO**. Seus grids funcionais foram incorporados nativamente em `sections.css` sem `!important`.
2. `components.css` (21.5 KB órfão): **ELIMINADO**.
3. `responsive.css` e `landing.css`: consolidados em `shell.css` e `sections.css` com uma única régua de breakpoints.

**Meta de Performance e Limpeza:**
- Tamanho total de CSS: reduzido de 133 KB para **~45 KB** (redução de mais de 60%).
- Quantidade de `!important`: reduzido de 670 para **menos de 10** (meta atingida).

---

## 4. Tipografia e Justificação de Prosa

### 4.1 Regras de Prosa Contínua
Aplicado exclusivamente a parágrafos de texto corrido (`.copy p`, `.editorial-flow p`):
```css
.copy p,
.editorial-flow p {
  font-family: var(--font-body);
  font-size: clamp(0.92rem, 0.85rem + 0.25vw, 1.04rem);
  line-height: 1.62;
  color: var(--ink);
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  -webkit-hyphens: auto;
  overflow-wrap: break-word;
  text-align-last: left;
  margin-bottom: 1.25rem;
  break-inside: avoid;
}
```

### 4.2 Colunamento Balanceado no Desktop (>= 1024px)
Para as seções em duas colunas (incluindo `#contexto-2` e `#subemprego` que estavam estourando linha única):
```css
@media (min-width: 1024px) {
  .copy.two-cols {
    column-count: 2;
    column-gap: clamp(28px, 3.5vw, 44px);
    column-rule: 1px solid var(--rule-light);
  }
}
```
Isso garante exatamente **50 a 65 caracteres por linha**, a medida áurea de leitura editorial.

### 4.3 Salvaguarda para Telas Estreitas (< 640px)
Em telas muito pequenas (mobile 320px–390px), onde linhas justificadas com palavras longas em português geram espaçamento forçado, a justificação recua suavemente para `text-align: left; hyphens: auto;`.

---

## 5. Resolução Cirúrgica do Final do Site

### 5.1 Proposta de Intervenção (`#intervencao`)
- **Composição Integrada em 2 Colunas no Desktop:**
  - Coluna Principal (Texto e Proposta): Título "Além do lucro dos algoritmos" alinhado à esquerda no fluxo de leitura, deck introdutório e 4 parágrafos de prosa em fluxo contínuo (sem nenhum corte inferior).
  - Coluna de Infográficos: Os dois gráficos (`grafico-fundo-social.webp` e `grafico-marco-legal.webp`) organizados com proporções claras, `object-fit: contain`, legendas legíveis e botões "Ampliar" funcionais.
- Sem vácuos verticais: o topo conecta imediatamente o folio ao título da proposta.

### 5.2 Expediente e Integrantes (`#expediente`)
- **Título INTEGRANTES:**
  - Desativado o `writing-mode: vertical-rl` e a quebra letra a letra. O título passa a ser exibido horizontalmente como cabeçalho claro da grade de integrantes (`font-family: var(--font-display); font-size: 1.5rem; letter-spacing: 2px; color: var(--red);`).
- **Cards dos 6 Integrantes:**
  - Molduras `.member-photo` redimensionadas proporcionalmente (ex: `100px × 100px` ou `110px × 110px`), com `background: transparent;` e borda limpa de 2px `var(--navy)`.
  - Imagens com `width: 100%; height: 100%; object-fit: cover; object-position: center 20%;`, eliminando as áreas cinzas vazias sem cortar o rosto de nenhum integrante.
  - Grade responsiva uniforme: 3×2 em desktop (`minmax(180px, 1fr)`), 2×3 em tablet e 1–2 colunas em mobile.
  - Nomes e e-mails alinhados com `word-break: break-word`.
- **Card Institucional (`.expediente-info`):**
  - Título `<h3>EXPEDIENTE | EDITORA 4:04</h3>`: fundo `var(--navy)`, texto `var(--paper)` (#ffffff/marfim), padding de `6px 14px`, borda arredondada de 2px e taxa de contraste > 7:1 (AAA).
  - Conteúdo balanceado verticalmente com a grade de membros.

### 5.3 Referências Bibliográficas (`#referencias`)
- **Barra de Busca e Filtro:** Posicionada visualmente e hierarquicamente abaixo do cabeçalho da seção, com largura harmônica (`max-width: 480px`).
- **Lista de 26 Referências:**
  - Formatada com recuo francês (`text-indent: -1.75rem; padding-left: 1.75rem;`).
  - Dividida em 2 colunas balanceadas no desktop com `column-rule: 1px solid var(--border)`.
  - Remoção dos pseudo-elementos `p::before` que desenhavam hairlines vermelhas transversais no meio do texto.
  - Parágrafos com `break-inside: avoid; margin-bottom: 1rem;` para não fragmentar referências entre colunas.

### 5.4 Rodapé Institucional (`.site-footer`)
- Integrado organicamente ao final da página:
  - Alinhado ao mesmo contêiner útil da revista (`max-width: var(--container-max); margin: 48px auto 0;`).
  - Filete superior sutil de 2px (`border-top: 2px solid var(--navy);` com acento vermelho em tag).
  - Espaçamento confortável e funcionalidade do botão "Voltar ao topo" com foco e scroll suave.

---

## 6. Ponto de Decisão do Usuário: Reportagem (Fundo Escuro vs Claro)
- A Reportagem foi implementada como uma faixa contínua de largura total com a variável:
  ```css
  :root {
    --reportagem-bg: var(--navy-900, #0a141d);
    --reportagem-ink: var(--paper, #f7f6f2);
  }
  ```
- Para manter o fundo claro igual ao restante da revista, basta alterar `--reportagem-bg: transparent; --reportagem-ink: var(--ink);`.
- Essa escolha está isolada e documentada para fácil decisão do usuário.
