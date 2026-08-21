# DESIGN DECISIONS — The Ylang Ylang (11ana)

> Log of significant decisions and their rationale (brief §11, §36). Append-only.

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Build in `E:\the_ylang_ylang_v1`, not the session's `D:\Ibrahim\Website` | The D: repo is an unrelated FIN RELAX spa project; E: is the empty repo whose name + GitHub remote match this project. Confirmed with user. |
| D2 | **Scope = research + scaffold only** for this pass | User directive. No photography/PDF/asset library present, so a full page-build would depend on placeholders and fabricated imagery — which the brief forbids. Research + architecture is the highest-value work that can be done honestly now. |
| D3 | Palette anchored in real materials ("golden and black", volcanic black sand) | The source explicitly states the interior's "golden and black theme"; using the property's real materials reads as authentic luxury, not generic gold-on-white. |
| D4 | Hero = single hero photo + restrained parallax (video/3D deferred) | No approved video asset exists; a heavy hero would risk the §22 performance targets for unverified benefit. |
| D5 | Three.js omitted for now; floorplan explorer (if built) will be lightweight SVG | Current assets don't justify WebGL; an accessible 2D interactive floorplan serves the one genuine spatial-exploration use case better. |
| D6 | Consolidate 16 live pages → ~15 deeper editorial routes; **Staff** folds into `/villa` | Staff page has no verified individual bios (names appear only in reviews). Merging avoids a thin/fabrication-prone page. See SITE_MAP.md. |
| D7 | Booking = provider abstraction wrapping the **external enquiry engine** | Live site uses `booking.privatehomesandvillas.com`; no confirmed real-time availability API. Never present mock availability as real. See BOOKING_ARCHITECTURE.md. |
| D8 | No numeric star rating anywhere; no review `aggregateRating` schema | The live site publishes 94 testimonials but **no** numeric rating; inventing one would violate §7/§24. |
| D9 | Staff names (Kadek, Dewa, etc.) used only inside verbatim review quotes | They are guest-reported, not official bios. Not presented as current-staff fact. |
| D10 | Stack = Next.js + TS + Tailwind + Framer Motion + Lenis; GSAP & R3F only if justified | Matches brief §25; avoids pulling in GSAP/Three unless a feature earns them. |
| D11 | Time-sensitive data (rates, promotions) flagged "re-verify before launch" in content | Rates/promos are dated 2026–2028 and will drift; content files carry explicit warnings. |
