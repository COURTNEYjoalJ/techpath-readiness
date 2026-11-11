import { CHART_LESSON_BY_ID } from './chart-lessons.mjs';
import { MISSION_BY_ID } from './detective-scenarios.mjs';
import { MARKET_CURRICULUM } from '../curriculum/market-curriculum.mjs';

const activityKey = (ref) => ref ? ref.kind + ':' + ref.id : '';
const activityExists = (ref) => ref?.kind === 'chart-lesson'
  ? Boolean(CHART_LESSON_BY_ID[ref.id])
  : ref?.kind === 'detective-mission' ? Boolean(MISSION_BY_ID[ref.id]) : false;
const activityComplete = (state, ref) => {
  if (!ref) return false;
  if (ref.kind === 'chart-lesson') return (state?.chartAcademy?.lessons?.[ref.id]?.completionCount || 0) > 0;
  if (ref.kind === 'detective-mission') return Object.values(state?.detective?.sessions || {}).some((session) => session?.missionId === ref.id && session.phase === 'result');
  return false;
};
const activityReward = (ref) => {
  if (ref?.kind === 'chart-lesson') return CHART_LESSON_BY_ID[ref.id]?.rewardXp || 0;
  if (ref?.kind === 'detective-mission') return MISSION_BY_ID[ref.id]?.rewardXp || 0;
  return 0;
};

export function validateMarketCurriculum(curriculum = MARKET_CURRICULUM) {
  const errors = [];
  if (!curriculum || typeof curriculum !== 'object' || typeof curriculum.id !== 'string' || typeof curriculum.version !== 'string' || !Array.isArray(curriculum.chapters) || curriculum.chapters.length === 0) {
    return { valid: false, errors: ['Curriculum needs an id, version, and at least one chapter.'] };
  }
  const chapterIds = new Set();
  const contentIds = new Set();
  for (const item of curriculum.chapters) {
    if (!item || typeof item.id !== 'string' || !item.id || chapterIds.has(item.id) || contentIds.has(item.id)) errors.push('Chapter IDs must be unique, stable strings.');
    else { chapterIds.add(item.id); contentIds.add(item.id); }
    if (typeof item.title !== 'string' || !item.title || !Number.isSafeInteger(item.order) || item.order < 1) errors.push('Every chapter needs a title and positive integer order.');
    if (!Array.isArray(item.prerequisites) || !Array.isArray(item.subtopics) || item.subtopics.length === 0) errors.push('Every chapter needs prerequisite and subtopic arrays.');
    if (!item.xpReward || !['existing-activity', 'existing-activities'].includes(item.xpReward.source) || !Array.isArray(item.xpReward.activityIds)) errors.push('XP must refer to an existing validated activity.');
    const subtopicIds = new Set();
    for (const topic of item.subtopics || []) {
      if (!topic || typeof topic.id !== 'string' || !topic.id || subtopicIds.has(topic.id) || contentIds.has(topic.id)) errors.push('Chapter and subtopic IDs must be unique and stable.');
      else { subtopicIds.add(topic.id); contentIds.add(topic.id); }
      if (typeof topic.title !== 'string' || !topic.title || !Number.isSafeInteger(topic.order) || topic.order < 1) errors.push('Every subtopic needs a title and positive integer order.');
      if (!activityExists(topic.exerciseRef) || !topic.completionRef || activityKey(topic.exerciseRef) !== activityKey(topic.completionRef)) errors.push('Each available subtopic must reference the same existing activity for exercise and completion.');
      if (topic.lessonRef && !CHART_LESSON_BY_ID[topic.lessonRef]) errors.push('Lesson references must use an existing Chart Academy lesson ID.');
    }
    if (item.xpReward?.activityIds && item.xpReward.activityIds.some((id) => !activityExists({ kind: CHART_LESSON_BY_ID[id] ? 'chart-lesson' : 'detective-mission', id }))) errors.push('XP reward activity references must exist.');
  }
  for (const item of curriculum.chapters) for (const prerequisite of item.prerequisites || []) if (!chapterIds.has(prerequisite) || prerequisite === item.id) errors.push('Prerequisites must reference another chapter in this curriculum.');
  const byId = new Map((curriculum.chapters || []).map((item) => [item.id, item]));
  const visiting = new Set();
  const visited = new Set();
  const visit = (id) => {
    if (visiting.has(id)) return false;
    if (visited.has(id)) return true;
    visiting.add(id);
    for (const prerequisite of byId.get(id)?.prerequisites || []) if (byId.has(prerequisite) && !visit(prerequisite)) return false;
    visiting.delete(id);
    visited.add(id);
    return true;
  };
  for (const item of curriculum.chapters) if (!visit(item.id)) { errors.push('Chapter prerequisites cannot contain a cycle.'); break; }
  return { valid: errors.length === 0, errors };
}

export function getLearningTreeModel(state, curriculum = MARKET_CURRICULUM) {
  const validation = validateMarketCurriculum(curriculum);
  if (!validation.valid) return { valid: false, errors: validation.errors, chapters: [], currentChapterId: null, completedChapters: 0, totalChapters: 0 };
  const raw = curriculum.chapters.slice().sort((a, b) => a.order - b.order).map((chapter) => {
    const activities = [...new Map(chapter.subtopics.map((topic) => [activityKey(topic.completionRef), topic.completionRef])).values()];
    const completedActivityIds = activities.filter((ref) => activityComplete(state, ref)).map(activityKey);
    const completedSubtopics = chapter.subtopics.filter((topic) => activityComplete(state, topic.completionRef)).length;
    const complete = activities.length > 0 && completedActivityIds.length === activities.length;
    const available = chapter.subtopics.filter((topic) => activityExists(topic.exerciseRef)).length;
    return {
      ...chapter,
      subtopics: chapter.subtopics.slice().sort((a, b) => a.order - b.order).map((topic) => ({
        ...topic,
        completed: activityComplete(state, topic.completionRef),
        available: activityExists(topic.exerciseRef),
        activityTitle: topic.exerciseRef.kind === 'chart-lesson' ? CHART_LESSON_BY_ID[topic.exerciseRef.id].title : MISSION_BY_ID[topic.exerciseRef.id].title,
        rewardXp: activityReward(topic.exerciseRef),
      })),
      complete,
      progress: { completed: completedActivityIds.length, total: activities.length, completedSubtopics, subtopicTotal: chapter.subtopics.length, percent: available ? Math.round(completedSubtopics / available * 100) : 0 },
      rewardXp: [...new Set(chapter.xpReward.activityIds)].reduce((sum, id) => sum + activityReward({ kind: CHART_LESSON_BY_ID[id] ? 'chart-lesson' : 'detective-mission', id }), 0),
      unlocked: false,
    };
  });
  const byId = new Map(raw.map((item) => [item.id, item]));
  for (const chapter of raw) chapter.unlocked = chapter.complete || chapter.prerequisites.every((id) => byId.get(id)?.complete === true);
  const completedChapters = raw.filter((item) => item.complete).length;
  const currentChapterId = raw.find((item) => item.unlocked && !item.complete)?.id || null;
  return {
    valid: true,
    errors: [],
    curriculumId: curriculum.id,
    version: curriculum.version,
    chapters: raw.map((chapter) => ({
      ...chapter,
      status: chapter.complete ? 'completed' : !chapter.unlocked ? 'locked' : chapter.id === currentChapterId ? 'current' : 'available',
    })),
    currentChapterId,
    completedChapters,
    totalChapters: raw.length,
  };
}