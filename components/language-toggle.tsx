// components/language-toggle.tsx
"use client";

import { useLanguage } from "./language-provider";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  return (
    <button
      onClick={() => setLocale(locale === "en" ? "vi" : "en")}
      aria-label="Toggle language"
      className="px-2 py-1 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
    >
      {locale === "en" ? "VI" : "EN"}
    </button>
  );
}
