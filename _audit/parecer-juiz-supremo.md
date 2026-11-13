# PARECER DO JUIZ SUPREMO: JULGAMENTO DA BATERIA DE 20 EIXOS
**Tribunal de Arquitetura, Design & Engenharia Frontend**  
**Projeto:** Revista Digital "Código Vermelho" — Edição 1  
**Diretriz Soberana:** Rejeição impiedosa a gambiarras, injeção de texto falso, código inchado e quebras de acessibilidade. Aceitação estrita e exclusiva de melhorias comprovadamente perfeitas, que preservem 100% o conteúdo e elevem a publicação ao ápice do jornalismo investigativo independente.

---

## 1. VETOS DO JUIZ SUPREMO (REFUTAÇÕES SUMÁRIAS)

O Juiz Supremo aplicou **VETO TOTAL E INCONDICIONAL** aos seguintes vícios detectados nos propositores:
1. **VETO À INJEÇÃO DE TEXTOS FALSOS NO DOM VIA CSS (Lente 1 — Integridade de Conteúdo):**
   - VETADO: `content: "CONCEITO CHAVE // ECONOMIA POLÍTICA DO TRABALHO"` (Propositor 11).
   - VETADO: `content: "// 04.B · ARSENAL JURÍDICO & CONTRAMEDIDAS //"` e `[PROTOCOLO DE EMERGÊNCIA JURÍDICA]` (Propositor 13).
   - VETADO: `content: "PRANCHA PERICIAL // PNAD CONTÍNUA · IBGE (33,9M EM VULNERABILIDADE)"` (Propositor 14).
   - VETADO: `content: "AUDITORIA VISUAL // EVIDÊNCIA EM ALTA DEFINIÇÃO"` (Propositor 20).
   - VETADO: Injeção de ` ↗` genérica em todos os links `[target="_blank"]` no meio de citações legais entre aspas (Propositor 20).
   *Fundamento:* A regra é inviolável. Criar títulos, subtítulos ou rótulos artificiais via CSS engana leitores de tela e viola o princípio de verdade jornalística da Editora 4:04.
2. **VETO A CLICHÊS DE TEMPLATE E DECORATIVISMO BARATO (Lente 5 — Estética Editorial):**
   - VETADO: Simulação de botões de janela macOS ("semáforo" vermelho, amarelo e verde) na moldura da foto noturna de Marcos (Propositor 10). Uma reportagem sobre vigilância corporativa e demissões em massa não é vitrine de portfólio de software house.
   - VETADO: "Leader dots" (linhas pontilhadas de restaurante) no Sumário (Propositor 04), que poluem visualmente e fazem leitores de tela vocalizarem "ponto ponto ponto".
   - VETADO: Micro-zoom com escala contínua acelerada em fotos de denúncia (Propositor 06 e 07). A revista exige sobriedade documental.
3. **VETO À REINTRODUÇÃO DE `!important` E SOBRESCRITAS REDUNDANTES (Lente 3 — Engenharia):**
   - VETADOS: 7 `!important` propostos em `#reportagem-1` e 8 em `#referencias`. O projeto acabou de erradicar 660 `!important`; nenhuma regra nova com `!important` cosmético será tolerada.
4. **VETO A RISCOS DE OVERFLOW E ALVOS TÁTEIS MENORES QUE 44PX (Lentes 2 e 4):**
   - VETADO: Redução de botões `.nav-toggle` e `.chart-dialog__close` para 36px ou 40px no mobile (Propositores 01 e 20). A regra é 44px estrita (WCAG 2.5.5).
   - VETADO: `position: sticky` no card do Sumário que decepava conteúdo em telas de baixa altura ou com zoom de acessibilidade (Propositor 04).
   - VETADO: Foco amarelo sobre fundo branco no modal (`1.26:1` de contraste).

---

## 2. MELHORIAS APROVADAS COM EXCELÊNCIA (PACOTE SANEADO)

Após a depuração adversarial dos 20 críticos, o Juiz Supremo HOMOLOGA para implementação imediata os seguintes 20 eixos lapidados:

### Eixo 1: Shell, Header Fixo & Branding
- **Aprovado:** Backdrop-filter multicamada com desfoque de `14px`, saturação de `180%` e fallback sólido sob `@supports`.
- **Aprovado:** Altura da logo travada em `28px` com `aspect-ratio: 354 / 144`, eliminando qualquer layout shift (CLS zero).
- **Aprovado:** Tagline mono mantida e protegida contra overflow em mobile (< 768px).
- **Aprovado:** Links do menu com régua de sublinhado animado construtivista de 2px via `transform: scaleX()` e curva cúbica editorial, sem blocos brutos invasivos.
- **Aprovado:** Drawer mobile acessível com `min-height: 44px` no `.nav-toggle`, fechamento estrito por ESC e contenção de scroll.

### Eixo 2: Barra de Progresso de Leitura & Indicador Dinâmico
- **Aprovado:** Gradiente contínuo de rotativa (`#a50003` para `var(--red)` e `var(--orange)` no modo claro; `var(--red)` para `var(--yellow-tape)` no modo noturno).
- **Aprovado:** Agulha focal pericial na extremidade da barra sem estourar a calha de 3.5px.
- **Aprovado:** Remoção de `will-change: width` e transições de largura redundantes, sincronizando com os 60fps do RAF no JavaScript.
- **Aprovado:** Indicador `#readingCounter` com `font-variant-numeric: tabular-nums lining-nums;` absoluto (sem trepidação de dígitos).

### Eixo 3: Capa / Hero Imersiva (`#capa`)
- **Aprovado:** Restauração explícita do gradiente pericial de sobreposição em `#capa::after` (glow carmesim focalizado no olho cibernético de Mark Zuckerberg + vinheta periférica + rampa inferior noturna para 16:1 de contraste nos textos).
- **Aprovado:** Ponto focal fotográfico calibrado (`object-position: center 24%` em desktop e `center 20%` em mobile), garantindo que o rosto, o terno corporativo e o olho biônico nunca sejam cortados de 320px a 2560px.
- **Aprovado:** Fita amarela `1º Edição` com chanfro industrial pericial e sombra brutalista dupla, sem colisão de `clip-path` com `box-shadow`.
- **Aprovado:** Manchete monumental com clamp ajustado para mobile e base da prancha ancorada.

### Eixo 4: Sumário Navegável (`#sumario`)
- **Aprovado:** Header analítico com kicker técnico em caixa-alta mono e título monumental com kerning de prensa rotativa.
- **Aprovado:** Card de destaque com a foto `sumario.webp` emoldurada, chanfro pericial no topo direito via `filter: drop-shadow()` e marcador de ancoragem `<i></i>` revitalizado.
- **Aprovado:** Badges numéricas `01.` a `08.` com fundo vermelho e numerais tabulares chanfrados.
- **Aprovado:** Hover tátil mecânico com elevação suave e borda lateral reativa.

### Eixo 5: Faixa de Números em Destaque (`.site-key-numbers`)
- **Aprovado:** Correção do contraste: título monumental em branco puro (`#ffffff`) sobre fundo azul-marinho profundo (`11.97:1` — WCAG AAA), eliminando o azul sobre azul.
- **Aprovado:** Solução matemática do Lead Card: `.stat-card:first-child` (o número-mestre de 227.386 demitidos) recebe `grid-column: span 2` a partir de 600px, equalizando o grid em exatamente 12 trilhas simétricas (6 linhas em 2 cols; 4 linhas em 3 cols; 3 linhas em 4 cols; zero buracos em qualquer resolução).
- **Aprovado:** Números com `font-variant-numeric: tabular-nums lining-nums;` e alinhamento nivelado da fonte no rodapé de todos os cartões.

### Eixo 6: Editorial 1 (`#editorial-1`)
- **Aprovado:** Título monumental `Edito/rial` com empilhamento matemático e clamp fluído (`clamp(2.5rem, 1.8rem + 3.2vw, 6.2rem)`), sem vazar em 320px.
- **Aprovado:** Moldura com duplo filete técnico de passe-partout e sombra de linotipo na foto `editorial.webp`.
- **Aprovado:** Neutralização da segunda capitular acidental: apenas o primeiro parágrafo exibe o dropcap de 3 linhas com alinhamento rigoroso da linha de base.
- **Aprovado:** Justificação da prosa sem rios brancos, com hifenização e proteção órfã.

### Eixo 7: Editorial 2 (`#editorial-2`)
- **Aprovado:** Acento construtivista laranja (`border-top: 4px solid var(--orange)`) na foto da estátua da Justiça (`justica.webp`), integrando-a ao título da matéria.
- **Aprovado:** Enquadramento vertical que preserva integralmente a balança da Justiça e as telas digitais de código em qualquer viewport, recusando cortes artificiais.
- **Aprovado:** Colunamento sequencial equilibrado com a foto ao lado e transição harmônica para o Contexto.

### Eixo 8: Contextualização 1 (`#contexto-1`)
- **Aprovado:** Eliminação do vácuo de 180px entre o deck e a prosa no desktop através de alinhamento com a caixa azul.
- **Aprovado:** Caixas conceituais "Trabalho Cristalizado" (azul) e "Trabalho Fantasma" (vermelho) com chanfros executados via `filter: drop-shadow()` e contraste integral **WCAG AAA** (13.5:1 no azul e 10.7:1 no vermelho).
- **Aprovado:** Deck com lâmina vermelha e tipografia documental.

### Eixo 9: Contextualização 2 (`#contexto-2`)
- **Aprovado:** `column-span: all` no `.headline-float`, permitindo que o título "O fim do escudo do diploma" atue como marquee sobre as duas colunas inferiores.
- **Aprovado:** Balanceamento dos 3 parágrafos entre as colunas via `orphans: 3; widows: 3;`.
- **Aprovado:** Bezel superior de 44px na prancha do gráfico de escolaridade, garantindo que o botão "Ampliar" nunca obstrua o texto de dados da imagem.

### Eixo 10: Reportagem Noturna 1 (`#reportagem-1`)
- **Aprovado:** Faixa escura contínua de largura total com contenção central estrita em `--container-max: 1220px` (zero linhas de 2000px em monitores ultrawide).
- **Aprovado:** Título "Vigiados e descartados" em vermelho CRT com contraste AAA e standfirst com colchetes técnicos periciais.
- **Aprovado:** Foto noturna de Marcos com moldura técnica pericial (sem botões de macOS).

### Eixo 11: Reportagem Noturna 2 (`#reportagem-2`)
- **Aprovado:** Texto corrido em tom linho-pergaminho (`#ded8cb`), garantindo conforto de leitura noturna de 13.35:1 sem fadiga ocular (*halation*).
- **Aprovado:** Caixa "Automação Substitutiva" bipartida com separação gráfica limpa entre o modelo virtuoso (azul) e o modelo predatório (vermelho), preservando 100% o texto literal de Acemoglu & Restrepo.

### Eixo 12: Direito em Xeque 1 (`#direito-1`)
- **Aprovado:** Foto do martelo (`martelo.webp`) com enquadramento pericial íntegro de topo a base, sem distorção em 360px.
- **Aprovado:** Prancha do gráfico de inércia legislativa com cantoneiras de mira e proporção pericial estável.
- **Aprovado:** Caixa do Artigo 7º da CF/88 com marcadores construtivistas em amarelo pericial (`li::marker`) sem injeção de texto fake.

### Eixo 13: Direito em Xeque 2 (`#direito-2`)
- **Aprovado:** Caixa de autodefesa jurídica com Action Cards táticos (LGPD Art. 20, CLT Art. 2º e Súmula 443 TST) numerados com `counter(legal-step)`, sem textos arbitrários inventados.
- **Aprovado:** Infográfico de ações na Justiça do Trabalho com moldura arquivística e botão de zoom tátil de 44px.

### Eixo 14: O Labirinto do Subemprego 1 (`#subemprego`)
- **Aprovado:** Título "A escada quebrada" com motivo gráfico dos degraus serrados em gradiente construtivista.
- **Aprovado:** Gráfico de desproteção social e caixa de subutilização da força de trabalho com chanfros geométricos limpos e quebra protegida em 320px.

### Eixo 15: O Labirinto do Subemprego 2 (`#subemprego-2`)
- **Aprovado:** Foto do Uber (`uber.webp`) com acabamento documental de fotojornalismo.
- **Aprovado:** Título "A nova servidão digital" e infográfico de previdência de aplicativo perfeitamente nivelados.

### Eixo 16: Proposta de Intervenção (`#intervencao`)
- **Aprovado:** Coluna de prosa contínua em 68ch de largura áurea à esquerda, eliminando a fragmentação em subcolunas espremidas de 290px.
- **Aprovado:** Coluna de pranchas periciais à direita com os dois infográficos (Fundo Social e Marco Legal) e trava `grid-template-rows: auto auto max-content 1fr;` que elimina o vácuo de 320px entre eles.
- **Aprovado:** Título e deck firmemente alinhados à esquerda, eliminando de vez o débito do `.text-right`.

### Eixo 17: Expediente Institucional (`#expediente .expediente-info`)
- **Aprovado:** Extinção imediata de `word-break: break-all;` da prosa regular, restaurando a integridade das palavras em língua portuguesa.
- **Aprovado:** Badge institucional `h3` com fundo navy e texto branco de alto contraste (11.2:1 — WCAG AAA).
- **Aprovado:** E-mails institucionais formatados em fonte monoespaçada técnica com `overflow-wrap: anywhere` (zero risco em 320px).
- **Aprovado:** Colofão solene de agradecimentos aos desenvolvedores e professores.

### Eixo 18: Grade de Integrantes (`#expediente .members-grid`)
- **Aprovado:** Título horizontal "INTEGRANTES" com traço técnico pontilhado pós-título, integrado ao grid.
- **Aprovado:** Grade simétrica 3×2 desktop, 2×3 tablet e 1 coluna em mobile <420px.
- **Aprovado:** Retratos 1:1 quadrados de rotativa com `object-position: center 15%`, garantindo que os 6 estudantes fiquem nítidos e com o topo da cabeça e ombros intactos.
- **Aprovado:** Hover state tátil com elevação sutil e acentuação da borda superior.

### Eixo 19: Referências Bibliográficas (`#referencias`)
- **Aprovado:** Reordenação visual estrita via Flexbox `order`: Folio (1º), Barra de Busca (2º), Lista de 26 Referências (3º) — sem tocar no HTML!
- **Aprovado:** Console de busca pericial com input de 44px de altura tátil e foco em vermelho alerta.
- **Aprovado:** Recuo francês (hanging indent) elegante de 2 colunas no desktop, com `column-fill: balance;` e extinção definitiva de qualquer pseudo-elemento transversal cortando texto.
- **Aprovado:** Links acadêmicos em monoespaçado com sublinhado sutil e indicador ` ↗`.

### Eixo 20: Rodapé Institucional, Acessibilidade & Microinterações
- **Aprovado:** Rodapé integrado em degradê marinho profundo com borda superior vermelha de 5px e textura milimetrada imperceptível (0.035 opacidade).
- **Aprovado:** Botão "Voltar ao topo" brutalista com área tátil de 44px (100% no mobile) e microinteração direcional da seta.
- **Aprovado:** Lightbox modal dos gráficos com transição suave, botão fechar universal de 44×44px e salvaguarda `dialog:not([open]) { display: none !important; }`.
- **Aprovado:** Sistema adaptativo universal de `:focus-visible`: anel vermelho de 3px em superfícies claras; anel amarelo de fita pericial (`#f3ea00`, contraste > 9:1) em superfícies escuras e no rodapé.
- **Aprovado:** Blindagem absoluta para `prefers-reduced-motion` (anula transições, transforms e desfoques pesados de backdrop).

---

## 3. DETERMINAÇÃO DO JUIZ SUPREMO
O pacote saneado acima está integralmente aprovado para integração imediata nos arquivos `site/css/tokens.css`, `site/css/landing.css` e `site/css/sections.css`, seguido imediatamente pelas baterias automatizadas de validação do Guardião e do `metrics.mjs`.
