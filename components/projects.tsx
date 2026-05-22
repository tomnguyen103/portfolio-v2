"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, ArrowDown } from "lucide-react";
import { projects, tagColor } from "@/lib/data";
import { trackEvent } from "@/lib/analytics";
import { useInViewTracking } from "@/lib/useInViewTracking";
import { useLanguage } from "./language-provider";

export default function Projects() {
  const sectionRef = useInViewTracking("projects");
  const { t } = useLanguage();

  const localizedProjects = projects.map((project, i) => ({
    ...project,
    description: t.projects.items[i].description,
  }));

  return (
    <section ref={sectionRef} id="projects" className="relative min-h-screen flex flex-col justify-center px-6 py-20 pb-24 bg-surface/30">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.projects.heading}
        </motion.h2>
        <motion.p
          className="text-muted text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.projects.subheading}
        </motion.p>

        <div className="flex flex-col gap-6">
          {localizedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ boxShadow: "0 20px 40px -10px rgba(14,165,233,0.2)" }}
              className="bg-surface rounded-2xl overflow-hidden border border-foreground/5 flex flex-col md:flex-row"
            >
              <div className={`relative w-full md:w-3/5 aspect-video md:aspect-auto md:min-h-65 shrink-0${project.imageFit === "contain" ? " bg-[#0d1117]" : ""}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={project.imageFit === "contain" ? "object-contain p-4" : "object-cover"}
                />
              </div>

              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-foreground">
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
                        className={`px-2.5 py-0.5 rounded-full text-sm font-medium border ${tagColor[tech] ?? "bg-accent/10 text-accent border-accent/20"}`}
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
          ))}
        </div>
      </div>

      <motion.a
        href="#contact"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        aria-label="Scroll to contact"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
