"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "./language-provider";

export default function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: 42 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };
  const fade: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };
  const initial = reduce ? false : "hidden";

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100dvh] max-w-[78rem] flex-col justify-start px-6 pb-16 pt-28 lg:justify-center"
    >
      {/* Eyebrow */}
      <motion.div
        variants={fade}
        initial={initial}
        animate="show"
        custom={0}
        className="label flex items-center gap-2.5"
      >
        <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-accent" />
        {t.hero.availability}
      </motion.div>

      {/* Masthead - stacked, each line rises from behind a clipping rule */}
      <h1
        aria-label="Tom Nguyen"
        className="mt-5 pb-[0.12em] font-display text-[16vw] font-extrabold leading-[0.92] tracking-[-0.03em] text-foreground sm:text-[13vw] lg:text-[9rem]"
      >
        {["Tom", "Nguyen"].map((word, i) => (
          <motion.span
            key={word}
            aria-hidden="true"
            className="block pb-[0.12em]"
            variants={rise}
            initial={initial}
            animate="show"
            custom={i}
          >
            {word}
          </motion.span>
        ))}
      </h1>
      {/* leading 0.92 + bottom padding guarantee the g/y descenders in "Nguyen" never clip */}

      {/* Drawn rule */}
      <div
        aria-hidden="true"
        className="draw-line mt-8 h-px w-full bg-[color:var(--hairline-strong)]"
      />

      {/* Coverline + actions, paired with the portrait plate */}
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col justify-between lg:col-span-7">
          <motion.p
            variants={fade}
            initial={initial}
            animate="show"
            custom={1}
            className="max-w-xl text-pretty text-2xl font-light leading-[1.4] text-foreground/90 md:text-[1.7rem]"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            variants={fade}
            initial={initial}
            animate="show"
            custom={2}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <a href="#projects" className="btn btn-primary px-6 py-3 text-sm">
              {t.hero.cta.work}
            </a>
            <a
              href="#contact"
              className="link-underline font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground"
            >
              {t.hero.cta.contact}
            </a>
            <span className="hidden h-4 w-px bg-[color:var(--hairline-strong)] sm:block" />
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/tomnguyen103"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={() => trackEvent("github_click", { location: "hero" })}
                className="text-muted transition-colors hover:text-accent"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tomnguyen103/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={() => trackEvent("linkedin_click", { location: "hero" })}
                className="text-muted transition-colors hover:text-accent"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Portrait plate - warm B&W, blooms to color on hover */}
        <motion.div
          variants={fade}
          initial={initial}
          animate="show"
          custom={1}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-sm border border-[color:var(--hairline-strong)] lg:ml-auto">
            <Image
              src="/images/pic00.jpg"
              alt="Tom Nguyen"
              fill
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
