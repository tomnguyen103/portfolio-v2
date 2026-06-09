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
    <section ref={sectionRef} id="experience" className="px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.experience.heading}
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-12"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.experience.subheading}
        </motion.p>

        <div className="relative ml-1.5">
          <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-sky-500/30" />

          {localizedExperiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.start}`}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.1 }}
              className="relative pl-8 mb-10 last:mb-0"
            >
              <span className="absolute left-[-7px] top-1.5 w-3 h-3 rounded-full bg-sky-500 ring-2 ring-sky-500/20" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                <span className="font-semibold text-foreground">
                  {exp.company}{" "}
                  <span className="font-normal text-muted text-sm">· {exp.type}</span>
                </span>
                <span className="shrink-0 self-start px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  {exp.start} - {exp.end}
                </span>
              </div>

              <p className="font-medium text-foreground mb-0.5">{exp.title}</p>
              <p className="text-sm text-muted mb-3">{exp.location}</p>

              <ul className="space-y-1.5">
                {exp.bullets.map((bullet, bi) => (
                  <li key={bi} className="text-base text-muted flex gap-2">
                    <span className="text-accent mt-0.5 shrink-0">•</span>
                    {bullet}
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
