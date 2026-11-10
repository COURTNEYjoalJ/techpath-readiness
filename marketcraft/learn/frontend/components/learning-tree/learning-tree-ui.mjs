import { getLearningTreeModel } from '../../game-engine/learning-tree.mjs';

let selectedChapterId = null;
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

export function renderLearningTree(root, state, onOpenActivity) {
  if (!root) return;
  const model = getLearningTreeModel(state);
  root.replaceChildren();
  if (!model.valid) {
    const message = element('p', 'tree-error', 'The learning map is unavailable because its curriculum data needs review.');
    message.setAttribute('role', 'status');
    root.append(message);
    return;
  }
  if (!model.chapters.some((item) => item.id === selectedChapterId && item.unlocked)) selectedChapterId = model.currentChapterId || model.chapters.find((item) => item.unlocked)?.id || null;

  const summary = element('div', 'learning-tree-summary');
  const summaryCopy = element('div');
  summaryCopy.append(element('span', 'eyebrow', 'YOUR LEARNING JOURNEY'));
  summaryCopy.append(element('h2', 'learning-tree-title', 'Grow your market knowledge'));
  summaryCopy.append(element('p', 'learning-tree-intro', 'Follow connected chapters, explore their subtopics, and continue in the existing learning activities.'));
  summary.append(summaryCopy);
  const progress = element('p', 'learning-tree-progress', model.completedChapters + ' of ' + model.totalChapters + ' chapters complete');
  progress.setAttribute('aria-live', 'polite');
  summary.append(progress);
  root.append(summary);

  const shortcuts = element('div', 'learning-tree-shortcuts');
  const chartShortcut = element('button', 'secondary tree-shortcut', 'Open Chart Academy');
  chartShortcut.type = 'button';
  chartShortcut.addEventListener('click', () => onOpenActivity({ kind: 'chart-board' }));
  const detectiveShortcut = element('button', 'secondary tree-shortcut', 'Open Market Detective');
  detectiveShortcut.type = 'button';
  detectiveShortcut.addEventListener('click', () => onOpenActivity({ kind: 'detective-board' }));
  shortcuts.append(chartShortcut, detectiveShortcut);
  root.append(shortcuts);

  const list = element('ol', 'learning-tree-list');
  list.setAttribute('aria-label', 'Market learning journey');
  for (const [index, chapter] of model.chapters.entries()) {
    const item = element('li', 'tree-chapter ' + (index % 2 === 0 ? 'side-left' : 'side-right'));
    item.dataset.status = chapter.status;
    const marker = element('span', 'tree-stem-marker', chapter.status === 'completed' ? '✓' : chapter.status === 'locked' ? '⌑' : String(index + 1));
    marker.setAttribute('aria-hidden', 'true');
    item.append(marker);

    const branch = element('div', 'tree-branch-content');
    const node = element('button', 'tree-chapter-node', '');
    node.type = 'button';
    node.disabled = !chapter.unlocked;
    node.setAttribute('aria-expanded', String(chapter.id === selectedChapterId));
    if (chapter.id === selectedChapterId && chapter.unlocked) node.setAttribute('aria-controls', 'tree-details-' + chapter.id);
    node.setAttribute('aria-label', chapter.title + ', ' + chapter.status + ', ' + chapter.progress.completed + ' of ' + chapter.progress.total + ' activities complete');
    node.dataset.chapterId = chapter.id;
    const nodeTop = element('span', 'tree-node-top');
    nodeTop.append(element('span', 'tree-node-kicker', chapter.difficulty + ' · CHAPTER ' + String(index + 1).padStart(2, '0')));
    nodeTop.append(element('span', 'tree-status', chapter.status === 'completed' ? '✓ Completed' : chapter.status === 'current' ? 'Current' : chapter.status === 'locked' ? 'Locked' : 'Unlocked'));
    node.append(nodeTop);
    node.append(element('strong', 'tree-node-title', chapter.icon + ' ' + chapter.title));
    node.append(element('span', 'tree-node-description', chapter.description));
    const meter = element('span', 'tree-meter');
    const fill = element('span', 'tree-meter-fill');
    fill.style.width = chapter.progress.percent + '%';
    meter.append(fill);
    node.append(meter);
    node.append(element('span', 'tree-progress-label', chapter.progress.completed + ' of ' + chapter.progress.total + ' existing activities complete · ' + chapter.rewardXp + ' XP through existing activities'));
    node.addEventListener('click', () => {
      if (!chapter.unlocked) return;
      selectedChapterId = chapter.id;
      renderLearningTree(root, state, onOpenActivity);
      root.querySelector('[data-chapter-id="' + chapter.id + '"]')?.focus();
    });
    branch.append(node);

    if (chapter.id === selectedChapterId && chapter.unlocked) {
      const details = element('section', 'tree-chapter-details');
      details.id = 'tree-details-' + chapter.id;
      details.setAttribute('aria-labelledby', 'tree-heading-' + chapter.id);
      details.append(element('h3', 'tree-details-title', chapter.title));
      details.append(element('p', 'tree-details-description', chapter.description));
      details.append(element('p', 'tree-details-meta', chapter.difficulty + ' · About ' + chapter.estimatedMinutes + ' minutes · ' + chapter.progress.completed + '/' + chapter.progress.total + ' existing activities complete'));
      const topicList = element('ol', 'tree-subtopic-list');
      topicList.setAttribute('aria-label', chapter.title + ' subtopics');
      for (const topic of chapter.subtopics) {
        const topicItem = element('li', 'tree-subtopic-item');
        const topicButton = element('button', 'tree-subtopic' + (topic.completed ? ' is-complete' : ''), '');
        topicButton.type = 'button';
        topicButton.disabled = !topic.available;
        topicButton.setAttribute('aria-label', topic.title + (topic.completed ? ', completed' : ', available'));
        const glyph = element('span', 'tree-subtopic-status', topic.completed ? '✓' : '↗');
        glyph.setAttribute('aria-hidden', 'true');
        const copy = element('span', 'tree-subtopic-copy');
        copy.append(element('strong', 'tree-subtopic-title', topic.title));
        copy.append(element('span', 'tree-subtopic-description', topic.description));
        copy.append(element('small', 'tree-subtopic-meta', topic.available ? 'Open ' + topic.activityTitle + ' · reward follows the existing completion rule' : 'Coming soon'));
        topicButton.append(glyph, copy);
        topicButton.addEventListener('click', () => {
          if (topic.available) onOpenActivity(topic.exerciseRef);
        });
        topicItem.append(topicButton);
        topicList.append(topicItem);
      }
      details.append(topicList);
      branch.append(details);
    } else if (!chapter.unlocked) {
      branch.append(element('p', 'tree-locked-note', 'Complete the required chapter to unlock this branch. The Chart Academy and Detective remain available from the shortcuts above.'));
    }
    item.append(branch);
    list.append(item);
  }
  root.append(list);
  const note = element('p', 'tree-reward-note', 'XP is awarded only by validated Chart Academy lessons and Detective missions. Selecting a tree node never grants XP.');
  root.append(note);
}
