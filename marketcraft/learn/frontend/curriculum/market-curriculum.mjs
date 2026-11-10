export const CURRICULUM_VERSION = '1.0.0';

const activity = (kind, id) => Object.freeze({ kind, id });
const subtopic = (id, title, description, order, activityRef, lessonRef = null) => Object.freeze({
  id, title, description, order, lessonRef, exerciseRef: activityRef, completionRef: activityRef,
});
const chapter = (id, title, description, order, difficulty, icon, estimatedMinutes, prerequisites, subtopics, xpReward) => Object.freeze({
  id, title, description, order, difficulty, icon, estimatedMinutes,
  prerequisites: Object.freeze(prerequisites),
  subtopics: Object.freeze(subtopics),
  xpReward: Object.freeze(xpReward),
});

export const MARKET_CURRICULUM = Object.freeze({
  id: 'marketcraft-learning-journey',
  version: CURRICULUM_VERSION,
  title: 'Market learning journey',
  chapters: Object.freeze([
    chapter('candlestick-basics', 'Candlestick Basics', 'Learn the parts of a candle and read a fictional OHLC interval.', 1, 'Beginner', '◌', 10, [], [
      subtopic('what-is-a-candlestick', 'What is a candlestick?', 'Explore the candle as a summary of one price interval.', 1, activity('chart-lesson', 'candlesticks'), 'candlesticks'),
      subtopic('open-high-low-close', 'Open, High, Low, Close', 'Inspect the four values recorded for an interval.', 2, activity('chart-lesson', 'candlesticks'), 'candlesticks'),
      subtopic('bullish-bearish-candles', 'Bullish and bearish candles', 'Compare the open and close in the existing candle lesson.', 3, activity('chart-lesson', 'candlesticks'), 'candlesticks'),
      subtopic('candle-body', 'Candle body', 'Use the body to read the distance between open and close.', 4, activity('chart-lesson', 'candlesticks'), 'candlesticks'),
      subtopic('upper-lower-wicks', 'Upper and lower wicks', 'Inspect the high and low around a candle body.', 5, activity('chart-lesson', 'candlesticks'), 'candlesticks'),
      subtopic('interpreting-a-candlestick', 'Interpreting a candlestick', 'Practise reading the complete example without treating it as a prediction.', 6, activity('chart-lesson', 'candlesticks'), 'candlesticks'),
    ], { source: 'existing-activity', activityIds: Object.freeze(['candlesticks']) }),
    chapter('market-trends', 'Market Trends', 'Compare fictional price sequences and describe direction with care.', 2, 'Beginner · Intermediate', '⌁', 12, ['candlestick-basics'], [
      subtopic('what-is-a-market-trend', 'What is a market trend?', 'Explore how a sequence may show direction over a sample.', 1, activity('chart-lesson', 'market-trends'), 'market-trends'),
      subtopic('uptrends', 'Uptrends', 'Read a sample with generally higher highs and higher lows.', 2, activity('chart-lesson', 'market-trends'), 'market-trends'),
      subtopic('downtrends', 'Downtrends', 'Read a sample with generally lower highs and lower lows.', 3, activity('chart-lesson', 'market-trends'), 'market-trends'),
      subtopic('sideways-markets', 'Sideways markets', 'Recognize movement within a loose range.', 4, activity('chart-lesson', 'market-trends'), 'market-trends'),
      subtopic('higher-highs-higher-lows', 'Higher highs and higher lows', 'Compare successive swing points in the existing trend lesson.', 5, activity('chart-lesson', 'market-trends'), 'market-trends'),
      subtopic('lower-highs-lower-lows', 'Lower highs and lower lows', 'Compare declining swing points in the existing trend lesson.', 6, activity('chart-lesson', 'market-trends'), 'market-trends'),
      subtopic('uncertain-patterns', 'Recognizing uncertain patterns', 'Describe what the sample shows without claiming what must happen next.', 7, activity('chart-lesson', 'market-trends'), 'market-trends'),
    ], { source: 'existing-activity', activityIds: Object.freeze(['market-trends']) }),
    chapter('support-and-resistance', 'Support and Resistance', 'Explore possible reaction zones, breakouts, and risk in existing activities.', 3, 'Intermediate', '⬡', 14, ['market-trends'], [
      subtopic('understanding-support', 'Understanding support', 'Inspect repeated lower reaction areas in the fictional chart lesson.', 1, activity('chart-lesson', 'support-resistance'), 'support-resistance'),
      subtopic('understanding-resistance', 'Understanding resistance', 'Inspect repeated upper reaction areas in the fictional chart lesson.', 2, activity('chart-lesson', 'support-resistance'), 'support-resistance'),
      subtopic('identifying-price-zones', 'Identifying price zones', 'Compare groups of historical sample values rather than one exact price.', 3, activity('chart-lesson', 'support-resistance'), 'support-resistance'),
      subtopic('breakouts', 'Breakouts', 'Review what a move beyond a range can and cannot establish.', 4, activity('chart-lesson', 'support-resistance'), 'support-resistance'),
      subtopic('false-breakouts', 'False breakouts', 'Use the existing risk-aware chart exercise to question a brief move beyond a range.', 5, activity('chart-lesson', 'support-resistance'), 'support-resistance'),
      subtopic('evaluating-risk', 'Evaluating risk', 'Apply evidence checks and a loss limit in the existing fictional Detective case.', 6, activity('detective-mission', 'sudden-price-spike'), null),
    ], { source: 'existing-activities', activityIds: Object.freeze(['support-resistance', 'sudden-price-spike']) }),
  ]),
});