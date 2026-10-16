import { type SiteContent } from '@/content/types';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Glow } from '@/components/ui/Glow';
import { Check, expertiseIcons, Layers, Shield } from '@/components/ui/Icons';
import { LineTitle } from '@/components/ui/LineTitle';

const card =
  'card-hover sx-card relative flex flex-col rounded-card border border-line-2 bg-surface';

export function Expertises({ content }: { content: SiteContent }) {
  const { expertises: x } = content;
  return (
    <section id="expertises" aria-labelledby="services-title" className="pb-section">
      <div className="container-site">
        <div className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
          <div className="flex min-w-0 max-w-[780px] flex-col gap-[22px]">
            <Eyebrow index={x.index} label={x.label} animated />
            <LineTitle
              id="services-title"
              lines={x.title}
              className="font-display text-h2 leading-none font-medium tracking-[-0.04em]"
            />
          </div>
          <p className="sx-up sx-late m-0 max-w-[420px] text-[17px] leading-[1.6] text-muted">
            {x.intro}
          </p>
        </div>

        <div className="bento">
          {/* RGPD */}
          <article className={`${card} span-r2 hx-blue gap-7 overflow-clip p-9`}>
            <Glow
              color="#2065CB"
              opacity={0.3}
              blur={90}
              style={{ width: 320, height: 320, right: -110, top: -110 }}
            />
            <div className="hx" aria-hidden="true" />
            <div className="hx-line" aria-hidden="true" />
            <div className="relative flex items-center justify-between gap-3">
              <span className="ico inline-flex h-[52px] w-[52px] items-center justify-center rounded-tile bg-blue/16 text-blue-light">
                <Shield />
              </span>
              <span className="hx-tag label-mono-sm rounded-pill border border-blue-light/32 px-3 py-1.5 text-blue-light">
                {x.rgpd.tag}
              </span>
            </div>
            <div className="relative flex flex-col gap-3.5">
              <LineTitle
                as="h3"
                lines={[x.rgpd.title]}
                className="font-display text-h3 leading-[1.02] font-medium tracking-[-0.035em]"
              />
              <p className="sx-txt m-0 text-base leading-[1.6] text-muted">{x.rgpd.text}</p>
            </div>
            <ul className="relative m-0 mt-auto flex list-none flex-col p-0">
              {x.rgpd.items.map((item, i, all) => (
                <li
                  key={item}
                  className={`sx-li flex items-center gap-3 border-t border-line-2 py-[13px] text-[15px] text-paper-2 ${
                    i === all.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <Check className="ck flex-none text-blue-light" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          {/* Development cards */}
          {x.cards.map((item, i) => {
            const Icon = expertiseIcons[item.icon];
            return (
              <article
                key={item.title}
                className={`${card} ${i % 2 === 0 ? 'sx-d1' : 'sx-d2'} hx-orange min-h-[288px] justify-between gap-10 p-8`}
              >
                <div className="hx" aria-hidden="true" />
                <div className="hx-line" aria-hidden="true" />
                <div className="relative flex items-center justify-between gap-3">
                  <span className="ico inline-flex h-[52px] w-[52px] items-center justify-center rounded-tile bg-orange/13 text-orange-light">
                    <Icon />
                  </span>
                  <span className="hx-tag label-mono-sm rounded-pill border border-orange-light/30 px-3 py-1.5 text-orange-light">
                    {item.tag}
                  </span>
                </div>
                <div className="relative flex flex-col gap-2.5">
                  <LineTitle
                    as="h3"
                    lines={[item.title]}
                    className="font-display text-card leading-[1.1] font-medium tracking-[-0.025em]"
                  />
                  <p className="sx-txt m-0 text-[15.5px] leading-[1.6] text-muted">{item.text}</p>
                </div>
              </article>
            );
          })}

          {/* Stack architecture */}
          <article
            className={`${card} span-c3 hx-green flex-row flex-wrap items-center justify-between gap-10 overflow-clip p-[clamp(28px,3.4vw,44px)]`}
          >
            <Glow
              color="#2BBE8D"
              opacity={0.2}
              style={{ width: 360, height: 360, left: '38%', bottom: -160 }}
            />
            <div className="hx" aria-hidden="true" />
            <div className="hx-line" aria-hidden="true" />
            <div className="stk-txt relative flex min-w-0 max-w-[660px] flex-[1_1_420px] flex-col gap-[18px]">
              <div className="flex items-center gap-3.5">
                <span className="ico inline-flex h-[52px] w-[52px] items-center justify-center rounded-tile bg-green/14 text-green">
                  <Layers />
                </span>
                <span className="hx-tag label-mono-sm rounded-pill border border-green/32 px-3 py-1.5 text-green">
                  {x.stack.tag}
                </span>
              </div>
              <LineTitle
                as="h3"
                lines={[x.stack.title]}
                className="mt-1.5 font-display text-h3 leading-[1.02] font-medium tracking-[-0.035em]"
              />
              <p className="sx-txt m-0 text-[16.5px] leading-[1.6] text-muted">
                {x.stack.text.map((segment, i) =>
                  segment.strong ? (
                    <span key={i} className="text-paper">
                      {segment.text}
                    </span>
                  ) : (
                    <span key={i}>{segment.text}</span>
                  ),
                )}
              </p>
            </div>
            <svg
              className="vn relative h-auto w-full max-w-[380px] flex-[0_1_380px]"
              role="img"
              aria-label={x.stack.diagram.aria}
              viewBox="0 0 360 210"
            >
              <defs>
                <clipPath id="arz-lens">
                  <circle cx="135" cy="105" r="90" />
                </clipPath>
              </defs>
              <g className="vn-l">
                <circle
                  cx="135"
                  cy="105"
                  r="90"
                  fill="rgba(250,127,19,0.07)"
                  stroke="#FA7F13"
                  strokeWidth="1.5"
                />
                <text
                  x="88"
                  y="109"
                  textAnchor="middle"
                  fill="#FB9A4B"
                  fontFamily="var(--font-mono)"
                  fontSize="12"
                  fontWeight="500"
                  letterSpacing="1.5"
                >
                  {x.stack.diagram.left}
                </text>
              </g>
              <g className="vn-r">
                <circle
                  cx="225"
                  cy="105"
                  r="90"
                  fill="rgba(32,101,203,0.1)"
                  stroke="#2065CB"
                  strokeWidth="1.5"
                />
                <text
                  x="272"
                  y="109"
                  textAnchor="middle"
                  fill="#6E9CF0"
                  fontFamily="var(--font-mono)"
                  fontSize="12"
                  fontWeight="500"
                  letterSpacing="1.5"
                >
                  {x.stack.diagram.right}
                </text>
              </g>
              <g className="vn-c">
                <circle cx="225" cy="105" r="90" fill="#2BBE8D" clipPath="url(#arz-lens)" />
                <text
                  x="180"
                  y="101"
                  textAnchor="middle"
                  fill="#0A0A0C"
                  fontFamily="var(--font-mono)"
                  fontSize="10.5"
                  fontWeight="500"
                  letterSpacing="0.8"
                >
                  {x.stack.diagram.center[0]}
                </text>
                <text
                  x="180"
                  y="117"
                  textAnchor="middle"
                  fill="#0A0A0C"
                  fontFamily="var(--font-mono)"
                  fontSize="10.5"
                  fontWeight="500"
                  letterSpacing="0.8"
                >
                  {x.stack.diagram.center[1]}
                </text>
              </g>
            </svg>
          </article>
        </div>
      </div>
    </section>
  );
}
