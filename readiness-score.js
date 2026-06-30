document.addEventListener("DOMContentLoaded", () => {
  const dashboard = document.querySelector("[data-readiness-dashboard]");

  if (!dashboard) {
    return;
  }

  const careerScorePrefix = "careerGuideScore:";
  const gcseResultKey = "techpathGcseStarterQuizResult";
  const categoryOrder = [
    "python",
    "sql",
    "cloud",
    "maths",
    "git",
    "communication",
    "projects",
    "career-prep"
  ];
  const categories = {
    python: {
      label: "Python",
      suggestion: "Complete a Career Guide Python skill test, then use your result to plan Python practice."
    },
    sql: {
      label: "SQL",
      suggestion: "Complete a Career Guide SQL skill test, then practise queries around your weakest topics."
    },
    cloud: {
      label: "Cloud",
      suggestion: "Use Cloud Fundamentals and Linux test evidence to plan cloud infrastructure practice."
    },
    maths: {
      label: "Maths",
      suggestion: "Use saved Maths, Statistics or GCSE Starter Quiz evidence to plan revision."
    },
    git: {
      label: "Git",
      suggestion: "Complete a Career Guide Git skill test and apply the result in a documented project repository."
    },
    communication: {
      label: "Communication",
      suggestion: "Use Communication test evidence to improve portfolio explanations, reports and interview preparation."
    },
    projects: {
      label: "Projects",
      suggestion: "Project readiness will be assessed in a future version using portfolio/project checks."
    },
    "career-prep": {
      label: "Career Prep",
      suggestion: "Career Prep is shown only when real saved evidence such as Communication, Excel or Power BI exists."
    }
  };
  const skillCategoryMap = {
    python: ["python"],
    sql: ["sql"],
    "cloud-fundamentals": ["cloud"],
    linux: ["cloud"],
    git: ["git"],
    communication: ["communication", "career-prep"],
    maths: ["maths"],
    statistics: ["maths"],
    excel: ["career-prep"],
    "power-bi": ["career-prep"]
  };
  const roadmapActions = {
    python: {
      label: "Open Python lessons",
      href: "python-learning.html"
    },
    sql: {
      label: "Open SQL lessons",
      href: "sql-learning.html"
    },
    cloud: {
      label: "Open Cloud roadmap",
      href: "cloud-engineer-roadmap.html"
    },
    maths: {
      label: "Open GCSE starter quiz",
      href: "gcse-maths-python-roadmap.html"
    },
    git: {
      label: "Open Career Path Guide",
      href: "career-path-guide.html"
    },
    communication: {
      label: "Open Career Path Guide",
      href: "career-path-guide.html"
    },
    projects: {
      label: "Explore project guidance",
      href: "career-guidance.html"
    },
    "career-prep": {
      label: "Explore career guidance",
      href: "career-guidance.html"
    }
  };
  const roadmapSteps = {
    python: {
      unassessed: [
        "Complete a Python readiness test or start the Python learning page.",
        "Learn variables, conditions, loops, lists and functions.",
        "Build one small beginner project."
      ],
      basics: [
        "Relearn Python basics with beginner examples.",
        "Practise 10-15 short coding problems.",
        "Build a marks calculator or study tracker."
      ],
      foundations: [
        "Practise functions, lists, dictionaries and simple files.",
        "Review wrong answers from your saved skill test.",
        "Build a small project that solves one clear problem."
      ],
      project: [
        "Build a mini project using functions, lists, dictionaries and files.",
        "Add the project to GitHub with a clear README.",
        "Explain the project in your portfolio."
      ],
      strong: [
        "Build a role-based Python portfolio project.",
        "Practise explaining your code and decisions.",
        "Prepare interview-style Python questions."
      ]
    },
    sql: {
      unassessed: [
        "Complete a SQL readiness test or start the SQL learning page.",
        "Learn SELECT, WHERE, ORDER BY and GROUP BY.",
        "Practise one small table-based query task."
      ],
      basics: [
        "Relearn SELECT, WHERE and basic filtering.",
        "Practise 10-15 short SQL queries.",
        "Create a small learner or sales table example."
      ],
      foundations: [
        "Practise GROUP BY, aggregates and joins.",
        "Write queries that answer realistic business questions.",
        "Review mistakes from your saved SQL result."
      ],
      project: [
        "Build a small data project with tables, joins and grouped summaries.",
        "Save your queries with notes explaining each result.",
        "Add the project to your portfolio as evidence."
      ],
      strong: [
        "Practise advanced joins, subqueries and reporting queries.",
        "Explain your SQL decisions in plain English.",
        "Prepare SQL interview-style questions."
      ]
    },
    cloud: {
      unassessed: [
        "Complete Cloud Fundamentals or Linux readiness tests.",
        "Review compute, storage, networking and IAM basics.",
        "Follow the Cloud Engineer roadmap for a starter order."
      ],
      basics: [
        "Relearn core cloud service types and Linux basics.",
        "Practise file navigation, permissions and simple commands.",
        "Sketch a basic cloud architecture for a small website."
      ],
      foundations: [
        "Practise cloud security, networking and Linux service concepts.",
        "Use Git to document cloud notes and diagrams.",
        "Build a small deployment plan without adding paid services."
      ],
      project: [
        "Create a portfolio cloud architecture plan.",
        "Document compute, storage, networking and IAM choices.",
        "Connect the plan to a small web or data project."
      ],
      strong: [
        "Strengthen deployment and troubleshooting scenarios.",
        "Practise explaining cloud tradeoffs and cost choices.",
        "Prepare Cloud Engineer interview-style questions."
      ]
    },
    maths: {
      unassessed: [
        "Complete the GCSE Starter Quiz or a Maths/Statistics skill test.",
        "Review percentages, ratios, algebra and basic statistics.",
        "Practise a few short calculation questions each day."
      ],
      basics: [
        "Relearn core number, algebra and percentage foundations.",
        "Practise worked examples before timed questions.",
        "Use mistakes to create a short revision checklist."
      ],
      foundations: [
        "Practise GCSE Maths or Statistics topics below 60%.",
        "Connect maths examples to data, Python or SQL tasks.",
        "Retake a saved quiz after focused revision."
      ],
      project: [
        "Use maths in a marks, budget or data-summary project.",
        "Write a short explanation of the calculation method.",
        "Add a simple visual or table to show the result."
      ],
      strong: [
        "Apply maths to a portfolio data or analysis project.",
        "Practise explaining formulas in plain English.",
        "Prepare examples that connect maths to your target role."
      ]
    },
    git: {
      unassessed: [
        "Complete a Git readiness test in the Career Path Guide.",
        "Learn commits, branches, merges and remotes.",
        "Create one small GitHub repository for practice."
      ],
      basics: [
        "Practise git status, add, commit and log.",
        "Write clear commit messages for small changes.",
        "Push one simple project to GitHub."
      ],
      foundations: [
        "Practise branches, merges and resolving simple conflicts.",
        "Improve one project README.",
        "Use Git history to show steady project progress."
      ],
      project: [
        "Publish a project with clean commits and branches.",
        "Add a README with setup, tools and results.",
        "Use GitHub as portfolio evidence."
      ],
      strong: [
        "Practise collaboration-style Git workflows.",
        "Review pull request and issue workflows conceptually.",
        "Prepare to explain your Git workflow in interviews."
      ]
    },
    communication: {
      unassessed: [
        "Complete a Communication readiness test.",
        "Practise explaining one project in simple language.",
        "Write a short summary with problem, method and result."
      ],
      basics: [
        "Practise explaining charts or code without jargon.",
        "Write three short project summary paragraphs.",
        "Record common questions and draft simple answers."
      ],
      foundations: [
        "Turn one project into a clear story.",
        "Practise stakeholder-friendly summaries.",
        "Improve your README and portfolio wording."
      ],
      project: [
        "Create portfolio stories for two projects.",
        "Prepare concise interview answers using your evidence.",
        "Practise explaining tradeoffs and learning decisions."
      ],
      strong: [
        "Strengthen interview examples with clear outcomes.",
        "Practise presenting a project in two minutes.",
        "Refine portfolio language for your target role."
      ]
    },
    "career-prep": {
      unassessed: [
        "Review your CV and LinkedIn profile.",
        "Create a job or application tracker.",
        "Prepare three project explanations."
      ],
      basics: [
        "Use available saved evidence to identify weak career-prep signals.",
        "Improve your CV, LinkedIn and project summaries.",
        "Create a simple application tracker."
      ],
      foundations: [
        "Strengthen project evidence and written explanations.",
        "Practise matching skills to job descriptions.",
        "Prepare short answers about your learning progress."
      ],
      project: [
        "Use saved Communication, Excel or Power BI evidence to refine your profile.",
        "Build portfolio proof for your strongest assessed areas.",
        "Prepare application materials around real project evidence."
      ],
      strong: [
        "Refine interview answers using your saved evidence.",
        "Prepare targeted CV and LinkedIn versions.",
        "Keep tracking applications and follow-up actions."
      ]
    },
    projects: {
      unassessed: [
        "Choose one small project based on your target role.",
        "Write a README with problem, tools, steps and result.",
        "Add screenshots and learning notes."
      ]
    }
  };

  const state = categoryOrder.reduce((profile, key) => {
    profile[key] = {
      ...categories[key],
      key,
      sources: []
    };
    return profile;
  }, {});
  const supportingNotes = [];

  function readJson(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  }

  function getStorageKeys() {
    try {
      return Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index)).filter(Boolean);
    } catch (error) {
      return [];
    }
  }

  function formatSlug(slug) {
    return String(slug)
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function getRoleLabel(roleKey) {
    const role = window.careerGuideData && window.careerGuideData.roles
      ? window.careerGuideData.roles[roleKey]
      : null;
    return role && role.label ? role.label : formatSlug(roleKey);
  }

  function getCountryLabel(countryKey) {
    const country = window.careerGuideData && window.careerGuideData.countries
      ? window.careerGuideData.countries[countryKey]
      : null;
    return country && country.label ? country.label : countryKey.toUpperCase();
  }

  function getSkillKey(skillName) {
    return String(skillName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function getSkillLabel(roleKey, skillKey) {
    const role = window.careerGuideData && window.careerGuideData.roles
      ? window.careerGuideData.roles[roleKey]
      : null;
    const skill = role && Array.isArray(role.skills)
      ? role.skills.find((item) => getSkillKey(item.name) === skillKey)
      : null;
    return skill && skill.name ? skill.name : formatSlug(skillKey);
  }

  function normalisePercentage(value) {
    const percentage = Number(value);
    return Number.isFinite(percentage) ? Math.max(0, Math.min(100, percentage)) : null;
  }

  function average(values) {
    const realValues = values.filter((value) => Number.isFinite(value));
    if (!realValues.length) {
      return null;
    }
    return realValues.reduce((total, value) => total + value, 0) / realValues.length;
  }

  function formatScore(value) {
    if (!Number.isFinite(value)) {
      return "Not assessed yet";
    }
    const rounded = Math.round(value * 10) / 10;
    return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}%`;
  }

  function getStatus(percentage) {
    if (!Number.isFinite(percentage)) {
      return { label: "Not assessed yet", className: "not-assessed" };
    }
    if (percentage >= 80) {
      return { label: "Strong", className: "strong" };
    }
    if (percentage >= 60) {
      return { label: "Developing", className: "developing" };
    }
    if (percentage >= 40) {
      return { label: "Needs practice", className: "needs-practice" };
    }
    return { label: "Beginner", className: "beginner" };
  }

  function parseCareerScoreKey(key) {
    if (!key || !key.startsWith(careerScorePrefix)) {
      return null;
    }

    const parts = key.split(":");
    if (parts.length !== 4 || parts[0] !== "careerGuideScore") {
      return null;
    }

    return {
      countryKey: parts[1],
      roleKey: parts[2],
      skillKey: parts[3]
    };
  }

  function addSource(categoryKey, source) {
    if (!state[categoryKey]) {
      return;
    }
    state[categoryKey].sources.push(source);
  }

  function collectCareerGuideScores() {
    getStorageKeys().forEach((key) => {
      const parsedKey = parseCareerScoreKey(key);
      if (!parsedKey) {
        return;
      }

      const categoryKeys = skillCategoryMap[parsedKey.skillKey];
      if (!categoryKeys || !categoryKeys.length) {
        return;
      }

      const score = readJson(key);
      const percentage = normalisePercentage(score && score.percentage);
      if (percentage === null) {
        return;
      }

      const roleLabel = getRoleLabel(parsedKey.roleKey);
      const skillLabel = getSkillLabel(parsedKey.roleKey, parsedKey.skillKey);
      const countryLabel = getCountryLabel(parsedKey.countryKey);

      categoryKeys.forEach((categoryKey) => {
        addSource(categoryKey, {
          label: `Career Guide: ${roleLabel} / ${skillLabel}`,
          detail: `${countryLabel} saved skill test`,
          percentage,
          updatedAt: score && score.updatedAt ? score.updatedAt : ""
        });
      });
    });
  }

  function collectGcseResult() {
    const result = readJson(gcseResultKey);
    const percentage = normalisePercentage(result && result.percentage);

    if (percentage === null) {
      return;
    }

    addSource("maths", {
      label: "GCSE Starter Quiz",
      detail: result.quizMode && result.quizMode.label ? result.quizMode.label : "Starter quiz",
      percentage,
      updatedAt: result.completedAt || ""
    });

    if (Array.isArray(result.topicBreakdown)) {
      result.topicBreakdown
        .filter((item) => ["Python basics", "Data handling", "Beginner projects"].includes(item.topic))
        .forEach((item) => {
          const topicPercentage = normalisePercentage(item.percentage);
          supportingNotes.push({
            label: item.topic,
            text: topicPercentage === null
              ? "Saved as a supporting GCSE Starter Quiz topic signal."
              : `${topicPercentage}% from the GCSE Starter Quiz topic breakdown. This is shown as a supporting note, not as a separate platform score.`
          });
        });
    }
  }

  function getCategoryScore(category) {
    return average(category.sources.map((source) => source.percentage));
  }

  function getLatestDate(categoriesList) {
    const timestamps = categoriesList
      .flatMap((category) => category.sources.map((source) => Date.parse(source.updatedAt)))
      .filter((timestamp) => Number.isFinite(timestamp));

    if (!timestamps.length) {
      return null;
    }

    return new Date(Math.max(...timestamps));
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (typeof text === "string") {
      element.textContent = text;
    }
    return element;
  }

  function renderSummary(categoriesList) {
    const summaryGrid = dashboard.querySelector("[data-dashboard-summary]");
    if (!summaryGrid) {
      return;
    }

    summaryGrid.innerHTML = "";
    const assessedCategories = categoriesList.filter((category) => Number.isFinite(category.score));
    const overallScore = average(assessedCategories.map((category) => category.score));
    const latestDate = getLatestDate(categoriesList);
    const summaryItems = [
      {
        label: "Overall readiness",
        value: overallScore === null ? "Not assessed yet" : formatScore(overallScore),
        note: "Average of assessed categories only"
      },
      {
        label: "Categories assessed",
        value: String(assessedCategories.length),
        note: "Categories with real saved evidence"
      },
      {
        label: "Categories not assessed",
        value: String(categoriesList.length - assessedCategories.length),
        note: "Not counted as zero"
      },
      {
        label: "Latest saved result",
        value: latestDate ? latestDate.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "No saved result yet",
        note: "From this browser only"
      }
    ];

    summaryItems.forEach((item) => {
      const card = createElement("article", "dashboard-summary-card");
      card.appendChild(createElement("span", "", item.label));
      card.appendChild(createElement("strong", "", item.value));
      card.appendChild(createElement("p", "", item.note));
      summaryGrid.appendChild(card);
    });
  }

  function renderCategory(category) {
    const status = getStatus(category.score);
    const card = createElement("article", `readiness-category-card ${status.className}`);
    const header = createElement("div", "readiness-category-header");
    const scoreBlock = createElement("div", "readiness-category-score");
    const sourceList = createElement("ul", "readiness-source-list");
    const progressTrack = createElement("div", "readiness-category-progress");
    const progressFill = createElement("span");

    header.appendChild(createElement("h3", "", category.label));
    header.appendChild(createElement("span", `readiness-category-status ${status.className}`, status.label));

    scoreBlock.appendChild(createElement("strong", "", formatScore(category.score)));
    scoreBlock.appendChild(createElement("p", "", category.sources.length ? "Average from saved sources" : "No saved assessment source yet"));

    progressFill.style.width = Number.isFinite(category.score) ? `${category.score}%` : "0%";
    progressTrack.appendChild(progressFill);

    if (category.sources.length) {
      category.sources.forEach((source) => {
        const item = document.createElement("li");
        const label = createElement("strong", "", source.label);
        const detail = createElement("span", "", `${source.detail} - ${formatScore(source.percentage)}`);
        item.appendChild(label);
        item.appendChild(detail);
        sourceList.appendChild(item);
      });
    } else {
      const item = document.createElement("li");
      item.appendChild(createElement("span", "", "Not assessed yet"));
      sourceList.appendChild(item);
    }

    card.appendChild(header);
    card.appendChild(scoreBlock);
    card.appendChild(progressTrack);
    card.appendChild(sourceList);
    card.appendChild(createElement("p", "readiness-category-suggestion", category.suggestion));
    return card;
  }

  function renderCategories(categoriesList) {
    const categoryGrid = dashboard.querySelector("[data-dashboard-categories]");
    if (!categoryGrid) {
      return;
    }

    categoryGrid.innerHTML = "";
    categoriesList.forEach((category) => {
      categoryGrid.appendChild(renderCategory(category));
    });
  }

  function renderEmptyState(hasSources) {
    const emptyState = dashboard.querySelector("[data-dashboard-empty]");
    if (emptyState) {
      emptyState.hidden = hasSources;
    }
  }

  function renderSupportingNotes() {
    const notesSection = dashboard.querySelector("[data-dashboard-supporting-notes]");
    const notesArea = dashboard.querySelector("[data-dashboard-notes]");

    if (!notesSection || !notesArea) {
      return;
    }

    if (!supportingNotes.length) {
      notesSection.hidden = true;
      return;
    }

    notesArea.innerHTML = "";
    supportingNotes.forEach((note) => {
      const noteCard = createElement("article", "readiness-supporting-note");
      noteCard.appendChild(createElement("h3", "", note.label));
      noteCard.appendChild(createElement("p", "", note.text));
      notesArea.appendChild(noteCard);
    });
    notesSection.hidden = false;
  }

  function getRoadmapStage(category) {
    if (category.key === "projects") {
      return {
        key: "unassessed",
        label: "Portfolio assessment coming later",
        className: "not-assessed"
      };
    }

    if (!Number.isFinite(category.score)) {
      return {
        key: "unassessed",
        label: "Take assessment first",
        className: "not-assessed"
      };
    }

    if (category.score >= 80) {
      return {
        key: "strong",
        label: "Strengthen portfolio and interview readiness",
        className: "strong"
      };
    }

    if (category.score >= 60) {
      return {
        key: "project",
        label: "Build project evidence",
        className: "developing"
      };
    }

    if (category.score >= 40) {
      return {
        key: "foundations",
        label: "Practise foundations",
        className: "needs-practice"
      };
    }

    return {
      key: "basics",
      label: "Start from basics",
      className: "beginner"
    };
  }

  function getRoadmapSteps(category, stage) {
    const categorySteps = roadmapSteps[category.key] || {};
    return categorySteps[stage.key] || categorySteps.unassessed || [
      "Take a saved assessment first.",
      "Review your weakest topics.",
      "Build one small project or practice task."
    ];
  }

  function createRoadmapCard(category) {
    const stage = getRoadmapStage(category);
    const action = roadmapActions[category.key] || {
      label: "Open Career Path Guide",
      href: "career-path-guide.html"
    };
    const card = createElement("article", `personalised-roadmap-card ${stage.className}`);
    const header = createElement("div", "personalised-roadmap-card-header");
    const titleBlock = createElement("div", "personalised-roadmap-title");
    const scoreText = category.key === "projects" ? "Not assessed yet" : formatScore(category.score);
    const steps = createElement("ol", "personalised-roadmap-steps");
    const sourceNote = category.sources.length
      ? `Based on ${category.sources.length} saved source${category.sources.length === 1 ? "" : "s"}.`
      : "No saved assessment source yet.";

    titleBlock.appendChild(createElement("h3", "", category.label));
    titleBlock.appendChild(createElement("p", "", scoreText));
    header.appendChild(titleBlock);
    header.appendChild(createElement("span", `personalised-roadmap-stage ${stage.className}`, stage.label));

    getRoadmapSteps(category, stage).forEach((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      steps.appendChild(item);
    });

    card.appendChild(header);

    if (category.key === "career-prep" && category.sources.length) {
      card.appendChild(createElement("p", "personalised-roadmap-note", "This Career Prep signal is based only on available saved evidence such as Communication, Excel or Power BI. It is not a CV, interview or job-readiness guarantee."));
    } else if (category.key === "projects") {
      card.appendChild(createElement("p", "personalised-roadmap-note", "No percentage is assigned for Projects yet because there is no saved portfolio/project assessment in this version."));
    } else {
      card.appendChild(createElement("p", "personalised-roadmap-note", sourceNote));
    }

    card.appendChild(steps);

    const link = createElement("a", "btn secondary personalised-roadmap-action", action.label);
    link.href = action.href;
    card.appendChild(link);

    return card;
  }

  function renderPersonalisedRoadmap(categoriesList, hasSources) {
    const roadmapArea = dashboard.querySelector("[data-personalised-roadmap]");
    if (!roadmapArea) {
      return;
    }

    roadmapArea.innerHTML = "";

    if (!hasSources) {
      const emptyState = createElement("div", "personalised-roadmap-empty");
      const actions = createElement("div", "hero-actions personalised-roadmap-empty-actions");
      const guideLink = createElement("a", "btn primary", "Start Career Path Guide");
      const gcseLink = createElement("a", "btn secondary", "Try GCSE Starter Quiz");

      guideLink.href = "career-path-guide.html";
      gcseLink.href = "gcse-maths-python-roadmap.html";

      emptyState.appendChild(createElement("h3", "", "Complete at least one saved assessment to generate a more useful roadmap."));
      emptyState.appendChild(createElement("p", "", "Until then, each category is shown as a suggested next assessment or preparation area."));
      actions.appendChild(guideLink);
      actions.appendChild(gcseLink);
      emptyState.appendChild(actions);
      roadmapArea.appendChild(emptyState);
    }

    const roadmapGrid = createElement("div", "personalised-roadmap-grid");
    categoriesList.forEach((category) => {
      roadmapGrid.appendChild(createRoadmapCard(category));
    });
    roadmapArea.appendChild(roadmapGrid);
  }

  collectCareerGuideScores();
  collectGcseResult();

  const categoriesList = categoryOrder.map((key) => {
    const category = state[key];
    return {
      ...category,
      score: getCategoryScore(category)
    };
  });
  const hasSources = categoriesList.some((category) => category.sources.length > 0);

  renderEmptyState(hasSources);
  renderSummary(categoriesList);
  renderCategories(categoriesList);
  renderPersonalisedRoadmap(categoriesList, hasSources);
  renderSupportingNotes();
});
