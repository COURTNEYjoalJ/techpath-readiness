import { DETECTIVE_MISSIONS } from '../../game-engine/detective-scenarios.mjs';

const make = (tag, className = '', text = '') => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

function actionButton(text, className, key, action, args = {}) {
  const button = make('button', className, text);
  button.type = 'button';
  button.dataset.focusKey = key;
  button.addEventListener('click', () => action(args));
  return button;
}

function pageHeading(eyebrow, title, subtitle) {
  const header = make('header', 'detective-heading');
  header.append(make('span', 'eyebrow', eyebrow), make('h1', '', title), make('p', '', subtitle));
  return header;
}

function missionCard(mission, stats, state, onAction) {
  const card = make('article', 'detective-mission-card');
  const top = make('div', 'detective-card-top');
  top.append(make('span', 'eyebrow', `${mission.difficulty} · ${mission.rewardXp} XP`));
  const status = stats?.completionCount ? `Completed ${stats.completionCount} ${stats.completionCount === 1 ? 'time' : 'times'} · Best ${stats.bestScore}/100` : stats?.latestSessionId ? 'In progress' : 'New case';
  top.append(make('span', 'detective-status', status));
  card.append(top, make('h2', '', mission.title), make('p', 'detective-company', mission.company), make('p', '', mission.hook));
  const objectiveList = make('ul', 'detective-objectives');
  for (const objective of mission.objectives) objectiveList.append(make('li', '', objective));
  card.append(objectiveList);
  const buttons = make('div', 'detective-actions');
  const latest = stats?.latestSessionId ? stats.latestSessionId : null;
  const savedSession = latest ? state.detective.sessions[latest] : null;
  if (savedSession?.phase === 'result') {
    buttons.append(actionButton('Review result', 'secondary', `review-${mission.id}`, onAction, { type: 'review', missionId: mission.id, sessionId: latest }));
  }
  const label = savedSession && savedSession.phase !== 'result' ? 'Resume investigation' : stats?.completionCount ? 'Replay mission' : 'Start mission';
  buttons.append(actionButton(label, 'primary', `start-${mission.id}`, onAction, { type: 'start', missionId: mission.id }));
  card.append(buttons);
  return card;
}

function renderMissionBoard(root, state, onAction) {
  root.append(pageHeading('MARKET DETECTIVE · CASE FILES', 'Choose your investigation', 'Fictional market cases. Examine the sources, weigh uncertainty, and explain your reasoning before making a virtual decision.'));
  const board = make('div', 'detective-board');
  for (const mission of DETECTIVE_MISSIONS) board.append(missionCard(mission, state.detective.missions[mission.id], state, onAction));
  root.append(board);
  const note = make('p', 'detective-disclaimer', 'This is a financial education game. Scenarios, companies, and outcomes are fictional; scores are for practice and are not investment advice.');
  root.append(note);
}

function renderBriefing(root, mission, session, onAction) {
  root.append(pageHeading(`CASE FILE · ${mission.difficulty.toUpperCase()}`, mission.title, mission.company));
  const panel = make('section', 'detective-panel detective-briefing');
  panel.append(make('span', 'eyebrow', 'MISSION BRIEFING'), make('h2', '', 'Your assignment'), make('p', '', mission.hook), make('p', '', mission.briefing));
  const objectives = make('ul', 'detective-objectives');
  for (const objective of mission.objectives) objectives.append(make('li', '', objective));
  panel.append(objectives);
  const footer = make('div', 'detective-actions');
  footer.append(actionButton('All cases', 'secondary', 'briefing-board', onAction, { type: 'missions' }));
  footer.append(actionButton('Begin investigation', 'primary', 'begin-investigation', onAction, { type: 'begin' }));
  panel.append(footer);
  root.append(panel);
}

function renderInvestigation(root, mission, session, onAction) {
  root.append(pageHeading(`CASE FILE · ${mission.difficulty.toUpperCase()}`, mission.title, mission.company));
  const briefing = make('section', 'detective-panel detective-scenario');
  briefing.append(make('span', 'eyebrow', 'MARKET UPDATE'), make('p', '', mission.hook), make('p', 'helper', `Inspect at least ${mission.minimumEvidence} sources. Then select the clue that best addresses the central uncertainty.`));
  root.append(briefing);
  const sectionTitle = make('div', 'detective-section-title');
  sectionTitle.append(make('h2', '', 'Evidence board'), make('span', 'detective-status', `${session.inspectedEvidenceIds.length} / ${mission.evidence.length} inspected`));
  root.append(sectionTitle);
  const evidenceGrid = make('div', 'detective-evidence-grid');
  for (const item of mission.evidence) {
    const inspected = session.inspectedEvidenceIds.includes(item.id);
    const selected = session.selectedEvidenceId === item.id;
    const card = make('article', `detective-evidence-card${selected ? ' selected' : ''}`);
    card.append(make('span', 'detective-evidence-tag', inspected ? item.tag : 'Sealed evidence'), make('h3', '', item.title));
    if (inspected) {
      card.append(make('p', 'detective-source', item.source), make('p', '', item.summary));
      card.append(actionButton(selected ? 'Key clue selected' : 'Select as key clue', selected ? 'choice selected' : 'secondary', `select-evidence-${item.id}`, onAction, { type: 'select-evidence', evidenceId: item.id }));
    } else {
      card.append(make('p', 'detective-sealed-copy', 'Open this source and decide how much weight it deserves.'));
      card.append(actionButton('Inspect source', 'secondary', `inspect-${item.id}`, onAction, { type: 'inspect', evidenceId: item.id }));
    }
    evidenceGrid.append(card);
  }
  root.append(evidenceGrid);
  const enoughEvidence = session.inspectedEvidenceIds.length >= mission.minimumEvidence && Boolean(session.selectedEvidenceId);
  const decisionPanel = make('section', `detective-panel detective-decision${enoughEvidence ? '' : ' locked'}`);
  decisionPanel.setAttribute('aria-labelledby', 'detectiveDecisionTitle');
  decisionPanel.append(make('span', 'eyebrow', 'YOUR ANALYSIS'), make('h2', '', 'What is your next step?'));
  decisionPanel.lastElementChild.id = 'detectiveDecisionTitle';
  decisionPanel.append(make('p', 'helper', enoughEvidence ? 'Choose the response that best fits the evidence and the uncertainty in this case.' : `Inspect ${mission.minimumEvidence} sources and select a key clue to unlock your decision.`));
  const choices = make('div', 'detective-decisions');
  for (const decision of mission.decisions) {
    const selected = session.decisionId === decision.id;
    const button = actionButton(decision.label, selected ? 'choice selected detective-decision-option' : 'choice detective-decision-option', `decision-${decision.id}`, onAction, { type: 'choose-decision', decisionId: decision.id });
    button.disabled = !enoughEvidence;
    button.setAttribute('aria-pressed', String(selected));
    choices.append(button);
  }
  decisionPanel.append(choices);
  const submit = actionButton('Submit investigation', 'primary', 'submit-detective-decision', onAction, { type: 'submit' });
  submit.disabled = !enoughEvidence || !session.decisionId;
  decisionPanel.append(submit);
  root.append(decisionPanel);
  root.append(actionButton('Save and return to case board', 'secondary detective-return', 'return-board', onAction, { type: 'missions' }));
}

function renderResult(root, mission, session, stats, onAction) {
  root.append(pageHeading('INVESTIGATION COMPLETE', mission.title, mission.company));
  const result = session.score;
  const panel = make('section', 'detective-panel detective-result', '');
  const resultTop = make('div', 'detective-result-top');
  const score = make('div', 'detective-score');
  score.append(make('span', 'eyebrow', 'CASE SCORE'), make('strong', '', `${result.total}`), make('span', '', '/ 100'));
  resultTop.append(score, make('div', 'detective-result-tier'));
  resultTop.lastElementChild.append(make('span', 'eyebrow', 'ASSESSMENT'), make('strong', '', result.tier));
  panel.append(resultTop, make('div', 'detective-score-breakdown', `Key evidence ${result.evidencePoints}/40 · Decision process ${result.decisionPoints}/60`));
  const explanation = make('div', 'detective-explanation');
  explanation.append(make('h2', '', 'Why this result?'), make('p', '', result.evidenceRationale), make('p', '', result.decisionRationale), make('p', 'helper', result.resultNote));
  panel.append(explanation);
  const reward = session.rewardEarned ? `+${mission.rewardXp} XP added to your profile.` : `Reward already claimed. Replays do not add more XP. Current best: ${stats?.bestScore ?? result.total}/100.`;
  panel.append(make('p', 'detective-reward', reward));
  panel.append(make('p', 'detective-disclaimer', 'Virtual educational outcome only. No real order was placed, and this score does not predict market performance.'));
  root.append(panel);
  const actions = make('div', 'detective-actions detective-result-actions');
  actions.append(actionButton('Back to case board', 'secondary', 'result-board', onAction, { type: 'missions' }));
  actions.append(actionButton('Replay mission', 'primary', 'replay-mission', onAction, { type: 'start', missionId: mission.id }));
  root.append(actions);
}

export function renderDetective(root, state, onAction, notice = '') {
  const activeId = state.detective.activeSessionId;
  const session = activeId ? state.detective.sessions[activeId] : null;
  const mission = session ? DETECTIVE_MISSIONS.find((item) => item.id === session.missionId) : null;
  const focusKey = document.activeElement?.dataset?.focusKey;
  root.replaceChildren();
  if (!session || !mission) renderMissionBoard(root, state, onAction);
  else if (session.phase === 'briefing') renderBriefing(root, mission, session, onAction);
  else if (session.phase === 'investigation') renderInvestigation(root, mission, session, onAction);
  else renderResult(root, mission, session, state.detective.missions[mission.id], onAction);
  if (notice) { const message = make('p', 'result detective-feedback', notice); message.setAttribute('role', 'alert'); root.prepend(message); }
  root.querySelectorAll('[data-focus-key]').forEach((button) => {
    if (button.dataset.focusKey === focusKey) button.focus({ preventScroll: true });
  });
}
