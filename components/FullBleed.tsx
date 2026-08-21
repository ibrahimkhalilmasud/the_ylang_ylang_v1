'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { MediaImage } from '@/lib/media'

interface Props {
  image: MediaImage
  eyebrow?: string
  title?: string
  subtitle?: string
  cta?: { label: string; href: string }
  height?: string
}

/** Full-bleed cinematic image band with controlled parallax (brief §7/§26). */
export function FullBleed({ image, eyebrow, title, subtitle, cta, height = 'h-[70vh]' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section ref={ref} className={`relative ${height} min-h-[420px] w-full overflow-hidden bg-sand-black`}>
      <motion.div style={{ y }} className="absolute inset-0 h-[116%] -top-[8%]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />
      {(title || eyebrow) && (
        <div className="container-luxe relative z-10 flex h-full flex-col items-center justify-center text-center">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          {title && (
            <h2 className="max-w-3xl font-serif text-4xl leading-tight text-bone md:text-6xl">{title}</h2>
          )}
          {subtitle && <p className="mt-5 max-w-xl text-sm text-bone/85 md:text-base">{subtitle}</p>}
          {cta && (
            <Link href={cta.href} className="btn-primary mt-8">
              {cta.label}
            </Link>
          )}
        </div>
      )}
    </section>
  )
}
