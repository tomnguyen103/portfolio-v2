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
      className="cursor-pointer rounded-full p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" strokeWidth={1.5} />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={1.5} />
      )}
    </button>
  );
}
