# ASSET MANIFEST — The Ylang Ylang

> Per brief §8/§22. Inventory of the **real** property media delivered to `asset/`
> (note: directory is `asset/`, singular, with `images/ music/ video/`). Inspected
> 2026-08-21. **No `documents/` / PDF was delivered** — Phase 2 live-vs-PDF cross-check
> remains pending (see SOURCE_COMPARISON §0).
>
> All imagery below is genuine property photography and is the visual source of truth.
> No stock, no AI-generated villa imagery, no fictional facilities (brief §9/§39).

## New verified facts discovered in assets
- **Established 2002** — from the official brand key art (`15.png`: "EST. 2002").
- **Official logo:** "YY" monogram + "YLANG YLANG" wordmark, "BALI INDONESIA"
  (`15.png`). This is the brand lockup to carry through the site.

## Images — professional library (`asset/images/`, 2049px wide unless noted)
| File | Dim | Subject | Primary use | Hero? |
|------|-----|---------|-------------|-------|
| 028 …view of villa from lawn.jpg | 2049×1536 | Blue-hour hero: 2-storey pavilion, pool axis, symmetrical wings, sculpture | Home hero / Villa | ★★★ |
| 014 …pool decks.jpg | 2049×1536 | Pool → palms → ocean at sunset, champagne | Pool section / hero alt | ★★★ |
| 005 …sunset from beach deck.jpg | 2049×1153 | Beach deck sunbeds, black-sand coast, sunset | Beach/Location hero | ★★★ |
| 003 …living area.jpg | 2049×1153 | Double-height living pavilion, gold daybeds, staircases | Villa / living | ★★ |
| 004 …queenly facade.jpg | 2049×1536 | Villa facade | Villa | ★★ |
| 006 …outdoor layout (2).jpg | 2049×1536 | Outdoor/garden layout | Villa / estate | ★★ |
| 007 …master suite.jpg | 2049×1153 | Master suite, four-poster, gold drapes, courtyard bath | Rooms (master) | ★★ |
| 008 …sunken bathtub.jpg | 2049×1153 | Sunken bath | Rooms (master detail) | |
| 009 …master suite at night.jpg | 2049×1153 | Master suite, night | Rooms (master) | |
| 022 …master suite at turndown.jpg | 2049×1153 | Master suite turndown | Rooms / service | |
| 010 …poolside twin room (2).jpg | 2049×1536 | Poolside twin room | Rooms (junior/twin) | |
| 023 …twin guestroom.jpg | 2049×1153 | Twin guestroom | Rooms (junior/twin) | |
| 011 …media room.jpg | 2049×1153 | Home theatre / media room | Villa (theatre) | |
| 012 …dining.jpg | 2049×1153 | Dining setting | Dining | ★★ |
| 013 …equipped kitchen.jpg | 2049×1153 | Kitchen | Dining / villa | |
| 017 …beach deck.jpg | 2049×1153 | Beach deck | Location / beach | |
| 1. Entrance sculpture .jpeg | 1280×853 | Entrance sculpture / arrival | Villa (arrival) | |
| staff.jpeg | 1280×960 | Staff / service | Service section | |
| 15.png | 3600×4800 | **Brand key art** (logo lockup over facade) | Brand / OG image / loader | |

### Secondary numbered jpegs (1–8.jpeg, 3–8) — smaller alternates
`1.jpeg`(800×336) `2.jpeg`(800×533) `3.jpeg`(1280×855) `4.jpeg`(1280×861)
`5.jpeg`(1000×665) `6.jpeg`(1280×853) `7.jpeg`(1000×665) `8.jpeg`(1280×713) —
lower-res alternates/detail shots; use as gallery fill / texture only where the named
library doesn't cover a slot. Treat named `003–028` set as primary.

## Video (`asset/video/`) — all 1280×720 H.264
| File | Duration | Use |
|------|----------|-----|
| Part 1.mp4 | 15.0s | Hero montage segment |
| Part 2.mp4 | 15.0s | Hero montage segment |
| Part 4.mp4 | 15.0s | Hero montage / experiences |
| Part 5.mp4 | 15.0s | Hero montage / experiences |
| Part 3.1/3.2/3.3.mp4 | 5.0s each | Short cinematic cuts (section accents) |
| Part 6.mp4 | 5.0s | Short cinematic cut |

**Strategy:** Use ONE optimised looping clip as the hero video (muted, autoplay,
`playsinline`, poster = 028) with an image fallback; reserve others for a single
"film" moment lower on the page. All 720p — do not upscale; cap display size and lean on
the poster image for the crisp first paint (LCP). Re-encode to web MP4/WebM + poster.

## Music (`asset/music/`)
| File | Use |
|------|-----|
| Blood And Stone - Audiomachine.mp3 | Ambient toggle candidate (cinematic, calm-building) |
| Solo - Toby Tech.mp3 | Alt ambient |
| Codebreaker - Brand X Music.mp3 | Alt |
| Audiomachine - The Last Ember_114_234.mp4 | Audio in mp4 container |

> ⚠️ These are commercially-titled tracks (Audiomachine, Brand X Music, Toby Tech) —
> **licensing must be confirmed by the client before public launch.** For the demo,
> ambient audio is **off by default**, opt-in only, with a mute toggle whose preference
> persists (brief §23). Never autoplay with sound.

## Pipeline
- Optimised web derivatives are generated into `public/media/` (AVIF/WebP for images via
  next/image at build; re-encoded hero video + poster). Originals in `asset/` are the
  archive and are git-ignored from the web bundle if large. Alt text per row above feeds
  accessibility (brief §34).
