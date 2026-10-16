'use client';

import { useEffect } from 'react';

/**
 * Flags the document with `is-scrolling` while the page moves (cleared 160 ms
 * after the last scroll event). CSS uses it to pause the infinite animations
 * during scrolling in browsers that fall back to software compositing.
 */
export function ScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;
    const onScroll = () => {
      if (!root.classList.contains('is-scrolling')) root.classList.add('is-scrolling');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => root.classList.remove('is-scrolling'), 160);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
      root.classList.remove('is-scrolling');
    };
  }, []);

  return null;
}
