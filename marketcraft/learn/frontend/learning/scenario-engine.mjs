const isCents = (value) => Number.isSafeInteger(value) && value >= 0;
const clamp = (value) => Math.max(0, Math.min(100, value));

export function validateScenario(scenario) {
  const errors = [];
  if (!scenario || typeof scenario !== 'object') return { valid: false, errors: ['Scenario must be an object.'] };
  for (const key of ['id', 'version', 'moduleId', 'subtopicId', 'difficulty', 'fictionalMarket', 'marketContext']) if (typeof scenario[key] !== 'string' || !scenario[key].trim()) errors.push(`Scenario needs ${key}.`);
  if (!isCents(scenario.startingCapitalCents)) errors.push('Scenario starting virtual capital must be non-negative integer cents.');
  if (!Array.isArray(scenario.evidence) || !scenario.evidence.length || scenario.evidence.some((item) => typeof item !== 'string' || !item.trim())) errors.push('Scenario needs disclosed evidence.');
  if (!Array.isArray(scenario.decisionOptions) || scenario.decisionOptions.length < 2 || scenario.decisionOptions.length > 4) errors.push('Scenario must provide two to four decision options.');
  const optionIds = new Set();
  for (const option of scenario.decisionOptions || []) {
    if (!option?.id || optionIds.has(option.id)) errors.push('Scenario option IDs must be unique and non-empty.');
    optionIds.add(option?.id);
    if (!option?.label || !option?.feedback || !option?.riskNote) errors.push('Each decision option needs a label, feedback, and risk note.');
    for (const key of ['evidence', 'riskAwareness', 'uncertainty']) if (!Number.isFinite(option?.decision?.[key]) || option.decision[key] < 0 || option.decision[key] > 100) errors.push(`Each option needs a valid ${key} rubric score.`);
    if (!Number.isSafeInteger(option?.exposureUnits) || option.exposureUnits < 0) errors.push('Option exposure units must be a non-negative integer.');
  }
  const weights = scenario.scoringRubric?.weights;
  if (!weights || !['evidence', 'riskAwareness', 'uncertainty'].every((key) => Number.isFinite(weights[key]) && weights[key] >= 0) || Object.values(weights || {}).reduce((sum, value) => sum + value, 0) !== 100) errors.push('Scoring rubric weights must be non-negative and total 100.');
  const risk = scenario.riskParameters;
  if (!risk || !isCents(risk.entryPriceCents) || !Number.isSafeInteger(risk.leverageLimit) || risk.leverageLimit < 1) errors.push('Scenario risk parameters need a price and valid leverage limit.');
  if (!isCents(scenario.marketOutcome?.finalPriceCents) || typeof scenario.marketOutcome?.description !== 'string') errors.push('Scenario needs a deterministic market outcome.');
  for (const candle of scenario.chartData?.candles || []) {
    if (![candle.open, candle.high, candle.low, candle.close].every(Number.isFinite) || candle.high < Math.max(candle.open, candle.close) || candle.low > Math.min(candle.open, candle.close) || candle.high < candle.low) errors.push(`Chart candle ${candle.id || ''} has invalid OHLC values.`);
  }
  if (!Array.isArray(scenario.learningObjectives) || !scenario.learningObjectives.length) errors.push('Scenario needs learning objectives.');
  return { valid: errors.length === 0, errors };
}

export function calculateScenarioCapital(scenario, option) {
  const startCents = scenario.startingCapitalCents;
  const entry = scenario.riskParameters.entryPriceCents;
  const final = scenario.marketOutcome.finalPriceCents;
  const units = option.exposureUnits;
  const calculatedPnlCents = (final - entry) * units;
  const pnlCents = calculatedPnlCents === 0 ? 0 : calculatedPnlCents;
  return Object.freeze({ startCents, exposureCents: entry * units, pnlCents, endCents: startCents + pnlCents, units, assumedEntryCents: entry, assumedExitCents: final, assumptions: Object.freeze(['Fictional learning capital only', 'No fees, tax, slippage, or leverage', 'The scenario assumes a precise fill at the stated prices']) });
}

export function evaluateScenarioDecision(scenario, optionId) {
  const validation = validateScenario(scenario);
  if (!validation.valid) return Object.freeze({ ok: false, error: validation.errors.join(' ') });
  const option = scenario.decisionOptions.find((item) => item.id === optionId);
  if (!option) return Object.freeze({ ok: false, error: 'Choose one of the available scenario decisions.' });
  const { evidence, riskAwareness, uncertainty } = option.decision;
  const weights = scenario.scoringRubric.weights;
  const score = Math.round((evidence * weights.evidence + riskAwareness * weights.riskAwareness + uncertainty * weights.uncertainty) / 100);
  return Object.freeze({
    ok: true, scenarioId: scenario.id, optionId: option.id, feedback: option.feedback, riskNote: option.riskNote,
    score: clamp(score), criteria: Object.freeze({ evidence, riskAwareness, uncertainty }),
    outcome: scenario.marketOutcome, capital: calculateScenarioCapital(scenario, option),
  });
}
