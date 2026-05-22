"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { skillCards, tagColor } from "@/lib/data";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  const sectionRef = useInViewTracking("skills");
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-screen flex flex-col justify-center px-6 py-20 pb-24">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.skills.heading}
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.skills.subheading}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={item}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px -10px rgba(14,165,233,0.25)",
                }}
                className="bg-surface rounded-2xl p-6 border border-foreground/5 transition-shadow"
              >
                <Icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="font-bold text-lg mb-3 text-foreground">
                  {t.skills.cards[index].title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${tagColor[skill] ?? "bg-accent/10 text-accent border-accent/20"}`}
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

      <motion.a
        href="#experience"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        aria-label="Scroll to experience"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
