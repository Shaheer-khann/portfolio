"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/cn";
import { meta, ui } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useScrollTo } from "@/lib/useScrollTo";

const STICKY_AFTER = 80;
const SECTION_IDS = ui.nav.map((item) => item.id).filter((id) => id !== "top");

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const scrollTo = useScrollTo();
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [section, setSection] = useState("top");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;

    setScrolled(y > STICKY_AFTER);
    if (y <= STICKY_AFTER) setHidden(false);
    else if (y > previous + 4) setHidden(true);
    else if (y < previous - 4) setHidden(false);

    if (!onHome) return;
    // The active link is the last section whose top has passed the upper-middle of the viewport.
    const line = window.innerHeight * 0.45;
    let current = "top";
    for (const id of SECTION_IDS) {
      const element = document.getElementById(id);
      if (element && element.getBoundingClientRect().top <= line) current = id;
    }
    setSection(current);
  });

  // Paper pages belong to "Work".
  const active = onHome ? section : "work";

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setOpen(false);
    // On the homepage, scroll with Lenis instead of a route change.
    if (onHome && scrollTo(id)) event.preventDefault();
  }

  const hrefFor = (id: string) => (id === "top" ? "/" : `/#${id}`);

  return (
    <header
      onFocus={() => setHidden(false)}
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[translate,background-color,border-color] duration-500 ease-out-expo motion-reduce:translate-y-0",
        scrolled || open ? "border-line bg-bg" : "border-transparent bg-transparent",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div className="wrap grid grid-cols-[1fr_auto] items-center py-3.5 text-[14px] md:grid-cols-[1fr_auto_1fr] md:py-[22px]">
        <Link
          href="/"
          onClick={(event) => navigate(event, "top")}
          className="flex items-center gap-2 justify-self-start text-[17px] font-bold"
        >
          <span className="rounded-[7px] bg-ink px-[7px] py-[3px] leading-[1.3] font-extrabold text-white italic">
            SK
          </span>
          <span className="whitespace-nowrap max-[369px]:sr-only">{meta.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden gap-7 text-ink-soft md:flex">
          {ui.nav.map((item) => (
            <Link
              key={item.id}
              href={hrefFor(item.id)}
              onClick={(event) => navigate(event, item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className="link-draw transition-colors duration-300 hover:text-ink aria-[current]:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <Magnetic>
            <Link
              href={hrefFor("contact")}
              onClick={(event) => navigate(event, "contact")}
              className="block rounded-full border border-ink bg-bg px-[18px] py-2.5 leading-[1.3] font-medium transition-colors duration-300 hover:border-accent hover:bg-accent"
            >
              {ui.navCta}
            </Link>
          </Magnetic>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="grid size-[42px] place-items-center rounded-full border border-line bg-bg md:hidden"
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-[1.5px] bg-ink transition-transform duration-300 ease-out-expo",
                  open && "translate-y-[4.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[1.5px] bg-ink transition-transform duration-300 ease-out-expo",
                  open && "-translate-y-[4.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            data-motion="move"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-line bg-bg md:hidden"
          >
            <ul className="wrap py-2">
              {ui.nav.map((item) => (
                <li key={item.id} className="border-b border-line last:border-b-0">
                  <Link
                    href={hrefFor(item.id)}
                    onClick={(event) => navigate(event, item.id)}
                    aria-current={active === item.id ? "true" : undefined}
                    className="block py-4 text-[22px] font-semibold tracking-[-0.01em] text-ink-soft aria-[current]:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
