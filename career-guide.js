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
