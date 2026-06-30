"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { experiences, projects } from "@/lib/data";
import { useLanguage } from "./language-provider";

function Stat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div ref={ref}>
      <div className="font-display text-5xl font-bold tracking-tight text-foreground">
        {display}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="label mt-2">{label}</div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section id="about" className="mx-auto max-w-[78rem] px-6 py-24 md:py-32">
      <motion.div
        className="grid gap-x-10 gap-y-10 lg:grid-cols-12"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Marginalia: numeral + label */}
        <div className="lg:col-span-3">
          <div className="font-display text-6xl font-bold leading-none text-faint">01</div>
          <div className="label mt-3">{t.hero.aboutLabel}</div>
        </div>

        {/* Editorial lead + figures */}
        <div className="lg:col-span-9">
          <p className="dropcap max-w-[52ch] text-xl leading-[1.6] text-foreground/90 md:text-[1.45rem] md:leading-[1.55]">
            {t.hero.bio}
          </p>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[color:var(--hairline)] pt-10">
            <Stat value={4} suffix="+" label={t.about.stats.years} />
            <Stat value={projects.length} label={t.about.stats.projects} />
            <Stat value={experiences.length} label={t.about.stats.companies} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
