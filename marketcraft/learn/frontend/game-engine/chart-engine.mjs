import { completeChallenge } from '../state/demo-state.mjs';
import { scoreChartAnswers } from './chart-scoring.mjs';
import { CHART_LESSON_BY_ID } from './chart-lessons.mjs';
import { createInitialChartProgress } from '../state/chart-progress.mjs';

const fail = (error) => ({ ok: false, error });
const statsFor = (state, lessonId) => state.chartAcademy.lessons[lessonId] || { completionCount: 0, bestScore: 0, rewardClaimed: false, latestSessionId: null };

function saveSession(state, session, stats = statsFor(state, session.lessonId)) {
  return { ...state, chartAcademy: { ...state.chartAcademy, activeSessionId: session.id, sessions: { ...state.chartAcademy.sessions, [session.id]: session }, lessons: { ...state.chartAcademy.lessons, [session.lessonId]: { ...stats, latestSessionId: session.id } } } };
}

export function startChartLesson(state, lessonId, now = Date.now()) {
  const lesson = CHART_LESSON_BY_ID[lessonId];
  if (!lesson) return fail('That chart lesson is not available. Choose a lesson from the academy.');
  const stats = statsFor(state, lessonId);
  const previous = state.chartAcademy.sessions[stats.latestSessionId];
  if (previous?.phase === 'playing') return { ok: true, state: { ...state, chartAcademy: { ...state.chartAcademy, activeSessionId: previous.id } }, session: previous, resumed: true };
  const number = state.chartAcademy.nextSessionNumber;
  const session = { id: `chart-${lessonId}-${number}`, lessonId, phase: 'playing', answers: [], selectedPointId: null, startedAt: now };
  const chartAcademy = { ...saveSession(state, session, stats).chartAcademy, nextSessionNumber: number + 1 };
  return { ok: true, state: { ...state, chartAcademy }, session, resumed: false };
}

export function getActiveChartSession(state) {
  const session = state?.chartAcademy?.sessions?.[state.chartAcademy.activeSessionId];
  const lesson = CHART_LESSON_BY_ID[session?.lessonId];
  return session && lesson ? { session, lesson } : null;
}

export function selectChartPoint(state, pointId) {
  const active = getActiveChartSession(state);
  if (!active || active.session.phase !== 'playing') return fail('Open a chart lesson before selecting a point.');
  const question = active.lesson.questions[active.session.answers.length];
  const chart = question && active.lesson.charts[question.chartId];
  if (!chart || ![...(chart.points || []), ...(chart.candles || [])].some((item) => item.id === pointId)) return fail('Choose a point from the current educational chart.');
  const session = { ...active.session, selectedPointId: pointId };
  return { ok: true, state: saveSession(state, session), session };
}

export function answerChartQuestion(state, answerId, now = Date.now()) {
  const active = getActiveChartSession(state);
  if (!active || active.session.phase !== 'playing') return fail('There is no active chart question to answer.');
  const question = active.lesson.questions[active.session.answers.length];
  if (!question || !question.options.some((item) => item.id === answerId)) return fail('Choose one of the available answers.');
  if (question.requiredPointId && !active.session.selectedPointId) return fail('Select a relevant point or candle on the chart first.');
  const answer = { questionId: question.id, answerId, pointId: active.session.selectedPointId };
  const answers = [...active.session.answers, answer];
  if (answers.length < active.lesson.questions.length) {
    const session = { ...active.session, answers, selectedPointId: null };
    return { ok: true, state: saveSession(state, session), session, answered: true, complete: false, feedback: { correct: answerId === question.correctAnswerId && (!question.requiredPointId || answer.pointId === question.requiredPointId), explanation: question.explanation } };
  }
  const scored = scoreChartAnswers(active.lesson.id, answers);
  if (!scored.ok) return scored;
  const challengeId = `chart-academy:${active.lesson.id}`;
  const rewardedState = completeChallenge(state, challengeId, active.lesson.rewardXp);
  const rewardEarned = rewardedState.xp > state.xp;
  const session = { ...active.session, phase: 'result', answers, selectedPointId: null, score: scored.result.score, completedAt: now, rewardEarned };
  const previousStats = statsFor(state, active.lesson.id);
  const stats = { ...previousStats, completionCount: previousStats.completionCount + 1, bestScore: Math.max(previousStats.bestScore, scored.result.score), rewardClaimed: previousStats.rewardClaimed || rewardEarned || state.completedChallenges[challengeId] === true };
  return { ok: true, state: saveSession(rewardedState, session, stats), session, answered: true, complete: true, result: scored.result, rewardEarned, rewardXp: rewardEarned ? active.lesson.rewardXp : 0 };
}

export function reviewChartSession(state, sessionId) {
  const session = state.chartAcademy.sessions[sessionId];
  if (!session || session.phase !== 'result' || !CHART_LESSON_BY_ID[session.lessonId]) return fail('That saved lesson result is not available.');
  return { ok: true, state: { ...state, chartAcademy: { ...state.chartAcademy, activeSessionId: sessionId } }, session };
}

export function returnToChartBoard(state) {
  return { ...state, chartAcademy: { ...state.chartAcademy, activeSessionId: null } };
}

export function resetChartProgress() {
  return createInitialChartProgress();
}
