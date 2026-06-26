(function () {
  window.careerGuideQuestions = {
    version: 1,
    skills: {
      python: {
        label: "Python",
        questions: [
          {
            topic: "Variables",
            question: "Which line correctly creates a Python variable named score with the value 10?",
            options: ["score = 10", "let score = 10", "int score = 10", "score :=: 10"],
            correctAnswer: "score = 10",
            explanation: "Python creates variables by assigning a value with a single equals sign."
          },
          {
            topic: "Lists",
            question: "Which expression gets the first item from this list: skills = ['Python', 'SQL', 'Excel']?",
            options: ["skills[0]", "skills[1]", "skills.first()", "skills{0}"],
            correctAnswer: "skills[0]",
            explanation: "Python lists use zero-based indexing, so the first item is at index 0."
          },
          {
            topic: "Loops",
            question: "Which loop correctly prints every item in a list named numbers?",
            options: ["for number in numbers:", "foreach number in numbers:", "for numbers as number:", "loop number from numbers:"],
            correctAnswer: "for number in numbers:",
            explanation: "A Python for loop uses the pattern 'for item in collection:' to visit each item."
          },
          {
            topic: "Functions",
            question: "Which keyword is used to define a function in Python?",
            options: ["def", "function", "func", "define"],
            correctAnswer: "def",
            explanation: "Python uses the 'def' keyword before the function name and parameters."
          },
          {
            topic: "Data cleaning",
            question: "In pandas, which method is commonly used to remove rows with missing values?",
            options: ["dropna()", "remove_nulls()", "delete_missing()", "clean_blank()"],
            correctAnswer: "dropna()",
            explanation: "The pandas dropna() method removes rows or columns that contain missing values."
          }
        ]
      }
    }
  };
})();
