"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Arrow } from "@/components/ui/Arrow";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { hero, meta } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { useScrollTo } from "@/lib/useScrollTo";
import portrait from "@/public/portrait.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollTo = useScrollTo();

  // Parallax, capped at 40px (design.md §5): the portrait lags, the card leads.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative mx-auto flex max-w-[1280px] flex-col overflow-hidden pt-[71px] md:h-svh md:max-h-[860px] md:min-h-[640px] md:pt-[82px]"
    >
      <div className="relative flex flex-1 flex-col md:flex-row">
        <div className="relative z-[3] flex w-full flex-col px-4 py-9 md:w-[60%] md:px-8">
          <Reveal
            immediate
            className="self-start rounded-full border border-line bg-bg px-3.5 py-[7px] text-[13px] leading-[1.3] text-ink-soft"
          >
            {hero.eyebrow}
          </Reveal>

          <RevealText
            as="h1"
            immediate
            text={hero.headline}
            className="mt-5 mb-[18px] text-[clamp(40px,4.7vw,62px)] leading-[1.02] font-extrabold tracking-[-0.025em] italic"
            lineClassName="max-w-[600px] text-balance"
          />

          <Reveal
            as="p"
            immediate
            delay={0.35}
            className="mb-[26px] max-w-[500px] text-[17px] leading-[1.55] text-ink-soft"
          >
            {hero.supporting}
          </Reveal>

          <Reveal immediate delay={0.45} className="self-start">
            <Magnetic>
              <a
                href="#work"
                onClick={(event) => {
                  if (scrollTo("work")) event.preventDefault();
                }}
                className="group inline-flex items-center gap-3.5 rounded-full bg-ink py-2 pr-2 pl-[22px] text-[15px] leading-[1.3] font-medium text-white transition-colors duration-300 hover:bg-accent hover:text-accent-ink"
              >
                {hero.primaryButton}
                <span className="grid size-8 place-items-center rounded-full bg-white text-ink transition-[transform,background-color,color] duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-rotate-45 group-hover:bg-ink group-hover:text-white">
                  <Arrow className="size-3.5" />
                </span>
              </a>
            </Magnetic>
          </Reveal>

          <Reveal immediate delay={0.55} className="mt-10 md:mt-auto">
            <p className="eyebrow text-[11px]">{hero.recognitionLabel}</p>
            {/* Capped so the row wraps before it reaches the portrait, which overlaps this column. */}
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-1 text-[16px] leading-[1.3] font-bold text-ghost md:max-w-[82%]">
              {hero.wordmarks.map((mark) => (
                <li key={mark}>{mark}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="relative z-[1] h-[440px] w-full [container-type:size] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2">
          {/* Multiply lets the portrait's white backdrop disappear into the page. */}
          <motion.div
            data-motion="move"
            style={{ y: portraitY }}
            className="absolute inset-0 mix-blend-multiply"
          >
            {/* The square photo stands on the bottom edge, scaled for the approved preview's tighter
                crop and capped by the column width so it never crowds the text on narrower screens. */}
            <motion.div
              data-motion="move"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="absolute bottom-0 left-1/2 aspect-square h-[min(113cqh,137cqw)] -translate-x-[60%]"
            >
              <Image
                src={portrait}
                alt={meta.name}
                fill
                sizes="(max-width: 820px) 500px, 880px"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
          </motion.div>

          {/* One floating card: parallax on the outer layer, gentle float on the inner. */}
          <motion.div
            data-motion="move"
            style={{ y: cardY }}
            className="absolute right-4 bottom-[26%] z-[4] md:right-8"
          >
            <Reveal immediate delay={0.6}>
              <div
                data-motion="loop"
                className="w-[230px] animate-float rounded-[14px] border border-line bg-white/85 px-4 py-3 text-[13px] leading-[1.4] backdrop-blur-[8px]"
              >
                <span className="mb-1.5 grid size-6 place-items-center rounded-full bg-accent text-accent-ink">
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3 fill-current">
                    <path d="m8 1.2 2.1 4.3 4.7.7-3.4 3.3.8 4.7L8 12l-4.2 2.2.8-4.7L1.2 6.2l4.7-.7z" />
                  </svg>
                </span>
                <b className="font-bold">{hero.card.strong}</b>, {hero.card.rest}
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
