"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { thesis } from "@/lib/content";

// How many words are mid-fade at once; a wider window gives a softer scrub.
const SOFTNESS = 3;

type WordProps = {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
};

function Word({ children, progress, start, end }: WordProps) {
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <span className="relative inline-block">
      <span className="text-ghost">{children}</span>
      {/* The ink copy fades in over the ghost one, so only opacity animates. */}
      <motion.span
        aria-hidden="true"
        data-motion="scrub"
        style={{ opacity }}
        className="absolute inset-0 text-ink"
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Opening note. Words start ghost and turn ink as the reader scrolls through. */
export function Thesis() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = thesis.text.split(" ");
  const span = words.length + SOFTNESS - 1;

  return (
    <section className="py-24 md:py-[140px]">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
          {thesis.label}
        </Reveal>
        <p
          ref={ref}
          className="mt-[22px] max-w-[980px] text-[clamp(26px,3.2vw,42px)] leading-[1.25] font-medium tracking-[-0.015em]"
        >
          {words.map((word, i) => (
            <span key={i}>
              <Word progress={scrollYProgress} start={i / span} end={(i + SOFTNESS) / span}>
                {word}
              </Word>{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
