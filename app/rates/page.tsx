import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/media'
import { RESERVE_HREF } from '@/lib/nav'
import rates from '@/content/rates/rates.json'

export const metadata: Metadata = {
  title: 'Rates',
  description:
    'All-inclusive nightly rates for exclusive use of The Ylang Ylang, a six-bedroom beachfront villa in Bali. From USD 1,052 per night.',
}

export default function RatesPage() {
  const seasons = Array.isArray(rates.configurations['6-bedroom'])
    ? rates.configurations['6-bedroom']
    : []

  return (
    <>
      <PageHero
        image={IMAGES.outdoorLayout}
        eyebrow="Rates & Availability"
        title="Every luxury, all inclusive"
        intro={rates.inclusions}
      />

      {/* Season table */}
      <section className="container-luxe py-16 md:py-24">
        <SectionHeading eyebrow="Six-bedroom villa" title="Nightly rates" intro="All rates in USD, for exclusive use of the whole villa." />

        <Reveal delay={0.1}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gold/30 text-[0.7rem] uppercase tracking-wide2 text-stone">
                  <th className="py-4 pr-4 font-medium">Season</th>
                  <th className="py-4 pr-4 font-medium">USD / night</th>
                  <th className="py-4 font-medium">Minimum nights</th>
                </tr>
              </thead>
              <tbody>
                {seasons.map((s) => (
                  <tr key={s.period} className="border-b border-white/8">
                    <td className="py-5 pr-4 text-sm text-bone/90">{s.period}</td>
                    <td className="py-5 pr-4 font-serif text-2xl text-gold-soft">
                      {s.nightly.toLocaleString('en-US')}
                    </td>
                    <td className="py-5 text-sm text-stone">{s.minNights} nights</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-4 text-xs text-stone/70">
            The villa is also available in a four-bedroom configuration — please enquire for
            those rates. Rates and promotions are indicative and confirmed at time of booking.
          </p>
        </Reveal>
      </section>

      {/* Promotions */}
      <section className="border-y border-gold/15 bg-sand-deep py-16 md:py-20">
        <div className="container-luxe">
          <SectionHeading eyebrow="Offers" title="Current promotions" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rates.promotions.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.06}>
                <div className="h-full border border-white/10 bg-sand-black/40 p-6">
                  <p className="font-serif text-xl text-gold">{p.name}</p>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 text-xs text-stone/70">{rates.promoTerms}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-luxe py-20 text-center">
        <Reveal>
          <Link href={RESERVE_HREF} className="btn-primary">Reserve your stay</Link>
        </Reveal>
      </section>
    </>
  )
}
