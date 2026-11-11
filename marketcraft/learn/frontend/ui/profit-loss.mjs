export function getProfitLossStatus(cents) {
  if (!Number.isFinite(cents) || cents === 0) return 'neutral';
  return cents > 0 ? 'profit' : 'loss';
}

export function formatSignedProfitLoss(cents) {
  if (!Number.isFinite(cents)) return '$0.00';
  const amount = (Math.abs(cents) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (cents > 0) return '+$' + amount;
  if (cents < 0) return '−$' + amount;
  return '$' + amount;
}