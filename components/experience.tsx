"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "@/lib/data";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

export default function Experience() {
  const sectionRef = useInViewTracking("experience");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const entries = experiences.map((exp, i) => ({
    ...exp,
    bullets: t.experience.entries[i].bullets,
  }));

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="mx-auto max-w-[78rem] px-6 py-24 md:py-32"
    >
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="font-display text-6xl font-bold leading-none text-faint">03</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
            {t.experience.heading}
          </h2>
          <p className="mt-3 max-w-[26ch] text-sm text-muted">{t.experience.subheading}</p>
        </div>

        <div className="lg:col-span-9">
          {entries.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.start}`}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-x-8 gap-y-4 border-t border-[color:var(--hairline)] py-10 first:border-t-0 first:pt-0 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  {exp.start} - {exp.end}
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-faint">
                  {exp.location}
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-faint">
                  {exp.type}
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {exp.company}
                </h3>
                <p className="mt-1 text-foreground/80">{exp.title}</p>
                <ul className="mt-5 space-y-3">
                  {exp.bullets.map((bullet, bi) => (
                    <li
                      key={bi}
                      className="max-w-[62ch] text-[0.95rem] leading-relaxed text-muted"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
