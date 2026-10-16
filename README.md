# Arlioz — site vitrine

Site de [Arlioz](https://arlioz.be) : développement digital & conseil RGPD, Belgique.
Rebuild complet (v3) à partir de la maquette Claude Design « Arlioz — Site vitrine ».

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components, React Compiler) · **React 19** · **TypeScript strict**
- **Tailwind CSS v4** (tokens dans `app/globals.css` via `@theme`, pas de `tailwind.config`)
- **Animations** : CSS scroll-driven (`animation-timeline: view()`) pour tous les reveals, **Lenis** pour le smooth scroll,
  **GSAP ScrollTrigger** chargé à la demande uniquement comme fallback pour les navigateurs sans `animation-timeline`.
- **Médias** : `next/image` (AVIF/WebP), polices variables auto-hébergées via `next/font/local` (latin uniquement).
- **Qualité** : ESLint (config Next + Prettier), Prettier, `@next/bundle-analyzer`, Vercel Analytics & Speed Insights.

## Commandes

```bash
pnpm install
pnpm dev            # http://localhost:3000 (redirige vers /fr ou /en)
pnpm build && pnpm start
pnpm check          # typecheck + lint + prettier --check
pnpm analyze        # build avec le bundle analyzer (.next/analyze)
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
  motion/                SmoothScroll (Lenis), ScrollRevealFallback (+ reveal-fallback GSAP), Magnetic, ContactForm
  ui/                    Button, Eyebrow, LineTitle, Chips, DeviceStage, BrowserBar, Glow, Icons, JsonLd, LogoMark
content/                 textes FR/EN (fr.ts, en.ts), projets, pages légales, médias — aucun texte en dur dans les composants
lib/                     i18n.ts (locales, segments d'URL), seo.ts (metadata + JSON-LD), gsap.ts, actions/contact.ts, site.ts
proxy.ts                 redirection / → /fr|/en (Accept-Language) et alias d'URL anglais (/en/work → realisations)
public/images            logo, captures des projets (WebP ≤ 70 kB)
```

## i18n

Deux langues par segment d'URL : `/fr/...` (défaut, `x-default`) et `/en/...`, avec `hreflang` et canonical sur
chaque page et dans le sitemap. Les segments publics anglais (`/en/work/...`, `/en/legal-notice`,
`/en/privacy-policy`) sont réécrits par `proxy.ts` vers les routes du système de fichiers (segments français).

## Formulaire de contact

Server Action (`lib/actions/contact.ts`) avec honeypot et validation. L'envoi passe par l'API REST de Resend si
`RESEND_API_KEY` et `CONTACT_TO_EMAIL` sont définis (voir `.env.example`) ; sinon le formulaire affiche un message
invitant à écrire directement à contact@arlioz.be.

## Déploiement (Vercel)

Préset Next.js, aucune configuration spécifique. Les en-têtes de sécurité (CSP, HSTS, etc.) et le cache immuable
des images sont définis dans `next.config.ts`. Variables d'environnement à renseigner dans le projet Vercel :
celles de `.env.example`.

Les métriques de performance et la méthode d'audit sont documentées dans [`PERF.md`](./PERF.md).
