# TechPath Readiness

TechPath Readiness is a plain HTML, CSS and JavaScript career-roadmap website for learners exploring tech roles. It helps users choose a career path, follow a structured skill roadmap, take skill quizzes, and review a career readiness report.

Live website: https://courtneyjoalj.github.io/techpath-readiness/

Repository: https://github.com/COURTNEYjoalJ/techpath-readiness

## Features

- Homepage with TechPath Readiness branding and career-path messaging
- Career Path Guide with country and role selection
- 6 live learning paths: 5 scored career paths plus 1 separate beginner support path
- Five completed role roadmaps
- Skill roadmap tables with weights and required topics
- Modal-based skill quizzes for available question banks
- Topic selection before skill-test questions
- 5 topics per skill, 4 questions per topic, 20 questions per skill
- Shuffled answer options per attempt
- Completed topics locked during an attempt
- Partial scores not saved when a modal is closed early
- Final scores saved only after full Career Path Guide skill-test completion
- Dynamic Career Readiness Report scored out of 100
- Homepage standalone practice quiz that does not save scores
- Saved Career Path Guide scores using browser `localStorage`
- Dedicated SEO roadmap pages for completed roles
- GCSE Maths, Python Basics and Data Science starter roadmap page
- Beginner learning pages for Python, JavaScript, Java, SQL, HTML and CSS
- Learning pages include structured beginner lessons, diagrams, real-life examples, code examples, key-words tables, quick exercises, mini-project tasks, checkpoints and final mini projects
- Business/Beta Services landing page for GCSE Maths support, Python beginner coaching, readiness reports and career starter packages
- V1.6 manual paid beta intake added through a Google Form request link
- GCSE Maths + Python Basics starter quiz with quick/full modes and result modal
- Career Guidance page for 1-to-1 teaching, project discussion and learning direction
- About, Privacy Policy, and Contact pages
- Founder section for Courtney Joal J
- LinkedIn CTA and GitHub Issues feedback link
- `sitemap.xml`, `robots.txt`, and Google Search Console verification file
- Canonical URLs, Open Graph metadata, Twitter/X card metadata, and JSON-LD structured data
- Repeatable scroll reveal animations across HTML pages
- Responsive Mocha Sapphire glassmorphism design
- Global live Mocha Sapphire animated background across all pages
- Procedural sapphire and copper wave trails that are not a static image or video
- Subtle scroll-responsive background movement with reduced-motion support
- Supplied logo image expected at `assets/techpath-logo.png`
- Central theme tokens in `theme.css` for easier future colour and design updates
- Reusable reveal animation styles in `animations.css`

## Completed Career Paths And Beginner Support Path

The main Career Path Guide scored roles remain:

1. Data Scientist
2. Data Analyst
3. Cloud Engineer
4. Frontend Developer
5. Backend Developer

Each completed path includes role-specific skills, required topics, skill tests where question banks exist, and readiness report integration.

The separate beginner support path is:

- GCSE Maths + Python Basics

This beginner path has its own roadmap page and starter quiz. It is not currently a scored role inside the main Career Path Guide dropdown. The starter quiz uses original readiness-style questions, not official GCSE exam board or past paper questions.

The GCSE starter quiz has two modes:

- Quick check: 24 questions, roughly 15-20 minutes.
- Full starter test: 72 questions, roughly 45-60 minutes.

## SEO And Content Pages

- `index.html`
- `career-path-guide.html`
- `data-scientist-roadmap.html`
- `data-analyst-roadmap.html`
- `cloud-engineer-roadmap.html`
- `frontend-developer-roadmap.html`
- `backend-developer-roadmap.html`
- `gcse-maths-python-roadmap.html`
- `python-learning.html`
- `javascript-learning.html`
- `java-learning.html`
- `sql-learning.html`
- `html-learning.html`
- `css-learning.html`
- `business.html`
- `career-guidance.html`
- `about.html`
- `privacy-policy.html`
- `contact.html`

## Tech Stack

- HTML
- CSS
- JavaScript
- Browser `localStorage`

This project does not use React, a backend, a database, API keys, external libraries, package installation, or AdSense code.

## Theme And Animation Structure

- `theme.css` stores the central Mocha Sapphire design tokens, including colours, gradients, borders, shadows, radii, spacing and motion variables.
- `animations.css` stores reusable scroll reveal styles and reduced-motion handling.
- `styles.css` keeps component layout and page-specific styling while using the shared tokens where practical.
- The current theme is Mocha Sapphire: deep mocha backgrounds, sapphire motion accents, champagne/copper borders and dark glass panels.
- The global animated background is injected by `mocha-background.js`, uses CSS layers and keyframes, and does not use external videos or animation libraries.
- The background appears behind every page, responds subtly to scrolling through CSS variables, and respects `prefers-reduced-motion`.
- The header uses `assets/techpath-logo.png` when available, with TechPath Readiness text beside it as a readable fallback.

## File Structure

```text
.
|-- index.html                     # Homepage, supported paths, practice quiz, feedback and LinkedIn CTA
|-- career-path-guide.html         # Career Path Guide page
|-- data-scientist-roadmap.html    # Data Scientist SEO roadmap page
|-- data-analyst-roadmap.html      # Data Analyst SEO roadmap page
|-- cloud-engineer-roadmap.html    # Cloud Engineer SEO roadmap page
|-- frontend-developer-roadmap.html # Frontend Developer SEO roadmap page
|-- backend-developer-roadmap.html # Backend Developer SEO roadmap page
|-- gcse-maths-python-roadmap.html # GCSE Maths, Python and Data Science starter roadmap
|-- python-learning.html           # Python basics lessons, diagrams, exercises and final mini project
|-- javascript-learning.html       # JavaScript basics lessons and interactive readiness quiz mini project
|-- java-learning.html             # Java basics lessons and student grade calculator mini project
|-- sql-learning.html              # SQL basics lessons and student progress report mini project
|-- html-learning.html             # HTML basics lessons and personal learning profile mini project
|-- css-learning.html              # CSS basics lessons and responsive career card mini project
|-- business.html                  # V1.5 Business Landing Page / Beta Services page
|-- career-guidance.html           # 1-to-1 guidance, teaching and project support page
|-- about.html                     # About and founder page
|-- privacy-policy.html            # Static website privacy policy
|-- contact.html                   # Feedback and LinkedIn contact route
|-- assets/techpath-logo.png       # Supplied TechPath Readiness logo mark
|-- theme.css                      # Central colour, gradient, shadow, spacing and motion tokens
|-- animations.css                 # Reusable scroll reveal animation styles
|-- styles.css                     # Shared component design, layout and responsive styles
|-- script.js                      # Homepage menu and practice quiz behavior
|-- scroll-reveal.js               # Repeatable scroll reveal animations
|-- mocha-background.js            # Global procedural Mocha Sapphire animated background
|-- gcse-starter-quiz.js           # Separate GCSE Maths + Python Basics starter quiz and result modal
|-- career-data.js                 # Career roles, skill weights and required topics
|-- career-guide.js                # Career guide rendering, quiz flow, scoring and readiness report logic
|-- career-questions.js            # Local skill question banks
|-- sitemap.xml                    # Search engine sitemap
|-- robots.txt                     # Search crawler rules
|-- google3360e1f983a4d695.html    # Google Search Console verification file
`-- README.md                      # Project documentation
```

## How To Run Locally

1. Download or clone the repository.
2. Open `index.html` in a browser.
3. Use the homepage button to open the Career Path Guide.

You can also open `career-path-guide.html` or any roadmap page directly. Because the site is static, no local server is required. A simple static server can be used if a browser blocks local file behavior.

## Data And Privacy Notes

- Career roles, skills, weights and topics are stored in local JavaScript files.
- Question banks are stored in `career-questions.js`.
- Full Career Path Guide skill-test scores may be saved in the user's browser with `localStorage`.
- Homepage practice quiz scores are not saved.
- The GCSE Maths + Python Basics starter quiz may save the latest result and quiz mode locally with the separate key `techpathGcseStarterQuizResult`.
- GCSE starter quiz results are not sent to a server because the site has no backend.
- The site does not use a backend, database, account system, API key or built-in contact form.
- Feedback is handled through GitHub Issues, beta support requests use a Google Form link, and LinkedIn remains available as an optional contact route.
- 1-to-1 teaching and guidance discussions may be started through the beta request form or LinkedIn.
- Messages on LinkedIn are governed by LinkedIn's own terms and privacy policy.
- GitHub Issues feedback is governed by GitHub's own terms and privacy policy.
- The beta support request form is hosted by Google Forms; email is optional at this stage to reduce unnecessary personal-data collection.
- There is no fake contact form, payment system, booking system or calendar system.
- The site does not claim guaranteed jobs, certificates or guaranteed outcomes.

## Founder

TechPath Readiness was built by Courtney Joal J.

LinkedIn: https://www.linkedin.com/in/courtney-joal-j/

Courtney is based in Liverpool, United Kingdom, and is an MSc Data Science & AI graduate from the University of Liverpool. The project reflects interests in data science, AI, cloud learning, Python, SQL, machine learning, data analytics and practical career learning tools.

## Version History

### v1.0-career-guide

- Built the main Career Path Guide.
- Added role selection, skill roadmaps, modal quizzes, scoring and readiness reports.
- Added `localStorage` score saving for completed Career Path Guide skill tests.

### v1.1-seo-roadmaps

- Added dedicated SEO roadmap pages for all five completed career paths.
- Added sitemap and robots files.
- Improved homepage links to role roadmap pages.

### v1.2-seo-metadata

- Added canonical URLs, Open Graph metadata, Twitter/X card metadata and JSON-LD structured data.
- Added About, Privacy Policy and Contact pages.
- Added founder and LinkedIn CTAs.
- Added repeatable scroll reveal animations across HTML pages.

### v1.3-beginner-guidance

- Added GCSE Maths, Python Basics and Data Science starter roadmap content.
- Added a dedicated Career Guidance page for 1-to-1 teaching, learning direction, project ideas and portfolio planning.
- Updated homepage, About, Contact, Privacy Policy, README and sitemap links for the new guidance pages.
- Kept the guidance model LinkedIn-only with no booking, payment, calendar or contact form system.

### v1.4-gcse-starter-quiz

- Updated the homepage count to 6 live learning paths.
- Mapped homepage preview pills to real roadmap, test and report links.
- Added a separate GCSE Maths + Python Basics starter quiz and result modal.
- Added two GCSE starter quiz modes: Quick check with 24 questions for roughly 15-20 minutes, and Full starter test with 72 questions for roughly 45-60 minutes.
- Reworked the GCSE starter question bank with original starter-readiness questions, not official GCSE exam board or past paper questions.
- Saved the latest GCSE starter quiz result and quiz mode locally with `techpathGcseStarterQuizResult`.
- Kept the GCSE path separate from the main Career Path Guide scored roles.

### v1.5-python-learning

- Added a dedicated Python Basics learning page.
- Included beginner-friendly explanations, Mocha Sapphire diagrams, real-life examples, quick exercises and mini-project tasks.
- Added the final Student Marks and Study Tracker beginner project.
- Kept the page static with plain HTML/CSS and no external libraries.

### v1.5-language-learning-pages

- Added beginner learning pages for JavaScript, Java, SQL, HTML and CSS.
- Matched the Python learning page structure with lesson docks, diagrams, code examples, key-words tables, quick exercises, mini-project tasks, checkpoints and final mini projects.
- Updated the homepage Build the Skills cards and sitemap links for the new pages.

### v1.5-business-landing-page

- Added the V1.5 Business Landing Page / Beta Services page.
- Added beta package information for GCSE Maths support, Python beginner coaching, readiness reports, data career starter support and international graduate job-search structure.
- Added homepage navigation and CTA links to the Business page.
- Kept support requests routed through the Contact page and LinkedIn, with no fake form, booking, payment or backend system.

### v1.6-manual-paid-beta

- Added manual paid beta intake through a Google Form request link.
- Kept the website static with no backend, payment system, fake form, booking system or account flow.

### v1.7-testimonials-case-studies

- Added a feedback collection route through a Google Form.
- Testimonials and case studies should only be published later using real feedback with permission.

## Future Improvements

- Add more career paths.
- Add more advanced learning modules for existing language pages.
- Add deeper quiz feedback.
- Add more questions and topic coverage.
- Add a built-in contact form in a future version.
- Consider AdSense only after indexing and content growth.
- Explore AI-generated questions in a future backend version only.
- Add a more structured 1-to-1 guidance and teaching workflow in a future version.

AI-generated questions are not currently implemented. The current project uses local hardcoded question banks and does not call an AI API.
