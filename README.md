# The Ylang Ylang — 11ana

Digital guest experience rebuild for **The Ylang Ylang**, a six-bedroom absolute-beachfront
luxury villa in Saba / Ketewel, Bali (marketed by The Elite Havens Group).

> **Project stage: First complete prototype.** A full, navigable Next.js site is built
> using the real property photography and video. All facts, prices and reviews are verified
> from source — nothing is fabricated. See `docs/FINAL_AUDIT.md` and `docs/PROJECT_STATUS.md`.

## Run it

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Other scripts: `pnpm build && pnpm start` · `pnpm lint` · `pnpm typecheck` · `pnpm test`
(unit) · `pnpm test:e2e` (Playwright). Regenerate optimized media from `asset/` with
`node scripts/optimize-media.mjs`.

> **Windows note:** `.npmrc` sets `node-linker=hoisted` so pnpm avoids symlink-permission
> errors. For faster production image optimization, optionally `pnpm i sharp`.

## Stack
Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Lenis · React Hook Form
+ Zod. Self-hosted fonts (Cormorant Garamond + Jost). Content lives in `/content` (JSON),
kept separate from presentation. Booking uses a provider abstraction in `/lib/booking`
that defaults to the real external enquiry engine.

## Pages
Home · Villa · Rooms · Dining · Wellness · Experiences · Celebrations · Location · Gallery
· Reviews · Rates · Book (enquiry) · Contact · Privacy/Terms.

## What's here now
```
content/    Verified content layer (JSON) extracted from the live site — the single
            source of copy & facts. Nothing is invented; see docs/FACTS_DATABASE.md.
docs/       Research & architecture:
            ├─ FACTS_DATABASE.md        verified facts, with source + status per fact
            ├─ CONTENT_AUDIT.md         every source block → destination + decision
            ├─ CONTENT_INVENTORY.md     where each page's content now lives
            ├─ SOURCE_COMPARISON.md     intra-site discrepancies + missing-PDF finding
            ├─ SITE_MAP.md              proposed information architecture
            ├─ DESIGN_DIRECTION.md      palette, type, motion, hero & 3D decisions
            ├─ DESIGN_DECISIONS.md      decision log with rationale
            ├─ COMPETITIVE_RESEARCH.md  luxury-villa web patterns adopted/rejected
            ├─ TECHNICAL_ARCHITECTURE.md stack, rendering, SEO, a11y strategy
            ├─ BOOKING_ARCHITECTURE.md  real (enquiry-based) booking abstraction
            ├─ ASSET_MANIFEST.md        real media inventory + alt text
            ├─ FINAL_AUDIT.md           build summary + verification results
            └─ PROJECT_STATUS.md        phase tracker + open items
app/         Next.js routes (see Pages above).
components/   UI system (Hero, EditorialSection, Gallery, BookingForm, nav, …).
lib/         media registry, nav, booking provider abstraction.
asset/       Raw delivered media (source of truth); optimized into public/media.
public/media/ Web-optimized images, hero video, ambient audio, fonts.
```

## Open items (need client input)
1. **PDF/brochure/export** — not delivered; Phase 2 live-vs-PDF comparison pending.
2. **4-bedroom rates, full 94-review list, press, and legal (privacy/terms) text** — pending.
3. **Music licensing** — delivered tracks are commercially titled; confirm rights before
   public launch (ambient audio is opt-in / off by default meanwhile).

## Data accuracy
All facts trace to the live site (`https://www.theylangylang.com/`, crawled 2026-08-21)
with per-fact verification status in `docs/FACTS_DATABASE.md`. Time-sensitive data (rates,
promotions) is flagged for re-verification before any public launch.
