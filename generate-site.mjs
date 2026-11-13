import fs from 'node:fs';
import path from 'node:path';

// Load original HTML
const originalHtml = fs.readFileSync('index.html', 'utf8');

function getInnerSection(id) {
  const re = new RegExp(`<section\\b[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/section>`, 'i');
  const m = originalHtml.match(re);
  if (!m) throw new Error(`Section #${id} not found`);
  return m[1];
}

fs.mkdirSync('site/_blocks', { recursive: true });

// 1. BLOCO A: Header + Hero (Capa) + Sumário
const blockAHtml = `
<!-- HEADER FIXO DE NAVEGAÇÃO -->
<header class="site-header" role="banner" data-ui-chrome="true">
  <div class="reading-progress-track" aria-hidden="true">
    <span class="reading-progress-bar" id="readingProgressBar"></span>
  </div>
  <a class="site-header__brand" href="#capa" aria-label="Código Vermelho - Voltar à Capa">
    <img class="site-header__logo" src="assets/codigo-vermelho-logo.png" alt="Código Vermelho" width="354" height="144">
    <span class="site-header__tagline">Revista Digital // Ed. 1</span>
  </a>
  <nav class="site-nav" id="siteNav" aria-label="Navegação principal da revista Código Vermelho">
    <ul class="site-nav__list">
      <li><a class="site-nav__link" href="#capa">Capa</a></li>
      <li><a class="site-nav__link" href="#sumario">Sumário</a></li>
      <li><a class="site-nav__link" href="#editorial">Editorial</a></li>
      <li><a class="site-nav__link" href="#contexto">Contexto</a></li>
      <li><a class="site-nav__link" href="#reportagem">Reportagem</a></li>
      <li><a class="site-nav__link" href="#direito">Direito</a></li>
      <li><a class="site-nav__link" href="#subemprego">Subemprego</a></li>
      <li><a class="site-nav__link" href="#intervencao">Proposta</a></li>
      <li><a class="site-nav__link" href="#expediente">Equipe</a></li>
      <li><a class="site-nav__link" href="#referencias">Fontes</a></li>
    </ul>
  </nav>
  <div class="site-header__controls">
    <span class="reading-counter" id="readingCounter" aria-live="polite" aria-atomic="true">01 / 10</span>
    <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="siteNav" aria-label="Abrir menu de navegação">
      ☰
    </button>
  </div>
</header>

<!-- SEÇÃO 01: CAPA (HERO IMERSIVO) -->
<section id="capa" class="site-hero page page-cover" data-page="01" aria-label="Capa">
  <img class="site-hero__backdrop" src="assets/capa-foto.png" alt="Executivo de tecnologia retratado como metade humano e metade máquina" width="1024" height="1024">
  <div class="site-hero__overlay" aria-hidden="true"></div>
  <div class="site-hero__ribbon edition-ribbon"><span>1º Edição</span></div>
  <div class="site-hero__masthead masthead">
    <img class="site-hero__logo cover-logo" src="assets/codigo-vermelho-logo.png" alt="Código Vermelho" width="354" height="144">
    <p class="site-hero__meta masthead-meta">Editora 4:04<br>Edição 1 - ano 1 - nº 1<br>18 de outubro de 2026</p>
  </div>
  <div class="site-hero__content">
    <p class="site-hero__kicker cover-kicker">Trabalho descartável:</p>
    <div class="site-hero__bar cover-bar">
      <h1 class="site-hero__title">Até quando vamos fingir que isso é progresso?</h1>
    </div>
  </div>
  <img class="site-hero__publisher publisher" src="assets/editora-404-logo.png" alt="Editora 4:04" width="85" height="81">
</section>

<!-- SEÇÃO 02: SUMÁRIO NAVEGÁVEL -->
<section id="sumario" class="site-summary page page-light page-summary" data-page="02" aria-labelledby="sumario-title">
  <div class="site-summary__container">
    <p class="site-summary__kicker summary-kicker">Código Vermelho</p>
    <h2 id="sumario-title" class="site-summary__title summary-title">Sumário</h2>
    <div class="site-summary__grid">
      <aside class="site-summary__card summary-card">
        <img class="site-summary__image" src="assets/sumario.png" alt="Robôs sentados enquanto um trabalhador sai carregando uma caixa com seus pertences" width="1500" height="1000" loading="lazy">
        <div class="site-summary__card-meta">
          <small>Nesta edição</small>
          <strong>Até quando vamos fingir que isso é progresso?</strong>
        </div>
      </aside>
      <nav class="site-summary__nav" aria-label="Índice de Seções da Revista" data-ui-chrome="true">
        <a class="summary-index-item" href="#editorial">
          <span class="summary-index-item__page">Capítulo 01 · pp. 03–04</span>
          <span class="summary-index-item__title">Editorial</span>
        </a>
        <a class="summary-index-item" href="#contexto">
          <span class="summary-index-item__page">Capítulo 02 · pp. 05–06</span>
          <span class="summary-index-item__title">Contextualização</span>
        </a>
        <a class="summary-index-item" href="#reportagem">
          <span class="summary-index-item__page">Capítulo 03 · pp. 07–08</span>
          <span class="summary-index-item__title">Reportagem Investigativa</span>
        </a>
        <a class="summary-index-item" href="#direito">
          <span class="summary-index-item__page">Capítulo 04 · pp. 09–10</span>
          <span class="summary-index-item__title">Direito em Xeque</span>
        </a>
        <a class="summary-index-item" href="#subemprego">
          <span class="summary-index-item__page">Capítulo 05 · pp. 11–12</span>
          <span class="summary-index-item__title">O Labirinto do Subemprego</span>
        </a>
        <a class="summary-index-item" href="#intervencao">
          <span class="summary-index-item__page">Capítulo 06 · p. 13</span>
          <span class="summary-index-item__title">Proposta de Intervenção</span>
        </a>
        <a class="summary-index-item" href="#expediente">
          <span class="summary-index-item__page">Capítulo 07 · p. 14</span>
          <span class="summary-index-item__title">Expediente e Integrantes</span>
        </a>
        <a class="summary-index-item" href="#referencias">
          <span class="summary-index-item__page">Capítulo 08 · p. 15</span>
          <span class="summary-index-item__title">Referências Bibliográficas</span>
        </a>
      </nav>
    </div>
  </div>
</section>
`;

fs.writeFileSync('site/_blocks/block-a.html', blockAHtml.trim(), 'utf8');

// 2. BLOCO B: Editorial (p.3 + p.4) + Contextualização (p.5 + p.6)
const blockBHtml = `
<!-- Bloco editorial e contextualização (páginas 03–06) -->
<article id="editorial" class="site-section site-editorial page-light">
  <div class="site-section__inner">

    <!-- Sub-seção: Editorial p. 03 -->
    <section id="editorial-1" class="page page-light" data-page="03" aria-label="Editorial, página 3">
      <div class="folio-tag folio"><b>01.</b><strong>Editorial</strong><span>p. 03</span></div>
      <h2 class="editorial-headline display-title title-orange title-editorial">Edito<br>rial</h2>
      
      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">Nenhuma linha de programação nasce sozinha: por trás de cada resposta automática da Inteligência Artificial, pulsa o trabalho humano invisível de milhões de profissionais que o mercado agora tenta descartar. A primeira edição da revista Código Vermelho nasce para desmontar a maior mentira empresarial do nosso tempo — a ideia de que os softwares atuais funcionam como cérebros eletrônicos independentes. Como explica o filósofo italiano <a href="#ref-pasquinelli-2023">Matteo Pasquinelli</a>, a Inteligência Artificial nada mais é do que trabalho cristalizado: programas que absorveram, sem pagar um centavo, décadas de textos, códigos e conhecimentos práticos criados por trabalhadores reais para, logo depois, serem usados pelas corporações para cortar vagas e reduzir salários dessas mesmas categorias. No Brasil e no mundo, esse uso predatório da tecnologia destrói a empregabilidade não por um avanço inevitável da ciência, mas pela soma de duas falhas estruturais graves: a incoerência das leis e dos tribunais brasileiros, que não cumprem a promessa constitucional de proteger o trabalhador contra a automação, e a lógica capitalista de redução de custos, que expulsa profissionais qualificados do emprego formal para empurrá-los ao subemprego precarizado. Desmascarar essa engrenagem e apontar a quais direitos a classe trabalhadora pode recorrer é o passo urgente para impedir que o progresso técnico se consolide como sentença de exclusão social.</p>
          <p>Em primeiro plano, é preciso compreender que as ondas de demissões justificadas pelo uso de IA ocorrem porque o sistema econômico prioriza o corte imediato da folha salarial diante de um Estado que se recusa a aplicar a própria lei. Os economistas <a href="#ref-acemoglu-2018">Daron Acemoglu e Pascual Restrepo</a> demonstram que o mercado atual investe em uma automação substitutiva: em vez de usar a máquina para apoiar o ser humano e criar novas funções, os executivos trocam equipes inteiras por softwares apenas para eliminar salários, férias e impostos trabalhistas. Foi sob essa lógica que Sebastian Siemiatkowski, presidente da financeira sueca Klarna, substituiu o trabalho de 700 profissionais de atendimento e marketing por um assistente virtual, e que Mark Zuckerberg iniciou, em 20 de maio de 2026, o corte de 10% da força de trabalho global da Meta — cerca de 8 mil funcionários — sob o argumento direto de automação. No Brasil, onde empresas financeiras e de tecnologia já utilizam agentes próprios de IA e painéis digitais para vigiar cliques, encolher equipes pela metade e demitir jovens programadores sob a desculpa falsa de "falta de adaptação", esse descarte é facilitado por uma dupla incoerência da Justiça e do Parlamento. Embora a Constituição Federal prometa literalmente, desde 1988, a "<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">proteção em face da automação</a>" (Artigo 7º, inciso XXVII) e a defesa contra a "despedida arbitrária" (inciso I), o Congresso Nacional nunca aprovou a lei que tira esse direito do papel. Pior ainda: ao julgar a <a href="#ref-oit-158">Convenção nº 158 da Organização Internacional do Trabalho (OIT)</a> — tratado que proíbe demissões sem motivo justo e exige a realocação de trabalhadores afetados pela tecnologia —, o Supremo Tribunal Federal (STF) admitiu que o governo agiu fora da regra ao cancelar esse pacto por decreto nos anos 1990, mas manteve o cancelamento válido para proteger o caixa das empresas. Mesmo diante dessa omissão do STF, que no <a href="https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=638" target="_blank" rel="noopener noreferrer">Tema 638</a> obrigou as empresas a conversarem com os sindicatos antes de demissões em massa sem exigir que cheguem a um acordo, o trabalhador brasileiro não está totalmente indefeso. Quando desligado por metas de robôs ou cortes tecnológicos, o profissional pode acionar a Justiça do Trabalho com base no <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer">Artigo 20 da Lei Geral de Proteção de Dados (LGPD)</a>, que obriga a empresa a abrir os critérios do algoritmo e revisar decisões automatizadas; no <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener noreferrer">Artigo 2º da CLT</a>, que proíbe o patrão de jogar o risco do negócio e a falta de treinamento nas costas do empregado; e na <a href="#ref-tst-443">Súmula 443 do TST</a>, que pune dispensas discriminatórias disfarçadas de modernização.</p>
        </div>
        <figure class="chart-card photo">
          <picture>
            <source srcset="assets/editorial.webp" type="image/webp">
            <img src="assets/editorial.png" alt="Perfil de uma mulher cuja metade do rosto se dissolve em circuitos eletrônicos" width="988" height="1286" loading="lazy">
          </picture>
          <figcaption>Apropriação do saber humano: a automação corporativa captura o conhecimento coletivo.</figcaption>
        </figure>
      </div>
    </section>

    <!-- Sub-seção: Editorial p. 04 -->
    <section id="editorial-2" class="page page-light" data-page="04" aria-label="Editorial, página 4" style="margin-top: 48px;">
      <div class="folio-tag folio"><b>01.</b><strong>Editorial</strong><span>p. 04</span></div>
      
      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">Como consequência direta dessa falta de freios legais sobre o apetite empresarial, a substituição desenfreada de trabalhadores por sistemas de IA destrói a escada de ascensão profissional e fabrica uma massa de subempregados no país. Dados do <a href="#ref-wef-2023">Fórum Econômico Mundial</a> apontam que quase metade (47%) de todas as tarefas humanas já passa pela automação, mas o impacto no Brasil desmonta o mito de que o estudo garante segurança: segundo registros oficiais do <a href="#ref-caged-2023">CAGED</a>, de mais de 227 mil profissionais de TI demitidos recentemente, 59,4% possuíam diploma superior completo. Ao eliminar cargos de entrada e de nível júnior para economizar com salários iniciais, as corporações rompem o ciclo de formação de novos talentos e empurram milhares de recém-formados para fora do mercado formal. Sem vagas na sua área de formação e sem amparo da seguridade social, essa juventude qualificada é forçada a migrar para o trabalho precarizado por aplicativos — onde 77% dos motoristas e entregadores não têm sequer cobertura do INSS — ou para funções invisíveis de "trabalho fantasma", classificando dados por centavos de dólar para treinar os mesmos algoritmos que fecharam seus postos de trabalho. A automação, portanto, não extingue o esforço humano: ela apenas rebaixa o valor do trabalho, destrói carreiras no nascimento e gera lucros recordes para uma minoria bilionária enquanto transfere o custo da miséria para os cofres públicos e para a sociedade.</p>
          <p>Mudar esse cenário exige enfrentar o debate de frente e impor limites urgentes à ganância algorítmica. O avanço tecnológico só terá legitimidade social se for acompanhado pela distribuição dos seus ganhos e pela garantia de dignidade a quem constrói a riqueza do país. Como propomos nas páginas finais desta edição, o Brasil precisa aprovar imediatamente um Marco Legal de Proteção contra a Automação Substitutiva, instituir uma Contribuição Social sobre sistemas de IA para financiar a requalificação e a seguridade dos trabalhadores demitidos, e criar uma força-tarefa de auditoria para abrir as caixas-pretas dos algoritmos que vigiam e demitem seres humanos. O futuro não pode ser um privilégio dos donos das plataformas enquanto o resto da população disputa sobras no subemprego. Convidamos você, leitor, a mergulhar nas reportagens, análises jurídicas e dados exclusivos deste dossiê — e a se juntar à construção de um horizonte em que a tecnologia sirva, finalmente, para libertar a vida humana, e não para descartá-la.</p>
        </div>
        <figure class="chart-card photo">
          <picture>
            <source srcset="assets/justica.webp" type="image/webp">
            <img src="assets/justica.png" alt="Estátua da Justiça vendada segurando a balança diante de telas digitais" width="976" height="1544" loading="lazy">
          </picture>
          <figcaption>A balança da Justiça e as telas digitais: a omissão legislativa diante do algoritmo.</figcaption>
        </figure>
      </div>
    </section>
  </div>
</article>

<!-- SEÇÃO CONTEXTUALIZAÇÃO INTEGRADA (pp. 05 e 06) -->
<article id="contexto" class="site-section site-contexto page-light">
  <div class="site-section__inner">
    
    <!-- Sub-seção: Contextualização p. 05 -->
    <section id="contexto-1" class="page page-light" data-page="05" aria-label="Contextualização, página 5">
      <div class="folio-tag folio"><b>02.</b><strong>Contextualização</strong><span>p. 05</span></div>
      <h2 class="editorial-headline display-title title-red">A ilusão da<br>mente eletrônica</h2>
      <p class="editorial-deck deck deck-justify">Da máquina a vapor ao algoritmo: como a Quarta Revolução Industrial capturou o trabalho intelectual e transformou saberes coletivos em mercadoria privada.</p>
      
      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">Nas primeiras revoluções industriais, a máquina a vapor e as esteiras de montagem substituíram a força muscular dos animais e o esforço braçal dos operários da fábrica. Na virada do século XXI, o discurso corporativo sustentava uma promessa reconfortante: "estude, busque uma profissão intelectual e o avanço técnico jamais alcançará o seu sustento". Hoje, no entanto, como apontam as pesquisas acadêmicas sobre as transformações do trabalho na Revolução 4.0 (<a href="#ref-estrada-2022">Estrada, 2022</a>; <a href="#ref-oliveira-2025">Oliveira, 2025</a>), a fronteira da automação rompeu essa barreira histórica. A Inteligência Artificial generativa não veio para carregar caixas ou apertar parafusos; ela invadiu os escritórios para capturar o raciocínio analítico, a redação técnica, a criação visual e a escrita de códigos de software.</p>
          <p>Essa transição, contudo, oculta uma engrenagem perversa que o filósofo <a href="#ref-pasquinelli-2023">Matteo Pasquinelli</a> define como a apropriação do trabalho cristalizado. Ao contrário do que a propaganda do Vale do Silício tenta vender, nenhum algoritmo cria conhecimento do zero. Os grandes modelos computacionais funcionam porque foram alimentados e treinados sobre oceanos de dados extraídos da internet sem consentimento ou remuneração: décadas de discussões em fóruns técnicos, artigos científicos, bibliotecas inteiras de jurisprudência e bilhões de linhas de código hospedadas em repositórios abertos (como o GitHub). As corporações mercantilizaram a inteligência coletiva acumulada por gerações de trabalhadores especializados para, logo em seguida, empacotá-la sob a forma de licenças corporativas vendidas para demitir essas mesmas categorias.</p>
          <p>Nos bastidores dessa aparente "mágica tecnológica", opera o que a pesquisadora <a href="#ref-gray-2019">Mary Gray</a> denomina de trabalho fantasma (ghost work). Para que os agentes virtuais não cometam erros grotescos e entreguem respostas limpas nas interfaces corporativas, multinacionais empregam um contingente invisível de trabalhadores precarizados em países periféricos. São anotadores de dados e moderadores de conteúdo cadastrados em plataformas digitais (como Clickworker e Remotasks), submetidos a jornadas exaustivas e remunerados por centavos de dólar por clique, sem contrato formal, previdência social ou qualquer garantia trabalhista. A automação das tarefas cognitivas não extingue o esforço humano: ela o divide em microtarefas invisíveis na base para maximizar as margens de lucro no topo.</p>
        </div>
        <div class="editorial-aside">
          <aside class="box-dossie box-blue box-center">
            <h3>O que é Trabalho Cristalizado?</h3>
            <p>Formulado pelo teórico Matteo Pasquinelli, o conceito demonstra que a IA não é uma inteligência artificial autônoma, mas a cristalização matemática do saber e da experiência acumulada por milhões de trabalhadores reais ao longo de décadas. O software apenas reorganiza estatisticamente aquilo que seres humanos já produziram e ensinaram à máquina sem receber nada por isso.</p>
          </aside>
          <aside class="box-dossie box-red box-center">
            <h3>O que é Trabalho Fantasma?</h3>
            <p>Termo cunhado pela pesquisadora Mary Gray para designar o exército oculto de pessoas que trabalham de casa classificando imagens, corrigindo textos e eliminando conteúdos tóxicos para que os algoritmos pareçam infalíveis. Trata-se de um trabalho humano intensivo, mal pago e desprovido de qualquer proteção trabalhista ou previdenciária.</p>
          </aside>
        </div>
      </div>
    </section>

    <!-- Sub-seção: Contextualização p. 06 -->
    <section id="contexto-2" class="page page-light" data-page="06" aria-label="Contextualização, página 6" style="margin-top: 48px;">
      <div class="folio-tag folio"><b>02.</b><strong>Contextualização</strong><span>p. 06</span></div>
      
      <div class="headline-float">
        <h2 class="editorial-headline display-title title-red">O fim do escudo do diploma</h2>
        <p class="editorial-deck deck">A radiografia empírica dos layoffs no Brasil: como o People Analytics e o descarte sistemático transformaram profissionais de alta qualificação em alvos prioritários.</p>
      </div>

      <div class="editorial-prose copy">
        <p class="dropcap">Quando esse modelo desembarca no Brasil, o choque com a realidade desmonta em definitivo o mito da "imunidade da escolaridade". O setor de tecnologia, antes visto como sinônimo de estabilidade financeira e ascensão rápida de carreira, tornou-se o epicentro de uma das maiores ondas de cortes corporativos da história recente do país. Em uma janela de apenas 18 meses, 227.386 profissionais de tecnologia foram desligados sem justa causa, segundo registros oficiais do Cadastro Geral de Empregados e Desempregados (<a href="#ref-caged-2023">CAGED</a>) compilados pela Universidade Federal de Uberlândia (<a href="#ref-barbosa-2023">Barbosa, 2023</a>).</p>
        <p>Mais alarmante ainda é a constatação de que essas demissões em massa não foram motivadas por falência ou crise econômica conjuntural, mas sim por uma reestruturação predatória viabilizada por softwares de vigilância corporativa (People Analytics). Painéis digitais passaram a monitorar em tempo real a velocidade de digitação, a resolução de chamados e a frequência de uso de ferramentas internas de IA. O profissional que não atinge índices de produtividade sobre-humanos passa a ser descartado sob a justificativa cínica de "incompatibilidade cultural" ou "falta de adaptação".</p>
        <p>Assim, cai por terra a tese da "destruição criativa" formulada pela economia liberal clássica, que prometia a recolocação automática dos dispensados em funções mais nobres. Na estrutura dependente brasileira, o profissional descartado pelo algoritmo do escritório não encontra novas vagas abertas; ele é empurrado diretamente para o subemprego, para a informalidade ou para a dependência de plataformas de entrega e transporte sob a gestão de outro algoritmo. O que as empresas chamam de modernização é, na verdade, a substituição deliberada do trabalho digno pela servidão digital.</p>
      </div>

      <!-- Grid dos Gráficos de Renda e Escolaridade -->
      <div class="editorial-flow" style="margin-top: 32px;">
        <div class="chart-card chart">
          <button class="chart-zoom-btn" type="button" data-zoom="grafico-renda" aria-label="Ampliar Gráfico: Variação real da renda por nível de instrução">Ampliar ⤢</button>
          <figure>
            <picture>
              <source srcset="assets/grafico-renda.webp" type="image/webp">
              <img src="assets/grafico-renda.png" alt="Gráfico: Variação real da renda por nível de instrução — Ensino Superior −16,7%, Ensino Médio −5,2%, Ensino Fundamental −1,8%. Fonte: FGV IBRE" width="2070" height="1208" loading="lazy">
            </picture>
            <figcaption>Variação real da renda por nível de instrução: a queda acumulada corrói os salários do ensino superior (−16,7%). Fonte: FGV IBRE.</figcaption>
          </figure>
        </div>
        <div class="chart-card chart">
          <button class="chart-zoom-btn" type="button" data-zoom="grafico-escolaridade" aria-label="Ampliar Gráfico: Demitidos em tecnologia por escolaridade">Ampliar ⤢</button>
          <figure>
            <picture>
              <source srcset="assets/grafico-escolaridade.webp" type="image/webp">
              <img src="assets/grafico-escolaridade.png" alt="Gráfico: Demitidos em tecnologia por escolaridade — Superior completo 59,4%, Superior incompleto 27,5%, Ensino Médio 11,8%, Fundamental/Outros 1,3%. Fonte: CAGED / UFU" width="2070" height="1308" loading="lazy">
            </picture>
            <figcaption>Demitidos em tecnologia por escolaridade: superior completo e incompleto somam 86,9% dos cortes no país. Fonte: CAGED / UFU.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  </div>
</article>
`;

fs.writeFileSync('site/_blocks/block-b.html', blockBHtml.trim(), 'utf8');

// 3. BLOCO C: Reportagem Escura (p.7 + p.8) + Direito em Xeque (p.9 + p.10)
const blockCHtml = `
<!-- SEÇÃO REPORTAGEM INVESTIGATIVA (pp. 07 e 08 · AMBIENTE NOTURNO) -->
<article id="reportagem" class="site-section site-reportagem site-dark page-dark">
  <div class="site-section__inner">
    
    <!-- Sub-seção: Reportagem p. 07 -->
    <section id="reportagem-1" class="page page-dark" data-page="07" aria-label="Reportagem, página 7">
      <div class="folio-tag folio"><b>03.</b><strong>Reportagem</strong><span>p. 07</span></div>
      <h2 class="editorial-headline display-title title-red text-center">Vigiados e descartados</h2>
      <p class="editorial-deck standfirst" style="margin: 0 auto 36px; text-align: center;">Como a implantação de um agente interno de Inteligência Artificial fragmentou equipes de tecnologia, transformou programadores qualificados em alvos de monitoramento e fabricou demissões sob a desculpa de "falta de adaptação".</p>
      
      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">São 21 horas de uma terça-feira chuvosa quando a notificação surge na tela do notebook corporativo de Marcos (nome fictício), 34 anos, desenvolvedor sênior em uma das maiores consultorias de software de São Paulo. A mensagem não vinha de seu coordenador direto, nem de um colega de equipe: era um alerta automático emitido por um plugin recém-integrado à sua interface de desenvolvimento (IDE). O sistema informava que o tempo médio gasto por ele para revisar e commitar três módulos de código havia ficado "14% abaixo da curva de eficiência projetada pela ferramenta corporativa de IA". Sem qualquer diálogo humano, a métrica gerada pelo robô alimentou diretamente o painel de People Analytics do departamento de Recursos Humanos.</p>
          <p>"A gente passou quase dois anos alimentando a base interna de conhecimento da empresa, documentando regras de negócio complexas, refatorando sistemas legados e treinando os modelos proprietários de LLM", relata Marcos, com a voz embargada pela exaustão. "Diziam que a IA viria apenas como um 'copiloto' para tirar a carga de trabalho repetitivo e nos dar mais tempo criativo. Mas no momento em que a ferramenta começou a gerar códigos funcionais, a cobrança disparou de forma desumana. Passamos a competir contra a velocidade de geração da própria máquina, sem que ninguém levasse em consideração a qualidade técnica da arquitetura, a segurança dos dados ou a complexidade das regras de negócio brasileiras."</p>
          <p>O caso de Marcos não é uma anomalia estatística; reflete a rotina opressiva que se alastrou pelos centros de desenvolvimento de tecnologia no país após a febre da inteligência artificial generativa. Sob o pretexto de acelerar a entrega de projetos e reduzir o custo operacional por linha de código, multinacionais e grandes empresas locais passaram a adotar ferramentas invasivas de telemetria algorítmica. Softwares de vigilância corporativa rastreiam atalhos de teclado, analisam o tempo de permanência em janelas ativas, contabilizam a quantidade de sugestões aceitas pelo assistente virtual e estabelecem metas de produtividade inalcançáveis para o corpo biológico.</p>
        </div>
        <figure class="chart-card photo">
          <picture>
            <source srcset="assets/reportagem.webp" type="image/webp">
            <img src="assets/reportagem.png" alt="Programador trabalhando sozinho no notebook à noite, iluminado por uma luminária" width="814" height="1120" loading="lazy">
          </picture>
          <figcaption>A vigília noturna: a métrica algorítmica vigia cada linha de código digitada sob a chuva das 21 horas.</figcaption>
        </figure>
      </div>
    </section>

    <!-- Sub-seção: Reportagem p. 08 -->
    <section id="reportagem-2" class="page page-dark" data-page="08" aria-label="Reportagem, página 8" style="margin-top: 48px;">
      <div class="folio-tag folio"><b>03.</b><strong>Reportagem</strong><span>p. 08</span></div>
      <h2 class="editorial-headline display-title title-red text-center">A sentença invisível do algoritmo</h2>
      <p class="editorial-deck standfirst" style="margin: 0 auto 36px; text-align: center;">O painel de People Analytics, o desligamento em dez minutos de chamada e a cartilha internacional do corte de custos.</p>
      
      <div class="editorial-prose copy" style="max-width: var(--reading-width); margin: 0 auto;">
        <p class="dropcap">O método de corte aplicado na empresa de Marcos e Luis não é um desvio ético isolado; trata-se da cartilha operacional do Vale do Silício aplicada ao Sul Global. As corporações usam os painéis de People Analytics para mascarar demissões em massa sob o rótulo conveniente de desligamentos pontuais por "baixa performance". O algoritmo cruza dados de cliques, linhas commitadas, horas logadas e taxa de adoção de IA para atribuir uma pontuação diária a cada funcionário. Quem recusa o código alucinado da máquina ou perde tempo corrigindo falhas de arquitetura que o robô introduziu vê sua nota despencar no painel.</p>
        <p>"Eles criaram uma armadilha perfeita", explica Luis (nome fictício), 41 anos, ex-tech lead na mesma consultoria, demitido três semanas antes de Marcos. "Se você aceita o código da IA sem revisar para bater a meta de velocidade, o sistema quebra em produção semanas depois e a culpa cai sobre o desenvolvedor humano. Se você gasta o tempo necessário para refatorar e garantir a segurança, o painel do RH aponta que sua produtividade está abaixo da média dos colegas que estão apenas colando respostas do robô. Em qualquer cenário, a máquina vence e o profissional perde."</p>
        <p>A fase final dessa engrenagem ocorre em chamadas de vídeo assépticas de menos de dez minutos. Com a decisão de demissão já selada pelos gráficos de eficiência algorítmica, o RH limita-se a comunicar o encerramento do contrato, sem fornecer qualquer relatório técnico que fundamente o corte ou permita o contraditório. O acesso aos sistemas, repositórios de código e canais de comunicação com os colegas é revogado no mesmo minuto em que a chamada é finalizada, impedindo qualquer contestação ou coleta de evidências pelo trabalhador descartado.</p>
        <p>Ao transformar programadores experientes em alvos descartáveis, o mercado de tecnologia não está vivendo uma evolução natural orientada pelo mérito técnico, mas sim uma política deliberada de substituição predatória. Sob o manto da inovação, desmontam-se direitos trabalhistas consolidados, transfere-se o risco da falha algorítmica para os ombros de quem produz e empurram-se profissionais de alta capacitação para fora das garantias fundamentais da dignidade humana.</p>
      </div>
    </section>
  </div>
</article>

<!-- SEÇÃO DIREITO EM XEQUE (pp. 09 e 10) -->
<article id="direito" class="site-section site-direito page-light">
  <div class="site-section__inner">
    
    <!-- Sub-seção: Direito em Xeque p. 09 -->
    <section id="direito-1" class="page page-light" data-page="09" aria-label="Direito em Xeque, página 9">
      <div class="folio-tag folio"><b>04.</b><strong>Direito em Xeque</strong><span>p. 09</span></div>
      <h2 class="editorial-headline display-title title-orange title-vazio">O vazio<br>constitucional</h2>
      
      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">Quando a Constituição Cidadã foi promulgada, em 1988, o constituinte incluiu no rol de direitos fundamentais sociais uma garantia pioneira no mundo: a "<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">proteção em face da automação, na forma da lei</a>" (<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">Artigo 7º, inciso XXVII</a>), ao lado da defesa contra a "despedida arbitrária ou sem justa causa" (inciso I). Havia ali a promessa explícita de que o avanço técnico jamais se converteria em uma ferramenta desumana de aniquilação de postos de trabalho. Quase quatro décadas depois, no entanto, essa cláusula protetiva permanece como letra morta: o Congresso Nacional jamais aprovou a lei regulamentadora, abrindo caminho para que corporações substituam trabalhadores por algoritmos de inteligência artificial sem qualquer contrapartida ou obrigação de realocação.</p>
          <p>Essa paralisia legislativa de 38 anos é agravada por uma hesitação crônica do Poder Judiciário. O principal escudo internacional contra o descarte arbitrário de mão de obra — a <a href="#ref-oit-158">Convenção nº 158 da Organização Internacional do Trabalho (OIT)</a>, que proíbe a demissão imotivada e exige justificativa econômica real com dever de requalificação — permaneceu sob julgamento no Supremo Tribunal Federal por 26 anos na <a href="https://portal.stf.jus.br/processos/detalhe.asp?incidente=1693351" target="_blank" rel="noopener noreferrer">Ação Direta de Inconstitucionalidade (ADI) nº 1.625</a>. Embora a maioria da Corte tenha reconhecido a ilegalidade do decreto presidencial de 1996 que rompeu o tratado sem o aval do Congresso, o tribunal fixou que a nulidade só valerá para decisões futuras, blindando o caixa das empresas e deixando desprotegidas gerações de trabalhadores demitidos em massa pela reestruturação produtiva.</p>
        </div>
        <div class="editorial-aside">
          <figure class="chart-card photo" style="margin-bottom: 24px;">
            <picture>
              <source srcset="assets/martelo.webp" type="image/webp">
              <img src="assets/martelo.png" alt="Martelo de juiz diante da bandeira do Brasil" width="984" height="1286" loading="lazy">
            </picture>
            <figcaption>O martelo da Justiça e a inércia: 38 anos de omissão legislativa sobre o Artigo 7º.</figcaption>
          </figure>
          <aside class="box-dossie box-red box-small">
            <h3>O que diz a Constituição?</h3>
            <p>Constituição Federal de 1988 — Artigo 7º:<br>"São direitos dos trabalhadores urbanos e rurais, além de outros que visem à melhoria de sua condição social:</p>
            <ul>
              <li>I - Relação de emprego protegida contra despedida arbitrária ou sem justa causa [...];*</li>
              <li>XXVII - Proteção em face da automação, na forma da lei."*</li>
            </ul>
          </aside>
        </div>
      </div>

      <div class="chart-card chart" style="margin-top: 36px;">
        <button class="chart-zoom-btn" type="button" data-zoom="grafico-inercia" aria-label="Ampliar Gráfico: A inércia institucional frente à automação no Brasil">Ampliar ⤢</button>
        <figure>
          <picture>
            <source srcset="assets/grafico-inercia.webp" type="image/webp">
            <img src="assets/grafico-inercia.png" alt="Gráfico: A inércia institucional frente à automação no Brasil — 0 leis aprovadas sobre automação de IA; Art. 7º, XXVII sem regulamentação há 38 anos; Convenção 158 da OIT parada no STF por 26 anos" width="2423" height="1247" loading="lazy">
          </picture>
          <figcaption>A inércia institucional frente à automação no Brasil: zero leis aprovadas para regulamentar a IA e frear o descarte.</figcaption>
        </figure>
      </div>
    </section>

    <!-- Sub-seção: Direito em Xeque p. 10 -->
    <section id="direito-2" class="page page-light" data-page="10" aria-label="Direito em Xeque, página 10" style="margin-top: 48px;">
      <div class="folio-tag folio"><b>04.</b><strong>Direito em Xeque</strong><span>p. 10</span></div>
      <h2 class="editorial-headline display-title title-red">Armas legais contra<br>o algoritmo</h2>
      <p class="editorial-deck deck deck-justify">Como a LGPD, a CLT e o Tribunal Superior do Trabalho oferecem escudos práticos e reais para contestar demissões automatizadas e abusos de vigilância digital.</p>
      
      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">Diante da inércia legislativa que paralisa o Congresso, o trabalhador brasileiro não está totalmente desamparado: o ordenamento jurídico já oferece instrumentos sólidos para combater a tirania dos algoritmos corporativos. O primeiro e mais contundente deles é o <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer">Artigo 20 da Lei Geral de Proteção de Dados (LGPD)</a>, que assegura a qualquer titular o direito de solicitar a revisão humana de decisões tomadas unicamente com base em tratamento automatizado de dados que afetem seus interesses — incluindo avaliações de People Analytics que culminem em demissão. A lei obriga o empregador a fornecer informações claras e adequadas sobre os critérios e procedimentos utilizados pelo software, quebrando a clássica desculpa corporativa de "segredo industrial".</p>
          <p>No âmbito da Consolidação das Leis do Trabalho, o escudo mestre é o <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="noopener noreferrer">Artigo 2º da CLT</a>, que consagra o Princípio da Alteridade: os riscos da atividade econômica pertencem com exclusividade ao empregador. Isso significa que a empresa não pode transferir para o empregado o custo da transição tecnológica, demitindo profissionais qualificados sob o pretexto de "incompatibilidade com as novas ferramentas de IA" sem antes oferecer treinamento e tempo hábil de capacitação. A jurisprudência trabalhista vem consolidando o entendimento de que a dispensa motivada por falhas de integração com sistemas experimentais de automação configura abuso do poder diretivo patronal.</p>
          <p>Nos tribunais, o avanço da resistência operária ganha força na <a href="#ref-tst-443">Súmula 443 do Tribunal Superior do Trabalho</a>, que presume discriminatória a despedida de empregados em situação de vulnerabilidade, impondo a reintegração ou indenização dobrada. Juízes do trabalho vêm aplicando essa diretriz por analogia aos casos em que cortes por IA atingem de forma desproporcional profissionais mais velhos ou trabalhadores com históricos sindicais. Além disso, no julgamento do <a href="https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=638" target="_blank" rel="noopener noreferrer">Tema 638 da Repercussão Geral</a>, o STF pacificou a tese de que a intervenção sindical prévia é requisito indispensável para a realização de dispensas coletivas, garantindo aos sindicatos o direito de exigir estudos de impacto, planos de recolocação e pacotes indenizatórios que freiem o apetite predatório dos acionistas.</p>
        </div>
        <div class="editorial-aside">
          <div class="chart-card chart">
            <button class="chart-zoom-btn" type="button" data-zoom="grafico-acoes" aria-label="Ampliar Gráfico: Ações na Justiça do Trabalho citando algoritmos, IA e LGPD">Ampliar ⤢</button>
            <figure>
              <picture>
                <source srcset="assets/grafico-acoes.webp" type="image/webp">
                <img src="assets/grafico-acoes.png" alt="Gráfico: Ações na Justiça do Trabalho citando algoritmos, IA e LGPD — de 310 em 2020 para 14.200 estimadas em 2026" width="2220" height="1270" loading="lazy">
              </picture>
              <figcaption>Ações na Justiça do Trabalho citando algoritmos, IA e LGPD: salto exponencial de 310 para 14.200 processos.</figcaption>
            </figure>
          </div>
          <aside class="box-dossie box-blue box-list" style="margin-top: 24px;">
            <h3>Fui demitido por IA: como me defender?</h3>
            <ol>
              <li><strong>Exija as métricas algorítmicas:</strong> Solicite formalmente ao RH cópia integral dos logs e parâmetros de People Analytics usados para fundamentar sua dispensa.</li>
              <li><strong>Acione o Artigo 20 da LGPD:</strong> Notifique a empresa exigindo a revisão humana da decisão automatizada e a explicação dos critérios do modelo.</li>
              <li><strong>Invoque o Artigo 2º da CLT:</strong> Demonstre que a empresa não forneceu treinamento remunerado prévio para a transição para as ferramentas de IA.</li>
              <li><strong>Denuncie ao MPT:</strong> Caso o corte atinja vários colegas sob metas de robôs, formalize denúncia de demissão coletiva sem negociação sindical (Tema 638 STF).</li>
              <li><strong>Busque indenização no TST:</strong> Acione a Justiça do Trabalho requerendo reintegração ou reparação por danos morais diante de vigilância invasiva ou dispensa discriminatória.</li>
            </ol>
          </aside>
        </div>
      </div>
    </section>
  </div>
</article>
`;

fs.writeFileSync('site/_blocks/block-c.html', blockCHtml.trim(), 'utf8');

// 4. BLOCO D: Subemprego (p.11 + p.12) + Proposta de Intervenção (p.13)
const blockDHtml = `
<!-- SEÇÃO O LABIRINTO DO SUBEMPREGO (pp. 11 e 12) -->
<article id="subemprego" class="site-section site-subemprego page-light">
  <div class="site-section__inner">
    
    <!-- Sub-seção: Subemprego p. 11 -->
    <section id="subemprego-1" class="page page-light" data-page="11" aria-label="O Labirinto do Subemprego, página 11">
      <div class="folio-tag folio"><b>05.</b><strong>O Labirinto do Subemprego</strong><span>p. 11</span></div>
      
      <div class="headline-float">
        <h2 class="editorial-headline display-title title-red">A escada quebrada</h2>
        <p class="editorial-deck deck">Como o enxugamento das vagas de nível júnior destrói a formação de novas gerações e empurra uma massa de diplomados para a subutilização crônica no Brasil.</p>
      </div>

      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">Nas engrenagens do mercado de trabalho contemporâneo, a ascensão profissional sempre funcionou como uma escada: o jovem ingressava em funções de entrada como assistente, estagiário ou programador júnior, realizava tarefas burocráticas básicas e, através da convivência diária com profissionais veteranos, acumulava a maturidade prática necessária para alcançar cargos de média e alta complexidade. A adoção corporativa desenfreada da Inteligência Artificial, no entanto, serrou os primeiros degraus dessa estrutura. Ao delegar relatórios simples, análises iniciais de dados e trechos rotineiros de código a assistentes virtuais, as empresas simplesmente fecharam as portas para quem está no começo da carreira.</p>
          <p>Relatórios da <a href="#ref-oit-158">Organização Internacional do Trabalho (OIT)</a> e pesquisas do Centro de Estudos Sindicais e de Economia do Trabalho da Unicamp (<a href="#ref-cesit-2016">CESIT</a>) apontam para a gravidade dessa ruptura: o desaparecimento das vagas juniores cria um apagão geracional. Sem funções de entrada disponíveis, os jovens recém-saídos das universidades não conseguem a primeira oportunidade formal; sem prática inicial, jamais atingirão os requisitos exigidos para vagas seniores. O resultado é uma juventude superescolarizada que investiu anos e poupanças familiares em cursos superiores para descobrir que seu diploma concorre diretamente com um modelo de linguagem comercializado por 20 dólares ao mês.</p>
          <p>Essa dinâmica desmente a tese de que o mercado absorverá o desemprego tecnológico com facilidade. Longe dos discursos motivacionais corporativos, a realidade capturada pela <a href="#ref-ibge-pnad">Pesquisa Nacional por Amostra de Domicílios Contínua (PNAD Contínua) do IBGE</a> expõe a verdadeira dimensão da exclusão: o Brasil convive hoje com uma massa de 33,9 milhões de pessoas em vulnerabilidade laboral, incluindo 20,9 milhões de trabalhadores subutilizados — cidadãos qualificados que gostariam de trabalhar em tempo integral, mas são forçados a aceitar bicos esporádicos ou que desistiram de procurar emprego após meses de silêncio e rejeição algorítmica.</p>
        </div>
        <div class="editorial-aside">
          <div class="chart-card chart">
            <button class="chart-zoom-btn" type="button" data-zoom="grafico-desprotecao-social" aria-label="Ampliar Gráfico: O Retrato da Desproteção Social no Brasil">Ampliar ⤢</button>
            <figure>
              <picture>
                <source srcset="assets/grafico-desprotecao-social.webp" type="image/webp">
                <img src="assets/grafico-desprotecao-social.png" alt="Gráfico: O Retrato da Desproteção Social no Brasil — Milhões de trabalhadores expulsos da seguridade formal" width="1300" height="770" loading="lazy">
              </picture>
              <figcaption>O Retrato da Desproteção Social: 38 milhões na informalidade e 33,9 milhões em vulnerabilidade ampla.</figcaption>
            </figure>
          </div>
          <aside class="box-dossie box-red box-center">
            <h3>O que é “Subutilização da Força de Trabalho”?</h3>
            <p>Métrica oficial do IBGE que vai muito além da taxa clássica de desemprego. Ela abrange trabalhadores que estão subocupados (fazem bicos com menos horas do que gostariam e precisam), pessoas disponíveis que não encontram vagas compatíveis com sua formação e a população "desalentada" — profissionais qualificados que, após meses de silêncio e rejeição algorítmica, simplesmente desistiram de enviar currículos para vagas corporativas.</p>
          </aside>
        </div>
      </div>
    </section>

    <!-- Sub-seção: Subemprego p. 12 -->
    <section id="subemprego-2" class="page page-light" data-page="12" aria-label="O Labirinto do Subemprego, página 12" style="margin-top: 48px;">
      <div class="folio-tag folio"><b>05.</b><strong>O Labirinto do Subemprego</strong><span>p. 12</span></div>
      <h2 class="editorial-headline display-title title-orange title-servidao">A nova<br>servidão<br>digital</h2>
      
      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">A expulsão do mercado formal não empurra o trabalhador para o vazio; empurra-o diretamente para as esteiras invisíveis da uberização. Bacharéis em Direito, engenheiros civis, designers gráficos e analistas de sistemas formam hoje o exército de mão de obra que pilota motocicletas de entrega ou passa 14 horas ao volante de carros alugados para prestar serviços a aplicativos estrangeiros. Sob o eufemismo do "empreendedorismo de si mesmo", essas plataformas operam como verdadeiras senzalas digitais: estabelecem metas opacas, reduzem arbitrariamente o valor das corridas e punem com bloqueios sumários quem ousa recusar viagens deficitárias.</p>
          <p>O que a sociologia do trabalho define como proletariado digital (<a href="#ref-antunes-2018">Antunes, 2018</a>) é a combinação perfeita entre a alta tecnologia dos centros de dados e a exploração arcaica do trabalho desregulado. Desprovido de qualquer proteção previdenciária — como atestam os dados da OIT, que revelam que 77% dos motoristas e entregadores por aplicativo no país não possuem cobertura do INSS —, o trabalhador uberizado assume todos os custos operacionais (gasolina, veículo, celular, acidentes) para que os conglomerados digitais transfiram bilhões para suas sedes fiscais. Quando a máquina substitui o trabalhador no escritório, ela não o liberta do cansaço; ela o condena à asfixia diária da precarização absoluta.</p>
        </div>
        <div class="editorial-aside">
          <figure class="chart-card photo" style="margin-bottom: 24px;">
            <picture>
              <source srcset="assets/uber.webp" type="image/webp">
              <img src="assets/uber.png" alt="Mão segurando smartphone com o aplicativo do Uber aberto em meio ao trânsito" width="988" height="1286" loading="lazy">
            </picture>
            <figcaption>Servidão nas ruas: o smartphone se transforma no supervisor eletrônico de 14 horas diárias.</figcaption>
          </figure>
          <div class="chart-card chart">
            <button class="chart-zoom-btn" type="button" data-zoom="grafico-previdencia-app" aria-label="Ampliar Gráfico: Desproteção Previdenciária no Trabalho por Plataforma">Ampliar ⤢</button>
            <figure>
              <picture>
                <source srcset="assets/grafico-previdencia-app.webp" type="image/webp">
                <img src="assets/grafico-previdencia-app.png" alt="Gráfico: Desproteção Previdenciária no Trabalho por Plataforma — 77% dos trabalhadores de aplicativo sem cobertura do INSS" width="1290" height="670" loading="lazy">
              </picture>
              <figcaption>Desproteção Previdenciária: 77% dos trabalhadores de aplicativo sem cobertura do INSS.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  </div>
</article>

<!-- SEÇÃO PROPOSTA DE INTERVENÇÃO (p. 13) -->
<article id="intervencao" class="site-section site-intervencao page-light">
  <div class="site-section__inner">
    <section id="intervencao-body" class="page page-light" data-page="13" aria-label="Proposta de Intervenção, página 13">
      <div class="folio-tag folio"><b>06.</b><strong>Proposta de Intervenção</strong><span>p. 13</span></div>
      
      <div class="text-right">
        <h2 class="editorial-headline display-title title-red title-intervencao">Além do lucro dos<br>algoritmos</h2>
        <p class="editorial-deck deck" style="margin-left: auto;">Como o Estado brasileiro pode conter a destruição predatória de empregos, tributar a tecnologia substitutiva e garantir dignidade e direitos na era digital.</p>
      </div>

      <div class="editorial-flow">
        <div class="editorial-prose copy">
          <p class="dropcap">Conter o descarte em massa de trabalhadores e frear o avanço da servidão digital exige romper com a passividade estatal. O progresso científico não pode continuar servindo de pretexto para que corporações privatizem ganhos bilionários enquanto transferem para o SUS e para a seguridade pública o custo de milhões de cidadãos empurrados ao subemprego. A solução para esse dilema requer uma intervenção pública articulada em duas frentes complementares: uma de caráter legislativo-econômico, para neutralizar a causa das demissões arbitrárias, e outra de fiscalização regulatória, para estancar a precarização algorítmica e a vigilância abusiva.</p>
          <p>Em primeiro plano, cabe ao Congresso Nacional, em regime de urgência e em estreita colaboração com o Ministério do Trabalho e Emprego (MTE) e as centrais sindicais, aprovar o Marco Legal de Proteção contra a Automação Substitutiva (unificando e atualizando os <a href="https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2192770" target="_blank" rel="noopener noreferrer">Projetos de Lei nº 1.091/2019</a> e <a href="https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2362483" target="_blank" rel="noopener noreferrer">nº 2.421/2023</a>). Essa legislação deve finalmente regulamentar o <a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">Artigo 7º, incisos I e XXVII da Constituição Federal</a> e restabelecer formalmente no ordenamento jurídico as diretrizes da <a href="#ref-oit-158">Convenção nº 158 da OIT</a>.</p>
          <p>No detalhamento prático dessa lei, nenhuma média ou grande empresa poderá implementar ferramentas de Inteligência Artificial sem apresentar um Estudo Prévio de Impacto sobre o Emprego (EPIE), com plano obrigatório de capacitação técnica remunerada durante a jornada normal de trabalho. Além disso, institui-se a Contribuição Social sobre Automação Substitutiva (CSAS) — um tributo progressivo cobrado sobre licenças de softwares e sistemas automatizados que eliminem postos de trabalho humanos. Os recursos arrecadados não irão para o caixa geral do governo, mas alimentarão um Fundo Público de Transição Justa, voltado a bancar programas contínuos de requalificação profissional e a garantir a manutenção da renda de trabalhadores em fase de recolocação (<a href="#ref-cunha-2024">Cunha, 2024</a>).</p>
          <p>Paralelamente, para combater a opacidade dos painéis corporativos e a uberização nas ruas, o Ministério Público do Trabalho (MPT), em parceria técnica com a Autoridade Nacional de Proteção de Dados (ANPD), deve deflagrar uma força-tarefa permanente de Auditoria Algorítmica Obrigatória. Com base no <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer">Artigo 20 da LGPD</a>, os órgãos de fiscalização devem obrigar as empresas a abrir o código-fonte de sistemas de People Analytics, aplicando multas pesadas e determinando a imediata reintegração de empregados dispensados sob justificativas genéricas de "inadaptação". Na ponta dos aplicativos de entrega e transporte, a regulação deve exigir o recolhimento compulsório patronal de contribuições ao INSS e seguro integral contra acidentes proporcional às horas conectadas. Somente quando o custo social do descarte for cobrado de quem lucra com a máquina, o desenvolvimento tecnológico deixará de ser uma ameaça e passará a cumprir a sua função social de emancipar a humanidade.</p>
        </div>
        <div class="editorial-aside">
          <div class="chart-card chart">
            <button class="chart-zoom-btn" type="button" data-zoom="grafico-fundo-social" aria-label="Ampliar Gráfico: Destinação do Fundo Social sobre Automação Substitutiva">Ampliar ⤢</button>
            <figure>
              <picture>
                <source srcset="assets/grafico-fundo-social.webp" type="image/webp">
                <img src="assets/grafico-fundo-social.png" alt="Gráfico: Destinação do Fundo Social sobre Automação Substitutiva — Requalificação Remunerada 40%, Manutenção de Renda Básica 30%, Inclusão Previdenciária 20%, Fiscalização Algorítmica 10%" width="1092" height="600" loading="lazy">
              </picture>
              <figcaption>Destinação do Fundo Social: rateio progressivo voltado à proteção ativa dos trabalhadores.</figcaption>
            </figure>
          </div>
          <div class="chart-card chart">
            <button class="chart-zoom-btn" type="button" data-zoom="grafico-marco-legal" aria-label="Ampliar Gráfico: Impacto do Marco Legal sobre a Segurança do Trabalhador">Ampliar ⤢</button>
            <figure>
              <picture>
                <source srcset="assets/grafico-marco-legal.webp" type="image/webp">
                <img src="assets/grafico-marco-legal.png" alt="Gráfico: Impacto do Marco Legal sobre a Segurança do Trabalhador — Comparativo entre desregulamentação atual e regulação proposta" width="1092" height="660" loading="lazy">
              </picture>
              <figcaption>Impacto do Marco Legal: comparativo entre a desregulamentação atual e a regulação proposta.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  </div>
</article>
`;

fs.writeFileSync('site/_blocks/block-d.html', blockDHtml.trim(), 'utf8');

// 5. BLOCO E: Expediente (p.14) + Referências (p.15) + Footer
const blockEHtml = `
<!-- SEÇÃO EXPEDIENTE E INTEGRANTES (p. 14) -->
<section id="expediente" class="site-section site-expediente page-light" data-page="14" aria-label="Expediente e Integrantes, página 14">
  <div class="site-section__inner">
    <div class="folio-tag folio"><b>07.</b><strong>Expediente e Integrantes</strong><span>p. 14</span></div>
    <h2 class="editorial-headline display-title title-red">O amanhã que escolhemos construir</h2>
    
    <div class="expediente-layout">
      <div class="expediente-info-card expediente-info">
        <h3>EXPEDIENTE | EDITORA 4:04</h3>
        <p>Revista Código Vermelho — Edição nº 1 | Ano 1<br>Publicado em 18 de outubro de 2026 | São Paulo – SP<br>Instituição: Instituto J&F — Germinare Tech<br>Disciplinas: Língua Portuguesa, Sociologia, Língua Inglesa e UX.</p>
        
        <h3>CORPO EDITORIAL E DIVISÃO DE FUNÇÕES</h3>
        <p><strong>REDAÇÃO & JORNALISMO INVESTIGATIVO</strong><br>
        Responsáveis pela condução das entrevistas com Marcos e Luis, apuração dos bastidores corporativos e redação da Reportagem e Contextualização.<br>
        Rogerio Buscariolo da Silva — <a href="mailto:rogerio.silva@institutojef.org.br">rogerio.silva@institutojef.org.br</a><br>
        Noé Rodrigo Carrion Cusiquispe — <a href="mailto:noe.cusiquispe@institutojef.org.br">noe.cusiquispe@institutojef.org.br</a><br>
        Enzo Casares Lanzani Santos — <a href="mailto:enzo.santos@institutojef.org.br">enzo.santos@institutojef.org.br</a></p>

        <p><strong>PESQUISA TEÓRICA & DOSSIÊ JURÍDICO-SOCIOLÓGICO</strong><br>
        Levantamento de dados empíricos (CAGED, FGV IBRE, IBGE), análise da legislação trabalhista (Artigo 7º CF/88, CLT, LGPD) e fundamentação teórica sobre trabalho precarizado e automação.<br>
        Pedro Macêdo Silva — <a href="mailto:pedro.silva@institutojef.org.br">pedro.silva@institutojef.org.br</a><br>
        Mateus Carlos da Silva Pereira — <a href="mailto:mateus.pereira@institutojef.org.br">mateus.pereira@institutojef.org.br</a><br>
        Lucas de Oliveira Candido dos Santos — <a href="mailto:lucas.santos@institutojef.org.br">lucas.santos@institutojef.org.br</a><br>
        Enzo Casares Lanzani Santos — <a href="mailto:enzo.santos@institutojef.org.br">enzo.santos@institutojef.org.br</a></p>

        <p><strong>DESIGN VISUAL, INFOGRAFIA & DIAGRAMAÇÃO</strong><br>
        Concepção da identidade visual "Código Vermelho", tratamento de imagem, vetorização gráfica e diagramação inspirada no construtivismo e editorial de denúncia.<br>
        Rogerio Buscariolo da Silva — <a href="mailto:rogerio.silva@institutojef.org.br">rogerio.silva@institutojef.org.br</a><br>
        Noé Rodrigo Carrion Cusiquispe — <a href="mailto:noe.cusiquispe@institutojef.org.br">noe.cusiquispe@institutojef.org.br</a></p>

        <p><strong>AGRADECIMENTOS</strong><br>
        Aos profissionais que concordaram em relatar suas experiências sob a condição de anonimato ("Marcos" e "Luis"), aos professores orientadores e a todos que lutam por um futuro em que a tecnologia sirva à emancipação humana, e não à sua descartabilidade.</p>
      </div>

      <div class="members-grid">
        <div class="member-card">
          <figure><img src="assets/enzo-casares-original.png" alt="Foto de Enzo Casares" width="1600" height="1457" loading="lazy"></figure>
          <span class="member-card__name member-name">Enzo Casares</span>
        </div>
        <div class="member-card">
          <figure><img src="assets/lucas-candido-original.png" alt="Foto de Lucas Candido" width="1593" height="1600" loading="lazy"></picture></figure>
          <span class="member-card__name member-name">Lucas Candido</span>
        </div>
        <div class="member-card">
          <figure><img src="assets/mateus-pereira-original.png" alt="Foto de Mateus Pereira" width="1200" height="1198" loading="lazy"></figure>
          <span class="member-card__name member-name">Mateus Pereira</span>
        </div>
        <div class="member-card">
          <figure><img src="assets/noe-carrion-original.png" alt="Foto de Noé Carrion" width="1565" height="1600" loading="lazy"></figure>
          <span class="member-card__name member-name">Noé Carrion</span>
        </div>
        <div class="member-card">
          <figure><img src="assets/pedro-macedo-original.png" alt="Foto de Pedro Macêdo" width="1274" height="1600" loading="lazy"></figure>
          <span class="member-card__name member-name">Pedro Macêdo</span>
        </div>
        <div class="member-card">
          <figure><img src="assets/rogerio-buscariolo-original.png" alt="Foto de Rogerio Buscariolo" width="1600" height="1597" loading="lazy"></figure>
          <span class="member-card__name member-name">Rogerio Buscariolo</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SEÇÃO REFERÊNCIAS BIBLIOGRÁFICAS (p. 15) -->
<section id="referencias" class="site-section site-referencias page-light page-refs" data-page="15" aria-label="Referências Bibliográficas, página 15">
  <div class="site-section__inner">
    <div class="folio-tag folio"><b>08.</b><strong>Referências Bibliográficas</strong><span>p. 15</span></div>
    <h2 class="editorial-headline display-title" style="color: var(--navy); margin-bottom: 24px;">Referências Bibliográficas</h2>

    <div class="references-tools" data-ui-chrome="true">
      <input type="search" class="references-filter-input" id="refFilterInput" placeholder="Filtrar por autor, lei ou instituição..." aria-label="Filtrar referências bibliográficas">
    </div>

    <div class="references-list">
      <p id="ref-acemoglu-2018"><strong>ACEMOGLU, Daron; RESTREPO, Pascual.</strong> The Race between Man and Machine: Implications of Technology for Growth, Factor Shares, and Employment. <em>American Economic Review</em>, v. 108, n. 6, p. 1488-1542, jun. 2018.</p>
      <p id="ref-acemoglu-2020"><strong>ACEMOGLU, Daron; RESTREPO, Pascual.</strong> Robots and Jobs: Evidence from US Labor Markets. <em>Journal of Political Economy</em>, Chicago, v. 128, n. 6, p. 2188-2244, 2020.</p>
      <p id="ref-antunes-2018"><strong>ANTUNES, Ricardo.</strong> <em>O Privilégio da Servidão: o novo proletariado de serviços na era digital</em>. 1. ed. São Paulo: Boitempo, 2018.</p>
      <p id="ref-antunes-2020"><strong>ANTUNES, Ricardo (Org.).</strong> <em>Uberização, trabalho digital e Indústria 4.0</em>. 1. ed. São Paulo: Boitempo, 2020.</p>
      <p id="ref-azevedo-1985"><strong>AZEVEDO, Beatriz Regina Zago de.</strong> Emprego, desemprego e subemprego: uma revisão da literatura crítica. <em>Ensaios FEE</em>, Porto Alegre, v. 6, n. 1, p. 155-168, 1985.</p>
      <p id="ref-barbosa-2023"><strong>BARBOSA, Munyse Barros.</strong> <em>Mercado de Trabalho em Empresas de Tecnologia no Brasil: desafios e oportunidades</em>. 2023. 66 f. Dissertação (Mestrado Profissional em Saúde Ambiental e Saúde do Trabalhador) – Instituto de Geografia, Universidade Federal de Uberlândia (UFU), Uberlândia, 2023.</p>
      <p id="ref-cf88"><strong>BRASIL. [Constituição (1988)].</strong> <em>Constituição da República Federativa do Brasil de 1988</em>. Brasília, DF: Presidência da República. Disponível em: <a href="http://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">planalto.gov.br</a>. Acesso em: 18 out. 2026.</p>
      <p id="ref-clt"><strong>BRASIL.</strong> Decreto-Lei nº 5.452, de 1º de maio de 1943. Aprova a Consolidação das Leis do Trabalho (CLT). [Artigo 2º - Princípio da Alteridade]. Brasília, DF: Presidência da República, 1943.</p>
      <p id="ref-lgpd"><strong>BRASIL.</strong> Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD). [Artigo 20 - Revisão humana de decisões automatizadas]. Brasília, DF: Presidência da República, 2018.</p>
      <p id="ref-pl-1091"><strong>BRASIL. Câmara dos Deputados.</strong> Projeto de Lei nº 1.091/2019. Dispõe sobre a proteção do trabalhador em face da automação e dá outras providências. Brasília, DF: Câmara dos Deputados, 2019.</p>
      <p id="ref-pl-2421"><strong>BRASIL. Câmara dos Deputados.</strong> Projeto de Lei nº 2.421/2023. Institui a Política Nacional de Mitigação dos Impactos da Inteligência Artificial sobre o Emprego e a Tributação sobre Automação Substitutiva. Brasília, DF: Câmara dos Deputados, 2023.</p>
      <p id="ref-caged-2023"><strong>BRASIL. Ministério do Trabalho e Emprego (MTE).</strong> Cadastro Geral de Empregados e Desempregados (CAGED): Microdados sobre movimentação e desligamentos de trabalhadores no setor de Tecnologia da Informação. Brasília, DF: MTE, 2022-2023.</p>
      <p id="ref-caliendo-2024"><strong>CALIENDO, Paulo; PODOLAN, Plínio Gevezier.</strong> Tributação da automação e inteligência artificial: a experiência internacional e as perspectivas para o Brasil. <em>Revista Direito Tributário Atual</em>, São Paulo, n. 55, p. 312-335, 2024.</p>
      <p id="ref-cesit-2016"><strong>CENTRO DE ESTUDOS SINDICAIS E DE ECONOMIA DO TRABALHO (CESIT).</strong> <em>Dossiê: Ocupações em Tecnologia e os Desafios da Geração de Trabalho Decente</em>. Campinas: Unicamp, 2016.</p>
      <p id="ref-cunha-2024"><strong>CUNHA, Isaac Rodrigues.</strong> Tributação sobre Automação: o conceito de robô contribuinte e a transição justa do mercado de trabalho. <em>Revista Interagir</em>, Belo Horizonte, v. 18, n. 2, p. 89-114, 2024.</p>
      <p id="ref-estrada-2022"><strong>ESTRADA, Manuel Martín Pino.</strong> O trabalho e o Direito do Trabalho na Quarta Revolução Industrial. <em>Revista do Tribunal Superior do Trabalho</em>, Porto Alegre, v. 88, n. 2, p. 145-168, abr./jun. 2022.</p>
      <p id="ref-fgv-2023"><strong>FUNDAÇÃO GETULIO VARGAS. Instituto Brasileiro de Economia (FGV IBRE).</strong> <em>Evolução do Rendimento Real da Força de Trabalho por Nível de Instrução: dados agregados PNAD/IBGE</em>. Rio de Janeiro: FGV, 2023.</p>
      <p id="ref-gray-2019"><strong>GRAY, Mary L.; SURI, Siddharth.</strong> <em>Ghost Work: How to Stop Silicon Valley from Building a New Global Underclass</em>. Boston: Houghton Mifflin Harcourt, 2019.</p>
      <p id="ref-ibge-pnad"><strong>INSTITUTO BRASILEIRO DE GEOGRAFIA E ESTATÍSTICA (IBGE).</strong> <em>Pesquisa Nacional por Amostra de Domicílios Contínua (PNAD Contínua): Indicadores de Subutilização da Força de Trabalho e Informalidade</em>. Rio de Janeiro: IBGE, 2022-2023.</p>
      <p id="ref-oliveira-2025"><strong>OLIVEIRA, Thainá Santos de.</strong> <em>O declínio do trabalho imaterial: Inteligência Artificial e a precarização das atividades intelectuais</em>. São Paulo: Expressão Popular, 2025.</p>
      <p id="ref-oit-158"><strong>ORGANIZAÇÃO INTERNACIONAL DO TRABALHO (OIT).</strong> Convenção nº 158: Término da Relação de Trabalho por Iniciativa do Empregador. Genebra: OIT, 1982.</p>
      <p id="ref-pasquinelli-2023"><strong>PASQUINELLI, Matteo.</strong> <em>The Eye of the Master: A Social History of Artificial Intelligence</em>. Londres: Verso, 2023.</p>
      <p id="ref-adi-1625"><strong>SUPREMO TRIBUNAL FEDERAL (STF).</strong> Ação Direta de Inconstitucionalidade nº 1.625/DF. Relator: Min. Maurício Corrêa. Julgamento concluído em 2023. Brasília, DF: STF, 2023.</p>
      <p id="ref-tema-638"><strong>SUPREMO TRIBUNAL FEDERAL (STF).</strong> Recurso Extraordinário nº 999.435/SP (Tema 638 da Repercussão Geral). Tese: A intervenção sindical prévia é exigência procedimental imprescindível para a dispensa em massa de trabalhadores. Relator: Min. Edson Fachin. Julgamento em 08 jun. 2022. Brasília, DF: STF, 2022.</p>
      <p id="ref-tst-443"><strong>TRIBUNAL SUPERIOR DO TRABALHO (TST).</strong> Súmula nº 443: Dispensa Discriminatória. Presume-se discriminatória a despedida de empregado portador do vírus HIV ou de outra doença grave que suscite estigma ou preconceito. Invalidação do ato e direito à reintegração. Brasília, DF: TST, 2012.</p>
      <p id="ref-wef-2023"><strong>WORLD ECONOMIC FORUM (WEF).</strong> <em>The Future of Jobs Report 2023</em>. Cologny/Genebra: World Economic Forum, 2023.</p>
    </div>
  </div>
</section>

<!-- RODAPÉ INSTITUCIONAL -->
<footer class="site-footer" data-ui-chrome="true">
  <div class="site-footer__inner">
    <div class="site-footer__top">
      <div class="site-footer__brand">
        <img src="assets/codigo-vermelho-logo.png" alt="Código Vermelho" width="220" style="filter: brightness(0) invert(1); margin-bottom: 8px;">
        <p style="margin: 0; font-family: var(--font-body); font-size: 14px; opacity: 0.9;">Trabalho descartável: até quando vamos fingir que isso é progresso?</p>
      </div>
      <a class="back-to-top" href="#capa" id="backToTopBtn" aria-label="Voltar ao topo da página">
        Voltar ao topo ↑
      </a>
    </div>
  </div>
</footer>

<!-- DIÁLOGO MODAL PARA VISUALIZAÇÃO AMPLIADA DE GRÁFICOS (LIGHTBOX) -->
<dialog class="chart-dialog" id="chartDialog" aria-labelledby="chartDialogCaption" data-ui-chrome="true">
  <button type="button" class="chart-dialog__close" id="chartDialogClose" aria-label="Fechar janela de visualização do gráfico">×</button>
  <img class="chart-dialog__img" id="chartDialogImg" src="" alt="">
  <p class="chart-dialog__caption" id="chartDialogCaption"></p>
</dialog>
`;

fs.writeFileSync('site/_blocks/block-e.html', blockEHtml.trim(), 'utf8');

// Montagem do site/index.html completo
const fullIndexHtml = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#163a56">
  <meta name="description" content="Código Vermelho — revista digital em formato landing page sobre inteligência artificial, demissões corporativas, precarização e direitos dos trabalhadores.">
  <title>Código Vermelho — 1ª edição | Trabalho descartável</title>
  
  <!-- Estilos da Revista -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <a class="skip-link" href="#capa" data-ui-chrome="true">Pular para o conteúdo principal</a>

  <main id="conteudo-principal" class="site-content">
${blockAHtml}
${blockBHtml}
${blockCHtml}
${blockDHtml}
${blockEHtml}
  </main>

  <!-- Script leve vanilla sem dependências -->
  <script src="js/main.js"></script>
</body>
</html>
`;

fs.writeFileSync('site/index.html', fullIndexHtml.trim(), 'utf8');
console.log('site/index.html montado com sucesso a partir dos blocos!');
