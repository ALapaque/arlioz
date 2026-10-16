import { type Locale } from '@/lib/i18n';

export interface LegalSection {
  id?: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  links?: { label: string; href: string }[];
}

export interface LegalPage {
  title: string;
  description: string;
  updated: string;
  updatedLabel: string;
  sections: LegalSection[];
}

const legalFr: LegalPage = {
  title: 'Mentions légales',
  description: 'Mentions légales du site arlioz.be : éditeur, hébergeur, propriété intellectuelle.',
  updated: '2026-10-16',
  updatedLabel: 'Dernière mise à jour',
  sections: [
    {
      title: 'Éditeur du site',
      paragraphs: [
        'Le site arlioz.be est édité par Arlioz, société établie en Belgique, inscrite à la Banque-Carrefour des Entreprises sous le numéro BE 0694.716.176, dont le siège social est situé rue de la Croix 24, 6042 Lodelinsart (Charleroi), Belgique.',
        'Adresse e-mail : contact@arlioz.be. Responsable de la publication : Arlioz.',
      ],
    },
    {
      title: 'Hébergement',
      paragraphs: [
        'Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com). Les pages sont servies depuis le réseau de diffusion de Vercel, avec des points de présence en Europe.',
      ],
    },
    {
      title: 'Propriété intellectuelle',
      paragraphs: [
        'L’ensemble des contenus du site (textes, logo, visuels, code) est la propriété d’Arlioz ou de ses partenaires et est protégé par le droit d’auteur. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.',
        'Les marques, logos et captures d’écran des projets présentés appartiennent à leurs propriétaires respectifs et sont reproduits avec leur accord, à titre d’illustration de nos réalisations.',
      ],
    },
    {
      title: 'Données personnelles',
      paragraphs: [
        'Le traitement des données personnelles collectées via ce site est décrit dans notre politique de confidentialité.',
      ],
    },
    {
      title: 'Responsabilité',
      paragraphs: [
        'Arlioz s’efforce de maintenir les informations de ce site exactes et à jour, sans pouvoir garantir l’absence d’erreur ou d’omission. Les contenus sont fournis à titre informatif et ne constituent pas un conseil juridique : seule une analyse de votre situation, dans le cadre d’une mission, engage Arlioz.',
        'Les liens vers des sites tiers (clients, réseaux sociaux, outils) sont proposés pour votre commodité ; Arlioz n’exerce aucun contrôle sur leur contenu et décline toute responsabilité à leur égard.',
      ],
    },
    {
      title: 'Droit applicable',
      paragraphs: [
        'Le présent site et ses mentions légales sont régis par le droit belge. En cas de litige, et à défaut de solution amiable, les tribunaux belges sont seuls compétents.',
      ],
    },
    {
      title: 'Crédits',
      paragraphs: [
        'Conception et développement : Arlioz. Polices : Bricolage Grotesque, Instrument Sans et JetBrains Mono (licence SIL Open Font License).',
      ],
    },
  ],
};

const legalEn: LegalPage = {
  title: 'Legal notice',
  description: 'Legal notice for arlioz.be: publisher, hosting, intellectual property.',
  updated: '2026-10-16',
  updatedLabel: 'Last updated',
  sections: [
    {
      title: 'Publisher',
      paragraphs: [
        'The website arlioz.be is published by Arlioz, a company established in Belgium, registered with the Crossroads Bank for Enterprises under number BE 0694.716.176, with its registered office at Rue de la Croix 24, 6042 Lodelinsart (Charleroi), Belgium.',
        'E-mail: contact@arlioz.be. Publishing manager: Arlioz.',
      ],
    },
    {
      title: 'Hosting',
      paragraphs: [
        'The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States (vercel.com). Pages are served from Vercel’s content delivery network, with points of presence in Europe.',
      ],
    },
    {
      title: 'Intellectual property',
      paragraphs: [
        'All content on this site (texts, logo, visuals, code) is the property of Arlioz or its partners and is protected by copyright. Any reproduction, even partial, without prior written permission is prohibited.',
        'Brands, logos and screenshots of the projects shown belong to their respective owners and are reproduced with their agreement, to illustrate our work.',
      ],
    },
    {
      title: 'Personal data',
      paragraphs: [
        'The processing of personal data collected through this site is described in our privacy policy.',
      ],
    },
    {
      title: 'Liability',
      paragraphs: [
        'Arlioz strives to keep the information on this site accurate and up to date but cannot guarantee the absence of errors or omissions. Content is provided for information only and does not constitute legal advice: only an analysis of your situation, within an engagement, binds Arlioz.',
        'Links to third-party sites (clients, social networks, tools) are offered for your convenience; Arlioz has no control over their content and accepts no liability for them.',
      ],
    },
    {
      title: 'Governing law',
      paragraphs: [
        'This site and this legal notice are governed by Belgian law. In the event of a dispute, and failing an amicable solution, the Belgian courts have sole jurisdiction.',
      ],
    },
    {
      title: 'Credits',
      paragraphs: [
        'Design and development: Arlioz. Typefaces: Bricolage Grotesque, Instrument Sans and JetBrains Mono (SIL Open Font License).',
      ],
    },
  ],
};

const privacyFr: LegalPage = {
  title: 'Politique de confidentialité',
  description:
    'Comment Arlioz traite les données personnelles collectées sur arlioz.be : finalités, base légale, durées, droits et cookies.',
  updated: '2026-10-16',
  updatedLabel: 'Dernière mise à jour',
  sections: [
    {
      title: 'Responsable du traitement',
      paragraphs: [
        'Arlioz, BE 0694.716.176, rue de la Croix 24, 6042 Lodelinsart, contact@arlioz.be, est responsable du traitement des données personnelles collectées sur ce site, au sens du Règlement général sur la protection des données (RGPD, règlement (UE) 2016/679).',
      ],
    },
    {
      title: 'Données collectées',
      paragraphs: [
        'Ce site ne comporte aucun formulaire : nous ne traitons que les données que vous nous transmettez vous-même, par e-mail à contact@arlioz.be ou par message sur LinkedIn :',
      ],
      list: [
        'vos nom et prénom, et le cas échéant votre société et votre fonction',
        'votre adresse e-mail ou votre profil LinkedIn',
        'le contenu de votre message et des échanges qui suivent',
      ],
    },
    {
      title: 'Finalités et base légale',
      paragraphs: [
        'Ces données sont utilisées uniquement pour répondre à votre demande et, le cas échéant, préparer une proposition. La base légale est l’exécution de mesures précontractuelles prises à votre demande (article 6.1.b du RGPD) et notre intérêt légitime à répondre aux sollicitations qui nous sont adressées (article 6.1.f).',
        'Aucune donnée n’est utilisée à des fins de prospection sans votre accord, ni vendue ou cédée à des tiers.',
      ],
    },
    {
      title: 'Destinataires et sous-traitants',
      paragraphs: [
        'Vos données sont accessibles aux membres d’Arlioz en charge de votre demande. Le site lui-même ne collecte rien ; il est hébergé par Vercel Inc. Les e-mails sont traités par notre fournisseur de messagerie, et les messages LinkedIn par LinkedIn Ireland Unlimited Company selon sa propre politique de confidentialité. Ces prestataires sont tenus par des accords de traitement conformes à l’article 28 du RGPD ; les transferts hors Union européenne sont encadrés par les clauses contractuelles types de la Commission européenne.',
      ],
    },
    {
      title: 'Durée de conservation',
      paragraphs: [
        'Les messages reçus par e-mail ou LinkedIn sont conservés 12 mois après le dernier échange, puis supprimés, sauf si une relation contractuelle est engagée.',
      ],
    },
    {
      title: 'Données de navigation',
      paragraphs: [
        'Comme tout site, celui-ci est servi par un hébergeur qui traite techniquement votre adresse IP et les en-têtes de votre navigateur pour acheminer les pages et protéger le service (sécurité, détection d’abus). Vercel conserve ces journaux techniques pour une courte durée, sur la base de son intérêt légitime et du nôtre à assurer le fonctionnement et la sécurité du site. Aucun profil n’est constitué à partir de ces données.',
      ],
    },
    {
      title: 'Sécurité',
      paragraphs: [
        'Le site est servi exclusivement en HTTPS, avec des en-têtes de sécurité (politique de sécurité du contenu, HSTS, protection contre le détournement de clic). Les e-mails que vous nous adressez ne sont accessibles qu’aux personnes d’Arlioz en charge de votre demande.',
      ],
    },
    {
      title: 'Vos droits',
      paragraphs: [
        'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données. Pour l’exercer, écrivez-nous à contact@arlioz.be. Vous pouvez également introduire une réclamation auprès de l’Autorité de protection des données (autoriteprotectiondonnees.be).',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies et mesure d’audience',
      paragraphs: [
        'Ce site ne dépose aucun cookie de suivi et n’utilise aucun outil publicitaire. La mesure d’audience repose sur Vercel Web Analytics et Vercel Speed Insights, qui fonctionnent sans cookie et sans identifiant persistant : les données sont agrégées et anonymes (pages vues, pays, type d’appareil, métriques de performance). Aucun consentement n’est donc requis et aucune bannière n’est affichée.',
        'Les seules données stockées dans votre navigateur sont techniques (préférences d’affichage) et ne permettent pas de vous identifier.',
      ],
    },
    {
      title: 'Mise à jour',
      paragraphs: [
        'Cette politique peut évoluer. La date de dernière mise à jour figure en haut de cette page.',
      ],
    },
  ],
};

const privacyEn: LegalPage = {
  title: 'Privacy policy',
  description:
    'How Arlioz processes personal data collected on arlioz.be: purposes, legal basis, retention, rights and cookies.',
  updated: '2026-10-16',
  updatedLabel: 'Last updated',
  sections: [
    {
      title: 'Data controller',
      paragraphs: [
        'Arlioz, BE 0694.716.176, Rue de la Croix 24, 6042 Lodelinsart, contact@arlioz.be, is the controller of the personal data collected on this site, within the meaning of the General Data Protection Regulation (GDPR, Regulation (EU) 2016/679).',
      ],
    },
    {
      title: 'Data collected',
      paragraphs: [
        'This site has no form: we only process the data you send us yourself, by e-mail to contact@arlioz.be or by message on LinkedIn:',
      ],
      list: [
        'your first and last name, and where relevant your company and role',
        'your e-mail address or LinkedIn profile',
        'the content of your message and of the exchanges that follow',
      ],
    },
    {
      title: 'Purposes and legal basis',
      paragraphs: [
        'This data is used solely to answer your request and, where relevant, to prepare a proposal. The legal basis is the performance of pre-contractual steps taken at your request (Article 6(1)(b) GDPR) and our legitimate interest in answering the requests we receive (Article 6(1)(f)).',
        'No data is used for marketing without your consent, nor sold or transferred to third parties.',
      ],
    },
    {
      title: 'Recipients and processors',
      paragraphs: [
        'Your data is accessible to the Arlioz members handling your request. The site itself collects nothing; it is hosted by Vercel Inc. E-mails are handled by our mail provider, and LinkedIn messages by LinkedIn Ireland Unlimited Company under its own privacy policy. These providers are bound by data processing agreements compliant with Article 28 GDPR; transfers outside the European Union are governed by the European Commission’s standard contractual clauses.',
      ],
    },
    {
      title: 'Retention',
      paragraphs: [
        'Messages received by e-mail or LinkedIn are kept for 12 months after the last exchange, then deleted, unless a contractual relationship is entered into.',
      ],
    },
    {
      title: 'Browsing data',
      paragraphs: [
        'Like any website, this one is served by a hosting provider that technically processes your IP address and browser headers to deliver pages and protect the service (security, abuse detection). Vercel keeps these technical logs for a short period, on the basis of its legitimate interest and ours in keeping the site working and secure. No profile is built from this data.',
      ],
    },
    {
      title: 'Security',
      paragraphs: [
        'The site is served over HTTPS only, with security headers (content security policy, HSTS, clickjacking protection). E-mails you send us are accessible only to the Arlioz people handling your request.',
      ],
    },
    {
      title: 'Your rights',
      paragraphs: [
        'You have the right to access, rectify, erase, restrict, object to and port your data. To exercise these rights, write to contact@arlioz.be. You may also lodge a complaint with the Belgian Data Protection Authority (dataprotectionauthority.be).',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and analytics',
      paragraphs: [
        'This site sets no tracking cookies and uses no advertising tools. Audience measurement relies on Vercel Web Analytics and Vercel Speed Insights, which work without cookies or persistent identifiers: data is aggregated and anonymous (page views, country, device type, performance metrics). No consent is therefore required and no banner is shown.',
        'The only data stored in your browser is technical (display preferences) and cannot identify you.',
      ],
    },
    {
      title: 'Updates',
      paragraphs: [
        'This policy may change. The date of the last update is shown at the top of this page.',
      ],
    },
  ],
};

const browserGuides = [
  { label: 'Firefox', href: 'https://support.mozilla.org/fr/kb/effacer-cookies-donnees-site' },
  { label: 'Chrome', href: 'https://support.google.com/chrome/answer/95647?hl=fr' },
  { label: 'Safari', href: 'https://support.apple.com/fr-be/guide/safari/sfri11471/mac' },
  {
    label: 'Edge',
    href: 'https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09',
  },
];

const cookiesFr: LegalPage = {
  title: 'Gestion des cookies',
  description:
    'Les cookies et traceurs utilisés sur arlioz.be : aucun cookie de suivi, mesure d’audience sans cookie, et comment gérer vos préférences.',
  updated: '2026-10-16',
  updatedLabel: 'Dernière mise à jour',
  sections: [
    {
      title: 'Qu’est-ce qu’un cookie ?',
      paragraphs: [
        'Un cookie est un petit fichier déposé par un site dans votre navigateur. Il peut servir au fonctionnement du site (cookies strictement nécessaires), à mesurer la fréquentation ou à vous suivre à des fins publicitaires. Les deux dernières catégories requièrent votre consentement.',
      ],
    },
    {
      title: 'Ce que ce site utilise',
      paragraphs: ['Ce site est conçu pour fonctionner sans cookie et sans traceur :'],
      list: [
        'aucun cookie de suivi ni cookie publicitaire ;',
        'aucun réseau social ni service tiers embarqué (pas de vidéo, de carte ou de police chargée depuis un domaine externe) ;',
        'mesure d’audience par Vercel Web Analytics et Vercel Speed Insights, qui fonctionnent sans cookie ni identifiant persistant et ne produisent que des statistiques agrégées et anonymes (pages vues, pays, type d’appareil, métriques de performance) ;',
        'aucun formulaire : le contact se fait par e-mail ou LinkedIn, aucune donnée n’est saisie sur le site.',
      ],
    },
    {
      title: 'Pourquoi aucune bannière ?',
      paragraphs: [
        'La réglementation (directive ePrivacy, article 129 de la loi belge du 13 juin 2005 et lignes directrices de l’Autorité de protection des données) n’impose un consentement que pour les cookies et traceurs non strictement nécessaires. Ce site n’en utilise aucun : il n’y a donc rien à accepter ni à refuser, et aucune bannière n’est affichée.',
      ],
    },
    {
      title: 'Gérer les cookies dans votre navigateur',
      paragraphs: [
        'Vous pouvez à tout moment consulter, bloquer ou supprimer les cookies de tous les sites via les réglages de votre navigateur :',
      ],
      links: browserGuides,
    },
    {
      title: 'Si cela change',
      paragraphs: [
        'Si un service nécessitant des cookies devait être ajouté (par exemple une vidéo embarquée), cette page serait mise à jour et une demande de consentement serait affichée avant tout dépôt. La date en haut de page indique la dernière révision.',
      ],
    },
    {
      title: 'Questions',
      paragraphs: ['Pour toute question sur les cookies ou vos données : contact@arlioz.be.'],
    },
  ],
};

const cookiesEn: LegalPage = {
  title: 'Cookie settings',
  description:
    'Cookies and trackers on arlioz.be: no tracking cookies, cookieless analytics, and how to manage your preferences.',
  updated: '2026-10-16',
  updatedLabel: 'Last updated',
  sections: [
    {
      title: 'What is a cookie?',
      paragraphs: [
        'A cookie is a small file a website stores in your browser. It can serve the site’s operation (strictly necessary cookies), measure traffic, or track you for advertising. The last two categories require your consent.',
      ],
    },
    {
      title: 'What this site uses',
      paragraphs: ['This site is built to work without cookies or trackers:'],
      list: [
        'no tracking or advertising cookies;',
        'no embedded social network or third-party service (no video, map or font loaded from an external domain);',
        'audience measurement by Vercel Web Analytics and Vercel Speed Insights, which work without cookies or persistent identifiers and only produce aggregated, anonymous statistics (page views, country, device type, performance metrics);',
        'no form: contact happens by e-mail or LinkedIn, no data is entered on the site.',
      ],
    },
    {
      title: 'Why no banner?',
      paragraphs: [
        'The rules (ePrivacy directive, Article 129 of the Belgian Act of 13 June 2005 and the Data Protection Authority’s guidelines) only require consent for cookies and trackers that are not strictly necessary. This site uses none, so there is nothing to accept or refuse and no banner is shown.',
      ],
    },
    {
      title: 'Managing cookies in your browser',
      paragraphs: [
        'You can view, block or delete cookies from any site at any time through your browser settings:',
      ],
      links: [
        {
          label: 'Firefox',
          href: 'https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox',
        },
        { label: 'Chrome', href: 'https://support.google.com/chrome/answer/95647' },
        { label: 'Safari', href: 'https://support.apple.com/guide/safari/sfri11471/mac' },
        {
          label: 'Edge',
          href: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09',
        },
      ],
    },
    {
      title: 'If this changes',
      paragraphs: [
        'Should a service requiring cookies be added (an embedded video, for instance), this page would be updated and consent requested before anything is stored. The date at the top shows the last revision.',
      ],
    },
    {
      title: 'Questions',
      paragraphs: ['For any question about cookies or your data: contact@arlioz.be.'],
    },
  ],
};

export const legal: Record<Locale, { legal: LegalPage; privacy: LegalPage; cookies: LegalPage }> = {
  fr: { legal: legalFr, privacy: privacyFr, cookies: cookiesFr },
  en: { legal: legalEn, privacy: privacyEn, cookies: cookiesEn },
};
