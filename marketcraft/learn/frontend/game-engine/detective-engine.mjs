import { completeChallenge } from '../state/demo-state.mjs';
import { scoreInvestigation } from './scoring.mjs';
import { DETECTIVE_MISSIONS, MISSION_BY_ID } from './detective-scenarios.mjs';
import { createInitialMissionProgress } from '../state/detective-state.mjs';

const failed = (error) => ({ ok: false, error });
const missionStats = (state, missionId) => state.detective.missions[missionId] || createInitialMissionProgress();

function updateSession(state, session, stats = missionStats(state, session.missionId)) {
  return {
    ...state,
    detective: {
      ...state.detective,
      activeSessionId: session.id,
      sessions: { ...state.detective.sessions, [session.id]: session },
      missions: { ...state.detective.missions, [session.missionId]: { ...stats, latestSessionId: session.id } },
    },
  };
}

export function getActiveDetectiveSession(state) {
  const session = state?.detective?.sessions?.[state.detective.activeSessionId];
  if (!session || !MISSION_BY_ID[session.missionId]) return null;
  return { session, mission: MISSION_BY_ID[session.missionId] };
}

export function startMission(state, missionId, now = Date.now()) {
  const mission = MISSION_BY_ID[missionId];
  if (!mission) return failed('That mission is not available. Choose one from the mission board.');
  const stats = missionStats(state, missionId);
  const previous = state.detective.sessions[stats.latestSessionId];
  if (previous && previous.phase !== 'result') {
    return { ok: true, state: { ...state, detective: { ...state.detective, activeSessionId: previous.id } }, session: previous, resumed: true };
  }
  const number = state.detective.nextSessionNumber;
  const session = {
    id: `detective-${missionId}-${number}`,
    missionId,
    phase: 'briefing',
    inspectedEvidenceIds: [],
    selectedEvidenceId: null,
    decisionId: null,
    score: null,
    startedAt: now,
    completedAt: null,
    rewardGranted: false,
    rewardEarned: false,
  };
  const updated = updateSession(state, session);
  const nextState = { ...updated, detective: { ...updated.detective, nextSessionNumber: number + 1 } };
  return { ok: true, state: nextState, session, resumed: false };
}

export function beginInvestigation(state) {
  const active = getActiveDetectiveSession(state);
  if (!active) return failed('Start a mission before beginning an investigation.');
  if (active.session.phase !== 'briefing') return failed('This mission has already left its briefing.');
  const session = { ...active.session, phase: 'investigation' };
  return { ok: true, state: updateSession(state, session), session };
}

export function inspectEvidence(state, evidenceId) {
  const active = getActiveDetectiveSession(state);
  if (!active || active.session.phase !== 'investigation') return failed('Open an investigation before inspecting evidence.');
  if (!active.mission.evidence.some((item) => item.id === evidenceId)) return failed('That evidence is not part of this mission.');
  const inspectedEvidenceIds = active.session.inspectedEvidenceIds.includes(evidenceId)
    ? active.session.inspectedEvidenceIds
    : [...active.session.inspectedEvidenceIds, evidenceId];
  const session = { ...active.session, inspectedEvidenceIds };
  return { ok: true, state: updateSession(state, session), session };
}

export function selectKeyEvidence(state, evidenceId) {
  const active = getActiveDetectiveSession(state);
  if (!active || active.session.phase !== 'investigation') return failed('Open an investigation before selecting evidence.');
  if (!active.session.inspectedEvidenceIds.includes(evidenceId)) return failed('Inspect that evidence card before selecting it as your key clue.');
  const session = { ...active.session, selectedEvidenceId: evidenceId };
  return { ok: true, state: updateSession(state, session), session };
}

export function selectDecision(state, decisionId) {
  const active = getActiveDetectiveSession(state);
  if (!active || active.session.phase !== 'investigation') return failed('Open an investigation before choosing a decision.');
  if (active.session.inspectedEvidenceIds.length < active.mission.minimumEvidence || !active.session.selectedEvidenceId) return failed('Inspect enough evidence and select a key clue before choosing a decision.');
  if (!active.mission.decisions.some((choice) => choice.id === decisionId)) return failed('Choose one of the available investigation decisions.');
  const session = { ...active.session, decisionId };
  return { ok: true, state: updateSession(state, session), session };
}

export function submitDecision(state, now = Date.now()) {
  const active = getActiveDetectiveSession(state);
  if (!active || active.session.phase !== 'investigation') return failed('There is no open decision to submit.');
  if (active.session.inspectedEvidenceIds.length < active.mission.minimumEvidence) return failed(`Inspect at least ${active.mission.minimumEvidence} evidence cards before deciding.`);
  if (!active.session.selectedEvidenceId) return failed('Choose the key evidence you think matters most.');
  if (!active.session.decisionId) return failed('Choose an investigation decision before submitting.');
  const scored = scoreInvestigation(active.mission, active.session.selectedEvidenceId, active.session.decisionId);
  if (!scored.ok) return scored;

  const challengeId = `market-detective:${active.mission.id}`;
  const stateWithReward = completeChallenge(state, challengeId, active.mission.rewardXp);
  const rewardEarned = stateWithReward.xp > state.xp;
  const session = {
    ...active.session,
    phase: 'result',
    decisionId: active.session.decisionId,
    score: scored.result,
    completedAt: now,
    rewardGranted: true,
    rewardEarned,
  };
  const previousStats = missionStats(state, active.mission.id);
  const stats = {
    ...previousStats,
    completionCount: previousStats.completionCount + 1,
    bestScore: Math.max(previousStats.bestScore, scored.result.total),
    rewardClaimed: previousStats.rewardClaimed || rewardEarned,
  };
  return { ok: true, state: updateSession(stateWithReward, session, stats), session, result: scored.result, rewardEarned, rewardXp: rewardEarned ? active.mission.rewardXp : 0 };
}

export function listMissions() {
  return DETECTIVE_MISSIONS;
}
