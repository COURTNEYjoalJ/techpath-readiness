import { PRACTICE_INSTRUMENTS } from '../charts/market-instruments.mjs';

export const INITIAL_CASH_CENTS = 1_000_000;
export const QUANTITY_SCALE = 10_000;
export const FEE_BPS = 20;
export const ASSETS = Object.freeze(Object.fromEntries(PRACTICE_INSTRUMENTS.map((instrument) => [instrument.id, Object.freeze({ name: instrument.name, priceCents: instrument.priceCents, unit: instrument.unit, symbol: instrument.symbol, instrumentType: instrument.instrumentType })])));

export function parseQuantity(value) {
  const text = typeof value === 'number' ? String(value) : String(value ?? '').trim();
  const match = /^(0|[1-9]\d*)(?:\.(\d{1,4}))?$/.exec(text);
  if (!match) return { ok: false, error: 'Enter a positive quantity with no more than 4 decimal places.' };
  const units = Number(match[1]) * QUANTITY_SCALE + Number((match[2] || '').padEnd(4, '0'));
  if (!Number.isSafeInteger(units) || units <= 0) return { ok: false, error: 'Enter a valid positive quantity.' };
  return { ok: true, units };
}

export function formatQuantity(units) {
  return (units / QUANTITY_SCALE).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
}

export function calculatePortfolio(state) {
  const holdingsCents = Object.entries(ASSETS).reduce((total, [asset, spec]) => {
    const units = state.positions[asset] || 0;
    return total + Math.round((spec.priceCents * units) / QUANTITY_SCALE);
  }, 0);
  const equityCents = state.cashCents + holdingsCents;
  return {
    cashCents: state.cashCents,
    holdingsCents,
    equityCents,
    totalProfitLossCents: equityCents - INITIAL_CASH_CENTS,
  };
}

export function executeTrade(state, side, asset, quantity, now = Date.now()) {
  const spec = ASSETS[asset];
  if (!spec) return { ok: false, error: 'Choose a supported virtual asset.' };
  if (side !== 'buy' && side !== 'sell') return { ok: false, error: 'Choose buy or sell.' };
  const parsed = parseQuantity(quantity);
  if (!parsed.ok) return parsed;

  const quantityUnits = parsed.units;
  const notionalCents = Math.round((spec.priceCents * quantityUnits) / QUANTITY_SCALE);
  const feeCents = Math.round((notionalCents * FEE_BPS) / 10_000);
  const totalCents = notionalCents + feeCents;
  const heldUnits = state.positions[asset] || 0;

  if (side === 'buy' && totalCents > state.cashCents) {
    return { ok: false, error: 'Not enough virtual cash for this order and its example fee.' };
  }
  if (side === 'sell' && quantityUnits > heldUnits) {
    return { ok: false, error: heldUnits === 0 ? `You have no ${spec.name} to sell.` : 'Insufficient virtual holdings to sell.' };
  }

  const trade = Object.freeze({
    id: `${now}-${state.journal.length}`,
    side,
    asset,
    quantityUnits,
    priceCents: spec.priceCents,
    notionalCents,
    feeCents,
    timestamp: now,
  });
  const nextState = {
    ...state,
    cashCents: side === 'buy' ? state.cashCents - totalCents : state.cashCents + notionalCents - feeCents,
    positions: {
      ...state.positions,
      [asset]: side === 'buy' ? heldUnits + quantityUnits : heldUnits - quantityUnits,
    },
    journal: [trade, ...state.journal],
  };
  return { ok: true, state: nextState, trade };
}
