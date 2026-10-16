import { type ElementType } from 'react';

interface LineTitleProps {
  as?: ElementType;
  id?: string;
  lines: readonly string[];
  className?: string;
  /** `scroll` reveals lines on scroll (lm), `load` on page load (ln, hero). */
  mode?: 'scroll' | 'load';
}

/**
 * Heading whose lines slide out of a clipping mask. The text is plain HTML
 * (one span per line), so it stays readable and indexable without JS or CSS.
 */
export function LineTitle({
  as: Tag = 'h2',
  id,
  lines,
  className = '',
  mode = 'scroll',
}: LineTitleProps) {
  const wrap = mode === 'scroll' ? 'lm-wrap' : 'ln-wrap';
  return (
    <Tag id={id} className={`${wrap} m-0 ${className}`}>
      {lines.map((line, i) => (
        <span key={line} className={mode === 'scroll' ? `lm${i === 1 ? ' lm-2' : ''}` : 'ln'}>
          <span className={mode === 'scroll' ? 'lm-in' : `ln-in ln-${i + 1}`}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
