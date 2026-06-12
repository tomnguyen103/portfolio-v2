"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { projects, tagClass } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

export default function Projects() {
  const sectionRef = useInViewTracking("projects");
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const localizedProjects = projects.map((project, i) => ({
    ...project,
    description: t.projects.items[i].description,
  }));

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
          className="text-muted text-center mb-10"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.projects.subheading}
        </motion.p>

        <div className="flex flex-col gap-6">
          {localizedProjects.map((project, index) => {
            const featured = index === 0;
            // Zigzag the non-featured cards so image side alternates each row.
            const reverse = !featured && index % 2 === 0;

            return (
              <motion.div
                key={project.title}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
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
        </div>
      </div>
    </section>
  );
}
