# DESIGN DIRECTION — The Ylang Ylang (11ana)

> The visual and experiential language for the rebuild. Derived from the property itself
> (crawled 2026-08-21), its price positioning (~USD 1,000–1,900/night), and luxury
> hospitality conventions. Design authority exercised per brief §10–11.

## 1. What the property *is* — and what the design must say
Absolute beachfront, six-bedroom private estate on **black volcanic sand** in a quiet
Balinese village. Contemporary Asian architecture fused with traditional Balinese craft.
Signature interior palette is stated on the source as **"golden and black."** Mantra:
**"Passionate Serenity."** The design must feel *calm, private, and quietly opulent* —
never loud. This is a place you have entirely to yourself.

## 2. Design principles
1. **Photography leads, type follows.** The villa's imagery is the product. Layouts are
   frames for full-bleed photography; type is editorial and restrained.
2. **Passionate Serenity as a motion principle.** Slow, eased, intentional motion —
   nothing bouncy or "AI-website." Generous negative space and stillness between moments.
3. **Editorial, not brochure.** Long-form storytelling (the source prose is genuinely
   good) presented as a magazine spread, not a bulleted feature list.
4. **Black-sand-and-gold, honestly.** Anchor the palette in the property's real materials
   rather than a generic "luxury" gold-on-white.
5. **Booking always within reach, never nagging.** One clear, elegant path to enquire.

## 3. Palette (proposed tokens)
| Token | Value | Role |
|-------|-------|------|
| `--sand-black` | #14110E | Primary dark ground (volcanic sand / lacquered wood) |
| `--ink` | #1F1B16 | Body text on light |
| `--bone` | #F4EFE7 | Warm off-white ground |
| `--gold` | #B8975A | Signature accent (the "golden" theme) — used sparingly |
| `--gold-deep` | #8A6F3F | Hover / borders |
| `--stone` | #9A9186 | Muted secondary text |
| `--sea` | #35463F | Deep foliage/sea green for occasional depth |

Dark-first sections (hero, dining, wellness) on `--sand-black`; editorial body on
`--bone`. Gold reserved for CTAs, rules, and small emphasis — restraint is the point.

## 4. Typography
- **Display / headings:** a high-contrast transitional or didone serif (e.g. *Cormorant
  Garamond* or *Playfair Display* via Google Fonts) — editorial, elegant, luxurious.
- **Body:** a clean humanist sans (e.g. *Inter* / *Instrument Sans*) for readability.
- **Detail/eyebrow:** wide letter-spaced small-caps sans for section labels.
- Large type scale; long measure for prose; ample line-height. WCAG AA contrast enforced.

## 5. Motion (per brief §27)
- Lenis smooth scroll; GSAP/Framer for reveal-on-scroll (fade + slight rise, ~600–800ms,
  soft ease). Subtle parallax on hero and full-bleed images **only**.
- Image galleries: cross-fade, not carousel-slam. Lightbox with keyboard nav.
- **Everything degrades gracefully with `prefers-reduced-motion`.** Content never waits
  on animation to become readable.
- **No** scroll-jacking, particles, or constant parallax.

## 6. Hero decision (brief §14)
Chosen: **Option C/D hybrid — a single exceptional hero photograph (pool → beach → sea)
with restrained parallax + a slow Ken-Burns drift, optionally upgraded to a short muted
looping clip if real video is supplied.** Rationale: no approved video/asset library is
available yet; a heavy video or 3D hero would risk performance (brief §22) for no
verified benefit. The hero must instantly read *beachfront + private + serene* and
present one obvious "Enquire / Check dates" action. Placeholder used until real
photography lands.

## 7. 3D decision (brief §15)
**Deferred / likely omitted.** The one candidate with real value is an interactive
**floorplan / villa-layout explorer** (the source provides a downloadable floorplan and
a clear spatial layout: two wings flanking a pool, two-storey pavilion). If pursued, it
will be a lightweight 2D interactive floorplan (SVG hotspots) rather than WebGL — faster,
accessible, mobile-friendly. Full Three.js is not justified by current assets.

## 8. Responsive intent (brief §21)
Mobile is a distinct design, not a shrink: single-column editorial, sticky bottom
"Enquire" bar, tap-friendly galleries. TV/4K: larger type, wider max-measure, generous
imagery. Fluid type via `clamp()`.
