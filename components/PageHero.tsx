import Image from 'next/image'
import type { MediaImage } from '@/lib/media'
import { Reveal } from './Reveal'

interface Props {
  image: MediaImage
  eyebrow: string
  title: string
  intro?: string
}

/** Inner-page hero: a single full-width image with title, below the fixed header. */
export function PageHero({ image, eyebrow, title, intro }: Props) {
  return (
    <section className="relative h-[64vh] min-h-[440px] w-full overflow-hidden bg-sand-black">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover animate-ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-sand-black/90" />
      <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-14 md:pb-20">
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="max-w-4xl font-serif text-4xl leading-[1.02] text-bone md:text-7xl">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-bone/85 md:text-base">{intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
