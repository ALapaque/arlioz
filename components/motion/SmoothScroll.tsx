'use client';

import { type LenisRef, ReactLenis } from 'lenis/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { debugFlag } from '@/lib/debug-flags';
import { ScrollRestoration } from './ScrollRestoration';

/**
 * Lenis smooth scrolling on the window. Lenis drives the native scroll position,
 * so CSS scroll-driven animations keep working unchanged.
 * Disabled for `prefers-reduced-motion: reduce` (and `?lenis=off` while investigating).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || debugFlag('lenis') === 'off') ref.current?.lenis?.destroy();
    if (debugFlag('loops') === 'off') document.documentElement.classList.add('no-loops');
  }, []);

  return (
    <ReactLenis
      ref={ref}
      root
      options={{
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        anchors: true,
        autoRaf: true,
      }}
    >
      <ScrollRestoration />
      {children}
    </ReactLenis>
  );
}
