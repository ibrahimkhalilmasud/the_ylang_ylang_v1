// Media pipeline: turns raw assets in /asset into web-optimized derivatives in
// /public/media using ffmpeg (already on PATH). Idempotent — skips existing outputs.
//
//   node scripts/optimize-media.mjs
//
// Images  -> resized/compressed JPG (next/image then serves AVIF/WebP at runtime).
// Prefers AI-upscaled 4K masters in asset/images/4k-upscaled when present.
//
// This keeps the large originals out of the shipped bundle while preserving quality.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const IMG_SRC = join(root, 'asset', 'images')
const OUT_IMG = join(root, 'public', 'media', 'images')

mkdirSync(OUT_IMG, { recursive: true })

function ff(args) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' })
}

// slug -> output basename. Maps the real (sometimes messy) filenames to clean slugs.
const IMAGES = {
  'hero-villa-lawn': '028 The Ylang Ylang - view of villa from lawn.jpg',
  'pool-decks': '014 The Ylang Ylang - pool decks.jpg',
  'beach-deck-sunset': '005 The Ylang Ylang - sunset from beach deck.jpg',
  'beach-deck': '017 The Ylang Ylang - beach deck.jpg',
  'living-area': '003 The Ylang Ylang - living area.jpg',
  'facade': '004 The Ylang Ylang - queenly facade.jpg',
  'outdoor-layout': '006 The Ylang Ylang - outdoor layout (2).jpg',
  'master-suite': '007 The Ylang Ylang - master suite.jpg',
  'master-suite-night': '009 The Ylang Ylang - master suite at night.jpg',
  'master-turndown': '022 The Ylang Ylang - master suite at turndown.jpg',
  'sunken-bath': '008 The Ylang Ylang - sunken bathtub.jpg',
  'twin-poolside': '010 The Ylang Ylang - poolside twin room (2).jpg',
  'twin-guestroom': '023 The Ylang Ylang - twin guestroom.jpg',
  'media-room': '011 The Ylang Ylang - media room.jpg',
  'dining': '012 The Ylang Ylang - dining.jpg',
  'kitchen': '013 The Ylang Ylang - equipped kitchen.jpg',
  'entrance-sculpture': '1. Entrance sculpture .jpeg',
  'staff': 'staff.jpeg',
  'brand-keyart': '15.png',
}

// Prefer the AI-upscaled 4K master (asset/images/4k-upscaled/<slug>.png) when present,
// so the site's source JPGs carry real high-resolution detail. Falls back to the
// original photo otherwise. Output stays JPG at the SAME aspect ratio — only sharper.
const UPSCALED = join(IMG_SRC, '4k-upscaled')

console.log('→ images')
for (const [slug, file] of Object.entries(IMAGES)) {
  const upscaled = join(UPSCALED, `${slug}.png`)
  const src = existsSync(upscaled) ? upscaled : join(IMG_SRC, file)
  if (!existsSync(src)) { console.warn('  missing:', file); continue }
  const out = join(OUT_IMG, `${slug}.jpg`)
  // Cap long edge to 2560px (retina-grade); next/image downsizes responsively per slot.
  ff(['-i', src, '-vf', "scale='min(2560,iw)':-2", '-q:v', '3', out])
  console.log('  ✓', slug, existsSync(upscaled) ? '(4K master)' : '(original)')
}

// Hero is a still image (the AI-upscaled villa-lawn photo), not video — see Hero.tsx.
// No hero video is generated.

console.log('done.')
