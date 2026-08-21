// DEFAULT production provider. Shows real published rates and hands off to the real
// external Elite Havens / Private Homes & Villas enquiry engine. It does NOT claim
// real-time availability (none is confirmed to exist). See docs/BOOKING_ARCHITECTURE.md.

import type { BookingProvider, EnquiryInput, RateSeason, VillaConfig } from './types'
import rates from '../../content/rates/rates.json'

const ENQUIRE_BASE =
  'https://booking.privatehomesandvillas.com/availvillas.html?villaid=YlangYlang'

export const enquiryProvider: BookingProvider = {
  kind: 'enquiry',

  async getRates(config: VillaConfig): Promise<RateSeason[]> {
    const table = rates.configurations[config === '6-bed' ? '6-bedroom' : '4-bedroom']
    // 4-bedroom is currently an UNVERIFIED string placeholder in the content layer.
    if (!Array.isArray(table)) return []
    return table as RateSeason[]
  },

  buildEnquiryUrl(input: EnquiryInput): string {
    const url = new URL(ENQUIRE_BASE)
    if (input.checkIn) url.searchParams.set('checkin', input.checkIn)
    if (input.checkOut) url.searchParams.set('checkout', input.checkOut)
    if (input.guests) url.searchParams.set('guests', String(input.guests))
    return url.toString()
  },
  // intentionally no checkAvailability — enquiry-based, no confirmed availability API.
}
