const candle = (id, open, high, low, close) => Object.freeze({ id, open, high, low, close });
const point = (id, value) => Object.freeze({ id, value });
const question = (id, prompt, options, correctAnswerId, explanation, extra = {}) => Object.freeze({
  id, prompt, options: Object.freeze(options.map(([optionId, label]) => Object.freeze({ id: optionId, label }))), correctAnswerId, explanation, ...extra,
});

const lessons = [
  Object.freeze({
    id: 'candlesticks', title: 'Understanding Candlesticks', difficulty: 'Beginner', rewardXp: 50,
    summary: 'Read open, high, low and close, then distinguish candle bodies from wicks.',
    objectives: ['Read an OHLC candle', 'Identify bullish and bearish closes', 'Recognize the body and wicks'],
    charts: Object.freeze({
      candles: Object.freeze({ type: 'candlestick', title: 'Illustrative daily candles', candles: Object.freeze([
        candle('candle-1', 48, 54, 45, 52), candle('candle-2', 52, 57, 49, 50), candle('candle-3', 50, 61, 47, 59), candle('candle-4', 59, 62, 53, 55), candle('candle-5', 55, 60, 51, 58),
      ]) }),
    }),
    questions: Object.freeze([
      question('classify', 'Select candle 3, inspect its OHLC values, then classify its close.', [['bullish', 'Bullish: it closed above its open'], ['bearish', 'Bearish: it closed below its open']], 'bullish', 'Candle 3 opened at 50 and closed at 59. Because the close is higher than the open, this candle is bullish. That describes this interval only; it does not predict the next one.', { chartId: 'candles', requiredPointId: 'candle-3' }),
      question('body-wick', 'Which part shows the distance between open and close?', [['body', 'The candle body'], ['wick', 'The wicks']], 'body', 'The body spans the open and close. Wicks extend from the body to the high and low reached during the interval.', { chartId: 'candles' }),
      question('ohlc-high', 'On candle 3, which value is the high?', [['47', '47'], ['50', '50'], ['59', '59'], ['61', '61']], '61', 'The high is the highest price reached during the interval, 61 here. The low is 47, the open is 50, and the close is 59.', { chartId: 'candles', requiredPointId: 'candle-3' }),
    ]),
  }),
  Object.freeze({
    id: 'market-trends', title: 'Trends and Market Direction', difficulty: 'Beginner · Intermediate', rewardXp: 75,
    summary: 'Compare highs and lows while leaving room for sideways movement and uncertainty.',
    objectives: ['Compare successive highs and lows', 'Distinguish up, down and sideways movement', 'Describe uncertainty honestly'],
    charts: Object.freeze({
      uptrend: Object.freeze({ type: 'line', title: 'Sequence A · fictional prices', points: Object.freeze([point('u1', 20), point('u2', 24), point('u3', 22), point('u4', 27), point('u5', 25), point('u6', 31), point('u7', 29)]) }),
      downtrend: Object.freeze({ type: 'line', title: 'Sequence B · fictional prices', points: Object.freeze([point('d1', 34), point('d2', 30), point('d3', 32), point('d4', 26), point('d5', 28), point('d6', 22), point('d7', 24)]) }),
      sideways: Object.freeze({ type: 'line', title: 'Sequence C · fictional prices', points: Object.freeze([point('s1', 28), point('s2', 31), point('s3', 27), point('s4', 30), point('s5', 26), point('s6', 29), point('s7', 28)]) }),
    }),
    questions: Object.freeze([
      question('uptrend', 'Sequence A makes generally higher highs and higher lows. Which description fits best?', [['up', 'Uptrend in this sample'], ['down', 'Downtrend'], ['sideways', 'Sideways only']], 'up', 'The successive swing highs and lows generally rise, which supports describing this sample as an uptrend. It does not guarantee future direction.', { chartId: 'uptrend' }),
      question('downtrend', 'Sequence B makes generally lower highs and lower lows. Which description fits best?', [['up', 'Uptrend'], ['down', 'Downtrend in this sample'], ['sideways', 'Sideways only']], 'down', 'The successive swing highs and lows generally fall, which supports describing this sample as a downtrend. A trend can pause or reverse.', { chartId: 'downtrend' }),
      question('uncertainty', 'Sequence C moves within a loose range. What is the most careful conclusion?', [['sideways', 'Mostly sideways in this sample; direction is uncertain'], ['breakout', 'A breakout is guaranteed next'], ['up', 'A new uptrend is certain']], 'sideways', 'The values fluctuate around a range without a clear sequence of higher or lower swing points. Sideways movement is a reasonable description, and the next move remains uncertain.', { chartId: 'sideways' }),
    ]),
  }),
  Object.freeze({
    id: 'support-resistance', title: 'Support, Resistance, and Risk', difficulty: 'Intermediate', rewardXp: 100,
    summary: 'Mark possible price zones, then assess a breakout without treating patterns as guarantees.',
    objectives: ['Identify repeated reaction zones', 'Distinguish support and resistance', 'Plan for false breakouts and downside risk'],
    charts: Object.freeze({
      range: Object.freeze({ type: 'line', title: 'Range and breakout · fictional prices', points: Object.freeze([
        point('r1', 42), point('r2', 50), point('r3', 45), point('r4', 53), point('r5', 44), point('r6', 51), point('r7', 46), point('r8', 55), point('r9', 47), point('r10', 61),
      ]), support: 44, resistance: 52 }),
    }),
    questions: Object.freeze([
      question('support', 'Tap a data point near the repeated lower reaction area (about 44–47). Which zone may act as support in this sample?', [['support', 'The lower zone around 44–47'], ['resistance', 'The upper zone around 50–53']], 'support', 'Several sample lows cluster near 44–47, so that area may be called a support zone for this historical sample. It can fail, and it is not a guaranteed floor.', { chartId: 'range', requiredPointId: 'r5' }),
      question('resistance', 'Tap a point near the repeated upper reaction area (about 50–53). Which zone may act as resistance?', [['support', 'The lower zone around 44–47'], ['resistance', 'The upper zone around 50–53']], 'resistance', 'Several earlier highs cluster near 50–53, so that area may be called resistance in this sample. A later move above it does not alone confirm a lasting breakout.', { chartId: 'range', requiredPointId: 'r4' }),
      question('false-breakout', 'The last point briefly moves above the range, then returns inside. What is the most risk-aware reading?', [['false-breakout', 'A possible false breakout; wait for context and define downside risk'], ['guaranteed', 'The price must continue upward'], ['buy-all', 'Use the full virtual balance immediately']], 'false-breakout', 'A brief move above a range can fail and return inside. No chart pattern guarantees a result. Consider confirmation, position size and a defined risk limit; waiting is also a valid choice.', { chartId: 'range', requiredPointId: 'r10' }),
    ]),
  }),
];

export const CHART_LESSONS = Object.freeze(lessons);
export const CHART_LESSON_BY_ID = Object.freeze(Object.fromEntries(CHART_LESSONS.map((item) => [item.id, item])));
