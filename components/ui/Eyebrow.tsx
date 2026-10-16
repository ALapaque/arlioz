interface EyebrowProps {
  index: string;
  label: string;
  /** Uses the scroll-driven "sx" entrance (number, rule, label in sequence). */
  animated?: boolean;
  className?: string;
}

export function Eyebrow({ index, label, animated = false, className = '' }: EyebrowProps) {
  return (
    <p className={`label-mono m-0 flex items-center gap-3 text-muted ${className}`}>
      <span className={`text-paper ${animated ? 'sx-num' : ''}`}>{index}</span>
      <span aria-hidden="true" className={`h-px w-7 bg-white/25 ${animated ? 'sx-rule' : ''}`} />
      <span className={animated ? 'sx-lab' : ''}>{label}</span>
    </p>
  );
}
