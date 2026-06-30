<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project runs **Next.js 16** (currently 16.2.6) — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

## Analytics
All GA4 event tracking goes through `lib/analytics.ts` → `trackEvent(eventName, params?)`.
Never call `window.gtag` directly. The helper is a no-op during SSR and when the GA4 script is absent.

Section-view tracking uses the `useInViewTracking(section)` hook from `lib/useInViewTracking.ts` — attach the returned ref to the section's root `<section>` element. Do not wire up `IntersectionObserver` manually.

## Static content
All site content (skills, projects, experience entries, tag color map) lives in `lib/data.ts`. Do not hardcode content inside components.

## Styling
Tailwind CSS v3 only — no inline styles, no CSS Modules. Custom CSS lives in `app/globals.css`. Accent color is `sky-500`; surface color is the `surface` CSS custom property.

## Page structure
Page sections render in this order (see `app/page.tsx`):
`Hero → Skills → Experience → Projects → Contact`

Each section must include a `useInViewTracking` ref and a bouncing `ArrowDown` scroll indicator pointing to the next section (except Contact, which has no scroll indicator).
