import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { EditorialSection } from '@/components/EditorialSection'
import { FullBleed } from '@/components/FullBleed'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/media'
import wellness from '@/content/wellness/wellness.json'

export const metadata: Metadata = {
  title: 'Wellness',
  description:
    'Spa, yoga and meditation at The Ylang Ylang — in-house Balinese treatments, rooftop yoga decks, visiting masters and the therapeutic black sands of Saba.',
}

export default function WellnessPage() {
  return (
    <>
      <PageHero
        image={IMAGES.beachDeck}
        eyebrow="The Wellness"
        title="Passionate Serenity"
        intro={wellness.philosophy}
      />

      <EditorialSection
        eyebrow="The Spa"
        title="Balinese treatments, wherever you wish"
        body={wellness.spa}
        image={IMAGES.beachDeckSunset}
        priority
      />

      <FullBleed
        image={IMAGES.outdoorLayout}
        eyebrow="Yoga & Meditation"
        title="At dawn, on the rooftop deck"
        subtitle="Curated instructors and visiting masters, mats provided, with peaceful places to practise from the river deck to the rooftop at sunset."
        height="h-[60vh]"
      />

      <EditorialSection
        eyebrow="The Practice"
        title="Curated masters, and Balinese healers"
        body={wellness.yoga}
        image={IMAGES.beachDeck}
        reverse
      />

      <section className="container-luxe py-16 text-center md:py-20">
        <SectionHeading align="center" eyebrow="The Black Sand" title="Therapy, underfoot" />
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
            {wellness.blackSand}
          </p>
        </Reveal>
      </section>
    </>
  )
}
