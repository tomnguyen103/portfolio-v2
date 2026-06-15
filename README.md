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

## Stack

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16.2.6 App Router |
| Runtime UI | React 19.2.4 |
| Language | TypeScript |
| Styling | Tailwind CSS with custom tokens in `app/globals.css` |
| Motion | Framer Motion |
| Icons | Lucide React and React Icons |
| Fonts | Geist and Geist Mono via `next/font` |
| Theme | `next-themes` with class-based dark mode |
| Forms | Netlify Forms |
| Analytics | Google Analytics 4 |
| Hosting | Netlify with custom domain |

## Project Structure

```text
portfolio-v2/
  app/
    layout.tsx          Root layout, metadata, providers, GA4 script
    page.tsx            Page composition and section order
    globals.css         Tailwind import, design tokens, global animations
  components/
    nav.tsx             Fixed navigation, mobile menu, progress bar
    hero.tsx            Opening profile section and calls to action
    about.tsx           Professional summary section
    skills.tsx          Skill categories and technology marquee
    experience.tsx      Work history timeline
    projects.tsx        Project case studies and links
    contact.tsx         Netlify form and social links
  lib/
    data.ts             Static skills, projects, experience, and tag styles
    translations.ts     English and Vietnamese UI copy
    analytics.ts        GA4 event helper
    useInViewTracking.ts Section-view analytics hook
  public/
    images/             Profile and project media
    resume.html         English HTML resume
    resume-vi.html      Vietnamese HTML resume
  netlify/
    functions/          Netlify form notification function
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

## Content Updates

- Update portfolio content in `lib/data.ts`.
- Update bilingual page copy in `lib/translations.ts`.
- Add or replace project imagery in `public/images/`.
- Update resume pages in `public/resume.html` and `public/resume-vi.html`.
- Keep analytics calls routed through `lib/analytics.ts`.

## Deployment

The site is configured for Netlify deployment. Contact form submissions are handled through Netlify Forms, and GA4 is enabled when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is available in the deployment environment.
