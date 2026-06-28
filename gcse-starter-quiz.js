(function () {
  const RESULT_STORAGE_KEY = "techpathGcseStarterQuizResult";
  const linkedInUrl = "https://www.linkedin.com/in/courtney-joal-j/";

  const quizModes = {
    quick: {
      id: "quick",
      label: "Quick check",
      questionCount: 24,
      duration: "15-20 minutes",
      description: "A shorter self-check covering each area once."
    },
    full: {
      id: "full",
      label: "Full starter test",
      questionCount: 72,
      duration: "45-60 minutes",
      description: "A fuller beginner readiness test across GCSE Maths, Python basics, data handling, Data Science basics, project planning and portfolio direction."
    }
  };

  const topicSets = [
    {
      topic: "GCSE Maths foundations",
      subtopics: [
        {
          name: "Number: fractions, decimals and percentages",
          questions: [
            makeQuestion("A coat costs 80 pounds and is reduced by 15%. What is the sale price?", ["12 pounds", "68 pounds", "72 pounds", "95 pounds"], "68 pounds", "15% of 80 is 12, so the reduced price is 80 - 12 = 68 pounds."),
            makeQuestion("Which fraction is equivalent to 0.625?", ["3/8", "5/8", "6/25", "7/10"], "5/8", "0.625 is 625/1000, which simplifies to 5/8."),
            makeQuestion("A number is increased by 25% to become 150. What was the original number?", ["112.50", "120", "125", "187.50"], "120", "After a 25% increase, the new value is 125% of the original. 150 divided by 1.25 is 120.")
          ]
        },
        {
          name: "Algebra: simplifying, substitution and equations",
          questions: [
            makeQuestion("Simplify 3x + 4x - 2x.", ["5x", "9x", "5x squared", "x + 5"], "5x", "Add and subtract the like terms: 3x + 4x - 2x = 5x."),
            makeQuestion("Solve 4x + 7 = 31.", ["5", "6", "7", "9.5"], "6", "Subtract 7 to get 4x = 24, then divide by 4 to get x = 6."),
            makeQuestion("If y = 2x + 5 and x = 6, what is y?", ["11", "12", "17", "22"], "17", "Substitute x = 6: y = 2 x 6 + 5 = 17.")
          ]
        },
        {
          name: "Ratio and proportion: ratio sharing, percentage change and direct proportion",
          questions: [
            makeQuestion("Share 72 in the ratio 5:3. What are the two parts?", ["40 and 32", "45 and 27", "48 and 24", "50 and 22"], "45 and 27", "There are 8 parts in total. Each part is 72 divided by 8 = 9, so the parts are 45 and 27."),
            makeQuestion("Four notebooks cost 6.40 pounds. If the cost is directly proportional, how much do seven notebooks cost?", ["9.60 pounds", "10.80 pounds", "11.20 pounds", "12.40 pounds"], "11.20 pounds", "One notebook costs 1.60 pounds, so seven cost 7 x 1.60 = 11.20 pounds."),
            makeQuestion("A recipe uses 300 g of flour for 12 cakes. How much flour is needed for 20 cakes?", ["360 g", "400 g", "500 g", "600 g"], "500 g", "300 divided by 12 is 25 g per cake. 20 cakes need 20 x 25 = 500 g.")
          ]
        },
        {
          name: "Geometry and measures: area, perimeter, angles and units",
          questions: [
            makeQuestion("A rectangle is 8 m long and 3.5 m wide. What is its area?", ["11.5 m squared", "23 m squared", "28 m squared", "56 m squared"], "28 m squared", "Area of a rectangle is length x width, so 8 x 3.5 = 28 m squared."),
            makeQuestion("A triangle has angles of 48 degrees and 67 degrees. What is the third angle?", ["55 degrees", "60 degrees", "65 degrees", "75 degrees"], "65 degrees", "Angles in a triangle add to 180 degrees. 180 - 48 - 67 = 65."),
            makeQuestion("Which conversion is correct?", ["2.4 m = 24 cm", "2.4 m = 240 cm", "2.4 m = 2400 cm", "2.4 m = 0.24 cm"], "2.4 m = 240 cm", "There are 100 cm in 1 m, so 2.4 m is 240 cm.")
          ]
        },
        {
          name: "Graphs and sequences: coordinates, straight-line graphs and nth terms",
          questions: [
            makeQuestion("For the line y = 3x - 2, what is y when x = 5?", ["10", "13", "15", "17"], "13", "Substitute x = 5: y = 3 x 5 - 2 = 13."),
            makeQuestion("The nth term of a sequence is 4n + 1. What is the 6th term?", ["21", "24", "25", "29"], "25", "Substitute n = 6: 4 x 6 + 1 = 25."),
            makeQuestion("A straight line passes through (0, 2) and (3, 8). What is its gradient?", ["1", "2", "3", "6"], "2", "The rise is 8 - 2 = 6 and the run is 3 - 0 = 3, so the gradient is 6/3 = 2.")
          ]
        },
        {
          name: "Probability and statistics: probability, averages, range and chart interpretation",
          questions: [
            makeQuestion("A bag has 4 red counters, 5 blue counters and 1 green counter. What is the probability of choosing blue?", ["1/5", "1/2", "5/9", "5/11"], "1/2", "There are 10 counters in total and 5 are blue, so the probability is 5/10 = 1/2."),
            makeQuestion("What is the mean of 6, 7, 10 and 13?", ["8", "9", "10", "36"], "9", "Add the values to get 36, then divide by 4 to get 9."),
            makeQuestion("A chart shows values 12, 9, 15, 20 and 14. What is the range?", ["5", "9", "11", "20"], "11", "The range is highest minus lowest, so 20 - 9 = 11.")
          ]
        }
      ]
    },
    {
      topic: "Python basics",
      subtopics: [
        {
          name: "Variables and data types",
          questions: [
            makeQuestion("What is printed by this code: score = 7, then score = score + 3, then print(score)?", ["7", "10", "73", "score + 3"], "10", "The variable is updated from 7 to 10 before it is printed."),
            makeQuestion("Which data type is best for storing whether a learner has passed a check?", ["String text", "Boolean True or False", "List of numbers", "CSV file"], "Boolean True or False", "A Boolean stores a true or false value, which fits a yes/no condition."),
            makeQuestion("Which line creates a Python list of three names?", ["names = \"Ali, Bea, Chen\"", "names = [\"Ali\", \"Bea\", \"Chen\"]", "names = 3", "names = True"], "names = [\"Ali\", \"Bea\", \"Chen\"]", "Square brackets create a list that can store several values.")
          ]
        },
        {
          name: "Conditions and loops",
          questions: [
            makeQuestion("A loop adds 2, 4 and 6 to a total starting at 0. What is the final total?", ["6", "8", "12", "24"], "12", "The loop adds each value once: 0 + 2 + 4 + 6 = 12."),
            makeQuestion("Which condition checks whether score is at least 50?", ["score = 50", "score > 50 only", "score >= 50", "score <= 50"], "score >= 50", "The greater-than-or-equal operator includes 50 and any score above 50."),
            makeQuestion("In Python, how many times does a loop using range(3) run?", ["2", "3", "4", "It never runs"], "3", "range(3) gives 0, 1 and 2, so the loop runs three times.")
          ]
        },
        {
          name: "Functions and lists",
          questions: [
            makeQuestion("A function returns x * 2. What does it return when x is 6?", ["8", "12", "26", "x * 2"], "12", "The function doubles the input, so 6 x 2 = 12."),
            makeQuestion("Why would you use a list in Python?", ["To store several related values", "To make one value invisible", "To replace all functions", "To stop code from running"], "To store several related values", "Lists are useful when you need to keep multiple items together."),
            makeQuestion("If marks = [8, 10, 6], what is marks[1]?", ["8", "10", "6", "24"], "10", "Python list indexes start at 0, so index 1 is the second item.")
          ]
        },
        {
          name: "Simple files and debugging",
          questions: [
            makeQuestion("In a CSV file of learners, what would one row usually represent?", ["One learner record", "The whole website", "A Python keyword", "Only a chart colour"], "One learner record", "Each row usually stores one record, such as one learner or one result."),
            makeQuestion("Python reports a SyntaxError on an if line that has no colon. What is the best first fix?", ["Add the missing colon", "Delete the whole project", "Change every number", "Ignore the message"], "Add the missing colon", "Python if statements need a colon before the indented block."),
            makeQuestion("What is a sensible debugging step when code fails?", ["Read the error and test one small part", "Add random lines until it works", "Delete the data", "Claim the code is correct"], "Read the error and test one small part", "Small checks make it easier to find the cause of an error.")
          ]
        }
      ]
    },
    {
      topic: "Data handling",
      subtopics: [
        {
          name: "Tables and CSV files",
          questions: [
            makeQuestion("In a data table, what does a column usually represent?", ["A field or variable", "A whole project", "A password", "A chart title only"], "A field or variable", "Columns store fields such as name, score, date or category."),
            makeQuestion("In a CSV file, what does each row usually represent?", ["One record or observation", "Only a formula", "The file extension", "A Python loop"], "One record or observation", "Rows usually hold individual records, such as one student or one sale."),
            makeQuestion("If the first CSV line is name,score,date, what is that line usually called?", ["A header row", "A missing value", "A chart legend", "A function"], "A header row", "A header row names the columns so the data is easier to understand.")
          ]
        },
        {
          name: "Averages and simple statistics",
          questions: [
            makeQuestion("What is the median of 5, 9, 11, 20 and 22?", ["9", "11", "13.4", "20"], "11", "The median is the middle value when the numbers are ordered."),
            makeQuestion("What is the mode of 2, 3, 3, 4 and 5?", ["2", "3", "4", "5"], "3", "The mode is the value that appears most often."),
            makeQuestion("Why can an outlier affect the mean?", ["It can pull the average up or down", "It always removes the data", "It makes the median impossible", "It changes every label"], "It can pull the average up or down", "A very high or low value can move the mean away from the typical values.")
          ]
        },
        {
          name: "Charts and visual patterns",
          questions: [
            makeQuestion("Which chart is usually best for comparing totals across categories?", ["Bar chart", "Line graph only", "Audio file", "Folder list"], "Bar chart", "Bar charts make category comparisons clear."),
            makeQuestion("Which chart is usually best for showing a trend over months?", ["Line graph", "Pie chart only", "Password table", "Python error"], "Line graph", "Line graphs are useful for changes over time."),
            makeQuestion("A chart shows how a whole budget is split into categories. Which chart might be suitable?", ["Pie chart", "Scatter graph only", "File path", "Debug log"], "Pie chart", "A pie chart can show parts of a whole when the categories add up to one total.")
          ]
        },
        {
          name: "Checking and cleaning data",
          questions: [
            makeQuestion("What is a missing value in a dataset?", ["A blank or unavailable value", "A perfect score", "A chart title", "A Python package"], "A blank or unavailable value", "Missing values are gaps that may need checking before analysis."),
            makeQuestion("A city column contains London, london and LONDON for the same city. What issue is this?", ["Inconsistent labels", "A complete duplicate", "A machine learning model", "A file permission"], "Inconsistent labels", "Different capitalisation can split one category into several versions."),
            makeQuestion("What should you check before analysing a file with repeated identical rows?", ["Whether duplicates should be removed", "Whether all rows should be hidden", "Whether the file name is colourful", "Whether charts are impossible"], "Whether duplicates should be removed", "Duplicate rows can over-count records if they are not intended.")
          ]
        }
      ]
    },
    {
      topic: "Data Science basics",
      subtopics: [
        {
          name: "Statistics foundations",
          questions: [
            makeQuestion("What does correlation describe?", ["How two variables may move together", "A proven cause", "A Python file", "A chart colour"], "How two variables may move together", "Correlation describes a relationship, but it does not automatically prove cause."),
            makeQuestion("What does the range tell you about a set of values?", ["The spread from lowest to highest", "The middle value only", "The most common value only", "The file size"], "The spread from lowest to highest", "Range is highest value minus lowest value."),
            makeQuestion("Why can a very small sample be risky for conclusions?", ["It may not represent the wider group", "It always proves the result", "It removes all uncertainty", "It makes charts unnecessary"], "It may not represent the wider group", "Small samples can give unstable or misleading results.")
          ]
        },
        {
          name: "Patterns and prediction",
          questions: [
            makeQuestion("In Data Science, what is a prediction?", ["An estimate about an unknown or future value", "A certain fact", "A deleted table", "A file extension"], "An estimate about an unknown or future value", "Predictions are estimates that need checking."),
            makeQuestion("A model predicts next month's sales. What should you do when real sales arrive?", ["Compare predictions with actual results", "Ignore the real data", "Delete the model immediately", "Claim the forecast was certain"], "Compare predictions with actual results", "Checking predictions against real outcomes helps judge performance."),
            makeQuestion("A line chart has risen for three months. What is the safest conclusion?", ["There is an upward trend so far", "It must rise forever", "The data is useless", "The cause is proven"], "There is an upward trend so far", "A short trend can be useful, but it does not prove the future.")
          ]
        },
        {
          name: "Machine learning concepts",
          questions: [
            makeQuestion("What is the purpose of a train/test split?", ["Train on one part and test on unseen data", "Delete half the data forever", "Only make charts", "Hide the result"], "Train on one part and test on unseen data", "Testing on unseen data checks whether the model generalises."),
            makeQuestion("Predicting whether an email is spam or not spam is mainly which type of task?", ["Classification", "File cleaning only", "Mean calculation", "Password storage"], "Classification", "Classification predicts a category or class."),
            makeQuestion("What is overfitting?", ["A model memorises training data but performs poorly on new data", "A chart has too many labels", "A file is too small", "A list has no items"], "A model memorises training data but performs poorly on new data", "Overfitting means the model does not generalise well.")
          ]
        },
        {
          name: "Responsible use of data",
          questions: [
            makeQuestion("Why remove names before sharing a class marks dataset?", ["To protect privacy", "To make maths impossible", "To skip all practice", "To increase the mean"], "To protect privacy", "Personal details should be protected when data is shared."),
            makeQuestion("What is a risk of biased data?", ["It can lead to unfair or misleading results", "It always improves accuracy", "It removes the need for testing", "It proves every claim"], "It can lead to unfair or misleading results", "Bias can affect how reliable or fair an analysis is."),
            makeQuestion("Which statement is most responsible after analysing limited data?", ["This suggests a pattern, but more data would help confirm it", "This proves the result forever", "No limits need to be mentioned", "The data quality does not matter"], "This suggests a pattern, but more data would help confirm it", "Responsible analysis explains uncertainty and limits.")
          ]
        }
      ]
    },
    {
      topic: "Beginner projects",
      subtopics: [
        {
          name: "Choosing a small project",
          questions: [
            makeQuestion("Which is the most realistic first data project?", ["A marks tracker using a small CSV file", "A full national banking system", "A large social network", "A secret payment platform"], "A marks tracker using a small CSV file", "A small project is easier to finish, test and explain."),
            makeQuestion("Why should a first project have a clear small scope?", ["It is more likely to be completed and improved", "It removes testing", "It removes all coding", "It avoids planning"], "It is more likely to be completed and improved", "Finishing a small project builds confidence and evidence."),
            makeQuestion("If a project idea is too large, what is a good next step?", ["Reduce it to one useful feature", "Add more features immediately", "Stop learning", "Hide the plan"], "Reduce it to one useful feature", "A smaller version helps you make progress.")
          ]
        },
        {
          name: "Planning features",
          questions: [
            makeQuestion("For a budget tracker, which feature should come early?", ["Add income and expenses, then show a total", "Play music only", "Delete all values", "Hide the balance"], "Add income and expenses, then show a total", "The core feature should match the main purpose of the project."),
            makeQuestion("What is a useful planning structure before coding?", ["Input, process, output", "Colour, colour, colour", "Password, secret, hidden", "Guess, delete, repeat"], "Input, process, output", "This helps you think about data entering, being handled and being shown."),
            makeQuestion("What does MVP mean in a beginner project?", ["The smallest useful version", "The most confusing version", "A private note", "A private password"], "The smallest useful version", "An MVP lets you build and test the core idea first.")
          ]
        },
        {
          name: "Testing and improving",
          questions: [
            makeQuestion("How can you test a simple calculator project?", ["Use known inputs and check the expected answers", "Never run it", "Only change the title", "Delete the buttons"], "Use known inputs and check the expected answers", "Known examples make it easier to spot mistakes."),
            makeQuestion("A CSV import fails. What should you check early?", ["The file path and column headings", "Only the page colour", "A random advert", "The keyboard brand"], "The file path and column headings", "Many CSV errors come from file location, names or unexpected columns."),
            makeQuestion("After a project works, what is a useful improvement?", ["Add input validation or clearer error messages", "Remove all tests", "Make the README blank", "Hide the output"], "Add input validation or clearer error messages", "Small usability improvements make the project stronger.")
          ]
        }
      ]
    },
    {
      topic: "Portfolio direction",
      subtopics: [
        {
          name: "Writing a project README",
          questions: [
            makeQuestion("Which README structure is most useful?", ["Problem, setup, how to use it, result and next steps", "Only a title", "Private passwords", "Random copied text"], "Problem, setup, how to use it, result and next steps", "A good README helps someone understand and run the project."),
            makeQuestion("Why should a README avoid API keys, passwords or private data?", ["To protect privacy and security", "To make the project harder to read", "To hide the project", "To remove all evidence"], "To protect privacy and security", "Private information should not be published in project files."),
            makeQuestion("What can make a README easier to understand?", ["A short screenshot or safe example output", "A hidden file only", "No explanation", "A false claim"], "A short screenshot or safe example output", "Evidence helps readers quickly see what the project does.")
          ]
        },
        {
          name: "Showing evidence",
          questions: [
            makeQuestion("Which evidence is useful for a beginner portfolio?", ["Code, screenshots and short notes about decisions", "Only a blank page", "A copied claim", "Private login details"], "Code, screenshots and short notes about decisions", "Good evidence shows both the result and the learning process."),
            makeQuestion("Why can commit history or dated notes be useful?", ["They show progress over time", "They replace all testing", "They remove all bugs", "They hide mistakes"], "They show progress over time", "Progress evidence helps explain how the project developed."),
            makeQuestion("What should you explain after fixing a project bug?", ["What changed and how you tested it", "Nothing", "A fake outcome", "Only the file name"], "What changed and how you tested it", "This shows practical problem solving.")
          ]
        },
        {
          name: "Choosing next steps",
          questions: [
            makeQuestion("After building a simple calculator, what is a sensible next step?", ["Add input validation or a calculation history", "Build a full bank immediately", "Delete all tests", "Stop documenting"], "Add input validation or a calculation history", "A small extension builds on the project without becoming too large."),
            makeQuestion("How should you choose the next project?", ["Match it to a skill gap and career direction", "Always choose the biggest idea", "Avoid your weak areas forever", "Pick a random file name"], "Match it to a skill gap and career direction", "A useful next project should practise something relevant."),
            makeQuestion("After a CSV analyser, what is a good next step for Data Science learning?", ["Add summary charts or simple written insights", "Remove the data", "Hide the README", "Promise certain results"], "Add summary charts or simple written insights", "Charts and interpretation help turn analysis into clearer evidence.")
          ]
        }
      ]
    }
  ];

  const startButtons = document.querySelectorAll("[data-gcse-quiz-start]");
  const resultButtons = document.querySelectorAll("[data-gcse-result-open]");

  if (!startButtons.length && !resultButtons.length) {
    return;
  }

  function makeQuestion(question, options, correctAnswer, explanation) {
    return { question, options, correctAnswer, explanation };
  }

  function decorateQuestion(topic, subtopic, question) {
    return {
      topic,
      subtopic,
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    };
  }

  function getAllQuestions() {
    return topicSets.flatMap((topicSet) => {
      return topicSet.subtopics.flatMap((subtopic) => {
        return subtopic.questions.map((question) => decorateQuestion(topicSet.topic, subtopic.name, question));
      });
    });
  }

  function getQuestionsForMode(modeId) {
    if (modeId === quizModes.quick.id) {
      return topicSets.flatMap((topicSet) => {
        return topicSet.subtopics.map((subtopic) => decorateQuestion(topicSet.topic, subtopic.name, subtopic.questions[0]));
      });
    }

    return getAllQuestions();
  }

  function getMode(modeId) {
    return quizModes[modeId] || quizModes.full;
  }

  function createModalShell(titleText) {
    closeExistingModal();

    const overlay = document.createElement("div");
    overlay.className = "quiz-modal-overlay gcse-quiz-overlay";
    overlay.setAttribute("data-gcse-modal", "true");

    const modal = document.createElement("div");
    modal.className = "quiz-modal gcse-quiz-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "gcseQuizModalTitle");

    const header = document.createElement("div");
    header.className = "quiz-modal-header";

    const title = document.createElement("h2");
    title.id = "gcseQuizModalTitle";
    title.textContent = titleText;

    const closeButton = document.createElement("button");
    closeButton.className = "quiz-modal-close";
    closeButton.type = "button";
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", closeExistingModal);

    const body = document.createElement("div");
    body.className = "quiz-modal-body";

    header.appendChild(title);
    header.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(body);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.classList.add("modal-open");

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeExistingModal();
      }
    });

    document.addEventListener("keydown", handleEscapeKey);
    closeButton.focus();

    return { overlay, modal, title, body };
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      closeExistingModal();
    }
  }

  function closeExistingModal() {
    const existingModal = document.querySelector("[data-gcse-modal]");

    if (existingModal) {
      existingModal.remove();
    }

    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", handleEscapeKey);
  }

  function openModeSelection() {
    const modal = createModalShell("Choose quiz mode");
    modal.body.innerHTML = "";

    const intro = document.createElement("div");
    intro.className = "gcse-mode-intro";
    intro.innerHTML = `
      <p class="gcse-result-meta">Choose a shorter self-check or a fuller starter readiness test. Both use original questions and save only the latest completed result in this browser.</p>
    `;

    const grid = document.createElement("div");
    grid.className = "gcse-mode-grid";

    Object.values(quizModes).forEach((mode) => {
      const card = document.createElement("article");
      card.className = "gcse-mode-card";
      card.innerHTML = `
        <p class="tag">${mode.label}</p>
        <h3>${mode.label}</h3>
        <p>${mode.description}</p>
        <div class="gcse-mode-facts">
          <span>${mode.questionCount} questions</span>
          <span>${mode.duration}</span>
        </div>
      `;

      const startButton = document.createElement("button");
      startButton.className = "btn primary";
      startButton.type = "button";
      startButton.textContent = mode.id === "quick" ? "Start quick check" : "Start full test";
      startButton.addEventListener("click", () => startQuiz(mode.id));

      card.appendChild(startButton);
      grid.appendChild(card);
    });

    modal.body.appendChild(intro);
    modal.body.appendChild(grid);
    modal.body.querySelector("button").focus();
  }

  function startQuiz(modeId) {
    const mode = getMode(modeId);
    const selectedQuestions = getQuestionsForMode(mode.id);
    const modal = createModalShell(mode.label);
    const state = {
      currentIndex: 0,
      answers: [],
      mode,
      questions: selectedQuestions
    };

    renderQuestion(modal, state);
  }

  function renderQuestion(modal, state) {
    const currentQuestion = state.questions[state.currentIndex];

    modal.title.textContent = state.mode.label;
    modal.body.innerHTML = "";

    const progress = document.createElement("p");
    progress.className = "gcse-quiz-progress";
    progress.textContent = `Question ${state.currentIndex + 1} of ${state.questions.length}`;

    const topic = document.createElement("div");
    topic.className = "gcse-question-topic";
    topic.innerHTML = `<span>${currentQuestion.topic}</span><span>${currentQuestion.subtopic}</span>`;

    const questionTitle = document.createElement("h3");
    questionTitle.className = "quiz-question-title";
    questionTitle.textContent = currentQuestion.question;

    const options = document.createElement("div");
    options.className = "gcse-answer-options";

    const feedback = document.createElement("div");
    feedback.className = "gcse-quiz-feedback";
    feedback.hidden = true;

    const actions = document.createElement("div");
    actions.className = "quiz-modal-actions gcse-question-actions";

    const nextButton = document.createElement("button");
    nextButton.className = "btn primary quiz-next-button";
    nextButton.type = "button";
    nextButton.disabled = true;
    nextButton.textContent = state.currentIndex === state.questions.length - 1 ? "Finish quiz" : "Next";

    currentQuestion.options.forEach((optionText) => {
      const optionButton = document.createElement("button");
      optionButton.className = "gcse-option-button";
      optionButton.type = "button";
      optionButton.textContent = optionText;

      optionButton.addEventListener("click", () => {
        const isCorrect = optionText === currentQuestion.correctAnswer;

        state.answers[state.currentIndex] = {
          topic: currentQuestion.topic,
          subtopic: currentQuestion.subtopic,
          question: currentQuestion.question,
          selectedAnswer: optionText,
          correctAnswer: currentQuestion.correctAnswer,
          explanation: currentQuestion.explanation,
          isCorrect
        };

        options.querySelectorAll("button").forEach((button) => {
          button.disabled = true;

          if (button.textContent === currentQuestion.correctAnswer) {
            button.classList.add("correct");
          } else if (button === optionButton && !isCorrect) {
            button.classList.add("incorrect");
          }
        });

        feedback.hidden = false;
        feedback.innerHTML = `
          <strong>${isCorrect ? "Correct" : "Not quite"}</strong>
          <p>Correct answer: ${currentQuestion.correctAnswer}</p>
          <p>${currentQuestion.explanation}</p>
        `;
        nextButton.disabled = false;
        nextButton.focus();
      });

      options.appendChild(optionButton);
    });

    nextButton.addEventListener("click", () => {
      if (state.currentIndex === state.questions.length - 1) {
        const result = buildResult(state);
        saveResult(result);
        renderResult(modal, result);
        return;
      }

      state.currentIndex += 1;
      renderQuestion(modal, state);
    });

    actions.appendChild(nextButton);
    modal.body.appendChild(progress);
    modal.body.appendChild(topic);
    modal.body.appendChild(questionTitle);
    modal.body.appendChild(options);
    modal.body.appendChild(feedback);
    modal.body.appendChild(actions);
  }

  function buildResult(state) {
    const answers = state.answers;
    const correct = answers.filter((answer) => answer && answer.isCorrect).length;
    const total = state.questions.length;
    const percentage = Math.round((correct / total) * 100);
    const topicBreakdown = topicSets.map((topicSet) => {
      const topicAnswers = answers.filter((answer) => answer && answer.topic === topicSet.topic);
      const topicCorrect = topicAnswers.filter((answer) => answer.isCorrect).length;
      const topicTotal = state.questions.filter((question) => question.topic === topicSet.topic).length;
      const topicPercentage = topicTotal ? Math.round((topicCorrect / topicTotal) * 100) : 0;

      return {
        topic: topicSet.topic,
        correct: topicCorrect,
        total: topicTotal,
        percentage: topicPercentage,
        feedback: getTopicFeedback(topicSet.topic, topicPercentage)
      };
    });

    return {
      completedAt: new Date().toISOString(),
      quizMode: {
        id: state.mode.id,
        label: state.mode.label
      },
      score: correct,
      total,
      percentage,
      level: getLevel(percentage),
      topicBreakdown,
      weakerAreas: getWeakerAreas(topicBreakdown),
      improvementIdeas: getImprovementIdeas(topicBreakdown),
      projectIdeas: getProjectIdeas(percentage)
    };
  }

  function getLevel(percentage) {
    if (percentage >= 80) {
      return "Strong beginner foundation";
    }

    if (percentage >= 60) {
      return "Ready to build guided projects";
    }

    if (percentage >= 40) {
      return "Developing learner";
    }

    return "Foundation starter";
  }

  function getTopicFeedback(topic, percentage) {
    if (percentage >= 75) {
      return "Strong start. Keep applying this area in short tasks and projects.";
    }

    if (percentage >= 50) {
      return "Developing well. Revise the basics and practise with targeted examples.";
    }

    const feedbackByTopic = {
      "GCSE Maths foundations": "Revise percentages, ratios, algebra, graphs, angles, averages and probability.",
      "Python basics": "Practise variables, conditions, loops, functions, lists, files and debugging.",
      "Data handling": "Practise reading tables, CSV files, averages, charts, missing values and duplicates.",
      "Data Science basics": "Review correlation, samples, predictions, train/test split, bias and responsible claims.",
      "Beginner projects": "Choose one small useful project, define the core feature and test it carefully.",
      "Portfolio direction": "Write a README that explains the problem, method, result, evidence and next steps."
    };

    return feedbackByTopic[topic] || "Review the basics and practise with small examples.";
  }

  function getWeakerAreas(topicBreakdown) {
    const weakerAreas = topicBreakdown
      .filter((item) => item.percentage < 60)
      .map((item) => item.topic);

    if (!weakerAreas.length) {
      return ["No major weak area from this attempt. Pick one project and use it to strengthen your evidence."];
    }

    return weakerAreas;
  }

  function getImprovementIdeas(topicBreakdown) {
    const weakTopics = topicBreakdown.filter((item) => item.percentage < 60).map((item) => item.topic);
    const ideas = [];

    if (weakTopics.includes("GCSE Maths foundations")) {
      ideas.push("Revise fractions, decimals, percentages and reverse percentages.");
      ideas.push("Practise ratio sharing, direct proportion, area, angles, coordinates and nth terms.");
    }

    if (weakTopics.includes("Python basics")) {
      ideas.push("Write small Python programs using variables, conditions, loops, functions and lists.");
      ideas.push("Practise reading error messages and debugging one issue at a time.");
    }

    if (weakTopics.includes("Data handling")) {
      ideas.push("Practise reading CSV files, checking column headings, handling missing values and calculating averages.");
      ideas.push("Create a small chart from a table and explain the pattern in one paragraph.");
    }

    if (weakTopics.includes("Data Science basics")) {
      ideas.push("Review correlation, sample size, train/test split, overfitting and responsible data claims.");
    }

    if (weakTopics.includes("Beginner projects")) {
      ideas.push("Build a small marks tracker, budget tracker or GCSE revision planner with one clear core feature.");
    }

    if (weakTopics.includes("Portfolio direction")) {
      ideas.push("Write a README for one project covering the problem, method, result, evidence and next steps.");
    }

    if (!ideas.length) {
      ideas.push("Choose one beginner project and turn it into portfolio evidence.");
      ideas.push("Add a README explaining what you built, how you tested it and what you would improve next.");
    }

    return ideas.slice(0, 7);
  }

  function getProjectIdeas(percentage) {
    if (percentage >= 80) {
      return ["CSV grade analyser", "Mini dashboard with charts", "Budget tracker"];
    }

    if (percentage >= 60) {
      return ["Marks tracker", "Budget tracker", "GCSE revision planner"];
    }

    if (percentage >= 40) {
      return ["Simple calculator", "Marks tracker", "GCSE revision planner"];
    }

    return ["Simple calculator", "GCSE revision planner", "Budget tracker"];
  }

  function getResultMode(result) {
    if (result && result.quizMode && quizModes[result.quizMode.id]) {
      return quizModes[result.quizMode.id];
    }

    if (result && result.total === quizModes.quick.questionCount) {
      return quizModes.quick;
    }

    if (result && result.total === quizModes.full.questionCount) {
      return quizModes.full;
    }

    return {
      id: "starter",
      label: "Starter quiz",
      questionCount: result ? result.total : 0,
      duration: "",
      description: "Starter quiz result."
    };
  }

  function getModeResultNote(mode) {
    if (mode.id === "quick") {
      return "This is a shorter indication. Try the full starter test for a deeper result.";
    }

    if (mode.id === "full") {
      return "This is a broader starter readiness result across the full available question bank.";
    }

    return "This result was saved from an earlier starter quiz attempt.";
  }

  function saveResult(result) {
    try {
      localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result));
    } catch (error) {
      console.warn("GCSE starter quiz result could not be saved.", error);
    }
  }

  function loadResult() {
    try {
      const storedResult = localStorage.getItem(RESULT_STORAGE_KEY);
      return storedResult ? JSON.parse(storedResult) : null;
    } catch (error) {
      return null;
    }
  }

  function openStoredResult() {
    const modal = createModalShell("GCSE Starter Result");
    const result = loadResult();

    if (!result) {
      renderEmptyResult(modal);
      return;
    }

    renderResult(modal, result);
  }

  function renderEmptyResult(modal) {
    modal.title.textContent = "GCSE Starter Result";
    modal.body.innerHTML = "";

    const message = document.createElement("div");
    message.className = "gcse-result-summary";
    message.innerHTML = `
      <h3>Complete the starter quiz first to view your result.</h3>
      <p class="gcse-result-meta">Your latest completed GCSE starter quiz result will appear here after you finish the quiz.</p>
    `;

    const actions = document.createElement("div");
    actions.className = "quiz-modal-actions gcse-result-actions";

    const startButton = document.createElement("button");
    startButton.className = "btn primary";
    startButton.type = "button";
    startButton.textContent = "Take quiz";
    startButton.addEventListener("click", openModeSelection);

    const closeButton = document.createElement("button");
    closeButton.className = "btn secondary";
    closeButton.type = "button";
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", closeExistingModal);

    actions.appendChild(startButton);
    actions.appendChild(closeButton);
    modal.body.appendChild(message);
    modal.body.appendChild(actions);
  }

  function renderResult(modal, result) {
    const mode = getResultMode(result);

    modal.title.textContent = "GCSE Starter Result";
    modal.body.innerHTML = "";

    const summary = document.createElement("div");
    summary.className = "gcse-result-summary";
    summary.innerHTML = `
      <p class="tag">${mode.label}</p>
      <strong>${result.percentage}%</strong>
      <h3>${result.level}</h3>
      <p class="gcse-result-meta">${result.score} out of ${result.total} questions correct.</p>
      <p>${getModeResultNote(mode)}</p>
    `;

    const breakdownSection = document.createElement("section");
    breakdownSection.className = "gcse-result-section";

    const breakdownTitle = document.createElement("h3");
    breakdownTitle.textContent = "Topic breakdown";

    const breakdown = document.createElement("div");
    breakdown.className = "gcse-result-grid gcse-breakdown-grid";
    result.topicBreakdown.forEach((item) => {
      const card = document.createElement("article");
      card.className = "gcse-result-card";
      card.innerHTML = `
        <h4>${item.topic}</h4>
        <strong>${item.percentage}%</strong>
        <p>${item.correct} of ${item.total} correct.</p>
        <p>${item.feedback}</p>
      `;
      breakdown.appendChild(card);
    });

    breakdownSection.appendChild(breakdownTitle);
    breakdownSection.appendChild(breakdown);

    const weakerSection = document.createElement("section");
    weakerSection.className = "gcse-result-section";

    const weakTitle = document.createElement("h3");
    weakTitle.textContent = "Weaker areas";

    const weakList = document.createElement("ul");
    weakList.className = "gcse-improvement-list";
    const weakerAreas = result.weakerAreas || getWeakerAreas(result.topicBreakdown);
    weakerAreas.forEach((area) => {
      const item = document.createElement("li");
      item.textContent = area;
      weakList.appendChild(item);
    });

    weakerSection.appendChild(weakTitle);
    weakerSection.appendChild(weakList);

    const improvementSection = document.createElement("section");
    improvementSection.className = "gcse-result-section";

    const improvementTitle = document.createElement("h3");
    improvementTitle.textContent = "Improvement ideas";

    const improvementList = document.createElement("ul");
    improvementList.className = "gcse-improvement-list";
    result.improvementIdeas.forEach((idea) => {
      const item = document.createElement("li");
      item.textContent = idea;
      improvementList.appendChild(item);
    });

    improvementSection.appendChild(improvementTitle);
    improvementSection.appendChild(improvementList);

    const projectSection = document.createElement("section");
    projectSection.className = "gcse-result-section";

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = "Project ideas";

    const projectGrid = document.createElement("div");
    projectGrid.className = "gcse-project-grid";
    result.projectIdeas.forEach((idea) => {
      const card = document.createElement("article");
      card.className = "gcse-result-card";
      card.innerHTML = `<h4>${idea}</h4><p>Use this as a small project to practise and explain your learning.</p>`;
      projectGrid.appendChild(card);
    });

    projectSection.appendChild(projectTitle);
    projectSection.appendChild(projectGrid);

    const cta = document.createElement("div");
    cta.className = "gcse-result-summary gcse-result-cta";
    cta.innerHTML = `
      <h3>Want help understanding your result or choosing a project idea?</h3>
      <p>Message on LinkedIn to discuss learning direction, GCSE Maths support, Python basics or beginner project ideas.</p>
      <a class="btn secondary" href="${linkedInUrl}" target="_blank" rel="noopener noreferrer">Message on LinkedIn</a>
    `;

    const actions = document.createElement("div");
    actions.className = "quiz-modal-actions gcse-result-actions";

    const retakeButton = document.createElement("button");
    retakeButton.className = "btn primary";
    retakeButton.type = "button";
    retakeButton.textContent = "Retake quiz";
    retakeButton.addEventListener("click", openModeSelection);

    const closeButton = document.createElement("button");
    closeButton.className = "btn secondary";
    closeButton.type = "button";
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", closeExistingModal);

    actions.appendChild(retakeButton);
    actions.appendChild(closeButton);
    modal.body.appendChild(summary);
    modal.body.appendChild(breakdownSection);
    modal.body.appendChild(weakerSection);
    modal.body.appendChild(improvementSection);
    modal.body.appendChild(projectSection);
    modal.body.appendChild(cta);
    modal.body.appendChild(actions);
  }

  startButtons.forEach((button) => {
    button.addEventListener("click", openModeSelection);
  });

  resultButtons.forEach((button) => {
    button.addEventListener("click", openStoredResult);
  });
})();
