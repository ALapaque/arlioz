import { type SiteContent } from '@/content/types';

const dots = ['bg-orange', 'bg-blue', 'bg-green'] as const;

function Track({ items, hidden = false }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="m-0 flex list-none items-center gap-12 p-0 pr-12 font-display text-marquee leading-[1.05] font-medium tracking-[-0.04em] whitespace-nowrap text-paper"
    >
      {items.map((item, i) => (
        <li key={item} className="contents">
          <span className={i % 2 === 1 ? 'outline-text' : ''}>{item}</span>
          <span aria-hidden="true" className={`h-3 w-3 flex-none rounded-full ${dots[i % 3]}`} />
        </li>
      ))}
    </ul>
  );
}

/** The technologies band that separates the hero from the rest of the page. */
export function StackMarquee({ content }: { content: SiteContent }) {
  const { stack } = content;
  return (
    <div
      aria-label={stack.label}
      className="marquee border-y border-line py-[clamp(20px,2.4vw,28px)]"
    >
      <div className="marquee-track">
        <Track items={stack.items} />
        <Track items={stack.items} hidden />
      </div>
    </div>
  );
}
