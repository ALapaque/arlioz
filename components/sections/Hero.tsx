import Image from 'next/image';
import logo from '@/public/images/logo-arlioz.webp';
import { type SiteContent } from '@/content/types';
import { type Locale, localePath } from '@/lib/i18n';
import { Magnetic } from '@/components/motion/Magnetic';
import { ButtonLink } from '@/components/ui/Button';
import { Glow } from '@/components/ui/Glow';
import { LineTitle } from '@/components/ui/LineTitle';

const dot = {
  orange: 'bg-orange',
  blue: 'bg-blue',
  green: 'bg-green',
  yellow: 'bg-yellow',
} as const;

const chipPositions = [
  { left: 0, top: '13%' },
  { right: 0, top: '47%' },
  { left: '7%', bottom: '9%' },
] as const;

export function Hero({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { hero } = content;
  const home = localePath(locale);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-clip border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[length:88px_88px] bg-[position:center_top] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_55%_75%_at_74%_42%,#000_0%,transparent_72%)]"
      />
      <div className="container-site relative py-[clamp(56px,6.5vw,96px)]">
        <div className="hero-grid">
          <div className="flex min-w-0 flex-col gap-8">
            <p className="intro intro-1 hero-badge label-mono m-0 inline-flex items-center gap-3 self-start rounded-pill border border-line-3 bg-white/3 py-2 pr-4 pl-3 tracking-[0.07em] text-paper-3">
              <span aria-hidden="true" className="inline-flex gap-1">
                <span className="h-2 w-2 rounded-full bg-orange" />
                <span className="h-2 w-2 rounded-full bg-blue" />
                <span className="h-2 w-2 rounded-full bg-green" />
              </span>
              {hero.badge}
            </p>
            <LineTitle
              as="h1"
              id="hero-title"
              mode="load"
              lines={hero.title}
              className="font-display text-h1 leading-[0.98] font-medium tracking-[-0.045em] text-balance"
            />
            <p className="intro intro-3 m-0 max-w-[590px] text-lead leading-[1.55] text-muted text-pretty">
              {hero.text}
            </p>
            <div className="intro intro-4 hero-ctas flex flex-wrap gap-3 pt-1.5">
              <Magnetic>
                <ButtonLink href={`${home}#contact`}>{hero.ctaPrimary}</ButtonLink>
              </Magnetic>
              <ButtonLink href={`${home}#realisations`} variant="ghost">
                {hero.ctaSecondary}
              </ButtonLink>
            </div>
          </div>

          <div className="hero-visual intro-visual">
            <Glow
              color="#FA7F13"
              opacity={0.3}
              style={{ width: 300, height: 300, left: '22%', top: '4%' }}
            />
            <Glow
              color="#2065CB"
              opacity={0.4}
              style={{ width: 280, height: 280, left: '6%', top: '40%' }}
            />
            <Glow
              color="#2BBE8D"
              opacity={0.28}
              style={{ width: 280, height: 280, right: '6%', bottom: '2%' }}
            />
            <Image
              src={logo}
              alt={hero.logoAlt}
              priority
              fetchPriority="high"
              placeholder="blur"
              sizes="(max-width: 720px) 207px, (max-width: 1080px) 306px, 396px"
              className="hero-logo float drop-shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
            />
            {hero.chips.map((chip, i) => (
              <span
                key={chip.label}
                className={`hero-chip chip-pop chip-${i + 1} absolute items-center gap-[9px] rounded-pill border border-line-3 bg-[rgba(17,17,20,0.72)] px-4 py-[10px] font-mono text-xs tracking-[0.03em] text-paper-4 backdrop-blur-[12px]`}
                style={chipPositions[i]}
              >
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot[chip.dot]}`} />
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-line">
        <div className="intro intro-5 container-site flex flex-wrap items-center gap-x-11 gap-y-3.5 py-7">
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
