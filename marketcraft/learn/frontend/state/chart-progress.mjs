import { CHART_LESSON_BY_ID } from '../game-engine/chart-lessons.mjs';
import { scoreChartAnswers } from '../game-engine/chart-scoring.mjs';

export function createInitialChartProgress() {
  return { nextSessionNumber: 1, activeSessionId: null, sessions: {}, lessons: {} };
}

export function validateChartProgress(value) {
  if (!value || typeof value !== 'object' || !Number.isSafeInteger(value.nextSessionNumber) || value.nextSessionNumber < 1 || (value.activeSessionId !== null && typeof value.activeSessionId !== 'string') || !value.sessions || typeof value.sessions !== 'object' || Array.isArray(value.sessions) || !value.lessons || typeof value.lessons !== 'object' || Array.isArray(value.lessons)) return false;
  for (const [id, session] of Object.entries(value.sessions)) {
    const lesson = CHART_LESSON_BY_ID[session?.lessonId];
    if (!lesson || id !== session.id || typeof id !== 'string' || !['playing', 'result'].includes(session.phase) || !Array.isArray(session.answers) || session.answers.length > lesson.questions.length || !Number.isFinite(session.startedAt)) return false;
    if (session.answers.some((answer, index) => { const question = lesson.questions[index]; const chart = lesson.charts[question?.chartId]; return !answer || answer.questionId !== question?.id || !question.options.some((option) => option.id === answer.answerId) || (answer.pointId !== null && answer.pointId !== undefined && !chart.points?.some((point) => point.id === answer.pointId) && !chart.candles?.some((candle) => candle.id === answer.pointId)) || (question.requiredPointId && !answer.pointId); })) return false;
    if (session.phase === 'playing' && session.answers.length >= lesson.questions.length) return false;
    if (session.phase === 'result' && (!Number.isSafeInteger(session.score) || session.score < 0 || session.score > 100 || !Number.isFinite(session.completedAt) || session.answers.length !== lesson.questions.length || scoreChartAnswers(session.lessonId, session.answers).result?.score !== session.score)) return false;
    if (session.phase === 'playing' && session.selectedPointId != null) { const question = lesson.questions[session.answers.length]; const chart = lesson.charts[question?.chartId]; if (!chart || !chart.points?.some((point) => point.id === session.selectedPointId) && !chart.candles?.some((candle) => candle.id === session.selectedPointId)) return false; }
  }
  if (value.activeSessionId !== null && !value.sessions[value.activeSessionId]) return false;
  for (const [lessonId, stats] of Object.entries(value.lessons)) {
    if (!CHART_LESSON_BY_ID[lessonId] || !stats || !Number.isSafeInteger(stats.completionCount) || stats.completionCount < 0 || !Number.isSafeInteger(stats.bestScore) || stats.bestScore < 0 || stats.bestScore > 100 || typeof stats.rewardClaimed !== 'boolean' || (stats.latestSessionId !== null && value.sessions[stats.latestSessionId]?.lessonId !== lessonId)) return false;
  }
  return true;
}

export function sanitizeChartProgress(value) {
  if (!value || typeof value !== 'object') return createInitialChartProgress();
  const sessions = {};
  if (value.sessions && typeof value.sessions === 'object' && !Array.isArray(value.sessions)) {
    for (const [id, session] of Object.entries(value.sessions)) {
      if (!id || !session || id !== session.id || !CHART_LESSON_BY_ID[session.lessonId] || !['playing', 'result'].includes(session.phase) || !Array.isArray(session.answers)) continue;
      const lesson = CHART_LESSON_BY_ID[session.lessonId];
      const answers = session.answers.slice(0, lesson.questions.length).filter((answer, index) => { const question = lesson.questions[index]; const chart = lesson.charts[question?.chartId]; return answer && answer.questionId === question?.id && question.options.some((option) => option.id === answer.answerId) && (answer.pointId == null || chart.points?.some((point) => point.id === answer.pointId) || chart.candles?.some((candle) => candle.id === answer.pointId)) && (!question.requiredPointId || answer.pointId != null); }).map((answer) => ({ questionId: answer.questionId, answerId: answer.answerId, pointId: answer.pointId ?? null }));
      const currentQuestion = lesson.questions[answers.length]; const currentChart = lesson.charts[currentQuestion?.chartId];
      const selectedPointId = session.selectedPointId != null && (currentChart?.points?.some((point) => point.id === session.selectedPointId) || currentChart?.candles?.some((candle) => candle.id === session.selectedPointId)) ? session.selectedPointId : null;
      const candidate = { id, lessonId: session.lessonId, phase: session.phase, answers, selectedPointId, startedAt: Number.isFinite(session.startedAt) ? session.startedAt : Date.now() };
      if (candidate.phase === 'result' && answers.length === lesson.questions.length && Number.isSafeInteger(session.score) && session.score >= 0 && session.score <= 100 && Number.isFinite(session.completedAt) && scoreChartAnswers(session.lessonId, answers).result?.score === session.score) Object.assign(candidate, { score: session.score, completedAt: session.completedAt, rewardEarned: session.rewardEarned === true });
      else if (candidate.phase === 'result') continue;
      else if (answers.length >= lesson.questions.length) continue;
      sessions[id] = candidate;
    }
  }
  const lessons = {};
  if (value.lessons && typeof value.lessons === 'object' && !Array.isArray(value.lessons)) {
    for (const [lessonId, stats] of Object.entries(value.lessons)) {
      if (!CHART_LESSON_BY_ID[lessonId] || !stats || !Number.isSafeInteger(stats.completionCount) || stats.completionCount < 0 || !Number.isSafeInteger(stats.bestScore) || stats.bestScore < 0 || stats.bestScore > 100 || typeof stats.rewardClaimed !== 'boolean') continue;
      const latestSessionId = stats.latestSessionId === null || sessions[stats.latestSessionId]?.lessonId === lessonId ? stats.latestSessionId : null;
      lessons[lessonId] = { completionCount: stats.completionCount, bestScore: stats.bestScore, rewardClaimed: stats.rewardClaimed, latestSessionId };
    }
  }
  const maxSession = Math.max(0, ...Object.keys(sessions).map((id) => Number(id.match(/-(\d+)$/)?.[1] || 0)));
  const cleaned = { nextSessionNumber: Math.max(Number.isSafeInteger(value.nextSessionNumber) && value.nextSessionNumber > 0 ? value.nextSessionNumber : 1, maxSession + 1), activeSessionId: sessions[value.activeSessionId] ? value.activeSessionId : null, sessions, lessons };
  return validateChartProgress(cleaned) ? cleaned : createInitialChartProgress();
}
