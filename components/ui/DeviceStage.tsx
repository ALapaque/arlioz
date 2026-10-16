import Image from 'next/image';
import Link from 'next/link';
import { type CSSProperties } from 'react';
import { type DeviceSet, type ProjectImage } from '@/content/types';
import { BrowserBar } from './BrowserBar';
import { Glow } from './Glow';

interface DeviceStageProps {
  devices: DeviceSet;
  reversed?: boolean;
  glow: string;
  glowOpacity?: number;
  href?: string;
  ariaLabel?: string;
}

/**
 * Vertical distance (in % of the image's own height) the capture can travel
 * inside a frame of the given aspect ratio. Used by the `translate`-based
 * scrolling animations, which stay on the compositor (unlike `object-position`).
 */
function travel(image: ProjectImage, frameW: number, frameH: number): string {
  const imageRatio = image.height / image.width;
  const frameRatio = frameH / frameW;
  const pct = Math.max(0, (1 - frameRatio / imageRatio) * 100);
  return `${pct.toFixed(2)}%`;
}

const frames = {
  desktop: { w: 16, h: 10, sizes: '(max-width: 1080px) 72vw, 42vw' },
  tablet: { w: 820, h: 1180, sizes: '(max-width: 600px) 34vw, (max-width: 1080px) 23vw, 14vw' },
  phone: { w: 390, h: 844, sizes: '(max-width: 600px) 21vw, (max-width: 1080px) 13vw, 8vw' },
} as const;

function Screen({
  image,
  alt,
  frame,
  motion,
  className,
}: {
  image: ProjectImage;
  alt?: ProjectImage;
  frame: keyof typeof frames;
  motion: DeviceSet['motion'];
  className: string;
}) {
  const f = frames[frame];
  const base = 'absolute top-0 left-0 block h-auto w-full';
  const vars = (img: ProjectImage) => ({ '--travel': travel(img, f.w, f.h) }) as CSSProperties;
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={f.sizes}
        style={vars(image)}
        className={`${base} ${motion === 'scroll' ? `jk-scroll ${className}` : `rx-a ${className}`}`}
      />
      {motion === 'swap' && alt && (
        <Image
          src={alt.src}
          alt={alt.alt}
          width={alt.width}
          height={alt.height}
          sizes={f.sizes}
          style={vars(alt)}
          className={`${base} rx-b ${className} opacity-0`}
        />
      )}
    </>
  );
}

/**
 * Composition of three device frames (desktop, tablet, phone) with screenshots.
 * `motion: 'swap'` crossfades between two screens; `motion: 'scroll'` slowly
 * scrolls a tall capture. Both are CSS transform/opacity animations only.
 */
export function DeviceStage({
  devices,
  reversed = false,
  glow,
  glowOpacity = 0.16,
  href,
  ariaLabel,
}: DeviceStageProps) {
  const scroll = devices.motion === 'scroll';
  const stageClass = `pj-stage stage relative block aspect-[16/11] overflow-clip rounded-card border border-line-2 bg-surface ${
    reversed ? 'pj-rev' : ''
  }`;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[length:48px_48px] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]"
      />
      <Glow
        color={glow}
        opacity={glowOpacity}
        blur={120}
        style={{
          width: '60%',
          aspectRatio: '1 / 1',
          left: reversed ? '28%' : '12%',
          top: reversed ? '22%' : '20%',
        }}
      />

      {/* Desktop */}
      <div
        className="dev dev-desk absolute top-[9%] w-[72%] overflow-hidden rounded-xl border border-line-4 bg-[#0E0E11] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        style={reversed ? { left: '5%' } : { right: '5%' }}
      >
        <BrowserBar url={devices.url} size="sm" />
        <div
          className="relative block aspect-[16/10] overflow-hidden"
          style={{ backgroundColor: devices.screenBg }}
        >
          <Screen
            image={devices.desktop}
            alt={devices.desktopAlt}
            frame="desktop"
            motion={devices.motion}
            className={scroll ? 'jk-scroll-desk' : ''}
          />
        </div>
      </div>

      {/* Tablet */}
      <div
        className="dev dev-tab absolute bottom-[8%] w-[23%] rounded-2xl border border-line-4 bg-device p-1.5 shadow-[0_24px_50px_rgba(0,0,0,0.55)]"
        style={reversed ? { right: '4%' } : { left: '4%' }}
      >
        <div
          className="relative block aspect-[820/1180] overflow-hidden rounded-[10px]"
          style={{ backgroundColor: devices.screenBg }}
        >
          <Screen
            image={devices.tablet}
            alt={devices.tabletAlt}
            frame="tablet"
            motion={devices.motion}
            className={scroll ? 'jk-scroll-tab' : 'rx-t'}
          />
        </div>
      </div>

      {/* Phone */}
      <div
        className="dev dev-phone absolute bottom-[5%] w-[13%] rounded-[20px] border border-line-4 bg-device p-1 shadow-[0_24px_50px_rgba(0,0,0,0.6)]"
        style={{ left: reversed ? '52%' : '35%' }}
      >
        <div
          className="relative block aspect-[390/844] overflow-hidden rounded-2xl"
          style={{ backgroundColor: devices.screenBg }}
        >
          <Screen
            image={devices.phone}
            alt={devices.phoneAlt}
            frame="phone"
            motion={devices.motion}
            className={scroll ? 'jk-scroll-mob' : 'rx-m'}
          />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={stageClass}>
        {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
        {inner}
      </Link>
    );
  }
  return <div className={stageClass}>{inner}</div>;
}
