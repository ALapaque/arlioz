import { type MetadataRoute } from 'next';
import { projectSlugs } from '@/content';
import { alternatePaths, htmlLang, locales, type RouteKey } from '@/lib/i18n';
import { site } from '@/lib/site';

const lastModified = new Date('2026-10-16');

function entries(key?: RouteKey, slug?: string, priority = 0.8): MetadataRoute.Sitemap {
  const paths = alternatePaths(key, slug);
  const languages = {
    [htmlLang.fr]: `${site.url}${paths.fr}`,
    [htmlLang.en]: `${site.url}${paths.en}`,
    'x-default': `${site.url}${paths.fr}`,
  };
  return locales.map((locale) => ({
    url: `${site.url}${paths[locale]}`,
    lastModified,
    changeFrequency: key ? 'monthly' : 'weekly',
    priority: locale === 'fr' ? priority : priority - 0.1,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries(undefined, undefined, 1),
    ...projectSlugs.flatMap((slug) => entries('work', slug, 0.8)),
    ...entries('legal', undefined, 0.3),
    ...entries('privacy', undefined, 0.3),
    ...entries('cookies', undefined, 0.3),
  ];
}
