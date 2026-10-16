import { type Metadata } from 'next';
import { type SiteContent } from '@/content/types';
import { alternatePaths, htmlLang, type Locale, localePath, ogLocale, type RouteKey } from './i18n';
import { site } from './site';

interface PageMeta {
  locale: Locale;
  content: SiteContent;
  title?: string;
  description?: string;
  key?: RouteKey;
  slug?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  locale,
  content,
  title,
  description,
  key,
  slug,
  noIndex = false,
}: PageMeta): Metadata {
  const paths = alternatePaths(key, slug);
  const canonical = paths[locale];
  const desc = description ?? content.meta.description;

  return {
    metadataBase: new URL(site.url),
    title: title ? { absolute: `${title} — ${site.name}` } : { absolute: content.meta.title },
    description: desc,
    keywords: content.meta.keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    applicationName: site.name,
    alternates: {
      canonical,
      languages: {
        [htmlLang.fr]: paths.fr,
        [htmlLang.en]: paths.en,
        'x-default': paths.fr,
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: ogLocale[locale],
      alternateLocale: locale === 'fr' ? [ogLocale.en] : [ogLocale.fr],
      url: canonical,
      title: title ? `${title} — ${site.name}` : content.meta.title,
      description: desc,
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} — ${site.name}` : content.meta.title,
      description: desc,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

const absolute = (path: string) => `${site.url}${path}`;

export function organizationJsonLd(locale: Locale, content: SiteContent) {
  return {
    '@context': 'https://schema.org',
    // ProfessionalService is a LocalBusiness, itself an Organization: local search signals
    // (address, area served) without losing the organization semantics.
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: absolute(localePath(locale)),
    logo: absolute(site.logo),
    email: site.email,
    foundingDate: String(site.foundingYear),
    description: content.meta.description,
    sameAs: [site.linkedin],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.country,
    },
    vatID: site.vatId,
    identifier: site.companyNumber,
    areaServed: [
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'City', name: 'Charleroi' },
      { '@type': 'AdministrativeArea', name: 'Wallonie' },
      { '@type': 'AdministrativeArea', name: 'Bruxelles-Capitale' },
    ],
    knowsLanguage: ['fr', 'en'],
    image: absolute(site.logo),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      availableLanguage: ['French', 'English'],
    },
  };
}

export function websiteJsonLd(locale: Locale, content: SiteContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: absolute(localePath(locale)),
    name: site.name,
    description: content.meta.description,
    inLanguage: htmlLang[locale],
    publisher: { '@id': `${site.url}/#organization` },
  };
}

export function servicesJsonLd(locale: Locale, content: SiteContent) {
  const names = [
    content.expertises.rgpd.title,
    ...content.expertises.cards.map((c) => c.title),
    content.expertises.stack.title,
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: names.map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'Belgium' },
        url: `${absolute(localePath(locale))}#expertises`,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function caseStudyJsonLd(
  locale: Locale,
  title: string,
  description: string,
  path: string,
  image: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url: absolute(path),
    image: absolute(image),
    inLanguage: htmlLang[locale],
    author: { '@id': `${site.url}/#organization` },
  };
}
