(function () {
  const data = window.careerGuideData;
  const questionData = window.careerGuideQuestions;
  const countrySelect = document.getElementById("countrySelect");
  const roleSelect = document.getElementById("roleSelect");
  const skillTableArea = document.getElementById("skillTableArea");

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

  function removeTestPanel() {
    const existingPanel = skillTableArea.querySelector(".skill-test-panel");

    if (existingPanel) {
      existingPanel.remove();
    }
  }

  function updateSkillScoreCell(countryKey, roleKey, skillKey) {
    const scoreCell = skillTableArea.querySelector(`[data-skill-score="${skillKey}"]`);

    if (scoreCell) {
      scoreCell.textContent = formatScore(loadSavedScore(countryKey, roleKey, skillKey));
    }
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
    const questionSet = getSkillQuestions(skillKey);

    if (!questionSet) {
      return;
    }

    const questionGroups = getQuestionGroups(questionSet);
    const flatQuestions = getFlatQuestions(questionSet);

    removeTestPanel();

    const panel = document.createElement("div");
    panel.className = "guide-placeholder skill-test-panel";

    const heading = document.createElement("div");
    heading.className = "skill-test-heading";

    const title = document.createElement("h2");
    title.textContent = `${questionSet.label} Mini Test`;

    const subtitle = document.createElement("p");
    subtitle.textContent = `Answer all ${flatQuestions.length} questions. Your score will be saved for this country and role.`;

    heading.appendChild(title);
    heading.appendChild(subtitle);

    const form = document.createElement("form");
    form.className = "skill-test-form";

    let globalQuestionIndex = 0;
    questionGroups.forEach((group) => {
      const topicSection = document.createElement("section");
      topicSection.className = "test-topic-group";

      const topicHeading = document.createElement("h3");
      topicHeading.className = "test-topic-heading";
      topicHeading.textContent = group.topic;
      topicSection.appendChild(topicHeading);

      group.questions.forEach((question) => {
        const questionIndex = globalQuestionIndex;
        const questionBlock = document.createElement("fieldset");
        questionBlock.className = "test-question";

        const legend = document.createElement("legend");

        const questionText = document.createElement("span");
        questionText.textContent = `${questionIndex + 1}. ${question.question}`;

        const difficulty = document.createElement("span");
        difficulty.className = "difficulty-badge";
        difficulty.textContent = question.difficulty;

        const options = document.createElement("div");
        options.className = "test-options";

        question.options.forEach((option) => {
          options.appendChild(createQuestionOption(skillKey, questionIndex, option));
        });

        legend.appendChild(questionText);
        legend.appendChild(difficulty);
        questionBlock.appendChild(legend);
        questionBlock.appendChild(options);
        topicSection.appendChild(questionBlock);

        globalQuestionIndex++;
      });

      form.appendChild(topicSection);
    });

    const submitButton = document.createElement("button");
    submitButton.className = "btn primary test-submit-button";
    submitButton.type = "submit";
    submitButton.textContent = "Submit Test";

    const resultArea = document.createElement("div");
    resultArea.className = "test-result-area";
    resultArea.setAttribute("aria-live", "polite");

    form.appendChild(submitButton);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const answers = flatQuestions.map((question, questionIndex) => {
        const selected = form.querySelector(`input[name="${skillKey}-question-${questionIndex}"]:checked`);
        return selected ? selected.value : "";
      });

      const correct = flatQuestions.reduce((total, question, index) => {
        return total + (answers[index] === question.correctAnswer ? 1 : 0);
      }, 0);
      const total = flatQuestions.length;
      const percentage = Math.round((correct / total) * 100);
      const score = {
        correct,
        total,
        percentage,
        updatedAt: new Date().toISOString()
      };

      saveSkillScore(countryKey, roleKey, skillKey, score);
      updateSkillScoreCell(countryKey, roleKey, skillKey);
      renderTestResults(resultArea, flatQuestions, answers, score);
    });

    panel.appendChild(heading);
    panel.appendChild(form);
    panel.appendChild(resultArea);
    skillTableArea.appendChild(panel);
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
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
      const skillQuestions = getSkillQuestions(skillKey);
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
