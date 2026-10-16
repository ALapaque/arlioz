import { type SiteContent } from '@/content/types';
import { type Locale, localePath } from '@/lib/i18n';
import { ChromaCurrent } from '@/components/motion/ChromaCurrent';
import { Magnetic } from '@/components/motion/Magnetic';
import { ButtonLink } from '@/components/ui/Button';

const dot = {
  orange: 'bg-orange',
  blue: 'bg-blue',
  green: 'bg-green',
  yellow: 'bg-yellow',
} as const;

const highlight = ['hero-hl-a', 'hero-hl-b'] as const;

export function Hero({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { hero } = content;
  const home = localePath(locale);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-clip border-b border-line">
      <div className="hero relative">
        <ChromaCurrent className="hero-chroma" />
        <div aria-hidden="true" className="hero-veil" />

        <div className="container-site relative z-[2] flex flex-col items-center gap-[22px] text-center">
          <p className="intro intro-1 hero-badge label-mono m-0 inline-flex items-center gap-3 rounded-pill border border-line-3 bg-white/3 py-2 pr-4 pl-3 tracking-[0.07em] text-paper-3">
            <span aria-hidden="true" className="inline-flex gap-1">
              <span className="h-2 w-2 rounded-full bg-orange" />
              <span className="h-2 w-2 rounded-full bg-blue" />
              <span className="h-2 w-2 rounded-full bg-green" />
            </span>
            {hero.badge}
          </p>

          <h1
            id="hero-title"
            className="hero-title ln-wrap m-0 max-w-[1000px] font-display text-[clamp(44px,6.6vw,104px)] leading-[0.98] font-medium tracking-[-0.05em] text-balance"
          >
            {hero.title.map((line, i) => (
              <span key={line.em} className="ln">
                <span className={`ln-in ln-${i + 1}`}>
                  {line.lead}
                  <em className={`hero-hl ${highlight[i] ?? highlight[0]}`}>{line.em}</em>
                </span>
              </span>
            ))}
          </h1>

          <p className="intro intro-3 hero-lead m-0 max-w-[600px] text-lead leading-[1.55] text-paper-3 text-pretty">
            {hero.text}
          </p>

          <ul className="m-0 -mt-2 flex list-none flex-wrap justify-center gap-2 p-0">
            {hero.chips.map((chip, i) => (
              <li
                key={chip.label}
                className={`hero-chip chip-pop chip-${i + 1} items-center gap-[9px] rounded-pill border border-line-3 px-4 py-[10px] font-mono text-xs tracking-[0.03em] text-paper-4`}
              >
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot[chip.dot]}`} />
                {chip.label}
              </li>
            ))}
          </ul>

          <div className="intro intro-4 hero-ctas flex flex-wrap justify-center gap-3 pt-1.5">
            <Magnetic>
              <ButtonLink href={`${home}#contact`}>{hero.ctaPrimary}</ButtonLink>
            </Magnetic>
            <ButtonLink href={`${home}#realisations`} variant="ghost">
              {hero.ctaSecondary}
            </ButtonLink>
          </div>
        </div>

        <p className="intro intro-5 hero-hint label-mono z-[2] m-0 text-center text-[11px] leading-[1.6] text-muted-3">
          {hero.hint}
        </p>
        <p
          aria-hidden="true"
          className="intro intro-5 hero-scroll label-mono z-[2] m-0 flex items-center gap-[10px] text-[11px] text-muted-3"
        >
          <i />
          {hero.scroll}
        </p>
      </div>

      <div className="relative border-t border-line">
        <div className="container-site flex flex-wrap items-center gap-x-11 gap-y-3.5 py-7">
          <p className="label-mono m-0 text-muted-3">{hero.clientsLabel}</p>
          <ul className="m-0 flex list-none flex-wrap items-center gap-x-11 gap-y-2.5 p-0 font-display text-[22px] font-medium tracking-[-0.02em] text-muted-2">
            {hero.clients.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
