import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { ui, type PaperFigure } from "@/lib/content";

// Screenshots narrower than this ratio are shown at a capped height instead of full width.
export const TALL_RATIO = 1.4;

export function isTall(figure: PaperFigure) {
  return figure.src.width / figure.src.height < TALL_RATIO;
}

type FigureProps = {
  figure: PaperFigure;
  /** 1-based figure number within the paper. */
  number: number;
  /** Project name, used for the image's alt text. */
  project: string;
  /** True when the figure sits in a two-column pair. */
  paired?: boolean;
};

/** A screenshot on a --surface backdrop with a "Fig. n — caption" line beneath. */
export function Figure({ figure, number, project, paired = false }: FigureProps) {
  const tall = isTall(figure);

  return (
    <Reveal as="figure" className="flex h-full flex-col">
      <div className="group flex flex-1 items-center justify-center overflow-hidden rounded-[20px] bg-surface p-4 md:p-8">
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <Image
            src={figure.src}
            alt={`${project}: ${figure.caption}`}
            placeholder="blur"
            sizes={paired ? "(max-width: 820px) 100vw, 480px" : "(max-width: 820px) 100vw, 980px"}
            className={cn(
              "transition-[scale] duration-[600ms] ease-out-expo group-hover:scale-[1.03]",
              tall ? "h-auto max-h-[520px] w-auto max-w-full" : "h-auto w-full",
            )}
          />
        </div>
      </div>
      <figcaption className="mt-3.5 flex gap-1.5 text-[13px] leading-[1.4] text-ink-soft">
        <span className="font-medium text-ink">
          {ui.figure} {number}
        </span>
        <span aria-hidden="true">—</span>
        <span className="cap-first">{figure.caption}</span>
      </figcaption>
    </Reveal>
  );
}
