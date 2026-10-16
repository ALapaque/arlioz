import { type SiteContent } from '@/content/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LogoMark } from '@/components/ui/LogoMark';

const bars = [
  'bg-[linear-gradient(90deg,#FEB613,#FA7F13_55%,#E8392B)]',
  'bg-[linear-gradient(90deg,#1A55B8,#2065CB_55%,#3D80E0)] b2',
  'bg-[linear-gradient(90deg,#1E92A0,#2BBE8D_60%,#4FD6A4)] b3',
] as const;

const delays = ['', 'rv-d1', 'rv-d2'] as const;

export function About({ content }: { content: SiteContent }) {
  const { about } = content;
  return (
    <section id="a-propos" aria-labelledby="about-title" className="py-section">
      <div className="container-site">
        <div className="split">
          <div className="flex flex-col justify-between gap-10">
            <Eyebrow index={about.index} label={about.label} />
            <div className="rv">
              <p className="m-0 font-display text-stat leading-[0.85] font-normal tracking-[-0.05em] text-paper">
                {about.year}
              </p>
              <p className="label-mono m-0 mt-4 text-muted-3">{about.yearLabel}</p>
            </div>
          </div>

          <div className="min-w-0">
            <h2
              id="about-title"
              className="rv m-0 font-display text-h2-sm leading-[1.17] font-normal tracking-[-0.028em] text-pretty"
            >
              {about.title.map((segment, i) =>
                segment.mark ? (
                  <span key={i} className={`mk mk-${segment.mark}`}>
                    {segment.text}
                  </span>
                ) : (
                  <span key={i}>{segment.text}</span>
                ),
              )}
            </h2>
            <p className="rv m-0 mt-11 flex items-center gap-3.5 text-[15px] text-muted-3">
              <LogoMark height={26} />
              {about.logoLine}
            </p>
            <div className="pillars mt-14 grid grid-cols-3 gap-10">
              {about.pillars.map((pillar, i) => (
                <div key={pillar.title} className={`rv ${delays[i] ?? ''} flex flex-col gap-4`}>
                  <div aria-hidden="true" className={`rv-bar h-1 rounded-pill ${bars[i] ?? ''}`} />
                  <h3 className="m-0 mt-1 font-display text-card leading-[1.1] font-medium tracking-[-0.025em]">
                    {pillar.title}
                  </h3>
                  <p className="m-0 text-base leading-[1.6] text-muted">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
