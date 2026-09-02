import Image from 'next/image'
import type { MediaImage } from '@/lib/media'
import { Reveal } from './Reveal'

interface Props {
  image: MediaImage
  eyebrow: string
  title: string
  intro?: string
}

/**
 * Inner-page hero. The photograph is kept CLEAN — no text over it (owner feedback: nothing
 * written on photos/videos). The eyebrow, title and intro sit in a calm band directly
 * beneath the image so the picture reads at full clarity.
 */
export function PageHero({ image, eyebrow, title, intro }: Props) {
  return (
    <section className="w-full bg-sand-black">
      {/* Clean full-width photo */}
      <div className="relative h-[52vh] min-h-[340px] w-full overflow-hidden pt-16">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns"
        />
        {/* Only a soft top scrim so the fixed header stays legible — nothing over the focal area */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      {/* Title band beneath the photo */}
      <div className="container-luxe py-12 text-center md:py-16">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mx-auto max-w-4xl font-serif text-4xl leading-[1.04] text-bone md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone md:text-base">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
