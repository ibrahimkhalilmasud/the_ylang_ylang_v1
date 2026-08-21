import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { FullBleed } from '@/components/FullBleed'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/media'
import location from '@/content/location/location.json'

export const metadata: Metadata = {
  title: 'Experiences',
  description:
    'A curated concierge at The Ylang Ylang — cultural tours, surfing and diving, cooking classes, yacht charters and private Balinese performances along Bali’s east coast.',
}

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        image={IMAGES.entranceSculpture}
        eyebrow="The Journey"
        title="Bali, curated"
        intro={location.concierge}
      />

      <section className="container-luxe py-16 md:py-24">
        <SectionHeading
          eyebrow="Things to do"
          title="From black-sand rides to sacred temples"
          intro="The villa manager arranges everything — here is a taste of what lies within reach."
        />
        <div className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {location.thingsToDo.map((t, i) => (
            <Reveal key={i} delay={(i % 2) * 0.06}>
              <div className="flex items-start gap-4 border-b border-white/8 py-4">
                <span className="font-serif text-2xl text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-relaxed text-stone">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FullBleed
        image={IMAGES.beachDeckSunset}
        eyebrow="The Concierge"
        title="Whatever gets you going, it can be arranged"
        subtitle="From pre-stocked provisions to private performers — the Elite Havens concierge goes the extra mile."
        height="h-[56vh]"
      />

      <section className="container-luxe py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading align="center" eyebrow="Culture" title="A village of dancers and temples" />
          <Reveal delay={0.12}>
            <p className="mt-5 text-sm leading-relaxed text-stone md:text-base">{location.culture}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
