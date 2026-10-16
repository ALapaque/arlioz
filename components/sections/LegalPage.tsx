import Link from 'next/link';
import { type LegalPage as LegalPageContent } from '@/content/legal';
import { type SiteContent } from '@/content/types';
import { type Locale, localePath } from '@/lib/i18n';
import { ArrowLeft, ArrowUpRight } from '@/components/ui/Icons';

interface LegalPageProps {
  locale: Locale;
  content: SiteContent;
  page: LegalPageContent;
}

export function LegalPage({ locale, content, page }: LegalPageProps) {
  const date = new Date(page.updated).toLocaleDateString(locale === 'fr' ? 'fr-BE' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="container-site pt-[clamp(40px,5vw,64px)] pb-section">
      <div className="intro intro-1">
        <Link
          href={localePath(locale)}
          className="link-u inline-flex items-center gap-[10px] text-[15px] text-paper-3"
        >
          <ArrowLeft size={16} />
          {content.notFound.cta}
        </Link>
      </div>
      <header className="mt-[clamp(40px,5vw,72px)] max-w-[880px]">
        <h1 className="ln-wrap m-0 font-display text-h2 leading-none font-medium tracking-[-0.04em] text-balance">
          <span className="ln">
            <span className="ln-in ln-1">{page.title}</span>
          </span>
        </h1>
        <p className="intro intro-3 label-mono m-0 mt-6 text-muted-3">
          {page.updatedLabel} · <time dateTime={page.updated}>{date}</time>
        </p>
      </header>
      <div className="mt-[clamp(40px,5vw,64px)] grid max-w-[880px] gap-10">
        {page.sections.map((section, i) => (
          <section
            key={section.title}
            id={section.id}
            aria-labelledby={`legal-${i}`}
            className="rv grid gap-4 border-t border-line-2 pt-8"
          >
            <h2
              id={`legal-${i}`}
              className="m-0 font-display text-card leading-[1.1] font-medium tracking-[-0.025em]"
            >
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="m-0 max-w-[720px] text-[16.5px] leading-[1.65] text-muted text-pretty"
              >
                {paragraph}
              </p>
            ))}
            {section.links && (
              <ul className="m-0 grid list-none gap-1.5 p-0 text-[16.5px] leading-[1.65]">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="link-u inline-flex items-center gap-1.5 text-paper-3"
                    >
                      {link.label}
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {section.list && (
              <ul className="m-0 grid list-disc gap-1.5 pl-5 text-[16.5px] leading-[1.65] text-muted marker:text-orange">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
