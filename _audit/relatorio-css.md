# Relatório final — apresentação da revista Código Vermelho

**Escopo:** identidade visual, leitura responsiva, gráficos e organização das páginas da Edição 1.  
**Status:** alterações implementadas e verificadas; nenhum commit criado.

## Decisões aplicadas

- **Capa:** selo “1ª edição” em fita diagonal; marca Editora 4:04 no canto inferior direito. A fotografia da capa foi preservada.
- **Títulos:** títulos editoriais e título do sumário seguem a linguagem do título principal, com stencil vermelho, sem tarja/fundo vermelho. “Vigiados e descartados” e “A sentença invisível do algoritmo” ficam centralizados.
- **Tipografia:** pilhas `Rodchenko`/`Stardos Stencil` para títulos e `Lufga`/`Outfit`/`Inter` para o corpo; peso 700 alinhado à manchete da capa em todos os títulos editoriais e no sumário.
- **Reportagem (pp. 07–08):** faixa em preto absoluto `#000000`, fotografia menor à direita e sem moldura ou margens azuis/vermelhas. O texto ocupa uma coluna larga à esquerda; em telas estreitas, imagem e texto passam ao fluxo vertical.
- **Contextualização:** dois gráficos de barras rediagramados para leitura lado a lado em tela larga, preservando os dados e o zoom interativo.
- **Áreas antes vazias:** dois gráficos de tipos distintos foram acrescentados, sem estimativas próprias:
  - **Donut regional**, em Direito em Xeque: participação nos 227.386 desligamentos em tecnologia sem justa causa — Sudeste 65,2%, Sul 18,9%, Centro-Oeste 9,2%, Nordeste 6,2% e Norte 0,5%. Fonte: Barbosa (2023), dissertação UFU, Tabela 1, p. 43 impressa (p. 47 do PDF), dados do CAGED.
  - **Gráfico slope**, em Proposta de Intervenção: tarefas realizadas por tecnologia, 38% em 2020 e 47% em 2025, identificando 2025 como projeção. Fonte: *Future of Jobs Report 2020* (WEF), citado em `DESEMPREGO EM MASSA PELA TECNOLOGIA IMPACTO.pdf`, p. 9.
- **Pesquisa:** oito PDFs foram examinados. `contri,+09.pdf` (1985) não oferece uma série atual adequada a estas visualizações e não foi usado como dado contemporâneo.
- **Radiografia:** “A Radiografia da Substituição em Números” foi removida, junto de suas referências de navegação.
- **Rodapé:** removidas as quatro linhas institucionais redundantes solicitadas; permanecem o título da edição e “Voltar ao topo”.
- **Expediente:** informações institucionais em disposição horizontal; integrantes em três colunas sob o título “INTEGRANTES”.
- **Direito em Xeque (p. 10):** o donut regional fica abaixo do box “Fui demitido por IA: como me defender?”, na mesma coluna; em telas estreitas, aparece após o box no fluxo vertical.
- **Subemprego (p. 11):** “A escada quebrada” foi alinhada mais à direita; a largura do bloco de texto foi ampliada para preencher o espaço ao lado e o texto flui junto ao título, sem alteração de conteúdo.

## Fontes e integridade editorial

A cópia pública indicada pelo grupo foi adotada como referência textual da edição. O snapshot de `_audit/original-content.json` foi atualizado a partir de `site/index.html`, em vez do antigo `../index.html`, cuja redação não corresponde à cópia pública escolhida. Portanto, a verificação abaixo atesta consistência com o snapshot editorial atual; não afirma identidade com o arquivo antigo nem com a versão impressa.

`node _audit/verify-content.mjs --verify` aprovou **15 seções, 15 imagens e 10 gráficos interativos**, sem divergências textuais, de alt-text ou na contagem por tipo de gráfico. O verificador agora contabiliza figuras `data-chart` e compara os tipos, além das imagens.

A verificação dos atributos locais `src` e `srcset` encontrou 33 referências e nenhum arquivo ausente.

## Verificação visual e responsiva

A auditoria final de `_audit/metrics.mjs` percorreu 320, 390, 768, 1024, 1280, 1440, 1920 e 2560 px. Não encontrou overflow horizontal nem seções rígidas em nenhuma largura. O total de CSS foi **116.760 bytes**, contra 132.932 no baseline (redução de 16.172 bytes); `!important` caiu de 670 para 10. O auditor identificou 3 parágrafos não justificados entre 41; os demais 38 atendem ao critério.

| Viewport | Altura do documento | Overflow horizontal | Seções rígidas | Parágrafos não justificados |
|---:|---:|:---:|---:|---:|
| 320 px | 29.023 px | Não | 0 | 3/41 |
| 390 px | 25.767 px | Não | 0 | 3/41 |
| 768 px | 19.798 px | Não | 0 | 3/41 |
| 1024 px | 16.594 px | Não | 0 | 3/41 |
| 1280 px | 15.950 px | Não | 0 | 3/41 |
| 1440 px | 16.297 px | Não | 0 | 3/41 |
| 1920 px | 16.345 px | Não | 0 | 3/41 |
| 2560 px | 16.345 px | Não | 0 | 3/41 |

Na inspeção em 1568 px, a página da Reportagem mostrou o texto à esquerda e a foto de 312 × 429 px alinhada à direita, sem sobreposição. Em 320, 390, 768 e 1024 px, o conteúdo permaneceu dentro da largura da tela e a imagem passou abaixo do texto. Os títulos das duas páginas escuras ficaram centralizados.

Foram exercitados o donut (seleção de região atualiza o valor central), o zoom dos gráficos (abre e fecha, com foco restaurado) e o tooltip do gráfico slope; o tooltip identifica 2025 como projeção. O console do navegador não registrou erros durante essa inspeção.

## Arquivos e evidências

- `css/sections.css`, `css/editorial.css`: títulos, capa, reportagem, gráficos e layouts responsivos.
- `index.html`, `js/charts.js`: marcação e dados dos gráficos interativos.
- `README.md`: estrutura, fontes e métricas atualizadas.
- `_audit/verify-content.mjs`, `_audit/original-content.json`: integridade textual, imagens, alt-texts e tipos de gráficos.
- `_audit/screenshots/final/`: capturas geradas pela auditoria nas larguras testadas.
