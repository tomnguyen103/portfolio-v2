# Portfolio v2 - Requirements & Spec

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
| Styling | Tailwind CSS v4 (CSS-based config via `@theme` in `globals.css`; no `tailwind.config`) |
| Animations | Framer Motion |
| Icons | Lucide React (UI icons) + react-icons (brand icons: GitHub, LinkedIn) |
| Font | Archivo (display) + Geist (sans/body) + Geist Mono (labels) via `next/font/google` |
| Contact form | Netlify Forms |
| Analytics | Google Analytics 4 (GA4) via `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Deployment config | `netlify.toml` in project root |

---

## Design System - "The Monograph"

The site is styled like a curated design monograph / arts publication: light, type-led, near-monochrome, carried by typography, structure, and whitespace rather than color.

### Theme
- **SSR default**: light (the editorial primary impression)
- **Time-based**: `TimeBasedTheme` sets light (6 am-6 pm) / dark (6 pm-6 am) on first load
- **Override**: light/dark toggle in the masthead; once the user picks a theme it persists via `localStorage` (`theme-user-set` flag) and `next-themes`, overriding time-based logic

### Color Palette
Near-monochrome. One accent only: oxblood (a lit clay in the dark "ink edition"), used only for live marks (links, the eyebrow tick, the active nav link, the scroll rule, the drop cap, demo links). No blue, no purple, no gradient headings. Raw tokens live in `app/globals.css`, switched on the `.dark` class and exposed to Tailwind via `@theme inline`.

```text
Light (the page - warm newsprint paper):
  background:   #efece4   (warm newsprint, desaturated - not a cream cliche)
  surface:      #f6f4ee
  surface-2:    #ffffff   (inputs / highest)
  foreground:   #16140f   (warm near-black ink)
  muted:        #6a6456
  faint:        #97917f   (tertiary metadata)
  accent:       #6e2a24   (oxblood)
  accent-hover: #531c18
  on-accent:    #f3efe6
  hairline:        rgba(22,20,15,0.16)
  hairline-strong: rgba(22,20,15,0.42)

Dark (the "ink edition"):
  background:   #131210   (warm near-black)
  surface:      #1b1a16
  surface-2:    #232118
  foreground:   #ece6da   (warm bone)
  muted:        #968f7f
  faint:        #6a655a
  accent:       #cf7257   (lit clay - the oxblood brightened for ink)
  accent-hover: #e08a6f
  on-accent:    #16140f
  hairline:        rgba(236,230,218,0.14)
  hairline-strong: rgba(236,230,218,0.40)
```

### Typography
- **Display**: `Archivo` (`--font-display` / the `.font-display` utility) - a clean, professional editorial grotesque used for the masthead, big section numerals, and headings; tight tracking. No serif.
- **Body**: `Geist` (sans, `--font-geist-sans`), system-ui fallback
- **Mono**: `Geist Mono` (`--font-mono`) via the `.label` utility - eyebrows, section/metadata labels, date ranges, tech specs, nav links, colophon
- All three load via `next/font/google` in `app/layout.tsx`
- Base font size: 112.5% (18px)
- The masthead name renders without an `overflow:hidden` mask and with relaxed leading + bottom padding so descenders (the g/y in "Nguyen") never clip

### Spacing & Layout
- Standard section padding: `py-24 md:py-32`; Hero is `min-h-[100dvh]`
- Container: `max-w-[78rem]` with `px-6`; sections use an asymmetric **12-column grid** (a 3-col marginalia rail of the numeral + label, a 9-col content column)
- Corners are near-square: `rounded-sm` for image plates and the portrait; buttons are square (`rounded-[2px]`), not pills
- Hairlines (`--hairline` / `--hairline-strong`) carry structure: the masthead underline, section dividers, ruled list rows, the experience entries, the form field underlines, the colophon
- Section numerals **01-05** (big faint Archivo) sit in the marginalia rail as a real table-of-contents sequence (About 01 · Skills 02 · Experience 03 · Projects 04 · Contact 05; the hero is the unnumbered cover)

### Signature
Editorial **reveals over effects**: masthead lines fade-rise on load; a hairline **rule draws from the left** (`.draw-line`) under the cover and as the nav scroll-progress bar; the opening About paragraph uses a **drop cap** (`.dropcap`, oxblood); links draw an **underline from the left** on hover (`.link-underline`). Big marginalia numerals are the structural motif.

### Animation Rules (Framer Motion + CSS; restrained, all gated by `useReducedMotion` / `prefers-reduced-motion`)
- **Hero load**: eyebrow, masthead lines, coverline, and CTAs fade-rise (`opacity` + `y`) with a stagger; portrait fades in
- **Scroll entrance**: `whileInView` fade-up (`y: 20-36 -> 0`), once, light stagger per row/entry/plate
- **Nav**: thin masthead slides down on mount; active section link in accent (IntersectionObserver, `-45% 0px -50%` band); scroll-progress drawn as an oxblood hairline on the masthead's lower edge (Framer `useScroll` + `useSpring`, no manual scroll listener)
- **Buttons**: `.btn` press (`translateY(1px)`); primary fills with ink and inverts on hover
- **Project plates**: image scales subtly on hover (`.plate-img` / `.plate:hover`)
- **About stats**: count up from 0 on first scroll-into-view (Archivo numerals); instant under reduced motion
- **Back to top**: editorial "Top" button appears after 700px (`useScroll` + `useMotionValueEvent`, no window scroll listeners)
- **Material**: a fixed, `pointer-events-none` paper-grain overlay (`.grain`, ~3-5%)
- **Reduced motion**: global `@media (prefers-reduced-motion: reduce)` block plus per-component `useReducedMotion`

### Global UX polish (`globals.css`)
- `::selection` tinted with the accent; thin theme-aware scrollbar; `:focus-visible` accent outline
- `section[id] { scroll-margin-top: 5.5rem }` so anchored sections clear the fixed masthead
- Utilities: `.font-display`, `.label`, `.link-underline`, `.draw-line`, `.dropcap`, `.mask` + `.rise`, `.btn` / `.btn-primary` / `.btn-ghost`, `.field`, `.plate-img`, `.grain`
- Removed in the Monograph rebuild (vs the prior dark "Obsidian & Ember" design): the ember/bronze accent, `.nav-glass` floating island, `.card-spotlight`, the skills marquee (`.animate-marquee`), the experience ledger spine, the project tabs, the hero role cross-fade, and the duotone portrait treatment

---

## Project File Structure

```
portfolio-v2/
├── app/
│   ├── icon.jpg            # Favicon - profile photo (overrides favicon.ico)
│   ├── layout.tsx          # Root layout: fonts (Archivo/Geist/Geist Mono), grain overlay, ThemeProvider (default light), metadata
│   ├── page.tsx            # Page: composes all section components
│   └── globals.css         # Tailwind + "Monograph" tokens + editorial utilities (label/field/dropcap/draw-line/grain) + reduced-motion
├── components/
│   ├── nav.tsx             # Publication masthead: wordmark + mono nav links, scroll-progress rule, active-section, theme/language toggles, mobile menu
│   ├── hero.tsx            # Cover: eyebrow, stacked masthead (fade-rise), drawn rule, coverline, CTAs, full-color portrait plate
│   ├── about.tsx           # About (01): drop-cap editorial lead + count-up stats
│   ├── skills.tsx          # Skills (02): typeset capability index (hairline-ruled rows)
│   ├── experience.tsx      # Experience (03): ruled editorial CV (mono date column + clean bullets)
│   ├── projects.tsx        # Projects (04): six full editorial plates, numbered, varied composition
│   ├── contact.tsx         # Contact (05): ruled underline form + direct-contact column + colophon footer
│   ├── back-to-top.tsx     # Floating editorial "Top" button (appears after 700px scroll)
│   ├── theme-toggle.tsx    # Dark/light icon button
│   ├── language-toggle.tsx # EN/VI language switcher button
│   ├── language-provider.tsx # LanguageProvider context + useLanguage hook
│   └── time-based-theme.tsx # Sets theme on first load based on time of day
├── lib/
│   ├── data.ts             # All static content: skillCards, projects, experiences (tagClass export is now legacy/unused)
│   ├── translations.ts     # EN/VI translation strings for all sections
│   ├── analytics.ts        # trackEvent() wrapper around window.gtag
│   └── useInViewTracking.ts # IntersectionObserver hook - fires section_viewed GA4 event once
├── public/
│   ├── images/
│   │   ├── pic00.jpg       # Profile photo
│   │   ├── second-brain-portfolio-demo-chat.png # Second Brain Portfolio Demo screenshot
│   │   ├── ai-financial-v2.png # AI Financial Platform screenshot
│   │   ├── ai_flappy_bird_demo.png # AI Flappy Bird screenshot
│   │   ├── pic04.png       # Development Plan Tool screenshot
│   │   ├── pic06.png       # AI Language Learning App screenshot
│   │   └── sudoku-v2.png   # Sudoku Solver Visualizer screenshot
│   ├── __forms.html        # Static form stub for Netlify Forms build-time detection
│   ├── MyResume.pdf        # Legacy resume PDF (kept for reference)
│   ├── resume.html         # Live HTML resume page (English, linked from nav Resume button)
│   └── resume-vi.html      # Live HTML resume page (Vietnamese, linked when VI locale active)
├── CLAUDE.md
├── README.md
├── netlify.toml
├── next.config.ts
└── package.json
```

---

## Section Specifications

### Navigation (`components/nav.tsx`)
- A thin **publication masthead** fixed to the top (`max-w-[78rem]`, hairline bottom border, paper backdrop-blur, `z-50`); slides down on mount. Not a floating pill.
- Wordmark "Tom Nguyen" (left, `.font-display`)
- Nav links: Home · About · Skills · Experience · Projects · Contact, then a Resume link - all `font-mono` uppercase micro-labels
  - Links show at `lg` and up; below `lg` they collapse to a hamburger menu (mobile menu lists numbered links + Resume)
  - All section links use smooth anchor scroll (`href="#section-id"`); About scrolls to `#about`
  - Resume opens `/resume.html` (EN) or `/resume-vi.html` (VI) in a new tab; fires `resume_view` GA4 event
- **Scroll progress**: a thin oxblood hairline along the masthead's lower edge, `scaleX` driven by Framer `useScroll` + `useSpring`
- **Active section highlight**: IntersectionObserver (rootMargin `-45% 0px -50% 0px`); active link renders in accent + `aria-current`
- Language toggle (EN/VI, persists to localStorage) + theme toggle, separated by a hairline divider; hamburger has `aria-expanded`

---

### Hero / Cover (`components/hero.tsx`)
- `min-h-[100dvh]`, `justify-start` on mobile / `lg:justify-center`, so the masthead always leads (it is not vertically centered into clipping on mobile)
- **Eyebrow**: `.label` `t.hero.availability` with a small oxblood square marker
- **Masthead**: "Tom" / "Nguyen" stacked, `.font-display` (Archivo) `text-[16vw] sm:text-[13vw] lg:text-[9rem]`, `leading-[0.92]` + bottom padding so descenders never clip; lines fade-rise on load
- **Rule**: a hairline `.draw-line` drawn across on load
- **Coverline**: one positioning line (`t.hero.tagline`), set large and light
- **CTAs**: primary "View work" (`t.hero.cta.work`) to `#projects` (square ink `.btn-primary`); "Get in touch" (`t.hero.cta.contact`) to `#contact` as a `.link-underline`; then GitHub + LinkedIn icon links (fire `github_click` / `linkedin_click` with `location: "hero"`)
- **Portrait**: `images/pic00.jpg` - clear, **full-color** headshot in a `rounded-sm` hairline frame (no B&W/duotone, no dimming scrim); fades in. Sits right on desktop, below the CTAs on mobile.

---

### About (01) (`components/about.tsx`)
- Section id: `#about`
- Marginalia rail: big faint `01` numeral + `t.hero.aboutLabel` label
- Editorial lead: the full bio (`t.hero.bio`) with a `.dropcap` first letter (oxblood)
- **Stats row** (hairline top border): three count-up stats in `.font-display` numerals - `4+` Years Experience, Featured Projects (`projects.length`), Companies (`experiences.length`); labels from `t.about.stats`; animate 0 -> value once in view (instant under reduced motion)

---

### Skills (02) (`components/skills.tsx`)
- Section id: `#skills`
- Marginalia rail: `02` numeral + heading "Skills" (`.font-display`) + subheading "Technologies I work with"
- **Capability index**: the 6 `skillCards` as hairline-ruled rows - category title (`.font-display`) on the left, the skills typeset as right-aligned `font-mono` text on the right; staggered `whileInView` entrance. No marquee, no icons, no pills.

**Card data** (defined in `lib/data.ts`; the `icon` field is now unused by the editorial layout):

```ts
{ title: "AI & LLM Integration",   skills: ["AI Agent Architecture", "Prompt Engineering", "Gemini SDK", "LLM Workflows"] },
{ title: "Languages & Web",         skills: ["JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3"] },
{ title: "Frameworks",              skills: ["MEAN Stack", "Django", "Flask", "Spring Framework", "Mendix"] },
{ title: "Databases & ORMs",        skills: ["MySQL", "MongoDB", "SQLite", "Prisma Postgres"] },
{ title: "Cloud & DevOps",          skills: ["AWS EC2", "Vercel", "Trigger.dev", "Git/GitHub"] },
{ title: "Modern Infrastructure",   skills: ["Clerk", "Liveblocks", "Stream Video SDK", "Zustand", "RESTful API Design"] },
```

---

### Experience (03) (`components/experience.tsx`)
- Section id: `#experience`
- Marginalia rail: `03` numeral + heading "Experience" + subheading "Where I've worked"
- Each role is a ruled editorial entry (hairline top border): a left mono column (date range in oxblood, location, type) and a right column (company in `.font-display`, job title, and bullets as clean spaced lines - no dash/tick markers)
- Staggered fade-up entrance; uses `useInViewTracking("experience")` to fire `section_viewed`

**Experience data** (defined in `lib/data.ts` as `experiences: Experience[]`):

| Company | Title | Period |
|---|---|---|
| Texas Regional Physicians | Software Developer | Apr 2024 - Present |
| Memorial MRI and Diagnostic | Software Developer | Nov 2021 - Apr 2024 |
| Coding Dojo | Resident Full Stack Developer | Sep 2019 - Nov 2021 |

---

### Projects (04) (`components/projects.tsx`)
- Section id: `#projects`
- Marginalia rail: `04` numeral + heading "Projects" + subheading "Things I've built"
- **Editorial plates**: all 6 projects render as large numbered plates (01-06) in a vertical sequence (no tabs). Composition varies per plate via a `LAYOUTS` array (`full` = full-bleed image with caption below, `left` / `right` = image and caption side by side) so no more than two side-by-side splits ever sit in a row.
  - Image: `next/image` with `fill`; `object-cover` (or `object-contain` + `imageBg` for UI screenshots) in a `rounded-sm` hairline frame; scales subtly on hover (`.plate-img`)
  - Caption: plate number + (on plate 01) a `Featured` label (`t.projects.featured`), title (`.font-display`), description bullets (clean spaced lines), tech as inline `font-mono` spec text, and `GitHub` + `Live demo` editorial links
- The first plate is marked `Featured`. Everything stacks to a single column on mobile.

**Project data** (defined in `lib/data.ts` as `projects: Project[]`, newest-first - this order is the plate sequence 01-06):

| # | Title | Image | Tech | Links |
|---|---|---|---|---|
| 01 | Second Brain Portfolio Demo | `second-brain-portfolio-demo-chat.png` (contain, `#e8dfd1`) | Next.js 16, React 19, TypeScript, Tailwind CSS, TanStack Query, Framer Motion, Netlify | GitHub + demo (second-brain.tomnguyen.me) |
| 02 | AI Financial Platform | `ai-financial-v2.png` (contain, `#0d1117`) | Python, FastAPI, scikit-learn, pandas, SQLite, Docker, RAG Retrieval | GitHub + demo (financial.tomnguyen.me) |
| 03 | Sudoku Solver Visualizer | `sudoku-v2.png` (contain, `#ffffff`) | JavaScript, HTML/CSS, PWA, Service Worker, Algorithms, Netlify | GitHub + demo (sudoku.tomnguyen.me) |
| 04 | Development Plan Tool | `pic04.png` (contain) | Next.js, TypeScript, Prisma Postgres, Liveblocks, Trigger.dev, Gemini, Clerk, Vercel | GitHub + demo (development-tool.tomnguyen.me) |
| 05 | AI Language Learning App | `pic06.png` (cover) | React Native, Expo, TypeScript, Stream Video SDK, Clerk, NativeWind, Zustand | GitHub |
| 06 | AI Flappy Bird | `ai_flappy_bird_demo.png` (contain, `#1c8da5`) | JavaScript, HTML/CSS, Neural Network, Genetic Algorithm, Reinforcement Learning | GitHub + demo (bird.tomnguyen.me) |

Full descriptions live in `lib/data.ts` (EN) and `lib/translations.ts` (`projects.items`, EN/VI, indexed in the same order as the data array) - keep both in sync when editing.

---

### Contact (05) (`components/contact.tsx`)
- Section id: `#contact`
- Marginalia rail: `05` numeral + `Contact` label
- A large editorial headline "Let's Work Together" (`.font-display`) + subheading, then a two-column block: the form (left) and a direct-contact column (right, hairline divider)
- **Form** (Netlify Forms - POST to `/__forms.html` with `application/x-www-form-urlencoded`):
  - `data-netlify="true"`, `name="contact"`, hidden `form-name` input, honeypot `bot-field`
  - Fields: Name, Email, Subject, Message (all required), each a **ruled underline field** (`.field`, no boxes) with a `.label` above
  - Submit: square ink `.btn-primary` "Send Message" with arrow, disabled + opacity during loading
  - Success state replaces the form; error state shows an inline `role="alert"` message
- **Direct column**: a large `tom.nguyen.nht@gmail.com` link (`.link-underline`), then GitHub + LinkedIn text links (fire `email_click` / `github_click` / `linkedin_click` with `location: "contact"`)
- **Colophon footer**: `© Tom Nguyen. All rights reserved.` + `Set in Archivo & Geist` (mono, hairline top border)

**Netlify Forms note**: `public/__forms.html` contains a static HTML stub of the form so Netlify's build bot can detect it at build time (required for Next.js App Router - the dynamic render is not scanned). The client submits to `/__forms.html`.

A floating **back-to-top** button (`components/back-to-top.tsx`) renders site-wide from `app/page.tsx`: fixed bottom-right, appears after 700px of scroll (`useScroll` + `useMotionValueEvent`), smooth-scrolls to `#top`; aria-label from `t.nav.backToTop`.

---

## Analytics (GA4)

GA4 is loaded in `app/layout.tsx` via Next.js `<Script strategy="afterInteractive">` and is gated on the `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var - if the var is absent no scripts are injected and no events fire.

**`lib/analytics.ts`** - exports a single `trackEvent(eventName, params?)` helper that calls `window.gtag("event", ...)` and is a no-op during SSR or when gtag is not initialized.

**`lib/useInViewTracking.ts`** - React hook wrapping `IntersectionObserver` (threshold 0.3). Fires `section_viewed` once per section per page load, then disconnects.

### Tracked events

| Event | Where fired | Extra params |
|---|---|---|
| `resume_view` | Nav - Resume link (desktop + mobile) | - |
| `section_viewed` | Skills, Experience, Projects, Contact | `{ section }` |
| `linkedin_click` | Hero, Contact | `{ location }` |
| `github_click` | Hero, Projects plates, Contact | `{ location }` or `{ project_title }` |
| `project_demo_click` | Projects - Live demo link | `{ project_title }` |
| `email_click` | Contact - mailto link | - |
| `contact_form_submit` | Contact - form submit | - |

(The `project_tab_click` event was removed with the project tabs in the Monograph rebuild.)

---

## Metadata (`app/layout.tsx`)

```ts
title: "Tom Nguyen | Full Stack & AI Developer"
description: "Full Stack Developer & AI Engineer specializing in scalable web applications, AI agent architecture, and LLM workflows. Experienced with Next.js, React Native, Django, Mendix, and Gemini SDK. CS graduate from Cal State LA."
```

Also set: `metadataBase` (`https://www.tomnguyen.me`), `keywords`, `authors`/`creator`, full `openGraph` (type website, siteName, locale `en_US`, image `/images/pic00.jpg`) and `twitter` (`summary` card) blocks, plus a `viewport` export with light/dark `themeColor` (`#efece4` / `#131210`).

Favicon: `app/icon.jpg` (profile photo - App Router file-based icon convention, overrides any favicon.ico)

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

### Keep `CLAUDE.md` up to date
At the end of every task, before asking to push to GitHub, always update `CLAUDE.md` to reflect what changed:
- New files or components added - add them to the file structure
- Removed files - remove them from the file structure
- New features or behaviors - update or add the relevant section spec
- New standing rules established during the task - add them to Standing Rules
- Anything in Out of Scope that is now implemented - remove it

Then tell the user: "CLAUDE.md has been updated to reflect [brief summary of what changed]. Ready to push to GitHub - should I go ahead?"

Do not ask to push without confirming CLAUDE.md was updated first.

### Keep `resume.html` and `resume-vi.html` in sync
Whenever any of the following are modified, **always update `public/resume.html`**, **`public/resume-vi.html`**, and the relevant strings in **`lib/translations.ts`** (`vi` key) at the end of the task:
- `lib/data.ts` - experiences, projects, or skillCards
- `components/hero.tsx` - bio text or subtitle roles
- `components/contact.tsx` - email address or social links
- Any other content that appears on the resume (phone number, summary, etc.)

This ensures both resume pages and the live site always reflect the latest portfolio content without needing a manual reminder.

### Project links in `resume.html` and `resume-vi.html`
Each project entry shows masked link text - never raw URLs:
- Always include a **GitHub** link labeled `"GitHub"`
- If the project has a `demo` URL, include it after a `|` separator labeled `"Live Demo"` (or `"Demo Video"` for YouTube links)
- Example: `GitHub | Live Demo`

### Use single dash everywhere
Always use a plain hyphen `-` as a separator or dash in all files across the project - HTML, TSX, TS, and any other content. Never use an em dash or en dash (or their HTML entities) anywhere in visible content or string literals.

### All links in `resume.html` and `resume-vi.html` open in a new tab
Both `resume.html` and `resume-vi.html` include an inline script at the bottom that sets `target="_blank"` and `rel="noopener noreferrer"` on every `<a>` tag automatically. Do not remove this script from either file - it ensures the resume page stays open when a visitor clicks any link.

### Print pagination in `resume.html` and `resume-vi.html`
Both resume files include `@media print` rules to prevent awkward page breaks. Key rules:
- `break-inside: avoid` + `page-break-inside: avoid` on `.entry` - keeps each job/project block whole (pushes it to the next page rather than splitting mid-entry)
- `break-after: avoid` + `page-break-after: avoid` on `.section-title` - prevents section headings from orphaning at the bottom of a page
- `break-inside: avoid` + `page-break-inside: avoid` on `.edu-entry` - keeps education entries whole
- `orphans: 2; widows: 2` on `li` and `p` - prevents single lines stranding at page edges

Always include both the modern (`break-*`) and legacy (`page-break-*`) properties - Chrome's print engine responds more reliably to the legacy form.

---

## Out of Scope (v2)
- Blog / notes section
- CMS integration
- IE/legacy browser support
