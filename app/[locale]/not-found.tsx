import { ButtonLink } from '@/components/ui/Button';
import { getContent } from '@/content';
import { localePath, locales } from '@/lib/i18n';

/**
 * 404 boundary for the localized tree. `not-found.tsx` receives no params,
 * so both languages are shown, French first.
 */
export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col justify-center gap-12 py-section">
      <p className="label-mono m-0 text-muted-3">404</p>
      {locales.map((locale) => {
        const t = getContent(locale).notFound;
        return (
          <div key={locale} lang={locale} className="flex max-w-[720px] flex-col gap-5">
            <h1 className="m-0 font-display text-h2 leading-none font-medium tracking-[-0.04em] text-balance">
              {t.title}
            </h1>
            <p className="m-0 text-[17px] leading-[1.6] text-muted">{t.text}</p>
            <ButtonLink href={localePath(locale)} className="self-start">
              {t.cta}
            </ButtonLink>
          </div>
        );
      })}
    </section>
  );
}
