'use client';

import { useEffect } from 'react';
import { debugFlag } from '@/lib/debug-flags';

/**
 * The site's scroll reveals are CSS scroll-driven animations (zero JS).
 * Browsers without `animation-timeline` (Firefox stable, as of 2026) are
 * flagged with `html.no-sda`: content stays visible with no reveal, and the
 * infinite loops pause while scrolling (see globals.css). Any JS- or
 * transition-based fallback measurably stuttered under software compositing.
 */
export function ScrollRevealFallback() {
  useEffect(() => {
    if (typeof CSS === 'undefined' || CSS.supports('animation-timeline: view()')) return;
    if (debugFlag('reveal') === 'off') return;
    document.documentElement.classList.add('no-sda');
  }, []);

  return null;
}
