// components/language-toggle.tsx
"use client";

import { useLanguage } from "./language-provider";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  return (
    <button
      onClick={() => setLocale(locale === "en" ? "vi" : "en")}
      aria-label="Toggle language"
      className="cursor-pointer rounded-full px-2.5 py-1.5 font-mono text-xs font-medium tracking-wider text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      {locale === "en" ? "VI" : "EN"}
    </button>
  );
}
