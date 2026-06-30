# GA4 Analytics Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Google Analytics 4 into the Next.js portfolio to track visitor traffic and 5 conversion events (resume download, LinkedIn click, GitHub click, project demo click, contact form submit).

**Architecture:** A typed `trackEvent` utility in `lib/analytics.ts` wraps `window.gtag` with an SSR guard. GA4 scripts are loaded in `app/layout.tsx` via `next/script` with `strategy="afterInteractive"`. Each component calls `trackEvent` on user-initiated actions.

**Tech Stack:** Next.js 14 App Router, `next/script`, Google Analytics 4 (`gtag.js`), TypeScript

---

## File Map

| File | Change |
|---|---|
| `lib/analytics.ts` | Create — typed `trackEvent` utility + `gtag` type declaration |
| `app/layout.tsx` | Modify — add GA4 `<Script>` tags |
| `components/nav.tsx` | Modify — wire `resume_download` on both Resume links |
| `components/hero.tsx` | Modify — wire `linkedin_click`, `github_click` |
| `components/projects.tsx` | Modify — wire `github_click`, `project_demo_click` per card |
| `components/contact.tsx` | Modify — wire `linkedin_click`, `github_click`, `contact_form_submit` |

---

## Task 1: Create `lib/analytics.ts`

**Files:**
- Create: `lib/analytics.ts`

- [ ] **Step 1: Create the file**

```ts
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/analytics.ts
git commit -m "feat: add trackEvent analytics utility"
```

---

## Task 2: Add GA4 scripts to `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add the Script import and tags**

Add `import Script from "next/script";` at the top of the file.

Add a `const` for the Measurement ID just above the metadata export:
```ts
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
```

Inside the returned JSX, add the two Script tags as the last children inside `<body>`, after `{children}`:

```tsx
{GA_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="ga4-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}
    </Script>
  </>
)}
```

The complete `<body>` block should look like:
```tsx
<body className="antialiased">
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <TimeBasedTheme />
    {children}
  </ThemeProvider>
  {GA_ID && (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )}
</body>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Smoke-test locally**

Run: `npm run dev`

Open `http://localhost:3000` in a browser, open DevTools → Network tab, filter by `gtag` or `google-analytics`. You should see a request to `googletagmanager.com/gtag/js`.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: load GA4 script in root layout"
```

---

## Task 3: Wire `resume_download` in `components/nav.tsx`

**Files:**
- Modify: `components/nav.tsx`

- [ ] **Step 1: Import `trackEvent`**

Add at the top of the file:
```ts
import { trackEvent } from "@/lib/analytics";
```

- [ ] **Step 2: Add `onClick` to the desktop Resume link (line 53–60)**

Replace:
```tsx
<a
  href="/MyResume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="ml-1 px-3 py-1.5 text-base font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg"
>
  Resume
</a>
```

With:
```tsx
<a
  href="/MyResume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent("resume_download")}
  className="ml-1 px-3 py-1.5 text-base font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg"
>
  Resume
</a>
```

- [ ] **Step 3: Add `onClick` to the mobile Resume link (line 89–97)**

Replace:
```tsx
<a
  href="/MyResume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setMenuOpen(false)}
  className="mt-1 px-3 py-2.5 text-sm font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg text-center"
>
  Resume
</a>
```

With:
```tsx
<a
  href="/MyResume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => { setMenuOpen(false); trackEvent("resume_download"); }}
  className="mt-1 px-3 py-2.5 text-sm font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg text-center"
>
  Resume
</a>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: track resume_download event in nav"
```

---

## Task 4: Wire `linkedin_click` and `github_click` in `components/hero.tsx`

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: Import `trackEvent`**

Add at the top of the file:
```ts
import { trackEvent } from "@/lib/analytics";
```

- [ ] **Step 2: Add `onClick` to the LinkedIn button (line 98–105)**

Replace:
```tsx
<a
  href="https://www.linkedin.com/in/tomnguyen103/"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
>
  <FaLinkedinIn className="w-4 h-4" /> LinkedIn
</a>
```

With:
```tsx
<a
  href="https://www.linkedin.com/in/tomnguyen103/"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent("linkedin_click")}
  className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
>
  <FaLinkedinIn className="w-4 h-4" /> LinkedIn
</a>
```

- [ ] **Step 3: Add `onClick` to the GitHub button (line 106–113)**

Replace:
```tsx
<a
  href="https://github.com/tomnguyen103"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
>
  <FaGithub className="w-4 h-4" /> GitHub
</a>
```

With:
```tsx
<a
  href="https://github.com/tomnguyen103"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent("github_click")}
  className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
>
  <FaGithub className="w-4 h-4" /> GitHub
</a>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: track linkedin_click and github_click events in hero"
```

---

## Task 5: Wire `github_click` and `project_demo_click` in `components/projects.tsx`

**Files:**
- Modify: `components/projects.tsx`

- [ ] **Step 1: Import `trackEvent`**

Add at the top of the file:
```ts
import { trackEvent } from "@/lib/analytics";
```

- [ ] **Step 2: Add `onClick` to the project GitHub link (line 80–87)**

Replace:
```tsx
<a
  href={project.github}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-accent hover:text-white rounded-lg text-sm transition-colors border border-foreground/10 text-foreground"
>
  <FaGithub className="w-4 h-4" /> GitHub
</a>
```

With:
```tsx
<a
  href={project.github}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent("github_click", { project_title: project.title })}
  className="flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-accent hover:text-white rounded-lg text-sm transition-colors border border-foreground/10 text-foreground"
>
  <FaGithub className="w-4 h-4" /> GitHub
</a>
```

- [ ] **Step 3: Add `onClick` to the project Demo link (line 88–97)**

Replace:
```tsx
{project.demo && (
  <a
    href={project.demo}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-accent hover:text-white rounded-lg text-sm transition-colors border border-foreground/10 text-foreground"
  >
    <ExternalLink className="w-4 h-4" /> Demo
  </a>
)}
```

With:
```tsx
{project.demo && (
  <a
    href={project.demo}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent("project_demo_click", { project_title: project.title })}
    className="flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-accent hover:text-white rounded-lg text-sm transition-colors border border-foreground/10 text-foreground"
  >
    <ExternalLink className="w-4 h-4" /> Demo
  </a>
)}
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add components/projects.tsx
git commit -m "feat: track github_click and project_demo_click events in projects"
```

---

## Task 6: Wire events in `components/contact.tsx`

**Files:**
- Modify: `components/contact.tsx`

- [ ] **Step 1: Import `trackEvent`**

Add at the top of the file:
```ts
import { trackEvent } from "@/lib/analytics";
```

- [ ] **Step 2: Fire `contact_form_submit` on successful form submission**

In the `handleSubmit` function, add `trackEvent("contact_form_submit")` immediately after `setSubmitted(true)`:

Replace:
```ts
if (res.ok) {
  setSubmitted(true);
  form.reset();
}
```

With:
```ts
if (res.ok) {
  setSubmitted(true);
  trackEvent("contact_form_submit");
  form.reset();
}
```

- [ ] **Step 3: Add `onClick` to the GitHub social icon (line 141–149)**

Replace:
```tsx
<a
  href="https://github.com/tomnguyen103"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub"
  className="p-3 bg-surface hover:bg-accent hover:text-white rounded-xl transition-colors border border-foreground/10 text-foreground"
>
  <FaGithub className="w-5 h-5" />
</a>
```

With:
```tsx
<a
  href="https://github.com/tomnguyen103"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub"
  onClick={() => trackEvent("github_click", { location: "contact" })}
  className="p-3 bg-surface hover:bg-accent hover:text-white rounded-xl transition-colors border border-foreground/10 text-foreground"
>
  <FaGithub className="w-5 h-5" />
</a>
```

- [ ] **Step 4: Add `onClick` to the LinkedIn social icon (line 150–158)**

Replace:
```tsx
<a
  href="https://www.linkedin.com/in/tomnguyen103/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
  className="p-3 bg-surface hover:bg-accent hover:text-white rounded-xl transition-colors border border-foreground/10 text-foreground"
>
  <FaLinkedinIn className="w-5 h-5" />
</a>
```

With:
```tsx
<a
  href="https://www.linkedin.com/in/tomnguyen103/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
  onClick={() => trackEvent("linkedin_click", { location: "contact" })}
  className="p-3 bg-surface hover:bg-accent hover:text-white rounded-xl transition-colors border border-foreground/10 text-foreground"
>
  <FaLinkedinIn className="w-5 h-5" />
</a>
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add components/contact.tsx
git commit -m "feat: track linkedin_click, github_click, contact_form_submit events in contact"
```

---

## Task 7: Final build check and post-deploy steps

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build completes with no errors or type errors.

- [ ] **Step 2: Commit if any build-time fixes were needed, then push to main**

```bash
git push origin main
```

Netlify will auto-deploy. Confirm the deploy succeeds in the Netlify dashboard.

- [ ] **Step 3: Verify GA4 DebugView in production**

In GA4 dashboard: **Admin → DebugView** (or install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension).

Visit `https://www.tomnguyen.me` and click each tracked element:
- Resume link in nav → expect `resume_download` event in DebugView
- LinkedIn button in hero → expect `linkedin_click`
- GitHub button in hero → expect `github_click`
- A project GitHub link → expect `github_click` with `project_title` param
- A project Demo link → expect `project_demo_click` with `project_title` param
- GitHub/LinkedIn icons in Contact → expect respective events with `location: "contact"`
- Submit the contact form → expect `contact_form_submit`

- [ ] **Step 4: Mark all 5 events as Conversions in GA4**

In GA4 dashboard: **Admin → Events**

Wait ~24 hours after first firing, then toggle "Mark as conversion" for:
- `resume_download`
- `linkedin_click`
- `github_click`
- `project_demo_click`
- `contact_form_submit`
