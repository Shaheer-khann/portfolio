"use client";

import { motion, useScroll } from "framer-motion";

/** Lime 2px reading progress bar pinned to the top of paper pages. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
    />
  );
}
