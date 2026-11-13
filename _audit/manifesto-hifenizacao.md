# Manifesto de Hifenização Manual e Registro de Excertos Literais
**Projeto:** Código Vermelho — Revista Digital em Formato Landing Page  
**Localização:** `site/_audit/manifesto-hifenizacao.md`  
**Data:** Outubro de 2026 | **Governança:** Orquestrador OMP  

---

## 1. Registro de Correção de Hifenização Manual de Diagramação

Conforme expressamente autorizado nas regras do projeto ("corrigir apenas a hifenização manual de diagramação (ex.: 'consti- tucional' vira 'constitucional') e registrar cada caso num manifesto"), registramos a ocorrência única de quebra de palavra por hifenização forçada de layout na revista impressa original:

| Seção / Página Original | Elemento HTML Original | Texto Original com Quebra Forçada | Texto Adaptado e Normalizado no Site | Justificativa Técnica |
|---|---|---|---|---|
| `#direito-1` (p. 09) | `h2.display-title.title-orange.title-vazio` | `O vazio<br>consti-<br>tucional` | `O vazio<br>constitucional` | No layout fixo de revista impressa, a palavra "constitucional" havia sido partida com hífen manual para caber na coluna de 492px. No formato web contínuo e responsivo, removeu-se o hífen espúrio mantendo a integridade semântica da palavra. |

Nenhuma outra palavra do texto corrida foi alterada, resumida ou modificada.

---

## 2. Registro de Excertos Literais em Destaque (Faixa de Números)

Todos os cartões da Faixa de Números em Destaque contêm exclusivamente excertos literais de frases preexistentes no texto da revista, marcados com o atributo semântico `data-excerpt="true"` para isolamento pelo Guardião do Conteúdo:

1. **`227.386`:**
   - *Trecho literal:* "227.386 profissionais de tecnologia foram desligados sem justa causa, segundo registros oficiais do Cadastro Geral de Empregados e Desempregados (CAGED)"
   - *Localização original:* `#contexto-2` (p. 06) / `#editorial-2` (p. 04)
   - *Destino do link:* `#contexto-2`
2. **`59,4%`:**
   - *Trecho literal:* "segundo registros oficiais do CAGED, de mais de 227 mil profissionais de TI demitidos recentemente, 59,4% possuíam diploma superior completo"
   - *Localização original:* `#contexto-2` (p. 06) / `#editorial-2` (p. 04)
   - *Destino do link:* `#contexto-2`
3. **`-16,7%`:**
   - *Trecho literal:* "Variação real da renda por nível de instrução — Ensino Superior −16,7%"
   - *Localização original:* `#contexto-2` (p. 06)
   - *Destino do link:* `#contexto-2`
4. **`47%`:**
   - *Trecho literal:* "Dados do Fórum Econômico Mundial apontam que quase metade (47%) de todas as tarefas humanas já passa pela automação"
   - *Localização original:* `#editorial-2` (p. 04)
   - *Destino do link:* `#editorial-2`
5. **`38,0 milhões`:**
   - *Trecho literal:* "O Retrato da Desproteção Social no Brasil: Trabalhadores na Informalidade (Sem carteira e sem INSS) 38.0 milhões"
   - *Localização original:* `#subemprego` (p. 11)
   - *Destino do link:* `#subemprego`
6. **`33,9 milhões`:**
   - *Trecho literal:* "o Brasil convive hoje com uma massa de 33,9 milhões de pessoas em vulnerabilidade laboral"
   - *Localização original:* `#subemprego` (p. 11)
   - *Destino do link:* `#subemprego`
7. **`20,9 milhões`:**
   - *Trecho literal:* "incluindo 20,9 milhões de trabalhadores subutilizados — cidadãos qualificados que gostariam de trabalhar em tempo integral"
   - *Localização original:* `#subemprego` (p. 11)
   - *Destino do link:* `#subemprego`
8. **`77%`:**
   - *Trecho literal:* "dados da OIT, que revelam que 77% dos motoristas e entregadores por aplicativo no país não possuem cobertura do INSS"
   - *Localização original:* `#subemprego-2` (p. 12)
   - *Destino do link:* `#subemprego-2`
9. **`38 anos`:**
   - *Trecho literal:* "Art. 7º, XXVII sem regulamentação há 38 anos"
   - *Localização original:* `#direito-1` (p. 09)
   - *Destino do link:* `#direito-1`
10. **`26 anos`:**
    - *Trecho literal:* "Convenção 158 da OIT parada no STF por 26 anos na ADI 1625"
    - *Localização original:* `#direito-1` (p. 09)
    - *Destino do link:* `#direito-1`
11. **`40% / 30% / 20% / 10%`:**
    - *Trecho literal:* "Destinação do Fundo Social sobre Automação Substitutiva — Requalificação Remunerada 40%, Manutenção de Renda Básica 30%, Inclusão Previdenciária 20%, Fiscalização Algorítmica 10%"
    - *Localização original:* `#intervencao` (p. 13)
    - *Destino do link:* `#intervencao`
