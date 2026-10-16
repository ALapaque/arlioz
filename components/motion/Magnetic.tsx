'use client';

import { type PointerEvent, type ReactNode, useEffect, useRef } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Pulls its child a few pixels towards a fine pointer (spring-like easing on
 * requestAnimationFrame, transform only). Inert on touch and reduced motion.
 */
export function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const tick = () => {
    const el = ref.current;
    if (!el) return;
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.18;
    c.y += (t.y - c.y) * 0.18;
    el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)`;
    if (Math.abs(t.x - c.x) > 0.1 || Math.abs(t.y - c.y) > 0.1) {
      frame.current = requestAnimationFrame(tick);
    } else if (t.x === 0 && t.y === 0) {
      el.style.transform = '';
    }
  };

  const schedule = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(tick);
  };

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled.current || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: (event.clientX - (rect.left + rect.width / 2)) * strength,
      y: (event.clientY - (rect.top + rect.height / 2)) * strength,
    };
    schedule();
  };

  const reset = () => {
    target.current = { x: 0, y: 0 };
    schedule();
  };

  return (
    <div
      ref={ref}
      className={`inline-flex will-change-transform ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </div>
  );
}
