(() => {
  const scenarios = window.PLANET_SCENARIOS || [];
  const categories = ['All experiments', ...new Set(scenarios.map(s => s.category))];
  const els = Object.fromEntries(['scenarioList','categoryTabs','searchInput','scenarioCount','experimentNumber','detailCategory','detailId','detailTitle','detailDescription','statLabel','statValue','insightText','stageTag','stageAge','figureNumber','pageLabel','planetStage','starfield','compareDrawer','compareScenarioName','compareValue','miniAlternate'].map(id => [id, document.getElementById(id)]));
  let selected = 0;
  let category = 'All experiments';
  let query = '';

  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const formatNumber = n => String(n + 1).padStart(2, '0');

  // Scatter a consistent field of stars so the little cosmos feels intentional on every load.
  let seed = 413;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  if (els.starfield) {
    els.starfield.innerHTML = Array.from({length: 54}, () => {
      const x = (random() * 96 + 2).toFixed(2), y = (random() * 91 + 3).toFixed(2);
      const opacity = (.18 + random() * .55).toFixed(2), duration = (1.3 + random() * 3.8).toFixed(2);
      return `<i class="star" style="left:${x}%;top:${y}%;--opacity:${opacity};--duration:${duration}s"></i>`;
    }).join('');
  }

  function visibleScenarios() {
    return scenarios.map((item, index) => ({item,index})).filter(({item}) =>
      (category === 'All experiments' || item.category === category) &&
      (!query || `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query))
    );
  }

  function renderTabs() {
    els.categoryTabs.innerHTML = categories.map((name, i) => {
      const short = ['All','Water & climate','Gravity & motion','Orbit & sunlight','Air & atmosphere','Living Earth'][i];
      return `<button class="category-tab${category === name ? ' active' : ''}" role="tab" aria-selected="${category === name}" data-category="${escapeHTML(name)}">${escapeHTML(short)}</button>`;
    }).join('');
    els.categoryTabs.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      category = button.dataset.category;
      renderTabs(); renderList();
    }));
  }

  function renderList() {
    const matches = visibleScenarios();
    els.scenarioCount.textContent = String(matches.length).padStart(2, '0');
    if (!matches.length) {
      els.scenarioList.innerHTML = '<div class="no-results">No worlds found. Try another search or category.</div>';
      return;
    }
    els.scenarioList.innerHTML = matches.map(({item,index}) => `<button class="scenario-row${index === selected ? ' active' : ''}" role="option" aria-selected="${index === selected}" data-index="${index}"><span class="scenario-index">${formatNumber(index)}</span><span class="scenario-name">${escapeHTML(item.title)}</span><span class="scenario-type">${escapeHTML(item.stat)}</span></button>`).join('');
    els.scenarioList.querySelectorAll('.scenario-row').forEach(button => button.addEventListener('click', () => select(Number(button.dataset.index))));
  }

  function replay() {
    els.planetStage.classList.remove('replaying');
    void els.planetStage.offsetWidth;
    els.planetStage.classList.add('replaying');
    window.setTimeout(() => els.planetStage.classList.remove('replaying'), 1000);
  }

  function select(index) {
    selected = (index + scenarios.length) % scenarios.length;
    const s = scenarios[selected];
    els.planetStage.dataset.mode = s.mode;
    els.experimentNumber.textContent = `EXPERIMENT ${formatNumber(selected)} / ${scenarios.length}`;
    els.detailCategory.textContent = s.category.toUpperCase();
    els.detailId.textContent = s.id;
    els.detailTitle.textContent = s.title;
    els.detailDescription.textContent = s.description;
    els.statLabel.textContent = s.stat;
    const readout = ({'EE-001':'0%','EE-002':'100%','EE-003':'2×','EE-004':'−50%','EE-010':'100%','EE-011':'0%','EE-015':'3×','EE-019':'+20%'}[s.id] || s.value);
    els.statValue.textContent = readout;
    els.insightText.textContent = s.insight;
    els.stageTag.textContent = s.mode === 'dry' ? 'DRY WORLD' : s.mode === 'ice' ? 'FROZEN WORLD' : s.mode === 'hot' ? 'HOT WORLD' : s.category.toUpperCase().replace(' & ', ' / ');
    els.stageAge.textContent = s.mode === 'marsward' ? '1.52 AU' : s.mode === 'venusward' ? '0.72 AU' : s.mode === 'longyear' ? '2 EARTH YR' : '4.54 BY';
    els.figureNumber.textContent = formatNumber(selected);
    els.pageLabel.innerHTML = `${formatNumber(selected)} <i>/</i> ${scenarios.length}`;
    els.compareScenarioName.textContent = s.title.toUpperCase();
    els.compareValue.textContent = `${s.value} ${s.stat.toLowerCase()}`;
    els.miniAlternate.style.color = s.mode === 'ice' ? '#c3eafa' : s.mode === 'hot' || s.mode === 'warm' ? '#ff9d5c' : '#c7f36b';
    renderList(); replay();
  }

  els.searchInput.addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); renderList(); });
  document.getElementById('prevButton').addEventListener('click', () => select(selected - 1));
  document.getElementById('nextButton').addEventListener('click', () => select(selected + 1));
  document.getElementById('shuffleButton').addEventListener('click', () => {
    if (scenarios.length < 2) return;
    let next = selected;
    while (next === selected) next = Math.floor(Math.random() * scenarios.length);
    select(next);
  });
  document.getElementById('replayButton').addEventListener('click', replay);
  document.getElementById('compareButton').addEventListener('click', () => { els.compareDrawer.hidden = !els.compareDrawer.hidden; });
  document.getElementById('closeCompare').addEventListener('click', () => { els.compareDrawer.hidden = true; });
  document.getElementById('motionToggle').addEventListener('click', e => {
    const on = document.body.classList.toggle('reduce-motion') === false;
    e.currentTarget.setAttribute('aria-pressed', String(on));
    e.currentTarget.querySelector('span:last-child').textContent = on ? 'Motion on' : 'Motion off';
  });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); els.searchInput.focus(); }
    if (e.key === 'ArrowRight' && document.activeElement.tagName !== 'INPUT') select(selected + 1);
    if (e.key === 'ArrowLeft' && document.activeElement.tagName !== 'INPUT') select(selected - 1);
    if (e.key === 'Escape') { els.compareDrawer.hidden = true; els.searchInput.blur(); }
  });

  renderTabs();
  select(0);
})();
