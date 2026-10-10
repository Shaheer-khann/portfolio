"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

// Lenis drives the native window scroll, so position: sticky and Framer Motion's useScroll
// keep working. It turns its own smoothing off for prefers-reduced-motion.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, stopInertiaOnNavigate: true }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
