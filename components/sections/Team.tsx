import Image from 'next/image';
import { type SiteContent } from '@/content/types';
import { Chips } from '@/components/ui/Chips';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Glow } from '@/components/ui/Glow';

const roleColor = { blue: 'text-blue-light', orange: 'text-orange-light' } as const;

export function Team({ content }: { content: SiteContent }) {
  const { team } = content;
  return (
    <section
      id="equipe"
      aria-labelledby="team-title"
      className="section-bottom pt-section-sm pb-section"
    >
      <div className="container-site">
        <div className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
          <div className="rv flex min-w-0 max-w-[780px] flex-col gap-[22px]">
            <Eyebrow index={team.index} label={team.label} />
            <h2
              id="team-title"
              className="m-0 font-display text-h2 leading-none font-medium tracking-[-0.04em] text-balance"
            >
              {team.title}
            </h2>
          </div>
          <p className="rv rv-late m-0 max-w-[420px] text-[17px] leading-[1.6] text-muted">
            {team.intro}
          </p>
        </div>

        <div className="team-grid">
          {team.members.map((member, i) => (
            <article
              key={member.name}
              className={`rv ${i === 1 ? 'rv-d1' : ''} flex min-w-0 flex-col gap-[26px]`}
            >
              {member.photo ? (
                <div className="relative aspect-square overflow-hidden rounded-card border border-line-2 bg-[#E9E9E9]">
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1440px) 45vw, 640px"
                    className="photo-zoom object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="relative flex aspect-square items-center justify-center overflow-hidden rounded-card border border-line-2 bg-surface"
                >
                  <Glow
                    color={member.accent === 'blue' ? '#2065CB' : '#FA7F13'}
                    opacity={0.32}
                    blur={120}
                    style={{
                      width: 380,
                      height: 380,
                      left: 'calc(50% - 190px)',
                      top: 'calc(50% - 190px)',
                    }}
                  />
                  <span className="relative font-display text-[clamp(96px,11vw,160px)] leading-none font-medium tracking-[-0.06em] text-paper/12">
                    {member.initials}
                  </span>
                  <span className="label-mono-sm absolute bottom-[18px] left-5 rounded-lg border border-dashed border-white/18 px-2.5 py-1.5 text-muted-3">
                    {member.photoLabel}
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-3.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                  <h3 className="m-0 font-display text-member leading-[1.05] font-medium tracking-[-0.03em]">
                    {member.name}
                  </h3>
                  <p className={`label-mono m-0 ${roleColor[member.accent]}`}>{member.role}</p>
                </div>
                <p className="m-0 max-w-[540px] text-base leading-[1.6] text-muted">
                  {member.text}
                </p>
                <Chips items={member.tags} className="mt-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
