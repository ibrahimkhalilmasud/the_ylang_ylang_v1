import Link from 'next/link'
import { IMAGES, PREVIEW } from '@/lib/media'
import { HoverVideo } from './HoverVideo'
import { Reveal } from './Reveal'

interface Experience {
  eyebrow: string
  title: string
  href: string
  image: (typeof IMAGES)[keyof typeof IMAGES]
  video: string
  span?: 'wide' | 'tall'
}

// Experience-led IA. Each tile is a clean photo that plays a short clip on hover / when
// scrolled into view — no text over the image; the label sits beneath it.
const EXPERIENCES: Experience[] = [
  { eyebrow: 'The Estate', title: 'Architecture & living spaces', href: '/villa', image: IMAGES.livingArea, video: PREVIEW.estate, span: 'wide' },
  { eyebrow: 'The Rooms', title: 'Six bedrooms in paradise', href: '/rooms', image: IMAGES.masterSuite, video: PREVIEW.rooms },
  { eyebrow: 'The Table', title: 'A resident chef', href: '/dining', image: IMAGES.dining, video: PREVIEW.dining },
  { eyebrow: 'The Wellness', title: 'Spa, yoga & healing', href: '/wellness', image: IMAGES.beachDeck, video: PREVIEW.wellness, span: 'tall' },
  { eyebrow: 'The Journey', title: 'Bali, curated', href: '/experiences', image: IMAGES.entranceSculpture, video: PREVIEW.journey },
  { eyebrow: 'The Celebration', title: 'Weddings on the sand', href: '/weddings', image: IMAGES.poolDecks, video: PREVIEW.celebration, span: 'wide' },
]

export function ExperienceGrid() {
  return (
    <section className="container-luxe py-20 md:py-28">
      <div className="mb-12 max-w-2xl md:mb-16">
        <Reveal>
          <p className="eyebrow mb-4">The Experience</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif text-3xl leading-tight text-bone md:text-5xl">
            Ways to spend your days
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-sm leading-relaxed text-stone md:text-base">
            More than a villa — a private estate arranged around the sea, the table, wellness
            and the culture of Bali.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERIENCES.map((exp, i) => (
          <Reveal
            key={exp.href}
            delay={(i % 3) * 0.06}
            className={[
              exp.span === 'wide' ? 'sm:col-span-2 lg:col-span-2' : '',
              exp.span === 'tall' ? 'lg:row-span-2' : '',
            ].join(' ')}
          >
            <Link href={exp.href} className="group block">
              {/* Clean media — no text over it */}
              <div
                className={`relative overflow-hidden ${
                  exp.span === 'tall' ? 'aspect-[3/4] lg:h-full' : 'aspect-[4/3]'
                }`}
              >
                <HoverVideo
                  image={exp.image}
                  video={exp.video}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* Label beneath the media */}
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <p className="eyebrow mb-1">{exp.eyebrow}</p>
                  <p className="font-serif text-xl text-bone md:text-2xl">{exp.title}</p>
                </div>
                <span
                  aria-hidden
                  className="translate-x-0 text-gold-soft transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
