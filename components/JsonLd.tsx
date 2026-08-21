import facts from '@/content/villa/facts.json'
import rates from '@/content/rates/rates.json'

/**
 * Structured data (brief §33). Uses ONLY verified facts. Deliberately NO aggregateRating
 * — the source publishes 94 testimonials but no numeric rating, so inventing one would be
 * false (see DESIGN_DECISIONS D8).
 */
export function JsonLd() {
  const sixBed = rates.configurations['6-bedroom']
  const lowRate = Array.isArray(sixBed)
    ? Math.min(...sixBed.map((s) => s.nightly))
    : undefined

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: 'The Ylang Ylang',
    description:
      'A six-bedroom absolute-beachfront luxury villa in Saba, Ketewel, Bali. Passionate Serenity.',
    url: 'https://theylangylang.com',
    slogan: facts.identity.tagline,
    foundingDate: String(facts.identity.established),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Saba, Ketewel',
      addressRegion: 'Gianyar Regency, Bali',
      addressCountry: 'ID',
    },
    petsAllowed: false,
    numberOfRooms: facts.capacity.bedrooms,
    maximumAttendeeCapacity: facts.capacity.maxGuests,
    amenityFeature: facts.amenities.slice(0, 12).map((a: string) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    })),
    ...(lowRate
      ? {
          priceRange: `From USD ${lowRate} / night`,
          makesOffer: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: lowRate,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: lowRate,
              priceCurrency: 'USD',
              unitText: 'NIGHT',
            },
          },
        }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
