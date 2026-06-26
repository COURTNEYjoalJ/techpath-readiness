(function () {
  window.careerGuideData = {
    version: 1,
    countries: {
      uk: { label: "UK" },
      usa: { label: "USA" },
      canada: { label: "Canada" },
      germany: { label: "Germany" },
      netherlands: { label: "Netherlands" },
      australia: { label: "Australia" }
    },
    roles: {
      "data-scientist": {
        label: "Data Scientist",
        totalWeight: 100,
        skills: [
          {
            name: "Python",
            weight: 20,
            requiredTopics: ["Python syntax", "pandas", "NumPy", "data cleaning", "notebooks"],
            reason: "Python is the main tool for data preparation, analysis, modelling and experimentation."
          },
          {
            name: "Statistics",
            weight: 20,
            requiredTopics: ["Probability", "hypothesis testing", "distributions", "sampling", "confidence intervals"],
            reason: "Statistics helps you judge whether patterns are reliable and make data-driven decisions."
          },
          {
            name: "SQL",
            weight: 15,
            requiredTopics: ["SELECT queries", "joins", "aggregations", "subqueries", "data filtering"],
            reason: "SQL is needed to retrieve, combine and inspect data from databases before modelling."
          },
          {
            name: "Machine Learning",
            weight: 20,
            requiredTopics: ["Supervised learning", "model evaluation", "feature engineering", "classification", "regression"],
            reason: "Machine learning turns data into predictive models and practical decision systems."
          },
          {
            name: "Maths",
            weight: 15,
            requiredTopics: ["Linear algebra", "calculus basics", "vectors", "matrices", "optimization"],
            reason: "Maths supports deeper understanding of algorithms, model behaviour and performance tradeoffs."
          },
          {
            name: "Communication",
            weight: 10,
            requiredTopics: ["Storytelling", "visual explanation", "stakeholder updates", "clear recommendations"],
            reason: "Communication helps turn complex analysis into decisions that teams can understand and use."
          }
        ]
      },
      "data-analyst": {
        label: "Data Analyst",
        totalWeight: 100,
        skills: [
          {
            name: "Excel",
            weight: 20,
            requiredTopics: ["Formulas", "pivot tables", "lookup functions", "charts", "data cleaning"],
            reason: "Excel is still widely used for quick analysis, reporting and business data checks."
          },
          {
            name: "SQL",
            weight: 20,
            requiredTopics: ["SELECT queries", "joins", "GROUP BY", "filters", "aggregations"],
            reason: "SQL lets analysts pull accurate data from databases and answer business questions directly."
          },
          {
            name: "Power BI",
            weight: 20,
            requiredTopics: ["Data modelling", "DAX basics", "dashboard design", "Power Query", "visuals"],
            reason: "Power BI helps analysts build dashboards that make trends and metrics easy to track."
          },
          {
            name: "Statistics",
            weight: 15,
            requiredTopics: ["Averages", "variation", "correlation", "sampling", "basic significance"],
            reason: "Statistics helps analysts interpret results correctly and avoid misleading conclusions."
          },
          {
            name: "Python",
            weight: 15,
            requiredTopics: ["Python basics", "pandas", "CSV files", "data cleaning", "simple charts"],
            reason: "Python is useful for repeatable analysis, larger datasets and automating manual reporting tasks."
          },
          {
            name: "Communication",
            weight: 10,
            requiredTopics: ["Business writing", "presentation", "dashboard notes", "clear recommendations"],
            reason: "Communication turns findings into practical next steps for managers, clients and teams."
          }
        ]
      }
    }
  };
})();
