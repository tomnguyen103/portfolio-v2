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
