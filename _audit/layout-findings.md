# Relatório de Diagnóstico Visual e Forense de Layout (Onda 1)
**Projeto:** Código Vermelho — Revista Digital (site/)  
**Documento:** `site/_audit/layout-findings.md`  
**Data:** 21 de outubro de 2026 | **Auditoria:** Agentes A, B e C (Orquestração OMP)  

---

## 1. Visão Geral dos Sintomas e Diagnóstico

A inspeção detalhada do site renderizado e das folhas de estilo calculadas (`editorial.css`, `landing.css`, `responsive.css`) confirmou as causas raízes dos problemas de diagramação, compressão e transição editorial:

1. **Prisão ao Quadro Fixo em Desktop (`aspect-ratio: 1440 / 1024` com `overflow: hidden`):**
   - As regras legadas em `editorial.css` forçam todas as lâminas da revista (`.page:not(.page-cover)`) a terem `aspect-ratio: 1440 / 1024` e `overflow: hidden` em viewports desktop.
   - Isso impede que as seções cresçam conforme o volume de texto real, transformando o site em uma sucessão de "slides" desconectados sobre um fundo escuro `#1e1e1e`, em vez de uma landing page contínua de jornalismo investigativo de alta fluidez.

2. **Posicionamento Absoluto Rígido via `.abs` com `--x/--y/--w/--h`:**
   - Em telas largas, elementos de texto, caixas conceituais e infográficos dependem de coordenadas absolutas calculadas via `--u: calc(100cqw / 1440)`.
   - Variações de renderização de fontes do sistema e densidade de pixels (DPI) levam a riscos iminentes de colisão, textos empurrados contra bordas ou elementos que quase tocam o rodapé da lâmina.

3. **Gargalo Crítico na Sequência de Encerramento (P0):**
   - **Proposta de Intervenção (`#intervencao`):** O texto detalhado de intervenção pública e os dois infográficos fundamentais (Destinação do Fundo Social 40/30/20/10 e Marco Legal) ficam confinados a coordenadas fixas, gerando aperto visual e falta de respiro dramático.
   - **Expediente e Integrantes (`#expediente`):** O grid de integrantes (`.members-grid`) tenta acomodar 6 fotos e nomes em apenas 2 colunas estreitas de 434px de largura total (`--w: 434`), comprimindo os retratos dos estudantes e os e-mails institucionais.
   - **Referências Bibliográficas (`#referencias`):** As 26 referências acadêmicas e jurídicas completas ficam comprimidas em duas colunas rígidas dentro de um quadro de 990px, com risco de truncamento e leitura visual sufocada.
   - **Footer (`.site-footer`):** O footer aparece como um bloco isolado de fundo azul-marinho colado imediatamente após as referências sem uma transição editorial fluida e sem ancoragem de ritmo com o restante da revista.

---

## 2. Matriz de Priorização de Achados (P0, P1, P2)

| ID | Prioridade | Seção / Componente | Sintoma Observado | Causa Técnica no CSS | Ação Corretiva em `layout-repair.css` |
|---|---|---|---|---|---|
| **F-01** | **P0** | `#referencias` | 26 referências presas a altura fixa de 990px com `overflow: hidden` em desktop. | `.page` com `aspect-ratio: 1440 / 1024` e `overflow: hidden` em `editorial.css:68,70`. | Aplicar `height: auto !important`, `aspect-ratio: auto !important`, `overflow: visible !important` e grid de leitura fluida. |
| **F-02** | **P0** | `#intervencao` | Gráficos e textos longos disputando espaço em coordenadas fixas no desktop. | `#intervencao .copy` e `#intervencao .chart` com `position: absolute` em `editorial.css`. | Converter para fluxo normal com CSS Grid de 2 colunas (prosa à esquerda, infográficos à direita com `object-fit: contain`). |
| **F-03** | **P0** | `#expediente` | 6 cartões de membros comprimidos em 2 colunas estreitas (`--w: 434`) ao lado do texto. | `.members-grid` com `grid-template-columns: repeat(2, minmax(0, 1fr))` e largura fixa. | Reestruturar para grid editorial: 3 colunas em desktop largo, 2 colunas em tablet, 1 coluna em mobile estreito; fotos e e-mails respirando. |
| **F-04** | **P0** | `.site-footer` | Transição abrupta e logo comprimido sem margem de respiro após a bibliografia. | `.site-footer` sem espaçamento de transição integrado à paleta de encerramento. | Espaçamento generoso (`padding: 64px 0`), alinhamentos limpos, logo preservado e botão "Voltar ao topo" de alta usabilidade. |
| **F-05** | **P1** | `.page` geral | Sensação de slides recortados em vez de fluxo contínuo de landing page editorial. | `.magazine` com `gap: clamp(28px, 4.5vw, 68px)` e sombras de caixa de página impressa. | Harmonizar as lâminas editoriais em um fluxo contínuo integrado, mantendo a identidade visual e as seções claras/escuras. |
| **F-06** | **P1** | `#editorial-1/2`, `#contexto-1/2` | Colunas de texto de leitura longa sem limite máximo estrito de caracteres por linha no desktop. | `.copy` sem restrição rígida de `max-width: 68ch-72ch` no fluxo normal. | Fixar `max-width: 70ch` para o texto corrido (Tufte / ProPublica), garantindo leitura sem cansaço. |
| **F-07** | **P1** | `#reportagem-1/2` | Transição do modo escuro (#050505) precisa de respiro limpo antes e depois. | Seções escuras diretamente justapostas a seções claras sem filete de contraste. | Preservar as bordas vermelhas periciais superiores e inferiores (`border-top/bottom: 4px solid var(--red)`). |
| **F-08** | **P2** | `.site-key-numbers` | Cartões de números precisam de alinhamento uniforme na grade em telas intermediárias. | `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))` pode quebrar em linhas desiguais. | Refinar o grid da faixa de dados com alinhamento e padding equilibrados. |

---

## 3. Diretrizes para a Onda 2 (Implementação)

1. **Princípio do Menor Impacto Destrutivo:** Toda a reparação visual e responsiva será concentrada em `site/css/layout-repair.css`, importada como última folha em `site/css/styles.css`.
2. **Nenhuma Alteração em Conteúdo Editorial:** O texto, a ordem das 15 páginas, os IDs, alt-texts, e-mails e os 8 gráficos permanecem estritamente intactos.
3. **Respeito aos Gates:** Antes e depois da aplicação de `layout-repair.css`, o teste do Guardião do Conteúdo (`verify-content.mjs --verify`) deve certificar **Zero Diff**.
