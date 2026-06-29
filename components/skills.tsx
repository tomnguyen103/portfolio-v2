"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiDjango,
  SiFlask,
  SiSpring,
  SiFastapi,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiPrisma,
  SiDocker,
  SiVercel,
  SiNetlify,
  SiExpo,
  SiGit,
  SiScikitlearn,
  SiPandas,
  SiTailwindcss,
} from "react-icons/si";
import { skillCards, tagClass } from "@/lib/data";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

const marqueeLogos: { Icon: IconType; label: string }[] = [
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiJavascript, label: "JavaScript" },
  { Icon: SiPython, label: "Python" },
  { Icon: SiReact, label: "React" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiDjango, label: "Django" },
  { Icon: SiFlask, label: "Flask" },
  { Icon: SiSpring, label: "Spring" },
  { Icon: SiFastapi, label: "FastAPI" },
  { Icon: SiMongodb, label: "MongoDB" },
  { Icon: SiMysql, label: "MySQL" },
  { Icon: SiSqlite, label: "SQLite" },
  { Icon: SiPrisma, label: "Prisma" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiVercel, label: "Vercel" },
  { Icon: SiNetlify, label: "Netlify" },
  { Icon: SiExpo, label: "Expo" },
  { Icon: SiGit, label: "Git" },
  { Icon: SiScikitlearn, label: "scikit-learn" },
  { Icon: SiPandas, label: "pandas" },
  { Icon: SiTailwindcss, label: "Tailwind" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Skills() {
  const sectionRef = useInViewTracking("skills");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section ref={sectionRef} id="skills" className="px-6 py-28 md:py-40">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="mb-14 max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t.skills.heading}
          </h2>
          <p className="mt-4 text-lg text-muted">{t.skills.subheading}</p>
        </motion.div>

        {/* Auto-scrolling stack strip (pauses on hover, static under reduced motion) */}
        <div className="marquee-mask relative mb-16 overflow-hidden border-y border-[color:var(--hairline)] py-6">
          <div className="animate-marquee flex w-max items-center gap-14">
            {[...marqueeLogos, ...marqueeLogos].map(({ Icon, label }, i) => (
              <div
                key={i}
                aria-hidden={i >= marqueeLogos.length}
                className="flex shrink-0 items-center gap-2.5 text-foreground/40 transition-colors hover:text-accent"
              >
                <Icon className="h-6 w-6" title={label} />
                <span className="whitespace-nowrap font-mono text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grouped capabilities - borderless lists, distinct from project cards */}
        <motion.div
          className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} variants={item}>
                <div className="mb-4 flex items-center gap-3 border-b border-[color:var(--hairline)] pb-4">
                  <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-medium tracking-tight text-foreground">
                    {t.skills.cards[index].title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border px-3 py-1 font-mono text-xs ${tagClass}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
