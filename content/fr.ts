import { img, media } from './media';
import { type Project, type SiteContent } from './types';

const restomax: Project = {
  slug: 'restomax-book',
  index: '01',
  title: 'Restomax Book',
  type: 'Site web & widget',
  client: 'Restomax',
  clientUrl: 'https://restomax.be',
  summary:
    'Le système de réservation en ligne de Restomax : un widget aux couleurs de chaque restaurant, qui simplifie la gestion des réservations et limite les no-shows.',
  highlights: 'Jusqu’à 2 h libérées par jour · Anti no-show · Personnalisable',
  tags: ['React', 'Recoil', 'Nx', 'MUI', 'Emotion', 'TypeScript'],
  demoUrl: 'https://natithai.book.ezordr.app/',
  demoLabel: 'Voir un exemple en ligne',
  accent: 'orange',
  reversed: false,
  devices: {
    screenBg: '#FFFFFF',
    url: media.restomax.url,
    motion: 'swap',
    desktop: img(
      media.restomax.desktop1,
      'Widget Restomax Book : choix du nombre de personnes et du service',
    ),
    desktopAlt: img(media.restomax.desktop2, 'Widget Restomax Book : choix de la date'),
    tablet: img(media.restomax.tablet1, 'Restomax Book sur tablette'),
    tabletAlt: img(media.restomax.tablet2, ''),
    phone: img(media.restomax.mobile1, 'Restomax Book sur mobile'),
    phoneAlt: img(media.restomax.mobile2, ''),
  },
  caseStudy: {
    tagline:
      'Votre nouveau système de réservation : un site et un widget de réservation en ligne, aux couleurs de chaque restaurant.',
    intro:
      'Restomax Book est le système de réservation en ligne de Restomax. Proposé sous forme de site et de widget, personnalisable aux couleurs de chaque établissement, il simplifie la gestion des réservations et s’adapte à tous les types de restaurants.',
    stat: {
      value: '2 h',
      text: 'Jusqu’à deux heures libérées chaque jour pour l’équipe du restaurant.',
    },
    heroImage: img(
      media.restomax.desktop1,
      'Restomax Book pour Nati Thai : choix du nombre de personnes et du service',
    ),
    features: [
      {
        title: 'Réservations simplifiées',
        text: 'Toutes les réservations en ligne, gérées simplement depuis un seul outil.',
      },
      {
        title: 'Du temps gagné',
        text: 'Jusqu’à deux heures libérées chaque jour pour votre équipe.',
      },
      {
        title: 'À vos couleurs',
        text: 'Une interface personnalisable aux couleurs de votre établissement.',
      },
      {
        title: 'Moins de no-shows',
        text: 'Une gestion intelligente des réservations pour limiter les absences.',
      },
      {
        title: 'Un service personnalisé',
        text: 'Les habitudes de vos clients enregistrées et restituées à chaque visite.',
      },
      {
        title: 'Pour tous les restaurants',
        text: 'Une solution qui s’adapte à tous les types d’établissements.',
      },
    ],
    stack: [
      { category: 'Interface', name: 'React' },
      { category: 'État', name: 'Recoil' },
      { category: 'Monorepo', name: 'Nx' },
      { category: 'Composants', name: 'MUI' },
      { category: 'Styles', name: 'Emotion' },
      { category: 'Typage', name: 'TypeScript' },
    ],
    gallery: [
      {
        kind: 'desktop',
        image: img(media.restomax.desktop2, 'Étape 2 sur ordinateur : choix de la date'),
        caption: 'Desktop · choix de la date',
      },
      {
        kind: 'phone',
        image: img(media.restomax.mobile2, 'Étape 2 sur mobile : calendrier des disponibilités'),
        caption: 'Mobile · calendrier',
      },
      {
        kind: 'tablet',
        image: img(media.restomax.tablet1, 'Accueil du widget sur tablette'),
        caption: 'Tablette · accueil',
      },
      {
        kind: 'phone',
        image: img(media.restomax.mobile1, 'Étape 1 sur mobile : nombre de personnes et service'),
        caption: 'Mobile · réservation',
      },
      {
        kind: 'phone',
        image: img(
          media.restomax.mobile1,
          'Fiche du restaurant sur mobile : contact et itinéraire',
        ),
        caption: 'Mobile · infos et itinéraire',
        position: '50% 100%',
      },
    ],
  },
};

const jkstudio: Project = {
  slug: 'jk-studio',
  index: '02',
  title: 'JK Studio',
  type: 'Site web',
  client: 'JK Studio',
  clientUrl: 'https://www.jkstudio.fr/',
  summary:
    'Le portfolio photo de JK Studio : des galeries par catégories, un formulaire de contact et des contenus faciles à mettre à jour.',
  highlights: 'Nightlife · Mariages · Événements · Mode sombre et clair',
  tags: ['Next.js', 'Supabase'],
  demoUrl: 'https://www.jkstudio.fr/',
  demoLabel: 'Voir le site',
  accent: 'yellow',
  reversed: true,
  devices: {
    screenBg: '#EFEAE3',
    url: media.jkstudio.url,
    motion: 'scroll',
    desktop: img(media.jkstudio.desktop, 'Page d’accueil de jkstudio.fr sur ordinateur'),
    tablet: img(media.jkstudio.tablet, 'jkstudio.fr sur tablette'),
    phone: img(media.jkstudio.mobile, 'jkstudio.fr sur mobile'),
  },
  caseStudy: {
    tagline:
      'Un portfolio photo qui met les images au premier plan : galeries par catégories, contact direct et contenus mis à jour sans développeur.',
    intro:
      'JK Studio est le portfolio d’un photographe spécialisé dans le nightlife, les mariages et les événements. Nous avons conçu un site rapide et sobre où chaque galerie se parcourt comme une planche-contact, avec un mode sombre et un mode clair, et une gestion des contenus simple pour le photographe.',
    heroImage: img(media.jkstudio.desktop, 'Page d’accueil de jkstudio.fr sur ordinateur'),
    features: [
      {
        title: 'Galeries par catégories',
        text: 'Nightlife, mariages, événements : chaque univers a sa galerie et son rythme.',
      },
      {
        title: 'Images au premier plan',
        text: 'Des photos servies aux bonnes dimensions, chargées à la demande, sans perte de qualité.',
      },
      {
        title: 'Sombre et clair',
        text: 'Deux thèmes pour que les photos restent lisibles quel que soit l’éclairage.',
      },
      {
        title: 'Formulaire de contact',
        text: 'Une demande de devis simple, qui arrive directement dans la boîte du photographe.',
      },
      {
        title: 'Contenus faciles à mettre à jour',
        text: 'Ajouter une série ou changer un texte ne demande aucune intervention technique.',
      },
      {
        title: 'Rapide et bien référencé',
        text: 'Pages statiques, images optimisées et métadonnées soignées pour les moteurs de recherche.',
      },
    ],
    stack: [
      { category: 'Framework', name: 'Next.js' },
      { category: 'Interface', name: 'React' },
      { category: 'Données', name: 'Supabase' },
      { category: 'Typage', name: 'TypeScript' },
    ],
    gallery: [
      {
        kind: 'desktop',
        image: img(media.jkstudio.desktop, 'Page d’accueil de jkstudio.fr sur ordinateur'),
        caption: 'Desktop · accueil',
      },
      {
        kind: 'phone',
        image: img(media.jkstudio.mobile, 'jkstudio.fr sur mobile'),
        caption: 'Mobile · accueil',
      },
      {
        kind: 'tablet',
        image: img(media.jkstudio.tablet, 'jkstudio.fr sur tablette'),
        caption: 'Tablette · galerie',
      },
    ],
  },
};

export const fr: SiteContent = {
  locale: 'fr',
  meta: {
    title: 'Arlioz — Développement digital & conseil RGPD en Belgique',
    template: '%s — Arlioz',
    description:
      'Arlioz réunit le développement digital et la protection des données : sites, applications web et mobiles, conformité RGPD. Une seule équipe, basée en Belgique, depuis 2018.',
    keywords: [
      'développement web',
      'application mobile',
      'conseil RGPD',
      'conformité RGPD',
      'privacy by design',
      'Belgique',
      'Next.js',
      'React',
      'Angular',
    ],
    ogAlt: 'Arlioz — Du code solide. Des données protégées.',
    ogTagline: 'Développement digital & conseil RGPD · Belgique',
  },
  a11y: {
    skipToContent: 'Aller au contenu',
    homeLink: 'Arlioz, accueil',
    backToTop: 'Arlioz, retour en haut de page',
    languageGroup: 'Langue du site',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    mainNav: 'Navigation principale',
    siteMap: 'Plan du site',
    menuDialog: 'Menu principal',
  },
  nav: {
    menu: 'Menu',
    close: 'Fermer',
    sectionLabel: 'Navigation',
    items: [
      { label: 'Expertises', anchor: 'expertises', dot: 'orange' },
      { label: 'Réalisations', anchor: 'realisations', dot: 'blue' },
      { label: 'Équipe', anchor: 'equipe', dot: 'green' },
      { label: 'Contact', anchor: 'contact', dot: 'yellow' },
    ],
    write: 'Nous écrire',
    follow: 'Suivre',
    language: 'Langue',
    tagline: 'Développement digital et conformité RGPD, depuis 2018. Basés en Belgique.',
    cta: 'Parlons de votre projet',
    ctaShort: 'Parlons projet',
    linkedin: 'LinkedIn',
  },
  hero: {
    badge: 'Développement & RGPD · Belgique',
    title: ['Du code solide.', 'Des données protégées.'],
    text: 'Arlioz réunit deux mondes : le développement digital et la protection des données. Sites, applications web et mobiles, conformité RGPD : une seule équipe pour faire grandir votre entreprise, sereinement et intelligemment.',
    ctaPrimary: 'Parlons de votre projet',
    ctaSecondary: 'Voir nos réalisations',
    logoAlt: 'Logo Arlioz : trois rubans entrelacés, orange, bleu et vert',
    chips: [
      { label: 'Privacy by design', dot: 'blue' },
      { label: 'Web & mobile', dot: 'orange' },
      { label: 'Depuis 2018', dot: 'green' },
    ],
    clientsLabel: 'En production chez',
    clients: ['Radyo', 'Restomax', 'JK Studio'],
  },
  about: {
    index: '01',
    label: 'À propos',
    year: '2018',
    yearLabel: 'Année de création',
    title: [
      { text: 'Nous réunissons deux mondes, ' },
      { text: 'la protection des données', mark: 'blue' },
      { text: ' et ' },
      { text: 'le développement digital', mark: 'orange' },
      { text: ', pour aider les entreprises à ' },
      { text: 'grandir', mark: 'green' },
      { text: ' de manière sûre et intelligente.' },
    ],
    logoLine: 'Trois rubans entrelacés : notre logo résume notre façon de travailler.',
    pillars: [
      {
        title: 'Développer',
        text: 'Sites, applications web et mobiles : nous concevons et développons vos produits avec des technologies modernes et éprouvées.',
      },
      {
        title: 'Protéger',
        text: 'Nous rendons votre conformité RGPD claire et concrète, et nous l’intégrons dès l’architecture de vos projets.',
      },
      {
        title: 'Grandir',
        text: 'Des solutions robustes et évolutives, pensées pour accompagner votre croissance en toute sérénité.',
      },
    ],
  },
  expertises: {
    index: '02',
    label: 'Expertises',
    title: ['Deux expertises', 'qui se complètent.'],
    intro:
      'Une application, un audit RGPD, ou les deux : vous travaillez directement avec les experts qui réalisent le travail.',
    rgpd: {
      tag: 'Protection des données',
      title: 'Conseil RGPD',
      text: 'Un expert à vos côtés pour mettre votre organisation en conformité, et pour le rester.',
      items: [
        'Audit de conformité',
        'Registre des traitements',
        'Analyses d’impact (AIPD)',
        'Politiques de confidentialité et cookies',
        'Contrats de sous-traitance',
        'Sensibilisation des équipes',
      ],
    },
    cards: [
      {
        tag: 'Développement',
        title: 'Développement web',
        text: 'Sites, plateformes et widgets sur mesure : rapides, accessibles et faciles à faire évoluer.',
        icon: 'code',
      },
      {
        tag: 'Développement',
        title: 'Applications cross-platform',
        text: 'Une base de code pour le web et le mobile : commande, réservation ou marketplace, aux couleurs de votre marque.',
        icon: 'devices',
      },
      {
        tag: 'Développement',
        title: 'Architecture frontend',
        text: 'Monorepo, design system, gestion d’état : des fondations propres pour des produits et des équipes qui grandissent.',
        icon: 'layout',
      },
      {
        tag: 'Développement',
        title: 'Optimisation de sites web',
        text: 'Performance, Core Web Vitals, SEO technique et accessibilité : un site plus rapide et plus visible.',
        icon: 'gauge',
      },
    ],
    stack: {
      tag: 'Dev × RGPD',
      title: 'Architecture de stack projet',
      text: [
        {
          text: 'Choix des technologies, hébergement, flux de données et sécurité : une architecture pensée pour la conformité dès la conception. Le ',
        },
        { text: 'privacy by design', strong: true },
        { text: ', concrètement.' },
      ],
      diagram: {
        left: 'DEV',
        right: 'RGPD',
        center: ['PRIVACY', 'BY DESIGN'],
        aria: 'Le développement et le RGPD se rejoignent : le privacy by design',
      },
    },
  },
  work: {
    index: '03',
    label: 'Réalisations',
    title: ['Des projets', 'concrets, en ligne.'],
    intro:
      'Réservation en ligne, portfolio photo : quelques projets que nous avons conçus et développés.',
    caseStudy: 'Étude de cas',
    liveExample: 'Voir un exemple en ligne',
    viewSite: 'Voir le site',
    clientPrefix: 'Client :',
  },
  stack: {
    index: '04',
    label: 'Stack',
    title: 'Les technologies avec lesquelles nous construisons.',
    items: ['Angular', 'React', 'Next.js', 'Vue.js', 'Nuxt', 'NestJS', 'TypeScript'],
  },
  team: {
    index: '05',
    label: 'Équipe',
    title: 'Deux experts, en direct.',
    intro:
      'Vous échangez directement avec ceux qui conçoivent, développent et sécurisent votre projet.',
    members: [
      {
        name: 'Guy Moins',
        role: 'Architecte IT & expert RGPD',
        text: 'Il cadre vos traitements de données, sécurise l’architecture de vos projets et rend la conformité RGPD concrète pour vos équipes.',
        tags: ['Conseil RGPD', 'Architecture IT', 'Stack projet'],
        initials: 'GM',
        photoLabel: 'Photo · Guy Moins',
        accent: 'blue',
      },
      {
        name: 'Amaury Lapaque',
        role: 'Développeur fullstack',
        text: 'Il conçoit et développe vos sites et applications web et mobiles, de l’architecture frontend jusqu’à l’API.',
        tags: ['Angular', 'React · Next.js', 'Vue · Nuxt', 'NestJS', 'TypeScript'],
        photo: {
          ...media.team.amaury,
          alt: 'Portrait d’Amaury Lapaque, développeur fullstack chez Arlioz',
        },
        initials: 'AL',
        photoLabel: 'Photo · Amaury Lapaque',
        accent: 'orange',
      },
    ],
  },
  contact: {
    index: '06',
    label: 'Contact',
    title: 'Un projet ? Une question RGPD ? Parlons-en.',
    text: 'Dites-nous en quelques lignes où vous en êtes. Nous revenons vers vous avec un premier avis et les prochaines étapes.',
    emailLabel: 'E-mail',
    linkedinLabel: 'LinkedIn',
    linkedinValue: 'Arlioz',
    direct: {
      title: 'Un e-mail ou un message LinkedIn suffit.',
      text: 'Décrivez votre projet ou votre question en quelques lignes, nous revenons vers vous avec un premier avis et les prochaines étapes.',
      email: 'Écrire à contact@arlioz.be',
      linkedin: 'Nous contacter sur LinkedIn',
      subject: 'Projet / question RGPD — demande de contact',
      privacy: 'Vos données servent uniquement à répondre à votre demande.',
      privacyLink: 'Politique de confidentialité',
    },
  },
  footer: {
    tagline: 'Vos partenaires de confiance en protection des données et développement digital.',
    navigation: 'Navigation',
    contact: 'Contact',
    legal: 'Légal',
    country: 'Belgique',
    legalNotice: 'Mentions légales',
    privacy: 'Politique de confidentialité',
    cookies: 'Gestion des cookies',
    copyright: '© {year} Arlioz · BCE {bce}',
    madeIn: 'Conçu et développé en Belgique',
    backToTop: 'Retour en haut ↑',
  },
  caseStudy: {
    back: 'Toutes les réalisations',
    counter: 'Étude de cas',
    client: 'Client',
    type: 'Type',
    stack: 'Stack',
    demo: 'Exemple en ligne',
    sections: {
      project: 'Le projet',
      features: 'Fonctionnalités',
      featuresTitle: 'Ce que la solution apporte.',
      stack: 'Stack technique',
      stackTitle: 'Une base solide et typée.',
      stackIntro: 'Les technologies utilisées pour concevoir le site et le widget de réservation.',
      gallery: 'En images',
      galleryTitle: 'L’interface, écran par écran.',
    },
    next: 'Projet suivant',
    nextAria: 'Projet suivant :',
    cta: {
      title: 'Un projet similaire ? Parlons-en.',
      text: 'Réservation en ligne, portfolio, plateforme sur mesure : nous concevons des outils conformes au RGPD dès la première ligne de code.',
      write: 'Écrire à contact@arlioz.be',
      home: 'Retour à l’accueil',
    },
    metaTitle: (title) => `${title} — Étude de cas`,
  },
  notFound: {
    title: 'Page introuvable.',
    text: 'La page que vous cherchez n’existe pas ou a été déplacée.',
    cta: 'Retour à l’accueil',
  },
  projects: [restomax, jkstudio],
};
