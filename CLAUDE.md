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
| Styling | Tailwind CSS v4 (CSS-based config via `@theme` in `globals.css`; no `tailwind.config`) |
| Animations | Framer Motion |
| Icons | Lucide React (UI icons) + react-icons (brand icons: GitHub, LinkedIn) |
| Font | Geist (sans) + Geist Mono via `next/font/google` |
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
- Font family: `Geist` (sans), system-ui fallback; `Geist Mono` for tech-tag pills and date ranges (via the `font-mono` utility / `--font-mono` token)
- Base font size: 112.5% (18px), scales all rem units up
- Headings: font-bold, tracking-tight
- Body: font-normal, leading-relaxed

### Spacing & Shape
- Card border radius: `rounded-2xl`
- Pill/tag border radius: `rounded-full`
- Section padding: `py-24 md:py-32` for standard sections; Hero is `min-h-[100dvh]`
- Tech-tag pills: one neutral style via `tagClass` in `lib/data.ts` (`bg-foreground/[0.04] text-foreground/70 border-foreground/10`) + `font-mono`; sky-blue stays the page's only accent color

### Animation Rules
- **Scroll entrance**: Framer Motion `whileInView` fade-up (`y: 40 → 0, opacity: 0 → 1`), gated by `useReducedMotion`
- **Stagger**: 0.1s delay between sibling cards
- **Hero subtitle**: Typing/cycling text effect (type → pause 2s → delete → next role); shows a static role under reduced motion
- **Hero background**: Subtle technical dot-grid field (`.bg-dot-grid`, theme-aware, edge-faded via mask) + static accent wash (`.hero-glow`, two faint radial gradients, no animation) - replaces the old animated blobs
- **Hero avatar ring**: slow-rotating sky conic arc around the portrait (`.avatar-ring`, CSS `@keyframes spin-slow`, 12s loop; freezes under reduced motion)
- **Hero scroll hint**: mouse-pill indicator at the hero's bottom edge (desktop only) with a bouncing accent dot (`.animate-scroll-dot`); links to `#about`
- **Skills marquee**: Auto-scrolling brand-logo strip (`.animate-marquee`, CSS `@keyframes marquee`); pauses on hover, static under reduced motion
- **About stats**: numbers count up from 0 on first scroll-into-view (Framer `animate()` + `useInView`); set instantly under reduced motion
- **Project card hover**: `whileHover` lift (`y: -4`) + border brightens to `accent/40` + image zoom (`group-hover:scale-[1.04]`) + cursor-following accent spotlight (`.card-spotlight`, hover-capable pointers only)
- **Experience timeline**: line fades out toward the bottom (gradient); the current ("Present") entry's dot has a slow `animate-ping` pulse
- **Nav**: Transparent over hero → `backdrop-blur` glass solid after scrolling past 80px; thin sky-to-cyan scroll-progress bar along the top edge (Framer `useScroll` + `useSpring`); active section's link highlighted in accent (IntersectionObserver, middle-of-viewport band)
- **Back to top**: floating button (bottom-right) fades/scales in after 600px scroll (`AnimatePresence`)
- **Reduced motion**: global `@media (prefers-reduced-motion: reduce)` block stops loops/transitions; Framer entrances additionally gated via `useReducedMotion` per component

### Global UX polish (`globals.css`)
- `::selection` tinted with the accent color
- Thin theme-aware scrollbar (`scrollbar-width: thin` + WebKit pseudo-elements)
- `section[id] { scroll-margin-top: 4.5rem }` so anchored sections stop below the fixed nav
- `:focus-visible` accent outline for keyboard navigation
- `.text-gradient-accent`: sky-to-cyan gradient text with theme-aware endpoints (`--grad-from` / `--grad-to`); used on the hero name

---

## Project File Structure

```
portfolio-v2/
├── app/
│   ├── icon.jpg            # Favicon — profile photo (overrides favicon.ico)
│   ├── layout.tsx          # Root layout: fonts, ThemeProvider, metadata
│   ├── page.tsx            # Page: composes all section components
│   └── globals.css         # Tailwind directives + CSS tokens + dot-grid/marquee + reduced-motion
├── components/
│   ├── nav.tsx             # Fixed nav, scroll behavior, theme/language toggles, mobile menu
│   ├── hero.tsx            # Full-viewport hero: dot-grid bg, typing roles, tagline, photo
│   ├── about.tsx           # About strip: full bio (relocated out of the hero)
│   ├── skills.tsx          # Skills: brand-logo marquee + grouped category lists
│   ├── experience.tsx      # Work experience timeline section
│   ├── projects.tsx        # Projects: featured card + zigzag alternating cards
│   ├── contact.tsx         # Contact form + social links section
│   ├── back-to-top.tsx     # Floating back-to-top button (appears after 600px scroll)
│   ├── theme-toggle.tsx    # Dark/light icon button
│   ├── language-toggle.tsx # EN/VI language switcher button
│   ├── language-provider.tsx # LanguageProvider context + useLanguage hook
│   └── time-based-theme.tsx # Sets theme on first load based on time of day
├── lib/
│   ├── data.ts             # All static content: skillCards, projects, experiences, tagClass pill style
│   ├── translations.ts     # EN/VI translation strings for all sections
│   ├── analytics.ts        # trackEvent() wrapper around window.gtag
│   └── useInViewTracking.ts # IntersectionObserver hook — fires section_viewed GA4 event once
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
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Section Specifications

### Navigation (`components/nav.tsx`)
- Fixed to top, full width, z-50
- Logo/name: "Tom Nguyen" (left side)
- Nav links (right side): Home · About · Skills · Experience · Projects · Contact · Resume
  - All section links use smooth anchor scroll (`href="#section-id"`); About scrolls to `#about`
  - Resume opens `/resume.html` (EN) or `/resume-vi.html` (VI) in a new tab; fires `resume_view` GA4 event
- **Scroll progress bar**: thin sky-to-cyan bar along the nav's top edge, `scaleX` driven by Framer `useScroll` + `useSpring`
- **Active section highlight**: IntersectionObserver (rootMargin `-45% 0px -50% 0px`) tracks which section crosses mid-viewport; that link renders in accent + `aria-current` (desktop and mobile menus)
- Scroll behavior: `bg-transparent` at top → `.nav-glass` (backdrop-blur + border-b) after 80px scroll; also activates when mobile menu is open
- Inline nav links show at `md` and up; below `md` they collapse to a hamburger menu - closes only when a nav link is tapped (not on scroll)
- Language toggle button (EN/VI) — switches locale, persists to localStorage; placed left of theme toggle
- Theme toggle icon button (rightmost item)

---

### Hero (`components/hero.tsx`)
- `min-h-[100dvh]` full viewport, centered content
- **Background**: Subtle technical dot-grid field (`.bg-dot-grid`, theme-aware, edge-faded via mask) + static `.hero-glow` accent wash - no animated blobs
- **Layout**: `flex-col-reverse md:flex-row` - photo right on desktop, stacked (photo top) on mobile; staggered entrance gated by `useReducedMotion`
- **Availability badge**: above the heading - mono pill with pulsing emerald status dot, text `t.hero.availability` ("Open to new opportunities")
- **Photo**: `images/pic00.jpg` - circular frame, `ring-2 ring-sky-500/30` + subtle shadow + slow-rotating `.avatar-ring` conic accent arc
- **Heading**: `Hi. I'm Tom Nguyen.` - large, bold, name in sky-to-cyan gradient (`.text-gradient-accent`, name kept on one line)
- **Subtitle**: Typing/cycling effect over `t.hero.roles` ("Software Engineer", "AI Agent Developer", "Mendix Engineer", "Full Stack Engineer"); shows a static role under reduced motion
- **Tagline**: One sharp positioning line (`t.hero.tagline`, ≤20 words) - replaces the long bio that previously lived in the hero
- **CTA buttons**:
  1. "About Me" → smooth scroll to `#about`
  2. "LinkedIn" → `https://www.linkedin.com/in/tomnguyen103/` (new tab)
  3. "GitHub" → `https://github.com/tomnguyen103` (new tab)
- **Scroll hint**: centered at the hero's bottom edge (desktop only) - mono "Scroll" label (`t.hero.scrollHint`) + mouse pill with bouncing accent dot, links to `#about`

---

### About (`components/about.tsx`)
- Section id: `#about`; reachable via the "About" nav link (smooth anchor scroll, same behavior as the other sections)
- Sits between Hero and Skills; holds the full bio (`t.hero.bio`) relocated out of the hero
- Layout: mono uppercase `About` label (`t.hero.aboutLabel`) beside the bio paragraph (`max-w-4xl`); reveal gated by `useReducedMotion`
- **Stats row** below the bio (hairline top border): three count-up stats - `4+` Years Experience (static, matches the bio claim), Featured Projects (`projects.length` from `lib/data.ts`), Companies (`experiences.length`); labels from `t.about.stats`; numbers animate 0 → value once in view (instant under reduced motion)

---

### Skills (`components/skills.tsx`)
- Section id: `#skills`
- Heading: "Skills" + subheading: "Technologies I work with"
- **Brand-logo marquee**: auto-scrolling strip of real `react-icons/si` logos + labels (`.animate-marquee`); theme-aware via `currentColor`, pauses on hover, static under reduced motion
- **Grouped category lists** (below marquee): the 6 `skillCards` rendered as borderless groups (Lucide icon + title with a hairline underline + `tagClass` `font-mono` pills) in a `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`; staggered `whileInView` entrance
- This borderless grouped style is intentionally distinct from the Projects cards

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
- Layout: vertical timeline; the left line is a top-to-bottom gradient (`from-sky-500/50 via-sky-500/25 to-transparent`); each entry has a sky-500 dot marker
- The entry whose `end` is `"Present"` gets a slow `animate-ping` pulse behind its dot
- Each entry shows: company + type badge, date-range pill (sky-500 tint), job title, location, bullet list
- Staggered fade-up entrance (0.1s delay per entry, `whileInView`)
- Date-range pill uses `font-mono`
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
- Layout: first project is a larger **featured** card (`Featured` badge via `t.projects.featured`, `md:w-3/5` image); the rest **zigzag** - image side alternates each row (`md:flex-row` / `md:flex-row-reverse`), all stacking image-on-top on mobile
  - Image: `object-cover` (or `object-contain` + `imageBg` for UI screenshots); `sizes="(min-width: 768px) 50vw, 100vw"`; zooms `scale-[1.04]` on card hover (`group-hover`, container `overflow-hidden`)
  - Content: title, bullet list, `tagClass` `font-mono` tech pills, GitHub/Demo buttons
- Card hover: lift `y: -4` + border brightens to `accent/40` (border-based elevation, no box-shadow glow) + `.card-spotlight` cursor-following accent glow (CSS vars `--spot-x`/`--spot-y` set via `onMouseMove`; hover-capable pointers only)
- Scroll-triggered fade-up entrance gated by `useReducedMotion`

**Project data** (defined in `lib/data.ts`, in display order):

| Title | Image | GitHub repo | Demo |
|---|---|---|---|
| Second Brain Portfolio Demo (featured) | `second-brain-portfolio-demo-chat.png` | `second-brain-portfolio-demo` | `https://second-brain.tomnguyen.me/` |
| AI Financial Platform | `ai-financial-v2.png` | `AI_Financial_Platform` | `https://financial.tomnguyen.me` |
| Sudoku Solver Visualizer | `sudoku-v2.png` | `Sudoku-Game-v2` | `https://sudoku.tomnguyen.me/` |
| Development Plan Tool | `pic04.png` | `Development-Plan-Tool` | `https://development-tool.tomnguyen.me/` |
| AI Language Learning App | `pic06.png` | `MyFirstMobileApp` | - |
| AI Flappy Bird | `ai_flappy_bird_demo.png` | `AI_Flappy_Bird` | `https://bird.tomnguyen.me/` |

Descriptions and tech stacks live in `lib/data.ts` (EN) and `lib/translations.ts` (`projects.items`, EN + VI) - keep both in sync when editing.

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

**Netlify Forms note**: `public/__forms.html` contains a static HTML stub of the form so Netlify's build bot can detect it at build time (required for Next.js App Router - the dynamic render is not scanned). The client submits to `/__forms.html`.

A floating **back-to-top** button (`components/back-to-top.tsx`) renders site-wide from `app/page.tsx`: fixed bottom-right, appears after 600px of scroll, smooth-scrolls to `#top`; aria-label from `t.nav.backToTop`.

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

Also set: `metadataBase` (`https://www.tomnguyen.me`), `keywords`, `authors`/`creator`, full `openGraph` (type website, siteName, locale `en_US`, image `/images/pic00.jpg`) and `twitter` (`summary` card) blocks, plus a `viewport` export with light/dark `themeColor` (`#ffffff` / `#0a0a0f`).

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

### Use single dash everywhere
Always use a plain hyphen `-` as a separator or dash in all files across the project — HTML, TSX, TS, and any other content. Never use `&mdash;`, `&ndash;`, `—`, or `–` (em dash / en dash) anywhere in visible content or string literals.

### All links in `resume.html` and `resume-vi.html` open in a new tab
Both `resume.html` and `resume-vi.html` include an inline script at the bottom that sets `target="_blank"` and `rel="noopener noreferrer"` on every `<a>` tag automatically. Do not remove this script from either file — it ensures the resume page stays open when a visitor clicks any link.

### Print pagination in `resume.html` and `resume-vi.html`
Both resume files include `@media print` rules to prevent awkward page breaks. Key rules:
- `break-inside: avoid` + `page-break-inside: avoid` on `.entry` — keeps each job/project block whole (pushes it to the next page rather than splitting mid-entry)
- `break-after: avoid` + `page-break-after: avoid` on `.section-title` — prevents section headings from orphaning at the bottom of a page
- `break-inside: avoid` + `page-break-inside: avoid` on `.edu-entry` — keeps education entries whole
- `orphans: 2; widows: 2` on `li` and `p` — prevents single lines stranding at page edges

Always include both the modern (`break-*`) and legacy (`page-break-*`) properties — Chrome's print engine responds more reliably to the legacy form.

---

## Out of Scope (v2)
- Blog / notes section
- CMS integration
- IE/legacy browser support
