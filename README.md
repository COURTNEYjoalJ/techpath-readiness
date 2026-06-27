# CodePath Academy

CodePath Academy is a plain HTML, CSS and JavaScript career-path learning and readiness website. It helps learners choose a tech career path, review the skills required for that role, take topic-based skill tests, and see a dynamic career readiness report.

The project is fully frontend-only. It does not use React, a backend, a database, API keys, external libraries, or external services. Quiz scores are saved locally in the browser with `localStorage`.

## Features

- Homepage that promotes the Career Path Guide
- Career Path Guide page with country and role selection
- Custom styled dropdowns
- Skill roadmap table for each role
- Skill weights and required topics
- Start Test buttons for skills with question banks
- Modal-based quizzes
- Topic selection before answering questions
- 5 topics per skill
- 4 questions per topic
- 20 questions per skill
- Shuffled answer options per attempt
- Completed topics are locked during an attempt
- Partial scores are not saved when closing the modal early
- Final scores are saved only after completing a full skill test
- Dynamic Career Readiness Report scored out of 100
- Saved scores using `localStorage`
- Navy/cyan glassmorphism UI
- Responsive layout for desktop, tablet and mobile

## Completed Career Roles

The Career Path Guide currently supports:

1. Data Scientist
2. Data Analyst
3. Cloud Engineer
4. Frontend Developer
5. Backend Developer

Each completed role includes weighted skills, required topics, skill tests, saved scores, and readiness report integration.

## Tech Stack

- HTML
- CSS
- JavaScript
- Browser `localStorage`

No build tools or package installation are required.

## File Structure

```text
.
|-- index.html              # Homepage and beginner learning sections
|-- styles.css              # Shared navy/cyan glassmorphism styling and responsive layout
|-- script.js               # Homepage lessons, beginner quiz and mobile menu behavior
|-- career-path-guide.html  # Career Path Guide page
|-- career-data.js          # Career roles, skill weights and required topics
|-- career-guide.js         # Career guide rendering, quizzes, scoring and readiness report logic
|-- career-questions.js     # Skill question banks
`-- README.md               # Project documentation
```

## How To Run Locally

1. Download or clone this repository.
2. Open `index.html` in a browser.
3. Use the homepage button to open the Career Path Guide.

You can also open `career-path-guide.html` directly.

Because this is a static frontend project, no server is required. If your browser blocks local file behavior for any reason, you can serve the folder with any simple static server, but that is optional.

## Data And Storage

- Career roles, skills, weights and topics are stored in local JavaScript files.
- Question banks are stored in `career-questions.js`.
- Completed quiz scores are saved in browser `localStorage`.
- Scores remain on the same browser/device until local site data is cleared.
- Closing a quiz before completing every topic does not save a partial score.

## Future Improvements

- Add more career roles and deeper role-specific study plans
- Add more project recommendations for each skill
- Add accessibility refinements and keyboard interaction testing
- Add print/export support for readiness reports
- Add optional progress reset controls
- Explore AI-generated question creation as a future idea only

AI-generated questions are not currently implemented. The current project uses hardcoded local question banks and does not call an AI API.

## Publishing

This project can be published as a static site on platforms such as GitHub Pages, Netlify or Vercel. It does not require backend configuration, environment variables, database setup or API keys.
