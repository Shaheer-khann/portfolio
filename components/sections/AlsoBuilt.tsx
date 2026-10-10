import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { alsoBuilt } from "@/lib/content";

/** Shorter studies: numbered rows with hairline dividers. */
export function AlsoBuilt() {
  return (
    <section className="pt-[60px] pb-24 md:pb-[140px]">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
          {alsoBuilt.label}
        </Reveal>
        <RevealText text={alsoBuilt.heading} className="h-display mt-3.5" />

        <ul className="mt-10 border-t border-line">
          {alsoBuilt.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              className="group border-b border-line text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {/* Hover: the text in the row shifts right 8px and turns ink. */}
              <div className="grid grid-cols-[50px_1fr] items-baseline gap-x-6 gap-y-1.5 py-7 transition-[translate] duration-300 ease-out-expo group-hover:translate-x-2 motion-reduce:translate-x-0 md:grid-cols-[80px_1fr_1.3fr]">
                <span className="text-[13px] leading-[1.3] font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <b className="text-[22px] leading-[1.25] font-bold tracking-[-0.01em] text-ink">
                  {item.name}
                </b>
                <span className="cap-first col-start-2 md:col-start-3">{item.text}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
