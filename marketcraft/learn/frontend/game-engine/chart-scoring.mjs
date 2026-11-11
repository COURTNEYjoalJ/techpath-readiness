import { CHART_LESSON_BY_ID } from './chart-lessons.mjs';

export function scoreChartAnswers(lessonId, answers) {
  const lesson = CHART_LESSON_BY_ID[lessonId];
  if (!lesson) return { ok: false, error: 'That chart lesson is not available.' };
  if (!Array.isArray(answers) || answers.length !== lesson.questions.length) return { ok: false, error: 'Complete every question before finishing this lesson.' };
  let correct = 0;
  const evaluated = [];
  for (let index = 0; index < lesson.questions.length; index += 1) {
    const item = lesson.questions[index];
    const answer = answers[index];
    if (!answer || answer.questionId !== item.id || !item.options.some((option) => option.id === answer.answerId)) return { ok: false, error: 'One or more saved answers are invalid.' };
    const chart = lesson.charts[item.chartId];
    if (answer.pointId != null && !chart.points?.some((point) => point.id === answer.pointId) && !chart.candles?.some((candle) => candle.id === answer.pointId)) return { ok: false, error: 'Select a valid chart point before submitting this answer.' };
    if (item.requiredPointId && !answer.pointId) return { ok: false, error: 'Select a valid chart point before submitting this answer.' };
    const correctAnswer = answer.answerId === item.correctAnswerId && (!item.requiredPointId || answer.pointId === item.requiredPointId);
    if (correctAnswer) correct += 1;
    evaluated.push(Object.freeze({ questionId: item.id, answerId: answer.answerId, pointId: answer.pointId ?? null, correct: correctAnswer, explanation: item.explanation }));
  }
  return { ok: true, result: Object.freeze({ correct, total: lesson.questions.length, score: Math.round((correct / lesson.questions.length) * 100), answers: Object.freeze(evaluated) }) };
}
