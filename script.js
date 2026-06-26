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

const quizQuestions = [
  {
    question: "Which language is commonly used to add interactivity to websites?",
    options: ["SQL", "JavaScript", "CSS"],
    answer: "JavaScript"
  },
  {
    question: "Which keyword is used in Python to create a function?",
    options: ["def", "function", "method"],
    answer: "def"
  },
  {
    question: "Which language is used to query databases?",
    options: ["HTML", "SQL", "CSS"],
    answer: "SQL"
  },
  {
    question: "What does HTML mainly control?",
    options: ["Webpage structure", "Database storage", "Server memory"],
    answer: "Webpage structure"
  },
  {
    question: "Which concept repeats code multiple times?",
    options: ["Loop", "Variable", "Comment"],
    answer: "Loop"
  }
];

function loadQuiz() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = quizQuestions.map((item, index) => `
    <div class="question">
      <p>${index + 1}. ${item.question}</p>
      ${item.options.map(option => `
        <label>
          <input type="radio" name="q${index}" value="${option}">
          ${option}
        </label>
      `).join("")}
    </div>
  `).join("");
}

function submitQuiz() {
  let score = 0;

  quizQuestions.forEach((item, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === item.answer) {
      score++;
    }
  });

  const result = document.getElementById("quizResult");
  result.textContent = `Your score: ${score}/${quizQuestions.length}. ${score >= 4 ? "Great start!" : "Revise the basics and try again."}`;
}

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});

loadQuiz();
