'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { debugFlag } from '@/lib/debug-flags';

/**
 * Light reveal set for browsers without scroll-driven animations: only small
 * surfaces (headline masks, paragraphs, list items, bars). Large blocks (cards
 * with images, device stages, the giant footer word) stay static because every
 * transitioning block forces a recomposite per scroll frame under software
 * compositing (measured in headless Firefox).
 */
const TARGETS = [
  '.lm-in',
  '.sx-txt',
  '.sx-up',
  '.sx-li',
  '.sx-num',
  '.sx-lab',
  '.sx-rule',
  '.rv-bar',
  '.rv:not(article):not(.rv-media)',
].join(', ');

/**
 * The site's scroll reveals are CSS scroll-driven animations (zero JS).
 * Browsers without `animation-timeline` (Firefox stable, as of 2026) are
 * flagged with `html.no-sda`: infinite loops pause while scrolling and one
 * IntersectionObserver adds `.is-in` to the light reveal set above, whose
 * entrances are short CSS transitions (nothing runs per scroll frame).
 * The default is static; `?reveal=light` enables the light set.
 */
export function ScrollRevealFallback() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof CSS === 'undefined' || CSS.supports('animation-timeline: view()')) return;
    const root = document.documentElement;
    root.classList.add('no-sda');
    // Static by default: in headless Firefox (software compositing) even this
    // light set made ~20% of scroll frames exceed 33 ms, versus ~2% static.
    // `?reveal=light` opts in for comparison on real hardware.
    if (debugFlag('reveal') !== 'light') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('sda-light');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    document.querySelectorAll(TARGETS).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
