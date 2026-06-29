"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "@/lib/data";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

export default function Experience() {
  const sectionRef = useInViewTracking("experience");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const localizedExperiences = experiences.map((exp, i) => ({
    ...exp,
    bullets: t.experience.entries[i].bullets,
  }));

  return (
    <section ref={sectionRef} id="experience" className="px-6 py-28 md:py-40">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t.experience.heading}
          </h2>
          <p className="mt-4 text-lg text-muted">{t.experience.subheading}</p>
        </motion.div>

        {/* The ledger - a single ember spine threading every role */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-0 top-1 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent"
          />

          {localizedExperiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.start}`}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: reduce ? 0 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-14 pl-8 last:mb-0 sm:pl-12"
            >
              {/* Spine marker */}
              <span className="absolute left-0 top-1.5 flex h-3 w-3 -translate-x-1/2">
                {exp.end === "Present" && (
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping"
                    style={{ animationDuration: "2.6s" }}
                  />
                )}
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent ring-4 ring-[color:var(--canvas)]" />
              </span>

              <div className="mb-1 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                  {exp.company}
                  <span className="ml-2 align-middle font-sans text-sm font-normal text-muted">
                    {exp.type}
                  </span>
                </h3>
                <span className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] text-accent">
                  {exp.start} - {exp.end}
                </span>
              </div>

              <p className="font-medium text-foreground/90">{exp.title}</p>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {exp.location}
              </p>

              <ul className="space-y-3">
                {exp.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                    <span aria-hidden="true" className="shrink-0 select-none text-accent/70">
                      -
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
