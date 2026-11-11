import { ASSETS, INITIAL_CASH_CENTS, calculatePortfolio, executeTrade, formatQuantity } from './frontend/game-engine/trading.mjs';
import {
  CHALLENGE_REWARD_XP, completeChallenge, completeLesson, createInitialDemoState,
  getLevel, getNextLevelProgress, getNextUtcDeadline, loadDemoState, saveDemoState,
} from './frontend/state/demo-state.mjs';
import { createApiClient } from './frontend/services/api-client.mjs';
import { beginInvestigation, getActiveDetectiveSession, inspectEvidence, selectDecision, selectKeyEvidence, startMission, submitDecision } from './frontend/game-engine/detective-engine.mjs';
import { renderDetective } from './frontend/components/detective/detective-ui.mjs';
import { answerChartQuestion, returnToChartBoard, reviewChartSession, selectChartPoint, startChartLesson } from './frontend/game-engine/chart-engine.mjs';
import { CHART_LESSONS } from './frontend/game-engine/chart-lessons.mjs';
import { renderChartAcademy } from './frontend/components/chart-academy/chart-academy-ui.mjs';
import { renderCurriculumTree } from './frontend/components/learning-tree/curriculum-map.mjs';
import { createPracticeTerminal } from './frontend/charts/practice-terminal.mjs';
import { formatSignedProfitLoss, getProfitLossStatus } from './frontend/ui/profit-loss.mjs';
import { createLearningV11 } from './frontend/learning/v1-1/learning-v11.mjs';

const money = (cents) => '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const byId = (id) => document.getElementById(id);
let storage;
try { storage = window.localStorage; } catch { storage = null; }
let state = loadDemoState(storage);
if (/\/marketcraft\/learn(?:\/index\.html|\/)?$/.test(window.location.pathname)) {
  state = { ...state, page: 'learn' };
}
let learningV11 = null;
let detectiveNotice = '';
const heroFrame = byId('heroFrame');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const apiBaseUrl = document.querySelector('meta[name="marketcraft-api-base-url"]')?.content || '/api';
export const api = createApiClient({ baseUrl: apiBaseUrl });

const pageLabels = {
  home: 'Overview', learn: 'Learning academy', markets: 'Demo exchange', arena: 'Strategy arena',
  crash: 'Crash protocol', detective: 'Market Detective', charts: 'Chart Learning Academy', risk: 'Risk management',
};
const navPageFor = { detective: 'learn', charts: 'learn', risk: 'learn' };

function persist() { saveDemoState(storage, state); }
function updateDetective(result) {
  if (!result.ok) { detectiveNotice = result.error; renderDetective(byId('detective'), state, handleDetectiveAction, detectiveNotice); return; }
  detectiveNotice = '';
  state = { ...result.state, page: 'detective' };
  persist();
  renderAll();
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('visible', view.id === 'detective'));
  document.querySelectorAll('[data-page]').forEach((button) => button.classList.toggle('active', button.dataset.page === 'learn'));
}
function handleDetectiveAction({ type, missionId, sessionId, evidenceId, decisionId } = {}) {
  if (type === 'missions') {
    detectiveNotice = '';
    state = { ...state, page: 'detective', detective: { ...state.detective, activeSessionId: null } };
    persist(); renderAll(); return;
  }
  if (type === 'review') {
    const session = state.detective.sessions[sessionId];
    if (!session || session.missionId !== missionId || session.phase !== 'result') { detectiveNotice = 'That saved result is not available.'; renderAll(); return; }
    detectiveNotice = ''; state = { ...state, page: 'detective', detective: { ...state.detective, activeSessionId: sessionId } }; persist(); renderAll(); return;
  }
  let result;
  if (type === 'start') result = startMission(state, missionId);
  else if (type === 'begin') result = beginInvestigation(state);
  else if (type === 'inspect') result = inspectEvidence(state, evidenceId);
  else if (type === 'select-evidence') result = selectKeyEvidence(state, evidenceId);
  else if (type === 'choose-decision') result = selectDecision(state, decisionId);
  else if (type === 'submit') result = submitDecision(state);
  if (result) updateDetective(result);
}
let chartNotice = '';
let practiceTerminal = null;
function updateChart(result, { focus = 'question', scrollToTop = false } = {}) {
  if (!result.ok) { chartNotice = result.error; renderChartAcademy(byId('charts'), state, handleChartAction); const message = document.createElement('p'); message.className = 'result'; message.setAttribute('role', 'alert'); message.textContent = chartNotice; byId('charts')?.prepend(message); return; }
  chartNotice = '';
  state = { ...result.state, page: 'charts' };
  persist();
  renderAll();
  const active = state.chartAcademy.sessions[state.chartAcademy.activeSessionId];
  requestAnimationFrame(() => {
    if (scrollToTop) window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    if (focus === 'title') byId('chartActiveTitle')?.focus();
    else if (active?.phase === 'result') byId('chartResultTitle')?.focus();
    else if (active?.selectedPointId) document.querySelector(`[data-chart-point="${active.selectedPointId}"]`)?.focus();
    else byId('chartQuestionTitle')?.focus();
  });
}
function handleChartAction({ type, lessonId, pointId, answerId, sessionId } = {}) {
  if (type === 'back') { go('learn'); return; }
  if (type === 'board') { updateChart({ ok: true, state: returnToChartBoard(state) }, { scrollToTop: true }); return; }
  let result;
  if (type === 'start' || type === 'replay') result = startChartLesson(state, lessonId);
  else if (type === 'select-point') result = selectChartPoint(state, pointId);
  else if (type === 'answer') result = answerChartQuestion(state, answerId);
  else if (type === 'review') result = reviewChartSession(state, sessionId);
  if (result) updateChart(result, { focus: ['start', 'replay', 'review'].includes(type) ? 'title' : 'question', scrollToTop: ['start', 'replay', 'review'].includes(type) });
}
function handleLearningTreeAction(activityRef) {
  if (!activityRef) return;
  if (activityRef.kind === 'chart-board') { go('charts'); return; }
  if (activityRef.kind === 'detective-board') { go('detective'); return; }
  if (activityRef.kind === 'chart-lesson') {
    updateChart(startChartLesson(state, activityRef.id), { focus: 'title', scrollToTop: true });
    return;
  }
  if (activityRef.kind === 'detective-mission') {
    const started = startMission(state, activityRef.id);
    if (!started.ok) { detectiveNotice = started.error; go('detective'); return; }
    const opened = beginInvestigation(started.state);
    updateDetective(opened.ok ? opened : started);
  }
}
function formatPercent(cents) {
  const percent = (cents / 1_000_000) * 100;
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
}
function syncHeroTheme() {
  if (!heroFrame) return;
  const motion = reducedMotion.matches || !state.motionEnabled ? 'off' : 'on';
  const target = new URL(heroFrame.getAttribute('src'), location.href).origin;
  heroFrame.contentWindow?.postMessage({ source: 'marketcraft-parent', theme: state.theme, motion }, target);
  const desired = `marketcraft-3d/index.html?embed=1&theme=${state.theme}&motion=${motion}`;
  if (heroFrame.getAttribute('src') !== desired) heroFrame.setAttribute('src', desired);
}
function syncLearningShell() {
  const fullScreenLearning = state.page === 'learn';
  byId('learn')?.classList.toggle('v11-fullscreen', fullScreenLearning);
  document.querySelector('.frame')?.classList.toggle('learning-v11-fullscreen', fullScreenLearning);
  document.documentElement.classList.toggle('learning-v11-fullscreen', fullScreenLearning);
  document.body.classList.toggle('learning-v11-fullscreen', fullScreenLearning);
}
function go(page) {
  if (!pageLabels[page]) return;
  if (page === 'learn') learningV11?.openHome();
  state = { ...state, page };
  syncLearningShell();
  if (page === 'learn') learningV11?.render();
  persist();
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('visible', view.id === page));
  const navPage = navPageFor[page] || page;
  document.querySelectorAll('[data-page]').forEach((button) => button.classList.toggle('active', button.dataset.page === navPage));
  const breadcrumb = byId('breadcrumb');
  if (breadcrumb) breadcrumb.textContent = pageLabels[page];
  if (page === 'detective') renderDetective(byId('detective'), state, handleDetectiveAction, detectiveNotice);
  if (page === 'charts') renderChartAcademy(byId('charts'), state, handleChartAction);
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
}
function renderJournal() {
  const journal = byId('journal');
  journal.replaceChildren();
  if (!state.journal.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 5;
    cell.className = 'muted';
    cell.textContent = 'No virtual trades yet';
    row.append(cell);
    journal.append(row);
    return;
  }
  for (const trade of state.journal) {
    const row = document.createElement('tr');
    const asset = ASSETS[trade.asset];
    const price = asset.unit.includes('index points') ? (trade.priceCents / 100).toFixed(2) + ' pts' : money(trade.priceCents);
    const values = [trade.side.toUpperCase(), asset.name, formatQuantity(trade.quantityUnits), price, money(trade.feeCents)];
    for (const value of values) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    }
    journal.append(row);
  }
}
function renderPortfolio() {
  const portfolio = calculatePortfolio(state);
  for (const [id, cents] of [['cash', portfolio.cashCents], ['holdings', portfolio.holdingsCents], ['equity', portfolio.equityCents], ['portfolioEquity', portfolio.equityCents]]) {
    const element = byId(id);
    if (element) element.textContent = money(cents);
  }
  const pnl = byId('portfolioReturn');
  if (pnl) {
    const amount = portfolio.totalProfitLossCents;
    const status = getProfitLossStatus(amount);
    const indicator = status === 'profit' ? '▲' : status === 'loss' ? '▼' : '•';
    pnl.classList.remove('profit', 'loss', 'neutral');
    pnl.classList.add('pnl-status', status);
    pnl.dataset.pnlStatus = status;
    pnl.textContent = indicator + ' ' + formatPercent(amount) + ' (' + formatSignedProfitLoss(amount) + ') total demo P/L';
    pnl.setAttribute('aria-label', (status === 'neutral' ? 'No profit or loss' : status === 'profit' ? 'Profit' : 'Loss') + ': ' + formatPercent(amount) + ', ' + formatSignedProfitLoss(amount) + ' total demo profit or loss');
  }
  document.querySelectorAll('[data-holding]').forEach((element) => {
    const asset = element.dataset.holding;
    const cents = Math.round((ASSETS[asset].priceCents * (state.positions[asset] || 0)) / 10_000);
    element.textContent = money(cents);
  });
  const cashLabel = byId('homeCash');
  if (cashLabel) cashLabel.textContent = money(portfolio.cashCents);
  renderJournal();
}
function renderProgress() {
  const level = getLevel(state.xp);
  const levelLabel = byId('playerLevel');
  if (levelLabel) levelLabel.textContent = `LV ${level}`;
  const rankLevel = byId('rankLevel');
  if (rankLevel) rankLevel.textContent = `Level ${level}`;
  const xpLabel = byId('playerXp');
  if (xpLabel) xpLabel.textContent = `${state.xp} XP`;
  const progressPercent = (getNextLevelProgress(state.xp) / 500) * 100;
  const xpProgress = byId('xpProgress');
  if (xpProgress) xpProgress.style.width = `${progressPercent}%`;
  const xpMeterLabel = byId('xpProgressLabel');
  if (xpMeterLabel) xpMeterLabel.textContent = `${getNextLevelProgress(state.xp)} / 500 XP`;
  const completedChartLessons = CHART_LESSONS.filter((lesson) => (state.chartAcademy?.lessons?.[lesson.id]?.completionCount || 0) > 0).length;
  const completeCount = (state.completedLessons['market-foundations'] ? 1 : 0) + completedChartLessons / CHART_LESSONS.length + (state.completedLessons['risk-management'] ? 1 : 0);
  const coursePercent = Math.round((completeCount / 3) * 100);
  const courseProgress = byId('courseProgress');
  const courseProgressLabel = byId('courseProgressLabel');
  if (courseProgress) courseProgress.style.width = `${coursePercent}%`;
  if (courseProgressLabel) courseProgressLabel.textContent = `${coursePercent}% Complete`;
  document.querySelectorAll('[data-course-progress]').forEach((element) => {
    if (element.dataset.courseProgress === 'chart-literacy') element.textContent = completedChartLessons === CHART_LESSONS.length ? '✓ Complete' : completedChartLessons ? `${completedChartLessons}/${CHART_LESSONS.length} lessons` : 'Not started';
    else element.textContent = state.completedLessons[element.dataset.courseProgress] ? '✓ Complete' : 'Not started';
  });
  document.querySelectorAll('[data-course-meter]').forEach((element) => {
    element.style.width = element.dataset.courseMeter === 'chart-literacy' ? `${Math.round(completedChartLessons / CHART_LESSONS.length * 100)}%` : state.completedLessons[element.dataset.courseMeter] ? '100%' : '0%';
  });
  const crashReward = byId('crashReward');
  if (crashReward) crashReward.textContent = state.completedChallenges['crash-protocol'] ? '✓ Completed' : `✦ +${CHALLENGE_REWARD_XP} XP`;
  const deadline = getNextUtcDeadline();
  const timer = byId('challengeCountdown');
  if (timer) {
    const remaining = Math.max(0, deadline - Date.now());
    const hours = Math.floor(remaining / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    timer.textContent = `◷ Ends in ${hours}h ${String(minutes).padStart(2, '0')}m`;
  }
}
function renderAll() {
  document.body.dataset.theme = state.theme;
  const themeToggle = byId('themeToggle');
  if (themeToggle) themeToggle.textContent = state.theme === 'dark' ? '☀ Light mode' : '☾ Dark mode';
  document.querySelectorAll('[data-asset]').forEach((button) => button.classList.toggle('selected', button.dataset.asset === state.asset));
  updateMarket();
  renderPortfolio();
  renderProgress();
  renderDetective(byId('detective'), state, handleDetectiveAction, detectiveNotice);
  renderChartAcademy(byId('charts'), state, handleChartAction);
  renderCurriculumTree(byId('curriculumMap'), state, {
    state: () => state,
    openLesson: (lessonId) => updateChart(startChartLesson(state, lessonId), { focus: 'title', scrollToTop: true }),
    openTerminal: ({ instrumentId, tool }) => { go('markets'); practiceTerminal?.selectInstrument(instrumentId); practiceTerminal?.setTool(tool); },
  });
  learningV11?.render();
  syncLearningShell();
  practiceTerminal?.draw();
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('visible', view.id === state.page));
  const navPage = navPageFor[state.page] || state.page;
  document.querySelectorAll('[data-page]').forEach((button) => button.classList.toggle('active', button.dataset.page === navPage));
  const breadcrumb = byId('breadcrumb');
  if (breadcrumb) breadcrumb.textContent = pageLabels[state.page] || pageLabels.home;
}
function updateMarket() {
  const price = byId('assetPrice');
  if (price) price.textContent = ASSETS[state.asset].unit.includes('index points') ? (ASSETS[state.asset].priceCents / 100).toFixed(2) + ' pts' : money(ASSETS[state.asset].priceCents);
  const instrumentSelect = byId('terminalInstrument');
  if (instrumentSelect) instrumentSelect.value = state.asset;
}
function trade(side) {
  const result = executeTrade(state, side, state.asset, byId('qty')?.value);
  const feedback = byId('tradeFeedback');
  if (!result.ok) {
    feedback.textContent = result.error;
    feedback.setAttribute('role', 'alert');
    return;
  }
  state = result.state;
  persist();
  feedback.textContent = `Virtual ${side} executed at example quote ${money(result.trade.priceCents)}. Example fee: ${money(result.trade.feeCents)}. No real order was placed.`;
  feedback.setAttribute('role', 'status');
  renderPortfolio();
  renderProgress();
}
function completeCorrectLesson(lessonId) {
  const previousXp = state.xp;
  state = completeLesson(state, lessonId);
  persist();
  renderProgress();
  return state.xp > previousXp;
}

for (const button of document.querySelectorAll('[data-page],[data-go]')) {
  button.addEventListener('click', () => go(button.dataset.page || button.dataset.go));
}
for (const button of document.querySelectorAll('[data-activity]')) {
  button.addEventListener('click', () => go(button.dataset.activity));
}
heroFrame?.addEventListener('load', syncHeroTheme);
window.addEventListener('pointermove', (event) => {
  if (reducedMotion.matches || !state.motionEnabled) return;
  const origin = new URL(heroFrame?.getAttribute('src') || location.href, location.href).origin;
  heroFrame?.contentWindow?.postMessage({ source: 'marketcraft-parent', pointer: [(event.clientX / innerWidth - 0.5) * 2, (event.clientY / innerHeight - 0.5) * 2] }, origin);
}, { passive: true });
let scrollFrame = 0;
window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    const progress = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const origin = new URL(heroFrame?.getAttribute('src') || location.href, location.href).origin;
    heroFrame?.contentWindow?.postMessage({ source: 'marketcraft-parent', scroll: progress }, origin);
  });
}, { passive: true });
reducedMotion.addEventListener?.('change', syncHeroTheme);
byId('brandHome')?.addEventListener('click', (event) => { event.preventDefault(); go('home'); });
byId('themeToggle')?.addEventListener('click', () => {
  state = { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
  persist();
  renderAll();
  syncHeroTheme();
});
byId('startLesson')?.addEventListener('click', () => {
  byId('lessonDetail').style.display = 'block';
  byId('lessonDetail').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
});
for (const button of document.querySelectorAll('[data-answer]')) {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-answer]').forEach((choice) => choice.classList.remove('selected'));
    button.classList.add('selected');
    const correct = button.dataset.answer === '1';
    const rewarded = correct && completeCorrectLesson(button.dataset.lessonId || 'market-foundations');
    const feedback = byId('lessonFeedback');
    feedback.style.display = 'block';
    feedback.innerHTML = correct
      ? `<strong>Correct.</strong> Shares represent ownership. Their market value can change, and returns are not guaranteed.${rewarded ? ' +50 XP earned.' : state.completedLessons['market-foundations'] ? ' This one-time lesson reward was already earned.' : ''}`
      : '<strong>Try again.</strong> Share ownership is not a guarantee of future returns. Review the definition, then choose the most accurate statement.';
  });
}
for (const button of document.querySelectorAll('[data-asset]')) {
  button.addEventListener('click', () => {
    state = { ...state, asset: button.dataset.asset };
    persist();
    updateMarket();
  });
}
byId('buy')?.addEventListener('click', () => trade('buy'));
byId('sell')?.addEventListener('click', () => trade('sell'));
byId('reset')?.addEventListener('click', () => {
  state = createInitialDemoState(state.theme);
  persist();
  renderAll();
  byId('tradeFeedback').textContent = 'Demo reset to $10,000.00 virtual cash. Trade and progress history cleared.';
  byId('tradeFeedback').setAttribute('role', 'status');
});
for (const button of document.querySelectorAll('[data-arena]')) {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-arena]').forEach((choice) => choice.classList.remove('selected'));
    button.classList.add('selected');
    const feedback = byId('arenaFeedback');
    feedback.style.display = 'block';
    feedback.innerHTML = button.dataset.arena === '1'
      ? '<strong>Strong decision.</strong> Past price movement and a confident claim do not establish future returns. Inspect valuation, evidence, and downside.'
      : '<strong>Consider the evidence.</strong> Investigate the business, valuation, and risk before choosing a trade.';
  });
}
for (const button of document.querySelectorAll('[data-plan]')) {
  button.addEventListener('click', () => {
    state = { ...state, plan: button.dataset.plan };
    persist();
    document.querySelectorAll('[data-plan]').forEach((choice) => choice.classList.toggle('selected', choice === button));
    byId('crashFeedback').textContent = 'Allocation selected. Commit your choice to reveal the simulated market shock.';
  });
}
byId('reveal')?.addEventListener('click', () => {
  const plans = { growth: [0.6, 0.2, 0.2], balanced: [0.3, 0.3, 0.4], defensive: [0, 0, 1] };
  const [technology, gold] = plans[state.plan];
  const endCents = Math.round(INITIAL_CASH_CENTS * (1 + technology * -0.25 + gold * 0.05));
  const rewarded = !state.completedChallenges['crash-protocol'];
  state = completeChallenge(state, 'crash-protocol');
  persist();
  renderProgress();
  byId('crashFeedback').innerHTML = `<strong>Simulated market shock revealed.</strong><br>Technology −25%; gold +5%; cash unchanged.<br><br><strong>Final virtual value: ${money(endCents)} (${((endCents / INITIAL_CASH_CENTS - 1) * 100).toFixed(1)}%).</strong>${rewarded ? ` <br>+${CHALLENGE_REWARD_XP} XP earned.` : ' <br>Challenge reward already earned.'}<br><br>One outcome cannot prove a strategy is universally best.`;
});

practiceTerminal = createPracticeTerminal(byId('practiceTerminal'), {
  initialInstrument: state.asset,
  onInstrumentChange(instrument) {
    if (state.asset === instrument.id) return;
    state = { ...state, asset: instrument.id };
    persist();
    updateMarket();
    renderPortfolio();
  },
});
learningV11 = createLearningV11(byId('learningV11Container'), {
  getState: () => state, storage,
  onOpenChart: () => go('charts'),
  onOpenDetective: () => go('detective'),
  onOpenTerminal: () => go('markets'),
});
renderAll();
syncHeroTheme();
setInterval(renderProgress, 30_000);
