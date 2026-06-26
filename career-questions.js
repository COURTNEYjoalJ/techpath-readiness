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
      },
      statistics: {
        label: "Statistics",
        topics: [
          {
            topic: "Descriptive statistics",
            questions: [
              {
                topic: "Descriptive statistics",
                difficulty: "Easy",
                question: "Which measure describes the average value in a dataset?",
                options: ["Mean", "Range", "Mode only", "Sample size"],
                correctAnswer: "Mean",
                explanation: "The mean is the arithmetic average, found by dividing the total by the number of values."
              },
              {
                topic: "Descriptive statistics",
                difficulty: "Medium",
                question: "What does the median represent?",
                options: ["The middle value when data is ordered", "The largest value", "The total of all values", "The first value collected"],
                correctAnswer: "The middle value when data is ordered",
                explanation: "The median is the central value after sorting the data from lowest to highest."
              },
              {
                topic: "Descriptive statistics",
                difficulty: "Hard",
                question: "Why can the median be better than the mean for skewed income data?",
                options: ["It is less affected by extreme values", "It uses every decimal place", "It always equals the mode", "It removes all outliers"],
                correctAnswer: "It is less affected by extreme values",
                explanation: "A few very high incomes can pull the mean upward, while the median better reflects the middle of the data."
              },
              {
                topic: "Descriptive statistics",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: The range is maximum value ___ minimum value.",
                options: ["minus", "plus", "divided by", "multiplied by"],
                correctAnswer: "minus",
                explanation: "The range measures spread by subtracting the minimum value from the maximum value."
              }
            ]
          },
          {
            topic: "Probability",
            questions: [
              {
                topic: "Probability",
                difficulty: "Easy",
                question: "What is the probability of flipping heads on a fair coin?",
                options: ["0.5", "0.25", "0.75", "1"],
                correctAnswer: "0.5",
                explanation: "A fair coin has two equally likely outcomes, so heads has probability 1 out of 2."
              },
              {
                topic: "Probability",
                difficulty: "Medium",
                question: "If two independent events have probabilities 0.5 and 0.2, what is the probability both happen?",
                options: ["0.1", "0.7", "0.3", "0.5"],
                correctAnswer: "0.1",
                explanation: "For independent events, multiply the probabilities: 0.5 x 0.2 = 0.1."
              },
              {
                topic: "Probability",
                difficulty: "Hard",
                question: "What does conditional probability measure?",
                options: ["The chance of an event given another event has occurred", "The average of all values", "The spread around the mean", "The middle value"],
                correctAnswer: "The chance of an event given another event has occurred",
                explanation: "Conditional probability updates the probability of one event based on knowledge of another event."
              },
              {
                topic: "Probability",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: Probability values must be between ___ and 1.",
                options: ["0", "-1", "50", "100"],
                correctAnswer: "0",
                explanation: "Probabilities range from 0, impossible, to 1, certain."
              }
            ]
          },
          {
            topic: "Distributions",
            questions: [
              {
                topic: "Distributions",
                difficulty: "Easy",
                question: "Which distribution is often described as bell-shaped?",
                options: ["Normal distribution", "Text distribution", "Primary key distribution", "Folder distribution"],
                correctAnswer: "Normal distribution",
                explanation: "The normal distribution is symmetric and bell-shaped around its mean."
              },
              {
                topic: "Distributions",
                difficulty: "Medium",
                question: "What does a distribution show?",
                options: ["How values are spread across possible outcomes", "Only the largest value", "Only missing data", "The database name"],
                correctAnswer: "How values are spread across possible outcomes",
                explanation: "A distribution describes the pattern, frequency and spread of values."
              },
              {
                topic: "Distributions",
                difficulty: "Hard",
                question: "In a normal distribution, about 95% of values fall within how many standard deviations of the mean?",
                options: ["2", "1", "3", "5"],
                correctAnswer: "2",
                explanation: "The empirical rule says about 95% of values are within two standard deviations of the mean."
              },
              {
                topic: "Distributions",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: A histogram helps visualize the ___ of numeric data.",
                options: ["distribution", "password", "primary key", "file path"],
                correctAnswer: "distribution",
                explanation: "Histograms group numeric values into bins so you can see the distribution shape."
              }
            ]
          },
          {
            topic: "Hypothesis testing",
            questions: [
              {
                topic: "Hypothesis testing",
                difficulty: "Easy",
                question: "What is a hypothesis test used for?",
                options: ["Testing a claim using data", "Sorting a spreadsheet alphabetically", "Creating a chart title", "Deleting duplicate files"],
                correctAnswer: "Testing a claim using data",
                explanation: "Hypothesis testing uses sample data to evaluate evidence for or against a claim."
              },
              {
                topic: "Hypothesis testing",
                difficulty: "Medium",
                question: "What does a p-value help you judge?",
                options: ["How unusual the result is if the null hypothesis is true", "The file size of the dataset", "The number of columns only", "The name of the sample"],
                correctAnswer: "How unusual the result is if the null hypothesis is true",
                explanation: "A p-value measures how compatible the observed result is with the null hypothesis."
              },
              {
                topic: "Hypothesis testing",
                difficulty: "Hard",
                question: "If p < 0.05 and the significance level is 0.05, what is the usual decision?",
                options: ["Reject the null hypothesis", "Always accept the null hypothesis", "Delete the dataset", "Ignore the sample size"],
                correctAnswer: "Reject the null hypothesis",
                explanation: "When the p-value is below the significance level, the result is considered statistically significant."
              },
              {
                topic: "Hypothesis testing",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: The null hypothesis usually represents the ___ position.",
                options: ["default", "largest", "sorted", "visual"],
                correctAnswer: "default",
                explanation: "The null hypothesis is the default claim, often that there is no effect or no difference."
              }
            ]
          },
          {
            topic: "Regression basics",
            questions: [
              {
                topic: "Regression basics",
                difficulty: "Easy",
                question: "What is regression commonly used for?",
                options: ["Predicting a numeric outcome", "Encrypting a password", "Cropping an image", "Naming a database"],
                correctAnswer: "Predicting a numeric outcome",
                explanation: "Regression models relationships between variables and is often used to predict numeric values."
              },
              {
                topic: "Regression basics",
                difficulty: "Medium",
                question: "In simple linear regression, what does the slope describe?",
                options: ["How much y changes when x increases by 1", "The number of rows", "The chart color", "The missing values only"],
                correctAnswer: "How much y changes when x increases by 1",
                explanation: "The slope measures the expected change in the outcome for a one-unit increase in the predictor."
              },
              {
                topic: "Regression basics",
                difficulty: "Hard",
                question: "What does R-squared describe in a regression model?",
                options: ["The proportion of variance explained by the model", "The number of incorrect rows", "The p-value only", "The total sample size"],
                correctAnswer: "The proportion of variance explained by the model",
                explanation: "R-squared summarizes how much of the outcome variation is explained by the model."
              },
              {
                topic: "Regression basics",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: In y = mx + b, b is the ___.",
                options: ["intercept", "sample size", "standard deviation", "p-value"],
                correctAnswer: "intercept",
                explanation: "The intercept is the predicted value of y when x equals zero."
              }
            ]
          }
        ]
      }
    }
  };
})();
