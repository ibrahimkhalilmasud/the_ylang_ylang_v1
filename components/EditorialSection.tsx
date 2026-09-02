import Image from 'next/image'
import Link from 'next/link'
import type { MediaImage } from '@/lib/media'
import { Reveal } from './Reveal'

interface Props {
  eyebrow?: string
  title: string
  body: string | string[]
  image: MediaImage
  reverse?: boolean
  cta?: { label: string; href: string }
  priority?: boolean
}

/** Alternating image / editorial-text band. The core homepage & inner-page rhythm. */
export function EditorialSection({ eyebrow, title, body, image, reverse, cta, priority }: Props) {
  const paras = Array.isArray(body) ? body : [body]

  return (
    <section className="container-luxe py-16 md:py-24">
      <div className={`grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${reverse ? 'lg:[direction:rtl]' : ''}`}>
        <Reveal className={`${reverse ? 'lg:[direction:ltr]' : ''}`}>
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[3px] shadow-[0_16px_44px_-18px_rgba(0,0,0,0.8)] ring-1 ring-white/5 transition-all duration-500 ease-luxe hover:shadow-[0_28px_64px_-20px_rgba(0,0,0,0.9)] hover:ring-gold/25">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={priority}
              className="object-cover transition-transform duration-[1.3s] ease-luxe group-hover:scale-[1.04]"
            />
          </div>
        </Reveal>

        <div className={`${reverse ? 'lg:[direction:ltr]' : ''}`}>
          {eyebrow && (
            <Reveal>
              <p className="eyebrow mb-4">{eyebrow}</p>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h2 className="font-serif text-3xl leading-tight text-bone md:text-[2.75rem]">{title}</h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {paras.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="text-[0.95rem] leading-relaxed text-stone md:text-base">{p}</p>
              </Reveal>
            ))}
          </div>
          {cta && (
            <Reveal delay={0.2}>
              <Link href={cta.href} className="btn-ghost mt-8">
                {cta.label}
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
