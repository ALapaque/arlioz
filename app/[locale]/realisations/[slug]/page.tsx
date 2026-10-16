import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Magnetic } from '@/components/motion/Magnetic';
import { BrowserBar } from '@/components/ui/BrowserBar';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Glow } from '@/components/ui/Glow';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/ui/Icons';
import { JsonLd } from '@/components/ui/JsonLd';
import { LineTitle } from '@/components/ui/LineTitle';
import { LogoMark } from '@/components/ui/LogoMark';
import { getContent, getNextProject, getProject, projectSlugs } from '@/content';
import { type GalleryItem } from '@/content/types';
import { isLocale, localePath, locales } from '@/lib/i18n';
import { site } from '@/lib/site';
import { breadcrumbJsonLd, buildMetadata, caseStudyJsonLd } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const content = getContent(locale);
  const project = getProject(locale, slug);
  if (!project) return {};
  return buildMetadata({
    locale,
    content,
    title: content.caseStudy.metaTitle(project.title),
    description: project.caseStudy.tagline,
    key: 'work',
    slug,
  });
}

const delays = ['', 'rv-d1', 'rv-d2'] as const;
const dt = 'label-mono-sm text-muted-3';
const dd = 'm-0 text-base text-paper';
const caption =
  'absolute bottom-3.5 left-4 rounded-pill border border-line-3 bg-[rgba(10,10,12,0.72)] px-2.5 py-1.5 font-mono text-[11px] tracking-[0.06em] uppercase text-paper-3';
const phoneBg =
  'bg-[radial-gradient(circle_at_50%_42%,rgba(226,194,122,0.16),transparent_62%),#111114]';

function GalleryFigure({ item, index }: { item: GalleryItem; index: number }) {
  const delay = delays[index % 3];
  if (item.kind === 'desktop') {
    return (
      <figure
        className={`g-wide rv ${delay} relative m-0 overflow-hidden rounded-card-sm border border-line-2 bg-surface`}
      >
        <BrowserBar url="" size="md" />
        <div className="relative aspect-[16/10]">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 980px) 90vw, 860px"
            className="object-cover object-top"
          />
        </div>
        <figcaption className={caption}>{item.caption}</figcaption>
      </figure>
    );
  }
  if (item.kind === 'tablet') {
    return (
      <figure
        className={`rv ${delay} relative m-0 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card-sm border border-line-2 pb-7 ${phoneBg}`}
      >
        <div className="g-tab w-[40%] rounded-[18px] border border-line-4 bg-device p-1.5 shadow-[0_24px_50px_rgba(0,0,0,0.55)]">
          <div className="relative aspect-[820/1180] overflow-hidden rounded-xl">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(max-width: 720px) 62vw, 200px"
              className="object-cover"
              style={{ objectPosition: item.position ?? '50% 0%' }}
            />
          </div>
        </div>
        <figcaption className={caption}>{item.caption}</figcaption>
      </figure>
    );
  }
  const tall = index === 1;
  return (
    <figure
      className={`rv ${delay} relative m-0 flex items-center justify-center overflow-hidden rounded-card-sm border border-line-2 ${phoneBg} ${
        tall ? 'px-6 pt-7 pb-14' : 'aspect-[4/3] pb-7'
      }`}
    >
      <div
        className={`g-phone rounded-[26px] border border-line-4 bg-device p-1 shadow-[0_24px_50px_rgba(0,0,0,0.55)] ${
          tall ? 'w-[min(230px,64%)]' : 'w-[27%]'
        }`}
      >
        <div className="relative aspect-[398/852] overflow-hidden rounded-[22px]">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 720px) 44vw, 230px"
            className="object-cover"
            style={{ objectPosition: item.position ?? '50% 0%' }}
          />
        </div>
      </div>
      <figcaption className={caption}>{item.caption}</figcaption>
    </figure>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const project = getProject(locale, slug);
  if (!project) notFound();
  const next = getNextProject(locale, slug);
  const cs = content.caseStudy;
  const study = project.caseStudy;
  const home = localePath(locale);
  const path = localePath(locale, 'work', slug);
  const total = String(content.projects.length).padStart(2, '0');

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: site.name, path: home },
            { name: content.work.label, path: `${home}#realisations` },
            { name: project.title, path },
          ]),
          caseStudyJsonLd(locale, project.title, study.tagline, path, study.heroImage.src),
        ]}
      />

      {/* Hero */}
      <section aria-labelledby="case-title" className="relative overflow-clip">
        <Glow
          color="#FA7F13"
          opacity={0.18}
          blur={160}
          style={{ width: 620, height: 620, right: -180, top: -220 }}
        />
        <div className="container-site relative pt-[clamp(40px,5vw,64px)]">
          <div className="intro intro-1 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`${home}#realisations`}
              className="link-u inline-flex items-center gap-[10px] text-[15px] text-paper-3"
            >
              <ArrowLeft size={16} />
              {cs.back}
            </Link>
            <p className="label-mono m-0 text-muted-3">
              {cs.counter} <span className="text-paper">{project.index}</span> / {total}
            </p>
          </div>
          <LineTitle
            as="h1"
            id="case-title"
            mode="load"
            lines={[project.title]}
            className="mt-[clamp(48px,6vw,88px)] font-display text-case leading-[0.92] font-medium tracking-[-0.055em]"
          />
          <p className="intro intro-3 m-0 mt-7 max-w-[880px] font-display text-case-lead leading-[1.25] font-normal tracking-[-0.02em] text-paper-3 text-pretty">
            {study.tagline}
          </p>
          <dl className="meta-grid intro intro-4 m-0 mt-[clamp(48px,6vw,80px)] border-t border-line-2">
            <div className="flex flex-col gap-2.5 border-b border-line-2 py-6 pr-6">
              <dt className={dt}>{cs.client}</dt>
              <dd className={dd}>
                {project.clientUrl ? (
                  <a
                    href={project.clientUrl}
                    target="_blank"
                    rel="noopener"
                    className="link-u inline-flex items-center gap-1.5"
                  >
                    {project.client}
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  project.client
                )}
              </dd>
            </div>
            <div className="flex flex-col gap-2.5 border-b border-line-2 py-6 pr-6">
              <dt className={dt}>{cs.type}</dt>
              <dd className={dd}>{project.type}</dd>
            </div>
            <div className="meta-wide flex flex-col gap-2.5 border-b border-line-2 py-6 pr-6">
              <dt className={dt}>{cs.stack}</dt>
              <dd className={dd}>{project.tags.join(', ')}</dd>
            </div>
            <div className="meta-wide flex flex-col gap-2.5 border-b border-line-2 py-6">
              <dt className={dt}>{cs.demo}</dt>
              <dd className={`${dd} [overflow-wrap:anywhere]`}>
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener"
                    className="link-u inline-flex items-center gap-1.5"
                  >
                    {project.devices.url}
                    <ArrowUpRight size={14} className="flex-none" />
                  </a>
                ) : (
                  '—'
                )}
              </dd>
            </div>
          </dl>
          <div className="intro-media mt-[clamp(40px,5vw,64px)] overflow-hidden rounded-card border border-line-2 bg-surface">
            <BrowserBar url={project.devices.url} size="lg" />
            <div
              className="relative aspect-[16/10]"
              style={{ backgroundColor: project.devices.screenBg }}
            >
              <Image
                src={study.heroImage.src}
                alt={study.heroImage.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1440px) 92vw, 1280px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project */}
      <section aria-labelledby="projet-title" className="py-section">
        <div className="container-site">
          <div className="split">
            <Eyebrow index="01" label={cs.sections.project} className="self-start" />
            <div className="flex min-w-0 flex-col gap-12">
              <h2
                id="projet-title"
                className="rv m-0 font-display text-case-intro leading-[1.2] font-normal tracking-[-0.025em] text-pretty"
              >
                {study.intro}
              </h2>
              {study.stat && (
                <div className="rv rv-d1 flex flex-wrap items-end gap-x-8 gap-y-4 rounded-card border border-line-2 bg-surface px-9 py-8">
                  <p className="m-0 font-display text-stat-sm leading-[0.85] font-medium tracking-[-0.05em] text-orange-light">
                    {study.stat.value}
                  </p>
                  <p className="m-0 max-w-[420px] pb-1.5 text-[17px] leading-normal text-paper-3">
                    {study.stat.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-title" className="section-bottom pb-section">
        <div className="container-site">
          <div className="rv mb-[clamp(40px,5vw,64px)] flex flex-col gap-[22px]">
            <Eyebrow index="02" label={cs.sections.features} />
            <h2
              id="features-title"
              className="m-0 font-display text-h2 leading-none font-medium tracking-[-0.04em] text-balance"
            >
              {cs.sections.featuresTitle}
            </h2>
          </div>
          <div className="feat-grid">
            {study.features.map((feature, i) => (
              <article
                key={feature.title}
                className={`card-hover rv ${delays[i % 3]} flex min-h-[240px] flex-col gap-10 rounded-card border border-line-2 bg-surface p-8`}
              >
                <p className="m-0 font-mono text-xs font-medium tracking-[0.08em] text-orange-light">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div className="mt-auto flex flex-col gap-2.5">
                  <h3 className="m-0 font-display text-card leading-[1.1] font-medium tracking-[-0.025em]">
                    {feature.title}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-[1.6] text-muted">{feature.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section
        aria-labelledby="stack-title"
        className="section-bottom border-y border-line bg-ink-2 py-section"
      >
        <div className="container-site">
          <div className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
            <div className="rv flex min-w-0 max-w-[780px] flex-col gap-[22px]">
              <Eyebrow index="03" label={cs.sections.stack} />
              <h2
                id="stack-title"
                className="m-0 font-display text-h2 leading-none font-medium tracking-[-0.04em] text-balance"
              >
                {cs.sections.stackTitle}
              </h2>
            </div>
            <p className="rv rv-late m-0 max-w-[420px] text-[17px] leading-[1.6] text-muted">
              {cs.sections.stackIntro}
            </p>
          </div>
          <ul
            className={`stack-grid m-0 list-none p-0 ${study.stack.length <= 4 ? 'stack-grid-4' : ''}`}
          >
            {study.stack.map((item, i) => (
              <li
                key={item.name}
                className={`card-hover rv ${delays[i % 3]} flex min-h-[160px] flex-col justify-between gap-8 rounded-card-sm border border-line-2 bg-surface p-6`}
              >
                <span className="label-mono-sm text-muted-3">{item.category}</span>
                <span className="font-display text-[28px] leading-none font-medium tracking-[-0.03em]">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="section-bottom py-section">
        <div className="container-site">
          <div className="rv mb-[clamp(40px,5vw,64px)] flex flex-col gap-[22px]">
            <Eyebrow index="04" label={cs.sections.gallery} />
            <h2
              id="gallery-title"
              className="m-0 font-display text-h2 leading-none font-medium tracking-[-0.04em]"
            >
              {cs.sections.galleryTitle}
            </h2>
          </div>
          <div className="gallery">
            {study.gallery.map((item, i) => (
              <GalleryFigure key={`${item.image.src}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      <section aria-label={cs.next} className="border-y border-line">
        <div className="container-site">
          <Link
            href={localePath(locale, 'work', next.slug)}
            className="next-link rv flex flex-wrap items-center justify-between gap-6 py-[clamp(56px,7vw,96px)] text-paper"
          >
            <span className="flex min-w-0 flex-col gap-[18px]">
              <span className="label-mono text-muted-3">
                {cs.next} · {next.type}
              </span>
              <span className="font-display text-next leading-[0.95] font-medium tracking-[-0.05em]">
                {next.title}
              </span>
            </span>
            <span className="next-arrow inline-flex h-[clamp(64px,7vw,104px)] w-[clamp(64px,7vw,104px)] flex-none items-center justify-center rounded-full bg-paper text-ink">
              <ArrowRight size={34} strokeWidth={1.7} />
            </span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-title" className="section-bottom py-section">
        <div className="container-site rv flex flex-col items-center gap-8 text-center">
          <LogoMark height={64} />
          <h2
            id="cta-title"
            className="m-0 max-w-[900px] font-display text-h2 leading-none font-medium tracking-[-0.04em] text-balance"
          >
            {cs.cta.title}
          </h2>
          <p className="m-0 max-w-[540px] text-[17px] leading-[1.6] text-muted">{cs.cta.text}</p>
          <div className="cta-btns flex flex-wrap justify-center gap-3">
            <Magnetic>
              <ButtonLink href={`mailto:${site.email}`}>{cs.cta.write}</ButtonLink>
            </Magnetic>
            <ButtonLink href={home} variant="ghost">
              {cs.cta.home}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
