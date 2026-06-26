(function () {
  window.careerGuideQuestions = {
    version: 2,
    skills: {
      python: {
        label: "Python",
        topics: [
          {
            topic: "Python syntax",
            questions: [
              {
                topic: "Python syntax",
                difficulty: "Easy",
                question: "Which line correctly creates a variable named score with the value 10?",
                options: ["score = 10", "let score = 10", "int score = 10", "score := 10"],
                correctAnswer: "score = 10",
                explanation: "Python creates variables by assigning a value with a single equals sign."
              },
              {
                topic: "Python syntax",
                difficulty: "Medium",
                question: "What does this expression return: len('data')?",
                options: ["3", "4", "'data'", "An error"],
                correctAnswer: "4",
                explanation: "len() returns the number of characters in a string, and 'data' has 4 characters."
              },
              {
                topic: "Python syntax",
                difficulty: "Hard",
                question: "Which statement about Python indentation is correct?",
                options: ["Indentation defines code blocks", "Indentation is optional", "Only tabs are allowed", "Only braces define blocks"],
                correctAnswer: "Indentation defines code blocks",
                explanation: "Python uses indentation to define blocks such as loops, functions and conditionals."
              },
              {
                topic: "Python syntax",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: if score >= 70__ print('Pass')",
                options: [":", ";", "{", "then"],
                correctAnswer: ":",
                explanation: "Python if statements end with a colon before the indented block."
              }
            ]
          },
          {
            topic: "pandas",
            questions: [
              {
                topic: "pandas",
                difficulty: "Easy",
                question: "Which pandas object is commonly used to store tabular data?",
                options: ["DataFrame", "Workbook", "ArrayList", "DictionaryOnly"],
                correctAnswer: "DataFrame",
                explanation: "A pandas DataFrame stores data in rows and columns, similar to a table."
              },
              {
                topic: "pandas",
                difficulty: "Medium",
                question: "Which method shows the first five rows of a DataFrame by default?",
                options: ["head()", "first()", "top()", "sample()"],
                correctAnswer: "head()",
                explanation: "DataFrame.head() returns the first rows, with 5 rows shown by default."
              },
              {
                topic: "pandas",
                difficulty: "Hard",
                question: "Which expression filters rows where the age column is at least 18?",
                options: ["df[df['age'] >= 18]", "df['age' >= 18]", "df.where(age >= 18)", "df.filter('age', 18)"],
                correctAnswer: "df[df['age'] >= 18]",
                explanation: "Boolean indexing uses a condition inside df[...] to return matching rows."
              },
              {
                topic: "pandas",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap to load a CSV file: df = pd.___('sales.csv')",
                options: ["read_csv", "open_csv", "load", "csv_read"],
                correctAnswer: "read_csv",
                explanation: "pandas uses pd.read_csv() to read CSV files into a DataFrame."
              }
            ]
          },
          {
            topic: "NumPy",
            questions: [
              {
                topic: "NumPy",
                difficulty: "Easy",
                question: "Which alias is most commonly used when importing NumPy?",
                options: ["np", "num", "npy", "numpyx"],
                correctAnswer: "np",
                explanation: "The standard convention is import numpy as np."
              },
              {
                topic: "NumPy",
                difficulty: "Medium",
                question: "Which function creates a NumPy array from a Python list?",
                options: ["np.array([1, 2, 3])", "np.list([1, 2, 3])", "np.frame([1, 2, 3])", "np.table([1, 2, 3])"],
                correctAnswer: "np.array([1, 2, 3])",
                explanation: "np.array() converts list-like data into a NumPy array."
              },
              {
                topic: "NumPy",
                difficulty: "Hard",
                question: "What does vectorized NumPy code usually help with?",
                options: ["Faster numerical operations", "Writing HTML faster", "Avoiding all errors", "Replacing every database"],
                correctAnswer: "Faster numerical operations",
                explanation: "Vectorized NumPy operations run efficiently on arrays without manually looping in Python."
              },
              {
                topic: "NumPy",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: np.___([1, 2, 3]) returns the average value.",
                options: ["mean", "avg_value", "middle", "average_value"],
                correctAnswer: "mean",
                explanation: "np.mean() calculates the arithmetic mean of numeric values."
              }
            ]
          },
          {
            topic: "Data cleaning",
            questions: [
              {
                topic: "Data cleaning",
                difficulty: "Easy",
                question: "What is a missing value?",
                options: ["A blank or unavailable data point", "A value that is always zero", "A duplicate table", "A chart label"],
                correctAnswer: "A blank or unavailable data point",
                explanation: "Missing values are empty, null or unavailable values that need handling before analysis."
              },
              {
                topic: "Data cleaning",
                difficulty: "Medium",
                question: "In pandas, which method is commonly used to remove rows with missing values?",
                options: ["dropna()", "remove_nulls()", "delete_missing()", "clean_blank()"],
                correctAnswer: "dropna()",
                explanation: "dropna() removes rows or columns that contain missing values."
              },
              {
                topic: "Data cleaning",
                difficulty: "Hard",
                question: "Why should duplicate records be checked before analysis?",
                options: ["They can distort counts and summaries", "They always improve accuracy", "They make code run slower only", "They remove missing values automatically"],
                correctAnswer: "They can distort counts and summaries",
                explanation: "Duplicates can overcount records and lead to misleading totals, averages and trends."
              },
              {
                topic: "Data cleaning",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap to remove duplicate rows: df = df.___()",
                options: ["drop_duplicates", "remove_twins", "unique_rows", "dedupe_all"],
                correctAnswer: "drop_duplicates",
                explanation: "DataFrame.drop_duplicates() returns data with duplicate rows removed."
              }
            ]
          },
          {
            topic: "notebooks",
            questions: [
              {
                topic: "notebooks",
                difficulty: "Easy",
                question: "What is a common use of Jupyter notebooks?",
                options: ["Combining code, output and notes", "Hosting production databases", "Designing CSS only", "Encrypting files"],
                correctAnswer: "Combining code, output and notes",
                explanation: "Notebooks are useful because they keep code, outputs, charts and written explanation together."
              },
              {
                topic: "notebooks",
                difficulty: "Medium",
                question: "Why should notebook cells be run in a clear order?",
                options: ["Later cells may depend on earlier variables", "It changes Python syntax", "It removes the need for imports", "It makes all charts interactive"],
                correctAnswer: "Later cells may depend on earlier variables",
                explanation: "Notebook state depends on executed cells, so running cells out of order can cause confusing results."
              },
              {
                topic: "notebooks",
                difficulty: "Hard",
                question: "What is a good practice before sharing an analysis notebook?",
                options: ["Restart and run all cells", "Delete all markdown", "Hide every output", "Rename every variable to x"],
                correctAnswer: "Restart and run all cells",
                explanation: "Restarting and running all cells confirms the notebook can reproduce results from a clean state."
              },
              {
                topic: "notebooks",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: In many notebooks, a Markdown cell is used for ___.",
                options: ["explanatory text", "installing RAM", "database indexing", "changing Python keywords"],
                correctAnswer: "explanatory text",
                explanation: "Markdown cells are used for notes, headings, explanations and documentation around code."
              }
            ]
          }
        ]
      }
    }
  };
})();
