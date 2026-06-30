"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "./language-provider";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setVisible(v > 700);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label={t.nav.backToTop}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 border border-[color:var(--hairline-strong)] bg-[color-mix(in_srgb,var(--canvas)_80%,transparent)] px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted backdrop-blur transition-colors hover:border-foreground hover:text-foreground"
        >
          <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.75} /> {t.nav.backToTop}
        </motion.a>
      )}
    </AnimatePresence>
  );
}
