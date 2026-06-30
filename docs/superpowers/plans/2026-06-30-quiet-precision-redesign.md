# Quiet Precision Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate portfolio-v2's visual craft (color discipline, type scale, surface treatment) to a high-craft "quiet precision" bar without changing any section, interaction, content, or IA.

**Architecture:** Pure CSS-token and Tailwind-className edits across `app/globals.css` and five components. No new dependencies, no new files, no logic changes - every task is a scoped visual diff verified by typecheck + browser screenshot. This codebase has no test runner configured (`npm run build`/`tsc --noEmit` are the only automated checks), so each task's "test cycle" is: make the exact edit, typecheck, and - for the final task - a full browser-based visual/accessibility verification pass, in place of unit tests that don't apply to Tailwind className/CSS-token changes.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v4 (`@theme` tokens in `globals.css`), Framer Motion (untouched).

## Global Constraints

- No new typeface - Geist + Geist Mono only, already the only fonts loaded in `app/layout.tsx`.
- No content, copy, IA, section order, or EN/VI translation changes.
- No changes to GA4 event wiring, the Netlify form, or theme system logic (time-based default + manual override).
- `public/resume.html` / `public/resume-vi.html` are not touched.
- Do not touch: nav scroll-progress bar gradient, hero `.hero-glow` radial wash, `.avatar-ring` conic arc, experience timeline fading line - none were named as problems.
- Both light and dark token sets must be updated together; all colors stay in the CSS custom-property system (no hardcoded hex in component files).
- New `--accent` / `--accent-hover` must pass WCAG AA for normal text against `--bg` and `--surface`, both themes.
- Motion timing (easing/duration) was reviewed against the spec's "retune for snappier consistency" goal - current values (expo-out easing on entrances, asymmetric tab-slide timing, spring-based nav progress) are already well-considered; no task changes them. Flag a specific moment during Task 6 verification if something genuinely feels soft.
- Source spec: `docs/superpowers/specs/2026-06-30-quiet-precision-redesign-design.md`.

---

### Task 1: Color tokens - refine accent, drop the gradient tokens

**Files:**
- Modify: `app/globals.css:7-16` (`:root` token block)
- Modify: `app/globals.css:18-27` (`.dark` token block)
- Modify: `app/globals.css:86-92` (`.text-gradient-accent` rule)

**Interfaces:**
- Produces: `--accent` / `--accent-hover` new values (`#0f6fb8` / `#0b5990` light, `#2f8fd0` / `#1c74b3` dark) that Tasks 2, 4, and 5 read via the existing `text-accent` / `border-accent` / `bg-accent` Tailwind utilities - no new token names.
- Removes: `--grad-from` and `.text-gradient-accent` - Task 2 depends on this removal (it deletes the last `.tsx` usage of the class). **`--grad-to` is kept** - `.hero-glow`'s second radial blob (`app/globals.css:113`) also consumes it and that effect is out of scope; removing it would silently break part of an untouched effect (caught during Task 2's verification grep - see Step 4 below).

- [ ] **Step 1: Create the feature branch**

Run: `git checkout main && git pull && git checkout -b feat/quiet-precision-redesign`
Expected: `Switched to a new branch 'feat/quiet-precision-redesign'`

- [ ] **Step 2: Update the `:root` (light) token block**

In `app/globals.css`, replace lines 7-16:

```css
:root {
  --bg: #ffffff;
  --surface: #f8fafc;
  --accent: #0ea5e9;
  --accent-hover: #0284c7;
  --fg: #0f172a;
  --muted: #64748b;
  --grad-from: #0284c7; /* sky-600 */
  --grad-to: #0891b2; /* cyan-600 */
}
```

with:

```css
:root {
  --bg: #ffffff;
  --surface: #f8fafc;
  --accent: #0f6fb8;
  --accent-hover: #0b5990;
  --fg: #0f172a;
  --muted: #64748b;
  --grad-to: #0891b2; /* cyan-600 - still consumed by .hero-glow's second blob */
}
```

- [ ] **Step 3: Update the `.dark` token block**

In `app/globals.css`, replace lines 18-27:

```css
.dark {
  --bg: #0a0a0f;
  --surface: #111827;
  --accent: #0ea5e9;
  --accent-hover: #0284c7;
  --fg: #f9fafb;
  --muted: #6b7280;
  --grad-from: #38bdf8; /* sky-400 */
  --grad-to: #22d3ee; /* cyan-400 */
}
```

with:

```css
.dark {
  --bg: #0a0a0f;
  --surface: #111827;
  --accent: #2f8fd0;
  --accent-hover: #1c74b3;
  --fg: #f9fafb;
  --muted: #6b7280;
  --grad-to: #22d3ee; /* cyan-400 - still consumed by .hero-glow's second blob */
}
```

- [ ] **Step 4: Remove the now-unused gradient-text rule**

In `app/globals.css`, delete this block (around lines 86-92):

```css
/* Sky-to-cyan gradient text (theme-aware endpoints) - used on the hero name */
.text-gradient-accent {
  background-image: linear-gradient(90deg, var(--grad-from), var(--grad-to));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

Do not remove any other rule - `.bg-dot-grid`, `.hero-glow`, `.avatar-ring`, `.animate-marquee`, `.nav-glass`, etc. are out of scope.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: exits 0, no errors (CSS-only change, should be unaffected).

- [ ] **Step 6: Commit**

```bash
git add app/globals.css
git commit -m "refine accent token and drop gradient-text tokens"
```

---

### Task 2: Hero - solid name, larger scale, hairline photo ring

**Files:**
- Modify: `components/hero.tsx:111` (h1 className)
- Modify: `components/hero.tsx:122` (gradient span #1)
- Modify: `components/hero.tsx:130` (gradient span #2)
- Modify: `components/hero.tsx:201` (photo `Image` className)

**Interfaces:**
- Consumes: `--accent` from Task 1 (no direct reference left in this file after this task - the name drops accent entirely in favor of inherited `text-foreground`).
- Produces: no new exports; purely visual JSX className changes other tasks don't depend on.

- [ ] **Step 1: Bump the hero name's type scale**

In `components/hero.tsx:111`, replace:

```tsx
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-foreground"
```

with:

```tsx
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight xl:tracking-[-0.02em] mb-4 text-foreground"
```

(The unprefixed/mobile tier stays `text-4xl` - unchanged from the original. "Tom Nguyen" renders in a `whitespace-nowrap` span, and at `text-5xl` it's wider than a 375px viewport and gets silently clipped by the hero section's `overflow-hidden`. Found and fixed during Task 6 verification by measuring the nowrap span's bounding box against the viewport at 320/375/640/768/1024/1280px.)

- [ ] **Step 2: Drop the gradient treatment on both "Tom Nguyen" spans**

In `components/hero.tsx:122`, replace:

```tsx
                      <span className="text-gradient-accent font-extrabold">Tom Nguyen</span>
```

with:

```tsx
                      <span className="font-extrabold">Tom Nguyen</span>
```

In `components/hero.tsx:130`, replace:

```tsx
                  <span className="text-gradient-accent font-extrabold">Tom Nguyen</span>
```

with:

```tsx
                  <span className="font-extrabold">Tom Nguyen</span>
```

(Both spans inherit `text-foreground` from the parent `h1` at line 111, so no explicit color class is needed - this is the "solid text-foreground" treatment from the spec.)

- [ ] **Step 3: Replace the photo's glow shadow with a hairline ring**

In `components/hero.tsx:201`, replace:

```tsx
                className="rounded-full object-cover w-full h-full ring-2 ring-sky-500/30 shadow-2xl shadow-sky-950/20"
```

with:

```tsx
                className="rounded-full object-cover w-full h-full ring-1 ring-foreground/10 shadow-sm"
```

- [ ] **Step 4: Verify the removed class has no remaining references**

Run: `grep -rn "text-gradient-accent\|grad-from" --include="*.tsx" --include="*.css" .`
Expected: no matches anywhere in the repo (`--grad-to` is intentionally retained for `.hero-glow` and is excluded from this check).

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: exits 0, no errors.

- [ ] **Step 6: Commit**

```bash
git add components/hero.tsx
git commit -m "hero: solid name at larger scale, hairline photo ring"
```

---

### Task 3: Section heading scale - Skills, Experience, Projects, Contact

**Files:**
- Modify: `components/skills.tsx:77`
- Modify: `components/experience.tsx:22`
- Modify: `components/projects.tsx:92`
- Modify: `components/contact.tsx:57`

**Interfaces:**
- No consumes/produces - purely additive Tailwind breakpoint class on each section's existing heading element, independent of every other task.

- [ ] **Step 1: Bump the Skills heading**

In `components/skills.tsx:77`, replace:

```tsx
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
```

with:

```tsx
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-4 text-foreground"
```

- [ ] **Step 2: Bump the Experience heading**

In `components/experience.tsx:22`, replace:

```tsx
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
```

with:

```tsx
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-4 text-foreground"
```

- [ ] **Step 3: Bump the Projects heading**

In `components/projects.tsx:92`, replace:

```tsx
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
```

with:

```tsx
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-4 text-foreground"
```

- [ ] **Step 4: Bump the Contact heading**

In `components/contact.tsx:57`, replace:

```tsx
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
```

with:

```tsx
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 text-foreground">
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: exits 0, no errors.

- [ ] **Step 6: Commit**

```bash
git add components/skills.tsx components/experience.tsx components/projects.tsx components/contact.tsx
git commit -m "bump section heading scale across Skills/Experience/Projects/Contact"
```

---

### Task 4: Experience - de-tint the date pill

**Files:**
- Modify: `components/experience.tsx:67`

**Interfaces:**
- Consumes: `--accent` from Task 1 via the existing `text-accent` / `border-accent` Tailwind utilities.

- [ ] **Step 1: Replace the filled pill with a hairline + text treatment**

In `components/experience.tsx:67`, replace:

```tsx
                <span className="shrink-0 self-start px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-500/10 text-sky-500 border border-sky-500/20">
```

with:

```tsx
                <span className="shrink-0 self-start px-2.5 py-0.5 rounded-full text-xs font-mono bg-transparent text-accent border border-accent/30">
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add components/experience.tsx
git commit -m "experience: de-tint date pill to hairline + text"
```

---

### Task 5: Projects - de-tint the featured badge

**Files:**
- Modify: `components/projects.tsx:222`

**Interfaces:**
- Consumes: `--accent` from Task 1 via the existing `text-accent` / `border-accent` Tailwind utilities.

- [ ] **Step 1: Replace the filled badge with a hairline + text treatment**

In `components/projects.tsx:222`, replace:

```tsx
                        <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/30">
```

with:

```tsx
                        <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider bg-transparent text-accent border border-accent/30">
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add components/projects.tsx
git commit -m "projects: de-tint featured badge to hairline + text"
```

---

### Task 6: Full verification pass

**Files:**
- None (verification only).

**Interfaces:**
- Consumes: the complete state of Tasks 1-5.

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 2: Start the dev server and load the site**

Use `preview_start` (or reuse a running dev server) and open the site at its preview URL.

- [ ] **Step 3: Verify WCAG AA contrast for the new accent**

Use `preview_inspect` on a `text-accent` element (e.g. the hero typed-role text) and on the primary CTA button, in both light and dark mode. Compute the contrast ratio of `--accent` / `--accent-hover` against `--bg` and `--surface`. Expected: >= 4.5:1 for normal text, >= 3:1 for large text/UI components. If a ratio fails, darken (light mode) or lighten (dark mode) `--accent` in `app/globals.css` by small increments and re-check - do not change `--bg` / `--surface` / `--fg`.

- [ ] **Step 4: Screenshot all four combinations**

Using `preview_screenshot`:
- Desktop, dark mode (default)
- Desktop, light mode (toggle via the theme button)
- Mobile (`preview_resize` to 390x844), dark mode
- Mobile, light mode

Expected: hero name renders solid (no gradient) at the larger scale; experience date pills and the projects featured badge show hairline borders with no fill; no layout breakage at either viewport.

- [ ] **Step 5: Spot-check `prefers-reduced-motion` and keyboard focus**

Confirm the marquee, typing effect, and scroll-reveal animations stop under reduced motion (existing `@media (prefers-reduced-motion: reduce)` block in `app/globals.css`, unmodified by this plan). Tab through the nav and confirm `:focus-visible` still shows the accent outline.

- [ ] **Step 6: Confirm no functional regressions**

Use `preview_console_logs` to confirm no new console errors. Confirm the language toggle still switches EN/VI copy and the theme toggle still switches light/dark. Full form-submit and GA4 event testing isn't required since `lib/data.ts`, the form's `onSubmit` handler, and analytics wiring were not touched by any task.

- [ ] **Step 7: Final commit if Step 3 required a token adjustment**

If Step 3 changed any value in `app/globals.css`:

```bash
git add app/globals.css
git commit -m "tune accent contrast after WCAG verification"
```

If no adjustment was needed, skip this step.

---

## Self-Review

- **Spec coverage:** Color Tokens -> Task 1. Typography (hero + section headings) -> Tasks 2-3. Surfaces & Borders -> Task 2 Step 3. Section-by-Section de-tinting -> Tasks 4-5; all "no change needed" sections (Nav, About, Contact inputs, back-to-top, theme/language toggles) confirmed by the file reads during spec-writing and intentionally have no task. Theme Compatibility -> Task 1 (both modes) + Task 6 Step 3. Verification section -> Task 6 Steps 1-6. Out of Scope -> Global Constraints "do not touch" list. No gaps found.
- **Placeholder scan:** no TBD/TODO; every step has exact code, exact commands, or an exact tool-call instruction.
- **Type consistency:** no new functions/types introduced; all changes are literal className/CSS-token edits, so there's no signature drift to check.

**Execution choice:** going with inline execution (`superpowers:executing-plans`) rather than per-task subagents - six tightly-coupled, fully-specified, mechanical edits across a handful of files don't carry enough independent surface area to justify fresh-subagent context reload per task.
