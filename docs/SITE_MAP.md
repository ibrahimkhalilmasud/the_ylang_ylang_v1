# SITE MAP — The Ylang Ylang (new build)

> Derived from the live site's information architecture (crawled 2026-08-21) plus luxury
> hospitality UX conventions. The live nav had 16 relevant pages + an external booking
> engine. The new IA consolidates fragmented sub-pages into fewer, deeper, editorial
> routes while preserving every piece of source content (traceable in `CONTENT_AUDIT.md`).

## Live site IA (as found)
```
/  (Home)
├─ About
│   ├─ /about-the-ylang-ylang.html
│   ├─ /about-the-ylang-ylang/explore-the-villa.html
│   ├─ /about-the-ylang-ylang/quick-facts.html
│   └─ (external) Elite Havens about
├─ Gallery
│   ├─ /photo-gallery.html
│   └─ /photo-gallery/floorplan.html
├─ Location  /ketewel-bali.html
├─ Experience
│   ├─ /staff.html
│   ├─ /dining.html
│   ├─ /families.html
│   ├─ /spa.html
│   └─ /elitehavens-concierge.html
├─ Weddings  /weddings.html
├─ Reviews
│   ├─ /guest-reviews.html
│   └─ /guest-reviews/press.html
├─ Rates  /rates.html
└─ Enquire  → booking.privatehomesandvillas.com (external)
```

## Proposed new IA
```
/                     Home — cinematic editorial overview + primary booking CTA
/villa                The villa: architecture, layout, living areas, pool, grounds
/rooms                The six bedrooms (masters, queens, juniors) + floorplan
/dining               Chef, menus, dining settings, provisioning policy
/wellness             Spa, yoga, meditation, healers, black-sand therapy
/experiences          Location + things-to-do + concierge (curated Bali)
/weddings             Events & weddings (capacities, guidelines)
/families             Family suitability & facilities
/gallery              Photography (+ floorplan asset)
/reviews              Guest reviews (94) + press
/rates                Rates, seasons, promotions, inclusions → booking
/book                 Enquiry/booking flow (external provider abstraction)
/contact              Contact + Elite Havens management
/privacy              Privacy policy
/terms                Terms & conditions
```

### Consolidation rationale
- **Experience** menu (staff/dining/families/spa/concierge) split into purpose-built
  routes: `/dining`, `/wellness`, `/experiences`, `/families`. **Staff** content folds
  into `/villa` (service section) since there are no verified individual bios.
- **Location + Things-to-do + Concierge** merge into `/experiences` — all answer "what
  will we do here?" Distances table retained on `/experiences` and `/contact`.
- **About/Explore/Quick-Facts** merge into `/villa` + `/rooms`; Quick Facts becomes a
  reusable "Quick Facts" fact-block component surfaced on Home and `/villa`.
- **Floorplan** lives inside `/rooms` (and `/gallery`), with the downloadable high-res
  asset preserved.
- **Booking** kept as a distinct `/book` route AND surfaced site-wide (sticky CTA),
  wrapping the external enquiry engine (see `BOOKING_ARCHITECTURE.md`).

### Routes deferred until assets/decisions land
- `/privacy`, `/terms` — need the client's real policy text (Elite Havens standard).
  Scaffolded as stubs, clearly marked, not fabricated.
- `/gallery` — needs the approved photo library (Phase 3 blocker).
