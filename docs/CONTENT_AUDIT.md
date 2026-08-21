# CONTENT AUDIT — The Ylang Ylang

> Every significant content block from the live site (crawled **2026-08-21**), with its
> source, category, destination in the new IA, and preservation decision. Purpose:
> guarantee **no source content is silently lost**. Original wording for facts lives in
> `FACTS_DATABASE.md`; long-form prose is preserved in the `/content/*` layer.
>
> **Decision key:** `verbatim` = kept word-for-word · `rewritten` = re-expressed, facts
> unchanged (original retained here) · `merged` = combined with another block ·
> `dropped` = intentionally removed (reason given).

| # | Source page | Content block | Category | Destination | Decision |
|---|-------------|---------------|----------|-------------|----------|
| 1 | Home | "Absolute beachfront / Private, Luxurious and Indulgent" + hero intro para | Brand/hero | `/` hero | rewritten (facts kept) |
| 2 | Home | "5-Star Service — Our Staff is exceptional" | Service | `/` + `/villa` | merged |
| 3 | Home | "Absolute beachfront… Saba… Ketewel… Gianyar" | Location | `/` + `/experiences` | verbatim-fact |
| 4 | Home | "Delicious Dining — Prepared especially for you" | Dining | `/dining` | merged |
| 5 | Home | Guest Reviews (94), dated testimonials | Reviews | `/reviews` | verbatim |
| 6 | About/Explore | Villa Layout (grand entrance, courtyard, 2-storey pavilion) | Villa | `/villa` | verbatim-prose |
| 7 | About/Explore | Living areas — indoor (atrium, dining 12–14, theatre, gallery) | Villa | `/villa` | verbatim-prose |
| 8 | About/Explore | Living areas — outdoor (16m pool, gardens, balés, sun deck) | Villa | `/villa` | verbatim-prose |
| 9 | About/Explore | Bedrooms — master suites | Rooms | `/rooms` | verbatim-prose |
| 10 | About/Explore | Bedrooms — queen rooms | Rooms | `/rooms` | verbatim-prose |
| 11 | About/Explore | Bedrooms — junior rooms | Rooms | `/rooms` | verbatim-prose |
| 12 | Quick Facts | Full spec block (capacity, pool, staff, area, transport, etc.) | Facts | `/villa` + Home fact-block | verbatim-fact |
| 13 | Dining | Chef, menus, provisioning, +20%++ policy | Dining | `/dining` | verbatim-prose |
| 14 | Staff | Role descriptions (manager, chef, gardener, etc.) | Service | `/villa` service section | rewritten |
| 15 | Spa | Spa menu, yoga/meditation, healers, black-sand | Wellness | `/wellness` | verbatim-prose |
| 16 | Location | The locale (Saba, black sand, Nusa Penida, Peanut River) | Location | `/experiences` | verbatim-prose |
| 17 | Location | Distances table (8 destinations) | Location | `/experiences`, `/contact` | verbatim-fact |
| 18 | Location | Things to do (stables, Sanur, Ubud, diving, festivals…) | Experiences | `/experiences` | verbatim-prose |
| 19 | Concierge | Concierge services (tours, adventure, in-villa) | Experiences | `/experiences` | merged |
| 20 | Families | Family suitability, babysitters, hire items | Families | `/families` | verbatim-prose |
| 21 | Weddings | Event capacities, 20-guest inclusion, guidelines links | Weddings | `/weddings` | verbatim-fact |
| 22 | Rates | Season table (6-bed), promotions, discounts, inclusions | Rates | `/rates` | verbatim-fact |
| 23 | Rates | 4-bedroom rate tab | Rates | `/rates` | ❓ not captured — TODO |
| 24 | Floorplan | Floorplan image + high-res download | Rooms/Gallery | `/rooms`, `/gallery` | asset-pending |
| 25 | Press | Press/media mentions | Reviews | `/reviews` (press tab) | ❓ not captured — TODO |
| 26 | Nav | "About Elite Havens" (external) | Management | `/contact` | verbatim-link |
| 27 | Global | Enquire → external booking engine | Booking | `/book` | preserved (external) |

## Intentionally dropped
- None yet. No source block has been dropped. Redundant restatements of the
  "personalised service" paragraph (identical text appears on Staff and Spa pages) will
  appear **once** in the built site; the duplication is noted here rather than repeated.

## Not yet captured (re-crawl / client TODO)
- `/rates` 4-bedroom pricing (row 23)
- `/guest-reviews/press.html` full press list (row 25)
- `/photo-gallery/floorplan.html` — the floorplan image itself (asset, row 24)
- `/privacy`, `/terms` full legal text (were not in main nav crawl)
- The full 94-review list beyond the ~90 captured on the Home reviews feed.
