import { CANDLESTICK_MODULE } from './content/module-03-candlesticks.mjs';
import { CANDLE_SCENARIOS } from './scenarios/candlestick-scenarios.mjs';
import { validateScenario } from './scenario-engine.mjs';

const requiredText = ['definition', 'intuition', 'whyItMatters', 'example', 'mechanics', 'marketApplication', 'limitations', 'commonMistake', 'connections', 'takeaway'];

export function validateLearningContent(modules = [CANDLESTICK_MODULE], scenarios = CANDLE_SCENARIOS) {
  const errors = [];
  const moduleIds = new Set(); const topicIds = new Set(); const scenarioIds = new Set();
  for (const scenario of scenarios) {
    if (scenarioIds.has(scenario.id)) errors.push(`Duplicate scenario ID: ${scenario.id}`);
    scenarioIds.add(scenario.id);
    for (const error of validateScenario(scenario).errors) errors.push(`${scenario.id}: ${error}`);
  }
  for (const module of modules) {
    if (moduleIds.has(module.id)) errors.push(`Duplicate module ID: ${module.id}`);
    moduleIds.add(module.id);
    if (!Number.isSafeInteger(module.number) || typeof module.version !== 'string' || !Array.isArray(module.subtopics) || module.subtopics.length === 0) errors.push(`${module.id}: incomplete module metadata.`);
    for (const topic of module.subtopics || []) {
      if (topicIds.has(topic.id)) errors.push(`Duplicate subtopic ID: ${topic.id}`);
      topicIds.add(topic.id);
      if (!topic.id || !topic.title || !topic.scenarioId || !topic.visualId) errors.push(`${topic.id || '(unknown)'}: missing stable ID, title, scenario or visual.`);
      for (const key of requiredText) if (typeof topic[key] !== 'string' || topic[key].trim().length < 45) errors.push(`${topic.id}: ${key} needs substantive content.`);
      if (!scenarioIds.has(topic.scenarioId)) errors.push(`${topic.id}: scenario ${topic.scenarioId} is missing.`);
      if (!module.sources?.length) errors.push(`${module.id}: sources and review dates are required.`);
    }
  }
  return Object.freeze({ valid: errors.length === 0, moduleCount: moduleIds.size, subtopicCount: topicIds.size, scenarioCount: scenarioIds.size, errors: Object.freeze(errors) });
}
