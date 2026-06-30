"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

type LocalProject = (typeof projects)[number] & { description: string[] };
type Layout = "full" | "left" | "right";

// Composition per plate - "full" breaks the side-by-side runs so no more than
// two split layouts ever sit in a row.
const LAYOUTS: Layout[] = ["full", "left", "right", "full", "left", "right"];

function PlateImage({ project }: { project: LocalProject }) {
  const contain = project.imageFit === "contain";
  return (
    <div
      className="relative overflow-hidden rounded-sm border border-[color:var(--hairline)]"
      style={contain ? { backgroundColor: project.imageBg ?? "#0d1117" } : undefined}
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className={`plate-img ${contain ? "object-contain p-5" : "object-cover"}`}
        />
      </div>
    </div>
  );
}

function PlateCaption({
  project,
  n,
  featured,
  featuredLabel,
}: {
  project: LocalProject;
  n: string;
  featured: boolean;
  featuredLabel: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-faint">{n}</span>
        {featured && <span className="label text-accent">{featuredLabel}</span>}
      </div>
      <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {project.title}
      </h3>
      <ul className="mt-4 max-w-[58ch] space-y-2">
        {project.description.map((line, i) => (
          <li key={i} className="text-[0.95rem] leading-relaxed text-muted">
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
        {project.tech.map((tname) => (
          <span key={tname} className="font-mono text-xs text-faint">
            {tname}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("github_click", { project_title: project.title })}
          className="link-underline inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-foreground"
        >
          <FaGithub className="h-4 w-4" /> GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("project_demo_click", { project_title: project.title })}
            className="link-underline inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent"
          >
            Live demo <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useInViewTracking("projects");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const items: LocalProject[] = projects.map((project, i) => ({
    ...project,
    description: [...t.projects.items[i].description],
  }));

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="mx-auto max-w-[78rem] px-6 py-24 md:py-32"
    >
      <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="font-display text-6xl font-bold leading-none text-faint">04</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
            {t.projects.heading}
          </h2>
          <p className="mt-3 max-w-[26ch] text-sm text-muted">{t.projects.subheading}</p>
        </div>
        <div className="hidden lg:col-span-9 lg:block" />
      </div>

      <div className="mt-4 space-y-24 md:space-y-32">
        {items.map((project, i) => {
          const layout = LAYOUTS[i % LAYOUTS.length];
          const n = String(i + 1).padStart(2, "0");
          const caption = (
            <PlateCaption
              project={project}
              n={n}
              featured={i === 0}
              featuredLabel={t.projects.featured}
            />
          );
          const image = <PlateImage project={project} />;

          return (
            <motion.article
              key={project.title}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="plate group"
            >
              {layout === "full" ? (
                <div>
                  {image}
                  <div className="mt-7 grid gap-x-10 gap-y-4 md:grid-cols-12">
                    <div className="md:col-span-12">{caption}</div>
                  </div>
                </div>
              ) : (
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                  <div className={layout === "right" ? "md:order-2" : ""}>{image}</div>
                  <div className={layout === "right" ? "md:order-1" : ""}>{caption}</div>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
