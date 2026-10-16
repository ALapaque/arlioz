'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LOOPS = '.stage, .marquee';

/**
 * Infinite animations (device screenshots, marquee) only run
 * while their block is on screen. Off-screen loops would otherwise cost a
 * composite per frame for nothing, which shows during scrolling.
 */
export function LoopGuard() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('loop-paused', !entry.isIntersecting);
        }
      },
      { rootMargin: '10% 0px' },
    );
    document.querySelectorAll(LOOPS).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
