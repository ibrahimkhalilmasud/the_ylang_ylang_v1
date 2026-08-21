# CONTENT INVENTORY — The Ylang Ylang

> Machine-facing companion to `CONTENT_AUDIT.md`: where each captured source page now
> lives in the repo's content layer. Confirms nothing was lost between crawl and storage.

| Source page (live) | Captured | Stored in repo | Notes |
|--------------------|----------|----------------|-------|
| Home (`/`) | ✅ | facts.json, reviews.json, dining.json | Hero, service, reviews feed. |
| Explore the Villa | ✅ | `content/villa/villa.json` | Layout, indoor, outdoor prose (verbatim). |
| Quick Facts | ✅ | `content/villa/facts.json` + FACTS_DATABASE | All specs. |
| Bedrooms (in Explore) | ✅ | `content/rooms/rooms.json` | Masters/queens/juniors. |
| Dining | ✅ | `content/dining/dining.json` | Chef, menus, provisioning. |
| Staff | ✅ | `content/villa/villa.json` (service) | Roster; no individual bios. |
| Spa | ✅ | `content/wellness/wellness.json` | Spa, yoga, healers, black sand. |
| Families | ✅ | `content/families/families.json` | Full prose. |
| Concierge | ✅ | `content/location/location.json` (concierge) | Merged into experiences. |
| Location | ✅ | `content/location/location.json` | Locale, beach, river, distances, things-to-do. |
| Weddings | ✅ | `content/weddings/weddings.json` | Capacities + inclusion. |
| Rates | ✅ (6-bed) | `content/rates/rates.json` | 4-bed pricing NOT captured. |
| Reviews | ⚠️ partial | `content/reviews/reviews.json` | ~90 of 94 on home feed; representative sample stored; full list TODO from `/guest-reviews.html`. |
| Press | ❌ | — | `/guest-reviews/press.html` not captured — TODO. |
| Floorplan | ❌ (asset) | — | Image asset pending (ASSET_MANIFEST). |
| Privacy / Terms | ❌ | — | Legal text not captured; need client's real policy. |

## Outstanding capture tasks
- [ ] 4-bedroom rate figures (`/rates.html`, 4-BEDROOM tab)
- [ ] Full 94-review list (`/guest-reviews.html`)
- [ ] Press mentions (`/guest-reviews/press.html`)
- [ ] Floorplan image + high-res download
- [ ] Privacy & Terms text
- [ ] Client PDF/brochure for Phase 2 cross-check
