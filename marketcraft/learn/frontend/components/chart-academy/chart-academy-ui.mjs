import { buildCandleGeometry, buildLineGeometry, getPriceDomain, priceY } from '../../game-engine/chart-geometry.mjs';
import { CHART_LESSONS } from '../../game-engine/chart-lessons.mjs';

const html = (tag, className = '', text = '') => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};
const svgNode = (tag, attributes = {}) => {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
  return node;
};
const action = (label, cls, type, onAction, data = {}) => {
  const button = html('button', cls, label);
  button.type = 'button'; button.dataset.chartAction = type; Object.assign(button.dataset, data);
  button.addEventListener('click', () => onAction({ type, ...data }));
  return button;
};

function chartView(lesson, chart, session, onAction) {
  const shell = html('section', 'chart-workspace chart-panel');
  shell.setAttribute('aria-label', `${chart.title}, educational simulation`);
  const heading = html('div', 'chart-panel-heading');
  heading.append(html('div', 'eyebrow', 'EDUCATIONAL SIMULATION'), html('h2', '', chart.title), html('span', 'chart-synthetic-tag', 'FICTIONAL DATA'));
  shell.append(heading);
  const plot = html('div', 'chart-plot'); plot.setAttribute('role', 'group');
  plot.setAttribute('aria-label', `${chart.title}. Select an accessible chart point or use the data controls below.`);
  const svg = svgNode('svg', { viewBox: '0 0 640 280', preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' });
  const grid = svgNode('g', { class: 'chart-grid' });
  for (const y of [50, 100, 150, 200, 250]) grid.append(svgNode('line', { x1: 28, y1: y, x2: 625, y2: y }));
  svg.append(grid);
  const pointPositions = [];
  if (chart.type === 'candlestick') {
    const candles = buildCandleGeometry(chart.candles, 640, 280, 30) || [];
    const domain = getPriceDomain(chart);
    for (let tick = 0; tick <= 4; tick += 1) { const value = domain.max - (domain.max - domain.min) * tick / 4; const y = priceY(value, domain, 280, 30); const label = svgNode('text', { x: 4, y: y + 4, class: 'chart-axis-label' }); label.textContent = value.toFixed(0); svg.append(label); }
    for (const item of candles) {
      const color = item.direction === 'bullish' ? 'var(--chart-up)' : item.direction === 'bearish' ? 'var(--chart-down)' : 'var(--accent)';
      svg.append(svgNode('line', { x1: item.x, y1: item.highY, x2: item.x, y2: item.lowY, stroke: color, 'stroke-width': 3 }));
      svg.append(svgNode('rect', { x: item.x - item.bodyWidth / 2, y: item.top, width: item.bodyWidth, height: item.bodyHeight, rx: 2, fill: color }));
      pointPositions.push({ id: item.id, label: `Candle ${item.id.slice(-1)}: open ${item.open}, high ${item.high}, low ${item.low}, close ${item.close}`, x: item.x / 640 * 100, y: ((item.openY + item.closeY) / 2) / 280 * 100, item });
    }
  } else {
    const points = buildLineGeometry(chart.points, 640, 280, 30) || [];
    const domain = getPriceDomain(chart);
    for (let tick = 0; tick <= 4; tick += 1) { const value = domain.max - (domain.max - domain.min) * tick / 4; const y = priceY(value, domain, 280, 30); const label = svgNode('text', { x: 4, y: y + 4, class: 'chart-axis-label' }); label.textContent = value.toFixed(0); svg.append(label); }
    if (Number.isFinite(chart.support)) svg.append(svgNode('line', { x1: 30, y1: priceY(chart.support, domain, 280, 30), x2: 620, y2: priceY(chart.support, domain, 280, 30), class: 'chart-level chart-support' }));
    if (Number.isFinite(chart.resistance)) svg.append(svgNode('line', { x1: 30, y1: priceY(chart.resistance, domain, 280, 30), x2: 620, y2: priceY(chart.resistance, domain, 280, 30), class: 'chart-level chart-resistance' }));
    svg.append(svgNode('polyline', { points: points.map((item) => `${item.x},${item.y}`).join(' '), class: 'chart-line' }));
    for (const item of points) pointPositions.push({ id: item.id, label: `${item.id.toUpperCase()}: fictional price ${item.value}`, x: item.x / 640 * 100, y: item.y / 280 * 100, item });
  }
  plot.append(svg);
  for (const item of pointPositions) {
    const button = html('button', `chart-point${session.selectedPointId === item.id ? ' selected' : ''}`, ''); button.type = 'button'; button.dataset.chartPoint = item.id; button.style.left = `${item.x}%`; button.style.top = `${item.y}%`;
    button.setAttribute('aria-label', item.label); button.title = item.label; button.setAttribute('aria-pressed', String(session.selectedPointId === item.id));
    button.addEventListener('click', () => onAction({ type: 'select-point', pointId: item.id })); plot.append(button);
  }
  shell.append(plot);
  const legend = html('div', 'chart-legend');
  if (chart.type === 'candlestick') legend.append(html('span', '', '● Bullish close'), html('span', '', '● Bearish close'), html('span', '', 'Wick = interval high/low'));
  else legend.append(html('span', '', '● Fictional price sequence'));
  if (Number.isFinite(chart.support)) legend.append(html('span', 'support-key', '— Possible support zone'));
  if (Number.isFinite(chart.resistance)) legend.append(html('span', 'resistance-key', '— Possible resistance zone'));
  shell.append(legend, html('p', 'chart-disclaimer', 'Illustrative educational data only — not live prices or a trading recommendation.'));
  const controls = html('details', 'chart-data-controls'); controls.append(html('summary', '', chart.type === 'candlestick' ? 'Accessible candle data' : 'Accessible chart data'));
  const list = html('div', 'chart-data-list');
  for (const item of pointPositions) { const button = action(item.label, `secondary chart-data-button${session.selectedPointId === item.id ? ' selected' : ''}`, 'select-point', onAction, { pointId: item.id }); button.title = item.label; button.setAttribute('aria-pressed', String(session.selectedPointId === item.id)); list.append(button); }
  controls.append(list); shell.append(controls);
  const selected = pointPositions.find((item) => item.id === session.selectedPointId); const inspection = html('div', 'chart-inspection');
  if (selected?.item.open !== undefined) {
    inspection.setAttribute('aria-live', 'polite'); inspection.append(html('strong', '', 'Selected candle OHLC')); const dl = html('dl', 'ohlc-values');
    for (const [label, value] of [['Open', selected.item.open], ['High', selected.item.high], ['Low', selected.item.low], ['Close', selected.item.close]]) dl.append(html('dt', '', label), html('dd', '', String(value)));
    inspection.append(dl);
  } else if (selected) { inspection.setAttribute('aria-live', 'polite'); inspection.append(html('strong', '', `Selected point · ${selected.item.value}`)); }
  else inspection.append(html('span', 'muted', lesson.questions[session.answers.length]?.requiredPointId ? 'Select the relevant chart point to answer this question.' : 'Tap any chart point to inspect its fictional value.'));
  shell.append(inspection); return shell;
}

function renderBoard(root, state, onAction) {
  const header = html('div', 'chart-academy-heading');
  header.append(html('div', 'eyebrow', 'CHART LEARNING ACADEMY'), html('h1', '', 'Read the chart. Question the signal.'), html('p', '', 'Explore fictional chart data, answer practical questions and learn why patterns describe possibilities rather than guarantees.'));
  root.append(header); const board = html('div', 'chart-lesson-board');
  for (const lesson of CHART_LESSONS) {
    const stats = state.chartAcademy.lessons[lesson.id] || { completionCount: 0, bestScore: 0, rewardClaimed: false, latestSessionId: null }; const card = html('article', 'chart-lesson-card chart-panel');
    const top = html('div', 'chart-lesson-card-top'); top.append(html('span', 'chart-lesson-number', `LESSON 0${CHART_LESSONS.indexOf(lesson) + 1}`), html('span', 'chart-difficulty', lesson.difficulty));
    card.append(top, html('h2', '', lesson.title), html('p', '', lesson.summary)); const goals = html('ul', 'chart-objectives'); for (const goal of lesson.objectives) goals.append(html('li', '', goal)); card.append(goals);
    const progress = html('div', 'chart-lesson-progress'); const bar = html('div', 'chart-progress-track'); const saved = state.chartAcademy.sessions[stats.latestSessionId]; const fill = html('i');
    fill.style.width = stats.completionCount ? '100%' : saved?.answers.length ? `${Math.round(saved.answers.length / lesson.questions.length * 100)}%` : '0%'; bar.append(fill);
    progress.append(bar, html('small', '', stats.completionCount ? `Best score ${stats.bestScore}% · ${stats.completionCount} completion${stats.completionCount === 1 ? '' : 's'}` : saved?.answers.length ? `In progress · ${saved.answers.length}/${lesson.questions.length} questions` : 'Not completed yet')); card.append(progress);
    const actions = html('div', 'chart-card-actions'); actions.append(action(saved?.phase === 'playing' ? 'Continue lesson' : stats.completionCount ? 'Replay lesson' : 'Start lesson', 'primary', 'start', onAction, { lessonId: lesson.id }));
    if (stats.latestSessionId && saved?.phase === 'result') actions.append(action('Review result', 'secondary', 'review', onAction, { sessionId: stats.latestSessionId }));
    card.append(actions); board.append(card);
  }
  root.append(board, action('Back to learning', 'secondary chart-back', 'back', onAction));
}

function renderLesson(root, lesson, session, stats, onAction) {
  const top = html('div', 'chart-lesson-workspace-header'); top.append(action('← Lesson board', 'secondary', 'board', onAction), html('span', 'chart-difficulty', lesson.difficulty));
  const title = html('h1', 'chart-active-title', lesson.title); title.id = 'chartActiveTitle'; title.tabIndex = -1;
  root.append(top, title);
  if (session.phase === 'result') {
    const result = html('section', 'chart-panel chart-result-panel'); result.setAttribute('aria-labelledby', 'chartResultTitle');
    result.append(html('div', 'eyebrow', 'LESSON COMPLETE'));
    const resultHeading = html('h2', '', 'Your chart reading'); resultHeading.id = 'chartResultTitle'; resultHeading.tabIndex = -1;
    result.append(resultHeading, html('div', 'chart-result-score', `${session.score}%`), html('p', 'chart-result-subtitle', `Best score ${stats.bestScore}% · ${stats.completionCount} completion${stats.completionCount === 1 ? '' : 's'}`));
    result.append(html('p', 'chart-xp-feedback', session.rewardEarned ? `+${lesson.rewardXp} XP earned` : stats.rewardClaimed ? 'One-time XP reward already earned' : 'No XP awarded on this replay'));
    const feedback = html('div', 'chart-answer-review');
    for (let index = 0; index < lesson.questions.length; index += 1) {
      const item = lesson.questions[index]; const answer = session.answers[index]; const correct = answer.answerId === item.correctAnswerId && (!item.requiredPointId || answer.pointId === item.requiredPointId);
      const row = html('article', `chart-answer-review-item ${correct ? 'correct' : 'incorrect'}`); row.append(html('h3', '', `${correct ? '✓' : '↻'} ${item.prompt}`));
      row.append(html('p', '', correct ? 'Your reading matches the lesson key.' : `Review: ${item.options.find((option) => option.id === item.correctAnswerId)?.label || ''}`), html('p', '', item.explanation)); feedback.append(row);
    }
    result.append(feedback, html('p', 'chart-disclaimer', 'A chart pattern summarizes past data; it cannot guarantee future prices or outcomes. No real trade was made.'));
    const actions = html('div', 'chart-card-actions chart-result-actions'); actions.append(action('Replay lesson', 'primary', 'replay', onAction, { lessonId: lesson.id }), action('Return to academy', 'secondary', 'board', onAction)); result.append(actions); root.append(result); return;
  }
  const current = lesson.questions[session.answers.length]; root.append(chartView(lesson, lesson.charts[current.chartId], session, onAction));
  const quiz = html('section', 'chart-panel chart-question'); quiz.setAttribute('aria-label', `Question ${session.answers.length + 1} of ${lesson.questions.length}`);
  quiz.append(html('div', 'eyebrow', `QUESTION ${session.answers.length + 1} OF ${lesson.questions.length}`));
  const questionHeading = html('h2', '', current.prompt); questionHeading.id = 'chartQuestionTitle'; questionHeading.tabIndex = -1; quiz.append(questionHeading);
  quiz.append(html('p', 'chart-question-hint', current.requiredPointId ? session.selectedPointId ? `Selected ${session.selectedPointId}. Now choose your answer.` : 'Select a relevant chart point or candle, then choose your answer.' : 'Select an answer. The explanation will appear after you check it.'));
  const options = html('div', 'chart-answer-options');
  for (const option of current.options) { const button = action(option.label, 'choice chart-answer-option', 'answer', onAction, { answerId: option.id }); if (current.requiredPointId && !session.selectedPointId) button.disabled = true; options.append(button); }
  quiz.append(options); const live = html('p', 'chart-live-feedback'); live.setAttribute('aria-live', 'polite'); quiz.append(live); root.append(quiz);
}

export function renderChartAcademy(root, state, onAction) {
  if (!root) return; root.replaceChildren();
  const session = state.chartAcademy.sessions[state.chartAcademy.activeSessionId]; const lesson = CHART_LESSONS.find((item) => item.id === session?.lessonId);
  if (!session || !lesson) renderBoard(root, state, onAction);
  else renderLesson(root, lesson, session, state.chartAcademy.lessons[lesson.id] || { completionCount: 0, bestScore: 0, rewardClaimed: false }, onAction);
}
