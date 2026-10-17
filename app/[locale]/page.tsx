import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Expertises } from '@/components/sections/Expertises';
import { Hero } from '@/components/sections/Hero';
import { StackMarquee } from '@/components/sections/StackMarquee';
import { Team } from '@/components/sections/Team';
import { Work } from '@/components/sections/Work';
import { JsonLd } from '@/components/ui/JsonLd';
import { getContent } from '@/content';
import { isLocale } from '@/lib/i18n';
import { buildMetadata, organizationJsonLd, servicesJsonLd, websiteJsonLd } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({ locale, content: getContent(locale) });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(locale, content),
          websiteJsonLd(locale, content),
          servicesJsonLd(locale, content),
        ]}
      />
      <Hero locale={locale} content={content} />
      <StackMarquee content={content} />
      <About content={content} />
      <Expertises content={content} />
      <Work locale={locale} content={content} />
      <Team content={content} />
      <Contact locale={locale} content={content} />
    </>
  );
}
