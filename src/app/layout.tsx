import type { Metadata, Viewport } from 'next'
import { Outfit, Roboto_Mono, Inter } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from '@/lib/constants'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const viewport: Viewport = {
  themeColor: '#0A0C0F',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aston-martin-valkyrie-amr-pro.vercel.app'),

  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    'Aston Martin',
    'Valkyrie AMR Pro',
    'Hypercar',
    'Cosworth V12',
    '3D Experience',
    'Track Car',
    'Le Mans',
    'AMR',
    'Bespoke Configurator',
  ],

  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${robotoMono.variable} ${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full bg-[#0A0C0F] text-[#F4F6F8] overflow-x-hidden">
        <ScrollProgress />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}