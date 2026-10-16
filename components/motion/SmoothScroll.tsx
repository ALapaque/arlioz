'use client';

import { type LenisRef, ReactLenis } from 'lenis/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { ScrollRestoration } from './ScrollRestoration';

/**
 * Lenis smooth scrolling on the window. Lenis drives the native scroll position,
 * so CSS scroll-driven animations keep working unchanged.
 * Disabled for `prefers-reduced-motion: reduce`.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      ref.current?.lenis?.destroy();
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
