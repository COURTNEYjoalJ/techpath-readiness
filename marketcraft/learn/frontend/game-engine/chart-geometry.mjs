export function validateOHLC(candles) {
  return Array.isArray(candles) && candles.length > 0 && candles.every((item) =>
    item && typeof item.id === 'string' && item.id.length > 0 &&
    ['open', 'high', 'low', 'close'].every((key) => Number.isFinite(item[key])) &&
    item.high >= Math.max(item.open, item.close, item.low) &&
    item.low <= Math.min(item.open, item.close, item.high));
}

export function classifyCandle(item) {
  if (!item || !Number.isFinite(item.open) || !Number.isFinite(item.close)) return null;
  return item.close > item.open ? 'bullish' : item.close < item.open ? 'bearish' : 'neutral';
}

export function getPriceDomain(chart) {
  const values = chart?.type === 'candlestick'
    ? (chart.candles || []).flatMap(({ high, low }) => [high, low])
    : (chart?.points || []).map(({ value }) => value);
  if (!values.length || !values.every(Number.isFinite)) return null;
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const spread = Math.max(1, maximum - minimum);
  return { min: minimum - spread * 0.12, max: maximum + spread * 0.12 };
}

export function priceY(value, domain, height, padding = 20) {
  if (!Number.isFinite(value) || !domain || !Number.isFinite(height) || height <= padding * 2 || domain.max <= domain.min) return null;
  return padding + ((domain.max - value) / (domain.max - domain.min)) * (height - padding * 2);
}

export function buildCandleGeometry(candles, width, height, padding = 24) {
  if (!validateOHLC(candles) || !Number.isFinite(width) || width <= padding * 2 || height <= padding * 2) return null;
  const domain = getPriceDomain({ type: 'candlestick', candles });
  const slot = (width - padding * 2) / candles.length;
  const bodyWidth = Math.max(8, Math.min(24, slot * 0.54));
  return candles.map((item, index) => {
    const x = padding + slot * (index + 0.5);
    const openY = priceY(item.open, domain, height, padding);
    const closeY = priceY(item.close, domain, height, padding);
    return Object.freeze({ id: item.id, x, top: Math.min(openY, closeY), bodyHeight: Math.max(3, Math.abs(closeY - openY)), bodyWidth, highY: priceY(item.high, domain, height, padding), lowY: priceY(item.low, domain, height, padding), openY, closeY, direction: classifyCandle(item), ...item });
  });
}

export function trendDirection(points) {
  if (!Array.isArray(points) || points.length < 3 || !points.every((item) => Number.isFinite(item?.value))) return 'uncertain';
  const first = points[0].value;
  const last = points.at(-1).value;
  const spread = Math.max(1, ...points.map((item) => item.value)) - Math.min(...points.map((item) => item.value));
  if (Math.abs(last - first) <= spread * 0.18) return 'sideways';
  return last > first ? 'up' : 'down';
}

export function buildLineGeometry(points, width, height, padding = 24) {
  if (!Array.isArray(points) || points.length < 2 || !points.every((item) => typeof item.id === 'string' && Number.isFinite(item.value)) || width <= padding * 2 || height <= padding * 2) return null;
  const domain = getPriceDomain({ type: 'line', points });
  const step = (width - padding * 2) / (points.length - 1);
  return points.map((item, index) => Object.freeze({ ...item, x: padding + step * index, y: priceY(item.value, domain, height, padding) }));
}
