(function () {
  const careerGuideScorePrefix = "careerGuideScore";
  const gcseResultKey = "techpathGcseStarterQuizResult";
  const resultArea = document.querySelector("[data-readiness-preview-result]");
  const pathList = document.querySelector("[data-readiness-path-list]");

  if (!resultArea || !pathList) {
    return;
  }

  const careerPathKeys = [
    "data-scientist",
    "data-analyst",
    "cloud-engineer",
    "frontend-developer",
    "backend-developer"
  ];

  const pathButtons = Array.from(pathList.querySelectorAll("[data-preview-path]"));

  function getSkillKey(skillName) {
    return String(skillName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function getScoreKey(countryKey, roleKey, skillKey) {
    return `${careerGuideScorePrefix}:${countryKey}:${roleKey}:${skillKey}`;
  }

  function readJson(key) {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      return null;
    }
  }

  function getCountryKeys(data) {
    return data && data.countries ? Object.keys(data.countries) : [];
  }

  function getCountryLabel(data, countryKey) {
    return data && data.countries && data.countries[countryKey]
      ? data.countries[countryKey].label
      : countryKey.toUpperCase();
  }

  function normalisePercentage(score) {
    const percentage = score && Number(score.percentage);
    return Number.isFinite(percentage) ? Math.max(0, Math.min(100, percentage)) : null;
  }

  function getCareerPathResult(roleKey) {
    const data = window.careerGuideData;
    const role = data && data.roles ? data.roles[roleKey] : null;

    if (!role || !Array.isArray(role.skills)) {
      return null;
    }

    const candidates = getCountryKeys(data)
      .map((countryKey) => {
        let latestUpdate = 0;
        const skillScores = role.skills.map((skill) => {
          const skillKey = getSkillKey(skill.name);
          const score = readJson(getScoreKey(countryKey, roleKey, skillKey));
          const percentage = normalisePercentage(score);
          const updatedAt = score && score.updatedAt ? Date.parse(score.updatedAt) || 0 : 0;
          latestUpdate = Math.max(latestUpdate, updatedAt);

          return {
            name: skill.name,
            weight: Number(skill.weight) || 0,
            percentage,
            score
          };
        });
        const completedCount = skillScores.filter((item) => item.percentage !== null).length;
        const isComplete = completedCount === skillScores.length && completedCount > 0;
        const overallScore = isComplete
          ? skillScores.reduce((total, item) => total + item.percentage * item.weight / 100, 0)
          : null;

        return {
          roleKey,
          roleLabel: role.label,
          countryKey,
          countryLabel: getCountryLabel(data, countryKey),
          skillScores,
          completedCount,
          totalSkills: skillScores.length,
          isComplete,
          isPartial: completedCount > 0 && !isComplete,
          overallScore,
          latestUpdate
        };
      })
      .filter((candidate) => candidate.completedCount > 0)
      .sort((first, second) => {
        if (first.isComplete !== second.isComplete) {
          return first.isComplete ? -1 : 1;
        }

        if (first.completedCount !== second.completedCount) {
          return second.completedCount - first.completedCount;
        }

        return second.latestUpdate - first.latestUpdate;
      });

    return candidates[0] || {
      roleKey,
      roleLabel: role.label,
      skillScores: role.skills.map((skill) => ({
        name: skill.name,
        weight: Number(skill.weight) || 0,
        percentage: null,
        score: null
      })),
      completedCount: 0,
      totalSkills: role.skills.length,
      isComplete: false,
      isPartial: false,
      overallScore: null
    };
  }

  function getGcseResult() {
    const result = readJson(gcseResultKey);

    if (!result || !Array.isArray(result.topicBreakdown)) {
      return null;
    }

    return result;
  }

  function getStatusLabel(percentage) {
    if (percentage === null) {
      return "Not tested";
    }

    if (percentage >= 80) {
      return "Strong";
    }

    if (percentage >= 60) {
      return "Good progress";
    }

    if (percentage >= 40) {
      return "Developing";
    }

    return "Needs focus";
  }

  function formatScore(value) {
    const rounded = Math.round(value * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
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

  function clearResultArea() {
    resultArea.innerHTML = "";
  }

  function renderInitialState() {
    clearResultArea();

    const emptyState = createElement("div", "preview-empty-state");
    emptyState.appendChild(createElement("h2", "", "Select a completed path to preview your readiness breakdown."));
    emptyState.appendChild(createElement("p", "", "Complete a Career Path Guide assessment to unlock skill-level progress here."));
    resultArea.appendChild(emptyState);
  }

  function renderNoResult(pathLabel, message, linkText, linkUrl) {
    clearResultArea();

    const state = createElement("div", "preview-empty-state preview-selected-empty");
    state.appendChild(createElement("p", "tag", pathLabel));
    state.appendChild(createElement("h2", "", "No completed readiness result yet"));
    state.appendChild(createElement("p", "", message));

    const link = createElement("a", "btn secondary preview-result-link", linkText);
    link.href = linkUrl;
    state.appendChild(link);
    resultArea.appendChild(state);
  }

  function createGraphRow(label, percentage) {
    const row = createElement("div", "readiness-graph-row");
    const line = createElement("div", "readiness-graph-row-main");
    const title = createElement("span", "readiness-graph-label", label);
    const value = createElement("strong", "readiness-graph-value", percentage === null ? "Not tested" : `${percentage}%`);
    const track = createElement("div", "readiness-graph-bar");
    const fill = createElement("span", "readiness-graph-fill");

    row.title = getStatusLabel(percentage);
    fill.style.width = percentage === null ? "0%" : `${percentage}%`;
    track.appendChild(fill);
    line.appendChild(title);
    line.appendChild(value);
    row.appendChild(line);
    row.appendChild(track);
    return row;
  }

  function renderCompactGraph({ tag, title, score, status, meta, items }) {
    clearResultArea();

    const graph = createElement("div", "readiness-preview-graph");
    const header = createElement("div", "readiness-graph-header");
    const titleBlock = createElement("div", "readiness-graph-title");
    const scoreBlock = createElement("div", "readiness-graph-score");
    const list = createElement("div", "readiness-graph-list");

    titleBlock.appendChild(createElement("p", "tag", tag));
    titleBlock.appendChild(createElement("h2", "", title));
    titleBlock.appendChild(createElement("p", "readiness-graph-meta", meta));

    scoreBlock.appendChild(createElement("strong", "", score));
    scoreBlock.appendChild(createElement("span", "", status));

    items.forEach((item) => {
      list.appendChild(createGraphRow(item.name, item.percentage));
    });

    header.appendChild(titleBlock);
    header.appendChild(scoreBlock);
    graph.appendChild(header);
    graph.appendChild(list);
    resultArea.appendChild(graph);
  }

  function renderCareerResult(result) {
    if (!result || result.completedCount === 0) {
      renderNoResult(
        result ? result.roleLabel : "Career Path",
        "Complete this path's skill tests in the Career Path Guide to unlock your skill breakdown.",
        "Open Career Path Guide",
        "career-path-guide.html"
      );
      return;
    }

    const status = result.isComplete ? "Complete result" : "Partial result";
    const visibleScores = result.isComplete
      ? result.skillScores
      : result.skillScores.filter((item) => item.percentage !== null);
    const scoreText = result.isComplete ? `${formatScore(result.overallScore)}/100` : `${result.completedCount}/${result.totalSkills}`;
    const statusLabel = result.isComplete ? getStatusLabel(result.overallScore) : "Partial result";
    const metaText = result.isComplete
      ? `Weighted readiness score from ${result.countryLabel}.`
      : `Skill tests completed${result.countryLabel ? ` for ${result.countryLabel}` : ""}.`;

    renderCompactGraph({
      tag: status,
      title: result.roleLabel,
      score: scoreText,
      status: statusLabel,
      meta: metaText,
      items: visibleScores.map((item) => ({
        name: item.name,
        percentage: item.percentage
      }))
    });
  }

  function renderGcseResult(result) {
    if (!result) {
      renderNoResult(
        "GCSE Maths + Python Basics",
        "Complete the GCSE starter quiz to view your beginner readiness result.",
        "Open Beginner Roadmap",
        "gcse-maths-python-roadmap.html"
      );
      return;
    }

    const modeLabel = result.quizMode && result.quizMode.label ? result.quizMode.label : "Starter quiz";

    renderCompactGraph({
      tag: modeLabel,
      title: "GCSE Maths + Python Basics",
      score: `${result.percentage}%`,
      status: result.level,
      meta: `${result.score} of ${result.total} questions correct.`,
      items: result.topicBreakdown.map((item) => ({
        name: item.topic,
        percentage: normalisePercentage(item)
      }))
    });
  }

  function updateButtonStates() {
    pathButtons.forEach((button) => {
      const pathKey = button.dataset.previewPath;
      const status = button.querySelector("small");
      button.classList.remove("has-result", "has-partial", "is-empty", "is-selected");
      button.setAttribute("aria-pressed", "false");

      if (pathKey === "gcse-maths-python") {
        const result = getGcseResult();
        button.classList.add(result ? "has-result" : "is-empty");
        if (status) {
          status.textContent = result ? "Starter result" : "No result yet";
        }
        return;
      }

      if (!careerPathKeys.includes(pathKey)) {
        button.classList.add("is-empty");
        if (status) {
          status.textContent = "No result yet";
        }
        return;
      }

      const result = getCareerPathResult(pathKey);
      if (result && result.isComplete) {
        button.classList.add("has-result");
        if (status) {
          status.textContent = "Result available";
        }
        return;
      }

      if (result && result.isPartial) {
        button.classList.add("has-partial");
        if (status) {
          status.textContent = `${result.completedCount}/${result.totalSkills} tested`;
        }
        return;
      }

      button.classList.add("is-empty");
      if (status) {
        status.textContent = "No result yet";
      }
    });
  }

  function selectPath(button) {
    pathButtons.forEach((pathButton) => {
      pathButton.classList.toggle("is-selected", pathButton === button);
      pathButton.setAttribute("aria-pressed", String(pathButton === button));
    });

    const pathKey = button.dataset.previewPath;

    if (pathKey === "gcse-maths-python") {
      renderGcseResult(getGcseResult());
      return;
    }

    renderCareerResult(getCareerPathResult(pathKey));
  }

  updateButtonStates();
  renderInitialState();

  pathButtons.forEach((button) => {
    button.addEventListener("click", () => selectPath(button));
  });
})();
