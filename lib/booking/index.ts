// Provider selector. Defaults to the real enquiry provider. A dev mock can be enabled
// ONLY via env, and any UI it feeds must render a visible "Demo data" marker.
// See docs/BOOKING_ARCHITECTURE.md §3.

import type { BookingProvider } from './types'
import { enquiryProvider } from './enquiry-provider'

export * from './types'

export function getBookingProvider(): BookingProvider {
  const selected = process.env.NEXT_PUBLIC_BOOKING_PROVIDER

  switch (selected) {
    case 'mock':
      // Lazy-load so mock code never ships to production bundles unless explicitly chosen.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('./mock-provider').mockProvider as BookingProvider
    case 'external':
      // Placeholder for a future real availability API, if Elite Havens exposes one.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('./external-provider').externalProvider as BookingProvider
    case 'enquiry':
    default:
      return enquiryProvider
  }
}
