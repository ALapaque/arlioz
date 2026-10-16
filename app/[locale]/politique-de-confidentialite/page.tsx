import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/sections/LegalPage';
import { getContent } from '@/content';
import { legal } from '@/content/legal';
import { isLocale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = legal[locale].privacy;
  return buildMetadata({
    locale,
    content: getContent(locale),
    title: page.title,
    description: page.description,
    key: 'privacy',
  });
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage locale={locale} content={getContent(locale)} page={legal[locale].privacy} />;
}
