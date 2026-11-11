import { ASSETS, INITIAL_CASH_CENTS } from '../game-engine/trading.mjs';
import { createInitialDetectiveState, sanitizeDetectiveState, validateDetectiveState } from './detective-state.mjs';
import { createInitialChartProgress, sanitizeChartProgress, validateChartProgress } from './chart-progress.mjs';

export const DEMO_SCHEMA_VERSION = 4;
export const DEMO_STORAGE_KEY = 'marketcraft-demo-state';
export const LEGACY_THEME_KEY = 'marketcraft-theme';
export const LESSON_REWARD_XP = 50;
export const CHALLENGE_REWARD_XP = 100;

export function createInitialDemoState(theme = 'dark') {
  return {
    schemaVersion: DEMO_SCHEMA_VERSION,
    theme: theme === 'light' ? 'light' : 'dark',
    page: 'home',
    motionEnabled: true,
    asset: 'BTC',
    cashCents: INITIAL_CASH_CENTS,
    positions: Object.fromEntries(Object.keys(ASSETS).map((asset) => [asset, 0])),
    journal: [],
    xp: 0,
    completedLessons: {},
    completedChallenges: {},
    plan: 'balanced',
    detective: createInitialDetectiveState(),
    chartAcademy: createInitialChartProgress(),
  };
}

function isNonNegativeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

export function validateDemoCoreState(value) {
  if (!value || typeof value !== 'object' || ![1, 2, 3, DEMO_SCHEMA_VERSION].includes(value.schemaVersion)) return false;
  if (!['dark', 'light'].includes(value.theme) || (value.motionEnabled !== undefined && typeof value.motionEnabled !== 'boolean') || !['home', 'learn', 'markets', 'arena', 'crash', 'detective', 'charts', 'risk'].includes(value.page)) return false;
  if (!Object.hasOwn(ASSETS, value.asset) || !isNonNegativeInteger(value.cashCents) || !isNonNegativeInteger(value.xp)) return false;
  if (!value.positions || typeof value.positions !== 'object' || Array.isArray(value.positions)) return false;
  const requiredPositionIds = value.schemaVersion < 4 ? ['BTC', 'ETH', 'XAU'] : Object.keys(ASSETS);
  if (!requiredPositionIds.every((asset) => isNonNegativeInteger(value.positions[asset]))) return false;
  if (!value.completedLessons || typeof value.completedLessons !== 'object' || Array.isArray(value.completedLessons)) return false;
  if (!value.completedChallenges || typeof value.completedChallenges !== 'object' || Array.isArray(value.completedChallenges)) return false;
  if (!Object.values(value.completedLessons).every((done) => done === true) || !Object.values(value.completedChallenges).every((done) => done === true)) return false;
  if (!Array.isArray(value.journal) || !value.journal.every((trade) =>
    trade && ['buy', 'sell'].includes(trade.side) && Object.hasOwn(ASSETS, trade.asset) &&
    isNonNegativeInteger(trade.quantityUnits) && trade.quantityUnits > 0 &&
    isNonNegativeInteger(trade.priceCents) && isNonNegativeInteger(trade.notionalCents) &&
    isNonNegativeInteger(trade.feeCents) && Number.isFinite(trade.timestamp))) return false;
  return ['growth', 'balanced', 'defensive'].includes(value.plan);
}

export function migrateDemoState(value) {
  if (!validateDemoCoreState(value)) return null;
  if (value.schemaVersion === 1) {
    return {
      ...value,
      schemaVersion: DEMO_SCHEMA_VERSION,
      motionEnabled: value.motionEnabled ?? true,
      positions: Object.fromEntries(Object.keys(ASSETS).map((asset) => [asset, value.positions[asset] || 0])),
      detective: createInitialDetectiveState(),
      chartAcademy: createInitialChartProgress(),
    };
  }
  return {
    ...value,
    schemaVersion: DEMO_SCHEMA_VERSION,
    motionEnabled: value.motionEnabled ?? true,
    positions: Object.fromEntries(Object.keys(ASSETS).map((asset) => [asset, value.positions[asset] || 0])),
    detective: sanitizeDetectiveState(value.detective),
    chartAcademy: value.schemaVersion <= 2 ? createInitialChartProgress() : sanitizeChartProgress(value.chartAcademy),
  };
}

export function validateDemoState(value) {
  return validateDemoCoreState(value) && value.schemaVersion === DEMO_SCHEMA_VERSION && validateDetectiveState(value.detective) && validateChartProgress(value.chartAcademy);
}

export function loadDemoState(storage) {
  let theme = 'dark';
  try {
    const legacyTheme = storage?.getItem(LEGACY_THEME_KEY);
    if (legacyTheme === 'light' || legacyTheme === 'dark') theme = legacyTheme;
    const raw = storage?.getItem(DEMO_STORAGE_KEY);
    if (raw == null) return createInitialDemoState(theme);
    const parsed = JSON.parse(raw);
    const migrated = migrateDemoState(parsed);
    if (!migrated) {
      storage?.removeItem(DEMO_STORAGE_KEY);
      return createInitialDemoState(theme);
    }
    if (parsed.schemaVersion !== DEMO_SCHEMA_VERSION || !validateDetectiveState(parsed.detective) || !validateChartProgress(parsed.chartAcademy)) saveDemoState(storage, migrated);
    return migrated;
  } catch {
    try { storage?.removeItem(DEMO_STORAGE_KEY); } catch { /* storage may be unavailable */ }
  }
  return createInitialDemoState(theme);
}

export function saveDemoState(storage, state) {
  try {
    if (!validateDemoState(state)) return false;
    storage?.setItem(DEMO_STORAGE_KEY, JSON.stringify(state));
    storage?.setItem(LEGACY_THEME_KEY, state.theme);
    return true;
  } catch {
    return false;
  }
}

export function completeLesson(state, lessonId) {
  if (!lessonId || state.completedLessons[lessonId]) return state;
  return {
    ...state,
    xp: state.xp + LESSON_REWARD_XP,
    completedLessons: { ...state.completedLessons, [lessonId]: true },
  };
}

export function completeChallenge(state, challengeId, rewardXp = CHALLENGE_REWARD_XP) {
  if (!challengeId || state.completedChallenges[challengeId]) return state;
  if (!Number.isSafeInteger(rewardXp) || rewardXp < 0) throw new RangeError('Reward XP must be a non-negative integer.');
  return {
    ...state,
    xp: state.xp + rewardXp,
    completedChallenges: { ...state.completedChallenges, [challengeId]: true },
  };
}

export function getLevel(xp) {
  return Math.floor(Math.max(0, xp) / 500) + 1;
}

export function getNextLevelProgress(xp) {
  return Math.max(0, xp) % 500;
}

export function getNextUtcDeadline(now = Date.now()) {
  const date = new Date(now);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1);
}
