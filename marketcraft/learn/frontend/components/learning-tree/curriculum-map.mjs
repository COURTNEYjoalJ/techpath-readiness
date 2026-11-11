import { CURRICULUM_BRANCHES, CURRICULUM_MODULES, getCurriculumProgress } from '../../curriculum/curriculum-data.mjs';

let branchId = null;
let levelName = null;
let selectedModuleId = null;
let selectedSubtopicId = null;
let started = false;
const el = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined) node.textContent = text; return node; };

function miniChart(module) {
  const data = Object.values(module.content.charts || {})[0];
  if (!data) return null;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 600 210'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', data.title + ', fictional educational prices'); svg.classList.add('curriculum-chart');
  const line = (x1, y1, x2, y2, color = 'currentColor') => { const n = document.createElementNS(svg.namespaceURI, 'line'); n.setAttribute('x1', x1); n.setAttribute('y1', y1); n.setAttribute('x2', x2); n.setAttribute('y2', y2); n.setAttribute('stroke', color); n.setAttribute('stroke-opacity', '.24'); svg.append(n); };
  for (let y = 35; y <= 180; y += 36) line(30, y, 575, y);
  if (data.candles) {
    const candles = data.candles; const values = candles.flatMap((item) => [item.high, item.low]); const min = Math.min(...values), max = Math.max(...values); const y = (v) => 180 - (v - min) / Math.max(1, max - min) * 140;
    candles.forEach((item, i) => { const x = 65 + i * 95; const color = item.close >= item.open ? '#57bb84' : '#dd786d'; line(x, y(item.high), x, y(item.low), color); const body = document.createElementNS(svg.namespaceURI, 'rect'); body.setAttribute('x', x - 13); body.setAttribute('y', y(Math.max(item.open, item.close))); body.setAttribute('width', '26'); body.setAttribute('height', String(Math.max(3, Math.abs(y(item.open) - y(item.close))))); body.setAttribute('fill', color); svg.append(body); const label = document.createElementNS(svg.namespaceURI, 'text'); label.setAttribute('x', x); label.setAttribute('y', '201'); label.setAttribute('text-anchor', 'middle'); label.textContent = `C${i + 1}`; svg.append(label); });
  } else {
    const series = data.points || [];
    if (series.length) {
      const values = series.map((item) => item.value); const min = Math.min(...values), max = Math.max(...values);
      const points = values.map((value, i) => `${35 + i * 510 / Math.max(1, values.length - 1)},${178 - (value - min) / Math.max(1, max - min) * 140}`).join(' ');
      const polyline = document.createElementNS(svg.namespaceURI, 'polyline'); polyline.setAttribute('points', points); polyline.setAttribute('fill', 'none'); polyline.setAttribute('stroke', '#e5bb80'); polyline.setAttribute('stroke-width', '3'); svg.append(polyline);
      if (Number.isFinite(data.support)) { const y = 178 - (data.support - min) / Math.max(1, max - min) * 140; line(30, y, 575, y, '#66c391'); }
      if (Number.isFinite(data.resistance)) { const y = 178 - (data.resistance - min) / Math.max(1, max - min) * 140; line(30, y, 575, y, '#e47c72'); }
    }
  }
  return svg;
}

function renderModuleOutline(root, module, callbacks) {
  const page = el('article', 'curriculum-module-content');
  const back = el('button', 'secondary curriculum-back', '← Back to Tree'); back.type = 'button'; back.addEventListener('click', () => { selectedModuleId = null; selectedSubtopicId = null; renderCurriculumTree(root, callbacks.state(), callbacks); }); page.append(back);
  page.append(el('span', 'eyebrow', `MODULE ${String(module.number).padStart(2, '0')} · ${module.level.toUpperCase()}`), el('h2', 'curriculum-content-title', module.title));
  if (module.status === 'in-development') { page.append(el('p', 'helper', 'This syllabus module is represented in the navigation. Its lesson material has not been supplied or implemented yet.'), el('p', 'in-development-note', 'IN DEVELOPMENT · No completion, XP, homework, or assessment is recorded.')); root.replaceChildren(page); return; }
  if (module.kind === 'read-only-overview') { selectedSubtopicId = null; renderModuleContent(root, module, callbacks); return; }
  const stats = callbacks.state()?.chartAcademy?.lessons?.[module.lessonId]; const completed = (stats?.completionCount || 0) > 0; const subtopics = module.subtopics.length ? module.subtopics : [{ id: module.id + '-overview', title: 'Lesson overview' }];
  page.append(el('p', 'helper', `${completed ? 'Completed through the existing Chart Academy lesson.' : 'Available learning content.'} ${subtopics.length} subtopics · Reading itself does not grant XP.`));
  const list = el('div', 'curriculum-subtopics'); list.setAttribute('role', 'group'); list.setAttribute('aria-label', module.title + ' subtopics');
  for (const subtopic of subtopics) { const button = el('button', 'curriculum-subtopic-node', ''); button.type = 'button'; button.append(el('strong', null, subtopic.title), el('small', null, completed ? 'Covered by completed lesson' : 'Open educational content')); button.addEventListener('click', () => { selectedSubtopicId = subtopic.id; renderCurriculumTree(root, callbacks.state(), callbacks); }); list.append(button); }
  page.append(list); root.replaceChildren(page);
}

function renderModuleContent(root, module, callbacks) {
  const page = el('article', 'curriculum-module-content');
  const back = el('button', 'secondary curriculum-back', '← Back to Subtopics'); back.type = 'button'; back.addEventListener('click', () => { selectedSubtopicId = null; renderCurriculumTree(root, callbacks.state(), callbacks); }); page.append(back);
  const tag = el('span', 'eyebrow', `MODULE ${String(module.number).padStart(2, '0')} · ${module.level.toUpperCase()} · ${module.status === 'available' ? 'AVAILABLE' : 'IN DEVELOPMENT'}`); page.append(tag);
  const subtopic = module.subtopics.find((item) => item.id === selectedSubtopicId);
  page.append(el('h2', 'curriculum-content-title', subtopic ? `${module.title} · ${subtopic.title}` : module.title));
  if (module.status === 'in-development') {
    page.append(el('p', 'helper', 'This syllabus module is represented in the navigation. Its lesson material has not been supplied or implemented yet.'));
    page.append(el('p', 'in-development-note', 'IN DEVELOPMENT · No completion, XP, homework, or assessment is recorded.'));
    root.replaceChildren(page); return;
  }
  if (module.kind === 'read-only-overview') {
    page.append(el('p', 'curriculum-content-intro', module.content.summary));
    const diagram = el('div', 'integrated-analysis-diagram');
    for (const label of ['Chart Analysis', 'Technical Analysis', 'Fundamental Analysis', 'Risk Analysis']) diagram.append(el('span', 'integrated-analysis-node', label));
    page.append(diagram, el('p', 'helper', module.content.note)); root.replaceChildren(page); return;
  }
  const content = module.content; const objectives = content.objectives || []; const allQuestions = content.questions || []; const chart = miniChart(module); const instrument = 'BTC';
  const sections = [
    ['A · Concept', content.summary],
    ['B · Intuition', subtopic ? `This part of the lesson focuses on ${subtopic.title.toLowerCase()}.` : objectives.length ? `This module focuses on ${objectives.join('; ').toLowerCase()}.` : content.summary],
    ['C · Visual Explanation', null],
    ['D · Market Application', 'Use the fictional chart to describe the observed sample. It is not a current market quote or a prediction.'],
    ['E · Calculations', Object.values(content.charts).some((item) => item.candles) ? 'For an OHLC candle: body range = |close − open|; full range = high − low. Values shown below are illustrative.' : 'No standalone calculation formula is included in the existing lesson content for this module.'],
    ['F · How It Works', subtopic?.title || objectives.join(' · ')],
    ['G · Interpretation', allQuestions.map((item) => item.explanation).join(' ')],
    ['H · Limitations', 'These are small fictional examples. A pattern can fail; it does not guarantee a future price move.'],
    ['I · Connections', 'Continue to other modules through the tree. Existing Chart Academy lessons remain an optional separate activity.'],
  ];
  for (const [title, text] of sections) {
    const section = el('section', 'curriculum-content-section'); section.append(el('h3', null, title));
    if (title.startsWith('C ·') && chart) { const caption = el('p', 'helper', Object.values(content.charts)[0].title + ' · fictional educational data'); section.append(caption, chart); }
    else if (text) section.append(el('p', null, text));
    page.append(section);
  }
  if (module.lessonId) { const actions = el('div', 'curriculum-content-actions'); const academy = el('button', 'secondary', 'Open optional Chart Academy'); academy.type = 'button'; academy.addEventListener('click', () => callbacks.openLesson(module.lessonId)); const terminal = el('button', 'primary', 'Explore in Practice Terminal'); terminal.type = 'button'; terminal.addEventListener('click', () => callbacks.openTerminal(module.chartLink || { instrumentId: instrument, tool: 'crosshair' })); actions.append(academy, terminal); }
  root.replaceChildren(page);
}

export function renderCurriculumTree(root, state, callbacks) {
  if (!root) return;
  if (selectedModuleId) { const module = CURRICULUM_MODULES.find((item) => item.id === selectedModuleId); if (module) { if (selectedSubtopicId || module.kind === 'read-only-overview') renderModuleContent(root, module, callbacks); else renderModuleOutline(root, module, callbacks); return; } }
  const branches = getCurriculumProgress(state); const tree = el('div', 'curriculum-tree');
  const header = el('div', 'curriculum-map-header'); header.append(el('span', 'eyebrow', `CURRICULUM ${'2.0'}`), el('h2', null, 'Choose your learning path'), el('p', 'helper', 'Three connected branches · Beginner to Advanced · unfinished syllabus content is clearly labelled.'));
  const start = el('button', 'curriculum-root-node', started ? '◉  Learning Paths' : '◉  Start Learning'); start.type = 'button'; start.setAttribute('aria-expanded', String(started)); start.addEventListener('click', () => { started = !started; if (!started) { branchId = null; levelName = null; } renderCurriculumTree(root, state, callbacks); });
  tree.append(header, start);
  const branchList = el('div', 'curriculum-branches'); branchList.setAttribute('role', 'group'); branchList.setAttribute('aria-label', 'Analysis branches');
  for (const branch of branches) {
    const item = el('div', 'curriculum-branch' + (branch.id === branchId ? ' is-selected' : '')); const button = el('button', 'curriculum-node', ''); button.type = 'button'; button.setAttribute('aria-expanded', String(branch.id === branchId)); if (branch.id === branchId) button.setAttribute('aria-controls', 'branch-children-' + branch.id);
    const head = el('span', 'curriculum-node-status', `${branch.completedCount}/${branch.availableCount} available · ${branch.percent}%`); button.append(el('strong', 'curriculum-node-title', branch.title), head, el('small', null, `${branch.totalCount} syllabus modules · ${branch.modules.filter((item) => item.status === 'in-development').length} in development`)); button.addEventListener('click', () => { branchId = branchId === branch.id ? null : branch.id; levelName = null; selectedModuleId = null; renderCurriculumTree(root, state, callbacks); }); item.append(button);
    if (branch.id === branchId) {
      const children = el('div', 'curriculum-branch-children'); children.id = 'branch-children-' + branch.id;
      const levels = el('div', 'curriculum-levels');
      for (const level of branch.levelProgress) { const levelButton = el('button', 'curriculum-level-node' + (levelName === level.name ? ' is-selected' : ''), `${level.name} · ${level.completedCount}/${level.availableCount} available · ${level.percent}%`); levelButton.type = 'button'; levelButton.setAttribute('aria-expanded', String(levelName === level.name)); levelButton.addEventListener('click', () => { levelName = levelName === level.name ? null : level.name; selectedModuleId = null; selectedSubtopicId = null; renderCurriculumTree(root, state, callbacks); }); levels.append(levelButton); }
      children.append(levels);
      if (levelName) {
        const modules = el('div', 'curriculum-modules');
        const matches = branch.levelProgress.find((item) => item.name === levelName)?.modules || [];
        if (!matches.length) modules.append(el('p', 'in-development-note', `${levelName} · syllabus content is in development.`));
        for (const module of matches) { const done = module.lessonId && (state?.chartAcademy?.lessons?.[module.lessonId]?.completionCount || 0) > 0; const node = el('button', 'curriculum-module-node ' + module.status, ''); node.type = 'button'; node.append(el('span', 'curriculum-module-number', `M${String(module.number).padStart(2, '0')}`), el('span', 'curriculum-module-label', module.title), el('small', 'curriculum-module-state', module.status === 'available' ? (done ? 'Complete · review topics' : 'Open subtopics') : 'In Development')); node.addEventListener('click', () => { selectedModuleId = module.id; selectedSubtopicId = null; renderCurriculumTree(root, state, callbacks); }); modules.append(node); }
        children.append(modules);
      }
      item.append(children);
    }
    branchList.append(item);
  }
  if (started) {
    tree.append(branchList);
    const overview = CURRICULUM_MODULES.find((item) => item.number === 24); const overviewButton = el('button', 'secondary integrated-overview-link', 'Optional read-only overview · Module 24'); overviewButton.type = 'button'; overviewButton.addEventListener('click', () => { selectedModuleId = overview.id; selectedSubtopicId = null; renderCurriculumTree(root, state, callbacks); }); tree.append(overviewButton);
  }
  root.replaceChildren(tree);
}
