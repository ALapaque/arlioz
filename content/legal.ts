import { type Locale } from '@/lib/i18n';

export interface LegalSection {
  id?: string;
  title: string;
  paragraphs: string[];
  list?: string[];
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
        'Le site arlioz.be est édité par Arlioz, société établie en Belgique, inscrite à la Banque-Carrefour des Entreprises sous le numéro [BE 0XXX.XXX.XXX], dont le siège social est situé [adresse à compléter].',
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
        'The website arlioz.be is published by Arlioz, a company established in Belgium, registered with the Crossroads Bank for Enterprises under number [BE 0XXX.XXX.XXX], with its registered office at [address to be completed].',
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
        'Arlioz, [BE 0XXX.XXX.XXX], contact@arlioz.be, est responsable du traitement des données personnelles collectées sur ce site, au sens du Règlement général sur la protection des données (RGPD, règlement (UE) 2016/679).',
      ],
    },
    {
      title: 'Données collectées',
      paragraphs: [
        'Nous collectons uniquement les données que vous nous transmettez via le formulaire de contact :',
      ],
      list: [
        'nom',
        'société (facultatif)',
        'adresse e-mail professionnelle',
        'type de besoin (développement, conseil RGPD, les deux)',
        'contenu de votre message',
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
        'Vos données sont accessibles aux membres d’Arlioz en charge de votre demande. Elles transitent par nos sous-traitants techniques : Vercel Inc. (hébergement du site) et Resend Inc. (acheminement des e-mails du formulaire). Ces prestataires sont tenus par des accords de traitement conformes à l’article 28 du RGPD ; les transferts hors Union européenne sont encadrés par les clauses contractuelles types de la Commission européenne.',
      ],
    },
    {
      title: 'Durée de conservation',
      paragraphs: [
        'Les messages reçus via le formulaire sont conservés 12 mois après le dernier échange, puis supprimés, sauf si une relation contractuelle est engagée.',
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
        'Arlioz, [BE 0XXX.XXX.XXX], contact@arlioz.be, is the controller of the personal data collected on this site, within the meaning of the General Data Protection Regulation (GDPR, Regulation (EU) 2016/679).',
      ],
    },
    {
      title: 'Data collected',
      paragraphs: ['We only collect the data you send us through the contact form:'],
      list: [
        'name',
        'company (optional)',
        'work e-mail address',
        'type of need (development, GDPR consulting, both)',
        'the content of your message',
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
        'Your data is accessible to the Arlioz members handling your request. It passes through our technical processors: Vercel Inc. (website hosting) and Resend Inc. (delivery of form e-mails). These providers are bound by data processing agreements compliant with Article 28 GDPR; transfers outside the European Union are governed by the European Commission’s standard contractual clauses.',
      ],
    },
    {
      title: 'Retention',
      paragraphs: [
        'Messages received through the form are kept for 12 months after the last exchange, then deleted, unless a contractual relationship is entered into.',
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

export const legal: Record<Locale, { legal: LegalPage; privacy: LegalPage }> = {
  fr: { legal: legalFr, privacy: privacyFr },
  en: { legal: legalEn, privacy: privacyEn },
};
