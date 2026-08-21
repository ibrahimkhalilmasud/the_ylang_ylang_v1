// Booking provider abstraction — shared types.
// See docs/BOOKING_ARCHITECTURE.md. The frontend depends only on these types +
// the BookingProvider interface, never on a concrete provider.

export type VillaConfig = '6-bed' | '4-bed'

export interface DateRange {
  /** ISO date, e.g. "2027-01-05" */
  checkIn: string
  checkOut: string
}

export interface RateSeason {
  period: string // human-readable, e.g. "26 Dec – 05 Jan 2027"
  nightly: number // USD, all-inclusive
  minNights: number
}

export interface EnquiryInput {
  checkIn?: string
  checkOut?: string
  guests?: number
  config?: VillaConfig
}

export interface AvailabilityResult {
  available: boolean
  /** True only for the dev mock provider. UIs MUST surface this as "Demo data". */
  isMock: boolean
}

export type ProviderKind = 'enquiry' | 'external' | 'mock'

export interface BookingProvider {
  readonly kind: ProviderKind
  getRates(config: VillaConfig): Promise<RateSeason[]>
  /** Build a handoff URL to the real external enquiry engine. */
  buildEnquiryUrl(input: EnquiryInput): string
  /** Only implemented by external/mock providers. enquiry provider omits it. */
  checkAvailability?(range: DateRange, guests: number): Promise<AvailabilityResult>
}
