"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "./language-provider";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label={t.nav.backToTop}
          initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-surface/80 backdrop-blur border border-foreground/10 text-muted shadow-lg hover:text-accent hover:border-accent/40 transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
