// Placeholder for a future REAL availability integration, if Elite Havens / Private
// Homes & Villas exposes an API. Until then it defers to the enquiry provider and does
// NOT claim availability. See docs/BOOKING_ARCHITECTURE.md.

import type { BookingProvider, EnquiryInput, RateSeason, VillaConfig } from './types'
import { enquiryProvider } from './enquiry-provider'

export const externalProvider: BookingProvider = {
  kind: 'external',
  getRates(config: VillaConfig): Promise<RateSeason[]> {
    return enquiryProvider.getRates(config)
  },
  buildEnquiryUrl(input: EnquiryInput): string {
    return enquiryProvider.buildEnquiryUrl(input)
  },
  // checkAvailability intentionally omitted until a real endpoint exists.
}
