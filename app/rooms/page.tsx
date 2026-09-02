import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/PageHero'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { IMAGES, type MediaImage } from '@/lib/media'
import rooms from '@/content/rooms/rooms.json'

export const metadata: Metadata = {
  title: 'The Rooms',
  description:
    'Six ensuite bedrooms at The Ylang Ylang — two master suites with private plunge pools, two queen rooms and two adjoining junior rooms, sleeping up to twelve.',
}

const ROOM_IMAGES: Record<string, { primary: MediaImage; secondary?: MediaImage }> = {
  'master-suites': { primary: IMAGES.masterSuite, secondary: IMAGES.sunkenBath },
  'queen-rooms': { primary: IMAGES.masterSuiteNight },
  'junior-rooms': { primary: IMAGES.twinGuestroom, secondary: IMAGES.twinPoolside },
}

export default function RoomsPage() {
  return (
    <>
      <PageHero
        image={IMAGES.masterTurndown}
        eyebrow="The Rooms"
        title="Six ensuite bedrooms"
        intro={rooms.summary}
      />

      <div className="container-luxe py-16 md:py-24">
        {rooms.rooms.map((room, idx) => {
          const imgs = ROOM_IMAGES[room.id]
          const reverse = idx % 2 === 1
          return (
            <section key={room.id} className="border-b border-white/8 py-14 first:pt-0 last:border-b-0">
              <div className={`grid gap-10 lg:grid-cols-2 lg:items-center ${reverse ? 'lg:[direction:rtl]' : ''}`}>
                <Reveal className={reverse ? 'lg:[direction:ltr]' : ''}>
                  <div className="grid gap-3">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={imgs.primary.src}
                        alt={imgs.primary.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {imgs.secondary && (
                      <div className="relative aspect-[16/7] overflow-hidden">
                        <Image
                          src={imgs.secondary.src}
                          alt={imgs.secondary.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>

                <div className={reverse ? 'lg:[direction:ltr]' : ''}>
                  <Reveal>
                    <p className="eyebrow mb-3">
                      {room.count} × {room.name}
                    </p>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="font-serif text-3xl text-bone md:text-4xl">{room.name}</h2>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <p className="mt-2 text-sm italic text-gold-soft">{room.bed}</p>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="mt-5 text-[0.95rem] leading-relaxed text-stone">{room.body}</p>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {room.features.map((f) => (
                        <li
                          key={f}
                          className="border border-white/12 px-3 py-1.5 text-xs uppercase tracking-wide2 text-bone/75"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            </section>
          )
        })}

        <Reveal>
          <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-stone/80">
            {rooms.sharedDetail}
          </p>
        </Reveal>
      </div>
    </>
  )
}
