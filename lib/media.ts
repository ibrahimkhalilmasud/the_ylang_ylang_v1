// Typed registry of optimized property media (generated into /public/media by
// scripts/optimize-media.mjs). Alt text is authored, meaningful, and factual — it is the
// accessibility source of truth (brief §34) and must describe the real property.

export interface MediaImage {
  src: string
  alt: string
  w: number
  h: number
  /** Gallery categories this image belongs to. */
  tags: GalleryCategory[]
}

export type GalleryCategory =
  | 'villa' | 'rooms' | 'pool' | 'beach' | 'dining' | 'wellness' | 'experiences'

const I = (slug: string, w: number, h: number, alt: string, tags: GalleryCategory[]): MediaImage => ({
  src: `/media/images/${slug}.jpg`,
  alt,
  w,
  h,
  tags,
})

export const IMAGES = {
  heroVillaLawn: I('hero-villa-lawn', 2000, 1500,
    'The Ylang Ylang at blue hour — the two-storey pavilion glowing behind its 16-metre pool, framed by frangipani trees and a stone sculpture on the lawn', ['villa']),
  poolDecks: I('pool-decks', 2000, 1500,
    'The 16-metre pool at sunset, water fountains flowing toward the black-sand beach and ocean beyond, flanked by sunbeds and parasols', ['pool', 'beach']),
  beachDeckSunset: I('beach-deck-sunset', 2000, 1126,
    'Sunbeds on the beachfront stone deck at sunset, coconut palms overhead and the black-sand coastline stretching to the horizon', ['beach', 'pool']),
  beachDeck: I('beach-deck', 2000, 1126,
    'The timbered beach deck at the garden’s edge, overlooking Saba’s volcanic black-sand beach', ['beach']),
  livingArea: I('living-area', 2000, 1126,
    'The double-height living pavilion with its soaring vaulted ceiling, gold silk daybeds and twin lacquered staircases opening to the gardens', ['villa']),
  facade: I('facade', 2000, 1500,
    'The villa’s elegant facade with contemporary Asian architecture and traditional Balinese detailing', ['villa']),
  outdoorLayout: I('outdoor-layout', 2000, 1500,
    'The estate’s outdoor layout — manicured lawns, pool and garden pavilions leading to the beach', ['villa', 'pool']),
  masterSuite: I('master-suite', 2000, 1126,
    'A master suite with a king four-poster bed draped in gold organza, opening to a private courtyard with a Balinese water statue and sunken bath', ['rooms']),
  masterSuiteNight: I('master-suite-night', 2000, 1126,
    'A master suite at night, warm lighting on the four-poster bed and silk furnishings', ['rooms']),
  masterTurndown: I('master-turndown', 2000, 1126,
    'A master suite prepared for turndown, an example of the villa’s attentive personal service', ['rooms']),
  sunkenBath: I('sunken-bath', 2000, 1126,
    'A generous sunken bathtub in a master suite bathroom, lit by a conservatory-style glass roof', ['rooms']),
  twinPoolside: I('twin-poolside', 2000, 1500,
    'A poolside twin guest room with garden outlook', ['rooms']),
  twinGuestroom: I('twin-guestroom', 2000, 1126,
    'A twin guest room, softly lit, suited to children or friends travelling together', ['rooms']),
  mediaRoom: I('media-room', 2000, 1126,
    'The air-conditioned home theatre — a wall projection screen and a large sofa bed for the whole family', ['villa']),
  dining: I('dining', 2000, 1126,
    'An exquisitely set dining table for a private three-course dinner prepared by the resident chef', ['dining']),
  kitchen: I('kitchen', 2000, 1126,
    'The villa’s fully equipped kitchen where the resident chef prepares gourmet meals', ['dining']),
  entranceSculpture: I('entrance-sculpture', 1280, 853,
    'A stone sculpture at the villa’s entrance, part of the art-filled arrival sequence', ['villa']),
  staff: I('staff', 1280, 960,
    'Members of The Ylang Ylang’s dedicated staff, who provide warm Balinese hospitality', ['experiences']),
} satisfies Record<string, MediaImage>

export const BRAND_KEYART = '/media/images/brand-keyart.jpg'

export const HERO_VIDEO = {
  mp4: '/media/video/hero.mp4',
  webm: '/media/video/hero.webm',
  poster: '/media/video/hero-poster.jpg',
}

export const AMBIENT_AUDIO = '/media/audio/ambient.mp3'

// Flat list for the gallery grid.
export const ALL_IMAGES: MediaImage[] = Object.values(IMAGES)
