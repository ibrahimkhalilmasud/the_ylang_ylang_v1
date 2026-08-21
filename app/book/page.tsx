import type { Metadata } from 'next'
import Image from 'next/image'
import { BookingForm } from '@/components/BookingForm'
import { IMAGES } from '@/lib/media'
import rates from '@/content/rates/rates.json'

export const metadata: Metadata = {
  title: 'Reserve',
  description:
    'Enquire about a stay at The Ylang Ylang. Choose your dates and the reservations team will confirm availability for the six-bedroom beachfront villa.',
}

export default function BookPage() {
  const seasons = Array.isArray(rates.configurations['6-bedroom']) ? rates.configurations['6-bedroom'] : []
  const low = seasons.length ? Math.min(...seasons.map((s) => s.nightly)) : undefined

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Visual */}
      <div className="relative hidden lg:block">
        <Image
          src={IMAGES.heroVillaLawn.src}
          alt={IMAGES.heroVillaLawn.alt}
          fill
          sizes="50vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-black/80 to-transparent" />
        <div className="absolute bottom-0 p-12">
          <p className="eyebrow mb-3">The Ylang Ylang</p>
          <p className="font-serif text-4xl leading-tight text-bone">
            Passionate Serenity,<br />by the sea
          </p>
          {low && (
            <p className="mt-4 text-sm text-bone/80">
              All-inclusive, exclusive use — from USD {low.toLocaleString('en-US')} / night.
            </p>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-6 pb-24 pt-32 md:px-10 lg:pt-28">
        <div className="w-full max-w-md">
          <p className="eyebrow mb-3">Reserve your stay</p>
          <h1 className="font-serif text-4xl text-bone">Request availability</h1>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Tell us when you would like to arrive. The reservations team confirms availability
            and finalises your stay — no payment is taken on this site.
          </p>
          <div className="mt-8">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
