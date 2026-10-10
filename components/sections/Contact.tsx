"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/cn";
import { contact, ui } from "@/lib/content";
import { EASE } from "@/lib/motion";

const TOAST_MS = 1600;
const pill =
  "block rounded-full border px-[22px] py-3 leading-[1.3] font-medium transition-[translate] duration-300 ease-out-expo hover:-translate-y-0.5 motion-reduce:translate-y-0";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (permissions or an insecure origin): fall back to the mail client.
      window.location.href = `mailto:${contact.email}`;
    }
  }

  return (
    <section
      id="contact"
      className="border-t border-line pt-24 pb-20 text-center md:pt-[150px] md:pb-[120px]"
    >
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
          {contact.label}
        </Reveal>
        <RevealText
          text={contact.headline}
          className="h-display mx-auto mt-5 max-w-[1000px] text-[clamp(40px,6vw,84px)] text-balance"
        />
        <Reveal as="p" className="mx-auto mt-[22px] mb-10 text-[18px] text-ink-soft">
          {contact.line}
        </Reveal>

        <Reveal>
          <button
            type="button"
            onClick={copyEmail}
            className="cursor-pointer border-b-2 border-ink pb-1 text-[clamp(20px,2.6vw,34px)] leading-[1.3] font-semibold transition-colors duration-300 hover:border-accent hover:text-ink-soft"
          >
            {contact.email}
          </button>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
          <Magnetic>
            <a href={contact.cv} download className={cn(pill, "border-accent bg-accent text-accent-ink")}>
              {ui.downloadCv}
            </a>
          </Magnetic>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(pill, "border-ink")}
          >
            {ui.github}
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(pill, "border-ink")}
          >
            {ui.linkedin}
          </a>
        </Reveal>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-8 z-[60] flex justify-center"
      >
        <AnimatePresence>
          {copied && (
            <motion.span
              data-motion="move"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="rounded-full bg-ink px-[18px] py-2.5 text-[14px] leading-[1.3] text-white"
            >
              {ui.emailCopied}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
