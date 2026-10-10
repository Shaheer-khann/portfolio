import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { about, beyondCode, recognition } from "@/lib/content";

type Row = { title: string; text?: string };

function Rows({ label, items }: { label: string; items: Row[] }) {
  return (
    <div>
      <h3 className="eyebrow mb-2">{label}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.title} className="border-b border-line py-[18px] first:border-t">
            <b className="block text-[17px] leading-[1.4] font-bold">{item.title}</b>
            {item.text && (
              <span className="cap-first mt-1 block text-[15px] leading-[1.5] text-ink-soft">
                {item.text}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** About text on the left; Beyond Code and Recognition as divider rows on the right. */
export function About() {
  return (
    <section id="about" className="pt-[60px] pb-24 md:pb-[140px]">
      <div className="wrap grid gap-14 md:grid-cols-[1.1fr_1fr] md:gap-[72px]">
        <div>
          <Reveal as="p" className="eyebrow">
            {about.label}
          </Reveal>
          <RevealText text={about.heading} className="h-display mt-3.5" />
          {about.paragraphs.map((paragraph) => (
            <Reveal as="p" key={paragraph} className="mt-[18px] text-[19px] leading-[1.6] text-ink-soft">
              {paragraph}
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col gap-10">
          <Rows label={beyondCode.label} items={beyondCode.items} />
          <Rows label={recognition.label} items={recognition.items} />
        </Reveal>
      </div>
    </section>
  );
}
