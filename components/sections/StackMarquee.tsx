import { type SiteContent } from '@/content/types';
import { Eyebrow } from '@/components/ui/Eyebrow';

const dots = ['bg-orange', 'bg-blue', 'bg-green'] as const;

function Track({ items, hidden = false }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="m-0 flex list-none items-center gap-14 p-0 pr-14 font-display text-marquee leading-[1.05] font-medium tracking-[-0.04em] whitespace-nowrap text-paper"
    >
      {items.map((item, i) => (
        <li key={item} className="contents">
          <span className={i % 2 === 1 ? 'outline-text' : ''}>{item}</span>
          <span
            aria-hidden="true"
            className={`h-3.5 w-3.5 flex-none rounded-full ${dots[i % 3]}`}
          />
        </li>
      ))}
    </ul>
  );
}

export function StackMarquee({ content }: { content: SiteContent }) {
  const { stack } = content;
  return (
    <section
      aria-labelledby="stack-title"
      className="section-bottom overflow-clip py-[clamp(80px,8vw,120px)]"
    >
      <div className="container-site mb-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
        <Eyebrow index={stack.index} label={stack.label} />
        <h2
          id="stack-title"
          className="m-0 font-sans text-[17px] leading-normal font-normal text-muted"
        >
          {stack.title}
        </h2>
      </div>
      <div className="marquee border-y border-line py-[30px]">
        <div className="marquee-track">
          <Track items={stack.items} />
          <Track items={stack.items} hidden />
        </div>
      </div>
    </section>
  );
}
