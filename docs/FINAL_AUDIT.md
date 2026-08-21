# FINAL AUDIT — The Ylang Ylang (first complete prototype)

_Last updated: 2026-08-21_

## Build summary
First complete, navigable, visually-styled prototype built on Next.js (App Router) +
TypeScript + Tailwind + Framer Motion + Lenis. All imagery is **real property
photography** optimized from `asset/`. No stock, no AI villa imagery, no fabricated
facts, prices, reviews, or availability (brief §7/§27/§39).

## Pages delivered
| Route | Content |
|-------|---------|
| `/` | Cinematic hero (property video + poster), intro, quick facts, estate/ocean/rooms/table editorial sections, experience grid, service, reviews, closing CTA |
| `/villa` | Layout, indoor/outdoor living, theatre, service roster, quick facts |
| `/rooms` | All six suites (masters/queens/juniors) with per-room detail + features |
| `/dining` | Chef, settings, menus, provisioning policy |
| `/wellness` | Spa, yoga/meditation, healers, black-sand therapy |
| `/experiences` | Concierge + things-to-do + culture |
| `/weddings` | Capacities (20 incl. / 50 seated / 70 standing), setting, planning |
| `/location` | Locale, beach, river, distances table |
| `/gallery` | Filterable masonry gallery + keyboard-navigable lightbox |
| `/reviews` | Editorial review wall (verbatim, 94 total, no fake rating) |
| `/rates` | Real seasonal table + promotions |
| `/book` | Enquiry form (RHF+Zod) → real external handoff; no fake confirmation |
| `/contact` | Address, distances, management |
| `/privacy`, `/terms` | Honestly-marked placeholders (await client legal text) |
| `robots.ts`, `sitemap.ts`, `not-found.tsx` | SEO + 404 |

## Design decisions (this phase)
- Hero: single crisp still (villa-at-blue-hour poster = LCP) with muted looping property
  video layered over it; reduced-motion → still only. See DESIGN_DECISIONS D4.
- Palette anchored in the real "golden and black" interiors + volcanic black sand.
- Fonts: Cormorant Garamond (display) + Jost (sans) via next/font.
- Ambient audio: opt-in only, off by default, persisted, mute toggle (brief §23).
- Experience-led IA rather than a room catalogue (brief §11).
- New verified fact surfaced from assets: **Est. 2002** (brand key art).

## Verification checklist — completed 2026-08-21
- [x] `pnpm install` (Windows: `.npmrc` `node-linker=hoisted` avoids symlink EISDIR)
- [x] `pnpm dev` — visual pass: home hero (video), rooms, booking flow, mobile menu
- [x] `pnpm lint` — clean
- [x] `pnpm typecheck` — 0 errors
- [x] `pnpm build` — 20 routes static; home 145kB First Load JS
- [x] `pnpm test` — 6 unit tests pass (booking + content integrity, incl. "no fake rating")
- [x] `pnpm test:e2e` — 8 pass (home/rooms/book/rates × desktop + mobile)
- [ ] Lighthouse pass (targets: Perf 90+, A11y 95+, BP 95+, SEO 95+) — recommend running
      with `sharp` installed; not run in this environment.

## Booking verified end-to-end
The enquiry form builds the real external handoff URL and shows an honest "enquiry ready"
state — **no fake availability, no fake confirmation, no payment**. Verified URL:
`booking.privatehomesandvillas.com/availvillas.html?villaid=YlangYlang&checkin=…&checkout=…&guests=…`

## Known follow-ups / not-yet-done
- Playwright e2e requires a production server (`build && start`); browsers must be
  installed (`pnpm exec playwright install`).
- 4-bedroom rates, full 94-review list, press page, legal text: still pending from client.
- Interactive floorplan (brief §12/§24): deferred — no floorplan asset was delivered;
  the `15.png` is brand key art, not a plan. Design section works without it.
- Optional: further video moments beyond the hero; additional gallery categories once
  more tagged assets exist.
