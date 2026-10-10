"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

type RevealTextProps = {
  /** One string, or explicit lines; each wraps naturally and every rendered line reveals in turn. */
  text: string | string[];
  as?: "h1" | "h2" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount instead of waiting for the element to scroll into view. */
  immediate?: boolean;
};

/**
 * Line-by-line reveal: each rendered line slides up from a mask, 0.08s apart.
 * Words are measured after layout so the stagger follows the real line breaks at any width.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const [rows, setRows] = useState<number[] | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const lines = Array.isArray(text) ? text : [text];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fires once on observe (before first paint) and again whenever the text reflows.
    const observer = new ResizeObserver(() => {
      const words = element.querySelectorAll<HTMLElement>("[data-word]");
      const next: number[] = [];
      let row = -1;
      let lastTop = Number.NEGATIVE_INFINITY;

      words.forEach((word) => {
        const top = word.getBoundingClientRect().top;
        if (Math.abs(top - lastTop) > 4) {
          row += 1;
          lastTop = top;
        }
        next.push(row);
      });

      setRows((previous) =>
        previous && previous.length === next.length && previous.every((value, i) => value === next[i])
          ? previous
          : next,
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const shown = rows !== null && (immediate || inView);
  const words = lines.map((line) => line.split(" "));
  // Index of each line's first word within the flat list of measured words.
  const offsets = words.map((_, i) => words.slice(0, i).reduce((sum, line) => sum + line.length, 0));

  return (
    <Tag ref={ref} className={className}>
      {words.map((line, lineIndex) => (
        <span key={lineIndex} className={cn("block", lineClassName)}>
          {line.map((word, wordIndex) => {
            const row = rows?.[offsets[lineIndex] + wordIndex] ?? 0;

            return (
              <span key={wordIndex}>
                {/* The mask. Negative insets leave room for italic overhang and descenders. */}
                <span
                  data-word
                  className="inline-block [clip-path:inset(-0.1em_-0.14em_-0.18em_-0.08em)]"
                >
                  <motion.span
                    data-motion="move"
                    className="inline-block"
                    initial={{ y: "130%" }}
                    animate={{ y: shown ? "0%" : "130%" }}
                    transition={{ duration: DURATION, ease: EASE, delay: delay + row * STAGGER }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
