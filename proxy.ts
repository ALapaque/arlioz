import { type NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, type Locale, routeSegments } from '@/lib/i18n';

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const preferred = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: (tag ?? '').toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of preferred) {
    if (tag.startsWith('fr')) return 'fr';
    if (tag.startsWith('en')) return 'en';
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first, second, ...rest] = pathname.split('/');

  if (isLocale(first)) {
    if (first === 'fr' || !second) return NextResponse.next();

    for (const segments of Object.values(routeSegments)) {
      const localized: string = segments[first];
      const internal: string = segments.fr;
      // Public localized segment → internal (French) file-system segment.
      if (second === localized) {
        const url = request.nextUrl.clone();
        url.pathname = ['', first, internal, ...rest].join('/');
        return NextResponse.rewrite(url);
      }
      // Internal segment requested under a non-French locale → canonical localized URL.
      if (second === internal) {
        const url = request.nextUrl.clone();
        url.pathname = ['', first, localized, ...rest].join('/');
        return NextResponse.redirect(url, 308);
      }
    }
    return NextResponse.next();
  }

  const locale = detectLocale(request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!_next|_vercel|api|images|.*\\..*).*)'],
};
