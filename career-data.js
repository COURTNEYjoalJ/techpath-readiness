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
            requiredTopics: ["Explaining insights", "Business understanding", "Data storytelling", "Stakeholder communication", "Presentation basics"],
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
            requiredTopics: ["Explaining insights", "Business understanding", "Data storytelling", "Stakeholder communication", "Presentation basics"],
            reason: "Communication turns findings into practical next steps for managers, clients and teams."
          }
        ]
      },
      "cloud-engineer": {
        label: "Cloud Engineer",
        totalWeight: 100,
        skills: [
          {
            name: "Cloud Fundamentals",
            weight: 30,
            requiredTopics: ["Cloud computing basics", "compute services", "storage services", "networking basics", "IAM and security basics"],
            reason: "Cloud fundamentals help you understand how modern infrastructure is built, secured and scaled."
          },
          {
            name: "Linux",
            weight: 20,
            requiredTopics: ["File system navigation", "file permissions", "process management", "package and service management", "shell scripting basics"],
            reason: "Linux is widely used on cloud servers, containers and automation environments."
          },
          {
            name: "Git",
            weight: 15,
            requiredTopics: ["Git basics", "branching", "commit workflow", "merge and conflict basics", "remote repositories"],
            reason: "Git supports safe version control for infrastructure code, scripts and deployment workflows."
          },
          {
            name: "Python",
            weight: 15,
            requiredTopics: ["Python syntax", "automation scripts", "files", "APIs", "basic debugging"],
            reason: "Python is useful for automation, cloud tooling and operational scripts."
          },
          {
            name: "SQL",
            weight: 10,
            requiredTopics: ["SELECT queries", "filters", "joins", "aggregations", "database basics"],
            reason: "SQL helps cloud engineers inspect application data, logs and managed database systems."
          },
          {
            name: "Communication",
            weight: 10,
            requiredTopics: ["Explaining insights", "Business understanding", "Data storytelling", "Stakeholder communication", "Presentation basics"],
            reason: "Communication helps cloud engineers explain incidents, tradeoffs and infrastructure decisions clearly."
          }
        ]
      },
      "frontend-developer": {
        label: "Frontend Developer",
        totalWeight: 100,
        skills: [
          {
            name: "HTML",
            weight: 20,
            requiredTopics: ["HTML document structure", "semantic elements", "forms and inputs", "links and media", "accessibility basics"],
            reason: "HTML defines the structure and meaning of web pages, forms, links and content."
          },
          {
            name: "CSS",
            weight: 20,
            requiredTopics: ["Selectors and specificity", "box model", "Flexbox", "Grid layout", "responsive design"],
            reason: "CSS controls layout, spacing, visual hierarchy and responsive presentation across screen sizes."
          },
          {
            name: "JavaScript",
            weight: 30,
            requiredTopics: ["Variables and data types", "functions", "arrays and objects", "DOM and events", "control flow and debugging"],
            reason: "JavaScript powers interactivity, browser behavior, dynamic interfaces and frontend application logic."
          },
          {
            name: "Git",
            weight: 10,
            requiredTopics: ["Git basics", "branching", "commit workflow", "merge and conflict basics", "remote repositories"],
            reason: "Git helps frontend developers manage changes, collaborate safely and publish projects."
          },
          {
            name: "API Basics",
            weight: 10,
            requiredTopics: ["REST API basics", "HTTP methods", "status codes", "JSON payloads", "API testing and debugging"],
            reason: "API basics help frontend developers connect interfaces to real data and backend services."
          },
          {
            name: "Communication",
            weight: 10,
            requiredTopics: ["Explaining insights", "Business understanding", "Data storytelling", "Stakeholder communication", "Presentation basics"],
            reason: "Communication helps developers explain design choices, requirements and tradeoffs clearly."
          }
        ]
      },
      "backend-developer": {
        label: "Backend Developer",
        totalWeight: 100,
        skills: [
          {
            name: "Backend Basics",
            weight: 25,
            requiredTopics: ["Server-side programming", "Request and response", "Authentication basics", "CRUD operations", "Error handling and validation"],
            reason: "Backend basics help developers build server logic, process requests and protect application workflows."
          },
          {
            name: "API Basics",
            weight: 20,
            requiredTopics: ["REST API basics", "HTTP methods", "status codes", "JSON payloads", "API testing and debugging"],
            reason: "API basics help backend developers design endpoints that clients can call reliably."
          },
          {
            name: "Databases",
            weight: 20,
            requiredTopics: ["Relational database basics", "Tables and keys", "SQL CRUD operations", "Indexes and performance basics", "Database design basics"],
            reason: "Databases store application data and support reliable reads, writes and relationships."
          },
          {
            name: "Git",
            weight: 10,
            requiredTopics: ["Git basics", "branching", "commit workflow", "merge and conflict basics", "remote repositories"],
            reason: "Git helps backend developers manage code changes, collaborate safely and review server-side work."
          },
          {
            name: "Python",
            weight: 15,
            requiredTopics: ["Python syntax", "automation scripts", "files", "APIs", "basic debugging"],
            reason: "Python is useful for backend scripting, web services, automation and debugging."
          },
          {
            name: "Communication",
            weight: 10,
            requiredTopics: ["Explaining insights", "Business understanding", "Data storytelling", "Stakeholder communication", "Presentation basics"],
            reason: "Communication helps backend developers explain APIs, tradeoffs, bugs and implementation decisions clearly."
          }
        ]
      }
    }
  };
})();
