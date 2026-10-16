import { type SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };

function base({ size = 18, strokeWidth = 1.9, ...rest }: IconProps) {
  return {
    'aria-hidden': true as const,
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...rest,
  };
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 2, ...props })}>
      <path pathLength="1" d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base({ size: 26, strokeWidth: 1.6, ...props })}>
      <path d="M12 3l7.5 3v5.6c0 4.6-3.2 8.4-7.5 9.9-4.3-1.5-7.5-5.3-7.5-9.9V6L12 3z" />
      <path d="M9 12.2l2.2 2.2 4.3-4.4" />
    </svg>
  );
}

export function Code(props: IconProps) {
  return (
    <svg {...base({ size: 26, strokeWidth: 1.6, ...props })}>
      <path d="M8.5 8l-4 4 4 4" />
      <path d="M15.5 8l4 4-4 4" />
      <path d="M13.5 5.5l-3 13" />
    </svg>
  );
}

export function Devices(props: IconProps) {
  return (
    <svg {...base({ size: 26, strokeWidth: 1.6, ...props })}>
      <rect x="2.5" y="4.5" width="13.5" height="10" rx="1.5" />
      <path d="M6 18.5h6.5" />
      <path d="M9.25 14.5v4" />
      <rect x="17.5" y="8.5" width="4.5" height="11" rx="1.2" />
    </svg>
  );
}

export function Layout(props: IconProps) {
  return (
    <svg {...base({ size: 26, strokeWidth: 1.6, ...props })}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M3.5 9h17" />
      <path d="M9.5 9v11.5" />
    </svg>
  );
}

export function Gauge(props: IconProps) {
  return (
    <svg {...base({ size: 26, strokeWidth: 1.6, ...props })}>
      <path d="M4.2 16.5a8.5 8.5 0 1 1 15.6 0" />
      <path d="M12 14l4.2-4.6" />
      <circle cx="12" cy="14.2" r="1.3" />
    </svg>
  );
}

export function Layers(props: IconProps) {
  return (
    <svg {...base({ size: 26, strokeWidth: 1.6, ...props })}>
      <path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8 12 3.5z" />
      <path d="M3.5 12.2L12 16.7l8.5-4.5" />
      <path d="M3.5 16.2L12 20.7l8.5-4.5" />
    </svg>
  );
}

export function Burger(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 2, ...props })}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 2, ...props })}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export const expertiseIcons = {
  code: Code,
  devices: Devices,
  layout: Layout,
  gauge: Gauge,
} as const;
