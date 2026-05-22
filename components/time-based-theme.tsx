"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function TimeBasedTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    let userSet = false;
    try { userSet = !!localStorage.getItem("theme-user-set"); } catch {}
    if (!userSet) {
      const hour = new Date().getHours();
      setTheme(hour >= 6 && hour < 18 ? "light" : "dark");
    }
  }, [setTheme]);

  return null;
}
