# Experience Section Design

**Date:** 2026-05-22
**Status:** Approved

---

## Overview

Add an Experience section to the portfolio between the Skills and Projects sections. Displays the 3 most recent work roles in a vertical timeline layout using sky-blue accent dots and a connecting line.

---

## Placement & Navigation

- **Order:** Hero → Skills → **Experience** → Projects → Contact
- **Section ID:** `#experience`
- **Nav link:** Add "Experience" between "Skills" and "Projects" in `components/nav.tsx`
- **Skills scroll indicator:** Update `href` from `#projects` to `#experience`
- **Experience scroll indicator:** Bouncing `ArrowDown` pointing to `#projects`

---

## Component

**File:** `components/experience.tsx`

- `"use client"` directive (Framer Motion)
- Follows same section shell as `skills.tsx` and `projects.tsx`:
  - `<section id="experience">` with `relative min-h-screen flex flex-col justify-center px-6 py-20 pb-24`
  - `max-w-3xl mx-auto` container (narrower than other sections - timeline reads better at tighter width)
  - Animated heading + muted subheading (`whileInView` fade-up, same timing)
  - Scroll indicator `ArrowDown` → `#projects`

---

## Timeline Layout

```
[vertical line: border-l-2 border-sky-500/30, positioned left]

●  [dot: w-3 h-3 bg-sky-500 rounded-full ring-2 ring-sky-500/20, absolute -left-1.5]
   Company · Type                        [Apr 2024 - Present]  ← pill badge
   Job Title
   Location (muted, small)
   • bullet
   • bullet
   • bullet

●  next entry (stagger 0.1s)
   ...
```

- **Container:** `relative pl-8 border-l-2 border-sky-500/30 ml-1.5` (leaves room for dots)
- **Dot:** `absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-sky-500 ring-2 ring-sky-500/20`
- **Date badge:** `rounded-full px-2.5 py-0.5 text-xs bg-sky-500/10 text-sky-500 border border-sky-500/20` - floated right on `md:`, stacked below company on mobile
- **Entry spacing:** `mb-10 last:mb-0`
- **Animations:** `whileInView { opacity: 0→1, y: 40→0 }`, `viewport={{ once: true }}`, `transition={{ duration: 0.5, delay: index * 0.1 }}`
- **No card border/background** - entries sit directly on the section background for a cleaner timeline feel (unlike Skills/Projects which use surface cards)

---

## Data

**New interface in `lib/data.ts`:**

```ts
export interface Experience {
  company: string;
  type: string;
  title: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
}
```

**New export `experiences: Experience[]` in `lib/data.ts`:**

```ts
[
  {
    company: "Texas Regional Physicians",
    type: "Full-time",
    title: "Software Developer",
    start: "Apr 2024",
    end: "Present",
    location: "Houston, Texas · Remote",
    bullets: [
      "Architect, develop, and deploy high-performing Mendix applications aligned with business objectives; optimize for performance, scalability, and maintainability.",
      "Design and build engaging UIs using HTML, CSS, SASS, and JavaScript delivering exceptional user experiences.",
      "Manage and optimize databases (SQL, PostgreSQL, MySQL), ensuring data integrity, security, and robust backup strategies.",
      "Integrate third-party RESTful services into Mendix applications; optimize API calls for performance and reliability.",
      "Collaborate with executive leadership and clients to translate business needs into actionable digital solutions.",
    ],
  },
  {
    company: "Memorial MRI and Diagnostic",
    type: "Full-time",
    title: "Software Developer",
    start: "Nov 2021",
    end: "Apr 2024",
    location: "Houston, Texas",
    bullets: [
      "Implemented solutions on the Mendix platform scoped to business and technical requirements across the full project lifecycle.",
      "Designed and maintained four major company websites using HTML, CSS, SASS, and JavaScript.",
      "Managed database backups and integrity using SQL, PostgreSQL, and MySQL.",
      "Coordinated with third parties to connect RESTful services to Mendix platform applications.",
      "Engaged with executive team and customers to drive innovation and resolve technical issues.",
    ],
  },
  {
    company: "Coding Dojo",
    type: "Full-time",
    title: "Resident Full Stack Developer",
    start: "Sep 2019",
    end: "Nov 2021",
    location: "Greater Los Angeles Area",
    bullets: [
      "Built and shipped multiple full-stack projects including AI Flappy Bird (Neural Network + Genetic Algorithm), a School Library Platform (Django/SQLite), and a Paint HTML App (Canvas/JS).",
      "Applied Reinforcement Learning and Neural Network concepts to train autonomous game agents using Genetic Algorithms.",
      "Developed full-stack web applications using Python, Django, HTML/CSS, JavaScript, and AWS.",
    ],
  },
]
```

**Note on Coding Dojo:** The LinkedIn entry lists individual projects as sub-bullets. AI Flappy Bird already appears in the Projects section, so bullets are consolidated into role-level highlights to avoid duplication and keep the entry readable.

---

## Page Composition

In `app/page.tsx`:
```tsx
import Experience from "@/components/experience";
// ...
<Skills />
<Experience />
<Projects />
```

---

## Theme Compatibility

- All colors use Tailwind semantic tokens (`text-foreground`, `text-muted`) or sky-500 accent tints - renders correctly in both dark and light themes
- Timeline line and dot use `sky-500/30` and `sky-500/20` opacity tints - visible in both themes without adjustment
- No hardcoded hex colors

---

## Out of Scope

- Company logos / images
- Expandable/collapsible entries
- Filtering by role type
- "View on LinkedIn" link per entry
