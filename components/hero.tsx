"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ArrowDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "./language-provider";

function useTypingEffect(roles: readonly string[]) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    setRoleIndex(0);
    setDisplayed("");
    setPhase("typing");
  }, [roles]);

  useEffect(() => {
    const current = roles[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          80
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pause"), 2000);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), 500);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      }
      setRoleIndex((i) => (i + 1) % roles.length);
      setPhase("typing");
    }
  }, [displayed, phase, roleIndex, roles]);

  return displayed;
}

export default function Hero() {
  const { t } = useLanguage();
  const typedText = useTypingEffect(t.hero.roles);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-sky-700/20 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-sky-400/15 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Text content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-foreground">
              {t.hero.greeting.split("Tom Nguyen").map((part, i, arr) => {
                if (i < arr.length - 1) {
                  const sentences = part.split(". ");
                  if (sentences.length > 1) {
                    return (
                      <span key={i}>
                        {sentences[0]}.{" "}
                        <span className="whitespace-nowrap">
                          {sentences[1]}
                          <span className="text-accent font-extrabold">Tom Nguyen</span>
                        </span>
                      </span>
                    );
                  }
                  return (
                    <span key={i} className="whitespace-nowrap">
                      {part}
                      <span className="text-accent font-extrabold">Tom Nguyen</span>
                    </span>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </h1>

            <div className="text-xl sm:text-2xl text-muted mb-6 h-9 flex items-center justify-center md:justify-start gap-1">
              <span className="text-accent font-medium">{typedText}</span>
              <span className="w-0.5 h-6 bg-accent animate-pulse inline-block" />
            </div>

            <p className="text-foreground/80 text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8 md:border-l-2 md:border-accent/50 md:pl-4">
              {t.hero.bio}
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#skills"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors"
              >
                {t.hero.cta.skills}
              </a>
              <a
                href="https://www.linkedin.com/in/tomnguyen103/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("linkedin_click", { location: "hero" })}
                className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
              >
                <FaLinkedinIn className="w-4 h-4" /> {t.hero.cta.linkedin}
              </a>
              <a
                href="https://github.com/tomnguyen103"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("github_click", { location: "hero" })}
                className="px-6 py-3 bg-surface hover:bg-surface/80 border border-foreground/10 rounded-xl font-medium transition-colors flex items-center gap-2 text-foreground"
              >
                <FaGithub className="w-4 h-4" /> {t.hero.cta.github}
              </a>
            </div>
          </motion.div>

          {/* Profile photo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64">
              <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-xl" />
              <Image
                src="/images/pic00.jpg"
                alt="Tom Nguyen"
                width={256}
                height={256}
                className="relative rounded-full object-cover w-full h-full ring-2 ring-sky-500/40"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#skills"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        whileHover={{ scale: 1.3 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        aria-label="Scroll to skills"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
