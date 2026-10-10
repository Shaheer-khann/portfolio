"use client";

import { useRef } from "react";
import { animate } from "framer-motion";
import { hero } from "@/lib/content";

// The track is two identical halves, so the -50% loop is seamless. Each half must be wider
// than the 1280px column or a gap would show.
const GROUPS_PER_HALF = 4;
const SLOW_RATE = 0.3;

/** Slow keyword marquee under the hero. Continuous; eases to a slower rate on hover. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  function setRate(to: number) {
    const animation = track.current?.getAnimations()[0];
    if (!animation) return;
    animate(animation.playbackRate, to, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (rate) => {
        animation.playbackRate = rate;
      },
    });
  }

  return (
    <div
      onPointerEnter={() => setRate(SLOW_RATE)}
      onPointerLeave={() => setRate(1)}
      className="eyebrow mx-auto max-w-[1280px] overflow-hidden border-t border-line py-3.5 whitespace-nowrap"
    >
      <div ref={track} data-motion="loop" className="inline-block animate-marquee will-change-transform">
        {Array.from({ length: GROUPS_PER_HALF * 2 }, (_, group) => (
          // One readable copy; the rest only fills the loop.
          <span key={group} aria-hidden={group > 0}>
            {hero.marquee.map((label) => (
              <span key={label}>{label} · </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
