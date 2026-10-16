import Image from 'next/image';
import Link from 'next/link';
import { type DeviceSet } from '@/content/types';
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

const screenshot = 'absolute inset-0 block h-full w-full object-cover object-top';

/**
 * Composition of three device frames (desktop, tablet, phone) with screenshots.
 * `motion: 'swap'` crossfades between two screens; `motion: 'scroll'` slowly
 * scrolls a tall capture. Both are pure CSS animations.
 */
export function DeviceStage({
  devices,
  reversed = false,
  glow,
  glowOpacity = 0.16,
  href,
  ariaLabel,
}: DeviceStageProps) {
  const swap = devices.motion === 'swap';
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
          <Image
            src={devices.desktop.src}
            alt={devices.desktop.alt}
            fill
            sizes="(max-width: 1080px) 72vw, 42vw"
            className={`${screenshot} ${swap ? 'rx-a' : ''} ${scroll ? 'jk-scroll jk-scroll-desk' : ''}`}
          />
          {swap && devices.desktopAlt && (
            <Image
              src={devices.desktopAlt.src}
              alt={devices.desktopAlt.alt}
              fill
              sizes="(max-width: 1080px) 72vw, 42vw"
              className={`${screenshot} rx-b opacity-0`}
            />
          )}
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
          <Image
            src={devices.tablet.src}
            alt={devices.tablet.alt}
            fill
            sizes="(max-width: 600px) 34vw, (max-width: 1080px) 23vw, 14vw"
            className={`${screenshot} ${swap ? 'rx-a rx-t' : ''} ${scroll ? 'jk-scroll jk-scroll-tab' : ''}`}
          />
          {swap && devices.tabletAlt && (
            <Image
              src={devices.tabletAlt.src}
              alt={devices.tabletAlt.alt}
              fill
              sizes="(max-width: 600px) 34vw, (max-width: 1080px) 23vw, 14vw"
              className={`${screenshot} rx-b rx-t opacity-0`}
            />
          )}
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
          <Image
            src={devices.phone.src}
            alt={devices.phone.alt}
            fill
            sizes="(max-width: 600px) 21vw, (max-width: 1080px) 13vw, 8vw"
            className={`${screenshot} ${swap ? 'rx-a rx-m' : ''} ${scroll ? 'jk-scroll jk-scroll-mob' : ''}`}
          />
          {swap && devices.phoneAlt && (
            <Image
              src={devices.phoneAlt.src}
              alt={devices.phoneAlt.alt}
              fill
              sizes="(max-width: 600px) 21vw, (max-width: 1080px) 13vw, 8vw"
              className={`${screenshot} rx-b rx-m opacity-0`}
            />
          )}
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
