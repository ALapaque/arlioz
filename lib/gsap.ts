import type Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Single registration point: every client module imports gsap from here.
gsap.registerPlugin(ScrollTrigger);

/**
 * Drives Lenis from GSAP's ticker and feeds its scroll events to ScrollTrigger,
 * the setup Lenis recommends when both run (create Lenis with `autoRaf: false`).
 * Returns a teardown function.
 */
export function syncLenis(lenis: Lenis): () => void {
  const onScroll = () => ScrollTrigger.update();
  const tick = (time: number) => lenis.raf(time * 1000);
  lenis.on('scroll', onScroll);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    lenis.off('scroll', onScroll);
    gsap.ticker.remove(tick);
  };
}

export { gsap, ScrollTrigger };
