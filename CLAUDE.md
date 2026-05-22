# Portfolio v2 — Requirements & Spec

## Overview

Personal portfolio for **Tom Nguyen**, Full Stack Developer & AI Engineer.
Live site: **https://www.tomnguyen.me**
Hosting pipeline: GitHub (portfolio-v2) → Netlify (auto-deploy on push to `main`) → Namecheap domain (tomnguyen.me)

This is a complete migration from a static HTML5/jQuery site to a modern Next.js application.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React (UI icons) + react-icons (brand icons: GitHub, LinkedIn) |
| Font | Inter via `next/font/google` |
| Contact form | Netlify Forms |
| Analytics | Google Analytics 4 (GA4) via `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Deployment config | `netlify.toml` in project root |

---

## Design System

### Theme
- **Default**: Time-based — light (6 am–6 pm) / dark (6 pm–6 am), set by `TimeBasedTheme` component on first load
- **Override**: Dark/light toggle in the nav bar; once the user picks a theme it is persisted via `localStorage` (`theme-user-set` flag) and `next-themes`, overriding time-based logic on future visits

### Color Palette

```
Dark mode:
  background:  #0a0a0f
  surface:     #111827
  accent:      #0ea5e9  (sky-500)
  accent-hover:#0284c7  (sky-600)
  text:        #f9fafb
  muted:       #6b7280

Light mode:
  background:  #ffffff
  surface:     #f8fafc
  accent:      #0ea5e9
  accent-hover:#0284c7
  text:        #0f172a
  muted:       #64748b
```

### Typography
- Font family: `Inter`, system-ui fallback
- Base font size: 112.5% (18px) — scales all rem units up
- Headings: font-bold, tracking-tight
- Body: font-normal, leading-relaxed

### Spacing & Shape
- Card border radius: `rounded-2xl`
- Pill/tag border radius: `rounded-full`
- Section padding: `py-20 pb-24` (with bottom space for scroll indicator)

### Animation Rules
- **Scroll entrance**: Framer Motion `whileInView` fade-up (`y: 40 → 0, opacity: 0 → 1`)
- **Stagger**: 0.1s delay between sibling cards
- **Hero subtitle**: Typing/cycling text effect (type → pause 2s → delete → next role)
- **Hero background**: Animated sky-blue gradient blobs (CSS `@keyframes blob`)
- **Card hover**: `whileHover` lift (`y: -6`) + sky-blue box-shadow glow
- **Nav**: Transparent over hero → `backdrop-blur` glass solid after scrolling past 80px
- **Scroll indicator**: Bouncing `ArrowDown` at bottom of Hero, Skills, Experience, and Projects sections

---

## Project File Structure

```
portfolio-v2/
├── app/
│   ├── icon.jpg            # Favicon — profile photo (overrides favicon.ico)
│   ├── layout.tsx          # Root layout: fonts, ThemeProvider, metadata
│   ├── page.tsx            # Page: composes all section components
│   └── globals.css         # Tailwind directives + CSS custom properties + blob keyframes
├── components/
│   ├── nav.tsx             # Fixed nav, scroll behavior, theme toggle, mobile menu
│   ├── hero.tsx            # Full-viewport hero section
│   ├── skills.tsx          # Skills grid section
│   ├── experience.tsx      # Work experience timeline section
│   ├── projects.tsx        # Projects section
│   ├── contact.tsx         # Contact form + social links section
│   ├── theme-toggle.tsx    # Dark/light icon button
│   └── time-based-theme.tsx # Sets theme on first load based on time of day
├── lib/
│   ├── data.ts             # All static content: skillCards, projects, experiences, tagColor map
│   ├── analytics.ts        # trackEvent() wrapper around window.gtag
│   └── useInViewTracking.ts # IntersectionObserver hook — fires section_viewed GA4 event once
├── public/
│   ├── images/
│   │   ├── pic00.jpg       # Profile photo
│   │   ├── pic01.png       # AI Flappy Bird screenshot
│   │   ├── pic04.png       # Development Plan Tool screenshot
│   │   └── pic06.png       # AI Language Learning App screenshot
│   ├── netlify.html        # Static form stub for Netlify Forms build-time detection
│   ├── MyResume.pdf        # Legacy resume PDF (kept for reference)
│   └── resume.html         # Live HTML resume page (linked from nav Resume button)
├── CLAUDE.md
├── README.md
├── netlify.toml
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Section Specifications

### Navigation (`components/nav.tsx`)
- Fixed to top, full width, z-50
- Logo/name: "Tom Nguyen" (left side)
- Nav links (right side): Home · Skills · Experience · Projects · Contact · Resume
  - All section links use smooth anchor scroll (`href="#section-id"`)
  - Resume opens `/resume.html` in a new tab; fires `resume_view` GA4 event
- Scroll behavior: `bg-transparent` at top → `.nav-glass` (backdrop-blur + border-b) after 80px scroll; also activates when mobile menu is open
- Mobile: hamburger menu — closes only when a nav link is tapped (not on scroll)
- Theme toggle icon button (rightmost item)

---

### Hero (`components/hero.tsx`)
- `min-h-screen` full viewport, centered content
- **Background**: Animated sky-blue gradient blobs (3 divs with `animate-blob` + `animation-delay-*`)
- **Layout**: `flex-col-reverse md:flex-row` — photo right on desktop, stacked (photo top) on mobile
- **Photo**: `images/pic00.jpg` — circular frame, sky ring/glow (`ring-2 ring-sky-500/40`)
- **Heading**: `Hi. I'm Tom Nguyen.` — large, bold, name in accent color
- **Subtitle**: Typing/cycling effect cycling through:
  - `"Mendix Developer"`
  - `"Software Developer"`
  - `"AI Agent Developer"`
  - `"Full Stack Developer"`
- **Bio**: "I specialize in architecting scalable web applications, automated solutions, and next-generation AI agents. CS graduate from Cal State LA with 1,000+ hours of hands-on engineering — from traditional enterprise systems to modern LLM workflows — building maintainable tools that drive real-world business value."
- **CTA buttons**:
  1. "My Skills" → smooth scroll to `#skills`
  2. "LinkedIn" → `https://www.linkedin.com/in/tomnguyen103/` (new tab)
  3. "GitHub" → `https://github.com/tomnguyen103` (new tab)
- **Scroll indicator**: bouncing `ArrowDown` → `#skills`

---

### Skills (`components/skills.tsx`)
- Section id: `#skills`
- Heading: "Skills" + subheading: "Technologies I work with"
- 6 cards in a responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Each card (`surface` background, `rounded-2xl`, hover lift + sky glow):
  - Lucide icon (large, accent color)
  - Category title (bold)
  - Skill tags: pill badges (`rounded-full`, color-coded per `tagColor` map in `lib/data.ts`)
- Scroll-triggered staggered fade-up entrance (Framer Motion `whileInView`)
- Scroll indicator at bottom → `#projects`

**Card data** (defined in `lib/data.ts`):

```ts
{ icon: Bot,      title: "AI & LLM Integration",   skills: ["AI Agent Architecture", "Prompt Engineering", "Gemini SDK", "LLM Workflows"] },
{ icon: Code2,    title: "Languages & Web",         skills: ["JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3"] },
{ icon: Layers,   title: "Frameworks",              skills: ["MEAN Stack", "Django", "Flask", "Spring Framework", "Mendix"] },
{ icon: Database, title: "Databases & ORMs",        skills: ["MySQL", "MongoDB", "SQLite", "Prisma Postgres"] },
{ icon: Cloud,    title: "Cloud & DevOps",          skills: ["AWS EC2", "Vercel", "Trigger.dev", "Git/GitHub"] },
{ icon: Zap,      title: "Modern Infrastructure",   skills: ["Clerk", "Liveblocks", "Stream Video SDK", "Zustand", "RESTful API Design"] },
```

---

### Experience (`components/experience.tsx`)
- Section id: `#experience`
- Heading: "Experience" + subheading: "Where I've worked"
- Layout: vertical timeline with a sky-blue `0.5px` left border; each entry has a sky-500 dot marker
- Each entry shows: company + type badge, date-range pill (sky-500 tint), job title, location, bullet list
- Staggered fade-up entrance (0.1s delay per entry, `whileInView`)
- Scroll indicator at bottom → `#projects`
- Uses `useInViewTracking("experience")` to fire `section_viewed` GA4 event

**Experience data** (defined in `lib/data.ts` as `experiences: Experience[]`):

| Company | Title | Period |
|---|---|---|
| Texas Regional Physicians | Software Developer | Apr 2024 – Present |
| Memorial MRI and Diagnostic | Software Developer | Nov 2021 – Apr 2024 |
| Coding Dojo | Resident Full Stack Developer | Sep 2019 – Nov 2021 |

---

### Projects (`components/projects.tsx`)
- Section id: `#projects`
- Heading: "Projects" + subheading: "Things I've built"
- Background: `bg-surface/30` to differentiate from Skills section
- Layout: vertical stack of horizontal cards (`flex-col md:flex-row`)
  - Image: left side, `w-full md:w-3/5`, `object-cover` (or `object-contain` + dark bg for UI screenshots)
  - Content: right side with title, bullet list, tech pills, GitHub/Demo buttons
- Card hover: sky-blue box-shadow glow
- Scroll-triggered fade-up entrance (staggered by index)
- Scroll indicator at bottom → `#contact`

**Project data** (defined in `lib/data.ts`):

```ts
{
  title: "Development Plan Tool",
  image: "/images/pic04.png",
  imageFit: "contain",
  description: [
    "Real-time collaborative system architecture builder with AI assistance",
    "Interactive React Flow diagram editor with live cursors and presence avatars",
    "AI-powered design suggestions and auto-generated technical specs via Gemini",
  ],
  tech: ["Next.js", "TypeScript", "Prisma Postgres", "Liveblocks", "Trigger.dev", "Gemini", "Clerk", "Vercel"],
  github: "https://github.com/tomnguyen103/Development-Plan-Tool",
  demo: "https://development-tool.tomnguyen.me/",
},
{
  title: "AI Language Learning App",
  image: "/images/pic06.png",
  description: [
    "AI-powered language learning mobile app — a modern alternative to Duolingo",
    "Real-time audio calls with an AI teacher, live captioning and pronunciation feedback",
    "Supports 4 languages with 12 structured lessons and daily XP streak tracking",
  ],
  tech: ["React Native", "Expo", "TypeScript", "Stream Video SDK", "Clerk", "NativeWind", "Zustand"],
  github: "https://github.com/tomnguyen103/MyFirstMobileApp",
},
{
  title: "AI Flappy Bird",
  image: "/images/pic01.png",
  description: [
    "Rewrote basic HTML Flappy Bird into an AI-driven version",
    "Applied Reinforcement Learning and Neural Network concepts",
    "Implemented Genetic Algorithm for agent evolution",
  ],
  tech: ["JavaScript", "HTML/CSS", "Neural Network", "Genetic Algorithm", "Reinforcement Learning"],
  github: "https://github.com/tomnguyen103/AI_Flappy_Bird",
  demo: "https://youtu.be/uf1wSdsGWUs",
},
```

---

### Contact (`components/contact.tsx`)
- Section id: `#contact`
- Heading: "Let's Work Together"
- Subheading: "Have a project in mind? I'd love to hear about it."
- **Form** (Netlify Forms — POST to `"/"` with `application/x-www-form-urlencoded`):
  - `data-netlify="true"`, `name="contact"`, hidden `form-name` input
  - Fields: Name, Email, Subject, Message (all required), laid out in 2-col grid (Name + Email)
  - Submit button: "Send Message" with Send icon, full-width, disabled + opacity during loading
  - Success state: replaces form with confirmation message
  - Error state: inline red error message below submit button
- **Email link**: `tom.nguyen.nht@gmail.com`
- **Social links** below form: GitHub + LinkedIn icon buttons
- **Footer**: `© Tom Nguyen. All rights reserved.`

**Netlify Forms note**: `public/netlify.html` contains a static HTML stub of the form so Netlify's build bot can detect it at build time (required for Next.js App Router — the dynamic render is not scanned).

---

## Analytics (GA4)

GA4 is loaded in `app/layout.tsx` via Next.js `<Script strategy="afterInteractive">` and is gated on the `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var — if the var is absent no scripts are injected and no events fire.

**`lib/analytics.ts`** — exports a single `trackEvent(eventName, params?)` helper that calls `window.gtag("event", ...)` and is a no-op during SSR or when gtag is not initialized.

**`lib/useInViewTracking.ts`** — React hook wrapping `IntersectionObserver` (threshold 0.3). Fires `section_viewed` once per section per page load, then disconnects.

### Tracked events

| Event | Where fired | Extra params |
|---|---|---|
| `resume_view` | Nav — Resume link (desktop + mobile) | — |
| `section_viewed` | Skills, Experience, Projects, Contact | `{ section }` |
| `linkedin_click` | Hero CTA, Contact social links | `{ location }` |
| `github_click` | Hero CTA, Projects cards, Contact social links | `{ location }` |
| `project_demo_click` | Projects — Demo button | `{ project_title }` |
| `email_click` | Contact — mailto link | — |
| `contact_form_submit` | Contact — form submit | — |

---

## Metadata (`app/layout.tsx`)

```ts
title: "Tom Nguyen | Full Stack & AI Developer"
description: "Full Stack Developer & AI Engineer specializing in scalable web applications, AI agent architecture, and LLM workflows. Experienced with Next.js, React Native, Django, Mendix, and Gemini SDK. CS graduate from Cal State LA."
```

Favicon: `app/icon.jpg` (profile photo — App Router file-based icon convention, overrides any favicon.ico)

---

## Deployment Configuration

### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Netlify setup steps
1. Push `portfolio-v2` repo to GitHub
2. Connect repo to Netlify (New site → Import from GitHub)
3. Build command: `npm run build` | Publish dir: `.next`
4. Install Netlify plugin for Next.js: `@netlify/plugin-nextjs`
5. In Namecheap DNS: update CNAME/A record to point `tomnguyen.me` → Netlify app URL
6. Add custom domain in Netlify → enable HTTPS (Let's Encrypt auto)

---

## Development Setup

```bash
# Install dependencies
npm install

# Dev server
npm run dev        # http://localhost:3000

# Production build check
npm run build
npm run start
```

---

## Standing Rules

### Keep `resume.html` and `resume-vi.html` in sync
Whenever any of the following are modified, **always update `public/resume.html`**, **`public/resume-vi.html`**, and the relevant strings in **`lib/translations.ts`** (`vi` key) at the end of the task:
- `lib/data.ts` — experiences, projects, or skillCards
- `components/hero.tsx` — bio text or subtitle roles
- `components/contact.tsx` — email address or social links
- Any other content that appears on the resume (phone number, summary, etc.)

This ensures both resume pages and the live site always reflect the latest portfolio content without needing a manual reminder.

### Project links in `resume.html` and `resume-vi.html`
Each project entry shows masked link text — never raw URLs:
- Always include a **GitHub** link labeled `"GitHub"`
- If the project has a `demo` URL, include it after a `|` separator labeled `"Live Demo"` (or `"Demo Video"` for YouTube links)
- Example: `GitHub | Live Demo`

### All links in `resume.html` and `resume-vi.html` open in a new tab
Both `resume.html` and `resume-vi.html` include an inline script at the bottom that sets `target="_blank"` and `rel="noopener noreferrer"` on every `<a>` tag automatically. Do not remove this script from either file — it ensures the resume page stays open when a visitor clicks any link.

---

## Out of Scope (v2)
- Blog / notes section
- CMS integration
- i18n / localization
- IE/legacy browser support
