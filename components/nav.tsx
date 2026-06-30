"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
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

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

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
    <motion.header
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--hairline)] bg-[color-mix(in_srgb,var(--canvas)_82%,transparent)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-[78rem] items-center justify-between gap-4 px-6">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          Tom Nguyen
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "true" : undefined}
                className={`font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("resume_view")}
            className="hidden font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:text-accent lg:inline link-underline"
          >
            {t.nav.resume}
          </a>
          <div className="hidden h-4 w-px bg-[color:var(--hairline-strong)] lg:block" />
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="text-muted transition-colors hover:text-foreground lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Scroll progress - a thin oxblood rule along the masthead's lower edge */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
      />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[color:var(--hairline)] px-6 py-4 lg:hidden">
          <div className="flex flex-col">
            {navLinks.map((link, i) => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-baseline gap-3 border-b border-[color:var(--hairline)] py-3 transition-colors ${
                    active ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  <span className="font-mono text-[0.65rem] text-faint">
                    {String(i).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl">{link.label}</span>
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
              className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent"
            >
              {t.nav.resume} &rarr;
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
