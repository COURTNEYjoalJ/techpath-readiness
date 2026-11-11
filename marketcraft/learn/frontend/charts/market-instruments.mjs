export const PRACTICE_INSTRUMENTS = Object.freeze([
  Object.freeze({ id: 'BTC', name: 'Bitcoin', symbol: 'BTC/USDT', unit: 'USD per BTC', priceCents: 5_000_000, precision: 2, category: 'Crypto', instrumentType: 'Simulated spot reference' }),
  Object.freeze({ id: 'ETH', name: 'Ethereum', symbol: 'ETH/USDT', unit: 'USD per ETH', priceCents: 300_000, precision: 2, category: 'Crypto', instrumentType: 'Simulated spot reference' }),
  Object.freeze({ id: 'XAU', name: 'Gold', symbol: 'XAU/USD', unit: 'USD per troy ounce', priceCents: 200_000, precision: 2, category: 'Metals', instrumentType: 'Simulated spot reference' }),
  Object.freeze({ id: 'WTI', name: 'WTI Crude Oil', symbol: 'WTI · illustrative', unit: 'USD per barrel', priceCents: 7_500, precision: 2, category: 'Energy', instrumentType: 'Simulated WTI reference; no futures contract' }),
  Object.freeze({ id: 'FTSE', name: 'FTSE 100', symbol: 'UKX', unit: 'index points', priceCents: 820_000, precision: 2, category: 'Index', instrumentType: 'Simulated index level' }),
  Object.freeze({ id: 'SP500', name: 'S&P 500', symbol: 'SPX', unit: 'index points', priceCents: 530_000, precision: 2, category: 'Index', instrumentType: 'Simulated index level' }),
]);

export function createSyntheticBars(instrumentId, timeframe = '1D', count = 84) {
  const instrument = PRACTICE_INSTRUMENTS.find((item) => item.id === instrumentId);
  if (!instrument || !Number.isInteger(count) || count < 2 || count > 500) return [];
  let seed = [...instrumentId + timeframe].reduce((n, char) => ((n * 31) + char.charCodeAt(0)) >>> 0, 17);
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const bars = [];
  let previous = instrument.priceCents * (0.87 + random() * 0.12);
  const stepMinutes = timeframe === '15m' ? 15 : timeframe === '1h' ? 60 : timeframe === '4h' ? 240 : 1440;
  const start = Date.UTC(2024, 0, 1);
  for (let index = 0; index < count; index += 1) {
    const open = previous;
    const close = index === count - 1 ? instrument.priceCents : Math.max(1, open * (1 + (random() - 0.48) * 0.022));
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.max(1, Math.min(open, close) * (1 - random() * 0.012));
    bars.push(Object.freeze({ index, label: `S${String(index + 1).padStart(2, '0')}`, time: start + index * stepMinutes * 60_000, open, high, low, close, volume: Math.round(100 + random() * 900) }));
    previous = close;
  }
  return bars;
}

export function calculateSMA(values, period = 10) {
  return values.map((value, index) => index + 1 < period ? null : values.slice(index - period + 1, index + 1).reduce((sum, item) => sum + item, 0) / period);
}

export function calculateEMA(values, period = 10) {
  if (!values.length) return [];
  const alpha = 2 / (period + 1);
  return values.reduce((result, value, index) => { result.push(index ? value * alpha + result[index - 1] * (1 - alpha) : value); return result; }, []);
}
