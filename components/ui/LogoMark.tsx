import Image from 'next/image';
import { media } from '@/content/media';

interface LogoMarkProps {
  height: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

/** The three-ribbon Arlioz mark (900×1000 source). */
export function LogoMark({ height, className = '', alt = '', priority = false }: LogoMarkProps) {
  const width = Math.round((height * media.logo.width) / media.logo.height);
  return (
    <Image
      src={media.logo.src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={`block h-auto ${className}`}
      style={{ height, width: 'auto' }}
    />
  );
}
