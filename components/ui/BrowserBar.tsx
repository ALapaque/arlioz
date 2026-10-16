interface BrowserBarProps {
  url: string;
  size?: 'sm' | 'md' | 'lg';
}

const presets = {
  sm: {
    h: 'h-[26px] gap-[10px] px-[10px]',
    dot: 'h-[7px] w-[7px]',
    dots: 'gap-[5px]',
    url: 'rounded-md px-[10px] py-[2px] text-[10px]',
    spacer: 'w-[31px]',
  },
  md: {
    h: 'h-10 gap-3 px-4',
    dot: 'h-[10px] w-[10px]',
    dots: 'gap-[6px]',
    url: 'rounded-lg px-3 py-1 text-[11px]',
    spacer: 'w-[42px]',
  },
  lg: {
    h: 'h-12 gap-[14px] px-[18px]',
    dot: 'h-[11px] w-[11px]',
    dots: 'gap-[7px]',
    url: 'rounded-lg px-4 py-1.5 text-xs',
    spacer: 'w-[47px]',
  },
} as const;

/** Fake browser chrome drawn above a screenshot. */
export function BrowserBar({ url, size = 'sm' }: BrowserBarProps) {
  const p = presets[size];
  return (
    <div aria-hidden="true" className={`flex items-center border-b border-line-2 ${p.h}`}>
      <span aria-hidden="true" className={`flex ${p.dots}`}>
        <span className={`rounded-full bg-dot ${p.dot}`} />
        <span className={`rounded-full bg-dot ${p.dot}`} />
        <span className={`rounded-full bg-dot ${p.dot}`} />
      </span>
      <span className="flex min-w-0 flex-1 justify-center">
        <span
          className={`overflow-hidden text-ellipsis whitespace-nowrap bg-white/5 font-mono text-muted-2 ${p.url}`}
        >
          {url}
        </span>
      </span>
      <span aria-hidden="true" className={p.spacer} />
    </div>
  );
}
