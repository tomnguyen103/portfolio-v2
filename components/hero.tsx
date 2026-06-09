"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "./language-provider";

function useTypingEffect(roles: readonly string[], enabled: boolean) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    setRoleIndex(0);
    setDisplayed("");
    setPhase("typing");
  }, [roles]);

  useEffect(() => {
    if (!enabled) return;
    const current = roles[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          80
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pause"), 2000);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), 500);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      }
      setRoleIndex((i) => (i + 1) % roles.length);
      setPhase("typing");
    }
  }, [displayed, phase, roleIndex, roles, enabled]);

  // Reduced motion: skip the animation, show the first role statically.
  return enabled ? displayed : roles[0];
}

export default function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const typedText = useTypingEffect(t.hero.roles, !reduce);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Subtle technical dot-grid field (replaces the old animated blobs) */}
      <div className="bg-dot-grid absolute inset-0 -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Text content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-foreground"
            >
              {t.hero.greeting.split("Tom Nguyen").map((part, i, arr) => {
                if (i < arr.length - 1) {
                  const sentences = part.split(". ");
                  if (sentences.length > 1) {
                    return (
                      <span key={i}>
                        {sentences[0]}.{" "}
                        <span className="whitespace-nowrap">
                          {sentences[1]}
                          <span className="text-accent font-extrabold">Tom Nguyen</span>
                        </span>
                      </span>
                    );
                  }
                  return (
                    <span key={i} className="whitespace-nowrap">
                      {part}
                      <span className="text-accent font-extrabold">Tom Nguyen</span>
                    </span>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </motion.h1>

            <motion.div
              variants={item}
              className="text-xl sm:text-2xl text-muted mb-6 h-9 flex items-center justify-center md:justify-start gap-1"
            >
              <span className="text-accent font-medium">{typedText}</span>
              <span className="w-0.5 h-6 bg-accent animate-pulse inline-block" />
            </motion.div>

            <motion.p
              variants={item}
              className="text-foreground/70 text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <a
                href="#about"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors"
              >
                {t.hero.cta.about}
              </a>
              <a
                href="https://www.linkedin.com/in/tomnguyen103/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("linkedin_click", { location: "hero" })}
                className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
              >
                <FaLinkedinIn className="w-4 h-4" /> {t.hero.cta.linkedin}
              </a>
              <a
                href="https://github.com/tomnguyen103"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("github_click", { location: "hero" })}
                className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
              >
                <FaGithub className="w-4 h-4" /> {t.hero.cta.github}
              </a>
            </motion.div>
          </motion.div>

          {/* Profile photo */}
          <motion.div
            className="flex-shrink-0"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              <Image
                src="/images/pic00.jpg"
                alt="Tom Nguyen"
                width={256}
                height={256}
                className="rounded-full object-cover w-full h-full ring-2 ring-sky-500/30 shadow-2xl shadow-sky-950/20"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
