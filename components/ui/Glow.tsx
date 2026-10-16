import { type CSSProperties } from 'react';

interface GlowProps {
  color: string;
  style: CSSProperties;
  /** Equivalent `filter: blur()` radius of the design, in px. */
  blur?: number;
  opacity: number;
  className?: string;
}

/**
 * Decorative soft disc. The design uses `filter: blur()`, which costs a full
 * raster pass on every paint (hundreds of ms on a throttled mobile CPU and a
 * direct hit on LCP). A radial gradient scaled up by the blur radius gives the
 * same halo for free; `transform` keeps the centre where the design puts it.
 */
export function Glow({ color, style, blur = 110, opacity, className = '' }: GlowProps) {
  const width = typeof style.width === 'number' ? style.width : undefined;
  const scale = width ? (width + blur * 2.2) / width : 1.7;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background: `radial-gradient(closest-side, ${color} 0%, color-mix(in srgb, ${color} 55%, transparent) 38%, color-mix(in srgb, ${color} 14%, transparent) 70%, transparent 100%)`,
        opacity,
        transform: `scale(${scale.toFixed(2)})`,
        ...style,
      }}
    />
  );
}
