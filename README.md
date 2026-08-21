# The Ylang Ylang — 11ana

Digital guest experience rebuild for **The Ylang Ylang**, a six-bedroom absolute-beachfront
luxury villa in Saba / Ketewel, Bali (marketed by The Elite Havens Group).

> **Project stage: Research + Scaffold.** This repository currently contains the property
> research, a verified facts/content layer, the architecture & design direction, and a
> booking-provider abstraction. The Next.js application shell and page build have **not**
> yet been implemented — see `docs/PROJECT_STATUS.md` for what's done, what's blocked, and
> what's next.

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
            ├─ ASSET_MANIFEST.md        media inventory (⛔ no assets delivered yet)
            └─ PROJECT_STATUS.md        phase tracker + blockers
lib/booking/ Provider-agnostic booking abstraction (enquiry provider is the default).
public/     Image slots (real property photography pending; placeholders only).
```

## Known blockers (need client input)
1. **Approved photography / media library** — none delivered. The brief forbids
   fabricating villa imagery, so pages cannot be honestly built until real assets arrive.
2. **Client PDF/brochure/export** — none present; Phase 2 live-vs-PDF comparison is pending.
3. **4-bedroom rates, full review list, press, and legal (privacy/terms) text** — not yet captured.

## Getting started (once the app shell is added)
The intended stack is Next.js + TypeScript + Tailwind + Framer Motion + Lenis (see
`docs/TECHNICAL_ARCHITECTURE.md`). When scaffolded, the run commands will be:

```bash
pnpm install
pnpm dev
```

Until then this repo is research + content + architecture only.

## Data accuracy
All facts trace to the live site (`https://www.theylangylang.com/`, crawled 2026-08-21)
with per-fact verification status in `docs/FACTS_DATABASE.md`. Time-sensitive data (rates,
promotions) is flagged for re-verification before any public launch.
