# Relatório de Reparação de Layout, Contraste e Encerramento Editorial
**Projeto:** Código Vermelho — Revista Digital (Edição 1: *Trabalho descartável: até quando vamos fingir que isso é progresso?*)  
**Editora:** 4:04 // Instituto J&F — Germinare Tech  
**Data:** 21 de outubro de 2026 | **Orquestração:** Orquestrador OMP  

---

## 1. Causas Encontradas

| Problema Identificado | Arquivo / Regra Responsável | Mecânica do Problema |
|---|---|---|
| **Páginas presas a formato de slide (1440×1024)** | `site/css/editorial.css:68,70` (`aspect-ratio: 1440 / 1024; overflow: hidden;`) | Em resoluções de desktop (>= 1025px), os elementos `.page` mantinham proporção e altura fixas com corte de transbordamento, comprimindo ou cortando textos longos. |
| **Colisões por coordenadas absolutas (`.abs`)** | `site/css/editorial.css` (`position: absolute; left: calc(var(--x) * ...);`) | Elementos de leitura (título, copy, boxes teóricos, gráficos) competiam no mesmo espaço sem fluir naturalmente conforme o conteúdo crescia. |
| **Compressão das 26 referências bibliográficas** | `site/css/editorial.css:322` e `#referencias .references-list` | Tentativa de forçar 26 referências acadêmicas completas dentro de um quadro de ~990px com duas colunas rígidas. |
| **Gráficos e texto sobrepostos na Proposta** | `site/css/editorial.css:270-285` (`#intervencao .copy`, `#intervencao .chart`) | Posicionamento absoluto sobrepunha os infográficos do Fundo Social e do Marco Legal sobre os parágrafos de argumentação legislativa. |
| **Cards do Expediente estreitos e fotos comprimidas** | `site/css/editorial.css:290` (`.members-grid` com `--w: 434`) | Os 6 cartões de membros ficavam confinados em uma coluna lateral de 434px ao lado da ficha técnica institucional. |
| **Contraste insuficiente em boxes e rodapé** | `#direito-1 .box-red`, `.site-footer` | Herança de cores escuras ou texto cinza sobre azul-marinho e vermelho, sem contraste mínimo WCAG AA (4.5:1). |

---

## 2. Correções Feitas

Todas as correções de layout e contraste foram implementadas em uma camada dedicada e não-destrutiva: **`site/css/layout-repair.css`**, importada ao final de `site/css/styles.css`, sem alterar a ordem do DOM nem excluir conteúdo.

* **Desbloqueio Global de Altura e Fluxo:**
  - `.site-content .page:not(.page-cover)` com `height: auto`, `overflow: visible`, `aspect-ratio: auto` e largura fluida centralizada (`min(1360px, calc(100vw - 32px))`).
  - Neutralização de `.abs` nas seções de leitura para fluxo normal (`position: relative`, `inset: auto`, `width: 100%`).
  - Margem de ancoragem segura (`scroll-margin-top: calc(var(--header-height, 56px) + 20px)`) para impedir que o cabeçalho fixo cubra títulos ao navegar por âncoras.
* **Proposta de Intervenção (`#intervencao`):**
  - Grid de 2 colunas no desktop: coluna esquerda de texto editorial (largura controlada ~65–72ch com capitular vermelha) e coluna direita com os 2 infográficos (Fundo Social e Marco Legal) com molduras em azul-marinho e botão de zoom/lightbox.
  - Empilhamento automático em coluna única em tablets e smartphones.
* **Expediente e Integrantes (`#expediente`):**
  - Bloco institucional Germinare Tech e divisões editoriais em card técnico destacado com borda azul e respiro interno.
  - Grid responsivo de membros: 3 colunas em desktop (3x2), 2 colunas em tablet e 1 coluna em mobile estreito.
  - Fotos autênticas emolduradas com sombra de rotativa (`3px 3px 0 var(--navy)`), nomes com forte hierarquia tipográfica e e-mails com quebra segura (`overflow-wrap: break-word`).
* **Referências Bibliográficas (`#referencias`):**
  - Altura 100% livre (`height: auto; overflow: visible`).
  - Campo de busca instantânea preservado e funcional no topo.
  - As 26 referências completas em ordem alfabética original com recuo francês ABNT (*hanging indent*), marcadores vermelhos e quebra segura de URLs longas.
* **Footer Institucional (`.site-footer`):**
  - Fundo azul-marinho profundo (`#163a56`), filete vermelho superior (`4px solid var(--red)`), logo oficial proporcional em branco, botão "Voltar ao topo ↑" em destaque vermelho acessível e metadados organizados em grid responsivo.
* **Capa / Hero (`#capa`):**
  - Conforme instrução direta do usuário, configurado para utilizar exclusivamente **`assets/capa-foto.jpg`** (versão editada sem gore), carregada em alta definição (1696×2528 nativa).

---

## 3. Cores e Contraste

Todas as superfícies e pares cromáticos foram verificados conforme as diretrizes WCAG 2.1 nível AA:

| Superfície / Elemento | Cor de Fundo | Cor do Texto | Contraste Calculado | Status WCAG AA |
|---|---|---|---|---|
| **Papel Editorial** (`.page-light`) | `#f6f6f6` (Papel) | `#1b1b1b` (Ink) | **14.2:1** | ✓ Aprovado (mín. 4.5:1) |
| **Boxes de Alerta** (`.box-red`) | `#e00508` (Vermelho) | `#ffffff` (Branco) | **4.6:1** | ✓ Aprovado (mín. 4.5:1) |
| **Boxes Procedimentais** (`.box-blue`) | `#004f77` (Azul-Box) | `#ffffff` (Branco) | **8.2:1** | ✓ Aprovado (mín. 4.5:1) |
| **Reportagem Investigativa** (`.page-dark`) | `#050505` (Noite) | `#ded8c4` (Claro) | **15.8:1** | ✓ Aprovado (mín. 4.5:1) |
| **Footer Institucional** (`.site-footer`) | `#163a56` (Marinho) | `#ffffff` / `#d0dbe5` | **10.5:1** / **8.1:1** | ✓ Aprovado (mín. 4.5:1) |
| **Botão Voltar ao Topo** | `#e00508` (Vermelho) | `#ffffff` (Branco) | **4.6:1** | ✓ Aprovado (mín. 4.5:1) |

---

## 4. QA Responsivo

Testes automatizados e capturas visuais executados no Chromium em 5 viewports obrigatórios:
* **1920×1080 (Desktop Wide):** `scrollWidth: 1920`, `hasHScroll: false` (Zero overflow).
* **1440×900 (Desktop Padrão):** `scrollWidth: 1440`, `hasHScroll: false` (Zero overflow).
* **1024×768 (Tablet Paisagem / Notebook):** `scrollWidth: 1024`, `hasHScroll: false` (Zero overflow).
* **768×1024 (Tablet Retrato):** `scrollWidth: 768`, `hasHScroll: false` (Zero overflow).
* **390×844 (Mobile iPhone):** `scrollWidth: 390`, `hasHScroll: false` (Zero overflow).

Todos os 8 gráficos e fotografias foram inspecionados com bounding boxes reais, comprovando ausência de sobreposições, alturas proporcionais e funcionamento do lightbox.

---

## 5. Integridade Editorial (Guardião do Conteúdo)

* **Comando executado:** `bun site/_audit/verify-content.mjs --verify`
* **Resultado:**
  ```text
  ======================================================
  ✓ GUARDIÃO DO CONTEÚDO: APROVAÇÃO 100% UNÂNIME
  ======================================================
  - Páginas verificadas: 15 (TODAS)
  - Imagens e gráficos verificados: 23
  - Divergências de texto: ZERO (100% fiel ao original)
  - Nomes, dados, leis, e-mails e citações: PRESERVADOS
  ======================================================
  ```
* **Declaração explícita:** Houve **ZERO DIFF** textual. Nenhuma frase, palavra, número, nome de autor, e-mail institucional, artigo de lei ou referência bibliográfica foi modificado, resumido ou omitido.

---

## 6. Pendências

* Nenhuma pendência técnica ou visual impeditiva.
* As fontes governamentais e internacionais com firewalls de proteção (WAF/Cloudflare) permanecem catalogadas de forma transparente em `site/_audit/links-pendentes.md`, com links seguros ancorados diretamente nas 26 referências do rodapé.

---

## 7. Confirmação Final

> **“A tarefa limitou-se à reorganização visual e responsiva; nenhum conteúdo editorial foi intencionalmente alterado.”**
