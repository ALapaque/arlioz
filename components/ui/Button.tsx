import Link from 'next/link';
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ArrowRight } from './Icons';

type Variant = 'primary' | 'ghost';
type Size = 'md' | 'sm';

const sizes: Record<Size, string> = {
  md: 'h-14 gap-[10px] px-7 text-base',
  sm: 'h-10 gap-2 px-4 text-sm',
};

const variants: Record<Variant, string> = {
  primary: 'btn-primary bg-paper text-ink font-semibold',
  ghost: 'btn-ghost border border-line-5 text-paper font-medium',
};

export function buttonClass(variant: Variant, size: Size, className = '') {
  return `inline-flex items-center rounded-pill font-sans ${sizes[size]} ${variants[variant]} ${className}`.trim();
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { href: string };

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow = variant === 'primary',
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const cls = buttonClass(variant, size, className);
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={size === 'sm' ? 15 : 18} />}
    </>
  );
  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = variant === 'primary',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${buttonClass(variant, size, className)} cursor-pointer border-0`}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight size={size === 'sm' ? 15 : 18} />}
    </button>
  );
}
