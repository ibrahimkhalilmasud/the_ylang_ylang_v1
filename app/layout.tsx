import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/SmoothScroll'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { AmbientAudio } from '@/components/AmbientAudio'
import { StickyReserve } from '@/components/StickyReserve'
import { JsonLd } from '@/components/JsonLd'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const SITE_URL = 'https://theylangylang.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Ylang Ylang — Private Beachfront Villa, Bali',
    template: '%s · The Ylang Ylang',
  },
  description:
    'The Ylang Ylang is a six-bedroom absolute-beachfront luxury villa in Saba, Ketewel, Bali. Passionate Serenity — a private estate with a 16-metre pool, resident chef and dedicated staff.',
  keywords: [
    'The Ylang Ylang', 'Bali villa', 'beachfront villa Bali', 'Ketewel villa',
    'Saba beach villa', 'luxury villa Bali', 'private villa Bali', 'six bedroom villa Bali',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'The Ylang Ylang — Private Beachfront Villa, Bali',
    description:
      'A six-bedroom absolute-beachfront luxury estate in Saba, Ketewel, Bali. Passionate Serenity.',
    siteName: 'The Ylang Ylang',
    images: [{ url: '/media/images/hero-villa-lawn.jpg', width: 2000, height: 1500, alt: 'The Ylang Ylang at blue hour' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ylang Ylang — Private Beachfront Villa, Bali',
    description: 'A six-bedroom absolute-beachfront luxury estate in Bali. Passionate Serenity.',
    images: ['/media/images/hero-villa-lawn.jpg'],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#14110E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-sand-black"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
        <StickyReserve />
        <AmbientAudio />
      </body>
    </html>
  )
}
