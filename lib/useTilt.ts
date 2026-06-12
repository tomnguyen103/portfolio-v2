import type { MouseEvent } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// Cursor-following 3D tilt for a card-like element.
// Returns spring-smoothed rotateX/rotateY motion values plus the mouse
// handlers that drive them. Pair with `transformPerspective` in the
// consumer's `style`. No-op under reduced motion (values stay at 0).
export function useTilt(maxDeg = 4) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 22 });

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 2 * maxDeg); // cursor right -> right edge dips away
    rx.set(-py * 2 * maxDeg); // cursor top -> top edge leans toward viewer
  }

  function onMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}
