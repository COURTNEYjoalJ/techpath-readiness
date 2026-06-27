(function () {
  const data = window.careerGuideData;
  const questionData = window.careerGuideQuestions;
  const countrySelect = document.getElementById("countrySelect");
  const roleSelect = document.getElementById("roleSelect");
  const skillTableArea = document.getElementById("skillTableArea");
  const skillStudyPlans = {
    python: {
      study: "Python syntax, pandas, NumPy, data cleaning, notebooks",
      actions: [
        "Practise loops, functions and dictionaries",
        "Complete 10 pandas data-cleaning exercises",
        "Build a small notebook using CSV data"
      ],
      miniProject: "Clean and analyse a sales dataset using pandas"
    },
    statistics: {
      study: "descriptive statistics, probability, distributions, hypothesis testing, regression basics",
      actions: [
        "Revise mean, variance and standard deviation",
        "Practise probability and distribution questions",
        "Learn hypothesis testing with simple examples"
      ],
      miniProject: "Analyse whether two groups have different average scores"
    },
    sql: {
      study: "SELECT, WHERE, GROUP BY, JOINs, subqueries, window functions",
      actions: [
        "Practise 20 SELECT and WHERE queries",
        "Build JOIN queries using two related tables",
        "Practise GROUP BY and window functions"
      ],
      miniProject: "Create a small customer-orders database and answer business questions"
    },
    "machine-learning": {
      study: "supervised learning, unsupervised learning, train/test split, model evaluation, overfitting",
      actions: [
        "Learn classification vs regression",
        "Practise train/test split and accuracy scoring",
        "Compare two simple models"
      ],
      miniProject: "Build a basic house price or customer churn prediction model"
    },
    maths: {
      study: "algebra, linear algebra basics, calculus basics, vectors, matrices",
      actions: [
        "Revise equations and functions",
        "Practise vectors and matrices",
        "Learn how maths connects to ML models"
      ],
      miniProject: "Build a small matrix/vector calculator explanation page"
    },
    communication: {
      study: "explaining insights, business understanding, data storytelling, stakeholder communication, presentation basics",
      actions: [
        "Practise explaining charts in simple language",
        "Convert one analysis into business recommendations",
        "Create a 5-slide insight presentation"
      ],
      miniProject: "Turn a dataset analysis into a short business report"
    },
    excel: {
      study: "formulas and functions, lookup functions, pivot tables, charts, dashboards, data cleaning",
      actions: [
        "Practise SUMIF, COUNTIF, XLOOKUP and IF formulas",
        "Build pivot tables from a sales dataset",
        "Create a small dashboard using charts and slicers"
      ],
      miniProject: "Build an Excel sales performance dashboard"
    },
    "power-bi": {
      study: "data loading, Power Query, relationships, DAX basics, visuals and dashboards",
      actions: [
        "Load and clean a CSV dataset in Power Query",
        "Build relationships between fact and dimension tables",
        "Create DAX measures and a dashboard page"
      ],
      miniProject: "Build a Power BI sales dashboard with KPIs and filters"
    },
    "cloud-fundamentals": {
      study: "cloud computing basics, compute services, storage services, networking basics, IAM and security basics",
      actions: [
        "Compare IaaS, PaaS and SaaS with practical examples",
        "Review virtual machines, object storage, VPCs and IAM roles",
        "Practise cloud cost and least-privilege security scenarios"
      ],
      miniProject: "Design a basic cloud architecture for a small web application"
    },
    linux: {
      study: "file navigation, permissions, processes, packages, services and shell scripting",
      actions: [
        "Practise pwd, ls, cd, chmod, ps, top and kill commands",
        "Inspect service status and logs on a Linux system",
        "Write a small shell script that checks files and prints a report"
      ],
      miniProject: "Create a Linux server health-check script"
    },
    git: {
      study: "Git basics, branching, commit workflow, merge conflicts and remote repositories",
      actions: [
        "Practise git status, add, commit, branch and switch",
        "Resolve a simple merge conflict in a test repository",
        "Push a project to GitHub and pull updates back locally"
      ],
      miniProject: "Publish an infrastructure scripts repository with clear commits and branches"
    },
    html: {
      study: "HTML document structure, semantic elements, forms, links, media and accessibility basics",
      actions: [
        "Build pages using html, head, body, headings, paragraphs and sections",
        "Practise forms with labels, inputs and accessible text",
        "Review semantic tags such as nav, main, section, article and footer"
      ],
      miniProject: "Build a semantic portfolio homepage with an accessible contact form"
    },
    css: {
      study: "selectors, specificity, box model, Flexbox, Grid and responsive design",
      actions: [
        "Practise class selectors, spacing, borders and hover states",
        "Build layouts using Flexbox and CSS Grid",
        "Use media queries to make cards stack cleanly on mobile"
      ],
      miniProject: "Build a responsive landing page with cards, navigation and a mobile layout"
    },
    javascript: {
      study: "variables, data types, functions, arrays, objects, DOM events and debugging",
      actions: [
        "Practise let, const, functions, arrays and objects",
        "Build click and form interactions with addEventListener",
        "Debug common syntax and logic errors in small scripts"
      ],
      miniProject: "Build an interactive task tracker using DOM events and localStorage"
    },
    "api-basics": {
      study: "REST API basics, HTTP methods, status codes, JSON payloads and API debugging",
      actions: [
        "Practise GET, POST, PUT, PATCH and DELETE request concepts",
        "Read JSON responses and handle common status codes",
        "Test API endpoints with a tool such as Postman or Thunder Client"
      ],
      miniProject: "Build a frontend page that fetches and displays public API data"
    }
  };
  const strongPortfolioSuggestions = {
    python: "Use Python in a portfolio notebook that cleans messy CSV data and explains the final insights.",
    statistics: "Use Statistics in an A/B test or hypothesis-testing project where you justify the conclusion.",
    sql: "Use SQL in a customer-orders project with joins, grouped metrics, subqueries, and window functions.",
    "machine-learning": "Use Machine Learning in a prediction project that compares models and explains evaluation metrics.",
    maths: "Use Maths in a visual explainer that connects vectors, matrices, or gradients to model behaviour.",
    communication: "Use Communication in a short business report or slide deck that turns analysis into decisions.",
    excel: "Use Excel in a sales performance dashboard with formulas, pivot tables, charts, and slicers.",
    "power-bi": "Use Power BI in an interactive dashboard with cleaned data, relationships, DAX measures, KPIs, and filters.",
    "cloud-fundamentals": "Use Cloud Fundamentals in a portfolio architecture diagram with compute, storage, networking and IAM choices.",
    linux: "Use Linux in a server automation project that includes commands, logs, permissions and a shell script.",
    git: "Use Git in a portfolio repository that shows clean commits, branches, merges and a documented workflow.",
    html: "Use HTML in a semantic portfolio page with accessible structure, forms, links and media.",
    css: "Use CSS in a responsive layout project that demonstrates Flexbox, Grid, spacing and polished hover states.",
    javascript: "Use JavaScript in an interactive browser project with DOM events, data structures and clear state changes.",
    "api-basics": "Use API Basics in a frontend project that fetches JSON data, handles loading states and displays errors clearly."
  };

  if (!data || !countrySelect || !roleSelect || !skillTableArea) {
    return;
  }

  function clearSkillArea() {
    skillTableArea.innerHTML = "";
  }

  function renderMessage(message) {
    clearSkillArea();

    const panel = document.createElement("div");
    panel.className = "guide-placeholder";

    const text = document.createElement("p");
    text.textContent = message;

    panel.appendChild(text);
    skillTableArea.appendChild(panel);
  }

  function createCell(text, tagName) {
    const cell = document.createElement(tagName);
    cell.textContent = text;
    return cell;
  }

  function getSkillKey(skillName) {
    return skillName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function getSkillQuestions(skillKey) {
    return questionData && questionData.skills ? questionData.skills[skillKey] : null;
  }

  function getQuestionsForSkill(skillId) {
    // Current provider: hardcoded career-questions.js data. Future AI output can replace this return value.
    return getSkillQuestions(skillId);
  }

  function futureGenerateQuestionsWithAI(skillId, topics, difficultyPattern) {
    // Placeholder for a future backend/API integration. Do not put API keys in frontend JavaScript.
    return null;
  }

  function getQuestionGroups(questionSet) {
    if (Array.isArray(questionSet.topics)) {
      return questionSet.topics.map((group) => ({
        topic: group.topic,
        questions: group.questions || []
      }));
    }

    if (!Array.isArray(questionSet.questions)) {
      return [];
    }

    const groups = [];
    questionSet.questions.forEach((question) => {
      let group = groups.find((item) => item.topic === question.topic);

      if (!group) {
        group = { topic: question.topic, questions: [] };
        groups.push(group);
      }

      group.questions.push(question);
    });

    return groups;
  }

  function getFlatQuestions(questionSet) {
    return getQuestionGroups(questionSet).flatMap((group) => group.questions);
  }

  function shuffleArray(items) {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const currentItem = shuffled[index];
      shuffled[index] = shuffled[randomIndex];
      shuffled[randomIndex] = currentItem;
    }

    return shuffled;
  }

  function createAttemptQuestionGroups(questionGroups) {
    return questionGroups.map((group) => ({
      topic: group.topic,
      questions: group.questions.map((question) => ({
        ...question,
        options: shuffleArray(question.options)
      }))
    }));
  }

  function getScoreKey(countryKey, roleKey, skillKey) {
    return `careerGuideScore:${countryKey}:${roleKey}:${skillKey}`;
  }

  function loadSavedScore(countryKey, roleKey, skillKey) {
    try {
      const savedScore = localStorage.getItem(getScoreKey(countryKey, roleKey, skillKey));
      return savedScore ? JSON.parse(savedScore) : null;
    } catch (error) {
      return null;
    }
  }

  function saveSkillScore(countryKey, roleKey, skillKey, score) {
    try {
      localStorage.setItem(getScoreKey(countryKey, roleKey, skillKey), JSON.stringify(score));
    } catch (error) {
      // Score persistence is helpful, but the test should still work if storage is unavailable.
    }
  }

  function formatScore(score) {
    return score ? `${score.correct}/${score.total} (${score.percentage}%)` : "Not tested";
  }

  function updateSkillScoreCell(countryKey, roleKey, skillKey) {
    const scoreCell = skillTableArea.querySelector(`[data-skill-score="${skillKey}"]`);

    if (scoreCell) {
      scoreCell.textContent = formatScore(loadSavedScore(countryKey, roleKey, skillKey));
    }
  }

  function formatReadinessNumber(value) {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }

  function getReadinessLabel(score) {
    if (score >= 80) {
      return "Strong foundation - start portfolio projects and applications";
    }

    if (score >= 60) {
      return "Good progress - improve weak areas and build projects";
    }

    if (score >= 40) {
      return "Beginner/intermediate - revise fundamentals first";
    }

    return "Start from basics - follow the beginner roadmap";
  }

  function getRoleSkillScoreItems(countryKey, roleKey, role) {
    return role.skills.map((skill) => {
      const skillKey = getSkillKey(skill.name);
      const score = loadSavedScore(countryKey, roleKey, skillKey);
      const percentage = score && Number.isFinite(Number(score.percentage))
        ? Number(score.percentage)
        : null;

      return {
        skill,
        skillKey,
        score,
        percentage,
        isComplete: percentage !== null
      };
    });
  }

  function getReadinessResult(countryKey, roleKey, role) {
    const skillScores = getRoleSkillScoreItems(countryKey, roleKey, role);
    const isComplete = skillScores.every((item) => item.isComplete);

    if (!isComplete) {
      return {
        isComplete,
        skillScores
      };
    }

    const breakdown = skillScores.map((item) => ({
      ...item,
      weightedContribution: item.percentage * item.skill.weight / 100
    }));
    const overallScore = breakdown.reduce((total, item) => total + item.weightedContribution, 0);

    return {
      isComplete,
      overallScore,
      label: getReadinessLabel(overallScore),
      breakdown,
      weakSkills: breakdown.filter((item) => item.percentage < 60),
      strongSkills: breakdown.filter((item) => item.percentage >= 75)
    };
  }

  function getReadinessSummary(score, roleLabel) {
    if (score >= 80) {
      return `You have a strong foundation for the ${roleLabel} pathway. Your results show you are ready to turn these skills into portfolio projects and start preparing applications.`;
    }

    if (score >= 60) {
      return `You are making good progress toward the ${roleLabel} pathway, but your weaker areas show what you should revise before applying confidently.`;
    }

    if (score >= 40) {
      return `You are building the ${roleLabel} foundations, but the score shows you should revise core topics and complete focused practice before moving into larger projects.`;
    }

    return `You should start from the basics for the ${roleLabel} pathway. Focus on one weak skill at a time, practise the fundamentals, then retake the tests after revision.`;
  }

  function getSkillStatus(item) {
    if (item.percentage >= 75) {
      return {
        label: "Strong",
        className: "strong"
      };
    }

    if (item.percentage >= 40) {
      return {
        label: "Needs improvement",
        className: "needs-improvement"
      };
    }

    return {
      label: "Critical focus",
      className: "critical-focus"
    };
  }

  function appendReadinessMetric(container, label, value) {
    const metric = document.createElement("div");
    metric.className = "readiness-metric";

    const metricLabel = document.createElement("span");
    metricLabel.textContent = label;

    const metricValue = document.createElement("strong");
    metricValue.textContent = value;

    metric.appendChild(metricLabel);
    metric.appendChild(metricValue);
    container.appendChild(metric);
  }

  function createReadinessSkillCard(item) {
    const status = getSkillStatus(item);
    const card = document.createElement("article");
    card.className = `readiness-skill-card ${status.className}`;

    const header = document.createElement("div");
    header.className = "readiness-skill-card-header";

    const title = document.createElement("h3");
    title.textContent = item.skill.name;

    const badge = document.createElement("span");
    badge.className = `readiness-status-badge ${status.className}`;
    badge.textContent = status.label;

    header.appendChild(title);
    header.appendChild(badge);

    const metrics = document.createElement("div");
    metrics.className = "readiness-card-metrics";
    appendReadinessMetric(metrics, "Test score", `${item.percentage}%`);
    appendReadinessMetric(metrics, "Skill weight", `${item.skill.weight}`);
    appendReadinessMetric(metrics, "Contribution", `${formatReadinessNumber(item.weightedContribution)} pts`);

    card.appendChild(header);
    card.appendChild(metrics);
    return card;
  }

  function appendStudyPlan(container, item) {
    const plan = skillStudyPlans[item.skillKey];
    const card = document.createElement("article");
    card.className = "readiness-study-card";

    const title = document.createElement("h4");
    title.textContent = `${item.skill.name} study plan`;

    card.appendChild(title);

    if (plan) {
      const study = document.createElement("p");
      study.className = "readiness-study-line";
      study.textContent = `Study: ${plan.study}`;
      card.appendChild(study);

      const actionsLabel = document.createElement("p");
      actionsLabel.className = "readiness-study-label";
      actionsLabel.textContent = "Actions:";
      card.appendChild(actionsLabel);

      const actions = document.createElement("ol");
      plan.actions.forEach((action) => {
        const itemNode = document.createElement("li");
        itemNode.textContent = action;
        actions.appendChild(itemNode);
      });
      card.appendChild(actions);

      const project = document.createElement("p");
      project.className = "readiness-mini-project";
      project.textContent = `Mini project: ${plan.miniProject}`;
      card.appendChild(project);
    } else {
      const fallback = document.createElement("p");
      fallback.textContent = "Review the required topics, practise weak areas, and retake the full skill test.";
      card.appendChild(fallback);
    }

    container.appendChild(card);
  }

  function appendStrongSkillUse(container, item) {
    const card = document.createElement("article");
    card.className = "readiness-strong-card";

    const title = document.createElement("h4");
    title.textContent = `You are strong in ${item.skill.name}`;

    const suggestion = document.createElement("p");
    suggestion.textContent = strongPortfolioSuggestions[item.skillKey] || "Use this strength in a portfolio project and explain the result clearly.";

    card.appendChild(title);
    card.appendChild(suggestion);
    container.appendChild(card);
  }

  function getSevenDayPlanItems(breakdown, weakSkills) {
    const focusSkills = (weakSkills.length > 0 ? weakSkills : [...breakdown])
      .sort((first, second) => first.percentage - second.percentage);
    const primarySkill = focusSkills[0] ? focusSkills[0].skill.name : "your weakest skill";
    const secondarySkill = focusSkills[1] ? focusSkills[1].skill.name : primarySkill;

    return [
      `Revise ${primarySkill} basics`,
      `Practise topic questions for ${primarySkill}`,
      "Review wrong answers and write short correction notes",
      `Build a mini project focused on ${primarySkill}`,
      `Practise ${secondarySkill} fundamentals`,
      `Combine ${primarySkill} and ${secondarySkill} in one small project`,
      "Retake weak skill tests"
    ];
  }

  function createReadinessPanel(countryKey, roleKey, role) {
    const result = getReadinessResult(countryKey, roleKey, role);
    const panel = document.createElement("div");
    panel.className = "guide-placeholder readiness-panel";
    panel.dataset.readinessSection = "true";

    const heading = document.createElement("div");
    heading.className = "readiness-heading";

    const title = document.createElement("h2");
    title.textContent = `${role.label} Career Readiness Report`;

    const eyebrow = document.createElement("p");
    eyebrow.textContent = `${role.label} pathway`;

    heading.appendChild(title);
    heading.appendChild(eyebrow);
    panel.appendChild(heading);

    if (!result.isComplete) {
      const locked = document.createElement("p");
      locked.className = "readiness-locked-message";
      locked.textContent = "Complete all skill tests to unlock your overall readiness report.";
      panel.appendChild(locked);
      return panel;
    }

    const reportHero = document.createElement("div");
    reportHero.className = "readiness-report-hero";

    const scoreRing = document.createElement("div");
    scoreRing.className = "readiness-score-ring";
    scoreRing.style.setProperty("--score-percent", Math.min(100, Math.max(0, result.overallScore)));
    scoreRing.setAttribute("aria-label", `Overall score ${formatReadinessNumber(result.overallScore)} out of 100`);

    const ringInner = document.createElement("div");
    ringInner.className = "readiness-score-ring-inner";

    const scoreValue = document.createElement("strong");
    scoreValue.textContent = formatReadinessNumber(result.overallScore);

    const outOf = document.createElement("span");
    outOf.textContent = "/100";

    ringInner.appendChild(scoreValue);
    ringInner.appendChild(outOf);
    scoreRing.appendChild(ringInner);

    const reportSummary = document.createElement("div");
    reportSummary.className = "readiness-report-summary";

    const scoreCaption = document.createElement("p");
    scoreCaption.className = "readiness-score-caption";
    scoreCaption.textContent = "Overall readiness score";

    const label = document.createElement("p");
    label.className = "readiness-label";
    label.textContent = result.label;

    const summaryText = document.createElement("p");
    summaryText.className = "readiness-summary-text";
    summaryText.textContent = getReadinessSummary(result.overallScore, role.label);

    reportSummary.appendChild(scoreCaption);
    reportSummary.appendChild(label);
    reportSummary.appendChild(summaryText);
    reportHero.appendChild(scoreRing);
    reportHero.appendChild(reportSummary);
    panel.appendChild(reportHero);

    const skillCardsSection = document.createElement("section");
    skillCardsSection.className = "readiness-report-section";
    const skillCardsTitle = document.createElement("h3");
    skillCardsTitle.textContent = "Skill performance";
    const skillCardGrid = document.createElement("div");
    skillCardGrid.className = "readiness-skill-card-grid";
    result.breakdown.forEach((item) => {
      skillCardGrid.appendChild(createReadinessSkillCard(item));
    });
    skillCardsSection.appendChild(skillCardsTitle);
    skillCardsSection.appendChild(skillCardGrid);
    panel.appendChild(skillCardsSection);

    const suggestionsSection = document.createElement("section");
    suggestionsSection.className = "readiness-report-section readiness-suggestions";
    const suggestionTitle = document.createElement("h3");
    suggestionTitle.textContent = "Detailed study suggestions";
    suggestionsSection.appendChild(suggestionTitle);

    if (result.weakSkills.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No weak skills below 60%. Keep applying these skills in portfolio projects.";
      suggestionsSection.appendChild(message);
    } else {
      result.weakSkills.forEach((item) => {
        appendStudyPlan(suggestionsSection, item);
      });
    }

    panel.appendChild(suggestionsSection);

    const strongSection = document.createElement("section");
    strongSection.className = "readiness-report-section readiness-strong-skills";
    const strongTitle = document.createElement("h3");
    strongTitle.textContent = "Strong Skills";
    strongSection.appendChild(strongTitle);

    if (result.strongSkills.length === 0) {
      const emptyStrong = document.createElement("p");
      emptyStrong.textContent = "No skills are at 75% or above yet. Use the improvement plan to build a stronger portfolio base.";
      strongSection.appendChild(emptyStrong);
    } else {
      result.strongSkills.forEach((item) => {
        appendStrongSkillUse(strongSection, item);
      });
    }

    panel.appendChild(strongSection);

    const sevenDaySection = document.createElement("section");
    sevenDaySection.className = "readiness-report-section readiness-seven-day";
    const sevenDayTitle = document.createElement("h3");
    sevenDayTitle.textContent = "7-day improvement plan";
    const sevenDayList = document.createElement("div");
    sevenDayList.className = "readiness-seven-day-list";
    getSevenDayPlanItems(result.breakdown, result.weakSkills).forEach((step, index) => {
      const item = document.createElement("article");
      item.className = "readiness-day-card";
      const day = document.createElement("strong");
      day.className = "readiness-day-label";
      day.textContent = `Day ${index + 1}`;
      const text = document.createElement("p");
      text.className = "readiness-day-task";
      text.textContent = step;
      item.appendChild(day);
      item.appendChild(text);
      sevenDayList.appendChild(item);
    });
    sevenDaySection.appendChild(sevenDayTitle);
    sevenDaySection.appendChild(sevenDayList);
    panel.appendChild(sevenDaySection);

    return panel;
  }

  function updateReadinessSection(countryKey, roleKey, role) {
    const existingSection = skillTableArea.querySelector("[data-readiness-section]");

    if (existingSection) {
      existingSection.remove();
    }

    const selectedRole = role || data.roles[roleKey];

    if (!selectedRole) {
      return;
    }

    skillTableArea.appendChild(createReadinessPanel(countryKey, roleKey, selectedRole));
  }

  function createQuestionOption(skillKey, questionIndex, optionText) {
    const label = document.createElement("label");
    label.className = "test-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `${skillKey}-question-${questionIndex}`;
    input.value = optionText;

    const text = document.createElement("span");
    text.textContent = optionText;

    label.appendChild(input);
    label.appendChild(text);
    return label;
  }

  function closeSkillTestModal() {
    const existingModal = document.querySelector(".quiz-modal-overlay");

    if (existingModal) {
      existingModal.remove();
    }

    document.body.classList.remove("modal-open");
  }

  function createModalShell() {
    closeSkillTestModal();

    const overlay = document.createElement("div");
    overlay.className = "quiz-modal-overlay";

    const modal = document.createElement("div");
    modal.className = "quiz-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "quizModalTitle");

    const header = document.createElement("div");
    header.className = "quiz-modal-header";

    const title = document.createElement("h2");
    title.id = "quizModalTitle";

    const closeButton = document.createElement("button");
    closeButton.className = "quiz-modal-close";
    closeButton.type = "button";
    closeButton.textContent = "Close";

    const body = document.createElement("div");
    body.className = "quiz-modal-body";

    closeButton.addEventListener("click", closeSkillTestModal);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeSkillTestModal();
      }
    });

    header.appendChild(title);
    header.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(body);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.classList.add("modal-open");

    closeButton.focus();

    return { body, title };
  }

  function renderTestResults(resultArea, questions, answers, score) {
    resultArea.innerHTML = "";

    const summary = document.createElement("p");
    summary.className = "test-score-summary";
    summary.textContent = `Score: ${score.correct}/${score.total} (${score.percentage}%)`;
    resultArea.appendChild(summary);

    const wrongAnswers = questions
      .map((question, index) => ({
        question,
        index,
        selectedAnswer: answers[index]
      }))
      .filter((item) => item.selectedAnswer !== item.question.correctAnswer);

    if (wrongAnswers.length === 0) {
      const success = document.createElement("p");
      success.textContent = "All answers correct.";
      resultArea.appendChild(success);
      return;
    }

    wrongAnswers.forEach((item) => {
      const explanation = document.createElement("div");
      explanation.className = "test-explanation";

      const title = document.createElement("h4");
      title.textContent = `Question ${item.index + 1}: ${item.question.topic} (${item.question.difficulty})`;

      const selected = document.createElement("p");
      selected.textContent = `Your answer: ${item.selectedAnswer || "No answer selected"}`;

      const correct = document.createElement("p");
      correct.textContent = `Correct answer: ${item.question.correctAnswer}`;

      const reason = document.createElement("p");
      reason.textContent = item.question.explanation;

      explanation.appendChild(title);
      explanation.appendChild(selected);
      explanation.appendChild(correct);
      explanation.appendChild(reason);
      resultArea.appendChild(explanation);
    });
  }

  function renderSkillTest(countryKey, roleKey, skillKey) {
    const questionSet = getQuestionsForSkill(skillKey);

    if (!questionSet) {
      return;
    }

    let questionGroups = createAttemptQuestionGroups(getQuestionGroups(questionSet));
    const flatQuestions = questionGroups.flatMap((group) => group.questions);
    const totalQuestions = flatQuestions.length;
    const attempt = {
      answers: new Array(totalQuestions).fill(""),
      completedTopics: new Set()
    };
    const modal = createModalShell();

    function showTopicSelection() {
      if (attempt.completedTopics.size === questionGroups.length) {
        showFinalResults();
        return;
      }

      modal.title.textContent = `${questionSet.label} Skill Test`;
      modal.body.innerHTML = "";

      const intro = document.createElement("p");
      intro.textContent = "Choose a topic to start first.";

      const progress = document.createElement("p");
      progress.className = "topic-progress";
      progress.textContent = `${attempt.completedTopics.size} of ${questionGroups.length} topics completed.`;

      const topicGrid = document.createElement("div");
      topicGrid.className = "topic-button-grid";

      questionGroups.forEach((group) => {
        const isCompleted = attempt.completedTopics.has(group.topic);
        const topicButton = document.createElement("button");
        topicButton.className = `topic-choice-button${isCompleted ? " completed" : ""}`;
        topicButton.type = "button";

        const topicName = document.createElement("span");
        topicName.textContent = group.topic;
        topicButton.appendChild(topicName);

        if (isCompleted) {
          const completed = document.createElement("span");
          completed.className = "topic-status-pill";
          completed.textContent = "Completed";
          topicButton.disabled = true;
          topicButton.appendChild(completed);
        } else {
          topicButton.addEventListener("click", () => startTopicQuiz(group));
        }

        topicGrid.appendChild(topicButton);
      });

      modal.body.appendChild(intro);
      modal.body.appendChild(progress);
      modal.body.appendChild(topicGrid);
    }

    function startTopicQuiz(group) {
      const questions = group.questions;
      let currentQuestionIndex = 0;

      function getAnsweredCount() {
        return attempt.answers.filter(Boolean).length;
      }

      function showQuestion() {
        const question = questions[currentQuestionIndex];
        const globalQuestionIndex = flatQuestions.indexOf(question);
        modal.title.textContent = `${questionSet.label} Skill Test`;
        modal.body.innerHTML = "";

        const meta = document.createElement("div");
        meta.className = "quiz-question-meta";

        const topicName = document.createElement("span");
        topicName.className = "quiz-topic-name";
        topicName.textContent = question.topic;

        const difficulty = document.createElement("span");
        difficulty.className = "difficulty-badge";
        difficulty.textContent = question.difficulty;

        const count = document.createElement("span");
        count.className = "quiz-question-count";
        count.textContent = `Question ${getAnsweredCount() + 1} of ${totalQuestions}`;

        const questionText = document.createElement("h3");
        questionText.className = "quiz-question-title";
        questionText.textContent = question.question;

        const options = document.createElement("div");
        options.className = "test-options";

        question.options.forEach((option) => {
          options.appendChild(createQuestionOption(skillKey, globalQuestionIndex, option));
        });

        const error = document.createElement("p");
        error.className = "quiz-error";
        error.setAttribute("aria-live", "polite");

        const actions = document.createElement("div");
        actions.className = "quiz-modal-actions";

        const nextButton = document.createElement("button");
        nextButton.className = "btn primary quiz-next-button";
        nextButton.type = "button";
        nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Complete Topic" : "Next";

        nextButton.addEventListener("click", () => {
          const selected = modal.body.querySelector(`input[name="${skillKey}-question-${globalQuestionIndex}"]:checked`);

          if (!selected) {
            error.textContent = "Choose an answer before continuing.";
            return;
          }

          attempt.answers[globalQuestionIndex] = selected.value;

          if (currentQuestionIndex === questions.length - 1) {
            attempt.completedTopics.add(group.topic);
            showTopicSelection();
            return;
          }

          currentQuestionIndex++;
          showQuestion();
        });

        meta.appendChild(topicName);
        meta.appendChild(difficulty);
        meta.appendChild(count);
        actions.appendChild(nextButton);
        modal.body.appendChild(meta);
        modal.body.appendChild(questionText);
        modal.body.appendChild(options);
        modal.body.appendChild(error);
        modal.body.appendChild(actions);
      }

      showQuestion();
    }

    function resetAttempt() {
      questionGroups = createAttemptQuestionGroups(getQuestionGroups(questionSet));
      const shuffledFlatQuestions = questionGroups.flatMap((group) => group.questions);
      flatQuestions.splice(0, flatQuestions.length, ...shuffledFlatQuestions);
      attempt.answers = new Array(totalQuestions).fill("");
      attempt.completedTopics.clear();
      showTopicSelection();
    }

    function showFinalResults() {
      const correct = flatQuestions.reduce((total, question, index) => {
        return total + (attempt.answers[index] === question.correctAnswer ? 1 : 0);
      }, 0);
      const score = {
        correct,
        total: totalQuestions,
        percentage: Math.round((correct / totalQuestions) * 100),
        updatedAt: new Date().toISOString()
      };

      saveSkillScore(countryKey, roleKey, skillKey, score);
      updateSkillScoreCell(countryKey, roleKey, skillKey);
      updateReadinessSection(countryKey, roleKey);

      modal.title.textContent = `${questionSet.label} Test Results`;
      modal.body.innerHTML = "";
      renderTestResults(modal.body, flatQuestions, attempt.answers, score);

      const actions = document.createElement("div");
      actions.className = "quiz-modal-actions";

      const retakeButton = document.createElement("button");
      retakeButton.className = "btn primary quiz-retake-button";
      retakeButton.type = "button";
      retakeButton.textContent = "Retake Full Test";
      retakeButton.addEventListener("click", resetAttempt);

      actions.appendChild(retakeButton);
      modal.body.appendChild(actions);
    }

    showTopicSelection();
  }

  function renderSkillTable(countryKey, roleKey) {
    const country = data.countries[countryKey];
    const role = data.roles[roleKey];

    if (!role) {
      const selectedRole = roleSelect.options[roleSelect.selectedIndex].text;
      renderMessage(`${selectedRole} guidance is coming soon. Select Data Scientist or Data Analyst for now.`);
      return;
    }

    clearSkillArea();

    const panel = document.createElement("div");
    panel.className = "guide-placeholder skill-table-panel";

    const heading = document.createElement("div");
    heading.className = "skill-table-heading";

    const title = document.createElement("h2");
    title.textContent = `${role.label} Skill Roadmap`;

    const summary = document.createElement("p");
    summary.textContent = `${country.label} selected. Skill weights total ${role.totalWeight}.`;

    heading.appendChild(title);
    heading.appendChild(summary);

    const tableWrap = document.createElement("div");
    tableWrap.className = "skill-table-wrap";

    const table = document.createElement("table");
    table.className = "skill-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Skill", "Required Topics", "Why It Matters", "Weight", "Score", "Action"].forEach((column) => {
      headerRow.appendChild(createCell(column, "th"));
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement("tbody");
    role.skills.forEach((skill) => {
      const skillKey = getSkillKey(skill.name);
      const skillQuestions = getQuestionsForSkill(skillKey);
      const questionCount = skillQuestions ? getFlatQuestions(skillQuestions).length : 0;
      const row = document.createElement("tr");
      row.appendChild(createCell(skill.name, "td"));
      row.appendChild(createCell(skill.requiredTopics.join(", "), "td"));
      row.appendChild(createCell(skill.reason, "td"));
      row.appendChild(createCell(`${skill.weight}`, "td"));

      const savedScore = questionCount > 0 ? loadSavedScore(countryKey, roleKey, skillKey) : null;
      const scoreCell = createCell(formatScore(savedScore), "td");
      scoreCell.dataset.skillScore = skillKey;
      row.appendChild(scoreCell);

      const actionCell = document.createElement("td");
      const actionButton = document.createElement("button");
      actionButton.type = "button";

      if (questionCount > 0) {
        actionButton.className = "active-test-button";
        actionButton.textContent = "Start Test";
        actionButton.addEventListener("click", () => renderSkillTest(countryKey, roleKey, skillKey));
      } else {
        actionButton.className = "disabled-test-button";
        actionButton.disabled = true;
        actionButton.textContent = "Test coming next";
      }

      actionCell.appendChild(actionButton);
      row.appendChild(actionCell);

      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    panel.appendChild(heading);
    panel.appendChild(tableWrap);
    skillTableArea.appendChild(panel);
    updateReadinessSection(countryKey, roleKey, role);
  }

  function updateGuide() {
    const countryKey = countrySelect.value;
    const roleKey = roleSelect.value;

    if (!countryKey || !roleKey) {
      renderMessage("Select a country and role to view your skill roadmap.");
      return;
    }

    renderSkillTable(countryKey, roleKey);
  }

  function setDropdownOpen(dropdown, isOpen) {
    const trigger = dropdown.querySelector(".custom-dropdown-trigger");

    dropdown.classList.toggle("open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
  }

  function closeCustomDropdowns(exceptDropdown) {
    document.querySelectorAll("[data-custom-select]").forEach((dropdown) => {
      if (dropdown !== exceptDropdown) {
        setDropdownOpen(dropdown, false);
      }
    });
  }

  function syncCustomDropdown(dropdown) {
    const select = document.getElementById(dropdown.dataset.selectId);
    const valueText = dropdown.querySelector(".custom-dropdown-value");
    const selectedOption = select.options[select.selectedIndex];

    valueText.textContent = selectedOption ? selectedOption.text : "";

    dropdown.querySelectorAll("[data-value]").forEach((option) => {
      const isSelected = option.dataset.value === select.value;
      option.classList.toggle("selected", isSelected);
      option.setAttribute("aria-selected", String(isSelected));
    });
  }

  function focusOption(dropdown, direction) {
    const options = Array.from(dropdown.querySelectorAll("[data-value]"));
    const currentIndex = options.indexOf(document.activeElement);
    const nextIndex = currentIndex === -1
      ? 0
      : (currentIndex + direction + options.length) % options.length;

    options[nextIndex].focus();
  }

  function setupCustomDropdowns() {
    document.querySelectorAll("[data-custom-select]").forEach((dropdown) => {
      const select = document.getElementById(dropdown.dataset.selectId);
      const trigger = dropdown.querySelector(".custom-dropdown-trigger");

      syncCustomDropdown(dropdown);
      select.addEventListener("change", () => syncCustomDropdown(dropdown));

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = dropdown.classList.contains("open");
        closeCustomDropdowns(dropdown);
        setDropdownOpen(dropdown, !isOpen);
      });

      trigger.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          closeCustomDropdowns(dropdown);
          setDropdownOpen(dropdown, true);
          focusOption(dropdown, 1);
        }

        if (event.key === "Escape") {
          setDropdownOpen(dropdown, false);
        }
      });

      dropdown.querySelectorAll("[data-value]").forEach((option) => {
        option.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

          select.value = option.dataset.value;
          syncCustomDropdown(dropdown);
          select.dispatchEvent(new Event("change", { bubbles: true }));
          setDropdownOpen(dropdown, false);
          trigger.focus();
        });

        option.addEventListener("keydown", (event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            focusOption(dropdown, 1);
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            focusOption(dropdown, -1);
          }

          if (event.key === "Escape") {
            setDropdownOpen(dropdown, false);
            trigger.focus();
          }
        });
      });
    });

    document.addEventListener("click", () => {
      closeCustomDropdowns();
    });
  }

  setupCustomDropdowns();
  countrySelect.addEventListener("change", updateGuide);
  roleSelect.addEventListener("change", updateGuide);
  updateGuide();
})();
