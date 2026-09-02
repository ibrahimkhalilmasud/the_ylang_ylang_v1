'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEO } from '@/lib/media'
import { RESERVE_HREF } from '@/lib/nav'

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

        {/* Soft bottom vignette only — keeps the villa clean while grounding the wordmark */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sand-black/70 to-transparent" />

        {/* Quiet wordmark, bottom-centred — the single brand identity over the image */}
        <motion.div
          className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-center font-serif text-4xl font-light tracking-[0.03em] text-bone sm:text-5xl md:text-6xl">
            The Ylang Ylang
          </h1>
        </motion.div>
      </div>

      {/* Supporting statement + CTAs — a calm band below the video */}
      <div className="container-luxe py-12 text-center md:py-16">
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
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={RESERVE_HREF} className="btn-primary">
            Reserve your stay
          </Link>
          <Link href="/villa" className="btn-ghost">
            Discover the villa
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
