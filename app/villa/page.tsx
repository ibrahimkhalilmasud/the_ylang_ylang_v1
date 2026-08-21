import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'
import { EditorialSection } from '@/components/EditorialSection'
import { FullBleed } from '@/components/FullBleed'
import { QuickFacts } from '@/components/QuickFacts'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/media'
import villa from '@/content/villa/villa.json'

export const metadata: Metadata = {
  title: 'The Villa',
  description:
    'Explore The Ylang Ylang — a two-storey beachfront pavilion, double-height living areas, a home theatre, 16-metre pool and landscaped gardens in Saba, Bali.',
}

export default function VillaPage() {
  return (
    <>
      <PageHero
        image={IMAGES.heroVillaLawn}
        eyebrow="The Estate"
        title="A private estate, open to the ocean"
        intro="Contemporary Asian architecture fused with traditional Balinese craft, set within 2,100 square metres of beachfront grounds."
      />

      <EditorialSection
        eyebrow="Villa layout"
        title="Arrival, courtyard, pavilion"
        body={villa.layout.body}
        image={IMAGES.facade}
        priority
      />

      <EditorialSection
        eyebrow="Indoor living"
        title="The heart of the villa"
        body={villa.indoorLiving.body}
        image={IMAGES.livingArea}
        reverse
      />

      <FullBleed
        image={IMAGES.mediaRoom}
        eyebrow="The Theatre"
        title="A cinema behind the black sliding doors"
        subtitle="An air-conditioned home theatre projects onto an extensive wall screen, with surround sound and a sofa bed large enough for the whole family."
        height="h-[60vh]"
      />

      <EditorialSection
        eyebrow="Outdoor living"
        title="Lawns, balés and the black-sand shore"
        body={villa.outdoorLiving.body}
        image={IMAGES.outdoorLayout}
      />

      {/* Service */}
      <section className="container-luxe py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="The Service" title={villa.service.heading} intro={villa.service.body} />
            <Reveal delay={0.15}>
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-stone sm:grid-cols-2">
                {villa.service.roster.map((r) => (
                  <li key={r} className="flex items-start gap-2 border-b border-white/5 py-2">
                    <span className="mt-1 text-gold" aria-hidden>—</span>
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-xs text-stone/70">{villa.service.rosterNote}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={IMAGES.staff.src}
                alt={IMAGES.staff.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <QuickFacts />
    </>
  )
}
