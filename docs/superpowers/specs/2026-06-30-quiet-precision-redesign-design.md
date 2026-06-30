# Quiet Precision Redesign - Design

**Date:** 2026-06-30
**Status:** Approved

---

## Overview

Two full redesigns were already built and reverted today (Obsidian & Ember - warm dark/ember accent, ledger-line motif, Bricolage Grotesque; Editorial Monograph - light newsprint, oxblood accent, numbered sections, drop caps, Archivo). Both were rejected for the same root cause: they read as editorial/magazine pieces, not a software engineer's site. This redesign is a craft-elevation pass, not a personality swap - every section, interaction, and the sky-blue identity stay exactly where they are. What changes is typography confidence, color discipline, surface treatment, and motion precision, executed to a high-craft ("Dribbble-grade") bar.

---

## Principles

1. Engineer, not magazine - no section numerals, drop caps, mastheads, colophons, or ledger-line motifs.
2. Same IA, same interactions - nothing structural is removed or reordered.
3. One accent, used sparingly - reserved for deliberate moments, not surface tinting.
4. No new typeface - Geist + Geist Mono only.
5. Execution bar is the deliverable - no rough edges, deliberate spacing rhythm, considered micro-interactions, refined image treatment.

---

## Color Tokens - `app/globals.css`

| Token | Current (dark) | New (dark) | Current (light) | New (light) |
|---|---|---|---|---|
| `--accent` | `#0ea5e9` | `#2f8fd0` | `#0ea5e9` | `#0f6fb8` |
| `--accent-hover` | `#0284c7` | `#1c74b3` | `#0284c7` | `#0b5990` |
| `--bg` | `#0a0a0f` | unchanged | `#ffffff` | unchanged |
| `--surface` | `#111827` | unchanged | `#f8fafc` | unchanged |
| `--fg` | `#f9fafb` | unchanged | `#0f172a` | unchanged |
| `--muted` | `#6b7280` | unchanged | `#64748b` | unchanged |
| `--grad-from` | `#38bdf8` (dark), `#0284c7` (light) | **removed** | - | - |
| `--grad-to` | `#22d3ee` (dark), `#0891b2` (light) | unchanged | unchanged | unchanged |

- `--accent` / `--accent-hover` deepen and desaturate from stock Tailwind sky-500/600 toward a more considered, less "default template" blue. Verify both shades pass WCAG AA for normal text against their respective `--bg` and `--surface` during implementation; nudge the value if they don't.
- `--grad-from` is removed along with the `.text-gradient-accent` class that was its only consumer (see Hero, below). `--grad-to` is **kept** - `.hero-glow`'s second radial blob also consumes it (`app/globals.css:113`), and that effect is explicitly out of scope, so the token stays even though its gradient-text use is gone.

**Accent usage - stays as-is:** primary CTA fill (hero, contact submit), links/hover states, nav active-link text, focus-visible ring, typed-role text, About's mono eyebrow label, skill-card icons, card-spotlight hover glow, project card border-hover, nav resume button. These are already either text-only, hover-only, or a single deliberate filled control - exactly the "moments that should pop" the principle is for.

**Accent usage - de-tinted to hairline:**
- Hero name: drops `.text-gradient-accent`, renders in solid `text-foreground` at larger scale instead.
- Experience date pill: `bg-sky-500/10 text-sky-500 border-sky-500/20` → `bg-transparent text-accent border-accent/30` (hairline + text, no fill).
- Projects featured badge: same change, `bg-accent/10 text-accent border-accent/30` → `bg-transparent text-accent border-accent/30`.

**Explicitly out of scope (not touched):** the nav scroll-progress bar gradient, the hero's radial `.hero-glow` wash, the avatar conic-arc ring, and the experience timeline's fading line. None of these were named as a problem, and removing them isn't necessary to fix what was - leaving them is the surgical choice.

---

## Typography

Geist (sans) + Geist Mono only - already the only fonts loaded in `app/layout.tsx`; no additions, no changes needed there.

| Element | Current | New |
|---|---|---|
| Hero name (`hero.tsx` h1) | `text-4xl sm:text-5xl lg:text-6xl` | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl`, add `xl:tracking-[-0.02em]` |
| Section h2 (Skills/Experience/Projects/Contact) | `text-3xl sm:text-4xl` | `text-3xl sm:text-4xl md:text-5xl` |
| Mono usage (tags, dates, typed role) | already present | extend consistently; no new labeling/numbering system added anywhere |

The goal is scale and weight *contrast* - the hero name and section headings should feel confidently large next to body copy, rather than the current fairly narrow range between them.

The hero name's unprefixed (mobile, < 640px) tier stays at the original `text-4xl` rather than bumping with the rest of the scale: "Tom Nguyen" renders inside a `whitespace-nowrap` span (so the name never breaks mid-word, an existing, untouched constraint), and at `text-5xl` it overflows a 375px viewport and gets silently clipped by the hero section's `overflow-hidden`. Verified empirically at 320/375/640/768/1024/1280px that the corrected scale fits at every tier.

---

## Surfaces & Borders

Replace the one soft accent-tinted glow shadow with a neutral hairline + minimal shadow:

| Element | Current | New |
|---|---|---|
| Hero photo frame | `ring-2 ring-sky-500/30 shadow-2xl shadow-sky-950/20` | `ring-1 ring-foreground/10 shadow-sm` |

Project cards, the secondary CTA buttons, and back-to-top already use hairline `border-foreground/10` - no change needed there; they're already consistent with where the rest of the system is headed.

---

## Motion

No interactions are removed: typing/cycling hero role, skills marquee, project tabs with sliding pill + direction-aware slide, nav scroll-progress bar, card-spotlight cursor glow, avatar-ring rotation, About stat count-up, experience "Present" dot pulse, back-to-top fade/scale. Implementation should retune easing/duration for snappier consistency where it currently feels soft, but the inventory of effects stays exactly as documented in CLAUDE.md today.

---

## Section-by-Section

- **Nav** - unchanged structurally; glass-blur + progress bar stay. Resume button keeps its hairline-accent style.
- **Hero** - solid-ink name at the new larger scale (see Typography), hairline photo ring (see Surfaces), CTA hierarchy unchanged (one filled + two hairline buttons).
- **About** - layout unchanged; tighten vertical rhythm only.
- **Skills** - marquee and grouped lists unchanged; heading scale bump per Typography table.
- **Experience** - timeline unchanged; date pill de-tinted per Color Tokens.
- **Projects** - tabs, zigzag layout, and spotlight hover unchanged; featured badge de-tinted per Color Tokens.
- **Contact** - same fields/layout; input borders already hairline-based, no change.
- **Back-to-top, theme toggle, language toggle** - already neutral/hairline-based, no changes needed.

---

## Theme Compatibility

Both light and dark token sets are updated together (see Color Tokens table). All colors continue to flow through the existing CSS custom-property system - no hardcoded hex in components. `prefers-reduced-motion` handling and `:focus-visible` outlines are unchanged and must still work after the pass.

---

## Verification

- `tsc` / build stays green.
- New `--accent` / `--accent-hover` checked against WCAG AA on `--bg` and `--surface`, both themes.
- Screenshots: desktop + mobile, light + dark, before calling the work done.
- `prefers-reduced-motion` and keyboard focus states spot-checked.
- GA4 events, Netlify form submission, and the EN/VI language toggle confirmed still functional (none of their underlying logic changes).

---

## Out of Scope

- Any change to content, copy, IA, section order, or EN/VI translation strings.
- `public/resume.html` / `public/resume-vi.html` - separate static files with their own styling; not touched unless requested.
- GA4 event wiring, Netlify form behavior, theme system logic (time-based default + manual override) - visual-only pass, no behavioral changes.
- New typeface, illustration, 3D, or gradient-text treatments.
- Nav progress bar, hero radial glow, avatar conic ring, experience timeline fade - existing gradients/effects not named as problems, left as-is.
