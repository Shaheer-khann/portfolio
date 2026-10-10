"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

/** Smooth-scrolls to a section id (or the top) through Lenis, with a native fallback. */
export function useScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const target = id === "top" ? null : document.getElementById(id);
      if (id !== "top" && !target) return false;

      if (lenis) {
        lenis.scrollTo(target ?? 0);
      } else if (target) {
        target.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }

      window.history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
      return true;
    },
    [lenis],
  );
}
