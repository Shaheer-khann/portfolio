import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Figure, isTall } from "@/components/paper/Figure";
import { ReadingProgress } from "@/components/paper/ReadingProgress";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/cn";
import { getPaper, papers, ui, type PaperFigure } from "@/lib/content";

// Every paper is fully prerendered. A slug that is not a paper is rendered to completion before
// anything is sent, so it gets a real 404 status instead of a streamed shell.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return papers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({ params }: PageProps<"/papers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return {};

  return {
    title: paper.title,
    description: paper.abstract,
    openGraph: { title: paper.title, description: paper.abstract, type: "article" },
  };
}

/** Groups figures into rows: two tall screenshots in a row share it, everything else is full width. */
function toRows(figures: PaperFigure[]) {
  const rows: PaperFigure[][] = [];

  for (const figure of figures) {
    const last = rows[rows.length - 1];
    if (last && last.length === 1 && isTall(last[0]) && isTall(figure)) last.push(figure);
    else rows.push([figure]);
  }

  return rows;
}

// The slug belongs to one URL, so it is read inside Suspense: the route keeps a static shell and
// links with prefetch resolve the whole paper before the click (see the Next.js instant navigation guide).
export default function PaperPage({ params }: PageProps<"/papers/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <PaperArticle params={params} />
    </Suspense>
  );
}

async function PaperArticle({ params }: Pick<PageProps<"/papers/[slug]">, "params">) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  const next = papers[(papers.indexOf(paper) + 1) % papers.length];
  // "Title: Subtitle" in content.md becomes the article's title and subtitle.
  const [title, subtitle] = paper.title.split(": ");

  // Fig. 1 opens the article; the rest follow the System section they illustrate.
  const [lead, ...rest] = paper.figures;
  const figureBreak = paper.sections.findIndex((section) => section.items) + 1 || paper.sections.length;
  const numberOf = (figure: PaperFigure) => paper.figures.indexOf(figure) + 1;

  const renderSections = (from: number, to: number) =>
    paper.sections.slice(from, to).map((section, i) => (
      <Reveal as="div" key={section.heading} className="mt-14 first:mt-0 md:mt-[72px]">
        <h2 className="text-[26px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[30px]">
          <span className="mr-3 text-ink-soft">{from + i + 1}.</span>
          {section.heading}
        </h2>
        {section.body && <p className="mt-4">{section.body}</p>}
        {section.items && (
          <ul className="mt-5 border-t border-line">
            {section.items.map((item) => (
              <li key={item} className="flex gap-4 border-b border-line py-3.5">
                <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-ink" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    ));

  return (
    <article>
      <ReadingProgress />

      <header className="wrap pt-[132px] md:pt-[176px]">
        <div className="mx-auto max-w-[920px]">
          <Reveal immediate className="flex flex-col items-start gap-4">
            <span className="rounded-full bg-accent px-[11px] py-1.5 text-[12px] leading-[1.3] font-semibold tracking-[0.1em] text-accent-ink uppercase">
              {ui.paper} {paper.number} — {paper.name}
            </span>
            <p className="eyebrow tracking-[0.08em]">{paper.keywords.join(" · ")}</p>
          </Reveal>

          <RevealText
            as="h1"
            immediate
            delay={0.1}
            text={title}
            className="mt-6 text-[clamp(38px,5.2vw,64px)] leading-[1.03] font-bold tracking-[-0.03em] text-balance"
          />
          {subtitle && (
            <Reveal
              as="p"
              immediate
              delay={0.3}
              className="mt-4 text-[clamp(20px,2.2vw,26px)] leading-[1.3] font-medium tracking-[-0.01em] text-ink-soft"
            >
              {subtitle}
            </Reveal>
          )}

          <Reveal
            immediate
            delay={0.4}
            className="mt-10 rounded-r-[20px] border-l-[3px] border-accent bg-surface p-6 md:mt-14 md:p-10"
          >
            <h2 className="eyebrow">{ui.abstract}</h2>
            <p className="mt-3 text-[18px] leading-[1.6] md:text-[20px]">{paper.abstract}</p>
          </Reveal>
        </div>
      </header>

      {lead && (
        <div className="wrap mt-12 md:mt-20">
          <div className="mx-auto max-w-[1040px]">
            <Figure figure={lead} number={1} project={paper.name} />
          </div>
        </div>
      )}

      <div className="wrap mt-16 md:mt-24">
        <div className="mx-auto max-w-[680px]">{renderSections(0, figureBreak)}</div>
      </div>

      {rest.length > 0 && (
        <div className="wrap mt-14 md:mt-20">
          <div className="mx-auto flex max-w-[1040px] flex-col gap-10 md:gap-14">
            {toRows(rest).map((row) => (
              <div
                key={row[0].caption}
                className={cn("grid gap-10 md:gap-8", row.length === 2 && "md:grid-cols-2")}
              >
                {row.map((figure) => (
                  <Figure
                    key={figure.caption}
                    figure={figure}
                    number={numberOf(figure)}
                    project={paper.name}
                    paired={row.length === 2}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {figureBreak < paper.sections.length && (
        <div className="wrap mt-14 md:mt-[72px]">
          <div className="mx-auto max-w-[680px]">
            {renderSections(figureBreak, paper.sections.length)}
          </div>
        </div>
      )}

      <div className="wrap mt-20 md:mt-32">
        <Reveal className="mx-auto max-w-[920px]">
          <span aria-hidden="true" className="mb-6 block h-1 w-14 bg-accent" />
          <p className="eyebrow mb-4">{ui.keyInsight}</p>
          <blockquote className="text-[24px] leading-[1.25] font-medium tracking-[-0.015em] italic md:text-[32px]">
            {paper.insight}
          </blockquote>
        </Reveal>

        {paper.note && (
          <Reveal as="p" className="mx-auto mt-10 max-w-[920px] text-[14px] leading-[1.5] text-ink-soft italic">
            {paper.note}
          </Reveal>
        )}
      </div>

      <nav aria-label={ui.nextPaper} className="mt-24 border-t border-line md:mt-40">
        <Link href={`/papers/${next.slug}`} prefetch className="group wrap block py-14 md:py-24">
          <p className="eyebrow flex items-center gap-2">
            {ui.nextPaper}
            <Arrow className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </p>
          <p className="h-display mt-4 max-w-[1000px] text-[clamp(32px,5vw,68px)] text-balance transition-colors duration-300 group-hover:text-ink-soft">
            {next.title}
          </p>
          <p className="eyebrow mt-5 tracking-[0.08em]">
            {ui.paper} {next.number} — {next.name}
          </p>
        </Link>
      </nav>
    </article>
  );
}
