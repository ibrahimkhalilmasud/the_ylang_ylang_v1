import { Hero } from '@/components/Hero'
import { QuickFacts } from '@/components/QuickFacts'
import { EditorialSection } from '@/components/EditorialSection'
import { FullBleed } from '@/components/FullBleed'
import { ExperienceGrid } from '@/components/ExperienceGrid'
import { ReviewWall } from '@/components/ReviewWall'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/media'
import Link from 'next/link'
import { RESERVE_HREF } from '@/lib/nav'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Intro statement */}
      <section className="container-luxe py-20 text-center md:py-28">
        <Reveal>
          <p className="eyebrow mb-6">Absolute Beachfront · Saba, Bali</p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto max-w-3xl font-serif text-2xl leading-snug text-bone md:text-4xl md:leading-[1.25]">
            Nestled between coconut trees and a deserted black-sand beach, The Ylang Ylang is
            an outstanding six-bedroom destination villa — a retreat of absolute calm that
            exemplifies its mantra of <span className="italic text-gold-soft">Passionate Serenity</span>.
          </p>
        </Reveal>
      </section>

      <QuickFacts />

      {/* The Estate */}
      <EditorialSection
        eyebrow="The Estate"
        title="A two-storey pavilion, open to the sea"
        body={[
          'An impressive open-sided pavilion with an eleven-metre atrium forms the heart of the villa, framed by cream colonnades and a soaring vaulted ceiling that looks across the gardens and pool to the beach.',
          'Landscaped lawns dotted with Indonesian sculpture and frangipani roll down to the shore, flanked by two symmetrical wings holding six ensuite bedrooms.',
        ]}
        image={IMAGES.livingArea}
        cta={{ label: 'Explore the villa', href: '/villa' }}
        priority
      />

      {/* The Ocean — full bleed */}
      <FullBleed
        image={IMAGES.poolDecks}
        eyebrow="The Ocean"
        title="Sixteen metres of pool, then the sea"
        subtitle="A saltwater pool stretches toward the black sands of Saba Beach, with unobstructed views across the Badung Strait to Nusa Penida."
        cta={{ label: 'Reserve your stay', href: RESERVE_HREF }}
      />

      {/* The Rooms */}
      <EditorialSection
        eyebrow="The Rooms"
        title="Suites that face each other across the water"
        body={[
          'Two master suites sit closest to the beach, each with a king four-poster draped in gold organza, a sunken bath, and a private plunge pool looking out to sea.',
          'Two queen rooms and two adjoining junior rooms complete the six, sleeping up to twelve guests in quiet, art-filled comfort.',
        ]}
        image={IMAGES.masterSuite}
        reverse
        cta={{ label: 'View the rooms', href: '/rooms' }}
      />

      {/* The Table */}
      <EditorialSection
        eyebrow="The Table"
        title="A resident chef, and mealtimes made an occasion"
        body={[
          'From poolside barbecues to three-course dinners at an exquisitely-set table, the villa’s resident chef prepares gourmet local, Asian and European dishes at a fine-dining level.',
          'Forty teas, fine wines and cosmopolitan cocktails; special diets welcomed; every menu discussed in advance.',
        ]}
        image={IMAGES.dining}
        cta={{ label: 'Discover dining', href: '/dining' }}
      />

      {/* Experience grid */}
      <ExperienceGrid />

      {/* Service full bleed */}
      <FullBleed
        image={IMAGES.beachDeckSunset}
        eyebrow="The Service"
        title="A staff of nine, and nothing too much trouble"
        subtitle="A full-time manager, resident chef, butlers, housekeepers and security — warm Balinese hospitality, tailored to exactly the presence you prefer."
        height="h-[64vh]"
      />

      {/* Reviews */}
      <ReviewWall limit={6} />

      {/* Closing CTA */}
      <section className="container-luxe py-24 text-center md:py-32">
        <SectionHeading
          align="center"
          eyebrow="Your stay"
          title="Come and stay a while"
        />
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-stone md:text-base">
            Exclusive use of the whole villa, its beachfront pool and its dedicated team — all
            inclusive, from USD 1,052 per night.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={RESERVE_HREF} className="btn-primary">Reserve your stay</Link>
            <Link href="/rates" className="btn-ghost">View rates</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
