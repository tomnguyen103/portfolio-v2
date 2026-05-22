# GA4 Analytics Integration — Design Spec

**Date:** 2026-05-22  
**Status:** Approved

---

## Overview

Integrate Google Analytics 4 (GA4) into the portfolio site to track visitor traffic and conversion events (resume downloads, LinkedIn/GitHub clicks, project demo clicks, contact form submissions) at zero cost.

---

## Architecture

### GA4 Script Loading

Add two `<Script>` tags to `app/layout.tsx` using `next/script` with `strategy="afterInteractive"`:

1. The GA4 loader: `https://www.googletagmanager.com/gtag/js?id=<MEASUREMENT_ID>`
2. An inline initialization script that calls `window.gtag('config', ...)` with the Measurement ID

The Measurement ID is read from `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID` — set in `.env.local` for local dev and as a Netlify environment variable for production.

### Analytics Utility

New file `lib/analytics.ts` exports a single typed function:

```ts
trackEvent(eventName: string, params?: Record<string, unknown>): void
```

It guards against `window.gtag` not being defined (e.g., during SSR or if the script is blocked by an ad blocker) so callers never need to check.

### Event Wiring

Each component calls `trackEvent` on user-initiated actions (click handlers, form submit). No page-level instrumentation is needed — GA4 tracks pageviews automatically via the `config` call.

---

## Events

All 5 events are marked as Conversions in the GA4 dashboard (toggled after deployment — no code change required).

| Event name | Trigger | Component |
|---|---|---|
| `resume_download` | Click on "Resume" nav link | `components/nav.tsx` |
| `linkedin_click` | Click on LinkedIn button | `components/hero.tsx`, `components/contact.tsx` |
| `github_click` | Click on GitHub button or project GitHub link | `components/hero.tsx`, `components/projects.tsx`, `components/contact.tsx` |
| `project_demo_click` | Click on project "Demo" button | `components/projects.tsx` |
| `contact_form_submit` | Successful Netlify form submission | `components/contact.tsx` |

---

## Files Changed

| File | Change |
|---|---|
| `app/layout.tsx` | Add GA4 `<Script>` tags |
| `lib/analytics.ts` | New — typed `trackEvent` utility |
| `components/nav.tsx` | Wire `resume_download` on Resume link |
| `components/hero.tsx` | Wire `linkedin_click`, `github_click` |
| `components/projects.tsx` | Wire `github_click`, `project_demo_click` |
| `components/contact.tsx` | Wire `linkedin_click`, `github_click`, `contact_form_submit` |
| `.env.local` | Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` (already done) |

---

## Environment Variables

| Variable | Where set |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `.env.local` (local), Netlify env vars (production) |

---

## Post-Deploy: Mark Events as Conversions

After deploying, go to GA4 dashboard → **Admin → Events** and toggle the "Mark as conversion" switch for all 5 events. This requires the events to have fired at least once before they appear in the list — test each interaction locally or in production first.

---

## Out of Scope

- Cookie consent banner (low risk for a personal portfolio at this scale)
- Session recordings or heatmaps
- Custom GA4 dimensions or user properties
