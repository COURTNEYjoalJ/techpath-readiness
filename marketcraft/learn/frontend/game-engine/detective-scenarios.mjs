export const MISSION_REWARDS = Object.freeze({
  'sudden-price-spike': 50,
  'earnings-mystery': 75,
  'market-trap': 100,
});

const missions = [
  Object.freeze({
    id: 'sudden-price-spike',
    title: 'The Sudden Price Spike',
    difficulty: 'Beginner',
    company: 'Northstar Robotics (fictional)',
    hook: 'Northstar shares jump 28% in forty minutes after an anonymous post claims the company won a major public contract.',
    briefing: 'You are the junior analyst on the MarketCraft investigations desk. Before anyone acts on the move, decide whether reliable evidence supports the rumor and how uncertainty should affect a decision.',
    objectives: ['Separate a rumor from a verified announcement.', 'Interpret an unusual volume increase carefully.', 'Avoid letting urgency replace a risk plan.'],
    minimumEvidence: 2,
    evidence: Object.freeze([
      Object.freeze({ id: 'anonymous-post', title: 'The original post', source: 'Unverified social account', summary: 'The account gives no named source, filing, or link. It says “contract confirmed” but offers no supporting document.', tag: 'Unverified' }),
      Object.freeze({ id: 'exchange-filing', title: 'Issuer and exchange notice', source: 'Fictional exchange bulletin', summary: 'Northstar says it has not announced a contract award. The exchange has posted no related filing as of the latest check.', tag: 'Primary source' }),
      Object.freeze({ id: 'volume-check', title: 'Trading activity', source: 'Illustrative market monitor', summary: 'Volume is about four times the recent average. High volume confirms unusual activity, not the truth of the rumor.', tag: 'Context' }),
      Object.freeze({ id: 'market-context', title: 'Wider market', source: 'Illustrative market monitor', summary: 'The broad market is up 0.3% over the same period, far less than Northstar. A company-specific catalyst is possible but still unverified.', tag: 'Context' }),
    ]),
    evidenceScores: Object.freeze({ 'exchange-filing': 40, 'volume-check': 26, 'market-context': 18, 'anonymous-post': 8 }),
    keyEvidenceId: 'exchange-filing',
    decisions: Object.freeze([
      Object.freeze({ id: 'verify-and-wait', label: 'Wait for a verifiable announcement; define a maximum loss before considering any virtual position.', points: 60, rationale: 'The exchange notice is a named primary source and directly contradicts the rumor. Waiting for confirmation and planning risk avoids treating a price move or volume spike as proof.' }),
      Object.freeze({ id: 'small-speculative-position', label: 'Take a small virtual position based on the rumor, with a strict loss limit.', points: 32, rationale: 'A loss limit acknowledges risk, but the evidence still does not verify the contract. The rumor should not be treated as a confirmed catalyst.' }),
      Object.freeze({ id: 'chase-the-spike', label: 'Buy immediately because the sharp rise and high volume prove the news is real.', points: 0, rationale: 'Price movement and volume show attention, not truth. This choice confuses market reaction with verified information and ignores downside.' }),
    ]),
    resultNote: 'A fast price move can attract attention before reliable information exists. Check primary sources, read volume as context, and decide what loss you can tolerate before acting.',
  }),
  Object.freeze({
    id: 'earnings-mystery',
    title: 'The Earnings Mystery',
    difficulty: 'Intermediate',
    company: 'Cedar Wave Foods (fictional)',
    hook: 'Cedar Wave reports revenue growth of 18%, yet its shares fall 6% after the release.',
    briefing: 'The headline sounds positive. Your task is to inspect what the headline leaves out and explain why investors might react to the full report rather than revenue alone.',
    objectives: ['Distinguish revenue from profit and margin.', 'Compare results with expectations.', 'Read forward guidance in context.'],
    minimumEvidence: 2,
    evidence: Object.freeze([
      Object.freeze({ id: 'revenue-headline', title: 'Revenue headline', source: 'Fictional quarterly release', summary: 'Revenue increased 18% year over year. The headline omits costs, profitability, and prior expectations.', tag: 'Headline' }),
      Object.freeze({ id: 'margin-detail', title: 'Margin detail', source: 'Fictional quarterly filing', summary: 'Operating margin declined from 14% to 8% as ingredient and distribution costs rose faster than sales.', tag: 'Financial detail' }),
      Object.freeze({ id: 'consensus', title: 'Before-release expectations', source: 'Illustrative analyst consensus', summary: 'The fictional consensus expected 22% revenue growth and a 12% operating margin. Expectations are estimates, not guarantees.', tag: 'Expectations' }),
      Object.freeze({ id: 'forward-guidance', title: 'Management outlook', source: 'Fictional earnings call transcript', summary: 'Management expects input-cost pressure to continue next quarter and has not yet identified a reliable offset.', tag: 'Forward-looking' }),
    ]),
    evidenceScores: Object.freeze({ 'margin-detail': 40, consensus: 30, 'forward-guidance': 28, 'revenue-headline': 12 }),
    keyEvidenceId: 'margin-detail',
    decisions: Object.freeze([
      Object.freeze({ id: 'read-full-report', label: 'Compare margins and guidance with expectations before forming a view; avoid a trade until the full picture is understood.', points: 60, rationale: 'Revenue grew, but margins compressed and the report missed expectations. Guidance suggests pressure may persist. Looking across these measures explains why the share reaction can differ from the headline.' }),
      Object.freeze({ id: 'headline-only', label: 'Treat 18% revenue growth as sufficient proof the business is improving.', points: 8, rationale: 'Revenue is only one measure. It does not show whether sales are profitable or whether results met what the market expected.' }),
      Object.freeze({ id: 'sell-on-drop', label: 'Sell immediately because any post-report price decline means the company is failing.', points: 18, rationale: 'The price decline may reflect lower margins or expectations, but a price move alone does not establish the long-term outlook. Review the underlying report first.' }),
      Object.freeze({ id: 'weigh-context', label: 'Check margins, consensus, and guidance together, then set a cautious plan that can change as evidence changes.', points: 55, rationale: 'This is a well-supported process: it weighs profit quality and expectations and leaves room for uncertainty. It earns slightly fewer points because it does not explicitly identify margin compression as the central clue.' }),
    ]),
    resultNote: 'Revenue measures sales, not the profit left after costs. Markets also react to how results compare with expectations and what management says may happen next.',
  }),
  Object.freeze({
    id: 'market-trap',
    title: 'The Market Trap',
    difficulty: 'Intermediate',
    company: 'HelioGrid Systems (fictional)',
    hook: 'HelioGrid shares rise 9% on a technical breakout while an upcoming permit decision and thin trading raise questions.',
    briefing: 'The chart looks strong, but the company faces a regulatory deadline and trades less often than larger peers. Investigate the competing signals and choose a risk-aware response.',
    objectives: ['Weigh contradictory evidence.', 'Recognize uncertainty and liquidity risk.', 'Use position sizing and downside limits.'],
    minimumEvidence: 2,
    evidence: Object.freeze([
      Object.freeze({ id: 'breakout-chart', title: 'Price pattern', source: 'Illustrative chart summary', summary: 'Price is above a recent resistance area after a 9% rise. A chart pattern describes past prices; it cannot guarantee the next move.', tag: 'Technical context' }),
      Object.freeze({ id: 'permit-delay', title: 'Permit update', source: 'Fictional regional regulator notice', summary: 'A key operating permit decision has been delayed by six weeks. The notice does not say whether approval will be granted.', tag: 'Material uncertainty' }),
      Object.freeze({ id: 'thin-liquidity', title: 'Trading depth', source: 'Illustrative market monitor', summary: 'The order book is thin compared with larger companies. A modest order could move the quoted price, and exits may be harder in a fast market.', tag: 'Liquidity risk' }),
      Object.freeze({ id: 'debt-note', title: 'Debt summary', source: 'Fictional quarterly filing', summary: 'Debt has increased and the next financing review is due this year. The company says it is monitoring cash needs.', tag: 'Financial risk' }),
    ]),
    evidenceScores: Object.freeze({ 'permit-delay': 40, 'thin-liquidity': 34, 'debt-note': 28, 'breakout-chart': 16 }),
    keyEvidenceId: 'permit-delay',
    decisions: Object.freeze([
      Object.freeze({ id: 'limit-risk', label: 'Treat the permit delay as unresolved, avoid an oversized position, and wait for clearer information or define a strict virtual loss limit.', points: 60, rationale: 'The delayed permit is a material unresolved catalyst. Thin liquidity and higher debt add downside risk. A cautious size or a decision to wait recognizes uncertainty without assuming a guaranteed outcome.' }),
      Object.freeze({ id: 'follow-chart-all-in', label: 'Go all-in because the breakout is a stronger signal than the permit delay.', points: 0, rationale: 'A chart does not cancel regulatory, debt, or liquidity risks. Concentrating the whole virtual portfolio on one uncertain outcome is not risk-aware.' }),
      Object.freeze({ id: 'ignore-everything', label: 'Assume the permit will be approved and use the full virtual balance before the deadline.', points: 0, rationale: 'The notice explicitly leaves the outcome open. Assuming approval turns uncertainty into unjustified certainty and exposes the full balance.' }),
      Object.freeze({ id: 'wait-and-review', label: 'Wait for the permit decision and review liquidity and financing before deciding whether the opportunity fits a small, affordable virtual risk.', points: 58, rationale: 'Waiting for a material unresolved decision is a defensible choice. Checking liquidity and financing and keeping any exposure small makes the plan responsive to risk.' }),
    ]),
    resultNote: 'Strong charts can coexist with fundamental and liquidity risks. A cautious response acknowledges that signals conflict and that an uncertain outcome can move either way.',
  }),
];

export const DETECTIVE_MISSIONS = Object.freeze(missions.map((mission) => Object.freeze({ ...mission, rewardXp: MISSION_REWARDS[mission.id] })));
export const MISSION_BY_ID = Object.freeze(Object.fromEntries(DETECTIVE_MISSIONS.map((mission) => [mission.id, mission])));
