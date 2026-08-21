# BOOKING ARCHITECTURE — The Ylang Ylang

> Per brief §19–20. Booking is designed as a **real** integration abstraction, never a
> fake engine. This documents the current, verified reservation reality and the
> provider-agnostic design that wraps it.

## 1. Current reservation reality (verified 2026-08-21)
- The live site does **not** offer instant on-site booking. Every "Enquire" / "Book" /
  "Check rates and availability" control routes to an **external** system:
  `https://booking.privatehomesandvillas.com/availvillas.html?villaid=YlangYlang`
- Rates are published statically on `/rates.html` (seasonal table + promotions), with a
  check-in/check-out date picker that hands off to the external engine.
- The property is **marketed and managed by The Elite Havens Group** (Private Homes &
  Villas is the associated booking brand).
- **No public real-time availability API is confirmed.** Do not assume one exists.

**Conclusion:** the real mechanism is **enquiry-based** with an external availability
system. This is the ground truth the build must respect.

## 2. Provider abstraction (design)
```
/lib/booking/
  types.ts              # Shared types: DateRange, GuestCount, Quote, EnquiryResult, Provider
  booking-provider.ts   # Interface every provider implements
  enquiry-provider.ts    # DEFAULT — deep-links to the external Elite Havens engine
  external-provider.ts   # Placeholder for a future real availability API (if EH exposes one)
  mock-provider.ts       # DEV ONLY — clearly labelled fake data for local demos
  index.ts              # Selects provider via env; defaults to enquiry-provider
```

### Interface (sketch)
```ts
interface BookingProvider {
  readonly kind: 'enquiry' | 'external' | 'mock'
  getRates(config: '6-bed' | '4-bed'): Promise<RateSeason[]>   // from /content/rates
  // enquiry provider does NOT claim availability; it builds a handoff URL
  buildEnquiryUrl(input: { checkIn?: string; checkOut?: string; guests?: number }): string
  // external/mock only:
  checkAvailability?(range: DateRange, guests: number): Promise<AvailabilityResult>
}
```

## 3. Rules (non-negotiable)
1. **Never present mock availability as real.** `mock-provider` is dev-only, gated behind
   `NEXT_PUBLIC_BOOKING_PROVIDER=mock`, and any UI it feeds shows a visible "Demo data"
   marker (brief §32).
2. Default production provider is `enquiry` — it shows real published rates and hands off
   to the real external engine for actual availability/booking.
3. Rates come from `/content/rates/rates.json` (verified from the live site) and are
   flagged time-sensitive; a launch checklist item re-verifies them.
4. The frontend (BookingWidget, sticky CTA, `/book` page, rate table) depends only on the
   `BookingProvider` interface — never on a concrete provider.

## 4. Booking UX surfaces (brief §20)
- Hero primary CTA → `/book` (or opens enquiry modal).
- Sticky desktop CTA + mobile sticky bottom bar: "Enquire".
- `/rates`: real seasonal table + promotions + date picker → enquiry handoff.
- `/book`: date range + guest count + message → builds enquiry URL / (future) real check.
- Confirmation state clearly explains this is an **enquiry**, and the Elite Havens team
  will confirm availability — no false "booked!" state.

## 5. Open items (client)
- Confirm whether Elite Havens exposes any bookable API (would enable `external-provider`).
- Confirm 4-bedroom rates.
- Confirm which promotions are live at launch.
- Provide the exact enquiry contact / email fallback for `/contact`.
