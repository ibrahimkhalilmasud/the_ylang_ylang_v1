# PROJECT STATUS — The Ylang Ylang (11ana)

_Last updated: 2026-08-21 (prototype build)_

## Phase tracker
| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Repository inspection | ✅ Done. |
| 1 | Live website research (crawl all pages) | ✅ Done — 11 content pages crawled; nav + booking engine mapped. |
| 2 | PDF / document research | ⛔ Still blocked — **no `documents/` / PDF delivered**. Logged in SOURCE_COMPARISON §0. |
| 3 | Asset research | ✅ Done — **real media delivered**: 27 images, 8 videos, 4 music. Inspected + optimized into `public/media`. ASSET_MANIFEST updated. |
| 4 | Content architecture | ✅ Done. |
| 5 | Design research | ✅ Done. |
| 6 | Information architecture | ✅ Done. |
| 7 | Technical architecture | ✅ Done + implemented (Next.js app). |
| 8 | **Build the website** | ✅ **Done — first complete prototype built (15 routes).** |
| 9 | Responsive optimization | ✅ Mobile/tablet/desktop verified; mobile nav + sticky reserve; e2e on both. |
| 10 | Performance | ✅ Static export, optimized media, local fonts, hero LCP poster. `sharp` recommended for prod (not installed — WASM fallback works). |
| 11 | Accessibility | ✅ Semantic HTML, skip link, focus rings, alt text, reduced-motion, keyboard gallery/menu/form. Full audit pending. |
| 12 | SEO | ✅ Metadata, OG, canonical, robots, sitemap, JSON-LD (no fake rating). |
| 13 | Testing | ✅ typecheck / lint / unit (6) / build / e2e (8, desktop+mobile) all pass. |

## Verification (run on this machine, 2026-08-21)
- ✅ `pnpm typecheck` — 0 errors
- ✅ `pnpm lint` — clean
- ✅ `pnpm test` — 6 unit tests pass (booking + content integrity)
- ✅ `pnpm build` — succeeds; 20 routes prerendered static; home 145kB First Load JS
- ✅ `pnpm test:e2e` — 8 pass (home/rooms/book/rates × desktop + mobile)
- ✅ Manual visual pass — home hero (video), rooms, book (enquiry→real handoff), mobile menu

## What was decided this session
- Correct home for the project is `E:\the_ylang_ylang_v1` (not the session's D: repo).
- Scope this pass: **research + scaffold only** (user directive).
- Full research completed against the live site; verified content + facts captured with
  sources and discrepancy notes; architecture, design direction, and booking abstraction
  documented; booking provider stubs written.

## Blockers / open items (need client / user)
1. **PDF/brochure/export** (Phase 2 cross-check) — still not delivered.
2. Missing content: 4-bedroom rates, full 94-review list, press page, privacy/terms legal text.
3. Confirmation of live promotions & official staff roster at launch time.
4. Whether Elite Havens exposes any bookable availability API (enables `external-provider`).
5. **Music licensing** — the delivered tracks are commercially-titled (Audiomachine, etc.);
   confirm rights before public launch (ambient audio is opt-in/off-by-default meanwhile).

## Recommended next steps
1. Client provides the PDF and the outstanding content (4-bed rates, full reviews, press, legal).
2. `pnpm i sharp` for faster production image optimization; run a Lighthouse pass.
3. Consider an interactive floorplan once a real floorplan asset is supplied (not delivered;
   `15.png` is brand key art, not a plan).
4. Re-verify all time-sensitive rates/promotions immediately before any public launch.
5. Full WCAG AA audit + Lighthouse to confirm the 90+/95+ targets.

## How to run
```
pnpm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm lint / typecheck / test / test:e2e
node scripts/optimize-media.mjs   # regenerate optimized media from asset/
```
Windows note: `.npmrc` sets `node-linker=hoisted` to avoid pnpm symlink errors.

## Deployment (2026-08-21)
- **GitHub:** https://github.com/ibrahimkhalilmasud/the_ylang_ylang_v1 (public, branch `main`)
- **Live site (share with client):** https://theylangylangv1.vercel.app
- **Host:** Vercel (team "Arpon's projects", hobby plan), project `the_ylang_ylang_v1`,
  auto-deploys on every push to `main`. Framework auto-detected (Next.js). Public — no
  login required to view. Build: pnpm install + next build, ~34s, 20 static routes.
