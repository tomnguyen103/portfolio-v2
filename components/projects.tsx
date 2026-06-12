"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { projects, tagClass } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

// Projects are kept newest-first in lib/data.ts; each tab shows one page of 3.
const TAB_SIZE = 3;

export default function Projects() {
  const sectionRef = useInViewTracking("projects");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  // Tab index + slide direction of the last change (1 = forward, -1 = back),
  // stored together so the exit animation always reads the matching direction.
  const [[tab, direction], setTabState] = useState([0, 0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const localizedProjects = projects.map((project, i) => ({
    ...project,
    description: t.projects.items[i].description,
  }));

  const pages: (typeof localizedProjects)[] = [];
  for (let i = 0; i < localizedProjects.length; i += TAB_SIZE) {
    pages.push(localizedProjects.slice(i, i + TAB_SIZE));
  }
  const labels = pages.map(
    (_, i) => t.projects.tabs[i] ?? String(i + 1).padStart(2, "0")
  );

  const selectTab = (next: number) => {
    if (next === tab) return;
    trackEvent("project_tab_click", { tab_label: labels[next] });
    setTabState([next, next > tab ? 1 : -1]);
  };

  // WAI-ARIA tabs pattern: arrow keys move focus and select (roving tabindex).
  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (tab + 1) % pages.length;
    else if (e.key === "ArrowLeft") next = (tab - 1 + pages.length) % pages.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = pages.length - 1;
    if (next !== null) {
      e.preventDefault();
      selectTab(next);
      tabRefs.current[next]?.focus();
    }
  };

  const panelVariants: Variants = {
    enter: (dir: number) =>
      reduce ? { opacity: 0 } : { opacity: 0, x: dir * 56 },
    center: {
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0.01 }
        : { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) =>
      reduce
        ? { opacity: 0, transition: { duration: 0.01 } }
        : {
            opacity: 0,
            x: dir * -56,
            transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
          },
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="px-6 py-24 md:py-32 bg-surface/30"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.projects.heading}
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-8"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.projects.subheading}
        </motion.p>

        {/* Segmented tab control: sliding sky pill marks the active page */}
        <motion.div
          className="flex justify-center mb-12"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div
            role="tablist"
            aria-label={t.projects.heading}
            onKeyDown={onTablistKeyDown}
            className="inline-flex items-center gap-1 p-1 rounded-full bg-surface border border-foreground/10"
          >
            {labels.map((label, i) => {
              const active = i === tab;
              return (
                <button
                  key={label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`projects-tab-${i}`}
                  aria-selected={active}
                  aria-controls="projects-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectTab(i)}
                  className={`relative px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    active ? "text-white" : "text-muted hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="projects-tab-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Direction-aware page swap: old page slides out, new one slides in */}
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={tab}
            id="projects-panel"
            role="tabpanel"
            aria-labelledby={`projects-tab-${tab}`}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col gap-6"
          >
            {pages[tab].map((project, index) => {
              const featured = tab === 0 && index === 0;
              // Zigzag the non-featured cards so image side alternates each row.
              const zigzagIndex = tab === 0 ? index - 1 : index;
              const reverse = !featured && zigzagIndex % 2 === 1;

              return (
                <motion.div
                  key={project.title}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  onMouseMove={(e) => {
                    // Feed the cursor position to the .card-spotlight glow
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
                  }}
                  className={`group card-spotlight bg-surface rounded-2xl overflow-hidden border border-foreground/10 hover:border-accent/40 transition-colors flex flex-col ${
                    reverse ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div
                    className="relative w-full overflow-hidden aspect-video md:aspect-auto shrink-0 md:w-1/2 md:min-h-64"
                    style={
                      project.imageFit === "contain"
                        ? { backgroundColor: project.imageBg ?? "#0d1117" }
                        : undefined
                    }
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`transition-transform duration-500 group-hover:scale-[1.04] ${
                        project.imageFit === "contain"
                          ? "object-contain p-4"
                          : "object-cover"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
                    <div>
                      {featured && (
                        <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/30">
                          {t.projects.featured}
                        </span>
                      )}
                      <h3
                        className={`font-bold mb-3 text-foreground ${
                          featured ? "text-xl md:text-2xl" : "text-lg"
                        }`}
                      >
                        {project.title}
                      </h3>

                      <ul className="space-y-1.5 mb-4">
                        {project.description.map((desc, di) => (
                          <li key={di} className="text-base text-muted flex gap-2">
                            <span className="text-accent mt-0.5 shrink-0">•</span>
                            {desc}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${tagClass}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("github_click", { project_title: project.title })}
                        className="flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-accent hover:text-white rounded-lg text-sm transition-colors border border-foreground/10 text-foreground"
                      >
                        <FaGithub className="w-4 h-4" /> GitHub
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent("project_demo_click", { project_title: project.title })}
                          className="flex items-center gap-1.5 px-4 py-2 bg-background hover:bg-accent hover:text-white rounded-lg text-sm transition-colors border border-foreground/10 text-foreground"
                        >
                          <ExternalLink className="w-4 h-4" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
