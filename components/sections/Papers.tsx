"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/cn";
import { papers, papersIntro, ui, type Paper } from "@/lib/content";

const CURSOR_SPRING = { stiffness: 600, damping: 42, mass: 0.35 };

// Sticky offsets: each card rests 16px lower than the one before, leaving a visible stack.
const STICK_TOP = 96;
const STICK_STEP = 16;
const STICK_BOTTOM_GAP = 24;

function PaperCard({ paper, index }: { paper: Paper; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [stick, setStick] = useState(STICK_TOP + index * STICK_STEP);

  // On short viewports a card can be taller than the space below its sticky offset. Raise the
  // offset just enough that the whole card, including its "Read paper" pill, stays in view.
  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const update = () => {
      const natural = STICK_TOP + index * STICK_STEP;
      const fits = window.innerHeight - card.offsetHeight - STICK_BOTTOM_GAP;
      setStick(Math.round(Math.min(natural, fits)));
    };

    const observer = new ResizeObserver(update);
    observer.observe(card);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [index]);

  // 0 → 1 as the next card slides over this one.
  const covered = useMotionValue(0);
  const scale = useTransform(covered, [0, 1], [1, 0.95]);
  const dim = useTransform(covered, [0, 1], [0, 0.06]);

  useMotionValueEvent(scrollY, "change", () => {
    const card = ref.current;
    const next = card?.nextElementSibling;
    if (!card || !next) return;

    const gap = next.getBoundingClientRect().top - card.getBoundingClientRect().top;
    covered.set(Math.min(1, Math.max(0, 1 - gap / card.offsetHeight)));
  });

  const cover = paper.figures[paper.cover];

  return (
    <motion.article
      ref={ref}
      data-paper
      data-motion="move"
      style={{ scale, "--stick": `${stick}px` } as MotionStyle}
      className="group relative mb-8 origin-top rounded-3xl border border-line bg-surface last:mb-0 md:sticky md:top-(--stick)"
    >
      <Link
        href={`/papers/${paper.slug}`}
        prefetch
        className="grid gap-8 rounded-[inherit] p-6 md:min-h-[440px] md:grid-cols-[1fr_1.05fr] md:gap-10 md:p-10 fine:cursor-none"
      >
        <div className="flex flex-col items-start">
          <span className="rounded-full bg-accent px-[11px] py-1.5 text-[12px] leading-[1.3] font-semibold tracking-[0.1em] text-accent-ink uppercase">
            {ui.paper} {paper.number}
          </span>
          <p className="eyebrow mt-4 mb-3.5 tracking-[0.08em]">{paper.keywords.join(" · ")}</p>
          <h3 className="text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-bold tracking-[-0.02em]">
            {paper.title}
          </h3>
          <p className="mt-4 mb-[18px] text-[16px] leading-[1.55] text-ink-soft">{paper.abstract}</p>
          <blockquote className="mb-6 border-l-[3px] border-ink pl-3.5 text-[19px] leading-[1.35] italic">
            {paper.insight}
          </blockquote>
          <span className="mt-auto inline-flex items-center gap-2.5 rounded-full border border-ink px-4 py-[9px] text-[14px] leading-[1.3] font-medium transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
            {ui.readPaper}
            <Arrow className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </span>
        </div>

        <div className="relative h-60 overflow-hidden rounded-2xl border border-line bg-white md:h-auto md:self-stretch">
          <Image
            src={cover.src}
            alt={`${paper.name}: ${cover.caption}`}
            fill
            sizes="(max-width: 820px) 150vw, 1200px"
            placeholder="blur"
            className={cn(
              "object-cover transition-[scale] duration-700 ease-out-expo group-hover:scale-[1.04]",
              paper.coverAnchor === "left" ? "object-left-top" : "object-top",
            )}
          />
        </div>
      </Link>

      {/* Dims the card as the next one arrives: an overlay, so only opacity animates. */}
      <motion.span
        aria-hidden="true"
        style={{ opacity: dim }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-ink"
      />
    </motion.article>
  );
}

export function Papers() {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const cursorX = useSpring(x, CURSOR_SPRING);
  const cursorY = useSpring(y, CURSOR_SPRING);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    x.set(event.clientX);
    y.set(event.clientY);
    setHovering(event.target instanceof Element && event.target.closest("[data-paper]") !== null);
  }

  return (
    <section id="work" className="py-24 md:py-[140px]">
      <div className="wrap">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div>
            <Reveal as="p" className="eyebrow">
              {papersIntro.label}
            </Reveal>
            <RevealText text={papersIntro.heading} className="h-display mt-3.5 max-w-[900px] text-balance" />
          </div>
          <Reveal
            as="span"
            className="shrink-0 rounded-full border border-line px-3 py-1.5 text-[13px] leading-[1.3] font-medium"
          >
            {String(papers.length).padStart(2, "0")}
          </Reveal>
        </div>

        <div onPointerMove={onPointerMove} onPointerLeave={() => setHovering(false)}>
          {papers.map((paper, index) => (
            <PaperCard key={paper.slug} paper={paper} index={index} />
          ))}
        </div>
      </div>

      {/* Lime cursor pill over the cards. Mouse only, and off under reduced motion. */}
      <motion.div
        aria-hidden="true"
        style={{ x: cursorX, y: cursorY }}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden fine:block"
      >
        <motion.span
          initial={false}
          animate={{ scale: hovering ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex -translate-1/2 items-center gap-2 rounded-full bg-accent px-[18px] py-3 text-[14px] leading-[1.3] font-semibold whitespace-nowrap text-accent-ink"
        >
          {ui.readPaper}
          <Arrow />
        </motion.span>
      </motion.div>
    </section>
  );
}
