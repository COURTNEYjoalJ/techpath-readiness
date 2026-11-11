import { CURRICULUM_BRANCHES, CURRICULUM_MODULES } from '../../curriculum/curriculum-data.mjs';
import { CANDLESTICK_MODULE } from '../content/module-03-candlesticks.mjs';
import { CANDLE_SCENARIOS } from '../scenarios/candlestick-scenarios.mjs';
import { evaluateScenarioDecision } from '../scenario-engine.mjs';
import { loadLearningPreferences, saveLearningPreferences } from '../shared/learning-preferences.mjs';
import { getTopicProgress, loadLearningProgress, updateTopicProgress } from '../progress-service.mjs';
import { renderLessonStage } from './lesson-stage.mjs';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const STAGES = Object.freeze(['understand', 'observe', 'decide', 'consequence', 'learn']);
const FULL_SCREEN_MODULES = Object.freeze([CANDLESTICK_MODULE]);
const scenarioFor = (topic) => CANDLE_SCENARIOS.find((scenario) => scenario.id === topic.scenarioId);
const getTopic = (module, id) => module.subtopics.find((topic) => topic.id === id) || module.subtopics[0];
const isComplete = (topic, progress) => Boolean(progress.topics?.[topic.id]?.completed);

export function getLearningV11Summary(state, preferences = {}, progress = loadLearningProgress()) {
  const module = FULL_SCREEN_MODULES.find((item) => item.id === preferences.moduleId) || CANDLESTICK_MODULE;
  const completedTopics = module.subtopics.filter((topic) => isComplete(topic, progress)).length;
  const currentTopic = getTopic(module, preferences.subtopicId) || module.subtopics.find((topic) => !isComplete(topic, progress)) || module.subtopics[0];
  const existingChartAcademyComplete = Boolean(state?.chartAcademy?.lessons?.candlesticks?.completionCount > 0);
  return Object.freeze({
    moduleCount: CURRICULUM_MODULES.length,
    implementedModuleCount: FULL_SCREEN_MODULES.length,
    currentModule: module,
    currentTopic,
    subtopicCount: module.subtopics.length,
    completedSubtopics: completedTopics,
    inProgressSubtopics: module.subtopics.filter((topic) => progress.topics?.[topic.id]?.visits && !progress.topics?.[topic.id]?.completed).length,
    percent: module.subtopics.length ? Math.round(completedTopics / module.subtopics.length * 100) : 0,
    moduleComplete: completedTopics === module.subtopics.length,
    existingChartAcademyComplete,
  });
}

export function createLearningV11(root, { getState, storage, onOpenChart, onOpenDetective, onOpenTerminal }) {
  let preferences = loadLearningPreferences(storage);
  let expandedBranch = null;
  let expandedLevel = null;
  let expandedModule = null;
  let selectedCandleId = null;
  let pendingDecision = null;

  const progress = () => loadLearningProgress(storage);
  const preference = (patch) => { preferences = { ...preferences, ...patch }; saveLearningPreferences(storage, patch); };
  const route = (view) => { preference({ view }); };
  const escapeLesson = (error) => `<div class="learn-v11-error" role="alert"><h2>Learning V1.1 could not be displayed.</h2><p>${esc(error?.message || 'A display error occurred.')}</p><button type="button" class="secondary" data-v11="fallback">Return to Learning V1</button></div>`;

  const renderHome = () => {
    const summary = getLearningV11Summary(getState(), preferences, progress());
    const topicProgress = getTopicProgress(progress(), summary.currentTopic.id);
    const branchName = CURRICULUM_BRANCHES.find((branch) => branch.id === summary.currentModule.branchId)?.title || 'Chart Analysis';
    return `<section class="learn-v11-home-screen"><header class="learn-v11-home-heading"><div><span class="learn-v11-kicker">MARKETCRAFT LEARNING · V1.1</span><h1>Master the market. One decision at a time.</h1><p>Learn one idea, inspect fictional data, make a decision, then review the reasoning.</p></div><div class="learn-v11-coverage"><strong>${summary.implementedModuleCount}<small> / ${summary.moduleCount}</small></strong><span>interactive modules authored</span><small>${summary.subtopicCount} topics in Module 03 · ${summary.completedSubtopics} completed</small></div></header><article class="learn-v11-continue-card"><div><span class="learn-v11-kicker">${summary.inProgressSubtopics ? 'RESUME YOUR LAST TOPIC' : summary.moduleComplete ? 'MODULE COMPLETE · REVISIT ANY TOPIC' : 'YOUR NEXT VERIFIED LESSON'}</span><h2>${esc(summary.currentTopic.title)}</h2><p>${esc(branchName)} · Module 03 · ${topicProgress.status.replaceAll('-', ' ')}${preferences.stage && preferences.view === 'stage' ? ` · Last step: ${esc(preferences.stage)}` : ''}</p><div class="learn-v11-progress"><i style="width:${summary.percent}%"></i></div><small>${summary.completedSubtopics} of ${summary.subtopicCount} candlestick topics completed · ${summary.percent}%</small></div><button type="button" class="primary" data-v11="continue">${summary.inProgressSubtopics ? 'Resume lesson' : 'Start lesson'} →</button></article><div class="learn-v11-home-lower"><section class="learn-v11-path-preview"><div class="learn-v11-section-title"><div><span class="learn-v11-kicker">LEARNING PATHS</span><h2>Choose a branch</h2></div><button type="button" class="secondary" data-v11="tree">Open full curriculum →</button></div><div class="learn-v11-path-row">${CURRICULUM_BRANCHES.map((branch, index) => `<button type="button" class="learn-v11-path-chip" data-v11-branch="${branch.id}"><span>0${index + 1}</span><strong>${esc(branch.title)}</strong><small>${index === 0 ? 'Module 03 interactive · more in development' : 'Syllabus mapped · lesson content in development'}</small></button>`).join('')}</div></section><aside class="learn-v11-home-quick"><span class="learn-v11-kicker">OPTIONAL PRACTICE</span><button type="button" data-v11="charts">Chart Academy <span>Existing lesson and reward system</span></button><button type="button" data-v11="detective">Market Detective <span>Existing evidence scenarios</span></button><button type="button" data-v11="terminal">Practice Terminal <span>Separate simulated portfolio</span></button></aside></div><p class="learn-v11-home-note">Only authored interactive topics are available here. Your Chart Academy and Market Detective history, XP and portfolio remain in their existing shared app state.</p></section>`;
  };

  const renderTree = () => {
    const appState = getState();
    const pr = progress();
    const branchCards = CURRICULUM_BRANCHES.map((branch) => {
      const branchOpen = expandedBranch === branch.id;
      const levels = branch.levels.map((level) => {
        const levelKey = `${branch.id}|${level}`;
        const levelOpen = expandedLevel === levelKey;
        const modules = CURRICULUM_MODULES.filter((module) => module.branch === branch.id && (module.level === level || module.splitLevel === level));
        return `<section class="learn-v11-tree-level"><button type="button" class="learn-v11-tree-level-button" data-v11-level="${esc(levelKey)}" aria-expanded="${levelOpen}">${esc(level)}<span>${modules.length} mapped modules</span></button>${levelOpen ? `<div class="learn-v11-tree-modules">${modules.map((module) => {
          const playable = module.id === CANDLESTICK_MODULE.id;
          const moduleOpen = expandedModule === module.id;
          const done = playable && CANDLESTICK_MODULE.subtopics.every((topic) => isComplete(topic, pr));
          return `<article class="learn-v11-tree-module ${playable ? 'is-ready' : 'is-dev'}"><button type="button" class="learn-v11-tree-module-button" data-v11-module="${module.id}" aria-expanded="${playable && moduleOpen}" ${playable ? '' : 'aria-disabled="true"'}><span class="learn-v11-module-num">M${String(module.number).padStart(2, '0')}</span><span><strong>${esc(module.title)}</strong><small>${playable ? `${done ? 'Completed · revisit topics' : 'Interactive lesson'} · ${CANDLESTICK_MODULE.subtopics.length} subtopics` : 'In Development · content and scenarios not yet authored'}</small></span><span>${playable ? '⌄' : '·'}</span></button>${playable && moduleOpen ? `<div class="learn-v11-tree-subtopics">${CANDLESTICK_MODULE.subtopics.map((topic) => { const status = getTopicProgress(pr, topic.id); return `<button type="button" data-v11-open-topic="${topic.id}"><span>${status.completed ? '✓' : status.visits ? '◐' : '○'}</span><strong>${esc(topic.title)}</strong><small>${status.completed ? (status.visits > 1 ? 'Revisited' : status.demonstratedUnderstanding ? 'Demonstrated understanding' : 'Completed') : status.visits ? 'In progress' : 'Not started'}</small></button>`; }).join('')}</div>` : ''}</article>`;
        }).join('')}</div>` : ''}</section>`;
      }).join('');
      const devCount = branch.id === 'chart-analysis' ? branchCardsCount(branch) : branchCardsCount(branch);
      return `<article class="learn-v11-tree-branch ${branchOpen ? 'is-open' : ''}"><button type="button" class="learn-v11-tree-branch-button" data-v11-branch="${branch.id}" aria-expanded="${branchOpen}"><span><strong>${esc(branch.title)}</strong><small>${devCount} modules · ${(branch.id === 'chart-analysis' ? 'Candlesticks, price behaviour and market structure' : branch.id === 'technical-analysis' ? 'Trends, indicators, momentum and volatility' : 'Economics, company fundamentals and valuation')}</small></span><b>${branchOpen ? '−' : '+'}</b></button>${branchOpen ? `<div class="learn-v11-tree-levels">${levels}</div>` : ''}</article>`;
    }).join('');
    const integrated = CURRICULUM_MODULES.find((module) => module.number === 24);
    return `<section class="learn-v11-tree-screen"><header class="learn-v11-tree-header"><div><button type="button" class="secondary" data-v11="home">← Learning home</button><span class="learn-v11-kicker">CURRICULUM MAP · 24 NUMBERED MODULES</span><h1>Choose a path</h1><p>Follow a branch from its learning levels to the available interactive lesson.</p></div><div class="learn-v11-map-stat"><strong>1 / 24</strong><span>interactive modules authored</span></div></header><div class="learn-v11-tree-root">START LEARNING<span>Three analysis branches</span></div><div class="learn-v11-tree-branches">${branchCards}</div><aside class="learn-v11-integrated-note"><strong>M24 · Integrated Master Practical Project</strong><span>Reserved for an optional read-only analysis overview. It will not be a required project. Overview content remains In Development.</span></aside><p class="learn-v11-tree-foot">Existing Chart Academy and Market Detective remain available under Optional Practice; they retain their own current completion and reward rules.</p></section>`;
  };

  function branchCardsCount(branch) { return CURRICULUM_MODULES.filter((module) => module.branch === branch.id).length; }

  const getActive = () => {
    const topic = getTopic(CANDLESTICK_MODULE, preferences.subtopicId);
    return { topic, scenario: scenarioFor(topic), progress: progress() };
  };

  const renderCompletion = () => {
    const summary = getLearningV11Summary(getState(), preferences, progress());
    return '<section class="learn-v11-module-completion"><div class="learn-v11-completion-mark" aria-hidden="true">✓</div><span class="learn-v11-kicker">MODULE 03 · CANDLESTICK FUNDAMENTALS</span><h1 tabindex="-1">Module complete</h1><p>You reviewed all ' + summary.subtopicCount + ' candlestick topics. Your learning record is saved in this browser.</p><div class="learn-v11-completion-stats"><strong>' + summary.subtopicCount + ' / ' + summary.subtopicCount + '<small> topics completed</small></strong><span>Decision quality reflects evidence and risk awareness, not simulated profit.</span></div><button type="button" class="primary" data-v11="completion-tree">Return to learning path →</button></section>';
  };

  const renderStage = () => {
    const { topic, scenario, progress: currentProgress } = getActive();
    if (!scenario) throw new Error(`No verified scenario for ${topic.title}.`);
    const stage = STAGES.includes(preferences.stage) ? preferences.stage : 'understand';
    const entry = currentProgress.topics[topic.id] || {};
    let decision = null;
    if (stage === 'consequence' || stage === 'learn') {
      decision = evaluateScenarioDecision(scenario, entry.selectedOptionId);
      if (!decision.ok) preference({ stage: 'decide' });
    }
    return renderLessonStage({ module: CANDLESTICK_MODULE, topic, stage: decision?.ok ? stage : preferences.stage, progress: currentProgress, scenario, decision: decision?.ok ? decision : null, selectedCandleId });
  };

  const render = (focus = false) => {
    if (!root) return;
    try {
      const view = ['home', 'tree', 'stage', 'complete'].includes(preferences.view) ? preferences.view : 'home';
      root.innerHTML = view === 'stage' ? renderStage() : view === 'tree' ? renderTree() : view === 'complete' ? renderCompletion() : renderHome();
    } catch (error) { root.innerHTML = escapeLesson(error); }
    if (focus) requestAnimationFrame(() => root.querySelector('.learn-v11-immersive h1, .learn-v11-module-completion h1, .learn-v11-tree-header h1, .learn-v11-home-heading h1')?.focus({ preventScroll: true }));
  };

  const openTopic = (topicId, { resume = false } = {}) => {
    const topic = getTopic(CANDLESTICK_MODULE, topicId);
    const before = progress().topics[topic.id] || { visits: 0, attempts: 0, completed: false, demonstratedUnderstanding: false, selectedOptionId: null, bestScore: null };
    const stage = resume && STAGES.includes(before.currentStage) ? before.currentStage : 'understand';
    const selectedOptionId = stage === 'consequence' || stage === 'learn' ? before.selectedOptionId : null;
    updateTopicProgress(storage, topic.id, { ...before, visits: before.visits + 1, status: before.completed ? 'completed' : 'in-progress', currentStage: stage, selectedOptionId });
    selectedCandleId = null; pendingDecision = null;
    preference({ view: 'stage', moduleId: CANDLESTICK_MODULE.id, subtopicId: topic.id, stage });
    render(true);
  };

  const setStage = (topic, stage) => {
    if (!STAGES.includes(stage)) return;
    const entry = progress().topics[topic.id] || {};
    const previousMax = Math.max(Number.isInteger(entry.maxStageReached) ? entry.maxStageReached : STAGES.indexOf(entry.currentStage || 'understand'), entry.completed ? 4 : 0);
    const target = STAGES.indexOf(stage);
    if (target > previousMax + 1) return;
    updateTopicProgress(storage, topic.id, { currentStage: stage, maxStageReached: Math.max(previousMax, target) });
    preference({ view: 'stage', moduleId: CANDLESTICK_MODULE.id, subtopicId: topic.id, stage });
    render(true);
  };

  const choose = (optionId) => {
    const { topic, scenario } = getActive();
    if (!scenario.decisionOptions.some((option) => option.id === optionId)) return;
    pendingDecision = optionId;
    updateTopicProgress(storage, topic.id, { selectedOptionId: optionId, currentStage: 'decide' });
    render();
    root.querySelector(`[data-v11-choice="${CSS.escape(optionId)}"]`)?.focus();
  };

  const submitDecision = () => {
    const { topic, scenario } = getActive();
    const entry = progress().topics[topic.id] || {};
    const optionId = pendingDecision || entry.selectedOptionId;
    const result = evaluateScenarioDecision(scenario, optionId);
    if (!result.ok) { root.querySelector('[data-v11="submit-decision"]')?.focus(); return; }
    const attempts = (entry.attempts || 0) + 1;
    updateTopicProgress(storage, topic.id, { attempts, lastScore: result.score, bestScore: Math.max(entry.bestScore || 0, result.score), selectedOptionId: optionId, currentStage: 'consequence', status: entry.completed ? 'completed' : 'in-progress', demonstratedUnderstanding: entry.demonstratedUnderstanding || result.score >= 70 });
    pendingDecision = optionId;
    setStage(topic, 'consequence');
  };

  const completeAndContinue = () => {
    const { topic } = getActive();
    const entry = progress().topics[topic.id] || {};
    if (!entry.selectedOptionId || !Number.isInteger(entry.lastScore)) return;
    updateTopicProgress(storage, topic.id, { ...entry, completed: true, status: 'completed', demonstratedUnderstanding: entry.demonstratedUnderstanding || entry.lastScore >= 70, currentStage: 'learn', maxStageReached: 4 });
    const index = CANDLESTICK_MODULE.subtopics.findIndex((item) => item.id === topic.id);
    const next = CANDLESTICK_MODULE.subtopics[index + 1];
    if (next) openTopic(next.id);
    else { preference({ view: 'complete', stage: 'learn' }); render(true); }
  };

  const onClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const mark = target.closest('[data-v11-candle]');
    if (mark && root.contains(mark)) { selectedCandleId = mark.dataset.v11Candle; render(); root.querySelector(`[data-v11-candle="${CSS.escape(selectedCandleId)}"]`)?.focus(); return; }
    const button = target.closest('button');
    if (!button || !root.contains(button) || button.disabled) return;
    const action = button.dataset.v11;
    if (action === 'completion-tree') { expandedBranch = CANDLESTICK_MODULE.branchId; expandedLevel = CANDLESTICK_MODULE.branchId + '|Beginner'; expandedModule = CANDLESTICK_MODULE.id; route('tree'); render(true); return; }
    if (action === 'fallback') { document.querySelector('[data-learning-version="v1"]')?.click(); return; }
    if (action === 'home') { route('home'); render(true); }
    else if (action === 'tree') { route('tree'); render(true); }
    else if (action === 'continue') {
      const summary = getLearningV11Summary(getState(), preferences, progress());
      const current = progress().topics[summary.currentTopic.id];
      openTopic(summary.currentTopic.id, { resume: Boolean(current && !current.completed && current.visits > 0) });
    }
    else if (action === 'charts') onOpenChart?.();
    else if (action === 'detective') onOpenDetective?.();
    else if (action === 'terminal') onOpenTerminal?.();
    else if (action === 'stage-next') { const { topic } = getActive(); setStage(topic, STAGES[Math.min(STAGES.indexOf(preferences.stage) + 1, STAGES.length - 1)]); }
    else if (action === 'stage-back') { const { topic } = getActive(); if (preferences.stage === 'understand') { route('tree'); render(true); } else setStage(topic, STAGES[Math.max(STAGES.indexOf(preferences.stage) - 1, 0)]); }
    else if (action === 'submit-decision') submitDecision();
    else if (action === 'complete-next') completeAndContinue();
    else if (action === 'retry') { const { topic } = getActive(); updateTopicProgress(storage, topic.id, { currentStage: 'decide', selectedOptionId: null }); pendingDecision = null; setStage(topic, 'decide'); }
    else if (button.dataset.v11Branch) { expandedBranch = expandedBranch === button.dataset.v11Branch ? null : button.dataset.v11Branch; expandedLevel = null; expandedModule = null; route('tree'); render(true); }
    else if (button.dataset.v11Level) { expandedLevel = expandedLevel === button.dataset.v11Level ? null : button.dataset.v11Level; expandedModule = null; render(true); }
    else if (button.dataset.v11Module) { if (button.dataset.v11Module === CANDLESTICK_MODULE.id) { const next = CANDLESTICK_MODULE.subtopics.find((topic) => !isComplete(topic, progress())) || CANDLESTICK_MODULE.subtopics[0]; const current = progress().topics[next.id]; openTopic(next.id, { resume: Boolean(current && !current.completed && current.visits > 0) }); } }
    else if (button.dataset.v11StageIndex != null) { const index = Number(button.dataset.v11StageIndex); const { topic } = getActive(); const entry = progress().topics[topic.id] || {}; const max = Math.max(Number.isInteger(entry.maxStageReached) ? entry.maxStageReached : STAGES.indexOf(entry.currentStage || 'understand'), entry.completed ? 4 : 0); if (Number.isInteger(index) && index <= max) setStage(topic, STAGES[index]); }
    else if (button.dataset.v11OpenTopic) openTopic(button.dataset.v11OpenTopic);
    else if (button.dataset.v11Topic) openTopic(button.dataset.v11Topic);
  };

  const onChange = (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.matches('[data-v11-choice]')) return;
    choose(event.target.dataset.v11Choice);
  };
  const onPointer = (event) => {
    if (!(event.target instanceof Element)) return;
    const mark = event.target.closest('[data-v11-candle]');
    if (!mark || !root.contains(mark)) return;
    selectedCandleId = mark.dataset.v11Candle;
    const candle = renderCandleSelection(selectedCandleId, root);
    if (candle) { const output = root.querySelector('.learn-v11-large-inspect, .learn-v11-stage-evidence .learn-v11-inspect'); if (output) output.innerHTML = candle; }
  };
  const onKey = (event) => {
    if (event.key === 'Escape' && preferences.view === 'stage') { event.preventDefault(); route('tree'); render(true); }
    if ((event.key === 'Enter' || event.key === ' ') && event.target instanceof Element && event.target.closest('[data-v11-candle]')) { event.preventDefault(); onPointer(event); }
  };
  root.addEventListener('click', onClick);
  root.addEventListener('change', onChange);
  root.addEventListener('pointerup', onPointer);
  root.addEventListener('keydown', onKey);
  render();
  return {
    render,
    setVersion(version) { preference({ version }); },
    destroy() { root.removeEventListener('click', onClick); root.removeEventListener('change', onChange); root.removeEventListener('pointerup', onPointer); root.removeEventListener('keydown', onKey); },
  };
}

function renderCandleSelection(id, root) {
  const candle = CANDLE_SCENARIOS.find((scenario) => scenario.moduleId === 'module-03')?.chartData.candles.find((item) => item.id === id)
    || (id.startsWith('candle-') ? null : null);
  const data = candle || CHART_DATA.find((item) => item.id === id);
  if (!data) return null;
  root.querySelectorAll('[data-v11-candle]').forEach((node) => { node.classList.toggle('is-active', node.dataset.v11Candle === id); node.setAttribute('aria-pressed', String(node.dataset.v11Candle === id)); });
  return `O $${data.open} · H $${data.high} · L $${data.low} · C $${data.close}`;
}

const CHART_DATA = [
  { id: 'candle-1', open: 48, high: 54, low: 45, close: 52 },
  { id: 'candle-2', open: 52, high: 57, low: 49, close: 50 },
  { id: 'candle-3', open: 50, high: 61, low: 47, close: 59 },
  { id: 'candle-4', open: 59, high: 62, low: 53, close: 55 },
  { id: 'candle-5', open: 55, high: 60, low: 51, close: 58 },
];
