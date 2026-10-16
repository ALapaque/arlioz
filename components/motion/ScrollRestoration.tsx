'use client';

import { useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Lenis keeps its own scroll target, which overrides Next.js' scroll-to-top on
 * client navigations. Reset it (or jump to the URL hash) whenever the route changes.
 */
export function ScrollRestoration() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash && document.querySelector(hash) ? hash : 0;
    lenis.scrollTo(target, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}
