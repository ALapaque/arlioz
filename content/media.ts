import { type ProjectImage } from './types';

/** Image dimensions are the intrinsic sizes of the files in /public/images. */
export const media = {
  logo: { src: '/images/logo-arlioz.webp', width: 900, height: 1000 },
  team: {
    amaury: { src: '/images/team/amaury.webp', width: 800, height: 800 },
  },
  restomax: {
    url: 'natithai.book.ezordr.app',
    desktop1: { src: '/images/work/restomax-book/desktop-1.webp', width: 1600, height: 1000 },
    desktop2: { src: '/images/work/restomax-book/desktop-2.webp', width: 1600, height: 1000 },
    tablet1: { src: '/images/work/restomax-book/tablet-1.webp', width: 600, height: 1187 },
    tablet2: { src: '/images/work/restomax-book/tablet-2.webp', width: 600, height: 863 },
    mobile1: { src: '/images/work/restomax-book/mobile-1.webp', width: 390, height: 1564 },
    mobile2: { src: '/images/work/restomax-book/mobile-2.webp', width: 390, height: 844 },
  },
  jkstudio: {
    url: 'jkstudio.fr',
    desktop: { src: '/images/work/jk-studio/desktop.webp', width: 800, height: 2512 },
    tablet: { src: '/images/work/jk-studio/tablet.webp', width: 400, height: 3208 },
    mobile: { src: '/images/work/jk-studio/mobile.webp', width: 260, height: 3440 },
  },
} as const;

export function img(
  base: { src: string; width: number; height: number },
  alt: string,
): ProjectImage {
  return { ...base, alt };
}
