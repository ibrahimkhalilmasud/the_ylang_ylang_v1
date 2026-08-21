import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { IMAGES } from '@/lib/media'
import { RESERVE_HREF } from '@/lib/nav'
import location from '@/content/location/location.json'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact The Ylang Ylang — a private beachfront villa in Saba, Ketewel, Bali, marketed by The Elite Havens Group.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        image={IMAGES.facade}
        eyebrow="Enquiries"
        title="Begin the conversation"
        intro="For reservations, weddings and special arrangements, our team is ready to help."
      />

      <section className="container-luxe py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow mb-4">Find us</p>
              <address className="not-italic font-serif text-2xl leading-relaxed text-bone">
                Saba Village, Ketewel<br />
                Gianyar Regency, Bali<br />
                Indonesia
              </address>
              <p className="mt-6 text-sm leading-relaxed text-stone">
                29 km from Ngurah Rai International Airport (DPS). The villa is marketed and
                managed by The Elite Havens Group.
              </p>
              <Link href={RESERVE_HREF} className="btn-primary mt-8">
                Request availability
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="eyebrow mb-4">Nearby</p>
              <ul className="space-y-2.5">
                {location.distances.map((d) => (
                  <li key={d.place} className="flex items-baseline justify-between border-b border-white/8 py-2 text-sm">
                    <span className="text-bone/85">{d.place}</span>
                    <span className="text-gold-soft">{d.km} km</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
