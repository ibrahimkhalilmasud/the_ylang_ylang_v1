import { describe, it, expect } from 'vitest'
import { enquiryProvider } from '@/lib/booking/enquiry-provider'
import rates from '@/content/rates/rates.json'
import facts from '@/content/villa/facts.json'

describe('enquiry booking provider', () => {
  it('is the enquiry kind and never claims availability', () => {
    expect(enquiryProvider.kind).toBe('enquiry')
    expect(enquiryProvider.checkAvailability).toBeUndefined()
  })

  it('builds a handoff URL to the real external engine with the dates carried across', () => {
    const url = enquiryProvider.buildEnquiryUrl({ checkIn: '2027-01-05', checkOut: '2027-01-10', guests: 8 })
    expect(url).toContain('booking.privatehomesandvillas.com')
    expect(url).toContain('villaid=YlangYlang')
    expect(url).toContain('checkin=2027-01-05')
    expect(url).toContain('guests=8')
  })

  it('returns the verified 6-bedroom rate table', async () => {
    const seasons = await enquiryProvider.getRates('6-bed')
    expect(seasons.length).toBeGreaterThan(0)
    expect(seasons.every((s) => s.nightly > 0 && s.minNights > 0)).toBe(true)
  })
})

describe('content integrity (no invented facts)', () => {
  it('rate figures match the verified source table', () => {
    const six = rates.configurations['6-bedroom'] as Array<{ nightly: number }>
    const nightlies = six.map((s) => s.nightly).sort((a, b) => a - b)
    expect(nightlies[0]).toBe(1052)
    expect(nightlies[nightlies.length - 1]).toBe(1895)
  })

  it('capacity and identity facts are the verified values', () => {
    expect(facts.capacity.bedrooms).toBe(6)
    expect(facts.capacity.maxGuests).toBe(12)
    expect(facts.identity.established).toBe(2002)
    expect(facts.identity.tagline).toBe('Passionate Serenity')
  })

  it('does not publish a fabricated numeric rating', () => {
    // reviewsCount exists but there is deliberately no star rating field.
    expect(facts.reviewsCount).toBe(94)
    expect((facts as Record<string, unknown>).rating).toBeUndefined()
  })
})
