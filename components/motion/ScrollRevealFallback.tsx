'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * The site's scroll reveals are CSS scroll-driven animations (zero JS).
 * Browsers without `animation-timeline` support load a small GSAP ScrollTrigger
 * module on demand that reproduces the entrances. Nothing is loaded otherwise.
 */
export function ScrollRevealFallback() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof CSS === 'undefined' || CSS.supports('animation-timeline: view()')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('./reveal-fallback').then(({ initRevealFallback }) => {
      if (cancelled) return;
      cleanup = initRevealFallback();
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
