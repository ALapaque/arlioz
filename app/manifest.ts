import { type MetadataRoute } from 'next';
import { getContent } from '@/content';

export default function manifest(): MetadataRoute.Manifest {
  const content = getContent('fr');
  return {
    name: 'Arlioz',
    short_name: 'Arlioz',
    description: content.meta.description,
    lang: 'fr-BE',
    start_url: '/fr',
    display: 'standalone',
    background_color: '#0A0A0C',
    theme_color: '#0A0A0C',
    icons: [
      { src: '/images/logo-arlioz-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      {
        src: '/images/logo-arlioz-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
