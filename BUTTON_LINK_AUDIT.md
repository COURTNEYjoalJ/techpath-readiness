# Button and Link Audit

Scope: root-level HTML files, including visible `<a>` links and `<button>` controls. The Google verification token file is excluded because it is not a normal page.

## Summary

- Total controls found: 510
- Type counts: External link: 13, Google Form: 12, Internal page: 218, JavaScript action: 26, Section anchor: 241
- Main repeated destination groups:
  - Internal: Home: 58
  - Internal: Other: 51
  - Internal: Career Path Guide: 42
  - JavaScript action: 26
  - Internal: Contact: 25
  - Internal: Business / Beta Services: 12
  - External: LinkedIn: 11
  - Form: Beta Enquiry: 9
  - Internal: GCSE Starter Quiz: 9
  - Internal: JavaScript Learning: 7
  - Internal: Career Guidance: 6
  - Section: #top: 6
  - Section: #learning-order: 5
  - Internal: Python Learning: 5
  - Section: #supported-paths: 4
  - Form: Beta Feedback: 3
  - Section: #css-final-project: 3
  - Section: #html-final-project: 3
  - Internal: Readiness Dashboard: 3
  - Section: #java-final-project: 3
  - Section: #javascript-final-project: 3
  - Section: #python-final-project: 3
  - Section: #sql-final-project: 3
  - External: GitHub Issues: 2
  - Section: #what-is-css: 2
  - Section: #css-syntax-selectors: 2
  - Section: #css-colours-backgrounds: 2
  - Section: #css-typography: 2
  - Section: #css-box-model: 2
  - Section: #css-display-flex: 2
  - Section: #css-grid: 2
  - Section: #css-hover-responsive: 2
  - Section: #css-animations: 2
  - Section: #what-is-html: 2
  - Section: #html-document-structure: 2
  - Section: #html-headings-paragraphs: 2
  - Section: #html-links-images: 2
  - Section: #html-lists: 2
  - Section: #html-semantic: 2
  - Section: #html-tables: 2
  - Section: #html-forms-accessibility: 2
  - Section: #html-seo: 2
  - Section: Languages / Lessons Directory: 2
  - Section: #what-is-java: 2
  - Section: #java-program-structure: 2
  - Section: #java-variables-data-types: 2
  - Section: #java-operators: 2
  - Section: #java-conditions: 2
  - Section: #java-loops: 2
  - Section: #java-arrays: 2
  - Section: #java-methods: 2
  - Section: #java-objects-input: 2
  - Section: #what-is-javascript: 2
  - Section: #js-variables-data-types: 2
  - Section: #js-operators-expressions: 2
  - Section: #js-conditions: 2
  - Section: #js-loops: 2
  - Section: #js-arrays: 2
  - Section: #js-functions: 2
  - Section: #js-objects: 2
  - Section: #js-dom-events-storage: 2
  - Section: #what-is-python: 2
  - Section: #variables-data-types: 2
  - Section: #operators-expressions: 2
  - Section: #conditions: 2
  - Section: #loops: 2
  - Section: #lists: 2
  - Section: #functions: 2
  - Section: #dictionaries: 2
  - Section: #files-csv-basics: 2
  - Section: #what-is-sql: 2
  - Section: #sql-tables: 2
  - Section: #sql-select: 2
  - Section: #sql-where: 2
  - Section: #sql-order-limit: 2
  - Section: #sql-aggregates: 2
  - Section: #sql-group-having: 2
  - Section: #sql-join-case: 2
  - Section: #sql-reporting-query: 2

## Suspicious Or Review Items

- Duplicate label with different destinations: 10 Final mini project -> #css-final-project, #html-final-project, #java-final-project, #javascript-final-project, #python-final-project, #sql-final-project
- Duplicate label with different destinations: 2 Variables and data types -> #js-variables-data-types, #variables-data-types
- Duplicate label with different destinations: 3 Operators and expressions -> #js-operators-expressions, #operators-expressions
- Duplicate label with different destinations: 4 Conditions -> #conditions, #js-conditions
- Duplicate label with different destinations: 5 Loops -> #js-loops, #loops
- Duplicate label with different destinations: 7 Functions -> #functions, #js-functions
- Duplicate label with different destinations: Accessing values -> #python-accessing-dictionary-values, #python-accessing-list-values
- Duplicate label with different destinations: Arrays -> #java-arrays, #js-arrays
- Duplicate label with different destinations: Conditions -> #conditions, #java-conditions, #js-conditions
- Duplicate label with different destinations: Final Project -> #css-final-project, #html-final-project, #java-final-project, #javascript-final-project, #python-final-project, #sql-final-project
- Duplicate label with different destinations: Final mini project -> #css-final-project, #html-final-project, #java-final-project, #javascript-final-project, #python-final-project, #sql-final-project
- Duplicate label with different destinations: Functions -> #functions, #js-functions
- Duplicate label with different destinations: Lists -> #html-lists, #lists
- Duplicate label with different destinations: Loops -> #java-loops, #js-loops, #loops
- Duplicate label with different destinations: Operators and expressions -> #js-operators-expressions, #operators-expressions
- Duplicate label with different destinations: Start Learning -> #css-lessons, #html-lessons, #java-lessons, #javascript-lessons, #python-lessons, #sql-lessons
- Duplicate label with different destinations: Variables and data types -> #java-variables-data-types, #js-variables-data-types, #variables-data-types

## Full Audit Table

| Page/File | Button/Text | Destination href | Type | Opens new tab? | Duplicate destination group | Notes |
|---|---|---|---|---|---|---|
| about.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| about.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| about.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| about.html | Explore Career Guidance | career-guidance.html | Internal page | No | Internal: Career Guidance | CTA/control styling |
| about.html | Connect on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| about.html | Open Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| about.html | About | about.html | Internal page | No | Internal: Other | - |
| about.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| about.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| backend-developer-roadmap.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| backend-developer-roadmap.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| backend-developer-roadmap.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| backend-developer-roadmap.html | Start Readiness Test | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| backend-developer-roadmap.html | View Learning Order | #learning-order | Section anchor | No | Section: #learning-order | CTA/control styling |
| backend-developer-roadmap.html | Open Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| backend-developer-roadmap.html | About | about.html | Internal page | No | Internal: Other | - |
| backend-developer-roadmap.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| backend-developer-roadmap.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| business.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| business.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| business.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| business.html | Guidance | career-guidance.html | Internal page | No | Internal: Career Guidance | CTA/control styling |
| business.html | Contact | contact.html | Internal page | No | Internal: Contact | CTA/control styling |
| business.html | View Packages | #packages | Section anchor | No | Section: #packages | CTA/control styling |
| business.html | Start Your Beta Enquiry | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| business.html | Enquire for Beta Support | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| business.html | Connect on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| business.html | Share Beta Feedback | https://forms.gle/xrMJ34xdYVZ6ED4P7 | Google Form | Yes | Form: Beta Feedback | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| business.html | Request TechPathReady Support | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| business.html | Contact TechPathReady | contact.html | Internal page | No | Internal: Contact | CTA/control styling |
| business.html | Connect on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| business.html | About | about.html | Internal page | No | Internal: Other | - |
| business.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| business.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| business.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
| career-guidance.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| career-guidance.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| career-guidance.html | GCSE + Python | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | CTA/control styling; Intentional repeated destination |
| career-guidance.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| career-guidance.html | Message on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| career-guidance.html | View Guidance Areas | #guidance-areas | Section anchor | No | Section: #guidance-areas | CTA/control styling |
| career-guidance.html | Start Your Beta Enquiry | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| career-guidance.html | Message on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| career-guidance.html | About | about.html | Internal page | No | Internal: Other | - |
| career-guidance.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| career-guidance.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| career-path-guide.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| career-path-guide.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| career-path-guide.html | Select country v | [button action] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Select country | [button: data-value=] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | UK | [button: data-value=uk] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | USA | [button: data-value=usa] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Canada | [button: data-value=canada] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Germany | [button: data-value=germany] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Netherlands | [button: data-value=netherlands] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Australia | [button: data-value=australia] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Select career role v | [button action] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Select career role | [button: data-value=] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Data Scientist | [button: data-value=data-scientist] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Data Analyst | [button: data-value=data-analyst] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Cloud Engineer | [button: data-value=cloud-engineer] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Frontend Developer | [button: data-value=frontend-developer] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| career-path-guide.html | Backend Developer | [button: data-value=backend-developer] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| cloud-engineer-roadmap.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| cloud-engineer-roadmap.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| cloud-engineer-roadmap.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| cloud-engineer-roadmap.html | Start Readiness Test | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| cloud-engineer-roadmap.html | View Learning Order | #learning-order | Section anchor | No | Section: #learning-order | CTA/control styling |
| cloud-engineer-roadmap.html | Open Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| cloud-engineer-roadmap.html | About | about.html | Internal page | No | Internal: Other | - |
| cloud-engineer-roadmap.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| cloud-engineer-roadmap.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| contact.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| contact.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| contact.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| contact.html | Start Your Beta Enquiry | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| contact.html | Share Feedback | https://forms.gle/xrMJ34xdYVZ6ED4P7 | Google Form | Yes | Form: Beta Feedback | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| contact.html | Open GitHub Issues | https://github.com/COURTNEYjoalJ/techpath-readiness/issues | External link | Yes | External: GitHub Issues | CTA/control styling |
| contact.html | Explore Career Guidance | career-guidance.html | Internal page | No | Internal: Career Guidance | CTA/control styling |
| contact.html | Message on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| contact.html | About | about.html | Internal page | No | Internal: Other | - |
| contact.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| contact.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| css-learning.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| css-learning.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| css-learning.html | HTML | html-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| css-learning.html | JavaScript | javascript-learning.html | Internal page | No | Internal: JavaScript Learning | CTA/control styling |
| css-learning.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| css-learning.html | Home | index.html | Internal page | No | Internal: Home | - |
| css-learning.html | Build the Skills | index.html#languages | Internal page | No | Internal: Home | - |
| css-learning.html | Start Learning | #css-lessons | Section anchor | No | Section: #css-lessons | CTA/control styling |
| css-learning.html | Final Project | #css-final-project | Section anchor | No | Section: #css-final-project | CTA/control styling |
| css-learning.html | Back to Home | index.html#languages | Internal page | No | Internal: Home | CTA/control styling |
| css-learning.html | 0 Top | #top | Section anchor | No | Section: #top | - |
| css-learning.html | 1 What is CSS? | #what-is-css | Section anchor | No | Section: #what-is-css | - |
| css-learning.html | Style layer | #css-style-layer | Section anchor | No | Section: #css-style-layer | - |
| css-learning.html | Rules | #css-rules | Section anchor | No | Section: #css-rules | - |
| css-learning.html | 2 Syntax and selectors | #css-syntax-selectors | Section anchor | No | Section: #css-syntax-selectors | - |
| css-learning.html | 3 Colours and backgrounds | #css-colours-backgrounds | Section anchor | No | Section: #css-colours-backgrounds | - |
| css-learning.html | 4 Typography | #css-typography | Section anchor | No | Section: #css-typography | - |
| css-learning.html | 5 Box model | #css-box-model | Section anchor | No | Section: #css-box-model | - |
| css-learning.html | 6 Display and flexbox | #css-display-flex | Section anchor | No | Section: #css-display-flex | - |
| css-learning.html | Display basics | #css-display-basics | Section anchor | No | Section: #css-display-basics | - |
| css-learning.html | Flexbox | #css-flexbox | Section anchor | No | Section: #css-flexbox | - |
| css-learning.html | 7 CSS Grid | #css-grid | Section anchor | No | Section: #css-grid | - |
| css-learning.html | 8 Hover and responsive design | #css-hover-responsive | Section anchor | No | Section: #css-hover-responsive | - |
| css-learning.html | Hover and focus | #css-hover-focus | Section anchor | No | Section: #css-hover-focus | - |
| css-learning.html | Responsive design | #css-responsive | Section anchor | No | Section: #css-responsive | - |
| css-learning.html | 9 Simple animations | #css-animations | Section anchor | No | Section: #css-animations | - |
| css-learning.html | 10 Final mini project | #css-final-project | Section anchor | No | Section: #css-final-project | - |
| css-learning.html | What is CSS? | #what-is-css | Section anchor | No | Section: #what-is-css | - |
| css-learning.html | Syntax and selectors | #css-syntax-selectors | Section anchor | No | Section: #css-syntax-selectors | - |
| css-learning.html | Colours and backgrounds | #css-colours-backgrounds | Section anchor | No | Section: #css-colours-backgrounds | - |
| css-learning.html | Typography | #css-typography | Section anchor | No | Section: #css-typography | - |
| css-learning.html | Box model | #css-box-model | Section anchor | No | Section: #css-box-model | - |
| css-learning.html | Display and flexbox | #css-display-flex | Section anchor | No | Section: #css-display-flex | - |
| css-learning.html | CSS Grid | #css-grid | Section anchor | No | Section: #css-grid | - |
| css-learning.html | Hover and responsive design | #css-hover-responsive | Section anchor | No | Section: #css-hover-responsive | - |
| css-learning.html | Simple animations | #css-animations | Section anchor | No | Section: #css-animations | - |
| css-learning.html | Final mini project | #css-final-project | Section anchor | No | Section: #css-final-project | - |
| css-learning.html | Continue to JavaScript | javascript-learning.html | Internal page | No | Internal: JavaScript Learning | CTA/control styling |
| css-learning.html | Review HTML | html-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| css-learning.html | About | about.html | Internal page | No | Internal: Other | - |
| css-learning.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| css-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| css-learning.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
| data-analyst-roadmap.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| data-analyst-roadmap.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| data-analyst-roadmap.html | Start Readiness Test | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| data-analyst-roadmap.html | View Learning Order | #learning-order | Section anchor | No | Section: #learning-order | CTA/control styling |
| data-analyst-roadmap.html | Open Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| data-analyst-roadmap.html | About | about.html | Internal page | No | Internal: Other | - |
| data-analyst-roadmap.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| data-analyst-roadmap.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| data-scientist-roadmap.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| data-scientist-roadmap.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| data-scientist-roadmap.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| data-scientist-roadmap.html | Start Readiness Test | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| data-scientist-roadmap.html | View Learning Order | #learning-order | Section anchor | No | Section: #learning-order | CTA/control styling |
| data-scientist-roadmap.html | Open Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| data-scientist-roadmap.html | About | about.html | Internal page | No | Internal: Other | - |
| data-scientist-roadmap.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| data-scientist-roadmap.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| frontend-developer-roadmap.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| frontend-developer-roadmap.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| frontend-developer-roadmap.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| frontend-developer-roadmap.html | Start Readiness Test | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| frontend-developer-roadmap.html | View Learning Order | #learning-order | Section anchor | No | Section: #learning-order | CTA/control styling |
| frontend-developer-roadmap.html | Open Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| frontend-developer-roadmap.html | About | about.html | Internal page | No | Internal: Other | - |
| frontend-developer-roadmap.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| frontend-developer-roadmap.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| gcse-maths-python-roadmap.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| gcse-maths-python-roadmap.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| gcse-maths-python-roadmap.html | Career Guidance | career-guidance.html | Internal page | No | Internal: Career Guidance | CTA/control styling |
| gcse-maths-python-roadmap.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| gcse-maths-python-roadmap.html | Message on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| gcse-maths-python-roadmap.html | View starter roadmap | #starter-roadmap | Section anchor | No | Section: #starter-roadmap | CTA/control styling |
| gcse-maths-python-roadmap.html | Take quiz | [button: data-gcse-quiz-start] | JavaScript action | N/A | JavaScript action | CTA/control styling; Uses JavaScript instead of href |
| gcse-maths-python-roadmap.html | View result | [button: data-gcse-result-open] | JavaScript action | N/A | JavaScript action | CTA/control styling; Uses JavaScript instead of href |
| gcse-maths-python-roadmap.html | Take quiz | [button: data-gcse-quiz-start] | JavaScript action | N/A | JavaScript action | CTA/control styling; Uses JavaScript instead of href |
| gcse-maths-python-roadmap.html | View result | [button: data-gcse-result-open] | JavaScript action | N/A | JavaScript action | CTA/control styling; Uses JavaScript instead of href |
| gcse-maths-python-roadmap.html | Message on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| gcse-maths-python-roadmap.html | Message on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| gcse-maths-python-roadmap.html | About | about.html | Internal page | No | Internal: Other | - |
| gcse-maths-python-roadmap.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| gcse-maths-python-roadmap.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| html-learning.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| html-learning.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| html-learning.html | CSS | css-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| html-learning.html | JavaScript | javascript-learning.html | Internal page | No | Internal: JavaScript Learning | CTA/control styling |
| html-learning.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| html-learning.html | Home | index.html | Internal page | No | Internal: Home | - |
| html-learning.html | Build the Skills | index.html#languages | Internal page | No | Internal: Home | - |
| html-learning.html | Start Learning | #html-lessons | Section anchor | No | Section: #html-lessons | CTA/control styling |
| html-learning.html | Final Project | #html-final-project | Section anchor | No | Section: #html-final-project | CTA/control styling |
| html-learning.html | Back to Home | index.html#languages | Internal page | No | Internal: Home | CTA/control styling |
| html-learning.html | 0 Top | #top | Section anchor | No | Section: #top | - |
| html-learning.html | 1 What is HTML? | #what-is-html | Section anchor | No | Section: #what-is-html | - |
| html-learning.html | Structure layer | #html-structure-layer | Section anchor | No | Section: #html-structure-layer | - |
| html-learning.html | Page parts | #html-page-parts | Section anchor | No | Section: #html-page-parts | - |
| html-learning.html | 2 Document structure | #html-document-structure | Section anchor | No | Section: #html-document-structure | - |
| html-learning.html | Base file | #html-base-file | Section anchor | No | Section: #html-base-file | - |
| html-learning.html | Head and body | #html-head-body | Section anchor | No | Section: #html-head-body | - |
| html-learning.html | 3 Headings and paragraphs | #html-headings-paragraphs | Section anchor | No | Section: #html-headings-paragraphs | - |
| html-learning.html | 4 Links and images | #html-links-images | Section anchor | No | Section: #html-links-images | - |
| html-learning.html | Links | #html-links | Section anchor | No | Section: #html-links | - |
| html-learning.html | Images and alt text | #html-images | Section anchor | No | Section: #html-images | - |
| html-learning.html | 5 Lists | #html-lists | Section anchor | No | Section: #html-lists | - |
| html-learning.html | 6 Semantic HTML | #html-semantic | Section anchor | No | Section: #html-semantic | - |
| html-learning.html | 7 Tables | #html-tables | Section anchor | No | Section: #html-tables | - |
| html-learning.html | 8 Forms and accessibility | #html-forms-accessibility | Section anchor | No | Section: #html-forms-accessibility | - |
| html-learning.html | Forms basics | #html-forms | Section anchor | No | Section: #html-forms | - |
| html-learning.html | Accessibility basics | #html-accessibility | Section anchor | No | Section: #html-accessibility | - |
| html-learning.html | 9 SEO basics | #html-seo | Section anchor | No | Section: #html-seo | - |
| html-learning.html | 10 Final mini project | #html-final-project | Section anchor | No | Section: #html-final-project | - |
| html-learning.html | What is HTML? | #what-is-html | Section anchor | No | Section: #what-is-html | - |
| html-learning.html | Document structure | #html-document-structure | Section anchor | No | Section: #html-document-structure | - |
| html-learning.html | Headings and paragraphs | #html-headings-paragraphs | Section anchor | No | Section: #html-headings-paragraphs | - |
| html-learning.html | Links and images | #html-links-images | Section anchor | No | Section: #html-links-images | - |
| html-learning.html | Lists | #html-lists | Section anchor | No | Section: #html-lists | - |
| html-learning.html | Semantic HTML | #html-semantic | Section anchor | No | Section: #html-semantic | - |
| html-learning.html | Tables | #html-tables | Section anchor | No | Section: #html-tables | - |
| html-learning.html | Forms and accessibility | #html-forms-accessibility | Section anchor | No | Section: #html-forms-accessibility | - |
| html-learning.html | SEO basics | #html-seo | Section anchor | No | Section: #html-seo | - |
| html-learning.html | Final mini project | #html-final-project | Section anchor | No | Section: #html-final-project | - |
| html-learning.html | Continue to CSS | css-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| html-learning.html | Learn JavaScript | javascript-learning.html | Internal page | No | Internal: JavaScript Learning | CTA/control styling |
| html-learning.html | About | about.html | Internal page | No | Internal: Other | - |
| html-learning.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| html-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| html-learning.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
| index.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| index.html | ☰ | [button id=menuBtn] | JavaScript action | N/A | JavaScript action | CTA/control styling; Uses JavaScript instead of href |
| index.html | Career Paths | #supported-paths | Section anchor | No | Section: #supported-paths | - |
| index.html | Languages | #languages | Section anchor | No | Section: Languages / Lessons Directory | Intentional repeated destination |
| index.html | Roadmap | #supported-paths | Section anchor | No | Section: #supported-paths | - |
| index.html | Projects | #projects | Section anchor | No | Section: #projects | - |
| index.html | Quiz | #quiz | Section anchor | No | Section: #quiz | - |
| index.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
| index.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | Intentional repeated destination |
| index.html | Take Readiness Assessment | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| index.html | Explore Paths | #supported-paths | Section anchor | No | Section: #supported-paths | CTA/control styling |
| index.html | Start Beta Enquiry | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| index.html | Share Beta Feedback | https://forms.gle/xrMJ34xdYVZ6ED4P7 | Google Form | Yes | Form: Beta Feedback | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| index.html | Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| index.html | GCSE Starter Quiz | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | CTA/control styling; Intentional repeated destination |
| index.html | Readiness Dashboard | readiness-dashboard.html | Internal page | No | Internal: Readiness Dashboard | CTA/control styling; Intentional repeated destination |
| index.html | Lessons | #languages | Section anchor | No | Section: Languages / Lessons Directory | CTA/control styling; Intentional repeated destination |
| index.html | Business / Beta Services | business.html | Internal page | No | Internal: Business / Beta Services | CTA/control styling |
| index.html | Choose path | career-path-guide.html | Internal page | No | Internal: Career Path Guide | Intentional repeated destination |
| index.html | Follow roadmap | #supported-paths | Section anchor | No | Section: #supported-paths | - |
| index.html | Take GCSE Test | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | Intentional repeated destination |
| index.html | Review report | readiness-dashboard.html | Internal page | No | Internal: Readiness Dashboard | Intentional repeated destination |
| index.html | Data Scientist Checking... | [button: data-preview-path=data-scientist] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| index.html | Data Analyst Checking... | [button: data-preview-path=data-analyst] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| index.html | Cloud Engineer Checking... | [button: data-preview-path=cloud-engineer] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| index.html | Frontend Developer Checking... | [button: data-preview-path=frontend-developer] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| index.html | Backend Developer Checking... | [button: data-preview-path=backend-developer] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| index.html | GCSE Maths + Python Basics Checking... | [button: data-preview-path=gcse-maths-python] | JavaScript action | N/A | JavaScript action | Uses JavaScript instead of href |
| index.html | Open Readiness Dashboard | readiness-dashboard.html | Internal page | No | Internal: Readiness Dashboard | CTA/control styling; Intentional repeated destination |
| index.html | Explore Beta Services | business.html | Internal page | No | Internal: Business / Beta Services | CTA/control styling |
| index.html | Start Your Beta Enquiry | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| index.html | View Data Scientist Roadmap | data-scientist-roadmap.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | View Data Analyst Roadmap | data-analyst-roadmap.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | View Cloud Engineer Roadmap | cloud-engineer-roadmap.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | View Frontend Developer Roadmap | frontend-developer-roadmap.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | View Backend Developer Roadmap | backend-developer-roadmap.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | View Beginner Roadmap | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | CTA/control styling; Intentional repeated destination |
| index.html | Open Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| index.html | View Python Lessons | python-learning.html | Internal page | No | Internal: Python Learning | CTA/control styling |
| index.html | View JavaScript Lessons | javascript-learning.html | Internal page | No | Internal: JavaScript Learning | CTA/control styling |
| index.html | View SQL Lessons | sql-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | View HTML Lessons | html-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | View CSS Lessons | css-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | View Java Lessons | java-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| index.html | Start Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| index.html | Explore Career Guidance | career-guidance.html | Internal page | No | Internal: Career Guidance | CTA/control styling |
| index.html | Start Your Beta Enquiry | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| index.html | Message on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| index.html | Suggest an improvement | https://github.com/COURTNEYjoalJ/techpath-readiness/issues | External link | Yes | External: GitHub Issues | CTA/control styling |
| index.html | About | about.html | Internal page | No | Internal: Other | - |
| index.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| index.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| index.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
| java-learning.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| java-learning.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| java-learning.html | JavaScript | javascript-learning.html | Internal page | No | Internal: JavaScript Learning | CTA/control styling |
| java-learning.html | Python | python-learning.html | Internal page | No | Internal: Python Learning | CTA/control styling |
| java-learning.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| java-learning.html | Home | index.html | Internal page | No | Internal: Home | - |
| java-learning.html | Build the Skills | index.html#languages | Internal page | No | Internal: Home | - |
| java-learning.html | Start Learning | #java-lessons | Section anchor | No | Section: #java-lessons | CTA/control styling |
| java-learning.html | Final Project | #java-final-project | Section anchor | No | Section: #java-final-project | CTA/control styling |
| java-learning.html | Back to Home | index.html#languages | Internal page | No | Internal: Home | CTA/control styling |
| java-learning.html | 0 Top | #top | Section anchor | No | Section: #top | - |
| java-learning.html | 1 What is Java? | #what-is-java | Section anchor | No | Section: #what-is-java | - |
| java-learning.html | Java language | #java-language | Section anchor | No | Section: #java-language | - |
| java-learning.html | JVM idea | #java-jvm | Section anchor | No | Section: #java-jvm | - |
| java-learning.html | 2 Program structure | #java-program-structure | Section anchor | No | Section: #java-program-structure | - |
| java-learning.html | class and main | #java-class-main | Section anchor | No | Section: #java-class-main | - |
| java-learning.html | Printing output | #java-printing | Section anchor | No | Section: #java-printing | - |
| java-learning.html | 3 Variables and data types | #java-variables-data-types | Section anchor | No | Section: #java-variables-data-types | - |
| java-learning.html | 4 Operators | #java-operators | Section anchor | No | Section: #java-operators | - |
| java-learning.html | 5 Conditions | #java-conditions | Section anchor | No | Section: #java-conditions | - |
| java-learning.html | 6 Loops | #java-loops | Section anchor | No | Section: #java-loops | - |
| java-learning.html | 7 Arrays | #java-arrays | Section anchor | No | Section: #java-arrays | - |
| java-learning.html | 8 Methods | #java-methods | Section anchor | No | Section: #java-methods | - |
| java-learning.html | 9 Objects and input | #java-objects-input | Section anchor | No | Section: #java-objects-input | - |
| java-learning.html | Classes and objects | #java-classes-objects | Section anchor | No | Section: #java-classes-objects | - |
| java-learning.html | Input and output | #java-input-output | Section anchor | No | Section: #java-input-output | - |
| java-learning.html | Common mistakes | #java-common-mistakes | Section anchor | No | Section: #java-common-mistakes | - |
| java-learning.html | 10 Final mini project | #java-final-project | Section anchor | No | Section: #java-final-project | - |
| java-learning.html | What is Java? | #what-is-java | Section anchor | No | Section: #what-is-java | - |
| java-learning.html | Program structure | #java-program-structure | Section anchor | No | Section: #java-program-structure | - |
| java-learning.html | Variables and data types | #java-variables-data-types | Section anchor | No | Section: #java-variables-data-types | - |
| java-learning.html | Operators | #java-operators | Section anchor | No | Section: #java-operators | - |
| java-learning.html | Conditions | #java-conditions | Section anchor | No | Section: #java-conditions | - |
| java-learning.html | Loops | #java-loops | Section anchor | No | Section: #java-loops | - |
| java-learning.html | Arrays | #java-arrays | Section anchor | No | Section: #java-arrays | - |
| java-learning.html | Methods | #java-methods | Section anchor | No | Section: #java-methods | - |
| java-learning.html | Objects and input | #java-objects-input | Section anchor | No | Section: #java-objects-input | - |
| java-learning.html | Final mini project | #java-final-project | Section anchor | No | Section: #java-final-project | - |
| java-learning.html | Continue to Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| java-learning.html | Compare with JavaScript | javascript-learning.html | Internal page | No | Internal: JavaScript Learning | CTA/control styling |
| java-learning.html | About | about.html | Internal page | No | Internal: Other | - |
| java-learning.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| java-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| java-learning.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
| javascript-learning.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| javascript-learning.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| javascript-learning.html | Python | python-learning.html | Internal page | No | Internal: Python Learning | CTA/control styling |
| javascript-learning.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| javascript-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | CTA/control styling |
| javascript-learning.html | Home | index.html | Internal page | No | Internal: Home | - |
| javascript-learning.html | Build the Skills | index.html#languages | Internal page | No | Internal: Home | - |
| javascript-learning.html | Start Learning | #javascript-lessons | Section anchor | No | Section: #javascript-lessons | CTA/control styling |
| javascript-learning.html | Final Project | #javascript-final-project | Section anchor | No | Section: #javascript-final-project | CTA/control styling |
| javascript-learning.html | Back to Home | index.html#languages | Internal page | No | Internal: Home | CTA/control styling |
| javascript-learning.html | 0 Top | #top | Section anchor | No | Section: #top | - |
| javascript-learning.html | 1 What is JavaScript? | #what-is-javascript | Section anchor | No | Section: #what-is-javascript | - |
| javascript-learning.html | Web layers | #js-web-layers | Section anchor | No | Section: #js-web-layers | - |
| javascript-learning.html | Real interactions | #js-real-interactions | Section anchor | No | Section: #js-real-interactions | - |
| javascript-learning.html | 2 Variables and data types | #js-variables-data-types | Section anchor | No | Section: #js-variables-data-types | - |
| javascript-learning.html | let and const | #js-let-const | Section anchor | No | Section: #js-let-const | - |
| javascript-learning.html | Data values | #js-data-values | Section anchor | No | Section: #js-data-values | - |
| javascript-learning.html | 3 Operators and expressions | #js-operators-expressions | Section anchor | No | Section: #js-operators-expressions | - |
| javascript-learning.html | Score calculation | #js-score-calculation | Section anchor | No | Section: #js-score-calculation | - |
| javascript-learning.html | Template literals | #js-template-literals | Section anchor | No | Section: #js-template-literals | - |
| javascript-learning.html | 4 Conditions | #js-conditions | Section anchor | No | Section: #js-conditions | - |
| javascript-learning.html | Readiness bands | #js-readiness-bands | Section anchor | No | Section: #js-readiness-bands | - |
| javascript-learning.html | 5 Loops | #js-loops | Section anchor | No | Section: #js-loops | - |
| javascript-learning.html | Checking answers | #js-checking-answers | Section anchor | No | Section: #js-checking-answers | - |
| javascript-learning.html | while warning | #js-loop-warning | Section anchor | No | Section: #js-loop-warning | - |
| javascript-learning.html | 6 Arrays | #js-arrays | Section anchor | No | Section: #js-arrays | - |
| javascript-learning.html | Question lists | #js-array-questions | Section anchor | No | Section: #js-array-questions | - |
| javascript-learning.html | Array methods | #js-array-methods | Section anchor | No | Section: #js-array-methods | - |
| javascript-learning.html | 7 Functions | #js-functions | Section anchor | No | Section: #js-functions | - |
| javascript-learning.html | Feedback function | #js-function-feedback | Section anchor | No | Section: #js-function-feedback | - |
| javascript-learning.html | 8 Objects | #js-objects | Section anchor | No | Section: #js-objects | - |
| javascript-learning.html | Result object | #js-result-object | Section anchor | No | Section: #js-result-object | - |
| javascript-learning.html | 9 DOM, events and storage | #js-dom-events-storage | Section anchor | No | Section: #js-dom-events-storage | - |
| javascript-learning.html | DOM basics | #js-dom-basics | Section anchor | No | Section: #js-dom-basics | - |
| javascript-learning.html | Events | #js-events | Section anchor | No | Section: #js-events | - |
| javascript-learning.html | localStorage | #js-localstorage | Section anchor | No | Section: #js-localstorage | - |
| javascript-learning.html | 10 Final mini project | #javascript-final-project | Section anchor | No | Section: #javascript-final-project | - |
| javascript-learning.html | What is JavaScript? | #what-is-javascript | Section anchor | No | Section: #what-is-javascript | - |
| javascript-learning.html | Variables and data types | #js-variables-data-types | Section anchor | No | Section: #js-variables-data-types | - |
| javascript-learning.html | Operators and expressions | #js-operators-expressions | Section anchor | No | Section: #js-operators-expressions | - |
| javascript-learning.html | Conditions | #js-conditions | Section anchor | No | Section: #js-conditions | - |
| javascript-learning.html | Loops | #js-loops | Section anchor | No | Section: #js-loops | - |
| javascript-learning.html | Arrays | #js-arrays | Section anchor | No | Section: #js-arrays | - |
| javascript-learning.html | Functions | #js-functions | Section anchor | No | Section: #js-functions | - |
| javascript-learning.html | Objects | #js-objects | Section anchor | No | Section: #js-objects | - |
| javascript-learning.html | DOM, events and storage | #js-dom-events-storage | Section anchor | No | Section: #js-dom-events-storage | - |
| javascript-learning.html | Final mini project | #javascript-final-project | Section anchor | No | Section: #javascript-final-project | - |
| javascript-learning.html | Continue to Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| javascript-learning.html | Learn HTML | html-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| javascript-learning.html | Learn CSS | css-learning.html | Internal page | No | Internal: Other | CTA/control styling |
| javascript-learning.html | About | about.html | Internal page | No | Internal: Other | - |
| javascript-learning.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| javascript-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| javascript-learning.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
| privacy-policy.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| privacy-policy.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| privacy-policy.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| privacy-policy.html | Go to Contact | contact.html | Internal page | No | Internal: Contact | CTA/control styling |
| privacy-policy.html | About | about.html | Internal page | No | Internal: Other | - |
| privacy-policy.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| privacy-policy.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| python-learning.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| python-learning.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| python-learning.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| python-learning.html | Career Guidance | career-guidance.html | Internal page | No | Internal: Career Guidance | CTA/control styling |
| python-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | CTA/control styling |
| python-learning.html | Home | index.html | Internal page | No | Internal: Home | - |
| python-learning.html | Build the Skills | index.html#languages | Internal page | No | Internal: Home | - |
| python-learning.html | Start Learning | #python-lessons | Section anchor | No | Section: #python-lessons | CTA/control styling |
| python-learning.html | Final Project | #python-final-project | Section anchor | No | Section: #python-final-project | CTA/control styling |
| python-learning.html | Back to Home | index.html#languages | Internal page | No | Internal: Home | CTA/control styling |
| python-learning.html | 0 Top | #top | Section anchor | No | Section: #top | - |
| python-learning.html | 1 What is Python? | #what-is-python | Section anchor | No | Section: #what-is-python | - |
| python-learning.html | Programming as instructions | #python-programming-instructions | Section anchor | No | Section: #python-programming-instructions | - |
| python-learning.html | Where Python is used | #python-where-used | Section anchor | No | Section: #python-where-used | - |
| python-learning.html | Input, process and output | #python-input-process-output | Section anchor | No | Section: #python-input-process-output | - |
| python-learning.html | 2 Variables and data types | #variables-data-types | Section anchor | No | Section: #variables-data-types | - |
| python-learning.html | Variables | #python-variables | Section anchor | No | Section: #python-variables | - |
| python-learning.html | Strings and numbers | #python-strings-numbers | Section anchor | No | Section: #python-strings-numbers | - |
| python-learning.html | Booleans | #python-booleans | Section anchor | No | Section: #python-booleans | - |
| python-learning.html | Type conversion | #python-type-conversion | Section anchor | No | Section: #python-type-conversion | - |
| python-learning.html | 3 Operators and expressions | #operators-expressions | Section anchor | No | Section: #operators-expressions | - |
| python-learning.html | Arithmetic operators | #python-arithmetic-operators | Section anchor | No | Section: #python-arithmetic-operators | - |
| python-learning.html | Comparison operators | #python-comparison-operators | Section anchor | No | Section: #python-comparison-operators | - |
| python-learning.html | Logical operators | #python-logical-operators | Section anchor | No | Section: #python-logical-operators | - |
| python-learning.html | Calculating percentages | #python-calculating-percentages | Section anchor | No | Section: #python-calculating-percentages | - |
| python-learning.html | 4 Conditions | #conditions | Section anchor | No | Section: #conditions | - |
| python-learning.html | if statements | #python-if-statements | Section anchor | No | Section: #python-if-statements | - |
| python-learning.html | if / else | #python-if-else | Section anchor | No | Section: #python-if-else | - |
| python-learning.html | elif outcomes | #python-elif-outcomes | Section anchor | No | Section: #python-elif-outcomes | - |
| python-learning.html | Real project conditions | #python-real-project-conditions | Section anchor | No | Section: #python-real-project-conditions | - |
| python-learning.html | 5 Loops | #loops | Section anchor | No | Section: #loops | - |
| python-learning.html | Why loops are useful | #python-loops-useful | Section anchor | No | Section: #python-loops-useful | - |
| python-learning.html | for loops | #python-for-loops | Section anchor | No | Section: #python-for-loops | - |
| python-learning.html | while loops | #python-while-loops | Section anchor | No | Section: #python-while-loops | - |
| python-learning.html | Looping through marks | #python-looping-marks | Section anchor | No | Section: #python-looping-marks | - |
| python-learning.html | 6 Lists | #lists | Section anchor | No | Section: #lists | - |
| python-learning.html | Creating lists | #python-creating-lists | Section anchor | No | Section: #python-creating-lists | - |
| python-learning.html | Accessing values | #python-accessing-list-values | Section anchor | No | Section: #python-accessing-list-values | - |
| python-learning.html | Adding and removing | #python-adding-removing-values | Section anchor | No | Section: #python-adding-removing-values | - |
| python-learning.html | Marks tracker lists | #python-lists-marks-tracker | Section anchor | No | Section: #python-lists-marks-tracker | - |
| python-learning.html | 7 Functions | #functions | Section anchor | No | Section: #functions | - |
| python-learning.html | Why functions are useful | #python-functions-useful | Section anchor | No | Section: #python-functions-useful | - |
| python-learning.html | Parameters | #python-function-parameters | Section anchor | No | Section: #python-function-parameters | - |
| python-learning.html | Return values | #python-return-values | Section anchor | No | Section: #python-return-values | - |
| python-learning.html | Reusing functions | #python-reusing-functions | Section anchor | No | Section: #python-reusing-functions | - |
| python-learning.html | 8 Dictionaries | #dictionaries | Section anchor | No | Section: #dictionaries | - |
| python-learning.html | Key-value pairs | #python-key-value-pairs | Section anchor | No | Section: #python-key-value-pairs | - |
| python-learning.html | Accessing values | #python-accessing-dictionary-values | Section anchor | No | Section: #python-accessing-dictionary-values | - |
| python-learning.html | Updating values | #python-updating-dictionary-values | Section anchor | No | Section: #python-updating-dictionary-values | - |
| python-learning.html | Student records | #python-student-records | Section anchor | No | Section: #python-student-records | - |
| python-learning.html | 9 Files and CSV basics | #files-csv-basics | Section anchor | No | Section: #files-csv-basics | - |
| python-learning.html | What files are used for | #python-files-used-for | Section anchor | No | Section: #python-files-used-for | - |
| python-learning.html | What CSV means | #python-csv-meaning | Section anchor | No | Section: #python-csv-meaning | - |
| python-learning.html | Reading data conceptually | #python-reading-data-conceptually | Section anchor | No | Section: #python-reading-data-conceptually | - |
| python-learning.html | Saving output conceptually | #python-saving-output | Section anchor | No | Section: #python-saving-output | - |
| python-learning.html | 10 Final mini project | #python-final-project | Section anchor | No | Section: #python-final-project | - |
| python-learning.html | What is Python? | #what-is-python | Section anchor | No | Section: #what-is-python | - |
| python-learning.html | Variables and data types | #variables-data-types | Section anchor | No | Section: #variables-data-types | - |
| python-learning.html | Operators and expressions | #operators-expressions | Section anchor | No | Section: #operators-expressions | - |
| python-learning.html | Conditions | #conditions | Section anchor | No | Section: #conditions | - |
| python-learning.html | Loops | #loops | Section anchor | No | Section: #loops | - |
| python-learning.html | Lists | #lists | Section anchor | No | Section: #lists | - |
| python-learning.html | Functions | #functions | Section anchor | No | Section: #functions | - |
| python-learning.html | Dictionaries | #dictionaries | Section anchor | No | Section: #dictionaries | - |
| python-learning.html | Files and CSV basics | #files-csv-basics | Section anchor | No | Section: #files-csv-basics | - |
| python-learning.html | Final mini project | #python-final-project | Section anchor | No | Section: #python-final-project | - |
| python-learning.html | Continue to Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| python-learning.html | Discuss project guidance on LinkedIn | https://www.linkedin.com/in/courtney-joal-j/ | External link | Yes | External: LinkedIn | CTA/control styling |
| python-learning.html | About | about.html | Internal page | No | Internal: Other | - |
| python-learning.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| python-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| readiness-dashboard.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| readiness-dashboard.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| readiness-dashboard.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | GCSE Quiz | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | Beta Support | business.html | Internal page | No | Internal: Business / Beta Services | CTA/control styling |
| readiness-dashboard.html | Start Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | Try GCSE Starter Quiz | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | Start Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | Try GCSE Starter Quiz | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | Start Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | Try GCSE Starter Quiz | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | Request TechPathReady Support | https://forms.gle/BMWo4f75CHRm2Ve87 | Google Form | Yes | Form: Beta Enquiry | Opens a Google Form; CTA/control styling; Intentional repeated destination |
| readiness-dashboard.html | Home | index.html | Internal page | No | Internal: Home | - |
| readiness-dashboard.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | Intentional repeated destination |
| readiness-dashboard.html | GCSE Quiz | gcse-maths-python-roadmap.html | Internal page | No | Internal: GCSE Starter Quiz | Intentional repeated destination |
| readiness-dashboard.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
| readiness-dashboard.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| sql-learning.html | TechPathReady | index.html | Internal page | No | Internal: Home | - |
| sql-learning.html | Home | index.html | Internal page | No | Internal: Home | CTA/control styling |
| sql-learning.html | Python | python-learning.html | Internal page | No | Internal: Python Learning | CTA/control styling |
| sql-learning.html | Career Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| sql-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | CTA/control styling |
| sql-learning.html | Home | index.html | Internal page | No | Internal: Home | - |
| sql-learning.html | Build the Skills | index.html#languages | Internal page | No | Internal: Home | - |
| sql-learning.html | Start Learning | #sql-lessons | Section anchor | No | Section: #sql-lessons | CTA/control styling |
| sql-learning.html | Final Project | #sql-final-project | Section anchor | No | Section: #sql-final-project | CTA/control styling |
| sql-learning.html | Back to Home | index.html#languages | Internal page | No | Internal: Home | CTA/control styling |
| sql-learning.html | 0 Top | #top | Section anchor | No | Section: #top | - |
| sql-learning.html | 1 What is SQL? | #what-is-sql | Section anchor | No | Section: #what-is-sql | - |
| sql-learning.html | Database basics | #sql-database-basics | Section anchor | No | Section: #sql-database-basics | - |
| sql-learning.html | Spreadsheet vs database | #sql-spreadsheet-thinking | Section anchor | No | Section: #sql-spreadsheet-thinking | - |
| sql-learning.html | 2 Tables, rows and columns | #sql-tables | Section anchor | No | Section: #sql-tables | - |
| sql-learning.html | Table structure | #sql-table-structure | Section anchor | No | Section: #sql-table-structure | - |
| sql-learning.html | Primary key | #sql-primary-key | Section anchor | No | Section: #sql-primary-key | - |
| sql-learning.html | 3 SELECT basics | #sql-select | Section anchor | No | Section: #sql-select | - |
| sql-learning.html | Selecting columns | #sql-select-columns | Section anchor | No | Section: #sql-select-columns | - |
| sql-learning.html | Aliases | #sql-aliases | Section anchor | No | Section: #sql-aliases | - |
| sql-learning.html | 4 WHERE filtering | #sql-where | Section anchor | No | Section: #sql-where | - |
| sql-learning.html | Filter rules | #sql-filter-rules | Section anchor | No | Section: #sql-filter-rules | - |
| sql-learning.html | 5 ORDER BY and LIMIT | #sql-order-limit | Section anchor | No | Section: #sql-order-limit | - |
| sql-learning.html | Sorting | #sql-sorting | Section anchor | No | Section: #sql-sorting | - |
| sql-learning.html | Limits | #sql-limits | Section anchor | No | Section: #sql-limits | - |
| sql-learning.html | 6 Aggregates | #sql-aggregates | Section anchor | No | Section: #sql-aggregates | - |
| sql-learning.html | Summary functions | #sql-summary-functions | Section anchor | No | Section: #sql-summary-functions | - |
| sql-learning.html | 7 GROUP BY and HAVING | #sql-group-having | Section anchor | No | Section: #sql-group-having | - |
| sql-learning.html | GROUP BY | #sql-group-by | Section anchor | No | Section: #sql-group-by | - |
| sql-learning.html | HAVING | #sql-having | Section anchor | No | Section: #sql-having | - |
| sql-learning.html | 8 JOIN and CASE | #sql-join-case | Section anchor | No | Section: #sql-join-case | - |
| sql-learning.html | JOIN basics | #sql-joins | Section anchor | No | Section: #sql-joins | - |
| sql-learning.html | CASE labels | #sql-case | Section anchor | No | Section: #sql-case | - |
| sql-learning.html | 9 Reporting query | #sql-reporting-query | Section anchor | No | Section: #sql-reporting-query | - |
| sql-learning.html | Clean report | #sql-clean-report | Section anchor | No | Section: #sql-clean-report | - |
| sql-learning.html | 10 Final mini project | #sql-final-project | Section anchor | No | Section: #sql-final-project | - |
| sql-learning.html | What is SQL? | #what-is-sql | Section anchor | No | Section: #what-is-sql | - |
| sql-learning.html | Tables, rows and columns | #sql-tables | Section anchor | No | Section: #sql-tables | - |
| sql-learning.html | SELECT basics | #sql-select | Section anchor | No | Section: #sql-select | - |
| sql-learning.html | WHERE filtering | #sql-where | Section anchor | No | Section: #sql-where | - |
| sql-learning.html | ORDER BY and LIMIT | #sql-order-limit | Section anchor | No | Section: #sql-order-limit | - |
| sql-learning.html | Aggregate functions | #sql-aggregates | Section anchor | No | Section: #sql-aggregates | - |
| sql-learning.html | GROUP BY and HAVING | #sql-group-having | Section anchor | No | Section: #sql-group-having | - |
| sql-learning.html | JOIN and CASE | #sql-join-case | Section anchor | No | Section: #sql-join-case | - |
| sql-learning.html | Clean reporting query | #sql-reporting-query | Section anchor | No | Section: #sql-reporting-query | - |
| sql-learning.html | Final mini project | #sql-final-project | Section anchor | No | Section: #sql-final-project | - |
| sql-learning.html | Continue to Career Path Guide | career-path-guide.html | Internal page | No | Internal: Career Path Guide | CTA/control styling; Intentional repeated destination |
| sql-learning.html | Learn Python | python-learning.html | Internal page | No | Internal: Python Learning | CTA/control styling |
| sql-learning.html | About | about.html | Internal page | No | Internal: Other | - |
| sql-learning.html | Privacy Policy | privacy-policy.html | Internal page | No | Internal: Other | - |
| sql-learning.html | Contact | contact.html | Internal page | No | Internal: Contact | - |
| sql-learning.html | Business | business.html | Internal page | No | Internal: Business / Beta Services | - |
