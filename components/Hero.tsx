'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEO } from '@/lib/media'
import { RESERVE_HREF } from '@/lib/nav'

/**
 * Cinematic hero (brief §8/§14). Decision: single exceptional still (crisp LCP) with a
 * muted, looping property video layered in once it can play — the poster IS the villa-lawn
 * hero image, so first paint is instant and never a blurry video frame. Reduced motion →
 * still image only, no video, no Ken-Burns.
 */
export function Hero() {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (reduce) return
    const v = videoRef.current
    if (!v) return
    const onPlay = () => setVideoReady(true)
    v.addEventListener('playing', onPlay)
    // Attempt autoplay; ignore rejection (some browsers block until interaction).
    v.play().catch(() => {})
    return () => v.removeEventListener('playing', onPlay)
  }, [reduce])

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-sand-black">
      {/* Poster still — the LCP element */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${reduce ? '' : 'animate-ken-burns'}`}
        style={{ backgroundImage: `url(${HERO_VIDEO.poster})` }}
        aria-hidden="true"
      />

      {/* Property video, fades in over the still once playing */}
      {!reduce && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-luxe ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          poster={HERO_VIDEO.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        >
          <source src={HERO_VIDEO.webm} type="video/webm" />
          <source src={HERO_VIDEO.mp4} type="video/mp4" />
        </video>
      )}

      {/* Legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-sand-black/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="container-luxe relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Bali · Indonesia · Est. 2002
        </motion.p>

        <motion.h1
          className="font-serif text-[3.4rem] leading-[0.95] text-bone sm:text-7xl md:text-[6rem] lg:text-[7.5rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          The Ylang Ylang
        </motion.h1>

        <motion.p
          className="mt-5 font-serif text-xl italic text-gold-soft md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Passionate Serenity
        </motion.p>

        <motion.p
          className="mt-4 max-w-md text-sm leading-relaxed text-bone/80 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.66 }}
        >
          A private six-bedroom estate on the black-sand beaches of Saba, Bali.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={RESERVE_HREF} className="btn-primary">
            Reserve your stay
          </Link>
          <Link href="/villa" className="btn-ghost">
            Discover the villa
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-bone/60">
        <span className="flex flex-col items-center gap-2 text-[0.6rem] uppercase tracking-luxe">
          Scroll
          <span className="block h-8 w-px bg-gradient-to-b from-gold to-transparent" />
        </span>
      </div>
    </section>
  )
}
