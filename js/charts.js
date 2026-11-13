/* Dados e interação adaptados de https://github.com/buscariolo-rogerio/codigo-vermelho-revista/blob/main/dist/charts.js (MIT). */
(() => {
  const charts = {
    renda: {
      type: 'bars', title: 'Queda real da renda por escolaridade', note: 'Perda acumulada na última década',
      source: 'Fonte: FGV IBRE', max: 16.7, unit: '%', negative: true,
      items: [['Ensino superior', 16.7], ['Ensino médio', 5.2], ['Ensino fundamental', 1.8]]
    },
    escolaridade: {
      type: 'bars', title: 'Demitidos em tecnologia por escolaridade', note: '227.386 desligamentos sem justa causa',
      source: 'Fonte: CAGED / dissertação UFU (Munyse Barbosa, 2023)', max: 59.4, unit: '%',
      items: [['Superior completo', 59.4], ['Superior incompleto', 27.5], ['Ensino médio', 11.8], ['Fundamental / outros', 1.3]]
    },
    inercia: {
      type: 'stats', title: 'Inércia diante da automação',
      source: 'Fonte: Constituição de 1988; STF (ADO 73/2025 e ADI 1625/2024)',
      items: [['0', 'leis de proteção aprovadas'], ['38', 'anos sem regulamentar o Art. 7º, XXVII'], ['27', 'anos até a conclusão da ADI 1625 (1997–2024)']]
    },
    acoes: {
      type: 'columns', title: 'Ações trabalhistas citando IA e LGPD', note: 'Série estimada; 2026 é projeção',
      source: 'Fonte: estimativa com base em jurisprudência dos TRTs e TST (2020–2026)',
      items: [['2020', 310], ['2021', 680], ['2022', 1420], ['2023', 2890], ['2024', 5640], ['2025', 9850], ['2026*', 14200]]
    },
    desprotecao: {
      type: 'bars', title: 'Desproteção social no Brasil', note: 'Milhões de trabalhadores; grupos podem se sobrepor',
      source: 'Fonte: IBGE / PNAD Contínua', max: 38, unit: ' milhões',
      items: [['Na informalidade', 38], ['Em vulnerabilidade laboral', 33.9], ['Subutilizados', 20.9]]
    },
    previdencia: {
      type: 'donut', title: 'Previdência no trabalho por aplicativo',
      source: 'Fonte: IBGE / módulo de plataformas digitais da PNAD Contínua',
      items: [['Sem contribuição ao INSS', 77, '#e52e29'], ['Contribuem para a Previdência', 23, '#71808b']]
    },
    fundo: {
      type: 'donut', title: 'Destinação proposta do Fundo Social',
      source: 'Fonte: proposta inspirada nos PLs 1.091/2019 e 2.421/2023 e em Cunha (2024)',
      items: [['Requalificação remunerada', 40, '#e52e29'], ['Manutenção de renda', 30, '#163a56'], ['Inclusão previdenciária', 20, '#75828b'], ['Fiscalização algorítmica', 10, '#c8d0d6']]
    },
    marco: {
      type: 'pairs', title: 'Marco Legal: impacto projetado', note: 'Cenário atual × proposta de proteção',
      source: 'Fonte: projeção baseada em LGPD, Convenção 158 da OIT e CLT',
      items: [['Cobertura do INSS em apps', 23, 80], ['Proteção contra descarte por IA', 5, 90], ['Capacitação remunerada', 18, 85], ['Transparência algorítmica', 12, 95]]
    },
    regioes: {
      type: 'donut', title: 'Desligamentos em TI por região',
      note: '227.386 desligamentos sem justa causa · jan. 2022–jul. 2023',
      source: 'Fonte: Barbosa (2023), dissertação UFU, Tabela 1, p. 43, CAGED.',
      items: [['Sudeste', 65.2, '#e52e29'], ['Sul', 18.9, '#163a56'], ['Centro-Oeste', 9.2, '#71808b'], ['Nordeste', 6.2, '#b5bec5'], ['Norte', 0.5, '#d8dee2']]
    },
    tarefas: {
      type: 'slope', title: 'Tarefas realizadas por tecnologia',
      note: '2025 é projeção do relatório publicado em 2020',
      source: 'Fonte: Future of Jobs Report 2020 (WEF), citado em Caliendo & Podolan (2024), p. 9.',
      max: 50, items: [['2020', 38], ['2025 (projeção)', 47]]
    },
  };

  const percent = value => `${Number(value).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
  const valueText = (value, chart) => chart.unit === '%'
    ? `${chart.negative ? '−' : ''}${percent(value)}`
    : `${Number(value).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}${chart.unit || ''}`;
  const safe = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const heading = chart => `<figcaption class="chart-heading"><strong>${safe(chart.title)}</strong>${chart.note ? `<span>${safe(chart.note)}</span>` : ''}</figcaption>`;
  const source = chart => `<p class="chart-source">${safe(chart.source)}</p>`;

  function renderBars(chart) {
    const rows = chart.items.map(([label, value], index) => {
      const text = valueText(value, chart);
      const color = index === 0 ? '#e52e29' : index === 1 ? '#71808b' : '#b5bec5';
      return `<div class="chart-row"><span class="chart-row-label">${safe(label)}</span><button type="button" class="chart-bar" style="--pct:${Math.max(2, value / chart.max * 100)}%;--bar-color:${color}" aria-label="${safe(label)}: ${safe(text)}"><span class="chart-bar-fill"></span><span class="chart-value">${safe(text)}</span><span class="chart-tip">${safe(label)} · ${safe(text)}</span></button></div>`;
    }).join('');
    return `<div class="chart-body chart-bars">${rows}</div>`;
  }

  function renderStats(chart) {
    return `<div class="chart-body chart-stats">${chart.items.map(([value, label]) => `<button type="button" class="chart-stat" aria-label="${safe(value)} ${safe(label)}"><strong>${safe(value)}</strong><span>${safe(label)}</span><span class="chart-tip">${safe(value)} ${safe(label)}</span></button>`).join('')}</div>`;
  }

  function renderColumns(chart) {
    const max = Math.max(...chart.items.map(item => item[1]));
    return `<div class="chart-body chart-columns">${chart.items.map(([year, value], index) => {
      const actions = Number(value).toLocaleString('pt-BR');
      const projection = year === '2026*';
      const label = `${year}: ${actions} ações${projection ? ', projeção' : ''}`;
      return `<button type="button" class="chart-column" style="--pct:${Math.max(2, value / max * 72)}%;--bar-color:${index >= 5 ? '#e52e29' : '#71808b'}" aria-label="${safe(label)}"><span class="chart-column-value">${actions}</span><span class="chart-column-bar"></span><span class="chart-column-year">${safe(year)}</span><span class="chart-tip">${safe(year)} · ${actions} ações${projection ? ' (projeção)' : ''}</span></button>`;
    }).join('')}</div>`;
  }

  function renderDonut(chart) {
    let start = 0;
    const segments = chart.items.map(([, value, color]) => {
      const part = `${color} ${start}% ${start + value}%`;
      start += value;
      return part;
    });
    const label = chart.items.map(([name, value]) => `${name}: ${percent(value)}`).join('; ');
    return `<div class="chart-body chart-donut-layout"><div class="chart-donut" style="--segments:conic-gradient(${segments.join(',')})" role="img" aria-label="${safe(label)}"><div class="chart-donut-center"><strong>${percent(chart.items[0][1])}</strong><span>${safe(chart.items[0][0])}</span></div></div><div class="chart-legend">${chart.items.map(([name, value, color], index) => `<button type="button" class="chart-legend-item${index === 0 ? ' is-active' : ''}" data-label="${safe(name)}" data-value="${percent(value)}" aria-label="${safe(name)}: ${percent(value)}"><i style="background:${color}"></i><span>${safe(name)}</span><b>${percent(value)}</b></button>`).join('')}</div></div>`;
  }
  function renderSlope(chart) {
    const points = chart.items.map(([label, value], index) => ({
      label, value, x: index === 0 ? 18 : 82, y: 82 - value / chart.max * 72
    }));
    const line = points.map(point => `${point.x},${point.y}`).join(' ');
    return `<div class="chart-body chart-slope-body" role="group" aria-label="${safe(chart.title)}, escala de 0 a ${chart.max}%"><div class="chart-slope-scale" aria-hidden="true"><span>50%</span><span>25%</span><span>0%</span></div><div class="chart-slope-plot"><span class="chart-slope-gridline chart-slope-gridline--50"></span><span class="chart-slope-gridline chart-slope-gridline--25"></span><span class="chart-slope-gridline chart-slope-gridline--0"></span><svg class="chart-slope-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${line}"></polyline></svg>${points.map(point => `<button type="button" class="chart-slope-point" style="--point-x:${point.x}%;--point-y:${point.y}%" aria-label="${safe(point.label)}: ${percent(point.value)}"><span class="chart-slope-value">${percent(point.value)}</span><span class="chart-tip">${safe(point.label)} · ${percent(point.value)}${point.label.includes('projeção') ? ' (projeção do relatório de 2020)' : ''}</span></button>`).join('')}<div class="chart-slope-years" aria-hidden="true">${points.map(point => `<span style="left:${point.x}%">${safe(point.label)}</span>`).join('')}</div></div></div>`;
  }

  function renderPairs(chart) {
    return `<div class="chart-body chart-pairs"><div class="chart-pair-key"><span><i class="now"></i> Atual</span><span><i class="proposed"></i> Proposto</span></div>${chart.items.map(([label, now, proposed]) => `<div class="chart-pair"><span class="chart-pair-label">${safe(label)}</span><div class="chart-pair-bars"><button type="button" class="chart-pair-bar now" style="--pct:${now}%" aria-label="${safe(label)}, cenário atual: ${percent(now)}"><span></span><b>${percent(now)}</b><em class="chart-tip">Atual · ${percent(now)}</em></button><button type="button" class="chart-pair-bar proposed" style="--pct:${proposed}%" aria-label="${safe(label)}, proposta: ${percent(proposed)}"><span></span><b>${percent(proposed)}</b><em class="chart-tip">Proposto · ${percent(proposed)}</em></button></div></div>`).join('')}</div>`;
  }

  const renderers = { bars: renderBars, stats: renderStats, columns: renderColumns, donut: renderDonut, pairs: renderPairs, slope: renderSlope };
  document.querySelectorAll('figure[data-chart]').forEach(figure => {
    const chart = charts[figure.dataset.chart];
    if (!chart) return;
    const zoom = `<button class="chart-zoom-btn" type="button" data-ui-chrome="true" aria-label="Ampliar gráfico: ${safe(chart.title)}">Ampliar ⤢</button>`;
    figure.classList.add('interactive-chart');
    figure.setAttribute('aria-label', chart.title);
    figure.innerHTML = `${zoom}${heading(chart)}${renderers[chart.type](chart)}${source(chart)}`;

    if (chart.type === 'donut') {
      const center = figure.querySelector('.chart-donut-center');
      const items = [...figure.querySelectorAll('.chart-legend-item')];
      const select = item => {
        items.forEach(button => button.classList.toggle('is-active', button === item));
        center.querySelector('strong').textContent = item.dataset.value;
        center.querySelector('span').textContent = item.dataset.label;
      };
      items.forEach(item => {
        item.addEventListener('mouseenter', () => select(item));
        item.addEventListener('focus', () => select(item));
        item.addEventListener('click', () => select(item));
      });
    }
  });
})();
