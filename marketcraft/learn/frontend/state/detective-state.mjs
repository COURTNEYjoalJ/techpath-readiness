import { DETECTIVE_MISSIONS, MISSION_BY_ID } from '../game-engine/detective-scenarios.mjs';

export function createInitialDetectiveState() {
  return { nextSessionNumber: 1, activeSessionId: null, sessions: {}, missions: {} };
}

export function createInitialMissionProgress() {
  return { completionCount: 0, bestScore: 0, rewardClaimed: false, latestSessionId: null };
}

const finiteTime = (value) => Number.isFinite(value) && value >= 0;
const nonNegativeInt = (value) => Number.isSafeInteger(value) && value >= 0;
const scoreValid = (value) => Number.isInteger(value) && value >= 0 && value <= 100;

export function validateDetectiveState(value) {
  if (!value || typeof value !== 'object' || !nonNegativeInt(value.nextSessionNumber) || value.nextSessionNumber < 1) return false;
  if (value.activeSessionId !== null && typeof value.activeSessionId !== 'string') return false;
  if (!value.sessions || typeof value.sessions !== 'object' || Array.isArray(value.sessions)) return false;
  if (!value.missions || typeof value.missions !== 'object' || Array.isArray(value.missions)) return false;
  for (const [sessionId, session] of Object.entries(value.sessions)) {
    const mission = MISSION_BY_ID[session?.missionId];
    if (!mission || session.id !== sessionId || !['briefing', 'investigation', 'result'].includes(session.phase)) return false;
    if (!finiteTime(session.startedAt) || !Array.isArray(session.inspectedEvidenceIds)) return false;
    if (new Set(session.inspectedEvidenceIds).size !== session.inspectedEvidenceIds.length) return false;
    if (!session.inspectedEvidenceIds.every((id) => mission.evidence.some((evidence) => evidence.id === id))) return false;
    if (session.selectedEvidenceId !== null && !session.inspectedEvidenceIds.includes(session.selectedEvidenceId)) return false;
    if (session.decisionId !== null && !mission.decisions.some((choice) => choice.id === session.decisionId)) return false;
    if (session.phase === 'result') {
      if (!session.selectedEvidenceId || !mission.decisions.some((choice) => choice.id === session.decisionId)) return false;
      if (!session.score || !scoreValid(session.score.total) || !nonNegativeInt(session.score.evidencePoints) || !nonNegativeInt(session.score.decisionPoints) || session.score.total !== session.score.evidencePoints + session.score.decisionPoints) return false;
      if (!finiteTime(session.completedAt) || session.rewardGranted !== true || typeof session.rewardEarned !== 'boolean') return false;
    } else if (session.score !== null || session.completedAt !== null || session.rewardGranted !== false || session.rewardEarned !== false) return false;
  }
  if (value.activeSessionId !== null && !Object.hasOwn(value.sessions, value.activeSessionId)) return false;
  for (const [missionId, stats] of Object.entries(value.missions)) {
    if (!MISSION_BY_ID[missionId] || !stats || typeof stats !== 'object') return false;
    if (!nonNegativeInt(stats.completionCount) || !scoreValid(stats.bestScore) || typeof stats.rewardClaimed !== 'boolean') return false;
    if (stats.latestSessionId !== null) {
      const latest = value.sessions[stats.latestSessionId];
      if (!latest || latest.missionId !== missionId) return false;
    }
  }
  return true;
}

export function sanitizeDetectiveState(value) {
  if (!value || typeof value !== 'object' || !Number.isSafeInteger(value.nextSessionNumber) || value.nextSessionNumber < 1 || !value.sessions || typeof value.sessions !== 'object' || !value.missions || typeof value.missions !== 'object') return createInitialDetectiveState();
  const sessions = {};
  for (const [id, session] of Object.entries(value.sessions)) {
    const mission = MISSION_BY_ID[session?.missionId];
    if (!mission || id !== session.id || !['briefing', 'investigation', 'result'].includes(session.phase) || !finiteTime(session.startedAt) || !Array.isArray(session.inspectedEvidenceIds)) continue;
    const inspected = [...new Set(session.inspectedEvidenceIds.filter((evidenceId) => mission.evidence.some((item) => item.id === evidenceId)))];
    const candidate = { ...session, inspectedEvidenceIds: inspected, selectedEvidenceId: inspected.includes(session.selectedEvidenceId) ? session.selectedEvidenceId : null };
    if (candidate.phase === 'result' && (!candidate.selectedEvidenceId || !mission.decisions.some((choice) => choice.id === candidate.decisionId) || !candidate.score || !scoreValid(candidate.score.total) || !finiteTime(candidate.completedAt))) continue;
    if (candidate.phase !== 'result') Object.assign(candidate, { decisionId: mission.decisions.some((choice) => choice.id === candidate.decisionId) ? candidate.decisionId : null, score: null, completedAt: null, rewardGranted: false, rewardEarned: false });
    sessions[id] = candidate;
  }
  const missions = {};
  for (const mission of DETECTIVE_MISSIONS) {
    const stats = value.missions[mission.id];
    if (!stats || !Number.isSafeInteger(stats.completionCount) || stats.completionCount < 0 || !scoreValid(stats.bestScore) || typeof stats.rewardClaimed !== 'boolean') continue;
    if (stats.latestSessionId !== null && sessions[stats.latestSessionId]?.missionId !== mission.id) continue;
    missions[mission.id] = stats;
  }
  const activeSessionId = sessions[value.activeSessionId] ? value.activeSessionId : null;
  const cleaned = { nextSessionNumber: value.nextSessionNumber, activeSessionId, sessions, missions };
  return validateDetectiveState(cleaned) ? cleaned : createInitialDetectiveState();
}
