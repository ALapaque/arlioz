import Link from 'next/link';
import { type SiteContent } from '@/content/types';
import { type Locale, localePath } from '@/lib/i18n';
import { Chips } from '@/components/ui/Chips';
import { DeviceStage } from '@/components/ui/DeviceStage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ArrowRight, ArrowUpRight } from '@/components/ui/Icons';
import { LineTitle } from '@/components/ui/LineTitle';

const glow = { orange: '#FA7F13', blue: '#2065CB', green: '#2BBE8D', yellow: '#FEB613' } as const;

export function Work({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { work } = content;
  return (
    <section
      id="realisations"
      aria-labelledby="work-title"
      className="section-bottom border-y border-line bg-ink-2 py-section"
    >
      <div className="container-site">
        <div className="mb-[clamp(48px,6vw,80px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
          <div className="flex min-w-0 max-w-[780px] flex-col gap-[22px]">
            <Eyebrow index={work.index} label={work.label} animated />
            <LineTitle
              id="work-title"
              lines={work.title}
              className="font-display text-h2 leading-none font-medium tracking-[-0.04em]"
            />
          </div>
          <p className="sx-up sx-late m-0 max-w-[420px] text-[17px] leading-[1.6] text-muted">
            {work.intro}
          </p>
        </div>

        <div className="flex flex-col gap-[clamp(72px,9vw,128px)]">
          {content.projects.map((project) => {
            const href = localePath(locale, 'work', project.slug);
            return (
              <article
                key={project.slug}
                className={`proj-row proj-card ${project.reversed ? 'proj-row-rev' : ''}`}
              >
                <DeviceStage
                  devices={project.devices}
                  reversed={project.reversed}
                  glow={glow[project.accent]}
                  glowOpacity={project.accent === 'yellow' ? 0.14 : 0.16}
                  href={href}
                  ariaLabel={`${work.caseStudy} : ${project.title}`}
                />
                <div className="flex min-w-0 flex-col gap-4">
                  <p className="sx-txt label-mono m-0 flex flex-wrap items-center gap-x-3.5 gap-y-2 tracking-[0.06em] text-muted-3">
                    <span className="text-paper">{project.index}</span>
                    <span>{project.type}</span>
                    <span aria-hidden="true">/</span>
                    <span>
                      {work.clientPrefix} {project.client}
                    </span>
                  </p>
                  <LineTitle
                    as="h3"
                    lines={[project.title]}
                    className="font-display text-h3-work leading-[1.02] font-medium tracking-[-0.035em]"
                  />
                  <p className="sx-txt m-0 max-w-[580px] text-[16.5px] leading-[1.6] text-muted text-pretty">
                    {project.summary}
                  </p>
                  <p className="sx-txt m-0 text-[15px] text-paper-2">{project.highlights}</p>
                  <Chips items={project.tags} animated className="mt-1" />
                  <div className="sx-txt mt-2 flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
                    <Link
                      href={href}
                      className="link-u inline-flex items-center gap-2 font-medium text-paper"
                    >
                      {work.caseStudy}
                      <ArrowRight size={16} />
                    </Link>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener"
                        className="link-u inline-flex items-center gap-2 text-muted"
                      >
                        {project.demoLabel}
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
