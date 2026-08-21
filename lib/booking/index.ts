// Provider selector. Defaults to the real enquiry provider. A dev mock can be enabled
// ONLY via env, and any UI it feeds must render a visible "Demo data" marker.
// See docs/BOOKING_ARCHITECTURE.md §3.

import type { BookingProvider } from './types'
import { enquiryProvider } from './enquiry-provider'
import { mockProvider } from './mock-provider'
import { externalProvider } from './external-provider'

export * from './types'

export function getBookingProvider(): BookingProvider {
  switch (process.env.NEXT_PUBLIC_BOOKING_PROVIDER) {
    case 'mock':
      return mockProvider
    case 'external':
      return externalProvider
    case 'enquiry':
    default:
      return enquiryProvider
  }
}
