"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";

const tags = {
  div: motion.div,
  p: motion.p,
  li: motion.li,
  span: motion.span,
  figure: motion.figure,
  blockquote: motion.blockquote,
};

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  /** Animate on mount instead of waiting for the element to scroll into view. */
  immediate?: boolean;
};

/** Fade-up: 24px rise + fade, once, when 20% of the element is in view. */
export function Reveal({ children, as = "div", className, delay = 0, immediate = false }: RevealProps) {
  const Tag = tags[as];
  const shown = { opacity: 1, y: 0 };

  return (
    <Tag
      data-motion="move"
      className={className}
      initial={{ opacity: 0, y: 24 }}
      {...(immediate ? { animate: shown } : { whileInView: shown, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration: DURATION, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
