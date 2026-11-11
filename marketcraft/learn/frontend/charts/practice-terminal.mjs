import { PRACTICE_INSTRUMENTS, calculateEMA, calculateSMA, createSyntheticBars } from './market-instruments.mjs';

const STORAGE_KEY = 'marketcraft-practice-drawings-v1';
const instrumentById = Object.fromEntries(PRACTICE_INSTRUMENTS.map((item) => [item.id, item]));
const money = (cents) => '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function createPracticeTerminal(root, { initialInstrument = 'BTC', onInstrumentChange = () => {} } = {}) {
  const canvas = root?.querySelector('#practiceChart');
  if (!root || !canvas) return Object.freeze({ selectInstrument: () => {}, setTool: () => {}, destroy: () => {} });
  const ctx = canvas.getContext('2d');
  const state = { instrumentId: instrumentById[initialInstrument] ? initialInstrument : 'BTC', timeframe: '1D', chartType: 'candlestick', tool: 'crosshair', bars: [], visibleCount: 72, offset: 0, replayIndex: null, replayTimer: null, replaySpeed: 500, drawings: [], anchor: null, crosshair: null, indicators: new Set(['sma']), hovered: -1, destroyed: false };
  const read = (selector) => root.querySelector(selector);
  const chartHost = read('.practice-chart-host');
  const formatValue = (value) => {
    const instrument = instrumentById[state.instrumentId];
    return instrument.unit.includes('index points') ? value.toFixed(2) + ' pts' : money(Math.round(value));
  };
  function key() { return STORAGE_KEY + ':' + state.instrumentId + ':' + state.timeframe; }
  function loadDrawings() {
    try { state.drawings = JSON.parse(localStorage.getItem(key()) || '[]').filter((item) => ['horizontal', 'trendline', 'rectangle', 'fibonacci', 'text'].includes(item.type)); }
    catch { state.drawings = []; }
  }
  function saveDrawings() {
    try { localStorage.setItem(key(), JSON.stringify(state.drawings)); } catch { /* drawings remain available until this page closes */ }
  }
  function visibleBars() {
    const availableEnd = state.replayIndex == null ? state.bars.length : Math.min(state.bars.length, state.replayIndex + 1);
    const end = Math.max(0, availableEnd - state.offset);
    const start = Math.max(0, end - state.visibleCount);
    return state.bars.slice(start, end);
  }
  function geometry(width, height) {
    return { left: 12, right: width - 76, top: 18, bottom: height - 76, volumeTop: height - 64, volumeBottom: height - 28, axisBottom: height - 5 };
  }
  function coords() {
    const r = canvas.getBoundingClientRect();
    return { width: Math.max(320, r.width), height: Math.max(250, r.height), dpr: Math.max(1, devicePixelRatio || 1) };
  }
  function draw() {
    if (state.destroyed || !ctx) return;
    const { width, height, dpr } = coords();
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const style = getComputedStyle(document.body); const grid = style.getPropertyValue('--border').trim() || '#52616a'; const ink = style.getPropertyValue('--muted').trim() || '#aeb8bd'; const up = style.getPropertyValue('--pnl-profit').trim() || '#78d49a'; const down = style.getPropertyValue('--pnl-loss').trim() || '#ff8f8f'; const accent = style.getPropertyValue('--gold').trim() || '#e4bd83';
    const box = geometry(width, height); const bars = visibleBars();
    if (!bars.length) return;
    const lows = bars.map((bar) => bar.low), highs = bars.map((bar) => bar.high);
    const min = Math.min(...lows) * .996, max = Math.max(...highs) * 1.004, span = Math.max(1, max - min);
    const xAt = (i) => box.left + (bars.length <= 1 ? 0 : i * (box.right - box.left) / (bars.length - 1));
    const yAt = (v) => box.bottom - ((v - min) / span) * (box.bottom - box.top);
    const candleWidth = Math.max(2, Math.min(10, (box.right - box.left) / bars.length * .62));
    ctx.font = '10px Inter, Segoe UI, sans-serif'; ctx.lineWidth = 1;
    for (let n = 0; n <= 4; n += 1) { const y = box.top + n * (box.bottom - box.top) / 4; ctx.strokeStyle = grid; ctx.globalAlpha = .45; ctx.beginPath(); ctx.moveTo(box.left, y); ctx.lineTo(box.right, y); ctx.stroke(); ctx.globalAlpha = 1; ctx.fillStyle = ink; ctx.fillText(formatValue(max - n * span / 4), box.right + 6, y + 3); }
    const volumeMax = Math.max(...bars.map((bar) => bar.volume), 1);
    bars.forEach((bar, index) => {
      const x = xAt(index); const color = bar.close >= bar.open ? up : down;
      if (state.chartType === 'candlestick') {
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, yAt(bar.high)); ctx.lineTo(x, yAt(bar.low)); ctx.stroke();
        const top = Math.min(yAt(bar.open), yAt(bar.close)); const bodyHeight = Math.max(1.5, Math.abs(yAt(bar.open) - yAt(bar.close)));
        ctx.fillRect(x - candleWidth / 2, top, candleWidth, bodyHeight);
      } else {
        const y = yAt(bar.close); const previous = index ? yAt(bars[index - 1].close) : y;
        if (state.chartType === 'area') { ctx.fillStyle = color; ctx.globalAlpha = .1; ctx.fillRect(box.left, y, x - box.left || 1, box.bottom - y); ctx.globalAlpha = 1; }
        if (index) { ctx.strokeStyle = accent; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(xAt(index - 1), previous); ctx.lineTo(x, y); ctx.stroke(); }
      }
      const volHeight = (bar.volume / volumeMax) * (box.volumeBottom - box.volumeTop);
      ctx.fillStyle = color; ctx.globalAlpha = .48; ctx.fillRect(x - candleWidth / 2, box.volumeBottom - volHeight, candleWidth, volHeight); ctx.globalAlpha = 1;
    });
    for (const [name, color] of [['sma', '#f0bd72'], ['ema', '#7dc9e8']]) {
      if (!state.indicators.has(name)) continue;
      const values = bars.map((bar) => bar.close); const series = name === 'sma' ? calculateSMA(values, 10) : calculateEMA(values, 10);
      ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.beginPath(); let started = false;
      series.forEach((value, index) => { if (value == null) return; const x = xAt(index), y = yAt(value); if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y); }); ctx.stroke();
    }
    ctx.fillStyle = ink; ctx.textAlign = 'center';
    for (let i = 0; i < 5; i += 1) { const index = Math.round(i * (bars.length - 1) / 4); ctx.fillText(bars[index]?.label || '', xAt(index), box.axisBottom); }
    ctx.textAlign = 'left';
    drawDrawings(bars, xAt, yAt, accent);
    if (state.crosshair && state.crosshair.x >= box.left && state.crosshair.x <= box.right) {
      ctx.strokeStyle = ink; ctx.globalAlpha = .7; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(state.crosshair.x, box.top); ctx.lineTo(state.crosshair.x, box.bottom); ctx.moveTo(box.left, state.crosshair.y); ctx.lineTo(box.right, state.crosshair.y); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
    updateOhlc(bars, width);
  }
  function drawDrawings(bars, xAt, yAt, color) {
    const box = geometry(coords().width, coords().height); const xFor = (point) => xAt(Math.max(0, Math.min(bars.length - 1, point.index - (bars[0]?.index || 0)))); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5; ctx.globalAlpha = .85;
    for (const item of state.drawings) {
      const x1 = xFor(item.a), y1 = yAt(item.a.price);
      const x2 = xFor(item.b), y2 = yAt(item.b.price);
      if (item.type === 'horizontal') { ctx.beginPath(); ctx.moveTo(box.left, y1); ctx.lineTo(box.right, y1); ctx.stroke(); }
      else if (item.type === 'trendline') { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
      else if (item.type === 'rectangle') ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      else if (item.type === 'fibonacci') { for (const level of [0, .382, .5, .618, 1]) { const y = y1 + (y2 - y1) * level; ctx.beginPath(); ctx.moveTo(Math.min(x1, x2), y); ctx.lineTo(Math.max(x1, x2), y); ctx.stroke(); ctx.fillText(`${Math.round(level * 100)}%`, Math.max(x1, x2) + 3, y - 2); } }
      else if (item.type === 'text') { ctx.fillText(item.text, x1, y1); }
    }
    ctx.globalAlpha = 1;
  }
  function updateOhlc(bars = visibleBars()) {
    const item = read('#chartOhlc');
    if (!item || !bars.length) return;
    const index = state.hovered < 0 ? bars.length - 1 : Math.min(state.hovered, bars.length - 1); const bar = bars[index];
    item.textContent = `${bar.label} · O ${formatValue(bar.open)} · H ${formatValue(bar.high)} · L ${formatValue(bar.low)} · C ${formatValue(bar.close)} · V ${bar.volume}`;
  }
  function saveFrame() {
    const instrument = instrumentById[state.instrumentId]; state.bars = createSyntheticBars(state.instrumentId, state.timeframe);
    state.visibleCount = Math.min(72, state.bars.length); state.offset = 0; state.replayIndex = null; state.anchor = null; state.hovered = -1; loadDrawings();
    read('#terminalSymbol').textContent = instrument.symbol; read('#terminalInstrumentTitle').textContent = instrument.name + ' · ' + instrument.symbol;
    read('#terminalDataState').textContent = 'SIMULATED · LOCAL EDUCATIONAL SAMPLE';
    read('#terminalSource').textContent = `${instrument.instrumentType} · ${instrument.unit} · generated locally at ${new Date().toLocaleTimeString()}`;
    read('#terminalLastPrice').textContent = formatValue(instrument.priceCents); read('#terminalInstrumentType').textContent = instrument.instrumentType;
    renderWatchlist(); updateReplayControls(); draw(); onInstrumentChange(instrument);
  }
  function renderWatchlist() {
    const list = read('#terminalWatchlist'); if (!list) return; list.replaceChildren();
    for (const instrument of PRACTICE_INSTRUMENTS) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'watchlist-item' + (instrument.id === state.instrumentId ? ' selected' : ''); button.setAttribute('aria-pressed', String(instrument.id === state.instrumentId));
      const label = document.createElement('span'); label.innerHTML = `<strong>${instrument.name}</strong><small>${instrument.symbol} · ${instrument.category}</small>`;
      const price = document.createElement('b'); price.textContent = instrument.unit.includes('index points') ? (instrument.priceCents / 100).toFixed(2) + ' pts' : money(instrument.priceCents);
      const samples = createSyntheticBars(instrument.id, '1D', 2); const change = samples[1].close - samples[0].close; const changePct = change / samples[0].close * 100; const changeLabel = instrument.unit.includes('index points') ? `${change >= 0 ? '+' : ''}${(change / 100).toFixed(2)} pts` : `${change >= 0 ? '+' : ''}${money(Math.round(change))}`;
      const changeText = document.createElement('small'); changeText.className = 'watchlist-change ' + (change > 0 ? 'profit' : change < 0 ? 'loss' : 'neutral'); changeText.textContent = `${changeLabel} (${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%)`;
      const status = document.createElement('small'); status.className = 'watchlist-state'; status.textContent = 'SIM'; button.append(label, changeText, price, status);
      button.addEventListener('click', () => selectInstrument(instrument.id)); list.append(button);
    }
  }
  function updateReplayControls() {
    const slider = read('#replayPosition'); if (!slider) return; slider.max = String(state.bars.length - 1); slider.value = String(state.replayIndex ?? state.bars.length - 1);
    read('#replayLabel').textContent = state.replayIndex == null ? 'Replay paused · historical simulation' : `Replay ${state.replayIndex + 1} / ${state.bars.length} · historical simulation`;
  }
  function pointAt(event) {
    const r = canvas.getBoundingClientRect(); const box = geometry(r.width, r.height); const x = event.clientX - r.left, y = event.clientY - r.top; const bars = visibleBars();
    const xRatio = Math.max(0, Math.min(1, (x - box.left) / (box.right - box.left)));
    const values = bars.flatMap((bar) => [bar.high, bar.low]); const max = Math.max(...values), min = Math.min(...values); const yRatio = Math.max(0, Math.min(1, (y - box.top) / (box.bottom - box.top)));
    const localIndex = Math.round(xRatio * Math.max(0, bars.length - 1));
    return { index: bars[localIndex]?.index || 0, price: max - yRatio * Math.max(1, max - min), x, y };
  }
  function setTool(tool) {
    state.tool = tool; state.anchor = null;
    root.querySelectorAll('[data-draw-tool]').forEach((button) => { const active = button.dataset.drawTool === tool; button.classList.toggle('selected', active); button.setAttribute('aria-pressed', String(active)); });
    canvas.setAttribute('aria-label', `Illustrative simulated ${instrumentById[state.instrumentId].name} chart. Active tool: ${tool}.`);
  }
  function selectInstrument(id) { if (!instrumentById[id]) return; state.instrumentId = id; saveFrame(); }
  function addPoint(event) {
    const point = pointAt(event);
    if (state.tool === 'crosshair') { state.crosshair = point; state.hovered = visibleBars().findIndex((bar) => bar.index === point.index); draw(); return; }
    if (state.tool === 'eraser') { if (state.drawings.length) { state.drawings.pop(); saveDrawings(); draw(); } return; }
    if (state.tool === 'horizontal') { state.drawings.push({ type: state.tool, a: point, b: point }); saveDrawings(); draw(); return; }
    if (state.tool === 'text') { state.drawings.push({ type: 'text', a: point, b: point, text: read('#annotationText')?.value.trim() || 'Note' }); saveDrawings(); draw(); return; }
    if (!state.anchor) { state.anchor = point; return; }
    state.drawings.push({ type: state.tool, a: state.anchor, b: point }); state.anchor = null; saveDrawings(); draw();
  }
  function handleWheel(event) {
    event.preventDefault();
    if (event.shiftKey) state.offset = Math.max(0, Math.min(state.bars.length - 10, state.offset + (event.deltaY > 0 ? 5 : -5)));
    else state.visibleCount = Math.max(16, Math.min(state.bars.length, state.visibleCount + (event.deltaY > 0 ? 8 : -8)));
    draw();
  }
  canvas.addEventListener('pointermove', (event) => { state.crosshair = pointAt(event); const bars = visibleBars(); state.hovered = bars.findIndex((bar) => bar.index === state.crosshair.index); const tooltip = read('#chartTooltip'); const bar = bars[state.hovered]; if (tooltip && bar) { tooltip.hidden = false; tooltip.textContent = `${bar.label}  O ${formatValue(bar.open)}  H ${formatValue(bar.high)}  L ${formatValue(bar.low)}  C ${formatValue(bar.close)}`; tooltip.style.left = Math.min(event.offsetX + 14, canvas.clientWidth - 290) + 'px'; tooltip.style.top = Math.max(4, event.offsetY - 30) + 'px'; } draw(); });
  canvas.addEventListener('pointerleave', () => { if (!state.anchor) state.crosshair = null; const tooltip = read('#chartTooltip'); if (tooltip) tooltip.hidden = true; draw(); });
  canvas.addEventListener('click', addPoint); canvas.addEventListener('wheel', handleWheel, { passive: false });
  canvas.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { state.hovered = Math.max(0, Math.min(visibleBars().length - 1, state.hovered + (event.key === 'ArrowLeft' ? -1 : 1))); const bars = visibleBars(); const box = geometry(coords().width, coords().height); state.crosshair = { index: bars[state.hovered]?.index ?? 0, x: box.left + state.hovered * (box.right - box.left) / Math.max(1, bars.length - 1), y: box.top + 20 }; draw(); event.preventDefault(); } });
  root.querySelectorAll('[data-draw-tool]').forEach((button) => button.addEventListener('click', () => setTool(button.dataset.drawTool)));
  read('#terminalInstrument')?.addEventListener('change', (event) => selectInstrument(event.target.value));
  read('#terminalTimeframe')?.addEventListener('change', (event) => { state.timeframe = event.target.value; saveFrame(); });
  read('#terminalChartType')?.addEventListener('change', (event) => { state.chartType = event.target.value; draw(); });
  root.querySelectorAll('[data-indicator]').forEach((button) => button.addEventListener('click', () => { const id = button.dataset.indicator; if (['sma', 'ema'].includes(id)) { state.indicators.has(id) ? state.indicators.delete(id) : state.indicators.add(id); button.setAttribute('aria-pressed', String(state.indicators.has(id))); draw(); } }));
  read('#chartReset')?.addEventListener('click', () => { state.visibleCount = 72; state.offset = 0; state.replayIndex = null; state.anchor = null; stopReplay(); updateReplayControls(); draw(); });
  read('#clearDrawings')?.addEventListener('click', () => { state.drawings = []; state.anchor = null; saveDrawings(); draw(); });
  read('#replayStep')?.addEventListener('click', () => { stopReplay(); state.replayIndex = Math.min(state.bars.length - 1, (state.replayIndex ?? -1) + 1); updateReplayControls(); draw(); });
  read('#replayReset')?.addEventListener('click', () => { stopReplay(); state.replayIndex = 0; updateReplayControls(); draw(); });
  read('#replayPosition')?.addEventListener('input', (event) => { state.replayIndex = Number(event.target.value); updateReplayControls(); draw(); });
  read('#replaySpeed')?.addEventListener('change', (event) => { state.replaySpeed = Number(event.target.value); if (state.replayTimer) playReplay(); });
  read('#replayPlay')?.addEventListener('click', () => state.replayTimer ? stopReplay() : playReplay());
  read('#watchlistToggle')?.addEventListener('click', (event) => { const open = !root.querySelector('.terminal-workspace').classList.contains('watchlist-open'); root.querySelector('.terminal-workspace').classList.toggle('watchlist-open', open); event.currentTarget.setAttribute('aria-expanded', String(open)); });
  function stopReplay() { if (state.replayTimer) clearInterval(state.replayTimer); state.replayTimer = null; const button = read('#replayPlay'); if (button) button.textContent = '▶ Play'; }
  function playReplay() { stopReplay(); if (state.replayIndex == null || state.replayIndex >= state.bars.length - 1) state.replayIndex = 0; read('#replayPlay').textContent = 'Ⅱ Pause'; state.replayTimer = setInterval(() => { if (state.replayIndex >= state.bars.length - 1) { stopReplay(); return; } state.replayIndex += 1; updateReplayControls(); draw(); }, state.replaySpeed); }
  const resize = new ResizeObserver(draw); resize.observe(chartHost || canvas);
  setTool('crosshair'); saveFrame();
  return Object.freeze({ selectInstrument, setTool, draw, destroy() { state.destroyed = true; stopReplay(); resize.disconnect(); } });
}
