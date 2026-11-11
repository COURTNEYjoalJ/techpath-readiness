export function scoreInvestigation(mission, selectedEvidenceId, decisionId) {
  const decision = mission.decisions.find((choice) => choice.id === decisionId);
  if (!decision) return { ok: false, error: 'Choose one of the available investigation decisions.' };
  const evidencePoints = mission.evidenceScores[selectedEvidenceId] || 0;
  const decisionPoints = decision.points;
  const total = evidencePoints + decisionPoints;
  const tier = total >= 85 ? 'Careful investigator' : total >= 60 ? 'Building a sound process' : 'Review the evidence';
  return {
    ok: true,
    result: Object.freeze({
      evidencePoints,
      decisionPoints,
      total,
      tier,
      selectedEvidenceId,
      decisionId,
      decisionRationale: decision.rationale,
      evidenceRationale: selectedEvidenceId === mission.keyEvidenceId
        ? 'You selected the clue most directly relevant to the key uncertainty in this case.'
        : 'This clue adds useful context. The case also contains a more direct source for the central uncertainty.',
      resultNote: mission.resultNote,
    }),
  };
}
