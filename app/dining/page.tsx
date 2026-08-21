import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { EditorialSection } from '@/components/EditorialSection'
import { FullBleed } from '@/components/FullBleed'
import { IMAGES } from '@/lib/media'
import dining from '@/content/dining/dining.json'

export const metadata: Metadata = {
  title: 'Dining',
  description:
    'A resident chef prepares gourmet local, Asian and European cuisine at The Ylang Ylang — from poolside barbecues to formal beachfront dinners.',
}

export default function DiningPage() {
  return (
    <>
      <PageHero
        image={IMAGES.dining}
        eyebrow="The Table"
        title="Mealtimes made an occasion"
        intro={dining.body}
      />

      <EditorialSection
        eyebrow="The Chef"
        title="Fine dining, in your own home"
        body={dining.body}
        image={IMAGES.kitchen}
        priority
      />

      <FullBleed
        image={IMAGES.beachDeckSunset}
        eyebrow="Where you dine"
        title="From the pool deck to the sand"
        subtitle="Multiple dining settings across the estate — a lacquered table for fourteen, garden balés, and the beach at sunset."
        height="h-[60vh]"
      />

      <EditorialSection
        eyebrow="The Menus"
        title="Ordered in advance, tailored to you"
        body={dining.menus}
        image={IMAGES.dining}
        reverse
      />

      <section className="container-luxe py-16 md:py-20">
        <div className="mx-auto max-w-3xl border border-white/10 bg-sand-deep p-8 text-center md:p-10">
          <p className="eyebrow mb-3">Good to know</p>
          <p className="text-sm leading-relaxed text-stone">{dining.provisioning}</p>
        </div>
      </section>
    </>
  )
}
