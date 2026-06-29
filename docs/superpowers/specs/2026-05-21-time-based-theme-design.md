# Time-Based Theme Detection - Design Spec

**Date:** 2026-05-21
**Status:** Approved

---

## Overview

On page load, the portfolio determines the initial theme (light or dark) based on the visitor's local device time. Once a visitor manually toggles the theme, their explicit choice is saved and respected on all future visits.

---

## Behavior

### Decision logic (runs on every page load, client-side)

```
if localStorage["theme-user-set"] exists
  → do nothing (next-themes already restored their saved choice)
else
  → read device hour (0-23)
  → 6 ≤ hour < 18  →  setTheme("light")
  → otherwise       →  setTheme("dark")
```

**Daytime window:** 6:00 AM - 5:59 PM (device local time)
**Nighttime window:** 6:00 PM - 5:59 AM

### On manual toggle

```
write localStorage["theme-user-set"] = "true"
setTheme(opposite of current)
```

The flag is permanent for the browser/profile. No auto-reset. Incognito sessions clear it naturally on session end, treating the next incognito visit as a fresh visit (correct behavior).

---

## Data Model

| Key | Owner | Value | Purpose |
|---|---|---|---|
| `theme` | next-themes | `"dark"` \| `"light"` | Persists the active theme |
| `theme-user-set` | our code | `"true"` | Marks that the user has manually overridden the default |

---

## Components Changed

### `app/layout.tsx`

Add a `TimeBasedTheme` client component inside `<ThemeProvider>`, alongside `{children}`. It renders nothing and fires once after hydration:

```tsx
"use client";

function TimeBasedTheme() {
  const { setTheme } = useTheme();
  useEffect(() => {
    try {
      if (localStorage.getItem("theme-user-set")) return;
      const hour = new Date().getHours();
      setTheme(hour >= 6 && hour < 18 ? "light" : "dark");
    } catch {}
  }, []);
  return null;
}
```

`defaultTheme="dark"` and `enableSystem={false}` on `ThemeProvider` remain unchanged.

### `components/theme-toggle.tsx`

Add one line before calling `setTheme` in the toggle handler:

```ts
try { localStorage.setItem("theme-user-set", "true"); } catch {}
```

---

## Edge Cases

| Scenario | Behavior |
|---|---|
| SSR / no `window` | `useEffect` only runs client-side - no `localStorage` access on server |
| Brief dark→light flash for daytime visitors | Resolves in ~100ms after hydration; same trade-off as any dynamic next-themes default |
| Incognito / private browsing | `localStorage` works normally; clears on session end - correct behavior |
| `localStorage` unavailable | `try/catch` around all reads/writes; falls back to next-themes default silently |

---

## Files Modified

- `app/layout.tsx` - add `TimeBasedTheme` component
- `components/theme-toggle.tsx` - write `theme-user-set` flag on toggle

No new files. No changes to `nav.tsx`, `globals.css`, `lib/data.ts`, or any other file.
