// components/language-provider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Translations } from "@/lib/translations";

type Locale = "en" | "vi";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "vi") setLocaleState("vi");
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
