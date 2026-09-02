'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { MediaImage } from '@/lib/media'

interface Props {
  image: MediaImage
  /** Short muted preview clip (e.g. /media/preview/estate.mp4). */
  video: string
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * A photograph that becomes a moving video on interaction.
 * - Desktop: still image by default; plays the muted clip on hover, pauses on leave.
 * - Mobile/touch: plays while the tile is scrolled into the centre of the viewport
 *   (IntersectionObserver) so the effect is felt without a hover.
 * - Reduced motion: stays a still image, video never loads.
 * The clip is lazy — its <source> is only attached on first activation, so nothing
 * downloads until needed (mobile-data friendly).
 */
export function HoverVideo({ image, video, sizes = '100vw', priority, className = '' }: Props) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(false) // has the clip been attached yet
  const [playing, setPlaying] = useState(false)

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

  // Touch devices: activate when centred in the viewport.
  useEffect(() => {
    if (reduce) return
    const isTouch = window.matchMedia('(hover: none)').matches
    if (!isTouch) return
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) activate()
          else deactivate()
        }
      },
      { threshold: [0, 0.6, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  return (
    <div
      ref={wrapRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-transform duration-[1.3s] ease-luxe ${
          playing ? 'scale-100' : 'group-hover:scale-105'
        }`}
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
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
