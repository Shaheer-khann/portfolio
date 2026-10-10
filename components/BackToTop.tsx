"use client";

import { Arrow } from "@/components/ui/Arrow";
import { ui } from "@/lib/content";
import { useScrollTo } from "@/lib/useScrollTo";

export function BackToTop() {
  const scrollTo = useScrollTo();

  return (
    <button
      type="button"
      onClick={() => scrollTo("top")}
      className="group inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-300 hover:text-ink"
    >
      <span className="link-draw">{ui.backToTop}</span>
      <Arrow
        direction="up"
        className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-1"
      />
    </button>
  );
}
