'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEO } from '@/lib/media'

/**
 * Cinematic hero. The villa video is the dominant element and is kept CLEAN — no property
 * labels, taglines or descriptive text laid over it (owner feedback §4). Only the
 * wordmark sits quietly at the very bottom. The supporting statement and CTAs live in a
 * calm band BELOW the video (§6): VIDEO → short statement → CTA.
 *
 * Video: autoplay + muted + loop + playsInline, poster for instant paint and no layout
 * shift, no controls. If autoplay is blocked, the poster remains (graceful fallback).
 * Under prefers-reduced-motion the video is not loaded — the poster still is shown.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (reduce) return
    const v = videoRef.current
    if (!v) return
    const onPlaying = () => setVideoReady(true)
    v.addEventListener('playing', onPlaying)
    v.play().catch(() => {}) // autoplay may be blocked — poster stays
    return () => v.removeEventListener('playing', onPlaying)
  }, [reduce])

  return (
    <section className="relative w-full bg-sand-black">
      {/* Cinematic video stage — the villa dominates, uncluttered */}
      <div className="relative h-[82svh] min-h-[500px] w-full overflow-hidden">
        {/* Poster still — the LCP element, always painted first (no layout shift) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_VIDEO.poster})` }}
          role="img"
          aria-label={HERO_VIDEO.posterAlt}
        />

        {!reduce && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-luxe ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            poster={HERO_VIDEO.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={HERO_VIDEO.webm} type="video/webm" />
            <source src={HERO_VIDEO.mp4} type="video/mp4" />
          </video>
        )}

        {/* Soft bottom vignette only — a gentle grade into the section below; the villa
            video stays fully clean, with no text over it. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-sand-black/60 to-transparent" />
      </div>

      {/* Supporting statement + CTAs — a calm band below the video */}
      <div className="container-luxe py-12 text-center md:py-16">
        {/* Visually-hidden page heading for SEO/accessibility (the name lives in the header) */}
        <h1 className="sr-only">The Ylang Ylang — Private Beachfront Villa, Bali</h1>
        <motion.p
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Private beachfront villa · Bali
        </motion.p>
        <motion.p
          className="mx-auto max-w-2xl font-serif text-2xl leading-snug text-bone md:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          A private six-bedroom estate on the black-sand shore of Saba —{' '}
          <span className="italic text-gold-soft">Passionate Serenity.</span>
        </motion.p>
        <motion.div
          className="mt-9 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/villa" className="btn-ghost">
            Discover the villa
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
