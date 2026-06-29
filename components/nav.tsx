"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import LanguageToggle from "./language-toggle";
import { useLanguage } from "./language-provider";
import { trackEvent } from "@/lib/analytics";

const sectionIds = ["top", "about", "skills", "experience", "projects", "contact"];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const { locale, t } = useLanguage();
  const reduce = useReducedMotion();

  // Page scroll progress, smoothed - drawn as the ember "ledger line" under the island
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  // Highlight the link of the section currently crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: t.nav.home, href: "#top" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const resumeHref = locale === "vi" ? "/resume-vi.html" : "/resume.html";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
      <motion.nav
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="nav-glass relative w-full max-w-5xl rounded-full"
      >
        {/* Scroll progress - the ledger line, drawn along the island's lower edge */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-5 right-5 h-px origin-left bg-accent/70"
        />

        <div className="flex h-13 items-center justify-between gap-3 pl-5 pr-3 md:h-14">
          <a
            href="#top"
            className="font-display text-base font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
          >
            Tom Nguyen
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("resume_view")}
              className="hidden rounded-full border border-[color:var(--hairline-strong)] px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent lg:inline-flex"
            >
              {t.nav.resume}
            </a>
            <div className="hidden h-5 w-px bg-[color:var(--hairline)] lg:block" />
            <LanguageToggle />
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="rounded-full p-2 text-muted transition-colors hover:bg-foreground/5 hover:text-foreground lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="flex flex-col gap-0.5 border-t border-[color:var(--hairline)] px-3 py-3 lg:hidden">
            {navLinks.map((link) => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-2xl px-4 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-foreground/5 text-accent"
                      : "text-muted hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMenuOpen(false);
                trackEvent("resume_view");
              }}
              className="mt-1 rounded-2xl border border-[color:var(--hairline-strong)] px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              {t.nav.resume}
            </a>
          </div>
        )}
      </motion.nav>
    </header>
  );
}
