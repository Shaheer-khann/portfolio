"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { areas } from "@/lib/content";

/** The single dark band: a sticky label, a scroll-following highlight list, then the detail. */
export function Areas() {
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();

  // The item nearest the middle of the viewport is the active one.
  useMotionValueEvent(scrollY, "change", () => {
    const items = list.current?.children;
    if (!items) return;

    const middle = window.innerHeight / 2;
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < items.length; i += 1) {
      const rect = items[i].getBoundingClientRect();
      const offset = Math.abs(rect.top + rect.height / 2 - middle);
      if (offset < distance) {
        distance = offset;
        nearest = i;
      }
    }

    setActive(nearest);
  });

  return (
    <section className="mt-5 bg-band py-24 text-white md:py-[120px]">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[300px_1fr]">
          <div className="self-start md:sticky md:top-[120px]">
            <p className="eyebrow text-band-soft">{areas.label}</p>
            <h2 className="h-display mt-3.5 text-[clamp(40px,4.6vw,64px)]">{areas.heading} —</h2>
          </div>

          <ul ref={list}>
            {areas.highlights.map((item, i) => {
              const on = i === active;

              return (
                <li
                  key={item}
                  className="flex items-baseline gap-[22px] py-[22px] text-[clamp(28px,3.4vw,46px)] leading-[1.1] font-extrabold tracking-[-0.02em] italic"
                >
                  {/* Dim dash and lime dash are stacked so the change is opacity + scale only. */}
                  <span aria-hidden="true" className="relative h-[3px] w-11 shrink-0 -translate-y-2.5">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 w-7 bg-white transition-opacity duration-500",
                        on ? "opacity-0" : "opacity-20",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute inset-0 origin-left bg-accent transition-[scale,opacity] duration-500 ease-out-expo",
                        on ? "scale-x-100 opacity-100" : "scale-x-[0.64] opacity-0",
                      )}
                    />
                  </span>
                  <span
                    className={cn("transition-opacity duration-500", on ? "opacity-100" : "opacity-20")}
                  >
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-20 grid gap-12 border-t border-band-line pt-12 md:grid-cols-2">
          {areas.groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <h3 className="mb-[18px] text-[14px] leading-[1.4] font-medium tracking-[0.12em] text-accent uppercase">
                {group.title}
              </h3>
              <ul className="list-disc pl-[18px] text-band-text">
                {group.items.map((item) => (
                  <li key={item} className="mb-3 text-[17px] leading-[1.5]">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="md:col-span-2">
            <h3 className="mb-[18px] text-[14px] leading-[1.4] font-medium tracking-[0.12em] text-accent uppercase">
              {areas.tie.title}
            </h3>
            <p className="max-w-[760px] text-[22px] leading-[1.4] italic">{areas.tie.text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
