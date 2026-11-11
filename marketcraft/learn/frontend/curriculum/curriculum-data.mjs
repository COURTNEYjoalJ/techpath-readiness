import { CHART_LESSONS } from '../game-engine/chart-lessons.mjs';

const linked = (lessonId) => CHART_LESSONS.find((lesson) => lesson.id === lessonId);
const moduleItem = (number, title, branch, level, lessonId = null, extra = {}) => {
  const lesson = lessonId ? linked(lessonId) : null;
  const content = lesson ? Object.freeze({ summary: lesson.summary, objectives: lesson.objectives, charts: lesson.charts, questions: lesson.questions }) : null;
  const subtopics = content ? Object.freeze((content.objectives || []).map((title, index) => Object.freeze({ id: `module-${String(number).padStart(2, '0')}-subtopic-${index + 1}`, title }))) : Object.freeze([]);
  return Object.freeze({ id: `module-${String(number).padStart(2, '0')}`, number, title, branch, level, status: lesson ? 'available' : 'in-development', lessonId: lesson?.id || null, content, subtopics, ...extra });
};

export const CURRICULUM_VERSION = '2.0.0';
export const CURRICULUM_BRANCHES = Object.freeze([
  Object.freeze({ id: 'chart-analysis', title: 'Chart Analysis', levels: Object.freeze(['Beginner', 'Intermediate', 'Advanced']) }),
  Object.freeze({ id: 'technical-analysis', title: 'Technical Analysis', levels: Object.freeze(['Beginner', 'Intermediate', 'Advanced']) }),
  Object.freeze({ id: 'fundamental-analysis', title: 'Fundamental Analysis', levels: Object.freeze(['Beginner', 'Intermediate', 'Advanced']) }),
]);

export const CURRICULUM_MODULES = Object.freeze([
  moduleItem(1, 'Introduction to Financial Markets', 'chart-analysis', 'Beginner'),
  moduleItem(2, 'Chart Reading and Price Behaviour', 'chart-analysis', 'Beginner'),
  moduleItem(3, 'Candlestick Fundamentals', 'chart-analysis', 'Beginner', 'candlesticks', { chartLink: Object.freeze({ instrumentId: 'BTC', tool: 'crosshair' }) }),
  moduleItem(4, 'Single-Candle Patterns', 'chart-analysis', 'Beginner'),
  moduleItem(5, 'Two-Candle Patterns', 'chart-analysis', 'Intermediate'),
  moduleItem(6, 'Three-Candle and Multi-Candle Patterns', 'chart-analysis', 'Intermediate'),
  moduleItem(8, 'Market Structure and Trends', 'chart-analysis', 'Intermediate', 'market-trends', { chartLink: Object.freeze({ instrumentId: 'BTC', tool: 'trendline' }) }),
  moduleItem(9, 'Support, Resistance and Supply-Demand', 'chart-analysis', 'Intermediate', 'support-resistance', { chartLink: Object.freeze({ instrumentId: 'BTC', tool: 'horizontal' }) }),
  moduleItem(7, 'Advanced Price Action and Candlestick Application', 'chart-analysis', 'Advanced'),
  moduleItem(10, 'Trendlines and Classic Chart Patterns', 'chart-analysis', 'Advanced'),
  moduleItem(11, 'Moving Averages and Trend Indicators', 'technical-analysis', 'Beginner'),
  moduleItem(12, 'Momentum and Oscillators', 'technical-analysis', 'Beginner', null, { splitLevel: 'Intermediate' }),
  moduleItem(13, 'Volatility, Volume and Market Participation', 'technical-analysis', 'Intermediate'),
  moduleItem(14, 'Fibonacci and Additional Frameworks', 'technical-analysis', 'Intermediate'),
  moduleItem(15, 'Advanced Market Structure and Execution', 'technical-analysis', 'Advanced'),
  moduleItem(22, 'Risk Management and Trading Psychology', 'technical-analysis', 'Advanced', null, { crossLinks: ['chart-analysis', 'strategy-development'] }),
  moduleItem(23, 'Strategy Development and Backtesting', 'technical-analysis', 'Advanced', null, { crossLinks: ['chart-analysis', 'fundamental-analysis'] }),
  moduleItem(16, 'Macroeconomic Foundations', 'fundamental-analysis', 'Beginner'),
  moduleItem(17, 'Company and Business Fundamentals', 'fundamental-analysis', 'Beginner'),
  moduleItem(18, 'Financial Statement Analysis', 'fundamental-analysis', 'Intermediate'),
  moduleItem(19, 'Financial Ratios and Performance', 'fundamental-analysis', 'Intermediate'),
  moduleItem(20, 'Valuation and Investment Decisions', 'fundamental-analysis', 'Advanced'),
  moduleItem(21, 'Asset-Specific Fundamental Analysis', 'fundamental-analysis', 'Advanced'),
  Object.freeze({ id: 'module-24', number: 24, title: 'Integrated Master Practical Project', branch: 'integrated-overview', level: 'Optional', status: 'available', kind: 'read-only-overview', lessonId: null, content: Object.freeze({ summary: 'Optional, read-only overview of how chart, technical, fundamental, and risk analysis can be considered together.', note: 'This is an overview only. It is not an assignment, exercise, homework task, or required project.' }) }),
]);

export function getCurriculumProgress(state) {
  const completed = new Set(CURRICULUM_MODULES.filter((item) => item.lessonId && (state?.chartAcademy?.lessons?.[item.lessonId]?.completionCount || 0) > 0).map((item) => item.id));
  return CURRICULUM_BRANCHES.map((branch) => {
    const modules = CURRICULUM_MODULES.filter((item) => item.branch === branch.id);
    const available = modules.filter((item) => item.status === 'available');
    const finished = available.filter((item) => completed.has(item.id)).length;
    const levelProgress = branch.levels.map((level) => {
      const levelModules = modules.filter((item) => item.level === level || item.splitLevel === level);
      const levelAvailable = levelModules.filter((item) => item.status === 'available');
      const levelCompleted = levelAvailable.filter((item) => completed.has(item.id)).length;
      return Object.freeze({ name: level, modules: levelModules, totalCount: levelModules.length, availableCount: levelAvailable.length, completedCount: levelCompleted, percent: levelAvailable.length ? Math.round(levelCompleted / levelAvailable.length * 100) : 0 });
    });
    return Object.freeze({ ...branch, modules, levelProgress, availableCount: available.length, completedCount: finished, percent: available.length ? Math.round(finished / available.length * 100) : 0, totalCount: modules.length });
  });
}
