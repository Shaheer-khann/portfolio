"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Maximum drift toward the cursor, in px. */
  strength?: number;
};

/** Primary CTAs drift toward the cursor (mouse only; off under reduced motion via CSS). */
export function Magnetic({ children, className, strength = 6 }: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  function onPointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      data-motion="move"
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.span>
  );
}
