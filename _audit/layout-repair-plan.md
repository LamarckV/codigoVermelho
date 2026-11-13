# Plano Consolidado de Reparação de Layout e Encerramento Editorial (Gate 1)
**Projeto:** Código Vermelho — Revista Digital (site/)  
**Documento do Portão 1:** `site/_audit/layout-repair-plan.md`  
**Data:** 21 de outubro de 2026 | **Orquestração:** Orquestrador OMP  

---

## 1. Problemas Reproduzidos e Evidências por Viewport

| Viewport | Seção / Componente | Problema Verificado | Evidência Técnica |
|---|---|---|---|
| **1440px / 1920px (Desktop)** | Todas as páginas (`.page:not(.page-cover)`) | Prisão a proporção rígida de slide (`1440 / 1024`), altura fixa de 990px–1024px e `overflow: hidden`. | `editorial.css:68,70` define `aspect-ratio: 1440 / 1024; overflow: hidden;` no desktop. |
| **1440px / 1920px (Desktop)** | `#referencias` | 26 referências comprimidas em duas colunas rígidas forçadas a caber em 990px de altura. | Lista de 26 obras corre o risco de corte inferior caso fontes ou DPI variem. |
| **1440px / 1920px (Desktop)** | `#intervencao` | Gráficos (Fundo Social e Marco Legal) e texto em coordenadas fixas absolutas (`--x/--y/--w/--h`). | `#intervencao .copy` e `#intervencao .chart` possuem `position: absolute`. |
| **1440px / 1920px (Desktop)** | `#expediente` | 6 cartões de membros comprimidos em 2 colunas estreitas de 434px ao lado do bloco institucional. | `.members-grid` com `--w: 434` em `editorial.css:290`. |
| **Todos os viewports** | Transição final | O encerramento entre `#intervencao`, `#expediente`, `#referencias` e `.site-footer` parece fragmentado. | Falta de cadência de fundo e margens de transição unificadas. |

---

## 2. Causa Técnica Comprovada

1. **Herança do Motor de Diagramação Impressa:** O arquivo `site/css/editorial.css` herdou os estilos de diagramação baseados em coordenadas de revista de 1440×1024. Embora funcione perfeitamente para simular páginas estáticas de papel, colide com a intenção de uma **landing page editorial contínua e moderna**.
2. **Cascata e Sobrescrita:** Como `editorial.css` aplica regras no desktop que não foram totalmente neutralizadas em `responsive.css` para telas `>= 1025px`, o comportamento de slide persiste no desktop.

---

## 3. Arquivos Mínimos que Precisam Mudar

Para manter a integridade, rastreabilidade e permitir rollback seguro:
* **Novo arquivo único de reparação:** `site/css/layout-repair.css` (conterá 100% das regras corretivas de layout, grid, fluxo normal e encerramento coeso).
* **Arquivo modificado de importação:** `site/css/styles.css` (apenas para adicionar `@import url("layout-repair.css");` como última camada da cascata).
* **Nenhum arquivo de conteúdo ou HTML será alterado:** `site/index.html` e os textos permanecem absolutamente intocados, garantindo Zero Diff no Guardião.

---

## 4. Proposta de Grid, Ritmo e Contraste para o Fim da Página

```
[SEÇÃO 06: PROPOSTA DE INTERVENÇÃO (#intervencao)]
Fundo: Papel quente (#f6f6f6) com microtrama de rotativa
Grid Desktop: 2 Colunas equilibradas
  - Coluna Principal (60%): Título monumental vermelho, deck explicativo e texto corrido (68ch)
  - Coluna Lateral (40%): Os 2 infográficos (Fundo Social 40/30/20/10 e Marco Legal) com molduras navy e botão de zoom
Grid Mobile/Tablet: 1 Coluna sequencial natural (título -> texto -> gráficos proporcionais em largura total)
  │
  ▼ [Transição com respiro generoso e filete navy sutil]
  │
[SEÇÃO 07: EXPEDIENTE E INTEGRANTES (#expediente)]
Fundo: Papel quente (#f6f6f6)
Layout:
  - Bloco Institucional Superior/Lateral: Ficha técnica Germinare Tech / Editora 4:04, núcleos editoriais e agradecimentos com card emoldurado
  - Grid dos Integrantes: 3 colunas em desktop (3x2), 2 colunas em tablet (2x3), 1 coluna em mobile estreito
  - Cards: fotos quadradas emolduradas em vermelho com sombra dura (3px 3px 0 var(--navy)), nomes destacados e e-mails com quebra segura (overflow-wrap: break-word)
  │
  ▼ [Transição com respiro generoso]
  │
[SEÇÃO 08: REFERÊNCIAS BIBLIOGRÁFICAS (#referencias)]
Fundo: Papel marfim/técnico (#f4f0e6)
Layout:
  - Altura: 100% natural (height: auto; overflow: visible)
  - Campo de filtro rápido mantido no topo
  - Lista das 26 referências completas em ordem alfabética com recuo clássico ABNT (hanging indent), links preservados e espaçamento confortável entre entradas
  │
  ▼ [Transição com filete vermelho de alerta (4px solid var(--red))]
  │
[FOOTER INSTITUCIONAL (.site-footer)]
Fundo: Azul-marinho profundo (#163a56) com texto branco e detalhes em vermelho
Layout:
  - Topo: Logomarca Código Vermelho em proporção harmoniosa, subtítulo da edição e botão acessível "Voltar ao topo ↑"
  - Base: Metadados institucionais (Editora 4:04, Instituto J&F, Germinare Tech, disciplinas, data 18/10/2026)
  - Espaçamento: Generoso (padding: 56px 0 36px), criando a sensação de conclusão deliberada de uma revista de prestígio
```

---

## 5. Baseline do Guardião do Conteúdo

- **Data da Execução:** 21 de outubro de 2026
- **Comando:** `bun site/_audit/verify-content.mjs --verify`
- **Resultado:** **Aprovação 100% Unânime (Zero Diff)**
- **Métricas:** 15 seções verificadas, 23 imagens/gráficos checados, alt-texts íntegros, links e e-mails validados.
- **Compromisso:** Este mesmo comando deve retornar aprovação 100% sem falhas após a aplicação de `layout-repair.css`.
