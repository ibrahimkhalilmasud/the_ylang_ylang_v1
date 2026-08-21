import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { EditorialSection } from '@/components/EditorialSection'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/media'
import location from '@/content/location/location.json'

export const metadata: Metadata = {
  title: 'Location',
  description:
    'The Ylang Ylang sits on Saba Beach in Ketewel, eastern Bali — 29 km from Ngurah Rai Airport, near Sanur, Ubud and Bali’s finest surf.',
}

export default function LocationPage() {
  return (
    <>
      <PageHero
        image={IMAGES.beachDeck}
        eyebrow="The Locale"
        title="Saba, on Bali’s quiet east coast"
        intro={location.locale}
      />

      <EditorialSection
        eyebrow="The Beach"
        title="Black sand, and a view to Nusa Penida"
        body={location.beach}
        image={IMAGES.beachDeckSunset}
        priority
      />

      <EditorialSection
        eyebrow="The River"
        title="A tidal crossing, half the year"
        body={location.river}
        image={IMAGES.poolDecks}
        reverse
      />

      {/* Distances */}
      <section className="container-luxe py-16 md:py-24">
        <SectionHeading eyebrow="Getting here" title="Within easy reach" />
        <div className="mt-10 grid gap-x-12 gap-y-1 sm:grid-cols-2">
          {location.distances.map((d, i) => (
            <Reveal key={d.place} delay={(i % 2) * 0.05}>
              <div className="flex items-baseline justify-between gap-4 border-b border-white/8 py-3">
                <span className="text-sm text-bone/85">{d.place}</span>
                <span className="font-serif text-lg text-gold-soft">{d.km} km</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 text-xs text-stone/70">
            Distances as published by the property. A car and driver is available for eight
            hours at USD 45++ per day (excludes petrol).
          </p>
        </Reveal>
      </section>
    </>
  )
}
