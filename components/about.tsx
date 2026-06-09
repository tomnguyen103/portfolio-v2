"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "./language-provider";

export default function About() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="about" className="px-6 py-16 md:py-24">
      <motion.div
        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 md:gap-12"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="shrink-0 text-xs font-mono uppercase tracking-[0.2em] text-accent md:pt-2">
          {t.hero.aboutLabel}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
          {t.hero.bio}
        </p>
      </motion.div>
    </section>
  );
}
