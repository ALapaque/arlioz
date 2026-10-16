interface ChipsProps {
  items: readonly string[];
  className?: string;
  /** Scroll-driven staggered pop (project cards). */
  animated?: boolean;
}

export function Chips({ items, className = '', animated = false }: ChipsProps) {
  return (
    <ul
      className={`m-0 flex list-none flex-wrap gap-2 p-0 ${animated ? 'pj-chips' : ''} ${className}`}
    >
      {items.map((item) => (
        <li
          key={item}
          className="rounded-pill border border-line-3 px-3 py-1.5 font-mono text-xs text-paper-3"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
