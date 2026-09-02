'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { MediaImage } from '@/lib/media'
import { Reveal } from './Reveal'

interface Props {
  image: MediaImage
  eyebrow?: string
  title?: string
  subtitle?: string
  cta?: { label: string; href: string }
  height?: string
  /** 'below' (default) keeps the photo clean and places text under it; 'overlay' centres
   *  text on the image — reserve for genuine hero moments. */
  layout?: 'below' | 'overlay'
}

/**
 * Full-bleed cinematic image band with controlled parallax. By default the photograph is
 * kept CLEAN and the supporting text sits in a calm caption band beneath it (owner
 * feedback §9/§10): IMAGE → title → short description → CTA. 'overlay' remains available
 * where a small amount of centred text genuinely suits the shot.
 */
export function FullBleed({
  image,
  eyebrow,
  title,
  subtitle,
  cta,
  height = 'h-[70vh]',
  layout = 'below',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  const hasText = title || eyebrow || subtitle

  return (
    <section className="w-full bg-sand-black">
      <div ref={ref} className={`relative ${height} min-h-[380px] w-full overflow-hidden`}>
        <motion.div style={{ y }} className="absolute inset-0 h-[116%] -top-[8%]">
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
        </motion.div>

        {layout === 'overlay' && hasText && (
          <>
            <div className="absolute inset-0 bg-black/35" />
            <div className="container-luxe relative z-10 flex h-full flex-col items-center justify-center text-center">
              {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
              {title && (
                <h2 className="max-w-3xl font-serif text-4xl leading-tight text-bone md:text-6xl">
                  {title}
                </h2>
              )}
              {subtitle && <p className="mt-5 max-w-xl text-sm text-bone/85 md:text-base">{subtitle}</p>}
              {cta && (
                <Link href={cta.href} className="btn-primary mt-8">
                  {cta.label}
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/* Clean caption band beneath the photo */}
      {layout === 'below' && hasText && (
        <div className="container-luxe py-12 text-center md:py-16">
          {eyebrow && (
            <Reveal>
              <p className="eyebrow mb-4">{eyebrow}</p>
            </Reveal>
          )}
          {title && (
            <Reveal delay={0.05}>
              <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-tight text-bone md:text-5xl">
                {title}
              </h2>
            </Reveal>
          )}
          {subtitle && (
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-stone md:text-base">
                {subtitle}
              </p>
            </Reveal>
          )}
          {cta && (
            <Reveal delay={0.15}>
              <Link href={cta.href} className="btn-ghost mt-8">
                {cta.label}
              </Link>
            </Reveal>
          )}
        </div>
      )}
    </section>
  )
}
