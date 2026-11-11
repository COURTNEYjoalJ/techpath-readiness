export const LEARNING_PREFERENCE_KEY = 'marketcraft.learning.preference.v1';
export const LEARNING_VERSIONS = Object.freeze(['v1', 'v1.1']);

export function loadLearningPreferences(storage) {
  try {
    const value = JSON.parse(storage?.getItem(LEARNING_PREFERENCE_KEY) || '{}');
    return Object.freeze({ version: LEARNING_VERSIONS.includes(value.version) ? value.version : 'v1', moduleId: typeof value.moduleId === 'string' ? value.moduleId : null, subtopicId: typeof value.subtopicId === 'string' ? value.subtopicId : null, view: ['home', 'tree', 'stage', 'complete'].includes(value.view) ? value.view : 'home', stage: ['understand', 'observe', 'decide', 'consequence', 'learn'].includes(value.stage) ? value.stage : 'understand' });
  } catch { return Object.freeze({ version: 'v1', moduleId: null, subtopicId: null, view: 'home', stage: 'understand' }); }
}

export function saveLearningPreferences(storage, patch) {
  const previous = loadLearningPreferences(storage);
  const next = { ...previous, ...patch };
  if (!LEARNING_VERSIONS.includes(next.version)) next.version = 'v1';
  try { storage?.setItem(LEARNING_PREFERENCE_KEY, JSON.stringify(next)); return true; }
  catch { return false; }
}
