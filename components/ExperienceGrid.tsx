import Image from 'next/image'
import Link from 'next/link'
import { IMAGES } from '@/lib/media'
import { Reveal } from './Reveal'

interface Experience {
  eyebrow: string
  title: string
  href: string
  image: (typeof IMAGES)[keyof typeof IMAGES]
  span?: 'wide' | 'tall'
}

// Experience-led IA (brief §11) — each links to a full page.
const EXPERIENCES: Experience[] = [
  { eyebrow: 'The Estate', title: 'Architecture & living spaces', href: '/villa', image: IMAGES.livingArea, span: 'wide' },
  { eyebrow: 'The Rooms', title: 'Six suites facing the sea', href: '/rooms', image: IMAGES.masterSuite },
  { eyebrow: 'The Table', title: 'A resident chef', href: '/dining', image: IMAGES.dining },
  { eyebrow: 'The Wellness', title: 'Spa, yoga & healing', href: '/wellness', image: IMAGES.beachDeck, span: 'tall' },
  { eyebrow: 'The Journey', title: 'Bali, curated', href: '/experiences', image: IMAGES.entranceSculpture },
  { eyebrow: 'The Celebration', title: 'Weddings on the sand', href: '/weddings', image: IMAGES.poolDecks, span: 'wide' },
]

export function ExperienceGrid() {
  return (
    <section className="container-luxe py-20 md:py-28">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">The Experience</p>
          <h2 className="font-serif text-3xl leading-tight text-bone md:text-5xl">
            Ways to spend your days
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-stone">
          More than a villa — a private estate arranged around the sea, the table, wellness
          and the culture of Bali.
        </p>
      </div>

      <div className="grid auto-rows-[minmax(220px,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIENCES.map((exp, i) => (
          <Reveal
            key={exp.href}
            delay={(i % 3) * 0.06}
            className={[
              exp.span === 'wide' ? 'sm:col-span-2 lg:col-span-2' : '',
              exp.span === 'tall' ? 'lg:row-span-2' : '',
            ].join(' ')}
          >
            <Link
              href={exp.href}
              className="group relative flex h-full min-h-[220px] items-end overflow-hidden"
            >
              <Image
                src={exp.image.src}
                alt={exp.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.3s] ease-luxe group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sand-black/85 via-sand-black/10 to-transparent transition-opacity duration-500 group-hover:from-sand-black/90" />
              <div className="relative z-10 p-6">
                <p className="eyebrow mb-2">{exp.eyebrow}</p>
                <p className="font-serif text-2xl text-bone md:text-[1.7rem]">{exp.title}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-wide2 text-gold-soft opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Discover
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
