'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale, locales, switchLocalePath } from '@/lib/i18n';

interface LangSwitchProps {
  locale: Locale;
  label: string;
  size?: 'md' | 'sm';
  className?: string;
}

/** FR / EN links to the same page in the other language. */
export function LangSwitch({ locale, label, size = 'md', className = '' }: LangSwitchProps) {
  const pathname = usePathname();
  const height = size === 'md' ? 'h-10' : 'h-9';

  return (
    <div role="group" aria-label={label} className={`flex items-center gap-0.5 ${className}`}>
      {locales.map((target) => {
        const active = target === locale;
        return (
          <Link
            key={target}
            href={active ? pathname : switchLocalePath(pathname, target)}
            hrefLang={target}
            lang={target}
            aria-current={active ? 'page' : undefined}
            className={`inline-flex min-w-10 items-center justify-center rounded-pill px-2.5 font-mono text-xs font-medium tracking-[0.06em] transition-colors duration-200 ${height} ${
              active ? 'bg-white/12 text-paper' : 'text-muted-3 hover:text-paper'
            }`}
          >
            {target.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
