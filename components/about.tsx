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
      <div className="font-display text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="about" className="px-6 py-28 md:py-40">
      <motion.div
        className="mx-auto max-w-4xl"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {t.hero.aboutLabel}
        </span>

        <p className="mt-7 text-balance text-2xl font-light leading-[1.45] tracking-tight text-foreground/90 md:text-[2rem] md:leading-[1.4]">
          {t.hero.bio}
        </p>

        {/* Stats - plain numbers over hairlines, no boxes */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[color:var(--hairline)] pt-10">
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
      </motion.div>
    </section>
  );
}
