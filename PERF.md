# PERF.md — audit de performance (build du 16/10/2026)

Mesures prises sur `pnpm build && pnpm start` en local (Node 22, Chromium 141 headless), Lighthouse 13 avec son
émulation par défaut : mobile = Moto G Power, 4G lent simulé (RTT 150 ms, 1,6 Mb/s) et CPU ×4 ; desktop = préset
`desktop`. Sur Vercel (CDN, HTTP/2, images optimisées en cache) les temps réels sont inférieurs à la simulation.

## Scores Lighthouse

| Page                    | Perf | A11y | Best practices | SEO | FCP   | LCP   | CLS | TBT   |
| ----------------------- | ---- | ---- | -------------- | --- | ----- | ----- | --- | ----- |
| Accueil `/fr` — mobile  | 92   | 100  | 100            | 100 | 1,2 s | 3,3 s | 0   | 50 ms |
| Accueil `/fr` — desktop | 100  | 100  | 100            | 100 | 0,3 s | 0,7 s | 0   | 20 ms |
| Étude de cas — mobile   | 95   | 100  | 100            | 100 | 1,2 s | 2,9 s | 0   | 60 ms |
| Étude de cas — desktop  | 99   | 100  | 100            | 100 | 0,3 s | 0,9 s | 0   | 0 ms  |

Le seul écart avec les cibles est le LCP mobile **simulé**. L'analyse du LCP montre que l'image est découverte dans le
HTML initial (preload + `fetchpriority=high`), chargée en ~20 ms et peinte au même instant que le FCP : le chiffre
vient du modèle « 4G lent » appliqué au document (~30 kB gzip, dont le payload RSC) et aux polices, pas d'un défaut
de rendu. Mesure directe avec CPU ×4 sans bridage réseau (Playwright, médiane de 3 runs) : **LCP = FCP ≈ 480 ms**.

## Budget JavaScript (page d'accueil, gzip)

| Fichier (chunk)                      | gzip        | Contenu                                         |
| ------------------------------------ | ----------- | ----------------------------------------------- |
| `react-dom` + `react`                | 71,9 kB     | exclu du budget                                 |
| runtime App Router Next.js           | 46,5 kB     | routeur, hydratation, `next/image`, `next/link` |
| polyfills (`noModule`)               | 39,5 kB     | jamais exécuté par un navigateur moderne        |
| app + Lenis + Vercel analytics       | 11,6 kB     | layout client (menu, langue, smooth scroll)     |
| app (formulaire, Magnetic, sections) | ~16 kB      | 4 petits chunks                                 |
| runtime Turbopack + webpack glue     | ~6 kB       |                                                 |
| **Total exécuté hors React**         | **≈ 80 kB** | cible < 90 kB ✔                                 |

GSAP (+ ScrollTrigger, ≈ 30 kB gzip) n'est **pas** dans le bundle initial : il est importé dynamiquement seulement si
`CSS.supports('animation-timeline: view()')` est faux. CSS : 13 kB gzip (un seul fichier). HTML : 29 kB gzip.

## Médias

- Toutes les images sont en WebP dans `public/images` (plus gros fichier : 68 kB), servies via `next/image` en AVIF/WebP
  avec `sizes` adaptés ; aucune image > 200 kB.
- Image LCP du hero : import statique (dimensions + `placeholder="blur"`), `priority`, `fetchPriority="high"`.
- Polices : 3 fichiers variables latin auto-hébergés (`next/font/local`, `display: swap`, métriques de fallback
  ajustées → CLS 0) : Bricolage Grotesque 77 kB, Instrument Sans 30 kB, JetBrains Mono 31 kB (non préchargée).

## Décisions prises pour tenir le budget

1. **Motion retiré** : `motion/react` (même en `LazyMotion`) pesait 53 kB gzip pour trois micro-interactions. Menu
   overlay, swap du formulaire et effet magnétique sont faits en CSS (`@keyframes`, `onAnimationEnd`) et en 30 lignes
   de `requestAnimationFrame`. Réintroduire Motion coûterait ~55 % du budget JS.
2. **Glows sans `filter: blur()`** : les halos de la maquette sont rendus par un `radial-gradient` mis à l'échelle
   (`components/ui/Glow.tsx`). Un `blur(110px)` sur des disques de 300 px forçait une rastérisation coûteuse avant
   le premier paint du hero (LCP mobile 3,6 s → 2,9 s à iso-conditions).
3. **Reveals en CSS scroll-driven** (`animation-timeline: view()`), zéro JS, repli GSAP chargé à la demande.
4. **`content-visibility: auto`** sur les sections basses des études de cas. Pas sur l'accueil : ses sections sont des
   cibles d'ancres (`#contact`, `#equipe`…) et la hauteur estimée faussait la position d'arrivée avec Lenis.
5. **Hero LCP-safe** : le visuel du hero est animé en `scale` uniquement (jamais `opacity: 0` au départ), les lignes
   du H1 sont révélées par masque (`overflow: clip` + `translate`), le texte est du vrai HTML.

## Vérifications complémentaires

- `prefers-reduced-motion: reduce` : Lenis désactivé, aucune animation d'entrée ni de scroll, marquee/float arrêtés.
- Sans JavaScript : tout le contenu est dans le HTML initial (texte, images, liens), le formulaire fonctionne via la
  Server Action (progressive enhancement). Seule la page 404 est complétée côté client (statut 404 correct).
- Clavier : lien « Aller au contenu », `:focus-visible` visible, menu fermable par Échap avec retour du focus.
- Sémantique : un seul `<h1>`, `<main>`, `<nav aria-label>`, `<section aria-labelledby>`, `alt` sur toutes les images.
- SEO : canonical + `hreflang` (fr-BE, en, x-default) sur chaque page et dans `sitemap.xml`, `robots.txt`, manifest,
  image Open Graph générée, JSON-LD `Organization` + `WebSite` + `ItemList` de `Service` (accueil),
  `BreadcrumbList` + `CreativeWork` (études de cas). Pas de contenu caché aux robots.

## Reproduire

```bash
pnpm build && pnpm start
# scores
npx lighthouse http://localhost:3000/fr --only-categories=performance,accessibility,best-practices,seo
npx lighthouse http://localhost:3000/fr --preset=desktop
# poids JS
curl -s http://localhost:3000/fr | grep -o '/_next/static/[^"]*\.js' | sort -u \
  | while read f; do echo "$(curl -s "http://localhost:3000$f" | gzip -c | wc -c) $f"; done
# analyse de bundle
pnpm analyze
```
