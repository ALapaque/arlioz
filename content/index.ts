import { type Locale } from '@/lib/i18n';
import { en } from './en';
import { fr } from './fr';
import { type Project, type SiteContent } from './types';

const content: Record<Locale, SiteContent> = { fr, en };

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return content[locale].projects.find((project) => project.slug === slug);
}

export function getNextProject(locale: Locale, slug: string): Project {
  const projects = content[locale].projects;
  const index = projects.findIndex((project) => project.slug === slug);
  const next = projects[(index + 1) % projects.length];
  if (!next) throw new Error(`No projects defined for locale ${locale}`);
  return next;
}

export const projectSlugs = fr.projects.map((project) => project.slug);

export type { Project, SiteContent } from './types';
