# Conceito Editorial e Arquitetura da Informação — Código Vermelho (Site)
**Documento do Portão da Fase 2**  
**Versão:** 1.0 — Outubro de 2026 | **Editora:** 4:04 / Instituto J&F — Germinare Tech  

---

## 1. Estrutura Canônica da Landing Page
O site reorganiza as 15 páginas impressas em uma experiência web contínua e imersiva de jornalismo investigativo, mantendo rigorosamente a ordem cronológica e a integridade de cada palavra da revista:

```
[HEADER FIXO] Logo Código Vermelho · Menu das 10 Seções · Progresso de Leitura · Menu Mobile
  │
  ├── 1. HERO = CAPA (#capa)
  │      Foto do executivo ciborgue · Fita pericial amarela "1º Edição" · Logo · Metadados · Manchete
  │
  ├── 2. SUMÁRIO EXECUTIVO (#sumario)
  │      Índice visual interativo com links de ancoragem para cada capítulo · Ilustração original
  │
  ├── 3. FAIXA DE EVIDÊNCIAS & NÚMEROS DE IMPACTO (data-excerpt="true")
  │      11 cartões de dados (227.386 demitidos, -16,7% renda, 77% sem INSS, etc.) linkados às fontes
  │
  ├── 4. EDITORIAL INTEGRADO (#editorial)
  │      Fusão contínua de p.03 e p.04 · Foto da mulher-circuitos · Foto da Justiça · Duas capitulares
  │
  ├── 5. CONTEXTUALIZAÇÃO: A MENTE ELETRÔNICA (#contexto)
  │      Fusão de p.05 e p.06 · Boxes Trabalho Cristalizado e Fantasma · Gráficos de Renda e Escolaridade
  │
  ├── 6. REPORTAGEM INVESTIGATIVA: VIGIADOS E DESCARTADOS (#reportagem · MODO ESCURO #050505)
  │      Fusão de p.07 e p.08 · Ambiente noturno 21h · Depoimentos de Marcos e Luis · People Analytics
  │
  ├── 7. DIREITO EM XEQUE: O VAZIO E AS ARMAS LEGAIS (#direito)
  │      Fusão de p.09 e p.10 · Foto do Martelo · Gráficos de Inércia e Ações · Box Art. 7º · Guia de Defesa
  │
  ├── 8. O LABIRINTO DO SUBEMPREGO: A ESCADA QUEBRADA (#subemprego)
  │      Fusão de p.11 e p.12 · Gráfico de Desproteção · Box IBGE · Foto do Uber · Gráfico Previdência App
  │
  ├── 9. PROPOSTA DE INTERVENÇÃO: ALÉM DO LUCRO DOS ALGORITMOS (#intervencao)
  │      Plano de Ação em 5 eixos · Gráfico do Fundo Social (40/30/20/10) · Gráfico do Marco Legal
  │
  ├── 10. EXPEDIENTE E INTEGRANTES (#expediente)
  │       Ficha institucional Germinare Tech · Grid com os 6 integrantes com fotos autênticas e e-mails
  │
  ├── 11. REFERÊNCIAS BIBLIOGRÁFICAS (#referencias)
  │       Relação das 26 referências acadêmicas e legais completas em ABNT com recuo tipográfico
  │
[FOOTER COMPLETO] Chancela Editora 4:04 · Instituto J&F · Disciplinas · Data 18/10/2026 · Voltar ao Topo
```

---

## 2. Sistema de Destaque e Semiótica da Cor
* **Regra do Vermelho Cirúrgico (`#e00508`):**
  * O vermelho arterial nunca cobre fundos amplos de texto de leitura longa, evitando cansaço retiniano.
  * Funciona como **bisturi de atenção**:
    * Números alarmantes (`227.386`, `-16,7%`, `77%`).
    * Termos jurídicos e institucionais chave (`Artigo 7º`, `LGPD`, `CLT`, `OIT`).
    * Capitulares de 3 linhas no início das reportagens.
    * Indicadores de foco, linha superior de leitura e bordas de alerta pericial.
* **Paleta Editorial Humana:**
  * **Papel Quente (`--paper: #f6f6f6`):** Substrato off-white com microtrama milimetrada sutil de rotativa.
  * **Azul-Marinho Profundo (`--navy: #163a56`):** A tinta de impressão para vigas, títulos e molduras duras.
  * **Azul Box (`--blue-box: #004f77`):** Boxes conceituais frios e de procedimentos de defesa.
  * **Noite de Terminal (`--night: #050505` com texto `#ded8c4`):** Reservado para o bloco de Reportagem (pp. 07–08), ambientando a solidão do programador diante da tela às 21h.

---

## 3. Grid, Proporções e Tipografia Fluida
* **Desktop (1440px):**
  * Coluna central de leitura com largura estritamente controlada entre **65 e 75 caracteres por linha** (`max-width: 68ch` a `72ch`), padrão de legibilidade consagrado por Tufte e pelo design guide da *ProPublica*.
  * Margens laterais assimétricas dedicadas a caixas de dossiê, pull quotes periciais e gráficos que se expandem para fora do eixo de texto (*breakout figures*).
* **Mobile (390px):**
  * Fluxo vertical unicolunar fluido, sem posições absolutas ou cortes de texto.
  * Botões e controles com área mínima de toque de **44 × 44px**.
  * Gráficos com botão acessível de ampliação e suporte a visualização em tela cheia via `<dialog>` nativo.
* **Tipografia:**
  * **Títulos e Display:** `Rodchenko` / `Stardos Stencil` / `Impact` / `Oswald`, caixa-alta condensada, transmitindo a urgência de um manifesto ou denúncia institucional.
  * **Texto Corrido:** `Lufga` / `Outfit` / `Inter`, modularmente escalada via `clamp(1rem, 0.95rem + 0.35vw, 1.15rem)` com `line-height: 1.62` a `1.68` para leitura repousante.

---

## 4. Decisões Ligadas às Referências
1. **The Markup:** Adoção de caixas de metodologia e exibição de dados estatísticos como evidência com fontes verificadas.
2. **The Intercept Brasil:** O Hero ocupa 100vh no primeiro impacto visual, criando o choque inicial da denúncia antes do aprofundamento analítico.
3. **Rest of World:** Cadência harmoniosa entre texto longo e infografia na seção de Subemprego, sem estresse visual.
4. **ProPublica:** Menu superior fixo com barra de progresso contínuo (`reading-progress-bar`) e caixas contextuais laterais para marcos legais sem quebrar o fluxo de leitura.
5. **Humanização Anti-IA:** Rejeição explícita de glassmorphism, cantos de 24px e ilustrações 3D genéricas; adoção de sombras duras de impressão (`3px 3px 0 var(--navy)`), capitulares clássicas e fotos autênticas dos estudantes autores do projeto.
