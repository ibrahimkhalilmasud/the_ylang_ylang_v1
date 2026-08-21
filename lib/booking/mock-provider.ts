// DEV-ONLY provider. Returns fabricated availability for local demos. Any UI fed by this
// MUST render a visible "Demo data" marker. NEVER enable in production
// (see docs/BOOKING_ARCHITECTURE.md §3). Enabled via NEXT_PUBLIC_BOOKING_PROVIDER=mock.

import type { AvailabilityResult, BookingProvider, DateRange, EnquiryInput, RateSeason, VillaConfig } from './types'
import { enquiryProvider } from './enquiry-provider'

export const mockProvider: BookingProvider = {
  kind: 'mock',
  getRates(config: VillaConfig): Promise<RateSeason[]> {
    return enquiryProvider.getRates(config)
  },
  buildEnquiryUrl(input: EnquiryInput): string {
    return enquiryProvider.buildEnquiryUrl(input)
  },
  async checkAvailability(_range: DateRange, _guests: number): Promise<AvailabilityResult> {
    // Deterministic pseudo-availability so demos are stable; clearly flagged as mock.
    return { available: true, isMock: true }
  },
}
