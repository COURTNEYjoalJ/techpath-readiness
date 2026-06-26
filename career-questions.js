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
      },
      sql: {
        label: "SQL",
        topics: [
          {
            topic: "SELECT and WHERE",
            questions: [
              {
                topic: "SELECT and WHERE",
                difficulty: "Easy",
                question: "Which SQL keyword is used to choose columns from a table?",
                options: ["SELECT", "WHERE", "GROUP", "JOIN"],
                correctAnswer: "SELECT",
                explanation: "SELECT tells SQL which columns or expressions to return from a query."
              },
              {
                topic: "SELECT and WHERE",
                difficulty: "Medium",
                question: "Which clause filters rows before they are returned?",
                options: ["WHERE", "ORDER BY", "SELECT", "LIMIT"],
                correctAnswer: "WHERE",
                explanation: "WHERE applies row-level conditions before the result set is returned."
              },
              {
                topic: "SELECT and WHERE",
                difficulty: "Hard",
                question: "Which query returns customers from London with purchases above 100?",
                options: ["SELECT * FROM customers WHERE city = 'London' AND purchases > 100", "SELECT * FROM customers WHERE city = 'London' OR purchases > 100", "SELECT city = 'London' FROM customers AND purchases > 100", "WHERE city = 'London' SELECT * FROM customers"],
                correctAnswer: "SELECT * FROM customers WHERE city = 'London' AND purchases > 100",
                explanation: "AND requires both conditions to be true: city is London and purchases are above 100."
              },
              {
                topic: "SELECT and WHERE",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: SELECT name FROM employees ___ department = 'Sales';",
                options: ["WHERE", "GROUP BY", "JOIN", "HAVING"],
                correctAnswer: "WHERE",
                explanation: "WHERE filters rows based on conditions such as department = 'Sales'."
              }
            ]
          },
          {
            topic: "GROUP BY and aggregation",
            questions: [
              {
                topic: "GROUP BY and aggregation",
                difficulty: "Easy",
                question: "Which function counts rows in SQL?",
                options: ["COUNT()", "TOTAL()", "ROWS()", "NUMBER()"],
                correctAnswer: "COUNT()",
                explanation: "COUNT() returns the number of rows or non-null values in a group."
              },
              {
                topic: "GROUP BY and aggregation",
                difficulty: "Medium",
                question: "What does GROUP BY do?",
                options: ["Combines rows into groups for aggregate calculations", "Sorts rows alphabetically only", "Deletes duplicate rows", "Creates a new database"],
                correctAnswer: "Combines rows into groups for aggregate calculations",
                explanation: "GROUP BY groups rows with matching values so aggregate functions can summarize each group."
              },
              {
                topic: "GROUP BY and aggregation",
                difficulty: "Hard",
                question: "Which clause filters grouped aggregate results?",
                options: ["HAVING", "WHERE", "SELECT", "JOIN"],
                correctAnswer: "HAVING",
                explanation: "HAVING filters after grouping, often using aggregate conditions such as COUNT(*) > 5."
              },
              {
                topic: "GROUP BY and aggregation",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: SELECT region, SUM(sales) FROM orders ___ region;",
                options: ["GROUP BY", "WHERE", "ORDER", "JOIN"],
                correctAnswer: "GROUP BY",
                explanation: "GROUP BY region creates one summary row per region."
              }
            ]
          },
          {
            topic: "JOINs",
            questions: [
              {
                topic: "JOINs",
                difficulty: "Easy",
                question: "What is a JOIN used for?",
                options: ["Combining rows from related tables", "Deleting all rows", "Renaming a database", "Counting characters"],
                correctAnswer: "Combining rows from related tables",
                explanation: "JOINs combine data from tables using related columns such as IDs."
              },
              {
                topic: "JOINs",
                difficulty: "Medium",
                question: "Which JOIN returns only matching rows from both tables?",
                options: ["INNER JOIN", "LEFT JOIN", "FULL JOIN", "CROSS JOIN"],
                correctAnswer: "INNER JOIN",
                explanation: "INNER JOIN returns rows where the join condition matches in both tables."
              },
              {
                topic: "JOINs",
                difficulty: "Hard",
                question: "What does a LEFT JOIN return?",
                options: ["All rows from the left table and matching rows from the right table", "Only unmatched rows", "Only rows from the right table", "No null values ever"],
                correctAnswer: "All rows from the left table and matching rows from the right table",
                explanation: "LEFT JOIN preserves all rows from the left table and fills missing right-side matches with nulls."
              },
              {
                topic: "JOINs",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: SELECT * FROM orders o JOIN customers c ___ o.customer_id = c.id;",
                options: ["ON", "WHERE", "GROUP BY", "AS"],
                correctAnswer: "ON",
                explanation: "ON defines the join condition between the two tables."
              }
            ]
          },
          {
            topic: "Subqueries",
            questions: [
              {
                topic: "Subqueries",
                difficulty: "Easy",
                question: "What is a subquery?",
                options: ["A query nested inside another query", "A table backup", "A chart type", "A column alias only"],
                correctAnswer: "A query nested inside another query",
                explanation: "A subquery is a SELECT statement used inside another SQL statement."
              },
              {
                topic: "Subqueries",
                difficulty: "Medium",
                question: "Where can a subquery commonly appear?",
                options: ["Inside WHERE, FROM, or SELECT", "Only after ORDER BY", "Only before SELECT", "Only inside table names"],
                correctAnswer: "Inside WHERE, FROM, or SELECT",
                explanation: "Subqueries can be used in multiple clauses depending on the problem."
              },
              {
                topic: "Subqueries",
                difficulty: "Hard",
                question: "Which query finds products priced above the average product price?",
                options: ["SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)", "SELECT * FROM products WHERE AVG(price) > price", "SELECT AVG(price) FROM products WHERE price > products", "SELECT * FROM products GROUP BY price > AVG(price)"],
                correctAnswer: "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)",
                explanation: "The subquery calculates the average price, and the outer query compares each product price to it."
              },
              {
                topic: "Subqueries",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: SELECT name FROM employees WHERE salary > (SELECT ___(salary) FROM employees);",
                options: ["AVG", "JOIN", "WHERE", "COUNT ROWS"],
                correctAnswer: "AVG",
                explanation: "AVG(salary) calculates the average salary used by the outer query."
              }
            ]
          },
          {
            topic: "Window functions",
            questions: [
              {
                topic: "Window functions",
                difficulty: "Easy",
                question: "What can a window function do?",
                options: ["Calculate across related rows while keeping row detail", "Delete duplicate databases", "Replace every JOIN", "Only filter rows"],
                correctAnswer: "Calculate across related rows while keeping row detail",
                explanation: "Window functions calculate values over a set of rows without collapsing the result into groups."
              },
              {
                topic: "Window functions",
                difficulty: "Medium",
                question: "Which clause is commonly used with window functions?",
                options: ["OVER", "UNDER", "WINDOWS ONLY", "GROUP EACH"],
                correctAnswer: "OVER",
                explanation: "OVER defines the window of rows used by a window function."
              },
              {
                topic: "Window functions",
                difficulty: "Hard",
                question: "What does PARTITION BY do in a window function?",
                options: ["Splits rows into groups for the window calculation", "Deletes partitions from a disk", "Filters rows before SELECT", "Creates a table backup"],
                correctAnswer: "Splits rows into groups for the window calculation",
                explanation: "PARTITION BY divides rows into groups while still returning row-level results."
              },
              {
                topic: "Window functions",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: ROW_NUMBER() ___ (PARTITION BY customer_id ORDER BY order_date) assigns row numbers.",
                options: ["OVER", "GROUP", "WHERE", "JOIN"],
                correctAnswer: "OVER",
                explanation: "ROW_NUMBER() uses OVER to define how rows are partitioned and ordered."
              }
            ]
          }
        ]
      },
      "machine-learning": {
        label: "Machine Learning",
        topics: [
          {
            topic: "Supervised learning",
            questions: [
              {
                topic: "Supervised learning",
                difficulty: "Easy",
                question: "What is supervised learning?",
                options: ["Learning from labelled examples", "Finding groups without labels", "Deleting missing values", "Sorting rows alphabetically"],
                correctAnswer: "Learning from labelled examples",
                explanation: "Supervised learning trains models using input data paired with known target labels."
              },
              {
                topic: "Supervised learning",
                difficulty: "Medium",
                question: "Which task is a supervised learning problem?",
                options: ["Predicting house prices from labelled sales data", "Grouping customers without labels", "Finding duplicate files", "Compressing an image"],
                correctAnswer: "Predicting house prices from labelled sales data",
                explanation: "House price prediction uses examples where the correct price is known during training."
              },
              {
                topic: "Supervised learning",
                difficulty: "Hard",
                question: "Why does supervised learning need a target variable?",
                options: ["The model needs correct outputs to learn the input-output relationship", "The target variable replaces all features", "It prevents all overfitting automatically", "It removes the need for evaluation"],
                correctAnswer: "The model needs correct outputs to learn the input-output relationship",
                explanation: "The target variable gives the model feedback about what it should predict from the features."
              },
              {
                topic: "Supervised learning",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: In supervised learning, X usually contains features and y contains the ___.",
                options: ["target", "row index", "model name", "file path"],
                correctAnswer: "target",
                explanation: "y usually stores the labels or target values that the model is trained to predict."
              }
            ]
          },
          {
            topic: "Unsupervised learning",
            questions: [
              {
                topic: "Unsupervised learning",
                difficulty: "Easy",
                question: "What is unsupervised learning commonly used for?",
                options: ["Finding patterns without labelled targets", "Predicting known labels only", "Writing SQL joins", "Creating website layouts"],
                correctAnswer: "Finding patterns without labelled targets",
                explanation: "Unsupervised learning looks for structure in data when no target labels are provided."
              },
              {
                topic: "Unsupervised learning",
                difficulty: "Medium",
                question: "Which method is commonly associated with unsupervised learning?",
                options: ["Clustering", "Linear regression with labels", "Train/test split only", "Manual data entry"],
                correctAnswer: "Clustering",
                explanation: "Clustering groups similar observations without using predefined labels."
              },
              {
                topic: "Unsupervised learning",
                difficulty: "Hard",
                question: "Why can evaluating unsupervised models be harder than supervised models?",
                options: ["There may be no known correct label to compare against", "They never produce outputs", "They cannot use numeric data", "They always have perfect accuracy"],
                correctAnswer: "There may be no known correct label to compare against",
                explanation: "Without ground-truth labels, evaluation often relies on indirect metrics or business usefulness."
              },
              {
                topic: "Unsupervised learning",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: K-means is commonly used for ___.",
                options: ["clustering", "classification labels", "HTML styling", "database backups"],
                correctAnswer: "clustering",
                explanation: "K-means is an unsupervised algorithm that groups data points into clusters."
              }
            ]
          },
          {
            topic: "Train/test split",
            questions: [
              {
                topic: "Train/test split",
                difficulty: "Easy",
                question: "Why do we split data into training and test sets?",
                options: ["To evaluate the model on data it did not train on", "To make the dataset smaller only", "To remove all errors", "To avoid using features"],
                correctAnswer: "To evaluate the model on data it did not train on",
                explanation: "A test set estimates how well the model may perform on new, unseen data."
              },
              {
                topic: "Train/test split",
                difficulty: "Medium",
                question: "Which set is used to fit the model parameters?",
                options: ["Training set", "Test set", "Future production data only", "Column names"],
                correctAnswer: "Training set",
                explanation: "The model learns patterns from the training set."
              },
              {
                topic: "Train/test split",
                difficulty: "Hard",
                question: "What is data leakage?",
                options: ["When information from outside the training data unfairly helps the model", "When files are deleted", "When rows are sorted", "When a model has no features"],
                correctAnswer: "When information from outside the training data unfairly helps the model",
                explanation: "Data leakage makes evaluation too optimistic because the model has access to information it should not have."
              },
              {
                topic: "Train/test split",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: A common split is 80% training and ___% testing.",
                options: ["20", "80", "100", "0"],
                correctAnswer: "20",
                explanation: "An 80/20 split uses most data for training and keeps 20% aside for testing."
              }
            ]
          },
          {
            topic: "Model evaluation",
            questions: [
              {
                topic: "Model evaluation",
                difficulty: "Easy",
                question: "What does accuracy measure in classification?",
                options: ["The proportion of predictions that are correct", "The number of input columns", "The model training time only", "The file size"],
                correctAnswer: "The proportion of predictions that are correct",
                explanation: "Accuracy is correct predictions divided by total predictions."
              },
              {
                topic: "Model evaluation",
                difficulty: "Medium",
                question: "Which metric is useful when false positives and false negatives matter differently?",
                options: ["Precision and recall", "File size", "Column count", "Random seed"],
                correctAnswer: "Precision and recall",
                explanation: "Precision and recall separate different types of classification errors."
              },
              {
                topic: "Model evaluation",
                difficulty: "Hard",
                question: "Why can accuracy be misleading on imbalanced datasets?",
                options: ["A model can score high by mostly predicting the majority class", "Accuracy cannot be calculated for classification", "It always ignores labels", "It only works for text data"],
                correctAnswer: "A model can score high by mostly predicting the majority class",
                explanation: "If one class dominates, a model may look accurate while performing poorly on the minority class."
              },
              {
                topic: "Model evaluation",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: For regression, mean absolute error measures average absolute ___.",
                options: ["prediction error", "row count", "class label", "feature name"],
                correctAnswer: "prediction error",
                explanation: "MAE averages the absolute differences between predicted and actual values."
              }
            ]
          },
          {
            topic: "Overfitting and underfitting",
            questions: [
              {
                topic: "Overfitting and underfitting",
                difficulty: "Easy",
                question: "What is overfitting?",
                options: ["When a model learns training data too closely and performs poorly on new data", "When a model has no data", "When a model is always too simple", "When labels are missing only"],
                correctAnswer: "When a model learns training data too closely and performs poorly on new data",
                explanation: "Overfitting means the model memorizes noise or detail that does not generalize."
              },
              {
                topic: "Overfitting and underfitting",
                difficulty: "Medium",
                question: "What is underfitting?",
                options: ["When a model is too simple to capture the real pattern", "When a model memorizes every row", "When a model has perfect test performance", "When test data leaks into training"],
                correctAnswer: "When a model is too simple to capture the real pattern",
                explanation: "Underfitting happens when the model is not flexible enough to learn the important relationships."
              },
              {
                topic: "Overfitting and underfitting",
                difficulty: "Hard",
                question: "Which sign suggests overfitting?",
                options: ["Very high training score but much lower test score", "Low training score and low test score", "No training data", "Identical feature names"],
                correctAnswer: "Very high training score but much lower test score",
                explanation: "A large gap between training and test performance often means the model does not generalize well."
              },
              {
                topic: "Overfitting and underfitting",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: Regularization can help reduce ___.",
                options: ["overfitting", "all missing values", "database joins", "test labels"],
                correctAnswer: "overfitting",
                explanation: "Regularization penalizes overly complex models, which can reduce overfitting."
              }
            ]
          }
        ]
      },
      maths: {
        label: "Maths",
        topics: [
          {
            topic: "Algebra",
            questions: [
              {
                topic: "Algebra",
                difficulty: "Easy",
                question: "What is the value of x in the equation x + 5 = 12?",
                options: ["7", "5", "12", "17"],
                correctAnswer: "7",
                explanation: "Subtract 5 from both sides: x = 12 - 5, so x = 7."
              },
              {
                topic: "Algebra",
                difficulty: "Medium",
                question: "If 3x = 18, what is x?",
                options: ["6", "3", "15", "21"],
                correctAnswer: "6",
                explanation: "Divide both sides by 3 to isolate x: x = 18 / 3 = 6."
              },
              {
                topic: "Algebra",
                difficulty: "Hard",
                question: "Which expression is equivalent to 2(x + 4) - x?",
                options: ["x + 8", "3x + 4", "2x + 8", "x + 4"],
                correctAnswer: "x + 8",
                explanation: "Expand 2(x + 4) to 2x + 8, then subtract x to get x + 8."
              },
              {
                topic: "Algebra",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: To solve 5x - 10 = 0, first add 10 to both sides, then divide by ___.",
                options: ["5", "10", "0", "x"],
                correctAnswer: "5",
                explanation: "After adding 10, the equation is 5x = 10, so divide by 5."
              }
            ]
          },
          {
            topic: "Linear algebra basics",
            questions: [
              {
                topic: "Linear algebra basics",
                difficulty: "Easy",
                question: "What is a vector?",
                options: ["An ordered list of numbers", "A single database row only", "A chart title", "A text paragraph"],
                correctAnswer: "An ordered list of numbers",
                explanation: "A vector stores values in order, often representing a point, direction, or feature set."
              },
              {
                topic: "Linear algebra basics",
                difficulty: "Medium",
                question: "What does the dot product of two equal-length vectors produce?",
                options: ["A single number", "A new table", "A random category", "A missing value"],
                correctAnswer: "A single number",
                explanation: "The dot product multiplies matching entries and sums the results, producing one scalar value."
              },
              {
                topic: "Linear algebra basics",
                difficulty: "Hard",
                question: "Why is linear algebra important in machine learning?",
                options: ["Models often represent data, weights, and transformations as vectors and matrices", "It replaces all statistics", "It removes the need for features", "It only formats charts"],
                correctAnswer: "Models often represent data, weights, and transformations as vectors and matrices",
                explanation: "Many algorithms use vector and matrix operations to calculate predictions and update model weights."
              },
              {
                topic: "Linear algebra basics",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: The dot product of [1, 2] and [3, 4] is 1*3 + 2*4 = ___.",
                options: ["11", "7", "10", "24"],
                correctAnswer: "11",
                explanation: "Multiply matching positions and add them: 3 + 8 = 11."
              }
            ]
          },
          {
            topic: "Calculus basics",
            questions: [
              {
                topic: "Calculus basics",
                difficulty: "Easy",
                question: "What does a derivative describe?",
                options: ["Rate of change", "Total row count", "Database size", "Text length"],
                correctAnswer: "Rate of change",
                explanation: "A derivative describes how quickly one value changes with respect to another."
              },
              {
                topic: "Calculus basics",
                difficulty: "Medium",
                question: "What is the derivative of f(x) = x^2?",
                options: ["2x", "x", "x^3", "2"],
                correctAnswer: "2x",
                explanation: "Using the power rule, the derivative of x^2 is 2x."
              },
              {
                topic: "Calculus basics",
                difficulty: "Hard",
                question: "In model training, why are gradients useful?",
                options: ["They show which direction changes can reduce a loss function", "They store raw labels only", "They delete outliers automatically", "They replace all test data"],
                correctAnswer: "They show which direction changes can reduce a loss function",
                explanation: "Gradients guide optimization by showing how the loss changes as model parameters change."
              },
              {
                topic: "Calculus basics",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: Gradient descent updates weights by moving in the direction that reduces the ___.",
                options: ["loss", "file name", "column title", "row index"],
                correctAnswer: "loss",
                explanation: "Gradient descent adjusts weights to reduce the loss or error measure."
              }
            ]
          },
          {
            topic: "Vectors",
            questions: [
              {
                topic: "Vectors",
                difficulty: "Easy",
                question: "Which example is a 3-dimensional vector?",
                options: ["[2, 4, 6]", "[2]", "[2, 4, 6, 8, 10]", "name = Alice"],
                correctAnswer: "[2, 4, 6]",
                explanation: "A 3-dimensional vector has three ordered values."
              },
              {
                topic: "Vectors",
                difficulty: "Medium",
                question: "What is [1, 3] + [2, 4]?",
                options: ["[3, 7]", "[2, 12]", "[1, 2, 3, 4]", "[1, 7]"],
                correctAnswer: "[3, 7]",
                explanation: "Vector addition adds matching positions: [1 + 2, 3 + 4] = [3, 7]."
              },
              {
                topic: "Vectors",
                difficulty: "Hard",
                question: "What does vector magnitude measure?",
                options: ["The length of a vector", "The number of table columns only", "The spelling of labels", "The order of a SQL query"],
                correctAnswer: "The length of a vector",
                explanation: "Magnitude measures the vector's length from the origin in its coordinate space."
              },
              {
                topic: "Vectors",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: The vector [3, 4] has magnitude sqrt(3^2 + 4^2) = ___.",
                options: ["5", "7", "12", "25"],
                correctAnswer: "5",
                explanation: "sqrt(9 + 16) = sqrt(25) = 5."
              }
            ]
          },
          {
            topic: "Matrices",
            questions: [
              {
                topic: "Matrices",
                difficulty: "Easy",
                question: "What is a matrix?",
                options: ["A rectangular grid of numbers", "A single text label", "A chart color", "A browser button"],
                correctAnswer: "A rectangular grid of numbers",
                explanation: "A matrix arranges numbers in rows and columns."
              },
              {
                topic: "Matrices",
                difficulty: "Medium",
                question: "How many rows and columns does [[1, 2], [3, 4], [5, 6]] have?",
                options: ["3 rows and 2 columns", "2 rows and 3 columns", "1 row and 6 columns", "6 rows and 1 column"],
                correctAnswer: "3 rows and 2 columns",
                explanation: "There are three inner lists, each with two values, so the matrix is 3 by 2."
              },
              {
                topic: "Matrices",
                difficulty: "Hard",
                question: "When can two matrices A and B be multiplied as A * B?",
                options: ["When the number of columns in A equals the number of rows in B", "When they have identical names", "When both contain only zeros", "When A has fewer rows than B"],
                correctAnswer: "When the number of columns in A equals the number of rows in B",
                explanation: "Matrix multiplication requires compatible inner dimensions."
              },
              {
                topic: "Matrices",
                difficulty: "Debug or Fill Gap",
                question: "Fill the gap: A 2 x 3 matrix multiplied by a 3 x 1 matrix produces a ___ x 1 matrix.",
                options: ["2", "3", "1", "6"],
                correctAnswer: "2",
                explanation: "The inner dimensions match and the output takes the outer dimensions: 2 x 1."
              }
            ]
          }
        ]
      },
      communication: {
        label: "Communication",
        topics: [
          {
            topic: "Explaining insights",
            questions: [
              {
                topic: "Explaining insights",
                difficulty: "Easy",
                question: "What is the main goal when explaining a data insight?",
                options: ["Help the audience understand the finding and its meaning", "Show every raw row in the dataset", "Use as many technical terms as possible", "Avoid discussing business impact"],
                correctAnswer: "Help the audience understand the finding and its meaning",
                explanation: "A useful insight explains what was found and why it matters to the audience."
              },
              {
                topic: "Explaining insights",
                difficulty: "Medium",
                question: "Which explanation is most useful for a non-technical stakeholder?",
                options: ["Sales dropped 12% after the price change, mainly in returning customers", "The dataframe index shifted after a groupby operation", "The query used an inner join with a CTE", "The model stored values in a NumPy array"],
                correctAnswer: "Sales dropped 12% after the price change, mainly in returning customers",
                explanation: "Non-technical stakeholders need the result, scale, and business meaning in clear language."
              },
              {
                topic: "Explaining insights",
                difficulty: "Hard",
                question: "Why should you include context when presenting a metric change?",
                options: ["Context helps the audience judge whether the change is meaningful", "Context makes charts unnecessary", "Context hides uncertainty", "Context replaces the actual result"],
                correctAnswer: "Context helps the audience judge whether the change is meaningful",
                explanation: "A number alone can be misleading; context such as time period, baseline, and segment makes it interpretable."
              },
              {
                topic: "Explaining insights",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: A dashboard shows churn increased from 4% to 6%. What should you explain first?",
                options: ["The size and business meaning of the increase", "The font used in the dashboard", "Every formula in the spreadsheet", "Only the database table name"],
                correctAnswer: "The size and business meaning of the increase",
                explanation: "Start with the practical meaning: churn rose by 2 percentage points, which may affect revenue and retention plans."
              }
            ]
          },
          {
            topic: "Business understanding",
            questions: [
              {
                topic: "Business understanding",
                difficulty: "Easy",
                question: "Why is business understanding important in data work?",
                options: ["It helps connect analysis to real decisions", "It removes the need to check data quality", "It means code is never needed", "It guarantees every chart is correct"],
                correctAnswer: "It helps connect analysis to real decisions",
                explanation: "Business understanding keeps analysis focused on useful questions and actions."
              },
              {
                topic: "Business understanding",
                difficulty: "Medium",
                question: "Before starting analysis, what should you clarify first?",
                options: ["The decision or problem the analysis should support", "The final chart color", "The longest possible report title", "The number of slides before seeing the question"],
                correctAnswer: "The decision or problem the analysis should support",
                explanation: "Knowing the decision or problem helps choose the right data, method, and level of detail."
              },
              {
                topic: "Business understanding",
                difficulty: "Hard",
                question: "A metric improved, but customer complaints increased. What is the best communication response?",
                options: ["Explain the tradeoff and investigate whether the metric misses customer experience", "Report only the improved metric", "Ignore complaints because the number improved", "Delete the metric from the report"],
                correctAnswer: "Explain the tradeoff and investigate whether the metric misses customer experience",
                explanation: "Good analysis considers whether metrics align with business outcomes and customer impact."
              },
              {
                topic: "Business understanding",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: A good analysis question should be tied to a business ___.",
                options: ["decision", "font", "shortcut", "folder"],
                correctAnswer: "decision",
                explanation: "Analysis is more valuable when it supports a concrete decision or priority."
              }
            ]
          },
          {
            topic: "Data storytelling",
            questions: [
              {
                topic: "Data storytelling",
                difficulty: "Easy",
                question: "What is data storytelling?",
                options: ["Using data, visuals, and narrative to explain a finding", "Writing fiction about a dataset", "Showing charts without explanation", "Only exporting tables to CSV"],
                correctAnswer: "Using data, visuals, and narrative to explain a finding",
                explanation: "Data storytelling combines evidence and explanation so an audience can follow the message."
              },
              {
                topic: "Data storytelling",
                difficulty: "Medium",
                question: "Which story structure is usually clearest for an insight?",
                options: ["Context, finding, evidence, recommendation", "Recommendation, raw logs, unrelated notes, appendix only", "All visuals first, no conclusion", "Code, code comments, then chart colors"],
                correctAnswer: "Context, finding, evidence, recommendation",
                explanation: "A clear story moves from the situation to the insight, supports it with evidence, then explains what to do next."
              },
              {
                topic: "Data storytelling",
                difficulty: "Hard",
                question: "Why should a chart in a story have one main message?",
                options: ["It reduces confusion and helps the audience focus on the decision-relevant point", "It prevents anyone from asking questions", "It means labels are unnecessary", "It hides the underlying data"],
                correctAnswer: "It reduces confusion and helps the audience focus on the decision-relevant point",
                explanation: "Focused visuals make the evidence easier to understand and remember."
              },
              {
                topic: "Data storytelling",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: Your chart has five trends, but only one explains the recommendation. What should you do?",
                options: ["Highlight the important trend and reduce visual noise", "Add more colors to every line", "Remove the title", "Show the raw table instead of explaining"],
                correctAnswer: "Highlight the important trend and reduce visual noise",
                explanation: "Good storytelling guides attention to the evidence that supports the key message."
              }
            ]
          },
          {
            topic: "Stakeholder communication",
            questions: [
              {
                topic: "Stakeholder communication",
                difficulty: "Easy",
                question: "Who is a stakeholder in a data project?",
                options: ["Someone affected by or interested in the project outcome", "Only the person who wrote the code", "Only the database administrator", "A random user outside the business"],
                correctAnswer: "Someone affected by or interested in the project outcome",
                explanation: "Stakeholders include people who need the analysis, make decisions from it, or are affected by the results."
              },
              {
                topic: "Stakeholder communication",
                difficulty: "Medium",
                question: "What is the best way to communicate uncertainty to stakeholders?",
                options: ["State the uncertainty clearly and explain what it means for the decision", "Hide uncertainty to sound confident", "Use only technical formulas", "Avoid giving any conclusion"],
                correctAnswer: "State the uncertainty clearly and explain what it means for the decision",
                explanation: "Clear uncertainty builds trust and helps stakeholders understand risk."
              },
              {
                topic: "Stakeholder communication",
                difficulty: "Hard",
                question: "A stakeholder asks for a metric that could be misleading. What should you do?",
                options: ["Explain the risk and suggest a better metric or supporting context", "Provide it without comment", "Refuse all future questions", "Change the data silently"],
                correctAnswer: "Explain the risk and suggest a better metric or supporting context",
                explanation: "Strong communication helps stakeholders avoid poor decisions while still supporting their goals."
              },
              {
                topic: "Stakeholder communication",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: For executives, communication should usually be concise and focused on ___.",
                options: ["decisions", "syntax errors", "file extensions", "keyboard shortcuts"],
                correctAnswer: "decisions",
                explanation: "Executive audiences usually need the implication, risk, and recommended action more than implementation detail."
              }
            ]
          },
          {
            topic: "Presentation basics",
            questions: [
              {
                topic: "Presentation basics",
                difficulty: "Easy",
                question: "What should a presentation slide title usually communicate?",
                options: ["The main takeaway of the slide", "Only the chart type", "The file path", "A vague label such as Results"],
                correctAnswer: "The main takeaway of the slide",
                explanation: "Takeaway titles help the audience understand the point before reading the details."
              },
              {
                topic: "Presentation basics",
                difficulty: "Medium",
                question: "Which practice improves readability in a data presentation?",
                options: ["Use clear labels and avoid overcrowding slides", "Put every detail on one slide", "Remove all axis labels", "Use tiny text to fit more data"],
                correctAnswer: "Use clear labels and avoid overcrowding slides",
                explanation: "Readable slides make it easier for the audience to understand the key evidence."
              },
              {
                topic: "Presentation basics",
                difficulty: "Hard",
                question: "Why should recommendations be separated from supporting detail when presenting?",
                options: ["It helps the audience grasp the decision first and review evidence as needed", "It hides the evidence", "It makes the recommendation impossible to challenge", "It removes the need for analysis"],
                correctAnswer: "It helps the audience grasp the decision first and review evidence as needed",
                explanation: "Separating the recommendation from detail keeps the message clear while still allowing evidence review."
              },
              {
                topic: "Presentation basics",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: You have ten analysis details but only five minutes to present. What should you prioritize?",
                options: ["Key finding, impact, recommendation, and critical evidence", "Every spreadsheet cell", "The full code history", "All possible chart variations"],
                correctAnswer: "Key finding, impact, recommendation, and critical evidence",
                explanation: "Short presentations should focus on what the audience needs to know to act."
              }
            ]
          }
        ]
      }
    }
  };
})();
