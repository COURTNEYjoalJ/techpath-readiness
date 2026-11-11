import { CURRICULUM_BRANCHES, CURRICULUM_MODULES } from '../../curriculum/curriculum-data.mjs';
import { CANDLESTICK_MODULE } from '../content/module-03-candlesticks.mjs';
import { CANDLE_SCENARIOS } from '../scenarios/candlestick-scenarios.mjs';
import { CHART_ANALYSIS_MODULES, chartAnalysisScenarioFor } from '../content/chart-analysis-v11.mjs';
import { evaluateScenarioDecision } from '../scenario-engine.mjs';
import { loadLearningPreferences, saveLearningPreferences } from '../shared/learning-preferences.mjs';
import { getTopicProgress, loadLearningProgress, updateTopicProgress } from '../progress-service.mjs';
import { renderLessonStage } from './lesson-stage.mjs?v=premium-ui-1';
import { CHART_LESSONS } from '../../game-engine/chart-lessons.mjs';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const STAGES = Object.freeze(['understand', 'observe', 'decide', 'consequence', 'learn']);
const FULL_SCREEN_MODULES = Object.freeze([CANDLESTICK_MODULE, ...CHART_ANALYSIS_MODULES]);
const scenarioFor = (topic) => CANDLE_SCENARIOS.find((scenario) => scenario.subtopicId === topic.id) || chartAnalysisScenarioFor(topic.id);
const moduleForTopic = (topicId) => FULL_SCREEN_MODULES.find((module) => module.subtopics.some((topic) => topic.id === topicId)) || CANDLESTICK_MODULE;
const getTopic = (module, id) => module.subtopics.find((topic) => topic.id === id) || module.subtopics[0];
const isComplete = (topic, progress) => Boolean(progress.topics?.[topic.id]?.completed);

export function getLearningV11Summary(state, preferences = {}, progress = loadLearningProgress()) {
  const module = FULL_SCREEN_MODULES.find((item) => item.id === preferences.moduleId) || moduleForTopic(preferences.subtopicId) || CANDLESTICK_MODULE;
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
  let selectedZoneId = null;
  let topicsOpen = false;
  let pendingDecision = null;

  const progress = () => loadLearningProgress(storage);
  const activeCandles = () => { const { module, scenario } = getActive(); return module.number === 3 ? (CHART_LESSONS.find((lesson) => lesson.id === 'candlesticks')?.charts?.candles?.candles || []) : scenario.chartData?.candles || []; };
  const preference = (patch) => { preferences = { ...preferences, ...patch }; saveLearningPreferences(storage, patch); };
  const route = (view) => { preference({ view }); };
  const openTopics = () => { topicsOpen = true; render(); requestAnimationFrame(() => root.querySelector('.learn-v11-topics-close')?.focus()); };
  const closeTopics = () => { if (!topicsOpen) return; topicsOpen = false; render(); requestAnimationFrame(() => root.querySelector('[data-v11="topics-open"]')?.focus()); };
  const escapeLesson = (error) => `<div class="learn-v11-error" role="alert"><h2>Learning V1.1 could not be displayed.</h2><p>${esc(error?.message || 'A display error occurred.')}</p><button type="button" class="secondary" data-v11="fallback">Return to Learning home</button></div>`;

  const renderHome = () => {
    const summary = getLearningV11Summary(getState(), preferences, progress());
    const topicProgress = getTopicProgress(progress(), summary.currentTopic.id);
    const branchName = CURRICULUM_BRANCHES.find((branch) => branch.id === summary.currentModule.branchId)?.title || 'Chart Analysis';
    const hasProgress = summary.inProgressSubtopics > 0 || summary.completedSubtopics > 0;
    const pathCards = CURRICULUM_BRANCHES.map((branch, index) => {
      const mapped = CURRICULUM_MODULES.filter((module) => module.branch === branch.id);
      const playable = FULL_SCREEN_MODULES.filter((module) => module.branchId === branch.id);
      const complete = playable.filter((module) => module.subtopics.every((topic) => isComplete(topic, progress()))).length;
      const descriptions = ['Read fictional charts, compare patterns, and practise evidence-led decisions.', 'Learn how indicators describe data while leaving room for uncertainty.', 'Explore economic and company information without treating forecasts as facts.'];
      const icons = ['⌁', '↗', '◈'];
      const status = playable.length ? `${complete} of ${playable.length} modules complete · ${playable.length} interactive` : `${mapped.length} modules mapped · lessons in development`;
      return `<article class="learn-v11-path-card"><span class="learn-v11-path-icon" aria-hidden="true">${icons[index]}</span><div class="learn-v11-path-copy"><h3>${esc(branch.title)}</h3><p>${descriptions[index]}</p></div><small class="learn-v11-path-status">${status}</small><button type="button" class="${playable.length ? 'secondary' : 'secondary'}" data-v11-branch="${branch.id}">Explore path <span aria-hidden="true">→</span></button></article>`;
    }).join('');
    return `<section class="learn-v11-home-screen"><header class="learn-v11-home-hero"><span class="learn-v11-kicker">MARKETCRAFT ACADEMY</span><h1>Master the market. One decision at a time.</h1><p>Learn through interactive charts, market scenarios and practical decisions.</p></header><section class="learn-v11-continue-card" aria-labelledby="learn-v11-continue-title"><div class="learn-v11-continue-copy"><span class="learn-v11-kicker">${summary.moduleComplete ? 'MODULE COMPLETE · READY TO REVISIT' : hasProgress ? 'PICK UP WHERE YOU LEFT OFF' : 'YOUR FIRST LESSON STARTS HERE'}</span><h2 id="learn-v11-continue-title">${esc(summary.currentTopic.title)}</h2><p>${esc(branchName)} · Module ${String(summary.currentModule.number).padStart(2, '0')} · ${esc(summary.currentModule.title)} · ${topicProgress.status.replaceAll('-', ' ')}${preferences.view === 'stage' ? ` · ${esc(preferences.stage)}` : ''}</p><div class="learn-v11-continue-progress"><div class="learn-v11-progress" role="progressbar" aria-label="Module topic completion" aria-valuemin="0" aria-valuemax="${summary.subtopicCount}" aria-valuenow="${summary.completedSubtopics}"><i style="width:${summary.percent}%"></i></div><small>${summary.completedSubtopics} of ${summary.subtopicCount} topics · ${summary.percent}%</small></div></div><button type="button" class="primary learn-v11-resume-button" data-v11="continue">${hasProgress ? 'Resume learning' : 'Start learning'} <span aria-hidden="true">→</span></button></section><section class="learn-v11-learning-paths" aria-labelledby="learn-v11-paths-title"><div class="learn-v11-path-heading"><div><span class="learn-v11-kicker">CHOOSE YOUR LEARNING PATH</span><h2 id="learn-v11-paths-title">Find your starting point</h2></div><span class="learn-v11-path-count">${CURRICULUM_MODULES.length} curriculum modules</span></div><div class="learn-v11-path-grid">${pathCards}</div></section><details class="learn-v11-practice"><summary><span><b>Optional practice</b><small>Extra tools to apply what you are learning</small></span><span class="learn-v11-practice-arrow" aria-hidden="true">⌄</span></summary><div class="learn-v11-practice-links"><button type="button" data-v11="charts"><span aria-hidden="true">▥</span>Chart Academy<span>Existing lessons</span></button><button type="button" data-v11="detective"><span aria-hidden="true">◇</span>Market Detective<span>Evidence scenarios</span></button><button type="button" data-v11="terminal"><span aria-hidden="true">⌁</span>Practice Terminal<span>Simulated portfolio</span></button></div></details></section>`;
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
          const lessonModule = FULL_SCREEN_MODULES.find((item) => item.id === module.id);
          const playable = Boolean(lessonModule);
          const moduleOpen = expandedModule === module.id;
          const done = playable && lessonModule.subtopics.every((topic) => isComplete(topic, pr));
          return `<article class="learn-v11-tree-module ${playable ? 'is-ready' : 'is-dev'}"><button type="button" class="learn-v11-tree-module-button" data-v11-module="${module.id}" aria-expanded="${playable && moduleOpen}" ${playable ? '' : 'aria-disabled="true"'}><span class="learn-v11-module-num">M${String(module.number).padStart(2, '0')}</span><span><strong>${esc(module.title)}</strong><small>${playable ? `${done ? 'Completed · revisit topics' : 'Interactive lesson'} · ${lessonModule.subtopics.length} subtopics` : 'In Development · content and scenarios not yet authored'}</small></span><span>${playable ? '⌄' : '·'}</span></button>${playable && moduleOpen ? `<div class="learn-v11-tree-subtopics">${lessonModule.subtopics.map((topic) => { const status = getTopicProgress(pr, topic.id); return `<button type="button" data-v11-open-topic="${topic.id}"><span>${status.completed ? '✓' : status.visits ? '◐' : '○'}</span><strong>${esc(topic.title)}</strong><small>${status.completed ? (status.visits > 1 ? 'Revisited' : status.demonstratedUnderstanding ? 'Demonstrated understanding' : 'Completed') : status.visits ? 'In progress' : 'Not started'}</small></button>`; }).join('')}</div>` : ''}</article>`;
        }).join('')}</div>` : ''}</section>`;
      }).join('');
      const devCount = branch.id === 'chart-analysis' ? branchCardsCount(branch) : branchCardsCount(branch);
      return `<article class="learn-v11-tree-branch ${branchOpen ? 'is-open' : ''}"><button type="button" class="learn-v11-tree-branch-button" data-v11-branch="${branch.id}" aria-expanded="${branchOpen}"><span><strong>${esc(branch.title)}</strong><small>${devCount} modules · ${(branch.id === 'chart-analysis' ? 'Candlesticks, price behaviour and market structure' : branch.id === 'technical-analysis' ? 'Trends, indicators, momentum and volatility' : 'Economics, company fundamentals and valuation')}</small></span><b>${branchOpen ? '−' : '+'}</b></button>${branchOpen ? `<div class="learn-v11-tree-levels">${levels}</div>` : ''}</article>`;
    }).join('');
    const integrated = CURRICULUM_MODULES.find((module) => module.number === 24);
    return `<section class="learn-v11-tree-screen"><header class="learn-v11-tree-header"><div><button type="button" class="secondary" data-v11="home">← Learning home</button><span class="learn-v11-kicker">CURRICULUM MAP · 24 NUMBERED MODULES</span><h1>Choose a path</h1><p>Follow a branch from its learning levels to the available interactive lesson.</p></div><div class="learn-v11-map-stat"><strong>${FULL_SCREEN_MODULES.length} / 24</strong><span>interactive modules authored</span></div></header><div class="learn-v11-tree-root">START LEARNING<span>Three analysis branches</span></div><div class="learn-v11-tree-branches">${branchCards}</div><aside class="learn-v11-integrated-note"><strong>M24 · Integrated Master Practical Project</strong><span>Reserved for an optional read-only analysis overview. It will not be a required project. Overview content remains In Development.</span></aside><p class="learn-v11-tree-foot">Existing Chart Academy and Market Detective remain available under Optional Practice; they retain their own current completion and reward rules.</p></section>`;
  };

  function branchCardsCount(branch) { return CURRICULUM_MODULES.filter((module) => module.branch === branch.id).length; }

  const getActive = () => {
    const module = FULL_SCREEN_MODULES.find((item) => item.id === preferences.moduleId) || moduleForTopic(preferences.subtopicId);
    const topic = getTopic(module, preferences.subtopicId);
    return { module, topic, scenario: scenarioFor(topic), progress: progress() };
  };

  const renderCompletion = () => {
    const summary = getLearningV11Summary(getState(), preferences, progress());
    return `<section class="learn-v11-module-completion"><div class="learn-v11-completion-mark" aria-hidden="true">✓</div><span class="learn-v11-kicker">MODULE ${String(summary.currentModule.number).padStart(2, '0')} · ${esc(summary.currentModule.title.toUpperCase())}</span><h1 tabindex="-1">Module complete</h1><p>You reviewed all ${summary.subtopicCount} topics. Your learning record is saved in this browser.</p><div class="learn-v11-completion-stats"><strong>${summary.subtopicCount} / ${summary.subtopicCount}<small> topics completed</small></strong><span>Decision quality reflects evidence and risk awareness, not simulated profit.</span></div><button type="button" class="primary" data-v11="completion-tree">Return to learning path →</button></section>`;
  };

  const renderStage = () => {
    const { module, topic, scenario, progress: currentProgress } = getActive();
    if (!scenario) throw new Error(`No verified scenario for ${topic.title}.`);
    const stage = STAGES.includes(preferences.stage) ? preferences.stage : 'understand';
    const entry = currentProgress.topics[topic.id] || {};
    let decision = null;
    if (stage === 'consequence' || stage === 'learn') {
      decision = evaluateScenarioDecision(scenario, entry.selectedOptionId);
      if (!decision.ok) preference({ stage: 'decide' });
    }
    return renderLessonStage({ module, topic, stage: decision?.ok ? stage : preferences.stage, progress: currentProgress, scenario, decision: decision?.ok ? decision : null, selectedCandleId, selectedZoneId, topicsOpen });
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
    const module = moduleForTopic(topicId);
    const topic = getTopic(module, topicId);
    const before = progress().topics[topic.id] || { visits: 0, attempts: 0, completed: false, demonstratedUnderstanding: false, selectedOptionId: null, bestScore: null };
    const stage = resume && STAGES.includes(before.currentStage) ? before.currentStage : 'understand';
    const selectedOptionId = stage === 'consequence' || stage === 'learn' ? before.selectedOptionId : null;
    updateTopicProgress(storage, topic.id, { ...before, visits: before.visits + 1, status: before.completed ? 'completed' : 'in-progress', currentStage: stage, selectedOptionId });
    selectedCandleId = null; selectedZoneId = null; topicsOpen = false; pendingDecision = null;
    preference({ view: 'stage', moduleId: module.id, subtopicId: topic.id, stage });
    render(true);
  };

  const setStage = (topic, stage) => {
    if (!STAGES.includes(stage)) return;
    const entry = progress().topics[topic.id] || {};
    const previousMax = Math.max(Number.isInteger(entry.maxStageReached) ? entry.maxStageReached : STAGES.indexOf(entry.currentStage || 'understand'), entry.completed ? 4 : 0);
    const target = STAGES.indexOf(stage);
    if (target > previousMax + 1) return;
    updateTopicProgress(storage, topic.id, { currentStage: stage, maxStageReached: Math.max(previousMax, target) });
    preference({ view: 'stage', moduleId: moduleForTopic(topic.id).id, subtopicId: topic.id, stage });
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
    const { module, topic } = getActive();
    const entry = progress().topics[topic.id] || {};
    if (!entry.selectedOptionId || !Number.isInteger(entry.lastScore)) return;
    updateTopicProgress(storage, topic.id, { ...entry, completed: true, status: 'completed', demonstratedUnderstanding: entry.demonstratedUnderstanding || entry.lastScore >= 70, currentStage: 'learn', maxStageReached: 4 });
    const index = module.subtopics.findIndex((item) => item.id === topic.id);
    const next = module.subtopics[index + 1];
    if (next) openTopic(next.id);
    else { preference({ view: 'complete', stage: 'learn' }); render(true); }
  };

  const onClick = (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const zoneButton = target.closest('[data-v11-zone]');
    if (zoneButton && root.contains(zoneButton)) { selectedZoneId = zoneButton.dataset.v11Zone; render(); root.querySelector(`[data-v11-zone="${CSS.escape(selectedZoneId)}"]`)?.focus(); return; }
    const mark = target.closest('[data-v11-candle]');
    if (mark && root.contains(mark)) { selectedCandleId = mark.dataset.v11Candle; render(); root.querySelector(`[data-v11-candle="${CSS.escape(selectedCandleId)}"]`)?.focus(); return; }
    const button = target.closest('button');
    if (!button || !root.contains(button) || button.disabled) return;
    const action = button.dataset.v11;
    if (action === 'topics-open') { openTopics(); return; }
    if (action === 'topics-close') { closeTopics(); return; }
    if (action === 'completion-tree') { const module = moduleForTopic(preferences.subtopicId); expandedBranch = module.branchId; expandedLevel = module.branchId + '|' + module.level; expandedModule = module.id; route('tree'); render(true); return; }
    if (action === 'fallback') { route('home'); render(true); return; }
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
    else if (button.dataset.v11Module) { const selectedModule = FULL_SCREEN_MODULES.find((item) => item.id === button.dataset.v11Module); if (selectedModule) { const next = selectedModule.subtopics.find((topic) => !isComplete(topic, progress())) || selectedModule.subtopics[0]; const current = progress().topics[next.id]; openTopic(next.id, { resume: Boolean(current && !current.completed && current.visits > 0) }); } }
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
    const candle = renderCandleSelection(selectedCandleId, root, activeCandles());
    if (candle) { const output = root.querySelector('.learn-v11-large-inspect, .learn-v11-stage-evidence .learn-v11-inspect'); if (output) output.innerHTML = candle; }
  };
  const onKey = (event) => {
    if (event.key === 'Escape' && topicsOpen) { event.preventDefault(); closeTopics(); return; }
    if (topicsOpen && event.key === 'Tab') {
      const focusable = [...root.querySelectorAll('.learn-v11-topics-panel button:not(:disabled)')];
      if (focusable.length) {
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
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

function renderCandleSelection(id, root, candles = []) {
  const data = candles.find((item) => item.id === id);
  if (!data) return null;
  root.querySelectorAll('[data-v11-candle]').forEach((node) => { node.classList.toggle('is-active', node.dataset.v11Candle === id); node.setAttribute('aria-pressed', String(node.dataset.v11Candle === id)); });
  return `O $${data.open} · H $${data.high} · L $${data.low} · C $${data.close}`;
}
