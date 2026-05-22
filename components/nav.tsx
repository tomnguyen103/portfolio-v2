"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import LanguageToggle from "./language-toggle";
import { useLanguage } from "./language-provider";
import { trackEvent } from "@/lib/analytics";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: "#top" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const resumeHref = locale === "vi" ? "/resume-vi.html" : "/resume.html";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "nav-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-bold text-lg tracking-tight hover:text-accent transition-colors"
        >
          Tom Nguyen
        </a>

        <div className="flex items-center gap-2">
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-base text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("resume_view")}
              className="ml-1 px-3 py-1.5 text-base font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg"
            >
              {t.nav.resume}
            </a>
          </div>

          <LanguageToggle />
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-surface transition-colors text-muted hover:text-foreground"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-foreground/5 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover:bg-surface"
            >
              {link.label}
            </a>
          ))}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { setMenuOpen(false); trackEvent("resume_view"); }}
            className="mt-1 px-3 py-2.5 text-sm font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-lg text-center"
          >
            {t.nav.resume}
          </a>
        </div>
      )}
    </nav>
  );
}
