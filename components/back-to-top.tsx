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
    setVisible(v > 600);
  });

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
          className="nav-glass fixed bottom-6 right-6 z-40 rounded-full p-3 text-muted transition-colors hover:text-accent"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
