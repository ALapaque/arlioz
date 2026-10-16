import Link from 'next/link';
import { type SiteContent } from '@/content/types';
import { type Locale, localePath } from '@/lib/i18n';
import { site } from '@/lib/site';
import { LogoMark } from '@/components/ui/LogoMark';

interface FooterProps {
  locale: Locale;
  content: SiteContent;
  year: number;
}

const linkClass = 'link-u text-paper-2';

export function Footer({ locale, content, year }: FooterProps) {
  const home = localePath(locale);
  const f = content.footer;
  const copyright = f.copyright
    .replace('{year}', String(year))
    .replace('{bce}', site.companyNumber);

  return (
    <footer className="overflow-clip border-t border-line pt-[clamp(56px,6vw,80px)]">
      <div className="container-site">
        <div className="foot-grid">
          <div className="foot-brand flex max-w-[380px] flex-col gap-5">
            <Link
              href={`${home}#top`}
              aria-label={content.a11y.backToTop}
              className="inline-flex items-center gap-3 self-start text-paper"
            >
              <LogoMark height={34} />
              <span className="font-display text-[26px] leading-none font-semibold tracking-[-0.035em]">
                arlioz
              </span>
            </Link>
            <p className="m-0 text-[15.5px] leading-[1.6] text-muted">{f.tagline}</p>
          </div>

          <nav aria-label={content.a11y.siteMap} className="flex flex-col gap-4">
            <p className="label-mono-sm m-0 text-muted-3">{f.navigation}</p>
            <ul className="foot-list m-0 flex list-none flex-col gap-[10px] p-0 text-[15px]">
              {content.nav.items.map((item) => (
                <li key={item.anchor}>
                  <Link href={`${home}#${item.anchor}`} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <p className="label-mono-sm m-0 text-muted-3">{f.contact}</p>
            <ul className="foot-list m-0 flex list-none flex-col gap-[10px] p-0 text-[15px]">
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener" className={linkClass}>
                  LinkedIn
                </a>
              </li>
              <li className="text-muted">{f.country}</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className="label-mono-sm m-0 text-muted-3">{f.legal}</p>
            <ul className="foot-list m-0 flex list-none flex-col gap-[10px] p-0 text-[15px]">
              <li>
                <Link href={localePath(locale, 'legal')} className={linkClass}>
                  {f.legalNotice}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, 'privacy')} className={linkClass}>
                  {f.privacy}
                </Link>
              </li>
              <li>
                <Link href={localePath(locale, 'cookies')} className={linkClass}>
                  {f.cookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="rv-word m-0 mt-[clamp(48px,6vw,80px)] bg-[linear-gradient(180deg,rgba(242,241,238,0.16),rgba(242,241,238,0.015)_92%)] bg-clip-text text-center font-display text-[clamp(110px,30vw,440px)] leading-[0.8] font-semibold tracking-[-0.045em] whitespace-nowrap text-transparent select-none"
        >
          arlioz
        </p>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-7 pb-9 text-[13.5px] text-muted-3">
          <p className="m-0">{copyright}</p>
          <p className="m-0">{f.madeIn}</p>
          <a href="#top" className="link-u text-paper-3">
            {f.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
