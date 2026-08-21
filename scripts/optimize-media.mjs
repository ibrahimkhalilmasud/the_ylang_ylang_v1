// Media pipeline: turns raw assets in /asset into web-optimized derivatives in
// /public/media using ffmpeg (already on PATH). Idempotent — skips existing outputs.
//
//   node scripts/optimize-media.mjs
//
// Images  -> resized/compressed JPG (next/image then serves AVIF/WebP at runtime)
// Hero video -> web MP4 (H.264) + WebM (VP9) + poster JPG, capped at 1280w, muted
//
// This keeps the 16MB+ originals out of the shipped bundle while preserving quality.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const IMG_SRC = join(root, 'asset', 'images')
const VID_SRC = join(root, 'asset', 'video')
const OUT_IMG = join(root, 'public', 'media', 'images')
const OUT_VID = join(root, 'public', 'media', 'video')

for (const d of [OUT_IMG, OUT_VID]) mkdirSync(d, { recursive: true })

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

console.log('→ images')
for (const [slug, file] of Object.entries(IMAGES)) {
  const src = join(IMG_SRC, file)
  if (!existsSync(src)) { console.warn('  missing:', file); continue }
  const out = join(OUT_IMG, `${slug}.jpg`)
  if (existsSync(out)) continue
  // Cap long edge to 2000px, mild compression. next/image handles responsive sizing.
  ff(['-i', src, '-vf', "scale='min(2000,iw)':-2", '-q:v', '4', out])
  console.log('  ✓', slug)
}

// Hero video: use Part 1 (15s cinematic). Cap to 1280w, strip audio, web-optimize.
console.log('→ hero video')
const heroSrc = join(VID_SRC, 'Part 1.mp4')
const mp4 = join(OUT_VID, 'hero.mp4')
const webm = join(OUT_VID, 'hero.webm')
const poster = join(OUT_VID, 'hero-poster.jpg')
if (existsSync(heroSrc)) {
  if (!existsSync(mp4)) {
    ff(['-i', heroSrc, '-an', '-vf', "scale='min(1280,iw)':-2",
        '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', '-crf', '26', mp4])
    console.log('  ✓ hero.mp4')
  }
  if (!existsSync(webm)) {
    ff(['-i', heroSrc, '-an', '-vf', "scale='min(1280,iw)':-2",
        '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', webm])
    console.log('  ✓ hero.webm')
  }
  if (!existsSync(poster)) {
    // Poster = the villa-lawn hero still for a crisp LCP (not a blurry video frame).
    const posterSrc = join(OUT_IMG, 'hero-villa-lawn.jpg')
    if (existsSync(posterSrc)) copyFileSync(posterSrc, poster)
    else ff(['-i', heroSrc, '-vf', "scale='min(1280,iw)':-2", '-frames:v', '1', poster])
    console.log('  ✓ hero-poster.jpg')
  }
} else {
  console.warn('  missing hero video source')
}

console.log('done.')
