"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { experiences, projects } from "@/lib/data";
import { useLanguage } from "./language-provider";

function Stat({
  value,
  suffix = "",
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  // Count up from 0 the first time the stat scrolls into view
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, delay]);

  return (
    <div ref={ref}>
      <div className="font-mono text-3xl md:text-4xl font-bold text-foreground">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-xs md:text-sm text-muted">{label}</div>
    </div>
  );
}

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
        <div className="flex-1">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
            {t.hero.bio}
          </p>
          {/* Quick stats - counts derive from lib/data.ts so they never drift */}
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-foreground/10 pt-8">
            <Stat value={4} suffix="+" label={t.about.stats.years} delay={0} />
            <Stat
              value={projects.length}
              label={t.about.stats.projects}
              delay={0.15}
            />
            <Stat
              value={experiences.length}
              label={t.about.stats.companies}
              delay={0.3}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
