'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ALL_IMAGES, previewFor, type GalleryCategory, type MediaImage } from '@/lib/media'

const CATEGORIES: { key: GalleryCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'villa', label: 'Villa' },
  { key: 'rooms', label: 'Rooms' },
  { key: 'pool', label: 'Pool' },
  { key: 'beach', label: 'Beach' },
  { key: 'dining', label: 'Dining' },
]

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all')
  const [active, setActive] = useState<number | null>(null)

  const items = useMemo(
    () => (filter === 'all' ? ALL_IMAGES : ALL_IMAGES.filter((i) => i.tags.includes(filter))),
    [filter],
  )

  const close = useCallback(() => setActive(null), [])
  const move = useCallback(
    (dir: 1 | -1) => {
      setActive((cur) => {
        if (cur === null) return cur
        return (cur + dir + items.length) % items.length
      })
    },
    [items.length],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, move])

  return (
    <>
      {/* Filters */}
      <div className="container-luxe flex flex-wrap justify-center gap-3 pb-10">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`px-4 py-2 text-[0.7rem] uppercase tracking-wide2 transition-colors ${
              filter === c.key
                ? 'bg-gold text-sand-black'
                : 'border border-white/15 text-bone/70 hover:border-gold hover:text-gold'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Masonry grid of cards */}
      <div className="container-luxe columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {items.map((img, i) => (
          <GalleryTile key={img.src} img={img} index={i} onOpen={() => setActive(i)} />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && items[active] && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-sand-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 p-2 text-bone/80 hover:text-gold"
            >
              <span className="relative block h-6 w-6">
                <span className="absolute left-0 top-1/2 h-px w-6 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-6 -rotate-45 bg-current" />
              </span>
            </button>
            <LightboxArrow dir="left" onClick={(e) => { e.stopPropagation(); move(-1) }} />
            <LightboxArrow dir="right" onClick={(e) => { e.stopPropagation(); move(1) }} />

            <motion.figure
              key={items[active].src}
              className="relative max-h-[85vh] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].alt}
                width={items[active].w}
                height={items[active].h}
                className="mx-auto max-h-[85vh] w-auto object-contain"
                priority
              />
              <figcaption className="mt-3 text-center text-xs text-stone">
                {items[active].alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * A gallery card: a still photo that plays a short muted clip on hover (desktop) or when
 * scrolled into the centre of the viewport (touch). Framed as an elevated card with a soft
 * shadow that lifts on hover for a premium "wow" feel. Reduced-motion → still image only.
 */
function GalleryTile({ img, index, onOpen }: { img: MediaImage; index: number; onOpen: () => void }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(false)
  const [playing, setPlaying] = useState(false)
  const clip = previewFor(img)

  const activate = () => {
    if (reduce) return
    setActivated(true)
    const v = videoRef.current
    if (v) v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }
  const deactivate = () => {
    const v = videoRef.current
    if (v) v.pause()
    setPlaying(false)
  }

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: none)').matches) return
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting && e.intersectionRatio > 0.6 ? activate() : deactivate())),
      { threshold: [0, 0.6, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  return (
    <motion.button
      ref={wrapRef}
      layout
      onClick={onOpen}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[3px] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/5 transition-all duration-500 ease-luxe hover:-translate-y-1 hover:shadow-[0_22px_50px_-16px_rgba(0,0,0,0.85)] hover:ring-gold/30"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="w-full transition-transform duration-[1.3s] ease-luxe group-hover:scale-[1.04]"
      />
      {activated && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-luxe ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        >
          <source src={clip} type="video/mp4" />
        </video>
      )}
      {/* Subtle gradient frame for depth (no text) */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.button>
  )
}

function LightboxArrow({ dir, onClick }: { dir: 'left' | 'right'; onClick: (e: React.MouseEvent) => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'left' ? 'Previous image' : 'Next image'}
      className={`absolute top-1/2 z-10 -translate-y-1/2 p-3 text-bone/70 hover:text-gold ${
        dir === 'left' ? 'left-2 md:left-6' : 'right-2 md:right-6'
      }`}
    >
      <span className="font-serif text-4xl">{dir === 'left' ? '‹' : '›'}</span>
    </button>
  )
}
