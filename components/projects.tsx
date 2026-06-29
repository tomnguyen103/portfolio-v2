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
import { ArrowUpRight } from "lucide-react";
import { projects, tagClass } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

// Projects are kept newest-first in lib/data.ts; each tab shows one page of 3.
const TAB_SIZE = 3;

type LocalProject = (typeof projects)[number] & { description: string[] };

function spotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
}

function ProjectMedia({
  project,
  className,
}: {
  project: LocalProject;
  className?: string;
}) {
  const contain = project.imageFit === "contain";
  return (
    <div
      className={`relative z-[1] overflow-hidden ${className ?? ""}`}
      style={contain ? { backgroundColor: project.imageBg ?? "#0d1117" } : undefined}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] ${
          contain ? "object-contain p-5" : "object-cover"
        }`}
      />
    </div>
  );
}

function ProjectLinks({ project }: { project: LocalProject }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("github_click", { project_title: project.title })}
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hairline-strong)] px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/60 hover:text-accent"
      >
        <FaGithub className="h-4 w-4" /> GitHub
      </a>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("project_demo_click", { project_title: project.title })}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hairline-strong)] px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/60 hover:text-accent"
        >
          Live demo <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </a>
      )}
    </div>
  );
}

function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className ?? ""}`}>
      {items.map((desc, di) => (
        <li key={di} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
          <span aria-hidden="true" className="shrink-0 select-none text-accent/70">-</span>
          <span>{desc}</span>
        </li>
      ))}
    </ul>
  );
}

function TechPills({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className={`rounded-full border px-2.5 py-0.5 font-mono text-xs ${tagClass}`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useInViewTracking("projects");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  // Tab index + slide direction of the last change (1 = forward, -1 = back)
  const [[tab, direction], setTabState] = useState([0, 0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const localizedProjects: LocalProject[] = projects.map((project, i) => ({
    ...project,
    description: [...t.projects.items[i].description],
  }));

  const pages: LocalProject[][] = [];
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

  // WAI-ARIA tabs pattern: arrow keys move focus and select (roving tabindex)
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
    enter: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: dir * 48 }),
    center: {
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0.01 }
        : { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) =>
      reduce
        ? { opacity: 0, transition: { duration: 0.01 } }
        : { opacity: 0, x: dir * -48, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
  };

  const page = pages[tab];
  const [feature, ...rest] = page;
  const featuredBadge = tab === 0;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-y border-[color:var(--hairline)] px-6 py-28 md:py-40"
      style={{ backgroundColor: "color-mix(in srgb, var(--surface) 45%, transparent)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Header left, tab control right (editorial masthead row) */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            className="max-w-xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {t.projects.heading}
            </h2>
            <p className="mt-4 text-lg text-muted">{t.projects.subheading}</p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              role="tablist"
              aria-label={t.projects.heading}
              onKeyDown={onTablistKeyDown}
              className="inline-flex items-center gap-1 rounded-full border border-[color:var(--hairline)] bg-[color:var(--surface)] p-1"
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
                    className={`relative cursor-pointer rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                      active ? "text-on-accent" : "text-muted hover:text-foreground"
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
        </div>

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
            {/* Featured showcase - large horizontal block */}
            <motion.article
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduce ? undefined : { y: -4 }}
              onMouseMove={spotlight}
              className="group card-spotlight flex flex-col overflow-hidden rounded-[1.5rem] border border-[color:var(--hairline)] bg-[color:var(--surface)] transition-colors duration-300 hover:border-accent/40 md:flex-row"
            >
              <ProjectMedia
                project={feature}
                className="aspect-video w-full shrink-0 md:aspect-auto md:min-h-[22rem] md:w-[56%]"
              />
              <div className="relative z-[1] flex flex-1 flex-col justify-center p-7 md:p-10">
                {featuredBadge && (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full border border-accent/30 bg-[color:var(--accent-soft)] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                    {t.projects.featured}
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {feature.title}
                </h3>
                <Bullets items={feature.description} className="mt-5" />
                <div className="mt-6">
                  <TechPills tech={feature.tech} />
                </div>
                <div className="mt-7">
                  <ProjectLinks project={feature} />
                </div>
              </div>
            </motion.article>

            {/* The rest - two-up grid of vertical cards */}
            {rest.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {rest.map((project, i) => (
                  <motion.article
                    key={project.title}
                    initial={reduce ? false : { opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: reduce ? 0 : (i + 1) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={reduce ? undefined : { y: -4 }}
                    onMouseMove={spotlight}
                    className="group card-spotlight flex flex-col overflow-hidden rounded-[1.5rem] border border-[color:var(--hairline)] bg-[color:var(--surface)] transition-colors duration-300 hover:border-accent/40"
                  >
                    <ProjectMedia project={project} className="aspect-video w-full" />
                    <div className="relative z-[1] flex flex-1 flex-col p-6 md:p-7">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                        {project.title}
                      </h3>
                      <Bullets items={project.description} className="mt-4" />
                      <div className="mt-5">
                        <TechPills tech={project.tech} />
                      </div>
                      <div className="mt-6 pt-1">
                        <ProjectLinks project={project} />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
