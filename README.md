# Tom Nguyen — Personal Portfolio

Live site: **[tomnguyen.me](https://www.tomnguyen.me)**

Personal portfolio built with Next.js 14 App Router, showcasing my experience, projects, skills, and contact information.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React + React Icons |
| Font | Inter (next/font/google) |
| Theme | next-themes (dark/light) |
| Contact form | Netlify Forms |
| Analytics | Google Analytics 4 (GA4) |
| Hosting | Netlify + Namecheap domain |

---

## Features

- Dark/light mode with system-independent toggle (persisted via localStorage)
- EN/VI language toggle with full content translation (persisted via localStorage)
- Animated gradient mesh hero background
- Typing/cycling role effect in hero subtitle
- Scroll-triggered stagger animations on all sections
- Responsive layout - mobile-first with hamburger nav
- Color-coded skill tags per technology category
- Project cards with GitHub and live demo links
- Work experience timeline section
- Contact form via Netlify Forms with loading and error states
- GA4 analytics: tracks page events (resume view, section views, link clicks, form submit)
- HTML resume pages in English (`/resume.html`) and Vietnamese (`/resume-vi.html`)

---

## Project Structure

```
portfolio-v2/
├── app/
│   ├── icon.jpg            # Favicon (profile photo)
│   ├── layout.tsx          # Root layout: fonts, ThemeProvider, metadata
│   ├── page.tsx            # Page composition
│   └── globals.css         # Tailwind directives + CSS tokens + animations
├── components/
│   ├── nav.tsx             # Fixed nav with scroll glass effect + mobile menu
│   ├── hero.tsx            # Full-viewport hero with typing effect
│   ├── skills.tsx          # Skills grid with animated cards
│   ├── projects.tsx        # Projects section
│   ├── experience.tsx      # Work experience timeline section
│   ├── contact.tsx         # Contact form + social links
│   ├── theme-toggle.tsx    # Dark/light icon button
│   ├── language-toggle.tsx # EN/VI language switcher button
│   ├── language-provider.tsx # LanguageProvider context + useLanguage hook
│   └── time-based-theme.tsx # (utility) time-aware theme helper
├── lib/
│   ├── data.ts             # All static content: skills, projects, experience, tag colors
│   ├── translations.ts     # EN/VI translation strings for all sections
│   ├── analytics.ts        # trackEvent() wrapper around window.gtag
│   └── useInViewTracking.ts # IntersectionObserver hook for GA4 section_viewed events
├── public/
│   ├── images/             # Profile photo + project screenshots
│   ├── MyResume.pdf        # Legacy resume PDF
│   ├── resume.html         # Live HTML resume page - English (linked from nav)
│   └── resume-vi.html      # Live HTML resume page - Vietnamese (linked when VI active)
├── netlify.toml
└── CLAUDE.md               # Project spec and requirements
```