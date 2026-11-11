const c = (id, label, feedback, decision, extra = {}) => Object.freeze({ id, label, feedback, decision: Object.freeze(decision), exposureUnits: extra.exposureUnits || 0, riskNote: extra.riskNote || 'This choice records a chart interpretation only; it does not place a trade.' });
const reviewRisk = Object.freeze({ maxLossCents: 20_000, maxLossBasisPoints: 200, leverageLimit: 1, entryPriceCents: 5_000, stopPriceCents: 4_600, exactFillAssumed: true });
const defaultContext = Object.freeze({ startingCapitalCents: 1_000_000, entryPriceCents: 5_000, finalPriceCents: 5_000, priceUnit: 'USD cents', execution: 'No exposure is opened in this interpretation-only scenario.' });
const rubric = Object.freeze({ weights: Object.freeze({ evidence: 40, riskAwareness: 35, uncertainty: 25 }), description: 'Decision quality is scored from evidence, risk awareness, and treatment of uncertainty. Simulated profit or loss does not affect the score.' });

export const CANDLE_SCENARIOS = Object.freeze([
  Object.freeze({
    id: 'candle-period-summary', version: '1.0.0', moduleId: 'module-03', subtopicId: 'what-is-a-candlestick', difficulty: 'Beginner', template: 'interpretation',
    fictionalMarket: 'Northstar Components · fictional ordinary shares · daily intervals', startingCapitalCents: 1_000_000,
    marketContext: 'A single completed daily candle is shown. No news or future data is provided.', evidence: Object.freeze(['O $48 · H $54 · L $45 · C $52', 'The chart interval is one fictional trading day', 'No order has been opened']),
    chartData: Object.freeze({ candles: Object.freeze([{ id: 'sample', open: 48, high: 54, low: 45, close: 52 }]) }),
    decisionOptions: Object.freeze([
      c('describe', 'Describe the four values and stop there.', 'Good separation of observed values from interpretation. The candle records one interval; it does not predict another.', { evidence: 100, riskAwareness: 95, uncertainty: 100 }),
      c('predict', 'Treat the green close as proof that tomorrow will rise.', 'The colour and close describe the completed interval only. They do not establish tomorrow’s direction.', { evidence: 45, riskAwareness: 20, uncertainty: 10 }),
      c('high-close', 'Call $54 the close because it is the highest price.', '$54 is the high. The reported close is $52; each OHLC label has a different meaning.', { evidence: 15, riskAwareness: 50, uncertainty: 50 }),
    ]),
    riskParameters: Object.freeze({ ...reviewRisk, maxLossCents: null, maxLossBasisPoints: null, execution: 'No simulated trade; the virtual capital ledger is unchanged.' }),
    marketOutcome: Object.freeze({ finalPriceCents: 5_000, description: 'No later price is revealed in an interval-summary exercise.' }),
    learningObjectives: Object.freeze(['Describe a candle as one interval summary', 'Separate observed OHLC facts from forecasts']), scoringRubric: rubric,
  }),
  Object.freeze({
    id: 'read-the-four-prices', version: '1.0.0', moduleId: 'module-03', subtopicId: 'open-high-low-close', difficulty: 'Beginner', template: 'interpretation',
    fictionalMarket: 'Aster Foods · fictional ordinary shares · 1-hour interval', startingCapitalCents: 1_000_000,
    marketContext: 'You are checking whether the OHLC row is internally consistent before discussing the candle.', evidence: Object.freeze(['O $50 · H $61 · L $47 · C $59', 'High must be at least as large as O and C', 'Low must be no greater than O and C']),
    chartData: Object.freeze({ candles: Object.freeze([{ id: 'sample', open: 50, high: 61, low: 47, close: 59 }]) }),
    decisionOptions: Object.freeze([
      c('valid', 'Accept the row: H $61, L $47, range $14, close $9 above open.', 'Correct. $61≥$59≥$50≥$47; the range is 61−47=$14 and C−O=$9.', { evidence: 100, riskAwareness: 90, uncertainty: 95 }),
      c('swap-high', 'Treat $59 as the high and $61 as the close.', 'That swaps close and high. The close is $59; the high is the maximum price, $61.', { evidence: 20, riskAwareness: 75, uncertainty: 75 }),
      c('invalid', 'Reject the row because a candle high cannot exceed its close.', 'A valid high can exceed both open and close; the wick represents the part of the range above the body.', { evidence: 25, riskAwareness: 70, uncertainty: 70 }),
    ]),
    riskParameters: Object.freeze({ ...reviewRisk, maxLossCents: null, maxLossBasisPoints: null, execution: 'Interpretation only; no trade is opened.' }),
    marketOutcome: Object.freeze({ finalPriceCents: 5_000, description: 'No later market price is simulated for this data-validation choice.' }),
    learningObjectives: Object.freeze(['Read O, H, L, and C', 'Validate OHLC ordering', 'Calculate range and endpoint change']), scoringRubric: rubric,
  }),
  Object.freeze({
    id: 'classify-the-close', version: '1.0.0', moduleId: 'module-03', subtopicId: 'bullish-bearish-candles', difficulty: 'Beginner', template: 'interpretation',
    fictionalMarket: 'Aster Foods · fictional ordinary shares · 1-hour interval', startingCapitalCents: 1_000_000,
    marketContext: 'A different candle has O $52, H $57, L $49, and C $50. Choose the most accurate description.', evidence: Object.freeze(['C $50 is below O $52', 'The high $57 does not change the open-close comparison', 'No next interval is shown']),
    chartData: Object.freeze({ candles: Object.freeze([{ id: 'sample', open: 52, high: 57, low: 49, close: 50 }]) }),
    decisionOptions: Object.freeze([
      c('bearish-descriptive', 'Call it a bearish close for this interval; make no forecast.', 'Correct. C<O, so it is a down-close. This describes the chosen interval and makes no claim about the next one.', { evidence: 100, riskAwareness: 95, uncertainty: 100 }),
      c('bullish-high', 'Call it bullish because the high reached $57.', 'The high is not the closing price. The close at $50 is below the $52 open.', { evidence: 35, riskAwareness: 70, uncertainty: 70 }),
      c('future-down', 'Call it bearish and assume the next candle must also fall.', 'The interval has a bearish close, but one candle cannot guarantee the next interval.', { evidence: 75, riskAwareness: 25, uncertainty: 10 }),
    ]),
    riskParameters: Object.freeze({ ...reviewRisk, maxLossCents: null, maxLossBasisPoints: null, execution: 'Interpretation only; no trade is opened.' }),
    marketOutcome: Object.freeze({ finalPriceCents: 5_000, description: 'No future candle is revealed; the decision is graded on accurate description.' }),
    learningObjectives: Object.freeze(['Classify using C versus O', 'Distinguish a description from a prediction']), scoringRubric: rubric,
  }),
  Object.freeze({
    id: 'measure-the-body', version: '1.0.0', moduleId: 'module-03', subtopicId: 'candle-body', difficulty: 'Beginner', template: 'calculation',
    fictionalMarket: 'Northstar Components · fictional ordinary shares · daily interval', startingCapitalCents: 1_000_000,
    marketContext: 'For O $50, H $61, L $47, C $59, calculate the candle body and keep the total range separate.', evidence: Object.freeze(['Body = |C−O|', 'Range = H−L', 'Candle values are fictional USD prices']),
    chartData: Object.freeze({ candles: Object.freeze([{ id: 'sample', open: 50, high: 61, low: 47, close: 59 }]) }),
    decisionOptions: Object.freeze([
      c('body-nine', 'Body $9; full high-low range $14.', 'Correct. |59−50|=$9 for the body; 61−47=$14 for the complete range.', { evidence: 100, riskAwareness: 90, uncertainty: 95 }),
      c('body-fourteen', 'Body $14 because high minus low is the body.', 'That is the total range. The body only spans the open and close, so it is $9.', { evidence: 20, riskAwareness: 90, uncertainty: 90 }),
      c('body-eleven', 'Body $11 because high minus open is the body.', 'The high is outside the body. The body uses the open and close: |59−50|=$9.', { evidence: 25, riskAwareness: 90, uncertainty: 90 }),
    ]),
    riskParameters: Object.freeze({ ...reviewRisk, maxLossCents: null, maxLossBasisPoints: null, execution: 'Calculation only; no trade is opened.' }),
    marketOutcome: Object.freeze({ finalPriceCents: 5_000, description: 'No market outcome is needed to validate a body calculation.' }),
    learningObjectives: Object.freeze(['Calculate body height', 'Keep body distinct from the full range']), scoringRubric: rubric,
  }),
  Object.freeze({
    id: 'measure-the-wicks', version: '1.0.0', moduleId: 'module-03', subtopicId: 'upper-lower-wicks', difficulty: 'Beginner', template: 'calculation',
    fictionalMarket: 'Northstar Components · fictional ordinary shares · daily interval', startingCapitalCents: 1_000_000,
    marketContext: 'For O $50, H $61, L $47, C $59, identify the body edges and the two wick lengths.', evidence: Object.freeze(['Upper wick = H−max(O,C)', 'Lower wick = min(O,C)−L', 'A wick length is non-negative for valid OHLC data']),
    chartData: Object.freeze({ candles: Object.freeze([{ id: 'sample', open: 50, high: 61, low: 47, close: 59 }]) }),
    decisionOptions: Object.freeze([
      c('wicks-two-three', 'Upper wick $2 and lower wick $3.', 'Correct. Upper: 61−59=$2. Lower: 50−47=$3.', { evidence: 100, riskAwareness: 90, uncertainty: 95 }),
      c('wicks-six-one', 'Upper wick $6 and lower wick $1.', 'These use the wrong candle edges. The body ends at $59 above and $50 below.', { evidence: 20, riskAwareness: 90, uncertainty: 90 }),
      c('wick-is-signal', 'A longer lower wick proves buyers will defend $47 next time.', 'The $3 lower wick is observed history, not proof of future support or intent.', { evidence: 65, riskAwareness: 20, uncertainty: 10 }),
    ]),
    riskParameters: Object.freeze({ ...reviewRisk, maxLossCents: null, maxLossBasisPoints: null, execution: 'Calculation only; no trade is opened.' }),
    marketOutcome: Object.freeze({ finalPriceCents: 5_000, description: 'No future price is inferred from the wick lengths.' }),
    learningObjectives: Object.freeze(['Calculate upper and lower wick lengths', 'Describe extremes without inferring motive']), scoringRubric: rubric,
  }),
  Object.freeze({
    id: 'capital-protection-candle', version: '1.0.0', moduleId: 'module-03', subtopicId: 'interpreting-a-candlestick', difficulty: 'Beginner', template: 'capital-protection',
    fictionalMarket: 'Northstar Components · fictional ordinary shares · USD virtual ledger', startingCapitalCents: 1_000_000,
    marketContext: 'A fictional asset has jumped in social posts, but there is no confirmed company news. One completed candle reads O $50, H $54, L $46, C $52. Decide what to do with a separate $10,000 virtual learning balance.',
    evidence: Object.freeze(['Observed candle values are illustrative: O $50 · H $54 · L $46 · C $52', 'The close is $2 above the open; the interval range is $8', 'Social posts are claims, not independently verified company news', 'Assume a follow-on simulated price of $46 after the decision', 'The calculation assumes exact fills, no fees, no tax, and no leverage']),
    chartData: Object.freeze({ candles: Object.freeze([{ id: 'decision-candle', open: 50, high: 54, low: 46, close: 52 }]) }),
    decisionOptions: Object.freeze([
      c('all-in', 'Put all $10,000 into the asset immediately.', 'This ignores the unverified claim and risks the whole scenario balance. A fortunate outcome would not make the decision process sound.', { evidence: 10, riskAwareness: 0, uncertainty: 5 }, { exposureUnits: 200, riskNote: 'At the assumed $46 outcome, the simplified loss is $800 (8% of the balance).' }),
      c('half', 'Invest $5,000 now without checking the risk.', 'Using less capital reduces this scenario’s loss, but the choice still skips evidence review and a defined loss limit.', { evidence: 35, riskAwareness: 25, uncertainty: 25 }, { exposureUnits: 100, riskNote: 'At the assumed $46 outcome, the simplified loss is $400 (4% of the balance).' }),
      c('wait-verify', 'Wait, verify the information, and set a risk plan before considering exposure.', 'Strong reasoning for the evidence available: no unsupported claim is treated as fact, and no position is required while you investigate. Waiting is not universally best; it fits this disclosed uncertainty.', { evidence: 100, riskAwareness: 100, uncertainty: 100 }, { exposureUnits: 0, riskNote: 'No position is opened; the scenario balance stays at $10,000.' }),
      c('limited-risk', 'If the setup still fits your plan, cap planned loss at $200 using 50 units from $50 to a $46 stop.', 'This uses the scenario’s 2% loss limit and a defined invalidation point. It is more disciplined than an unbounded position, though a real stop may fill worse than its stop price.', { evidence: 85, riskAwareness: 95, uncertainty: 90 }, { exposureUnits: 50, riskNote: 'Simplified exposure is $2,500. At the assumed exact $46 fill, loss is $200 (2%); real execution can differ.' }),
    ]),
    riskParameters: Object.freeze({ ...reviewRisk, startingCapitalCents: 1_000_000, maxLossCents: 20_000, maxLossBasisPoints: 200, exactFillAssumed: true, leverageLimit: 1, positionSizingFormula: 'units = floor(maxRiskCents / (entryPriceCents - stopPriceCents))', feesCents: 0, taxCents: 0 }),
    marketOutcome: Object.freeze({ finalPriceCents: 4_600, description: 'The pre-set fictional scenario falls from $50 to $46 after the decision. The same path is shown for every choice so score and profit stay separate.' }),
    learningObjectives: Object.freeze(['Separate chart facts from social claims', 'Calculate a maximum planned loss', 'Compare a prudent decision with its later outcome']), scoringRubric: rubric,
  }),
]);

export const CAPITAL_PROTECTION_SCENARIO = CANDLE_SCENARIOS.find((item) => item.id === 'capital-protection-candle');
