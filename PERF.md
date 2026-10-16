# PERF.md — audit de performance (build du 16/10/2026)

Mesures prises sur `pnpm build && pnpm start` en local (Node 22, Chromium 141 headless), Lighthouse 13 avec son
émulation par défaut : mobile = Moto G Power, 4G lent simulé (RTT 150 ms, 1,6 Mb/s) et CPU ×4 ; desktop = préset
`desktop`. Sur Vercel (CDN, HTTP/2, images optimisées en cache) les temps réels sont inférieurs à la simulation.

## Scores Lighthouse

| Page                    | Perf | A11y | Best practices | SEO | FCP   | LCP   | CLS | TBT    |
| ----------------------- | ---- | ---- | -------------- | --- | ----- | ----- | --- | ------ |
| Accueil `/fr` — mobile  | 92   | 100  | 100            | 100 | 1,1 s | 3,2 s | 0   | 110 ms |
| Accueil `/fr` — desktop | 100  | 100  | 100            | 100 | 0,3 s | 0,7 s | 0   | 0 ms   |
| Étude de cas — mobile   | 92   | 100  | 100            | 100 | 1,1 s | 3,3 s | 0   | 50 ms  |
| Étude de cas — desktop  | 100  | 100  | 100            | 100 | 0,3 s | 0,8 s | 0   | 0 ms   |

(Mobile : variance de ± 4 points d'un run à l'autre sur le LCP simulé des études de cas, 87 à 94.)

Le seul écart avec les cibles est le LCP mobile **simulé**. Le LCP de l'accueil est le `<h1>` (texte HTML, polices
préchargées) : le chiffre vient du modèle « 4G lent » appliqué au document (~26 kB gzip, dont le payload RSC) et aux
polices, pas d'un défaut de rendu. Mesure directe avec CPU ×4 sans bridage réseau (Playwright, médiane de 3 runs) :
**LCP = FCP ≈ 480 ms**.

## Budget JavaScript (page d'accueil, gzip)

| Fichier (chunk)                  | gzip        | Contenu                                          |
| -------------------------------- | ----------- | ------------------------------------------------ |
| `react-dom` + `react`            | 71,9 kB     | exclu du budget                                  |
| runtime App Router Next.js       | 46,5 kB     | routeur, hydratation, `next/image`, `next/link`  |
| polyfills (`noModule`)           | 39,5 kB     | jamais exécuté par un navigateur moderne         |
| app + Lenis + Vercel analytics   | 12,7 kB     | layout client (menu, langue, smooth scroll)      |
| app (Magnetic, sections, 404)    | ~22 kB      | petits chunks                                    |
| ChromaCurrent (hero WebGL)       | 3,8 kB      | shaders + boucle, aucune dépendance              |
| runtime Turbopack + webpack glue | ~4 kB       |                                                  |
| **Total exécuté hors React**     | **≈ 89 kB** | cible < 90 kB ✔ (marge faible : ne rien ajouter) |

GSAP (+ ScrollTrigger, ≈ 30 kB gzip) n'est **pas** dans le bundle initial : il est importé dynamiquement seulement si
`CSS.supports('animation-timeline: view()')` est faux. CSS : 13 kB gzip (un seul fichier). HTML : 29 kB gzip.

## Médias

- Toutes les images sont en WebP dans `public/images` (plus gros fichier : 68 kB), servies via `next/image` en AVIF/WebP
  avec `sizes` adaptés ; aucune image > 200 kB.
- Le hero n'a plus d'image : son LCP est le `<h1>`, son visuel un `<canvas>` WebGL transparent (aucun CLS, rien à
  télécharger) qui ne démarre qu'après `requestIdleCallback`.
- Polices : 5 fichiers latin auto-hébergés (`next/font/local`, `display: swap`, métriques de fallback ajustées → CLS 0),
  générés par `scripts/fonts/subset.py` (fonttools : sous-ensemble latin, instanciation) : Bricolage Grotesque en
  deux instances statiques 500 et 600 à l'optical size 96 (20 + 20 kB, au lieu d'une variable de 77 kB ; le site
  n'utilise que ces deux graisses), Instrument Sans variable 400–600 (26 kB), Instrument Serif italique 12 kB (deux
  mots du H1), JetBrains Mono instance 500 (19 kB, non préchargée). 105 kB au lieu de 164 kB.
- Logo PNG 512 px du manifest : 36 kB (palette) au lieu de 128 kB.

## Décisions prises pour tenir le budget

1. **Motion retiré** : `motion/react` (même en `LazyMotion`) pesait 53 kB gzip pour trois micro-interactions. Menu
   overlay et effet magnétique sont faits en CSS (`@keyframes`, `onAnimationEnd`) et en 30 lignes
   de `requestAnimationFrame`. Réintroduire Motion coûterait ~55 % du budget JS.
2. **Glows sans `filter: blur()`** : les halos de la maquette sont rendus par un `radial-gradient` mis à l'échelle
   (`components/ui/Glow.tsx`). Un `blur(110px)` sur des disques de 300 px forçait une rastérisation coûteuse avant
   le premier paint du hero (LCP mobile 3,6 s → 2,9 s à iso-conditions).
3. **Reveals en CSS scroll-driven** (`animation-timeline: view()`), zéro JS. Firefox stable n'a pas encore
   `animation-timeline` : il reçoit `html.no-sda`, boucles en pause pendant le scroll et un jeu de reveals
   léger (titres à masque, paragraphes, puces, barres ; les grands blocs restent statiques), déclenché par un
   IntersectionObserver et joué en transitions CSS. Mesure en Firefox headless (compositing logiciel, 60 crans
   de molette) : repli GSAP ScrollTrigger → 56 à 68 frames > 33 ms sur ~190 ; transitions sur tous les blocs
   → 50 à 62 ; jeu léger → 35 à 39 ; statique → 3 à 5. Lenis n'y est pour rien (désactivé : aucun gain). Le jeu
   léger a été validé fluide par le propriétaire sur Firefox réel (GPU), d'où ce choix par défaut.
4. **`content-visibility: auto`** sur les sections basses des études de cas. Pas sur l'accueil : ses sections sont des
   cibles d'ancres (`#contact`, `#equipe`…) et la hauteur estimée faussait la position d'arrivée avec Lenis.
5. **Hero LCP-safe** : les lignes du H1 sont révélées par masque (`overflow: clip` + `translate`), le texte est du
   vrai HTML, rien ne démarre à `opacity: 0` dans le bloc LCP.
6. **Hero WebGL « courant chromatique »** (`components/motion/ChromaCurrent.tsx`, 3,8 kB gzip, pas de bibliothèque) :
   le champ lumineux est calculé une fois par point de la grille (texture ≈ 160 × 100 texels) puis les points sont
   dessinés dans une seconde passe, soit ~80 × moins de travail qu'un shader par pixel. La boucle ne tourne que sur GPU
   (renderer `SwiftShader`/`llvmpipe`/« software » → canvas vide : Lighthouse et PageSpeed, qui n'ont pas de GPU,
   passaient de 50 ms à 143 s de TBT avec une boucle logicielle), seulement quand le canvas est visible et l'onglet
   actif, et une seule image fixe en `prefers-reduced-motion`. Elle continue pendant le scroll (le travail est sur
   le GPU ; une pause y figeait visiblement l'effet). Un repli CSS « grille de points statique » a été essayé et retiré : en Firefox logiciel
   il coûtait autant que l'ancien logo flottant (36–40 frames > 33 ms contre 25–32 sans). Mesure Firefox headless
   après le changement : 25 à 32 frames > 33 ms sur ~210 (35 à 39 avec l'ancien hero).

## Pourquoi le score mobile plafonne à 92–93

Le LCP mobile **simulé** (3,0–3,2 s) ne dépend presque pas des polices : Lighthouse estime le LCP d'un texte en
moyennant un graphe « optimiste » (≈ FCP) et un graphe « pessimiste » qui attend toutes les ressources démarrées
avant le LCP observé, soit ici les chunks JavaScript (React + runtime App Router ≈ 160 kB) en plus des polices.
Mesures de contrôle (local, mêmes conditions) :

| Variante                          | Perf | LCP simulé | Observé en réel |
| --------------------------------- | ---- | ---------- | --------------- |
| Site complet                      | 92   | 3,2 s      | 185 ms          |
| Polices bloquées (`*.woff2`)      | 95   | 2,8 s      |                 |
| JavaScript bloqué (`chunks/*.js`) | 99   | 2,1 s      |                 |

Même sans aucun JavaScript le modèle ne donne pas 100 : avec React et l'hydratation, 92–95 est le plafond de cette
simulation. Les données réelles (Core Web Vitals, ce que Google utilise) sont au vert : LCP = FCP ≈ 480 ms en CPU ×4.
`font-display: optional` sur les polices secondaires a été essayé : aucun gain de score, donc `swap` est conservé.

## Vérifications complémentaires

- `prefers-reduced-motion: reduce` : Lenis désactivé, aucune animation d'entrée ni de scroll, marquee arrêté, courant
  du hero figé sur une image.
- Sans JavaScript : tout le contenu est dans le HTML initial (texte, images, liens), le contact passe par des liens
  `mailto:` et LinkedIn. Seule la page 404 est complétée côté client (statut 404 correct).
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
