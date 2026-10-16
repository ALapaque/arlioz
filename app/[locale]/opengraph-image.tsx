import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getContent } from '@/content';
import { isLocale } from '@/lib/i18n';
import { site } from '@/lib/site';

export const alt = 'Arlioz';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : 'fr';
  const content = getContent(locale);

  const [display, sans, logo] = await Promise.all([
    readFile(join(process.cwd(), 'lib/og/BricolageGrotesque-Medium.ttf')),
    readFile(join(process.cwd(), 'lib/og/InstrumentSans-Regular.ttf')),
    readFile(join(process.cwd(), 'public/images/logo-arlioz-512.png')),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#0A0A0C',
        color: '#F2F1EE',
        fontFamily: 'Instrument Sans',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -160,
          top: -200,
          width: 620,
          height: 620,
          borderRadius: 999,
          background: '#FA7F13',
          opacity: 0.22,
          filter: 'blur(140px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: -200,
          bottom: -260,
          width: 620,
          height: 620,
          borderRadius: 999,
          background: '#2065CB',
          opacity: 0.26,
          filter: 'blur(140px)',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img src={logoSrc} alt="" width={76} height={84} style={{ objectFit: 'contain' }} />
          <span style={{ fontFamily: 'Bricolage Grotesque', fontSize: 44, letterSpacing: -1.5 }}>
            arlioz
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Bricolage Grotesque',
              fontSize: 92,
              lineHeight: 0.98,
              letterSpacing: -4,
            }}
          >
            <span>{content.hero.title[0]}</span>
            <span>{content.hero.title[1]}</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 26,
              color: '#A3A3AB',
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, background: '#FA7F13' }} />
              <div style={{ width: 12, height: 12, borderRadius: 999, background: '#2065CB' }} />
              <div style={{ width: 12, height: 12, borderRadius: 999, background: '#2BBE8D' }} />
            </div>
            <span>{content.meta.ogTagline}</span>
            <span style={{ marginLeft: 'auto', color: '#85858E' }}>
              {site.url.replace('https://', '')}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Bricolage Grotesque', data: display, weight: 500, style: 'normal' },
        { name: 'Instrument Sans', data: sans, weight: 400, style: 'normal' },
      ],
    },
  );
}
