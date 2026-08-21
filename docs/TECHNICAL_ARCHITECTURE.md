# TECHNICAL ARCHITECTURE — The Ylang Ylang (11ana)

> Per brief §7 (Phase 7) and §25. Choices favour the §22 performance targets and the
> §7/§18 content-preservation + content/presentation separation.

## Stack
| Concern | Choice | Why |
|---------|--------|-----|
| Framework | **Next.js (App Router) + React + TypeScript** | SSG/ISR for a content site; image optimisation; SEO; brief-preferred. |
| Styling | **Tailwind CSS** + design-token layer | Fast, consistent; tokens from DESIGN_DIRECTION. |
| Motion | **Framer Motion** + **Lenis** | Reveal animations + smooth scroll. GSAP added only if a specific effect needs it. |
| 3D | **None initially** (see D5). Optional lightweight SVG floorplan. | Assets don't justify WebGL. |
| Forms | **React Hook Form + Zod** | Enquiry form validation, type-safe. |
| Content | **Local `/content/*.json` layer** | Content separated from JSX (brief §18); every fact traceable to source. |
| Images | **next/image**, AVIF/WebP, responsive `sizes` | Performance (§22). Placeholders until real library lands. |
| Testing | **Vitest** (unit) + **Playwright** (e2e) | Brief §25/§13. |
| Quality | ESLint + Prettier + `tsc --noEmit` | Brief §13. |
| PM | **pnpm** | Brief-preferred. |

## Rendering strategy
- **Static generation** for all content pages (villa, rooms, dining, wellness,
  experiences, weddings, families, reviews, rates, legal). Content is editorial and
  changes rarely → SSG with optional ISR for rates.
- Rates page reads `/content/rates/rates.json` at build; a future `external-provider`
  could switch it to ISR/runtime for live availability.

## Content strategy
- All copy lives in `/content/**`. Components import typed content; **no long-form copy
  hard-coded in JSX** (brief §18). Verbatim source prose is preserved in the JSON so the
  content-preservation guarantee (brief §6) holds at the data layer.

## Image strategy
- `public/images/<section>/…` with `next/image`. Until the approved photo library is
  delivered, `public/images/placeholders/` holds clearly-labelled neutral placeholders.
  **No AI-generated villa imagery** and **no stock substituted for real property views**
  (brief §9). A manifest (`ASSET_MANIFEST.md`) tracks every real asset when it arrives.

## SEO strategy (brief §24)
- Per-page metadata + canonical; `sitemap.xml`; `robots.txt`; Open Graph/Twitter.
- JSON-LD: `LodgingBusiness` / `Resort`-style schema with **verified** facts only
  (location, geo, amenities, priceRange). **No `aggregateRating`** (no numeric rating
  exists — D8). Breadcrumb schema on deep pages.

## Accessibility strategy (brief §23)
- Semantic HTML, skip links, visible focus, keyboard-navigable galleries/lightbox and
  booking form, alt text sourced from ASSET_MANIFEST, AA contrast enforced by tokens,
  `prefers-reduced-motion` honoured everywhere.

## Analytics
- Privacy-respecting analytics (e.g. Plausible/Vercel Analytics) — deferred; no PII in
  URLs (safety rule). To be confirmed with client.

## Proposed structure
```
app/            # routes per SITE_MAP.md
components/      # LuxuryHeader, CinematicHero, EditorialSection, FullBleedImage,
                #   Gallery, Lightbox, RoomExplorer, Floorplan, ReviewWall,
                #   BookingWidget, StickyEnquire, Footer, QuickFacts
content/        # JSON content layer (DONE — populated from live site)
lib/booking/    # provider abstraction (BOOKING_ARCHITECTURE.md)
lib/seo/        # metadata + JSON-LD helpers
public/images/  # real assets (pending) + placeholders
docs/           # research + architecture (this folder)
```

## Status
Scaffold + content layer + docs are in place. Framework install
(`package.json`, Next/Tailwind config, `app/` routes) is the next build step — gated on
the user's go-ahead to proceed past "research + scaffold," and ideally on the asset
library so pages aren't built around placeholders.
