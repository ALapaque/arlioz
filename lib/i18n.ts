export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/**
 * Public URL segments per locale. The file-system routes use the French segment;
 * `proxy.ts` rewrites the English alias to it, so each language keeps clean URLs.
 */
export const routeSegments = {
  work: { fr: 'realisations', en: 'work' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
  privacy: { fr: 'politique-de-confidentialite', en: 'privacy-policy' },
  cookies: { fr: 'gestion-des-cookies', en: 'cookie-settings' },
} as const;

export type RouteKey = keyof typeof routeSegments;

/** Builds the public, localized path of a page. */
export function localePath(locale: Locale, key?: RouteKey, slug?: string): string {
  const parts = [`/${locale}`];
  if (key) parts.push(routeSegments[key][locale]);
  if (slug) parts.push(slug);
  return parts.join('/');
}

/** Same page in every locale, used for hreflang + the language switch. */
export function alternatePaths(key?: RouteKey, slug?: string): Record<Locale, string> {
  return {
    fr: localePath('fr', key, slug),
    en: localePath('en', key, slug),
  };
}

/**
 * Maps a public pathname (e.g. `/en/work/restomax-book`) to the same page in another locale.
 * Falls back to the target locale's home when the path cannot be mapped.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const [, current, segment, ...rest] = pathname.split('/');
  if (!isLocale(current)) return `/${target}`;
  if (!segment) return `/${target}`;
  for (const key of Object.keys(routeSegments) as RouteKey[]) {
    if (routeSegments[key][current] === segment) {
      return localePath(target, key, rest.join('/') || undefined);
    }
  }
  return `/${target}`;
}

export const ogLocale: Record<Locale, string> = { fr: 'fr_BE', en: 'en_GB' };
export const htmlLang: Record<Locale, string> = { fr: 'fr-BE', en: 'en' };
