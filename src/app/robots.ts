import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://aston-martin-valkyrie-amr-pro.vercel.app/sitemap.xml',
  }
}
