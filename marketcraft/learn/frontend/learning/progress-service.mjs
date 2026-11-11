export const LEARNING_PROGRESS_KEY = 'marketcraft.learning.v1.1.progress.v1';
export const LEARNING_STAGES = Object.freeze(['understand', 'observe', 'decide', 'consequence', 'learn']);

const blank = () => ({ schemaVersion: 1, topics: {} });
const validEntry = (entry) => entry && typeof entry === 'object' && Number.isSafeInteger(entry.visits) && entry.visits >= 0 && Number.isSafeInteger(entry.attempts) && entry.attempts >= 0 && (entry.currentStage == null || LEARNING_STAGES.includes(entry.currentStage));

export function loadLearningProgress(storage) {
  try {
    const data = JSON.parse(storage?.getItem(LEARNING_PROGRESS_KEY) || 'null');
    if (data?.schemaVersion !== 1 || !data.topics || typeof data.topics !== 'object' || Array.isArray(data.topics)) return blank();
    return { schemaVersion: 1, topics: Object.fromEntries(Object.entries(data.topics).filter(([, entry]) => validEntry(entry))) };
  } catch { return blank(); }
}

export function saveLearningProgress(storage, progress) {
  try { storage?.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(progress)); return true; }
  catch { return false; }
}

export function updateTopicProgress(storage, topicId, patch) {
  if (typeof topicId !== 'string' || !topicId.trim()) return loadLearningProgress(storage);
  const state = loadLearningProgress(storage);
  const before = state.topics[topicId] || { status: 'not-started', visits: 0, attempts: 0, currentStage: 'understand', selectedOptionId: null, lastScore: null, bestScore: null, demonstratedUnderstanding: false, completed: false };
  const nextEntry = { ...before, ...patch };
  if (nextEntry.currentStage != null && !LEARNING_STAGES.includes(nextEntry.currentStage)) nextEntry.currentStage = before.currentStage;
  if (nextEntry.lastScore != null && (!Number.isInteger(nextEntry.lastScore) || nextEntry.lastScore < 0 || nextEntry.lastScore > 100)) nextEntry.lastScore = before.lastScore;
  if (nextEntry.bestScore != null && (!Number.isInteger(nextEntry.bestScore) || nextEntry.bestScore < 0 || nextEntry.bestScore > 100)) nextEntry.bestScore = before.bestScore;
  state.topics[topicId] = nextEntry;
  saveLearningProgress(storage, state);
  return state;
}

export function getTopicProgress(progress, topicId) {
  const entry = progress?.topics?.[topicId];
  if (!entry) return Object.freeze({ status: 'not-started', visits: 0, attempts: 0, currentStage: 'understand', completed: false, demonstratedUnderstanding: false });
  const status = entry.completed ? (entry.visits > 1 ? 'revisited' : 'completed') : entry.visits > 0 ? 'in-progress' : 'not-started';
  return Object.freeze({ ...entry, status });
}
