import { CURRICULUM_BRANCHES, CURRICULUM_MODULES, getCurriculumProgress } from '../../curriculum/curriculum-data.mjs';
import { CHART_LESSONS } from '../../game-engine/chart-lessons.mjs';
import { loadLearningPreferences, saveLearningPreferences } from '../shared/learning-preferences.mjs';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const lessonFor = (module) => CHART_LESSONS.find((lesson) => lesson.id === module.lessonId);
const completed = (module, state) => Boolean(module.lessonId && (state.chartAcademy?.lessons?.[module.lessonId]?.completionCount || 0) > 0);

export function getLearningV11Summary(state, preferences = {}) {
  const progress = getCurriculumProgress(state);
  const available = CURRICULUM_MODULES.filter((module) => module.status === 'available' && module.lessonId);
  const completedCount = available.filter((module) => completed(module, state)).length;
  const nextModule = CURRICULUM_MODULES.find((module) => module.id === preferences.moduleId && module.status === 'available') || available.find((module) => !completed(module, state)) || available[0];
  const savedLesson = preferences.subtopicId && nextModule?.content?.objectives?.includes(preferences.subtopicId) ? preferences.subtopicId : null;
  return Object.freeze({ progress, availableCount: available.length, completedCount, percent: available.length ? Math.round(completedCount / available.length * 100) : 0, nextModule, savedLesson });
}

function makeChart(lesson) {
  const chart = Object.values(lesson.charts || {})[0];
  if (!chart) return '<div class="learn-v11-figure-note">Visual explanation is in development.</div>';
  if (chart.type === 'candlestick') {
    const candles = chart.candles || [];
    const lo = Math.min(...candles.map((c) => c.low)); const hi = Math.max(...candles.map((c) => c.high));
    const y = (n) => 195 - (n - lo) / Math.max(1, hi - lo) * 150;
    return `<svg class="learn-v11-chart" viewBox="0 0 620 230" role="group" aria-label="Illustrative candlestick chart. Select a candle for its OHLC values."><path d="M40 205H600" class="learn-v11-axis"/>${candles.map((c, i) => { const x = 90 + i * 105; const bullish = c.close >= c.open; return `<g tabindex="0" role="button" aria-label="Candle ${i + 1}: open ${c.open}, high ${c.high}, low ${c.low}, close ${c.close}" data-chart-point="${i}" class="learn-v11-candle ${bullish ? 'up' : 'down'}"><line x1="${x}" y1="${y(c.high)}" x2="${x}" y2="${y(c.low)}"/><rect x="${x - 17}" y="${Math.min(y(c.open), y(c.close))}" width="34" height="${Math.max(7, Math.abs(y(c.open) - y(c.close)))}" rx="3"/><text x="${x}" y="220" text-anchor="middle">${i + 1}</text></g>`; }).join('')}</svg><p class="learn-v11-figure-note">Fictional daily examples · focus, click, or tap a candle to inspect OHLC.</p>`;
  }
  const source = chart.points || [];
  const lo = Math.min(...source.map((p) => p.value)); const hi = Math.max(...source.map((p) => p.value));
  const pts = source.map((p, i) => `${42 + i * (520 / Math.max(1, source.length - 1))},${188 - (p.value - lo) / Math.max(1, hi - lo) * 145}`).join(' ');
  const zones = chart.support != null ? `<rect x="40" y="${188 - (chart.resistance - lo) / Math.max(1, hi - lo) * 145 - 8}" width="540" height="16" class="learn-v11-zone resistance"/><rect x="40" y="${188 - (chart.support - lo) / Math.max(1, hi - lo) * 145 - 8}" width="540" height="16" class="learn-v11-zone support"/>` : '';
  return `<svg class="learn-v11-chart" viewBox="0 0 620 230" role="img" aria-label="${esc(chart.title)} with fictional price points">${zones}<path d="M40 195H590" class="learn-v11-axis"/><polyline points="${pts}" class="learn-v11-line"/>${source.map((p, i) => { const [cx, cy] = pts.split(' ')[i].split(','); return `<circle cx="${cx}" cy="${cy}" r="7" class="learn-v11-point" tabindex="0" role="button" aria-label="Point ${i + 1}: fictional price ${p.value}" data-chart-point="${i}"/>`; }).join('')}</svg><p class="learn-v11-figure-note">${esc(chart.title)} · fictional sample. Select a point to inspect its value.</p>`;
}

export function createLearningV11(root, { getState, storage, onOpenChart, onOpenDetective, onOpenTerminal }) {
  let preferences = loadLearningPreferences(storage);
  let route = 'home';
  let expanded = { branch: null, level: null, module: null };
  let selectedChartPoint = null;
  const save = (patch) => { preferences = { ...preferences, ...patch }; saveLearningPreferences(storage, patch); };
  const renderHome = (state) => {
    const summary = getLearningV11Summary(state, preferences);
    const current = summary.nextModule;
    const currentPath = summary.progress.find((branch) => branch.id === current?.branch);
    const branchName = CURRICULUM_BRANCHES.find((branch) => branch.id === current?.branch)?.title;
    return `<section class="learn-v11-home"><div class="learn-v11-heading"><div><span class="eyebrow">MARKETCRAFT LEARNING · V1.1</span><h1>Build your market understanding.</h1><p>Follow a path through chart reading, technical analysis and market fundamentals. Examples are educational and simulated.</p></div><div class="learn-v11-overview"><span>VERIFIED CHART LESSONS</span><strong>${summary.completedCount} <small>/ ${summary.availableCount}</small></strong><div class="learn-v11-progress"><i style="width:${summary.percent}%"></i></div><small>${summary.percent}% completed</small></div></div><article class="learn-v11-continue"><div><span class="eyebrow">${summary.completedCount ? 'PICK UP WHERE YOU LEFT OFF' : 'YOUR FIRST STEP'}${branchName ? ` · ${esc(branchName.toUpperCase())}` : ''}</span><h2>${current ? esc(current.title) : 'Explore the learning tree'}</h2><p>${current ? esc(current.content.summary) : 'Choose a branch to get started.'}${preferences.subtopicId ? ` · Last topic: ${esc(preferences.subtopicId)}` : ' · First topic: ' + esc(current?.content?.objectives?.[0] || '')}</p>${currentPath ? `<div class="learn-v11-continue-progress"><div class="learn-v11-progress"><i style="width:${currentPath.percent}%"></i></div><small>${currentPath.percent}% of verified lessons in this path</small></div>` : ''}</div><button type="button" class="primary" data-v11="continue">${summary.completedCount ? 'Continue learning' : 'Start learning'} <span aria-hidden="true">→</span></button></article><div class="learn-v11-pathhead"><div><span class="eyebrow">THREE LEARNING PATHS</span><h2>Choose a direction</h2></div><button type="button" class="secondary" data-v11="tree">Explore the learning tree</button></div><div class="learn-v11-paths">${CURRICULUM_BRANCHES.map((branch, index) => { const p = summary.progress.find((x) => x.id === branch.id); return `<article class="learn-v11-path"><span class="learn-v11-path-index">0${index + 1}</span><h3>${esc(branch.title)}</h3><p>${esc(['Read price action and market structure from fictional charts.', 'Study technical tools, risk and decision-making frameworks.', 'Build context from the economy and company information.'][index])}</p><div class="learn-v11-pathmeta"><span>${p.completedCount} of ${p.availableCount} verified lessons</span><span>${p.totalCount} modules mapped</span></div><div class="learn-v11-progress"><i style="width:${p.percent}%"></i></div><small>Beginner · Intermediate · Advanced</small><button type="button" class="secondary" data-v11-branch="${branch.id}">Explore path →</button></article>`; }).join('')}</div><section class="learn-v11-quick"><h2>Keep exploring</h2><button type="button" data-v11="tree">Learning Tree <span>Open progressive curriculum</span></button><button type="button" data-v11="charts">Chart Academy <span>Optional interactive chart sessions</span></button><button type="button" data-v11="detective">Market Detective <span>Optional evidence activity</span></button><button type="button" data-v11="terminal">Practice Terminal <span>Simulated charting and virtual orders</span></button></section><p class="learn-v11-footnote">Only lessons with verified learning content are marked available. Other curriculum modules are labeled In Development.</p></section>`;
  };
  const renderTree = (state) => {
    const progress = getCurriculumProgress(state);
    return `<section class="learn-v11-tree"><div class="learn-v11-tree-head"><button class="secondary" data-v11="home">← Learning home</button><span class="eyebrow">PROGRESSIVE CURRICULUM</span><h1>Learning Tree</h1><p>Open a branch, then a level and module. Your completion is shared with Learning V1.</p></div><div class="learn-v11-root">START LEARNING<span>Choose a branch</span></div><div class="learn-v11-branches">${CURRICULUM_BRANCHES.map((branch) => { const bp = progress.find((x) => x.id === branch.id); const branchOpen = expanded.branch === branch.id; return `<article class="learn-v11-branch ${branchOpen ? 'is-open' : ''}"><button class="learn-v11-node" data-v11-branch="${branch.id}" aria-expanded="${branchOpen}"><span>${esc(branch.title)}</span><small>${bp.completedCount}/${bp.availableCount} verified · ${bp.percent}%</small></button>${branchOpen ? `<div class="learn-v11-levels">${bp.levelProgress.map((level) => { const levelOpen = expanded.level === `${branch.id}|${level.name}`; return `<section class="learn-v11-level"><button class="learn-v11-level-toggle" data-v11-level="${branch.id}|${level.name}" aria-expanded="${levelOpen}">${esc(level.name)} <span>${level.completedCount}/${level.availableCount} lessons</span></button>${levelOpen ? `<div class="learn-v11-modules">${level.modules.map((module) => { const done = completed(module, state); const moduleOpen = expanded.module === module.id; const lesson = lessonFor(module); return `<article class="learn-v11-module ${module.status !== 'available' ? 'is-dev' : ''}"><button class="learn-v11-module-toggle" data-v11-module="${module.id}" ${module.status !== 'available' ? 'disabled' : ''} aria-expanded="${moduleOpen}"><span><b>${done ? '✓' : '○'} ${esc(module.title)}</b><small>${module.status === 'available' ? `${lesson.objectives.length} topics · ${done ? 'Completed' : 'Available'}` : 'In Development'}</small></span><span>${module.status === 'available' ? '⌄' : '•'}</span></button>${moduleOpen && lesson ? `<div class="learn-v11-subtopics">${lesson.objectives.map((topic) => `<button data-v11-topic="${esc(topic)}" data-v11-topic-module="${module.id}">${esc(topic)} <span>Read →</span></button>`).join('')}</div>` : ''}</article>`; }).join('')}</div>` : ''}</section>`; }).join('')}</div>` : ''}</article>`; }).join('')}</div><aside class="learn-v11-devnote">The remaining mapped modules stay visible as In Development until verified lesson content is available.</aside></section>`;
  };
  const renderLesson = (state) => {
    const module = CURRICULUM_MODULES.find((item) => item.id === preferences.moduleId && item.status === 'available');
    const lesson = module && lessonFor(module);
    if (!module || !lesson) { route = 'tree'; return renderTree(state); }
    const activeTopic = lesson.objectives.includes(preferences.subtopicId) ? preferences.subtopicId : lesson.objectives[0];
    const point = selectedChartPoint == null ? null : (Object.values(lesson.charts)[0].candles || Object.values(lesson.charts)[0].points || [])[selectedChartPoint];
    const detail = point ? (Object.hasOwn(point, 'open') ? `Open ${point.open} · High ${point.high} · Low ${point.low} · Close ${point.close}` : `Fictional price ${point.value}`) : 'Select a chart mark to inspect its values.';
    const idx = lesson.objectives.indexOf(activeTopic);
    const explanation = lesson.questions[idx] || lesson.summary;
    const ordered = CURRICULUM_MODULES.filter((m) => m.status === 'available' && m.lessonId);
    const at = ordered.findIndex((m) => m.id === module.id);
    return `<article class="learn-v11-lesson"><header class="learn-v11-lesson-head"><button class="secondary" data-v11="tree">← Back to Learning Tree</button><div><span class="eyebrow">${esc(module.branch.replaceAll('-', ' ').toUpperCase())} · ${esc(module.level.toUpperCase())}</span><h1>${esc(lesson.title)}</h1><p>${esc(lesson.summary)}</p></div><span class="learn-v11-completion">${completed(module, state) ? '✓ Completed in shared progress' : 'Learning topic'}</span></header><div class="learn-v11-reading"><nav class="learn-v11-topic-nav" aria-label="Lesson topics"><strong>IN THIS LESSON</strong>${lesson.objectives.map((topic, i) => `<button class="${topic === activeTopic ? 'is-active' : ''}" data-v11-topic="${esc(topic)}" data-v11-topic-module="${module.id}" aria-current="${topic === activeTopic ? 'step' : 'false'}"><span>0${i + 1}</span>${esc(topic)}</button>`).join('')}</nav><div class="learn-v11-lesson-content"><span class="eyebrow">TOPIC ${idx + 1} OF ${lesson.objectives.length}</span><h2>${esc(activeTopic)}</h2><p class="learn-v11-intro">${esc(explanation)}</p><figure class="learn-v11-visual"><figcaption>${esc(Object.values(lesson.charts)[0]?.title || 'Visual explanation')}</figcaption>${makeChart(lesson)}<p class="learn-v11-inspect" aria-live="polite">${esc(detail)}</p></figure><section class="learn-v11-explain"><span class="eyebrow">KEY IDEA</span><p>${esc(lesson.questions[(idx + 1) % lesson.questions.length])}</p></section><section class="learn-v11-takeaway"><strong>TAKEAWAY</strong><p>${esc(lesson.summary)} Chart patterns describe the sample shown and do not guarantee what happens next.</p></section><div class="learn-v11-lesson-nav"><button class="secondary" data-v11-prev="${esc(lesson.objectives[idx - 1] || '')}" data-v11-module="${module.id}" ${idx === 0 ? 'disabled' : ''}>← Previous topic</button><button class="primary" data-v11-next="${esc(lesson.objectives[idx + 1] || '')}" data-v11-module="${module.id}">${idx < lesson.objectives.length - 1 ? 'Next topic →' : 'Finish topic ✓'}</button></div><div class="learn-v11-adjacent"><button class="secondary" data-v11-adjacent="${esc(ordered[at - 1]?.id || '')}" ${at <= 0 ? 'disabled' : ''}>Previous lesson</button><button class="secondary" data-v11-adjacent="${esc(ordered[at + 1]?.id || '')}" ${at >= ordered.length - 1 ? 'disabled' : ''}>Next lesson</button></div><button class="secondary learn-v11-optional-practice" data-v11="charts">Optional Chart Academy practice — shared completion &amp; XP</button></div></div></article>`;
  };
  const render = () => {
    if (!root) return;
    const state = getState();
    try { root.innerHTML = route === 'tree' ? renderTree(state) : route === 'lesson' ? renderLesson(state) : renderHome(state); }
    catch (error) { root.innerHTML = `<div class="learn-v11-error" role="alert"><h2>Learning V1.1 could not be displayed.</h2><p>${esc(error?.message || 'A display error occurred.')}</p><button type="button" class="secondary" data-v11="fallback">Return to Learning V1</button></div>`; }
  };
  const click = (event) => {
    const button = event.target.closest('button'); if (!button || !root.contains(button)) return;
    if (button.dataset.v11 === 'fallback') { document.querySelector('[data-learning-version="v1"]')?.click(); return; }
    if (button.dataset.v11 === 'home') { route = 'home'; render(); }
    else if (button.dataset.v11 === 'tree') { route = 'tree'; render(); }
    else if (button.dataset.v11 === 'continue') { const m = getLearningV11Summary(getState(), preferences).nextModule; if (m) { save({ moduleId: m.id, subtopicId: m.content.objectives[0] }); route = 'lesson'; selectedChartPoint = null; } else route = 'tree'; render(); }
    else if (button.dataset.v11 === 'charts') onOpenChart?.();
    else if (button.dataset.v11 === 'detective') onOpenDetective?.();
    else if (button.dataset.v11 === 'terminal') onOpenTerminal?.();
    else if (button.dataset.v11Branch) { expanded.branch = expanded.branch === button.dataset.v11Branch ? null : button.dataset.v11Branch; expanded.level = null; expanded.module = null; if (route === 'home') route = 'tree'; render(); }
    else if (button.dataset.v11Level) { expanded.level = expanded.level === button.dataset.v11Level ? null : button.dataset.v11Level; expanded.module = null; render(); }
    else if (button.dataset.v11Module) { if (button.dataset.v11Adjacent) { if (!button.dataset.v11Adjacent) return; save({ moduleId: button.dataset.v11Adjacent, subtopicId: null }); route = 'lesson'; selectedChartPoint = null; render(); }
      else if (button.dataset.v11Prev !== undefined || button.dataset.v11Next !== undefined) { const topic = button.dataset.v11Next || button.dataset.v11Prev; if (topic) save({ moduleId: button.dataset.v11Module, subtopicId: topic }); render(); }
      else if (button.dataset.v11Module) { const m = CURRICULUM_MODULES.find((x) => x.id === button.dataset.v11Module); if (button.dataset.v11Module && m?.status === 'available') { expanded.module = expanded.module === m.id ? null : m.id; render(); } }
    }
    else if (button.dataset.v11TopicModule) { save({ moduleId: button.dataset.v11TopicModule, subtopicId: button.dataset.v11Topic }); route = 'lesson'; selectedChartPoint = null; render(); }
    else if (button.dataset.v11Adjacent) { if (button.dataset.v11Adjacent) { save({ moduleId: button.dataset.v11Adjacent, subtopicId: null }); route = 'lesson'; selectedChartPoint = null; render(); } }
  };
  const inspect = (event) => { const mark = event.target.closest('[data-chart-point]'); if (!mark || !root.contains(mark)) return; selectedChartPoint = Number(mark.dataset.chartPoint); const module = CURRICULUM_MODULES.find((item) => item.id === preferences.moduleId); const chart = Object.values(lessonFor(module)?.charts || {})[0]; const point = (chart?.candles || chart?.points || [])[selectedChartPoint]; if (!point) return; const text = Object.hasOwn(point, 'open') ? `Candle ${selectedChartPoint + 1} · Open ${point.open} · High ${point.high} · Low ${point.low} · Close ${point.close}` : `Point ${selectedChartPoint + 1} · Fictional price ${point.value}`; const output = root.querySelector('.learn-v11-inspect'); if (output) output.textContent = text; };
  root.addEventListener('click', click); root.addEventListener('pointerup', inspect); root.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') inspect(event); });
  render();
  return { render, setVersion(version) { save({ version }); }, destroy() { root.removeEventListener('click', click); root.removeEventListener('pointerup', inspect); } };
}
