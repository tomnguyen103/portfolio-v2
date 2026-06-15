<div align="center">

# Tom Nguyen Portfolio

Full-stack and AI engineering portfolio for production web apps, LLM workflows, and selected project case studies.

<p>
  <a href="https://www.tomnguyen.me">
    <img alt="Live site" src="https://img.shields.io/badge/live-tomnguyen.me-0ea5e9?style=flat-square">
  </a>
  <img alt="Next.js 16.2.6" src="https://img.shields.io/badge/Next.js-16.2.6-000000?style=flat-square&logo=nextdotjs&logoColor=white">
  <img alt="React 19.2.4" src="https://img.shields.io/badge/React-19.2.4-149eca?style=flat-square&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Netlify" src="https://img.shields.io/badge/Netlify-deployed-00ad9f?style=flat-square&logo=netlify&logoColor=white">
</p>

<p>
  <a href="https://www.tomnguyen.me"><strong>View live site</strong></a>
  |
  <a href="https://github.com/tomnguyen103"><strong>GitHub</strong></a>
  |
  <a href="https://www.linkedin.com/in/tomnguyen103/"><strong>LinkedIn</strong></a>
</p>

</div>

## Overview

`portfolio-v2` is the source for Tom Nguyen's personal portfolio site. It presents a focused professional profile across the following sections:

1. Hero
2. About
3. Skills
4. Experience
5. Projects
6. Contact

The site is built as a fast, responsive Next.js app with bilingual content, theme controls, project case studies, HTML resume pages, Netlify contact capture, and GA4 event tracking.

## Highlights

- Responsive portfolio experience with fixed navigation, page progress, and section-aware active states.
- English and Vietnamese language toggle backed by shared translation data.
- Dark and light theme support with persisted user preference.
- Animated hero, section entrances, project cards, and reduced-motion support.
- Centralized skills, projects, experience entries, and tag styling in `lib/data.ts`.
- GA4 event wrapper in `lib/analytics.ts` and section-view tracking through `lib/useInViewTracking.ts`.
- Netlify-ready contact form with success, loading, and error states.
- Public resume routes for English and Vietnamese visitors.

## Content Updates

- Update portfolio content in `lib/data.ts`.
- Update bilingual page copy in `lib/translations.ts`.
- Add or replace project imagery in `public/images/`.
- Update resume pages in `public/resume.html` and `public/resume-vi.html`.
- Keep analytics calls routed through `lib/analytics.ts`.
