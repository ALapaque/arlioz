import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { type Metadata, type Viewport } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { type ReactNode } from 'react';
import 'lenis/dist/lenis.css';
import '../globals.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { LoopGuard } from '@/components/motion/LoopGuard';
import { ScrollRevealFallback } from '@/components/motion/ScrollRevealFallback';
import { ScrollState } from '@/components/motion/ScrollState';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { getContent } from '@/content';
import { htmlLang, isLocale, locales } from '@/lib/i18n';
import { site } from '@/lib/site';
import { getCurrentYear } from '@/lib/year';

const bricolage = localFont({
  src: '../fonts/bricolage-grotesque-latin.woff2',
  variable: '--font-bricolage',
  weight: '300 700',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const instrument = localFont({
  src: '../fonts/instrument-sans-latin.woff2',
  variable: '--font-instrument',
  weight: '400 700',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

/** Italic serif used only for the two highlighted promises of the hero title. */
const instrumentSerif = localFont({
  src: '../fonts/instrument-serif-italic-latin.woff2',
  variable: '--font-instrument-serif',
  weight: '400',
  style: 'italic',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

const jetbrains = localFont({
  src: '../fonts/jetbrains-mono-latin.woff2',
  variable: '--font-jetbrains',
  weight: '400 500',
  display: 'swap',
  adjustFontFallback: false,
  preload: false,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0C',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s — ${site.name}` },
};

/** The Vercel scripts only exist on Vercel deployments; skip them on other hosts (and locally). */
const onVercel = process.env.VERCEL === '1';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  const year = await getCurrentYear();

  return (
    <html
      lang={htmlLang[locale]}
      className={`${bricolage.variable} ${instrument.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-pill focus:bg-paper focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          {content.a11y.skipToContent}
        </a>
        <SmoothScroll>
          <div id="top" className="relative">
            <Header locale={locale} content={content} />
            <main id="main">{children}</main>
            <Footer locale={locale} content={content} year={year} />
          </div>
          <ScrollRevealFallback />
          <LoopGuard />
          <ScrollState />
        </SmoothScroll>
        {onVercel && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
