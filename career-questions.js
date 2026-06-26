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
      },
      excel: {
        label: "Excel",
        topics: [
          {
            topic: "Formulas and functions",
            questions: [
              {
                topic: "Formulas and functions",
                difficulty: "Easy",
                question: "Which symbol starts a formula in Excel?",
                options: ["=", "+", "#", "@"],
                correctAnswer: "=",
                explanation: "Excel formulas normally begin with an equals sign so Excel knows to calculate the expression."
              },
              {
                topic: "Formulas and functions",
                difficulty: "Medium",
                question: "Which function adds values in the range A1:A10?",
                options: ["=SUM(A1:A10)", "=ADD(A1-A10)", "=TOTAL(A1,A10)", "=COUNT(A1:A10)"],
                correctAnswer: "=SUM(A1:A10)",
                explanation: "SUM adds numeric values across a range such as A1:A10."
              },
              {
                topic: "Formulas and functions",
                difficulty: "Hard",
                question: "Which formula counts only cells in A1:A20 that are greater than 100?",
                options: ["=COUNTIF(A1:A20,\">100\")", "=COUNT(A1:A20,\">100\")", "=SUMIF(A1:A20,\">100\")", "=IFCOUNT(A1:A20,100)"],
                correctAnswer: "=COUNTIF(A1:A20,\">100\")",
                explanation: "COUNTIF counts cells that meet a condition, while SUMIF adds matching values."
              },
              {
                topic: "Formulas and functions",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To calculate the average of B2:B12, use =___(B2:B12).",
                options: ["AVERAGE", "SUM", "COUNT", "MEDIANIF"],
                correctAnswer: "AVERAGE",
                explanation: "AVERAGE returns the mean of the selected numeric range."
              }
            ]
          },
          {
            topic: "Lookup functions",
            questions: [
              {
                topic: "Lookup functions",
                difficulty: "Easy",
                question: "What is a lookup function used for?",
                options: ["Finding a matching value and returning related information", "Changing worksheet colors only", "Deleting duplicate worksheets", "Creating a password"],
                correctAnswer: "Finding a matching value and returning related information",
                explanation: "Lookup functions search for a value and return related data from another row or column."
              },
              {
                topic: "Lookup functions",
                difficulty: "Medium",
                question: "Which function can look up values to the right or left of the lookup column?",
                options: ["XLOOKUP", "SUM", "TODAY", "ROUND"],
                correctAnswer: "XLOOKUP",
                explanation: "XLOOKUP is more flexible than VLOOKUP because it can return values from columns on either side."
              },
              {
                topic: "Lookup functions",
                difficulty: "Hard",
                question: "Why can VLOOKUP return the wrong result when the final argument is TRUE or omitted?",
                options: ["It may use approximate matching and require sorted lookup data", "It always deletes duplicate rows", "It only works with text values", "It changes the lookup range into a chart"],
                correctAnswer: "It may use approximate matching and require sorted lookup data",
                explanation: "VLOOKUP with approximate match can return unexpected results if the lookup column is not sorted correctly."
              },
              {
                topic: "Lookup functions",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: You need an exact product price by product ID. Which lookup mode should you choose?",
                options: ["Exact match", "Approximate match", "Random match", "Manual color match"],
                correctAnswer: "Exact match",
                explanation: "Product IDs should match exactly so the returned price belongs to the correct product."
              }
            ]
          },
          {
            topic: "Pivot tables",
            questions: [
              {
                topic: "Pivot tables",
                difficulty: "Easy",
                question: "What is a pivot table mainly used for?",
                options: ["Summarising and grouping data", "Writing long text documents", "Changing file permissions", "Creating email accounts"],
                correctAnswer: "Summarising and grouping data",
                explanation: "Pivot tables quickly summarise data by categories, dates, regions, and other fields."
              },
              {
                topic: "Pivot tables",
                difficulty: "Medium",
                question: "In a sales pivot table, where would you usually place Region to compare sales by area?",
                options: ["Rows", "Values only", "File name", "Workbook theme"],
                correctAnswer: "Rows",
                explanation: "Putting Region in Rows groups the summary by each region."
              },
              {
                topic: "Pivot tables",
                difficulty: "Hard",
                question: "Why should source data be in a clean tabular format before creating a pivot table?",
                options: ["Pivot tables need consistent columns and rows to summarise accurately", "Pivot tables only work with merged title cells", "Pivot tables require blank rows between records", "Pivot tables cannot use column headers"],
                correctAnswer: "Pivot tables need consistent columns and rows to summarise accurately",
                explanation: "Clean tables with headers and consistent rows help pivot tables detect fields and calculate reliable summaries."
              },
              {
                topic: "Pivot tables",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To calculate total revenue in a pivot table, place Revenue in the ___ area.",
                options: ["Values", "Rows", "Columns", "Filters only"],
                correctAnswer: "Values",
                explanation: "Numeric fields go in the Values area when you want Excel to sum, count, or average them."
              }
            ]
          },
          {
            topic: "Charts and dashboards",
            questions: [
              {
                topic: "Charts and dashboards",
                difficulty: "Easy",
                question: "Which chart is usually best for showing a trend over time?",
                options: ["Line chart", "Pie chart", "Radar chart", "Doughnut chart"],
                correctAnswer: "Line chart",
                explanation: "Line charts are commonly used to show changes across dates or time periods."
              },
              {
                topic: "Charts and dashboards",
                difficulty: "Medium",
                question: "What is the main purpose of a dashboard?",
                options: ["Show key metrics clearly in one place", "Store hidden formulas only", "Replace all data cleaning", "Make every worksheet read-only"],
                correctAnswer: "Show key metrics clearly in one place",
                explanation: "Dashboards combine important metrics and visuals so users can monitor performance quickly."
              },
              {
                topic: "Charts and dashboards",
                difficulty: "Hard",
                question: "Which dashboard design choice usually improves readability?",
                options: ["Use clear titles, consistent formatting, and avoid clutter", "Use every chart type on one page", "Remove labels from all visuals", "Use tiny text to fit more metrics"],
                correctAnswer: "Use clear titles, consistent formatting, and avoid clutter",
                explanation: "Readable dashboards make the most important information easy to scan and compare."
              },
              {
                topic: "Charts and dashboards",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: You need to compare sales across six product categories. Which chart is usually clearest?",
                options: ["Bar chart", "Scatter plot", "Line chart without dates", "Pie chart with many slices"],
                correctAnswer: "Bar chart",
                explanation: "Bar charts make category comparisons clear, especially when there are several categories."
              }
            ]
          },
          {
            topic: "Data cleaning in Excel",
            questions: [
              {
                topic: "Data cleaning in Excel",
                difficulty: "Easy",
                question: "Which Excel feature can quickly remove repeated rows?",
                options: ["Remove Duplicates", "Freeze Panes", "Page Layout", "Protect Sheet"],
                correctAnswer: "Remove Duplicates",
                explanation: "Remove Duplicates identifies repeated records and removes extra copies based on selected columns."
              },
              {
                topic: "Data cleaning in Excel",
                difficulty: "Medium",
                question: "Which function removes extra spaces from text?",
                options: ["TRIM", "SPACE", "CLEANROWS", "REMOVE"],
                correctAnswer: "TRIM",
                explanation: "TRIM removes extra spaces except single spaces between words."
              },
              {
                topic: "Data cleaning in Excel",
                difficulty: "Hard",
                question: "Why should you standardise date formats before analysis?",
                options: ["Mixed date formats can cause filtering, sorting, and calculations to fail", "Dates cannot be used in Excel", "Date formats only affect cell color", "Excel deletes dates during pivot tables"],
                correctAnswer: "Mixed date formats can cause filtering, sorting, and calculations to fail",
                explanation: "Consistent date formats help Excel recognise dates correctly for calculations and summaries."
              },
              {
                topic: "Data cleaning in Excel",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To split full names into first and last name columns, use Text to ___.",
                options: ["Columns", "Rows", "Charts", "Formulas"],
                correctAnswer: "Columns",
                explanation: "Text to Columns can split text into separate columns based on spaces, commas, or other delimiters."
              }
            ]
          }
        ]
      },
      "power-bi": {
        label: "Power BI",
        topics: [
          {
            topic: "Power BI interface and data loading",
            questions: [
              {
                topic: "Power BI interface and data loading",
                difficulty: "Easy",
                question: "Which Power BI command is commonly used to import data from files, databases, or online sources?",
                options: ["Format visual", "Get data", "New measure", "Publish"],
                correctAnswer: "Get data",
                explanation: "Get data opens the connectors used to import or connect to data sources."
              },
              {
                topic: "Power BI interface and data loading",
                difficulty: "Medium",
                question: "Which Power BI view is useful for inspecting rows and columns after data is loaded?",
                options: ["Model view", "Data view", "Report view", "Theme view"],
                correctAnswer: "Data view",
                explanation: "Data view lets you inspect loaded tables, columns, and values."
              },
              {
                topic: "Power BI interface and data loading",
                difficulty: "Hard",
                question: "What is a key difference between Import mode and DirectQuery?",
                options: ["DirectQuery stores all data only inside the report file", "Import mode cannot create visuals", "Import mode loads data into the model, while DirectQuery queries the source when needed", "DirectQuery removes the need for relationships"],
                correctAnswer: "Import mode loads data into the model, while DirectQuery queries the source when needed",
                explanation: "Import mode stores a copy in the Power BI model; DirectQuery leaves data in the source and queries it at runtime."
              },
              {
                topic: "Power BI interface and data loading",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To import a CSV file, choose ___ and then select Text/CSV.",
                options: ["New page", "Transform visual", "Get data", "Manage roles"],
                correctAnswer: "Get data",
                explanation: "Text/CSV is one of the connectors available from Get data."
              }
            ]
          },
          {
            topic: "Power Query cleaning",
            questions: [
              {
                topic: "Power Query cleaning",
                difficulty: "Easy",
                question: "What is Power Query mainly used for in Power BI?",
                options: ["Designing slide transitions", "Writing CSS styles", "Cleaning and transforming data before loading it", "Creating user passwords"],
                correctAnswer: "Cleaning and transforming data before loading it",
                explanation: "Power Query prepares data by removing errors, changing types, splitting columns, and applying other transformations."
              },
              {
                topic: "Power Query cleaning",
                difficulty: "Medium",
                question: "Which Power Query area records each transformation so it can run again on refresh?",
                options: ["Applied Steps", "Canvas Layers", "Visual Filters", "Relationship Cards"],
                correctAnswer: "Applied Steps",
                explanation: "Applied Steps stores the transformation sequence and replays it when the query refreshes."
              },
              {
                topic: "Power Query cleaning",
                difficulty: "Hard",
                question: "Why is it usually better to clean repeatable data issues in Power Query instead of manually editing cells?",
                options: ["Manual edits refresh automatically", "Power Query blocks all bad data forever", "Power Query transformations are reusable and refreshable", "Manual edits create relationships"],
                correctAnswer: "Power Query transformations are reusable and refreshable",
                explanation: "Power Query keeps cleaning logic as steps, making the process repeatable when new data arrives."
              },
              {
                topic: "Power Query cleaning",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: A customer name column has extra spaces around each name. Which Power Query transform is most suitable?",
                options: ["Unpivot", "Trim", "Merge queries", "Keep top rows"],
                correctAnswer: "Trim",
                explanation: "Trim removes leading and trailing spaces from text values."
              }
            ]
          },
          {
            topic: "Data modelling and relationships",
            questions: [
              {
                topic: "Data modelling and relationships",
                difficulty: "Easy",
                question: "What does a relationship do in a Power BI data model?",
                options: ["Changes the report background", "Deletes duplicate visuals", "Publishes the file online", "Links tables using matching key columns"],
                correctAnswer: "Links tables using matching key columns",
                explanation: "Relationships let filters and calculations work across connected tables."
              },
              {
                topic: "Data modelling and relationships",
                difficulty: "Medium",
                question: "Which example best describes a one-to-many relationship?",
                options: ["Many products each have many unrelated dates", "One customer row connects to many sales rows", "One chart connects to one color palette", "Every table has no key"],
                correctAnswer: "One customer row connects to many sales rows",
                explanation: "A customer table can contain one row per customer, while a sales table can contain many transactions for that customer."
              },
              {
                topic: "Data modelling and relationships",
                difficulty: "Hard",
                question: "Why is a star schema often useful in Power BI?",
                options: ["It removes all need for DAX", "It stores visuals inside tables", "It separates fact and dimension tables, making filtering and measures clearer", "It forces every relationship to be many-to-many"],
                correctAnswer: "It separates fact and dimension tables, making filtering and measures clearer",
                explanation: "A star schema keeps measurable events in fact tables and descriptive fields in dimension tables."
              },
              {
                topic: "Data modelling and relationships",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To relate Sales to Customers, Sales[CustomerID] should connect to Customers[___].",
                options: ["CustomerID", "ChartColor", "PageName", "MeasureTotal"],
                correctAnswer: "CustomerID",
                explanation: "Matching key columns connect the transaction table to the customer lookup table."
              }
            ]
          },
          {
            topic: "DAX basics",
            questions: [
              {
                topic: "DAX basics",
                difficulty: "Easy",
                question: "What is a DAX measure used for?",
                options: ["Changing imported file names only", "Calculating values dynamically in report context", "Deleting report pages", "Setting a dashboard password"],
                correctAnswer: "Calculating values dynamically in report context",
                explanation: "Measures calculate results such as totals, counts, and ratios based on the current filters."
              },
              {
                topic: "DAX basics",
                difficulty: "Medium",
                question: "Which DAX expression sums the Amount column in the Sales table?",
                options: ["COUNTROWS(Sales[Amount])", "SUMXONLY(Sales)", "SUM(Sales[Amount])", "TOTAL(Sales.Amount)"],
                correctAnswer: "SUM(Sales[Amount])",
                explanation: "SUM adds numeric values from a single column."
              },
              {
                topic: "DAX basics",
                difficulty: "Hard",
                question: "What does CALCULATE commonly do in DAX?",
                options: ["Changes or applies filter context for an expression", "Imports data from CSV files", "Creates a new visual theme", "Renames every column"],
                correctAnswer: "Changes or applies filter context for an expression",
                explanation: "CALCULATE evaluates an expression under modified filter conditions."
              },
              {
                topic: "DAX basics",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To count rows in a Customers table, use ___(Customers).",
                options: ["SUM", "COUNTROWS", "FILTERTEXT", "RELATE"],
                correctAnswer: "COUNTROWS",
                explanation: "COUNTROWS returns the number of rows in a table."
              }
            ]
          },
          {
            topic: "Visuals and dashboards",
            questions: [
              {
                topic: "Visuals and dashboards",
                difficulty: "Easy",
                question: "Which visual is usually best for showing sales over time?",
                options: ["Line chart", "Card visual only", "Table with no dates", "Map without locations"],
                correctAnswer: "Line chart",
                explanation: "Line charts are commonly used to show trends across dates or periods."
              },
              {
                topic: "Visuals and dashboards",
                difficulty: "Medium",
                question: "What is a good dashboard design principle?",
                options: ["Use every visual type on one page", "Hide all labels", "Keep key metrics clear and avoid clutter", "Use tiny text to fit more charts"],
                correctAnswer: "Keep key metrics clear and avoid clutter",
                explanation: "Dashboards should help users scan important information quickly."
              },
              {
                topic: "Visuals and dashboards",
                difficulty: "Hard",
                question: "What is filter context in Power BI?",
                options: ["The set of filters affecting a DAX calculation or visual", "The browser cache used by Power BI", "A list of imported file names", "A dashboard color palette only"],
                correctAnswer: "The set of filters affecting a DAX calculation or visual",
                explanation: "Filter context comes from slicers, relationships, visual filters, rows, columns, and DAX filters."
              },
              {
                topic: "Visuals and dashboards",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: You need users to filter the whole report by Region. Which Power BI element is most suitable?",
                options: ["Slicer", "New measure", "Data type", "Applied step"],
                correctAnswer: "Slicer",
                explanation: "Slicers give report users interactive filtering controls."
              }
            ]
          }
        ]
      },
      "cloud-fundamentals": {
        label: "Cloud Fundamentals",
        topics: [
          {
            topic: "Cloud computing basics",
            questions: [
              {
                topic: "Cloud computing basics",
                difficulty: "Easy",
                question: "What is cloud computing?",
                options: ["Only storing files on a laptop", "Using computing resources over the internet on demand", "Writing code without a computer", "Replacing all networks with spreadsheets"],
                correctAnswer: "Using computing resources over the internet on demand",
                explanation: "Cloud computing provides services such as compute, storage and databases over the internet when needed."
              },
              {
                topic: "Cloud computing basics",
                difficulty: "Medium",
                question: "Which option best describes IaaS?",
                options: ["A finished software application", "A charting library", "Virtual machines, storage and networking managed as infrastructure", "A single HTML page"],
                correctAnswer: "Virtual machines, storage and networking managed as infrastructure",
                explanation: "IaaS gives teams infrastructure building blocks such as virtual machines, disks and networks."
              },
              {
                topic: "Cloud computing basics",
                difficulty: "Hard",
                question: "What is the difference between a cloud region and an availability zone?",
                options: ["A region is a geographic area, while zones are isolated locations inside that region", "A zone is always larger than a region", "A region is only for billing and cannot run services", "They are two names for the same thing"],
                correctAnswer: "A region is a geographic area, while zones are isolated locations inside that region",
                explanation: "Regions are broad locations, and availability zones provide separate facilities for resilience inside a region."
              },
              {
                topic: "Cloud computing basics",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: A team wants to deploy an app without managing operating system patches. Which model is often a better fit?",
                options: ["IaaS only", "Local desktop only", "Manual hardware purchase", "PaaS"],
                correctAnswer: "PaaS",
                explanation: "PaaS abstracts more infrastructure management so teams can focus on application code."
              }
            ]
          },
          {
            topic: "Compute services",
            questions: [
              {
                topic: "Compute services",
                difficulty: "Easy",
                question: "What is a virtual machine in the cloud?",
                options: ["A spreadsheet formula", "A software-based server running on cloud infrastructure", "A static image file", "A database table key"],
                correctAnswer: "A software-based server running on cloud infrastructure",
                explanation: "Virtual machines provide server-like compute capacity without owning physical hardware."
              },
              {
                topic: "Compute services",
                difficulty: "Medium",
                question: "Why might a team use auto scaling for compute services?",
                options: ["To adjust capacity based on demand", "To disable monitoring", "To make every server permanent", "To remove all network security"],
                correctAnswer: "To adjust capacity based on demand",
                explanation: "Auto scaling helps add or remove compute resources as traffic changes."
              },
              {
                topic: "Compute services",
                difficulty: "Hard",
                question: "What is one benefit of serverless compute?",
                options: ["It always costs the same as a large VM", "It requires manual server patching every hour", "It can run code without managing the underlying servers", "It cannot respond to events"],
                correctAnswer: "It can run code without managing the underlying servers",
                explanation: "Serverless platforms manage server provisioning and scaling while developers provide the function code."
              },
              {
                topic: "Compute services",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: A cloud ___ is commonly used when you need a configurable server with an operating system.",
                options: ["bucket", "virtual machine", "tag", "route table"],
                correctAnswer: "virtual machine",
                explanation: "A virtual machine gives you a configurable server environment in the cloud."
              }
            ]
          },
          {
            topic: "Storage services",
            questions: [
              {
                topic: "Storage services",
                difficulty: "Easy",
                question: "What is object storage commonly used for?",
                options: ["Storing files such as images, backups and logs", "Running CPU instructions directly", "Creating user passwords only", "Replacing all databases"],
                correctAnswer: "Storing files such as images, backups and logs",
                explanation: "Object storage is suited to storing unstructured files as objects with metadata."
              },
              {
                topic: "Storage services",
                difficulty: "Medium",
                question: "Which storage type is usually attached to a virtual machine like a disk?",
                options: ["Block storage", "Object storage only", "DNS storage", "IAM storage"],
                correctAnswer: "Block storage",
                explanation: "Block storage provides disk-like volumes that can be attached to compute instances."
              },
              {
                topic: "Storage services",
                difficulty: "Hard",
                question: "Why should lifecycle policies be used for cloud storage?",
                options: ["They help move or delete data over time to control cost and retention", "They make data impossible to delete", "They replace every database query", "They disable backups"],
                correctAnswer: "They help move or delete data over time to control cost and retention",
                explanation: "Lifecycle policies can archive or delete older objects according to business rules."
              },
              {
                topic: "Storage services",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: You need a low-cost place to store static website images. Which service type is usually best?",
                options: ["Virtual private network", "Object storage", "Compute autoscaling", "IAM role"],
                correctAnswer: "Object storage",
                explanation: "Object storage is commonly used for static assets because it is durable and cost-effective."
              }
            ]
          },
          {
            topic: "Networking basics",
            questions: [
              {
                topic: "Networking basics",
                difficulty: "Easy",
                question: "What is a VPC or virtual private cloud?",
                options: ["A private network space for cloud resources", "A password manager only", "A code editor", "A spreadsheet template"],
                correctAnswer: "A private network space for cloud resources",
                explanation: "A VPC lets you define networking boundaries for cloud resources."
              },
              {
                topic: "Networking basics",
                difficulty: "Medium",
                question: "What is the purpose of a firewall or security group rule?",
                options: ["To control allowed network traffic", "To increase file font size", "To create database rows", "To rename cloud regions"],
                correctAnswer: "To control allowed network traffic",
                explanation: "Firewall rules control which traffic can reach resources based on ports, protocols and sources."
              },
              {
                topic: "Networking basics",
                difficulty: "Hard",
                question: "Why might public and private subnets be separated?",
                options: ["To keep internal resources away from direct internet access", "To make every server public", "To remove the need for routing", "To stop applications from using databases"],
                correctAnswer: "To keep internal resources away from direct internet access",
                explanation: "Private subnets help protect internal services such as databases from direct public exposure."
              },
              {
                topic: "Networking basics",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: HTTP traffic usually uses port ___.",
                options: ["22", "80", "4430", "3306"],
                correctAnswer: "80",
                explanation: "HTTP commonly uses port 80, while HTTPS commonly uses port 443."
              }
            ]
          },
          {
            topic: "IAM and security basics",
            questions: [
              {
                topic: "IAM and security basics",
                difficulty: "Easy",
                question: "What does IAM help manage?",
                options: ["Charts and dashboards only", "Users, roles, permissions and access policies", "Only server CPU speed", "HTML page structure"],
                correctAnswer: "Users, roles, permissions and access policies",
                explanation: "IAM controls who can access cloud resources and what actions they can perform."
              },
              {
                topic: "IAM and security basics",
                difficulty: "Medium",
                question: "What does least privilege mean?",
                options: ["Give every user admin access", "Give only the permissions needed for the task", "Disable all logging", "Avoid using roles"],
                correctAnswer: "Give only the permissions needed for the task",
                explanation: "Least privilege reduces risk by limiting access to what is necessary."
              },
              {
                topic: "IAM and security basics",
                difficulty: "Hard",
                question: "Why are IAM roles often preferred over hardcoded access keys on servers?",
                options: ["Roles can provide managed temporary credentials without storing secrets in code", "Roles remove all security checks", "Roles only work for public buckets", "Hardcoded keys rotate automatically"],
                correctAnswer: "Roles can provide managed temporary credentials without storing secrets in code",
                explanation: "IAM roles reduce secret exposure and can issue temporary credentials to trusted resources."
              },
              {
                topic: "IAM and security basics",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: A developer only needs to read objects from one storage bucket. What permission approach is safest?",
                options: ["Grant full administrator access", "Grant read access only to that bucket", "Share the root account", "Disable audit logs"],
                correctAnswer: "Grant read access only to that bucket",
                explanation: "The safest approach is least privilege: only the required read permission for the specific bucket."
              }
            ]
          }
        ]
      },
      linux: {
        label: "Linux",
        topics: [
          {
            topic: "File system navigation",
            questions: [
              {
                topic: "File system navigation",
                difficulty: "Easy",
                question: "Which command prints the current working directory?",
                options: ["ls", "pwd", "cd", "mkdir"],
                correctAnswer: "pwd",
                explanation: "pwd shows the full path of the directory you are currently in."
              },
              {
                topic: "File system navigation",
                difficulty: "Medium",
                question: "What does cd .. do?",
                options: ["Moves to the parent directory", "Lists hidden files", "Deletes the current directory", "Prints the file contents"],
                correctAnswer: "Moves to the parent directory",
                explanation: "The .. path refers to the parent directory."
              },
              {
                topic: "File system navigation",
                difficulty: "Hard",
                question: "Which path is absolute?",
                options: ["../logs/app.log", "./app.log", "logs/app.log", "/var/log/app.log"],
                correctAnswer: "/var/log/app.log",
                explanation: "An absolute path starts from the root directory, represented by /."
              },
              {
                topic: "File system navigation",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To list files including hidden files, use ls ___.",
                options: ["-a", "-d", "-x", "-run"],
                correctAnswer: "-a",
                explanation: "ls -a includes files whose names start with a dot."
              }
            ]
          },
          {
            topic: "File permissions",
            questions: [
              {
                topic: "File permissions",
                difficulty: "Easy",
                question: "Which command changes file permissions?",
                options: ["chmod", "chdir", "ps", "grep"],
                correctAnswer: "chmod",
                explanation: "chmod changes read, write and execute permissions on files or directories."
              },
              {
                topic: "File permissions",
                difficulty: "Medium",
                question: "What does the x permission allow on a script file?",
                options: ["Reading the file only", "Editing the file owner only", "Executing the file as a program", "Compressing the file"],
                correctAnswer: "Executing the file as a program",
                explanation: "The execute bit allows a script or binary to be run."
              },
              {
                topic: "File permissions",
                difficulty: "Hard",
                question: "What does chmod 600 secrets.txt usually mean?",
                options: ["Owner can read/write; group and others have no permissions", "Everyone can read and write", "Only others can execute", "The file is deleted after 600 seconds"],
                correctAnswer: "Owner can read/write; group and others have no permissions",
                explanation: "In numeric permissions, 6 is read plus write for the owner, and 0 gives no permissions to group and others."
              },
              {
                topic: "File permissions",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: A deployment script cannot run because permission is denied. What permission is likely missing?",
                options: ["write", "execute", "read", "hidden"],
                correctAnswer: "execute",
                explanation: "Scripts need execute permission to run directly."
              }
            ]
          },
          {
            topic: "Process management",
            questions: [
              {
                topic: "Process management",
                difficulty: "Easy",
                question: "Which command can list running processes?",
                options: ["ps", "pwd", "cd", "touch"],
                correctAnswer: "ps",
                explanation: "ps displays information about running processes."
              },
              {
                topic: "Process management",
                difficulty: "Medium",
                question: "What is top commonly used for?",
                options: ["Viewing live process and resource usage", "Changing file permissions", "Creating directories", "Installing packages only"],
                correctAnswer: "Viewing live process and resource usage",
                explanation: "top shows live CPU, memory and process information."
              },
              {
                topic: "Process management",
                difficulty: "Hard",
                question: "Why should kill -9 be used carefully?",
                options: ["It forcefully terminates a process without graceful cleanup", "It only lists processes", "It changes file owners", "It installs missing software"],
                correctAnswer: "It forcefully terminates a process without graceful cleanup",
                explanation: "SIGKILL cannot be caught by the process, so it may skip cleanup steps."
              },
              {
                topic: "Process management",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To stop a process by process ID, use kill ___.",
                options: ["PID", "PWD", "PATH", "HOME"],
                correctAnswer: "PID",
                explanation: "kill sends a signal to the process identified by its PID."
              }
            ]
          },
          {
            topic: "Package and service management",
            questions: [
              {
                topic: "Package and service management",
                difficulty: "Easy",
                question: "What is a package manager used for?",
                options: ["Installing and updating software packages", "Changing monitor brightness", "Writing database rows", "Creating Git branches"],
                correctAnswer: "Installing and updating software packages",
                explanation: "Package managers such as apt or yum install, update and remove software."
              },
              {
                topic: "Package and service management",
                difficulty: "Medium",
                question: "Which command checks the status of a systemd service?",
                options: ["systemctl status service-name", "cd status service-name", "chmod status service-name", "git status service-name"],
                correctAnswer: "systemctl status service-name",
                explanation: "systemctl status shows whether a systemd-managed service is running and recent log lines."
              },
              {
                topic: "Package and service management",
                difficulty: "Hard",
                question: "Why should logs be checked when a Linux service fails to start?",
                options: ["Logs often show the error that caused the service failure", "Logs automatically fix packages", "Logs remove bad permissions", "Logs replace the service file"],
                correctAnswer: "Logs often show the error that caused the service failure",
                explanation: "Service logs can reveal missing files, permission errors, port conflicts or configuration problems."
              },
              {
                topic: "Package and service management",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: You changed a service config and need to restart it. Which command pattern is commonly used?",
                options: ["systemctl restart service-name", "pwd restart service-name", "ls restart service-name", "chmod restart service-name"],
                correctAnswer: "systemctl restart service-name",
                explanation: "systemctl restart stops and starts a systemd service again."
              }
            ]
          },
          {
            topic: "Shell scripting basics",
            questions: [
              {
                topic: "Shell scripting basics",
                difficulty: "Easy",
                question: "What is a shell script?",
                options: ["A file containing shell commands that can be run together", "A database index", "A cloud region", "A spreadsheet chart"],
                correctAnswer: "A file containing shell commands that can be run together",
                explanation: "Shell scripts automate command-line tasks by running commands from a file."
              },
              {
                topic: "Shell scripting basics",
                difficulty: "Medium",
                question: "What does a shebang such as #!/bin/bash do?",
                options: ["Tells the system which interpreter should run the script", "Deletes comments", "Creates a new user", "Lists all processes"],
                correctAnswer: "Tells the system which interpreter should run the script",
                explanation: "The shebang points to the interpreter used to execute the script."
              },
              {
                topic: "Shell scripting basics",
                difficulty: "Hard",
                question: "Why should variables in shell scripts often be quoted, such as \"$filename\"?",
                options: ["To handle spaces and avoid unwanted word splitting", "To make every command faster", "To disable permissions", "To force the script to run as root"],
                correctAnswer: "To handle spaces and avoid unwanted word splitting",
                explanation: "Quoting variables helps preserve values that contain spaces or special characters."
              },
              {
                topic: "Shell scripting basics",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: In bash, assign a variable with name=___, without spaces around the equals sign.",
                options: ["value", "$value", "echo value", "var value"],
                correctAnswer: "value",
                explanation: "Bash variable assignment uses name=value with no spaces around the equals sign."
              }
            ]
          }
        ]
      },
      git: {
        label: "Git",
        topics: [
          {
            topic: "Git basics",
            questions: [
              {
                topic: "Git basics",
                difficulty: "Easy",
                question: "What does git init do?",
                options: ["Creates a new Git repository in the current project", "Deletes all branches", "Uploads code to GitHub automatically", "Formats JavaScript files"],
                correctAnswer: "Creates a new Git repository in the current project",
                explanation: "git init creates the repository metadata needed for Git to track changes."
              },
              {
                topic: "Git basics",
                difficulty: "Medium",
                question: "Which command shows changed files and staging status?",
                options: ["git status", "git delete", "git cloud", "git package"],
                correctAnswer: "git status",
                explanation: "git status reports modified, staged and untracked files."
              },
              {
                topic: "Git basics",
                difficulty: "Hard",
                question: "Why is Git useful for infrastructure or application projects?",
                options: ["It tracks changes so teams can review, revert and collaborate safely", "It replaces all testing", "It automatically fixes security issues", "It runs cloud servers without code"],
                correctAnswer: "It tracks changes so teams can review, revert and collaborate safely",
                explanation: "Git provides version history and collaboration workflows for code and configuration."
              },
              {
                topic: "Git basics",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To start tracking a changed file before committing, use git ___.",
                options: ["push", "add", "merge", "remote"],
                correctAnswer: "add",
                explanation: "git add stages changes so they can be included in the next commit."
              }
            ]
          },
          {
            topic: "Branching",
            questions: [
              {
                topic: "Branching",
                difficulty: "Easy",
                question: "What is a Git branch?",
                options: ["A separate line of development", "A database password", "A cloud storage bucket", "A CSS selector"],
                correctAnswer: "A separate line of development",
                explanation: "Branches let you work on changes without directly modifying another branch."
              },
              {
                topic: "Branching",
                difficulty: "Medium",
                question: "Which command creates and switches to a new branch in modern Git?",
                options: ["git branch-only feature", "git switch -c feature", "git push -c feature", "git status -c feature"],
                correctAnswer: "git switch -c feature",
                explanation: "git switch -c creates a new branch and switches to it."
              },
              {
                topic: "Branching",
                difficulty: "Hard",
                question: "Why create a feature branch before making a risky change?",
                options: ["It isolates work until it is ready to merge", "It deletes the main branch", "It makes conflicts impossible", "It uploads secrets automatically"],
                correctAnswer: "It isolates work until it is ready to merge",
                explanation: "Feature branches let you develop and review work before integrating it."
              },
              {
                topic: "Branching",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: You need to move from main to an existing branch called fix-login. Which command is suitable?",
                options: ["git switch fix-login", "git init fix-login", "git commit fix-login", "git remote fix-login"],
                correctAnswer: "git switch fix-login",
                explanation: "git switch moves your working tree to another existing branch."
              }
            ]
          },
          {
            topic: "Commit workflow",
            questions: [
              {
                topic: "Commit workflow",
                difficulty: "Easy",
                question: "What is a commit?",
                options: ["A saved snapshot of staged changes", "A running Linux process", "A cloud firewall rule", "A spreadsheet formula"],
                correctAnswer: "A saved snapshot of staged changes",
                explanation: "A commit records the staged changes in the repository history."
              },
              {
                topic: "Commit workflow",
                difficulty: "Medium",
                question: "What is the correct basic workflow for saving changes?",
                options: ["git add, then git commit", "git commit, then git init every time", "git push, then git add only", "git merge, then git status only"],
                correctAnswer: "git add, then git commit",
                explanation: "Changes are staged with git add and then saved to history with git commit."
              },
              {
                topic: "Commit workflow",
                difficulty: "Hard",
                question: "Why are small focused commits useful?",
                options: ["They make review, debugging and rollback easier", "They hide changes from teammates", "They prevent all merge conflicts", "They remove the need for messages"],
                correctAnswer: "They make review, debugging and rollback easier",
                explanation: "Focused commits make history easier to understand and specific changes easier to revert."
              },
              {
                topic: "Commit workflow",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: To create a commit with a message, use git commit -m \"___\".",
                options: ["message text", "branch name only", "remote URL only", "file permission"],
                correctAnswer: "message text",
                explanation: "The -m flag supplies a commit message describing the change."
              }
            ]
          },
          {
            topic: "Merge and conflict basics",
            questions: [
              {
                topic: "Merge and conflict basics",
                difficulty: "Easy",
                question: "What does merging do in Git?",
                options: ["Combines changes from one branch into another", "Deletes every commit", "Installs project dependencies", "Creates a cloud account"],
                correctAnswer: "Combines changes from one branch into another",
                explanation: "A merge integrates changes from another branch into the current branch."
              },
              {
                topic: "Merge and conflict basics",
                difficulty: "Medium",
                question: "When can a merge conflict happen?",
                options: ["When Git cannot automatically combine changes to the same lines", "Only when no files changed", "When a branch has no commits", "When a file is read successfully"],
                correctAnswer: "When Git cannot automatically combine changes to the same lines",
                explanation: "Conflicts happen when competing edits need a human decision."
              },
              {
                topic: "Merge and conflict basics",
                difficulty: "Hard",
                question: "What is the correct high-level way to resolve a merge conflict?",
                options: ["Edit the conflicted file, choose the correct content, stage it and commit", "Delete the repository immediately", "Ignore conflict markers and push", "Run git init again"],
                correctAnswer: "Edit the conflicted file, choose the correct content, stage it and commit",
                explanation: "Resolving conflicts means deciding the final content and committing that resolution."
              },
              {
                topic: "Merge and conflict basics",
                difficulty: "Scenario or Fill Gap",
                question: "Fill the gap: Conflict markers often include <<<<<<<, ======= and ___.",
                options: [">>>>>>>", "///////", "COMMIT", "REMOTE_ONLY"],
                correctAnswer: ">>>>>>>",
                explanation: "Git uses these markers to show the conflicting sections that must be resolved."
              }
            ]
          },
          {
            topic: "Remote repositories",
            questions: [
              {
                topic: "Remote repositories",
                difficulty: "Easy",
                question: "What is a remote repository?",
                options: ["A shared repository hosted outside your local machine", "A Linux file permission", "A cloud CPU type", "A JavaScript variable"],
                correctAnswer: "A shared repository hosted outside your local machine",
                explanation: "Remote repositories, such as GitHub repos, let teams share and sync work."
              },
              {
                topic: "Remote repositories",
                difficulty: "Medium",
                question: "Which command sends local commits to a remote repository?",
                options: ["git status", "git push", "git init", "git add"],
                correctAnswer: "git push",
                explanation: "git push uploads local commits to the configured remote branch."
              },
              {
                topic: "Remote repositories",
                difficulty: "Hard",
                question: "What does git pull usually do?",
                options: ["Fetches remote changes and integrates them into the current branch", "Deletes the remote repository", "Only stages local files", "Creates a new cloud server"],
                correctAnswer: "Fetches remote changes and integrates them into the current branch",
                explanation: "git pull is commonly equivalent to fetching remote commits and merging or rebasing them locally."
              },
              {
                topic: "Remote repositories",
                difficulty: "Scenario or Fill Gap",
                question: "Scenario: You cloned a GitHub repo and need to see its remote URL. Which command helps?",
                options: ["git remote -v", "git commit -v", "git chmod -v", "git service -v"],
                correctAnswer: "git remote -v",
                explanation: "git remote -v lists configured remotes and their fetch/push URLs."
              }
            ]
          }
        ]
      }
    }
  };
})();
