# Time-Based Theme Detection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set the initial theme (light 6am-6pm, dark otherwise) from device time, respecting any manual preference the visitor has ever toggled.

**Architecture:** A new `TimeBasedTheme` client component mounts inside `ThemeProvider` and calls `setTheme` based on device hour - unless a `theme-user-set` flag exists in `localStorage`, indicating the visitor has already manually overridden the theme. `ThemeToggle` writes this flag on every manual toggle so subsequent visits skip time-based logic.

**Tech Stack:** Next.js 14 App Router, next-themes (`useTheme`), React `useEffect`, `localStorage`

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `components/time-based-theme.tsx` | Client component; reads hour + flag, calls `setTheme` once on mount |
| Modify | `app/layout.tsx` | Import + render `<TimeBasedTheme />` inside `<ThemeProvider>` |
| Modify | `components/theme-toggle.tsx` | Write `theme-user-set` flag before calling `setTheme` |

---

### Task 1: Create the `TimeBasedTheme` component

**Files:**
- Create: `components/time-based-theme.tsx`

- [ ] **Step 1: Create the file with the following content**

`components/time-based-theme.tsx`:
```tsx
"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function TimeBasedTheme() {
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

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npm run build
```
Expected: build completes with no errors. Look for zero TypeScript errors in the output.

- [ ] **Step 3: Commit**

```bash
git add components/time-based-theme.tsx
git commit -m "feat: add TimeBasedTheme client component"
```

---

### Task 2: Mount `TimeBasedTheme` inside `ThemeProvider` in layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add the import and render the component**

Replace the contents of `app/layout.tsx` with:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import TimeBasedTheme from "@/components/time-based-theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tom Nguyen | Full Stack & AI Developer",
  description:
    "Full Stack Developer & AI Engineer specializing in scalable web applications, AI agent architecture, and LLM workflows. Experienced with Next.js, React Native, Django, Mendix, and Gemini SDK. CS graduate from Cal State LA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TimeBasedTheme />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npm run build
```
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: mount TimeBasedTheme in root layout"
```

---

### Task 3: Write `theme-user-set` flag in `ThemeToggle` on manual toggle

**Files:**
- Modify: `components/theme-toggle.tsx`

- [ ] **Step 1: Update the onClick handler to write the flag**

Replace the contents of `components/theme-toggle.tsx` with:
```tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => {
        try { localStorage.setItem("theme-user-set", "true"); } catch {}
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-muted hover:text-foreground transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-muted hover:text-foreground transition-colors" />
      )}
    </button>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npm run build
```
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/theme-toggle.tsx
git commit -m "feat: persist manual theme preference on toggle"
```

---

### Task 4: Manual verification

Start the dev server: `npm run dev` - navigate to `http://localhost:3000`.

- [ ] **Step 1: Verify time-based theme applies on fresh visit**

Open browser DevTools → Console. Clear any saved state and reload:
```js
localStorage.removeItem("theme-user-set"); localStorage.removeItem("theme"); location.reload();
```
- If current device hour is 6-17: page should load in **light** theme.
- If current device hour is 18-23 or 0-5: page should load in **dark** theme.

- [ ] **Step 2: Verify manual toggle saves the flag**

With no `theme-user-set` flag, click the theme toggle button once. Then in DevTools Console:
```js
localStorage.getItem("theme-user-set") // expected: "true"
```
Reload the page - theme should remain as toggled, not reset by time.

- [ ] **Step 3: Verify saved preference persists on return visit**

After toggling (flag is set), reload the page multiple times. Theme must stay on the manually chosen value regardless of current hour.

- [ ] **Step 4: Verify incognito resets to time-based**

Open an incognito window → `http://localhost:3000`.
Expected: theme is set by current device time. `localStorage.getItem("theme-user-set")` returns `null`.
