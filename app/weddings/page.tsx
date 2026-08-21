import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { FullBleed } from '@/components/FullBleed'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/media'
import weddings from '@/content/weddings/weddings.json'

export const metadata: Metadata = {
  title: 'Celebrations',
  description:
    'Weddings and events at The Ylang Ylang — beachfront lawns and gazebos for up to 70 guests standing, with a resident chef and dedicated team.',
}

export default function WeddingsPage() {
  const c = weddings.capacities
  return (
    <>
      <PageHero
        image={IMAGES.poolDecks}
        eyebrow="The Celebration"
        title="A day to remember, on the sand"
        intro={weddings.body}
      />

      <section className="container-luxe py-16 md:py-24">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { v: c.includedNoCharge, l: 'Guests, catered at no extra charge' },
            { v: c.maxSeated, l: 'Seated maximum' },
            { v: c.maxStanding, l: 'Standing maximum' },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="border border-white/10 bg-sand-deep p-8 text-center">
                <p className="font-serif text-5xl text-gold">{stat.v}</p>
                <p className="mt-3 text-xs uppercase tracking-wide2 text-stone">{stat.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FullBleed
        image={IMAGES.beachDeckSunset}
        eyebrow="The Setting"
        title="Panoramic beach and island views"
        subtitle="Extensive flat lawns, outdoor decks and gazebos — arranged in advance with the chef and villa manager."
        height="h-[60vh]"
      />

      <section className="container-luxe py-16 text-center md:py-20">
        <SectionHeading align="center" eyebrow="Planning" title="Arranged with care" />
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
            {weddings.guidelines} Larger weddings and special events can be arranged with prior
            notice — speak with the reservations team to begin.
          </p>
        </Reveal>
      </section>
    </>
  )
}
