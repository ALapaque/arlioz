import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * GSAP equivalent of the CSS scroll-driven reveals, for browsers that lack
 * `animation-timeline`. Only compositor-friendly properties are animated.
 */
export function initRevealFallback(): () => void {
  const ctx = gsap.context(() => {
    const reveal = (selector: string, from: gsap.TweenVars, stagger = 0) => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.from(el, {
          ...from,
          duration: 0.9,
          ease: 'power3.out',
          delay: stagger,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    };

    reveal('.rv, .sx-up, .sx-txt, .sx-num, .sx-lab', { autoAlpha: 0, y: 26 });
    reveal('.rv-media', { autoAlpha: 0, y: 48, scale: 0.97 });
    reveal('.sx-card', { autoAlpha: 0, y: 90, scale: 0.94 });
    reveal('.pj-stage', { autoAlpha: 0, y: 70 });
    reveal('.sx-li', { autoAlpha: 0, x: -22 });
    reveal('.rv-bar, .sx-rule', { scaleX: 0, transformOrigin: '0 50%' });
    reveal('.rv-word', { autoAlpha: 0, yPercent: 30 });

    gsap.utils.toArray<HTMLElement>('.lm-in').forEach((el, i) => {
      gsap.from(el, {
        yPercent: 108,
        duration: 1,
        ease: 'power4.out',
        delay: (i % 2) * 0.12,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>('.pj-chips').forEach((list) => {
      gsap.from(list.children, {
        autoAlpha: 0,
        y: 14,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.6)',
        stagger: 0.06,
        scrollTrigger: { trigger: list, start: 'top 92%', once: true },
      });
    });
  });

  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });

  return () => {
    window.removeEventListener('load', refresh);
    ctx.revert();
  };
}
