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
  renderSupportingNotes();
});
