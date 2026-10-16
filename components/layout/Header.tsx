import Link from 'next/link';
import { type SiteContent } from '@/content/types';
import { type Locale, localePath } from '@/lib/i18n';
import { LogoMark } from '@/components/ui/LogoMark';
import { HeaderControls } from './HeaderControls';

interface HeaderProps {
  locale: Locale;
  content: SiteContent;
}

export function Header({ locale, content }: HeaderProps) {
  const home = localePath(locale);
  return (
    <header className="pointer-events-none sticky top-0 z-[60]">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-gutter-sm py-4">
        <Link
          href={home}
          aria-label={content.a11y.homeLink}
          className="pill glass pointer-events-auto relative z-10 inline-flex h-[52px] items-center gap-[10px] rounded-pill pr-[18px] pl-[11px] text-paper"
        >
          <LogoMark height={30} priority />
          <span className="font-display text-[21px] leading-none font-semibold tracking-[-0.035em]">
            arlioz
          </span>
        </Link>
        <HeaderControls locale={locale} homeHref={home} nav={content.nav} a11y={content.a11y} />
      </div>
    </header>
  );
}
