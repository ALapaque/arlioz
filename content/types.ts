import { type Locale } from '@/lib/i18n';

export type Accent = 'orange' | 'blue' | 'green' | 'yellow';
export type Mark = 'blue' | 'orange' | 'green';

export interface RichSegment {
  text: string;
  mark?: Mark;
  strong?: boolean;
}

export interface NavItem {
  label: string;
  /** Hash on the home page (e.g. `expertises`). */
  anchor: string;
  dot: Accent;
}

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface DeviceSet {
  /** Light background of the screenshots, shown while they load. */
  screenBg: string;
  url: string;
  desktop: ProjectImage;
  desktopAlt?: ProjectImage;
  tablet: ProjectImage;
  tabletAlt?: ProjectImage;
  phone: ProjectImage;
  phoneAlt?: ProjectImage;
  /** Which composed animation the stage plays. */
  motion: 'swap' | 'scroll';
}

export interface GalleryItem {
  kind: 'desktop' | 'tablet' | 'phone';
  image: ProjectImage;
  caption: string;
  /** For phone/tablet frames: object-position of the screenshot. */
  position?: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  type: string;
  client: string;
  clientUrl?: string;
  summary: string;
  highlights: string;
  tags: string[];
  demoUrl?: string;
  demoLabel?: string;
  devices: DeviceSet;
  accent: Accent;
  reversed: boolean;
  caseStudy: {
    tagline: string;
    intro: string;
    stat?: { value: string; text: string };
    features: { title: string; text: string }[];
    stack: { category: string; name: string }[];
    gallery: GalleryItem[];
    heroImage: ProjectImage;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  text: string;
  tags: string[];
  /** Real portrait; when absent the design's dashed placeholder is shown. */
  photo?: { src: string; width: number; height: number; alt: string };
  initials: string;
  photoLabel: string;
  accent: 'blue' | 'orange';
}

export interface SiteContent {
  locale: Locale;
  meta: {
    title: string;
    template: string;
    description: string;
    keywords: string[];
    ogAlt: string;
    ogTagline: string;
  };
  a11y: {
    skipToContent: string;
    homeLink: string;
    backToTop: string;
    languageGroup: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    siteMap: string;
    menuDialog: string;
  };
  nav: {
    menu: string;
    close: string;
    items: NavItem[];
    sectionLabel: string;
    write: string;
    follow: string;
    language: string;
    tagline: string;
    cta: string;
    ctaShort: string;
    linkedin: string;
  };
  hero: {
    badge: string;
    /** One entry per line: `lead` in the display face, `em` highlighted in italic serif. */
    title: { lead: string; em: string }[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    index: string;
    label: string;
    year: string;
    yearLabel: string;
    title: RichSegment[];
    pillars: { title: string; text: string }[];
  };
  expertises: {
    index: string;
    label: string;
    title: [string, string];
    rgpd: { tag: string; title: string; text: string; items: string[] };
    cards: {
      tag: string;
      title: string;
      text: string;
      icon: 'code' | 'devices' | 'layout' | 'gauge';
    }[];
    stack: {
      tag: string;
      title: string;
      text: RichSegment[];
      diagram: { left: string; right: string; center: [string, string]; aria: string };
    };
  };
  work: {
    index: string;
    label: string;
    title: [string, string];
    clientsLabel: string;
    clients: string[];
    caseStudy: string;
    liveExample: string;
    viewSite: string;
    clientPrefix: string;
  };
  /** Technologies band under the hero (`label` is its accessible name). */
  stack: { label: string; items: string[] };
  team: { index: string; label: string; title: string; members: TeamMember[] };
  contact: {
    index: string;
    label: string;
    title: string;
    text: string;
    emailLabel: string;
    linkedinLabel: string;
    linkedinValue: string;
    direct: {
      title: string;
      text: string;
      email: string;
      linkedin: string;
      /** Pre-filled subject of the mailto link. */
      subject: string;
      privacy: string;
      privacyLink: string;
    };
  };
  footer: {
    tagline: string;
    navigation: string;
    contact: string;
    legal: string;
    country: string;
    legalNotice: string;
    privacy: string;
    cookies: string;
    copyright: string;
    madeIn: string;
    backToTop: string;
  };
  caseStudy: {
    back: string;
    counter: string;
    client: string;
    type: string;
    stack: string;
    demo: string;
    sections: {
      project: string;
      features: string;
      featuresTitle: string;
      stack: string;
      stackTitle: string;
      stackIntro: string;
      gallery: string;
      galleryTitle: string;
    };
    next: string;
    nextAria: string;
    cta: { title: string; text: string; write: string; home: string };
    metaTitle: (title: string) => string;
  };
  notFound: { title: string; text: string; cta: string };
  projects: Project[];
}
