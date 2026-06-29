"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "./language-provider";

function useRoleCycle(roles: readonly string[], enabled: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (!enabled) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [roles, enabled]);

  return roles[enabled ? index : 0];
}

export default function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const role = useRoleCycle(t.hero.roles, !reduce);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* Single, very faint ember warmth behind the portrait - no mesh, no blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 10%, transparent), transparent 62%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
          {/* Masthead */}
          <motion.div
            className="order-1"
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            <motion.div variants={item} className="mb-7">
              <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 animate-ping"
                    style={{ animationDuration: "2.4s" }}
                  />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {t.hero.availability}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display text-6xl font-semibold leading-[0.92] tracking-[-0.03em] text-foreground sm:text-7xl lg:text-8xl"
            >
              Tom Nguyen
            </motion.h1>

            {/* The ledger line - draws across on load, then the role lockup */}
            <motion.div variants={item} className="mt-6 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="draw-line h-px w-12 shrink-0 bg-accent sm:w-16"
              />
              <span className="h-7 overflow-hidden text-xl text-muted sm:text-2xl">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={role}
                    className="block font-medium text-foreground/85"
                    initial={reduce ? false : { y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {role}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-8 max-w-md text-lg leading-relaxed text-muted"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className="btn btn-primary group px-6 py-3">
                {t.hero.cta.work}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </a>
              <a href="#contact" className="btn btn-ghost px-6 py-3">
                {t.hero.cta.contact}
              </a>
              <span className="mx-1 hidden h-6 w-px bg-[color:var(--hairline)] sm:block" />
              <a
                href="https://github.com/tomnguyen103"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={() => trackEvent("github_click", { location: "hero" })}
                className="rounded-full border border-[color:var(--hairline-strong)] p-3 text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                <FaGithub className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tomnguyen103/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={() => trackEvent("linkedin_click", { location: "hero" })}
                className="rounded-full border border-[color:var(--hairline-strong)] p-3 text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                <FaLinkedinIn className="h-4.5 w-4.5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Portrait - warm-framed studio headshot */}
          <motion.div
            className="order-2 mx-auto w-full max-w-[17rem] sm:max-w-[20rem] md:mx-0 md:ml-auto md:max-w-none"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portrait-frame relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <Image
                src="/images/pic00.jpg"
                alt="Tom Nguyen"
                fill
                sizes="(min-width: 768px) 40vw, 80vw"
                className="object-cover object-top"
                priority
              />
              {/* Edge vignette feathers the studio-white into the canvas (frames it
                  like a print), warm bottom scrim grounds it, faint ember top-light */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(96% 96% at 50% 36%, transparent 46%, color-mix(in srgb, var(--canvas) 82%, transparent) 100%), linear-gradient(180deg, transparent 52%, color-mix(in srgb, var(--canvas) 88%, transparent)), radial-gradient(120% 80% at 72% 2%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 52%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
