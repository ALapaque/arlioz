# Arlioz — site vitrine

Site de [Arlioz](https://arlioz.be) : développement digital & conseil RGPD, Belgique.
Rebuild complet (v3) à partir de la maquette Claude Design « Arlioz — Site vitrine ».

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components, React Compiler) · **React 19** · **TypeScript strict**
- **Tailwind CSS v4** (tokens dans `app/globals.css` via `@theme`, pas de `tailwind.config`)
- **Animations** : CSS scroll-driven (`animation-timeline: view()`) pour tous les reveals, **Lenis** pour le smooth scroll,
  **GSAP ScrollTrigger** chargé à la demande uniquement comme fallback pour les navigateurs sans `animation-timeline`.
- **Hero** : « courant chromatique » WebGL maison (`components/motion/ChromaCurrent.tsx`, aucune dépendance, ~4 kB) :
  des courants de lumière orange → turquoise sur une grille de points, agités par la souris, un clic libère une tache.
  Ne tourne que sur GPU (rien en rendu logiciel, une image fixe en `prefers-reduced-motion`), en pause hors écran et
  onglet caché.
- **Médias** : `next/image` (AVIF/WebP), polices auto-hébergées via `next/font/local`, sous-ensembles latin
  générés par `scripts/fonts/subset.py` (Bricolage en deux instances statiques 500/600, Instrument Sans variable
  400–600, Instrument Serif italique pour les deux mots du titre, JetBrains Mono 500) : 105 kB au total.
- **Qualité** : ESLint (config Next + Prettier), Prettier, `@next/bundle-analyzer`, Vercel Analytics & Speed Insights.

## Commandes

```bash
pnpm install
pnpm dev            # http://localhost:3000 (redirige vers /fr ou /en)
pnpm build && pnpm start
pnpm check          # typecheck + lint + prettier --check
pnpm analyze        # build avec le bundle analyzer (.next/analyze)
python3 scripts/fonts/subset.py   # régénère app/fonts à partir de scripts/fonts/src (pip install fonttools brotli)
```

Node 22+, pnpm 10.

## Structure

```
app/
  [locale]/              layout racine (fonts, metadata, Lenis), page d'accueil, études de cas,
                         mentions légales, politique de confidentialité, not-found, opengraph-image
  sitemap.ts robots.ts manifest.ts icon.png apple-icon.png favicon.ico
  globals.css            tokens @theme + CSS de la maquette (animations, hover, breakpoints)
components/
  sections/              Hero, About, Expertises, Work, StackMarquee, Team, Contact, LegalPage (Server Components)
  layout/                Header, HeaderControls (menu, langue — client), Footer
  motion/                SmoothScroll (Lenis), ChromaCurrent (WebGL), ScrollRevealFallback, LoopGuard, ScrollState, Magnetic
  ui/                    Button, Eyebrow, LineTitle, Chips, DeviceStage, BrowserBar, Glow, Icons, JsonLd, LogoMark
content/                 textes FR/EN (fr.ts, en.ts), projets, pages légales, médias — aucun texte en dur dans les composants
lib/                     i18n.ts (locales, segments d'URL), seo.ts (metadata + JSON-LD), gsap.ts, site.ts
proxy.ts                 redirection / → /fr|/en (Accept-Language) et alias d'URL anglais (/en/work → realisations)
public/images            logo, captures des projets (WebP ≤ 70 kB)
```

## i18n

Deux langues par segment d'URL : `/fr/...` (défaut, `x-default`) et `/en/...`, avec `hreflang` et canonical sur
chaque page et dans le sitemap. Les segments publics anglais (`/en/work/...`, `/en/legal-notice`,
`/en/privacy-policy`) sont réécrits par `proxy.ts` vers les routes du système de fichiers (segments français).

## Contact

Pas de formulaire ni de backend : la section Contact invite à écrire à contact@arlioz.be (lien `mailto:` avec sujet
pré-rempli) ou à contacter Arlioz sur LinkedIn.

## Déploiement (Vercel)

Préset Next.js, aucune configuration spécifique. Les en-têtes de sécurité (CSP, HSTS, etc.) et le cache immuable
des images sont définis dans `next.config.ts`. Aucune variable d'environnement n'est requise.

Les métriques de performance et la méthode d'audit sont documentées dans [`PERF.md`](./PERF.md).
