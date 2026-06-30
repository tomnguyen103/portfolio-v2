# Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a vertical-timeline Experience section between Skills and Projects, showing Tom's 3 most recent roles with animated scroll entrance and sky-blue accent styling.

**Architecture:** Data lives in `lib/data.ts` (new `Experience` interface + `experiences` array). A new `components/experience.tsx` renders the timeline using the same Framer Motion `whileInView` pattern as Skills/Projects. Nav, Skills scroll indicator, and page composition are updated to wire it into the section chain.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS v3, Framer Motion

---

## File Map

| Action | File | Change |
|--------|------|--------|
| Modify | `lib/data.ts` | Add `Experience` interface + `experiences` array |
| Create | `components/experience.tsx` | New timeline component |
| Modify | `components/nav.tsx` | Add "Experience" link between Skills and Projects |
| Modify | `components/skills.tsx` | Update scroll indicator `href` → `#experience` |
| Modify | `app/page.tsx` | Import and render `<Experience />` between Skills and Projects |

---

## Task 1: Add Experience data to lib/data.ts

**Files:**
- Modify: `lib/data.ts`

This is purely additive — existing exports are untouched.

- [ ] **Step 1: Add the `Experience` interface and `experiences` array**

Open `lib/data.ts`. After the existing `Project` interface (line 17), add:

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

Then at the end of the file (after the `projects` array), add:

```ts
export const experiences: Experience[] = [
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
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add Experience data types and content to lib/data.ts"
```

---

## Task 2: Create the Experience component

**Files:**
- Create: `components/experience.tsx`

- [ ] **Step 1: Create the file with this exact content**

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative min-h-screen flex flex-col justify-center px-6 py-20 pb-24">
      <div className="max-w-3xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Where I&apos;ve worked
        </motion.p>

        <div className="relative ml-1.5">
          <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-sky-500/30" />

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.start}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 mb-10 last:mb-0"
            >
              <span className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full bg-sky-500 ring-2 ring-sky-500/20" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                <span className="font-semibold text-foreground">
                  {exp.company}{" "}
                  <span className="font-normal text-muted text-sm">· {exp.type}</span>
                </span>
                <span className="shrink-0 self-start px-2.5 py-0.5 rounded-full text-xs bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  {exp.start} – {exp.end}
                </span>
              </div>

              <p className="font-medium text-foreground mb-0.5">{exp.title}</p>
              <p className="text-sm text-muted mb-3">{exp.location}</p>

              <ul className="space-y-1.5">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="text-base text-muted flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        aria-label="Scroll to projects"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/experience.tsx
git commit -m "feat: add Experience timeline component"
```

---

## Task 3: Wire up nav, skills scroll indicator, and page composition

**Files:**
- Modify: `components/nav.tsx:7-12`
- Modify: `components/skills.tsx:79-88`
- Modify: `app/page.tsx`

- [ ] **Step 1: Add "Experience" to the nav links array in nav.tsx**

In `components/nav.tsx`, the `navLinks` array currently is (lines 7–12):

```ts
const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
```

Replace it with:

```ts
const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
```

- [ ] **Step 2: Update the Skills scroll indicator to point to #experience**

In `components/skills.tsx`, the scroll indicator `<motion.a>` (lines 79–88) currently reads:

```tsx
      <motion.a
        href="#projects"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        aria-label="Scroll to projects"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
```

Replace with:

```tsx
      <motion.a
        href="#experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        aria-label="Scroll to experience"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
```

- [ ] **Step 3: Import and render Experience in app/page.tsx**

In `app/page.tsx`, the current imports and composition are:

```tsx
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
```

Replace with:

```tsx
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify the full build passes**

```bash
npm run build
```

Expected: build completes with no TypeScript errors and no Next.js page errors. If you see "Export encountered errors on following paths" it means a component has a runtime import issue — check the error path.

- [ ] **Step 5: Verify visually in the dev server**

```bash
npm run dev
```

Open http://localhost:3000 and check:
- "Experience" appears in the nav between Skills and Projects (desktop + mobile hamburger)
- Scrolling from Skills section's bouncing arrow lands on the Experience section
- All 3 experience entries render with sky-blue dots, correct dates, bullets, and location
- Date pills are right-aligned on desktop, stacked on mobile (resize window to verify)
- Scroll entrance animations fire as each entry comes into view
- Bouncing arrow at the bottom of Experience section scrolls to Projects
- Both dark mode and light mode look correct (toggle the theme)

- [ ] **Step 6: Commit**

```bash
git add components/nav.tsx components/skills.tsx app/page.tsx
git commit -m "feat: wire Experience section into nav, page, and scroll chain"
```
