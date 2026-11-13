# Manifesto de Microcopy de Interface (Para Aprovação do Usuário)
**Projeto:** Código Vermelho — Revista Digital em Formato Landing Page  
**Localização:** `site/_audit/microcopy.md`  
**Regra Estrita:** Todo texto do site é 100% idêntico ao original da revista. Os únicos textos novos são microcópias estritas de utilidades de interface (navegação, botões acessíveis, rótulos de controle e leitores de tela), identificadas no HTML com `data-ui-chrome="true"`. Nenhum resumo, texto editorial ou frase inventada foi adicionado.

---

## 1. Rótulos de Navegação e Menu Principal (Header)
Os itens de menu utilizam **estritamente** os nomes das seções que já constam na revista original:
- `Capa` (leva a `#capa`)
- `Sumário` (leva a `#sumario`)
- `Editorial` (leva a `#editorial`)
- `Contextualização` (leva a `#contexto`)
- `Reportagem` (leva a `#reportagem`)
- `Direito em Xeque` (leva a `#direito`)
- `O Labirinto do Subemprego` (leva a `#subemprego`)
- `Proposta de Intervenção` (leva a `#intervencao`)
- `Expediente` (leva a `#expediente`)
- `Referências` (leva a `#referencias`)

## 2. Acessibilidade e Leitores de Tela (Aria-Labels)
- `Pular para o conteúdo principal` (Skip link para navegação por teclado direto para `<main id="conteudo-principal">`)
- `Navegação principal da revista Código Vermelho` (`aria-label` do `<nav class="site-nav">`)
- `Abrir menu de navegação` / `Fechar menu de navegação` (`aria-label` do botão hambúrguer mobile `.nav-toggle`)
- `Progresso de leitura:` (`aria-label` do indicador `.reading-progress`)
- `Ampliar gráfico em alta resolução` (`aria-label` do botão de lupa `.chart-zoom-btn`)
- `Fechar janela de visualização do gráfico` (`aria-label` do botão de fechar modal `.dialog-close-btn`)
- `Voltar ao topo da página` (`aria-label` e texto do botão `.back-to-top`)
- `Ver fonte da citação nas referências bibliográficas` (`aria-label` dos links internos de citação)

## 3. Botões e Ações de Interface
- `Voltar ao topo ↑` (Botão flutuante acessível no canto inferior direito e link de rodapé)
- `Ver referências bibliográficas ↓` (Atalho de rodapé de bloco para consultar as fontes completas)
- `Clique para ampliar ⤢` (Dica tátil visual em figuras de gráficos interativos)
- `Fonte original (abre em nova aba ↗)` (Dica para links de documentos governamentais externos)

## 4. Indicadores de Leitura e Metadados de Interface
- `Tempo estimado de leitura: ~18 minutos` (Indicador sutil de fôlego editorial no cabeçalho do artigo, inspirado no *Rest of World*)
- `Nesta edição` (Texto original da p. 02 preservado)
- `Edição 1 — Ano 1 — 18 de outubro de 2026` (Texto original da p. 01 preservado)

---

## 5. Excertos Literais de Destaque (Pull Quotes e Faixa de Números)
Conforme autorizado pelas regras ("Destaques tipo 'pull quote' e 'número em destaque' só podem repetir trechos EXISTENTES, literalmente, marcados como excerto e listados no manifesto"), todos os cartões de dados contêm unicamente frases existentes no texto da revista com a marcação `data-excerpt="true"`:
1. `227.386` — "profissionais de tecnologia foram desligados sem justa causa, segundo registros oficiais do Cadastro Geral de Empregados e Desempregados (CAGED)" (p. 06 / p. 04)
2. `59,4%` — "Superior completo 59,4% dos demitidos em tecnologia por escolaridade" (p. 06)
3. `-16,7%` — "Variação real da renda por nível de instrução: Ensino Superior −16,7%" (p. 06)
4. `47%` — "quase metade (47%) de todas as tarefas humanas já passa pela automação" (p. 04)
5. `38 milhões` — "O Brasil convive hoje com uma massa de 38,0 milhões de trabalhadores na informalidade (sem carteira e sem INSS)" (p. 11)
6. `33,9 milhões` — "população em vulnerabilidade laboral ampla" (p. 11)
7. `20,9 milhões` — "trabalhadores subutilizados (subocupados ou desalentados)" (p. 11)
8. `77%` — "77% dos trabalhadores de aplicativo sem cobertura do INSS" (p. 12)
9. `38 anos` — "Artigo 7º, inciso XXVII sem regulamentação há 38 anos" (p. 09)
10. `26 anos` — "Convenção 158 da OIT parada no STF por 26 anos na ADI 1625" (p. 09)
11. `40% / 30% / 20% / 10%` — "Destinação do Fundo Social sobre Automação Substitutiva: Requalificação 40%, Renda Básica 30%, Previdência 20%, Fiscalização 10%" (p. 13)
