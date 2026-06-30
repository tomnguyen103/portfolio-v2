"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillCards } from "@/lib/data";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

export default function Skills() {
  const sectionRef = useInViewTracking("skills");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="mx-auto max-w-[78rem] px-6 py-24 md:py-32"
    >
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="font-display text-6xl font-bold leading-none text-faint">02</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
            {t.skills.heading}
          </h2>
          <p className="mt-3 max-w-[26ch] text-sm text-muted">{t.skills.subheading}</p>
        </div>

        <div className="lg:col-span-9">
          {skillCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-x-10 gap-y-3 border-t border-[color:var(--hairline)] py-7 first:border-t-0 first:pt-0 md:grid-cols-12"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:col-span-5">
                {t.skills.cards[index].title}
              </h3>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 md:col-span-7 md:justify-end md:text-right">
                {card.skills.map((skill) => (
                  <span key={skill} className="font-mono text-sm text-muted">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
