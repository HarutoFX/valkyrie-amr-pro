import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aston Martin Valkyrie AMR Pro Experience',
    short_name: 'Valkyrie AMR Pro',
    description: 'Immersive interactive 3D web experience for the Aston Martin Valkyrie AMR Pro track hypercar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0C0F',
    theme_color: '#0A0C0F',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
