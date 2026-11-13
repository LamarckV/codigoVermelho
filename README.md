# Código Vermelho — Revista Digital (Edição 1)
> **"Trabalho descartável: até quando vamos fingir que isso é progresso?"**  
> *Editora 4:04 // Instituto J&F — Germinare Tech*  
> *São Paulo – SP | 18 de outubro de 2026*

Este diretório (`site/`) contém a versão completa da revista em formato **landing page e leitura contínua**, desenvolvida em HTML5, CSS3 e JavaScript vanilla, sem dependências JavaScript externas, pré-processadores ou etapa de build. As pilhas priorizam Rodchenko/Lufga locais, com Stardos Stencil, Outfit e Inter como fallbacks carregados do Google Fonts.

---

## 1. Visão Geral e Princípios do Redesign

1. **Fidelidade à edição publicada:** os textos seguem a versão pública indicada pelo grupo ([revista de referência](https://buscariolo-rogerio.github.io/codigo-vermelho-revista/)); a seção “A Radiografia da Substituição em Números” foi removida conforme solicitado. Os dois gráficos novos usam séries rastreáveis nos PDFs de pesquisa.
2. **Design Editorial Humanizado:** Inspirado nas redações de jornalismo investigativo independente (*The Markup*, *The Intercept Brasil*, *Rest of World*, *ProPublica*, *Agência Pública* e *The Marshall Project*):
   - Tipografia de impacto construtivista para manchetes e leiturabilidade otimizada (65–75 caracteres por linha) no corpo do texto.
   - Substrato de papel aquecido com microtrama milimetrada técnica e sombras duras de impressão (`3px 3px 0 var(--navy)`).
   - Uso cirúrgico do vermelho arterial (`#e00508`) estritamente em dados alarmantes, capitulares clássicas e indicadores de ação.
   - Transição imersiva para o modo noturno absoluto (`#000000`) no bloco central da Reportagem Investigativa (pp. 07–08), ambientando a solidão das 21h em frente à tela.
3. **Acessibilidade e Usabilidade:** 
   - Contraste e estados de foco foram considerados na tipografia e nos controles; a auditoria responsiva não declara conformidade WCAG integral.
   - Navegação completa por teclado com anéis de foco de alta visibilidade e skip link inicial.
   - Lightbox acessível nativo (`<dialog>`) para ampliação em alta resolução de todos os 10 gráficos da revista.
   - Dois formatos novos: distribuição regional em donut (CAGED/Barbosa, 2023) e evolução projetada de tarefas por tecnologia em slope (WEF, 2020).
   - Filtro de busca instantâneo na seção de Referências Bibliográficas.

---

## 2. Estrutura de Arquivos e Arquitetura de CSS

```
site/
├── index.html               # Ponto de entrada principal (abre direto no navegador)
├── README.md                # Este documento de instruções e governança
├── CONCEITO.md              # Manifesto de arquitetura de informação e direção de arte
├── css/
│   ├── styles.css           # Orquestrador da cascata limpa (tokens -> editorial -> landing -> sections)
│   ├── tokens.css           # Tokens globais: paleta semântica, fontes, contêiner único (--container-max: 1220px)
│   ├── editorial.css        # Fundamentos editoriais: tipografia de prosa justificada, dropcaps, folios, boxes conceituais
│   ├── landing.css          # Casca web: header fixo, barra de progresso, contador 01/10, lightbox de gráficos (<dialog>)
│   └── sections.css         # Layouts fluidos e contínuos das 15 seções (sem aspect-ratio rígido, sem rolagens internas)
├── js/
│   ├── charts.js            # Dez gráficos responsivos e interativos, com dados e fontes da edição publicada
│   └── main.js              # Interações: progresso contínuo, scroll-spy, zoom acessível e busca em referências
├── assets/                  # 46 ativos (23 PNGs originais + 23 WebPs otimizados)
└── _audit/                  # Governança editorial, métricas e auditorias automatizadas
    ├── original-content.json   # Snapshot canônico de conteúdo da revista (fonte da verdade)
    ├── verify-content.mjs      # Guardião do Conteúdo (auditoria estrita de texto e imagens, zero diff)
    ├── metrics.mjs             # Auditoria de layout: overflow horizontal, seções rígidas, justificação de prosa
    ├── baseline.json           # Métricas do baseline inicial para comparação
    ├── diagnostico-css.md      # Diagnóstico aprofundado da cascata, conflitos e causas raiz
    ├── plano-css.md            # Plano diretor de refatoração arquitetural em fluxo contínuo
    ├── relatorio-css.md        # Relatório final de melhorias de CSS, métricas antes/depois e decisões
    └── screenshots/            # Screenshots automatizados por viewport (baseline vs final)
```

### 2.1 Principais Métricas de Refatoração de CSS:
- **Tamanho Total de CSS:** **116.760 bytes** medidos na auditoria final (`_audit/metrics.mjs`).
- **Uso de `!important`:** **10** declarações.
- **Seções Rígidas (com aspect-ratio / max-height / overflow != visible):** **ZERO** em todas as 8 larguras testadas (320px a 2560px).
- **Overflow Horizontal (`scrollWidth > innerWidth`):** **ZERO** em todas as larguras.
- **Prosa Justificada:** 38 de 41 parágrafos identificados pelo auditor; 3 não atendem ao critério de justificação.
---

## 3. Como Executar Localmente

O site é estático, sem etapa de build; o carregamento da tipografia externa é opcional e conta com fallbacks locais.
* **Execução Direta:** Basta dar dois cliques ou abrir `site/index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari). Todas as fontes possuem fallbacks robustos e os caminhos são relativos.
* **Via Servidor Local Simples (opcional):**
  ```bash
  # Via Python:
  cd site && python -m http.server 8000

  # Via Bun / Node:
  bun x serve site
  ```

---

## 4. Publicação no GitHub Pages

O projeto está pronto para publicação imediata no GitHub Pages:
1. Acesse o repositório no GitHub.
2. Navegue até **Settings** > **Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Aponte para a branch `feat/site-revista-landing` (ou `main`, se mesclado) e defina a pasta de publicação como `/site` (ou crie um workflow de GitHub Actions direcionando o deploy para o diretório `site/`).

---

## 5. Como Verificar a Integridade do Conteúdo (Guardião do Conteúdo)

Para comprovar que os textos, imagens e tipos de gráficos interativos permanecem alinhados à edição adotada:
```bash
# Executar a auditoria automatizada a partir da raiz do repositório:
bun site/_audit/verify-content.mjs --verify
```
O snapshot canônico está em `site/_audit/original-content.json` e foi gerado a partir de `site/index.html`, a cópia publicada escolhida como referência. `--verify` compara cada seção, imagens/alt-texts e contagem de cada tipo de gráfico interativo. Para atualizar o snapshot após uma alteração editorial aprovada, execute `bun site/_audit/verify-content.mjs --snapshot` a partir da raiz do repositório.

---

## 6. Governança e Decisões Pendentes de Aprovação

Consulte os arquivos na pasta `site/_audit/`:
* `site/_audit/microcopy.md`: Contém a lista de todas as microcópias de interface (rótulos de menu, botão voltar ao topo, contador `01 / 10`).
* `site/_audit/links-pendentes.md`: Registra fontes governamentais e internacionais (OIT, IBGE, MTE) cujos firewalls bloqueiam scrapers externos, as quais foram mantidas ancoradas às referências bibliográficas do rodapé por segurança e estabilidade.
