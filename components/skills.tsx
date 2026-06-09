"use client";

import { motion, useReducedMotion } from "framer-motion";
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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const sectionRef = useInViewTracking("skills");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  return (
    <section ref={sectionRef} id="skills" className="px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.skills.heading}
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-12"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.skills.subheading}
        </motion.p>

        {/* Auto-scrolling brand-logo marquee (pauses on hover, static under reduced motion) */}
        <div className="marquee-mask relative overflow-hidden mb-14">
          <div className="animate-marquee flex w-max items-center gap-12">
            {[...marqueeLogos, ...marqueeLogos].map(({ Icon, label }, i) => (
              <div
                key={i}
                aria-hidden={i >= marqueeLogos.length}
                className="flex items-center gap-2 shrink-0 text-foreground/45 hover:text-accent transition-colors"
              >
                <Icon className="w-7 h-7" title={label} />
                <span className="text-sm font-mono whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grouped skill categories — borderless lists, distinct from the project cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10"
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} variants={item}>
                <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-foreground/10">
                  <Icon className="w-5 h-5 text-accent shrink-0" />
                  <h3 className="font-semibold text-foreground">
                    {t.skills.cards[index].title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-mono border ${tagClass}`}
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
