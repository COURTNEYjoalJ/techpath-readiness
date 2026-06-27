const lessons = {
  python: {
    title: "Python Mini Lesson",
    description: "Python is a beginner-friendly language used for automation, data science, AI and backend development.",
    code: `name = "Alex"
age = 20

if age >= 18:
    print(name, "can learn Python for career growth")`,
    task: "Practice task: Create a Python program that asks for a user's name and prints a welcome message."
  },
  javascript: {
    title: "JavaScript Mini Lesson",
    description: "JavaScript makes websites interactive. You can use it for buttons, games, quizzes, animations and web apps.",
    code: `const score = 8;

if (score >= 5) {
  console.log("You passed the quiz!");
} else {
  console.log("Try again.");
}`,
    task: "Practice task: Create a button that changes the text on a webpage when clicked."
  },
  sql: {
    title: "SQL Mini Lesson",
    description: "SQL is used to query databases. It is important for data analysts, business analysts and backend developers.",
    code: `SELECT name, score
FROM students
WHERE score >= 70
ORDER BY score DESC;`,
    task: "Practice task: Write a query to show all customers from London."
  },
  htmlcss: {
    title: "HTML & CSS Mini Lesson",
    description: "HTML creates the structure of a webpage. CSS controls the design, spacing, colours and layout.",
    code: `<section class="card">
  <h2>My First Website</h2>
  <p>I am learning HTML and CSS.</p>
</section>`,
    task: "Practice task: Build a simple profile card with your name, skills and contact button."
  },
  java: {
    title: "Java Mini Lesson",
    description: "Java is widely used in backend systems, Android apps and enterprise applications.",
    code: `class Main {
  public static void main(String[] args) {
    System.out.println("Learning Java");
  }
}`,
    task: "Practice task: Create a Java program that prints your name and career goal."
  },
  cpp: {
    title: "C++ Mini Lesson",
    description: "C++ is useful for high-performance applications, games, systems and problem solving.",
    code: `#include <iostream>
using namespace std;

int main() {
  cout << "Learning C++";
  return 0;
}`,
    task: "Practice task: Create a C++ program that adds two numbers."
  }
};

function showLesson(key) {
  const lesson = lessons[key];
  const lessonBox = document.getElementById("lessonBox");
  lessonBox.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>${lesson.description}</p>
    <code>${escapeHtml(lesson.code)}</code>
    <p><strong>${lesson.task}</strong></p>
  `;
  lessonBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(match) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[match];
  });
}

const practiceSkillOrder = [
  "python",
  "statistics",
  "sql",
  "machine-learning",
  "maths",
  "communication",
  "excel",
  "power-bi",
  "cloud-fundamentals",
  "linux",
  "git",
  "html",
  "css",
  "javascript",
  "api-basics",
  "backend-basics",
  "databases"
];

function getPracticeQuestionBank() {
  return window.careerGuideQuestions && window.careerGuideQuestions.skills
    ? window.careerGuideQuestions.skills
    : {};
}

function getPracticeQuestions(questionSet) {
  if (!questionSet || !Array.isArray(questionSet.topics)) {
    return [];
  }

  return questionSet.topics.flatMap((group) => {
    return Array.isArray(group.questions) ? group.questions : [];
  });
}

function shuffleItems(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index];
    shuffled[index] = shuffled[randomIndex];
    shuffled[randomIndex] = current;
  }

  return shuffled;
}

function getPracticeSkillEntries() {
  const bank = getPracticeQuestionBank();
  const orderedKeys = practiceSkillOrder.filter((key) => bank[key]);
  const extraKeys = Object.keys(bank).filter((key) => !orderedKeys.includes(key));

  return [...orderedKeys, ...extraKeys]
    .map((key) => ({
      key,
      label: bank[key].label || key,
      totalQuestions: getPracticeQuestions(bank[key]).length
    }))
    .filter((item) => item.totalQuestions > 0);
}

function closePracticeQuizModal() {
  const existingModal = document.querySelector("[data-practice-modal]");

  if (existingModal) {
    existingModal.remove();
  }

  document.body.classList.remove("modal-open");
}

function createPracticeModalShell(titleText) {
  closePracticeQuizModal();

  const overlay = document.createElement("div");
  overlay.className = "quiz-modal-overlay";
  overlay.dataset.practiceModal = "true";

  const modal = document.createElement("div");
  modal.className = "quiz-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "practiceQuizTitle");

  const header = document.createElement("div");
  header.className = "quiz-modal-header";

  const title = document.createElement("h2");
  title.id = "practiceQuizTitle";
  title.textContent = titleText;

  const closeButton = document.createElement("button");
  closeButton.className = "quiz-modal-close";
  closeButton.type = "button";
  closeButton.textContent = "Close";

  const body = document.createElement("div");
  body.className = "quiz-modal-body";

  closeButton.addEventListener("click", closePracticeQuizModal);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closePracticeQuizModal();
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

function startPracticeQuiz(skillKey) {
  const questionSet = getPracticeQuestionBank()[skillKey];
  const questions = shuffleItems(getPracticeQuestions(questionSet)).map((question) => ({
    ...question,
    options: shuffleItems(question.options || [])
  }));

  if (!questions.length) {
    return;
  }

  let currentQuestionIndex = 0;
  let correctCount = 0;
  const modal = createPracticeModalShell(`${questionSet.label} Practice Quiz`);

  function showSummary() {
    modal.title.textContent = `${questionSet.label} Practice Summary`;
    modal.body.innerHTML = "";

    const summary = document.createElement("p");
    summary.className = "test-score-summary";
    summary.textContent = `Practice score: ${correctCount}/${questions.length}`;

    const note = document.createElement("div");
    note.className = "test-explanation practice-summary-note";

    const noteTitle = document.createElement("h4");
    noteTitle.textContent = "Future practice updates";

    const noteText = document.createElement("p");
    noteText.textContent = "More practice questions and deeper quiz feedback are planned for a future version.";

    const actions = document.createElement("div");
    actions.className = "quiz-modal-actions";

    const closeButton = document.createElement("button");
    closeButton.className = "btn primary quiz-next-button";
    closeButton.type = "button";
    closeButton.textContent = "Close Practice Quiz";
    closeButton.addEventListener("click", closePracticeQuizModal);

    note.appendChild(noteTitle);
    note.appendChild(noteText);
    actions.appendChild(closeButton);
    modal.body.appendChild(summary);
    modal.body.appendChild(note);
    modal.body.appendChild(actions);
    closeButton.focus();
  }

  function showQuestion() {
    const question = questions[currentQuestionIndex];
    modal.title.textContent = `${questionSet.label} Practice Quiz`;
    modal.body.innerHTML = "";

    const meta = document.createElement("div");
    meta.className = "quiz-question-meta";

    const topic = document.createElement("span");
    topic.className = "quiz-topic-name";
    topic.textContent = question.topic;

    const difficulty = document.createElement("span");
    difficulty.className = "difficulty-badge";
    difficulty.textContent = question.difficulty;

    const count = document.createElement("span");
    count.className = "quiz-question-count";
    count.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    const questionTitle = document.createElement("h3");
    questionTitle.className = "quiz-question-title";
    questionTitle.textContent = question.question;

    const options = document.createElement("div");
    options.className = "practice-options";

    const feedback = document.createElement("div");
    feedback.className = "practice-answer-feedback";
    feedback.setAttribute("aria-live", "polite");

    const actions = document.createElement("div");
    actions.className = "quiz-modal-actions";

    const nextButton = document.createElement("button");
    nextButton.className = "btn primary quiz-next-button";
    nextButton.type = "button";
    nextButton.disabled = true;
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Show Summary" : "Next";

    function handleAnswer(selectedOption, selectedButton) {
      const isCorrect = selectedOption === question.correctAnswer;
      const optionButtons = options.querySelectorAll("button");

      optionButtons.forEach((button) => {
        button.disabled = true;
        if (button.textContent === question.correctAnswer) {
          button.classList.add("correct");
        }
      });

      if (!isCorrect) {
        selectedButton.classList.add("incorrect");
      } else {
        correctCount++;
      }

      feedback.innerHTML = "";

      const status = document.createElement("p");
      status.className = isCorrect ? "practice-feedback-correct" : "practice-feedback-incorrect";
      status.textContent = isCorrect ? "Correct." : "Incorrect.";

      const correctAnswer = document.createElement("p");
      correctAnswer.textContent = `Correct answer: ${question.correctAnswer}`;

      feedback.appendChild(status);
      feedback.appendChild(correctAnswer);

      if (question.explanation) {
        const explanation = document.createElement("p");
        explanation.textContent = question.explanation;
        feedback.appendChild(explanation);
      }

      nextButton.disabled = false;
      nextButton.focus();
    }

    question.options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.className = "practice-answer-option";
      optionButton.type = "button";
      optionButton.textContent = option;
      optionButton.addEventListener("click", () => handleAnswer(option, optionButton));
      options.appendChild(optionButton);
    });

    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex === questions.length - 1) {
        showSummary();
        return;
      }

      currentQuestionIndex++;
      showQuestion();
    });

    meta.appendChild(topic);
    meta.appendChild(difficulty);
    meta.appendChild(count);
    actions.appendChild(nextButton);
    modal.body.appendChild(meta);
    modal.body.appendChild(questionTitle);
    modal.body.appendChild(options);
    modal.body.appendChild(feedback);
    modal.body.appendChild(actions);
  }

  showQuestion();
}

function renderPracticeSkillPicker() {
  const grid = document.getElementById("practiceSkillGrid");

  if (!grid) {
    return;
  }

  const skills = getPracticeSkillEntries();
  grid.innerHTML = "";

  if (!skills.length) {
    const message = document.createElement("p");
    message.textContent = "Practice quizzes are unavailable right now.";
    grid.appendChild(message);
    return;
  }

  skills.forEach((skill) => {
    const button = document.createElement("button");
    button.className = "practice-skill-button";
    button.type = "button";

    const label = document.createElement("span");
    label.textContent = skill.label;

    const count = document.createElement("small");
    count.textContent = `${skill.totalQuestions} questions`;

    button.appendChild(label);
    button.appendChild(count);
    button.addEventListener("click", () => startPracticeQuiz(skill.key));
    grid.appendChild(button);
  });
}

const menuButton = document.getElementById("menuBtn");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("show");
  });
}

renderPracticeSkillPicker();
