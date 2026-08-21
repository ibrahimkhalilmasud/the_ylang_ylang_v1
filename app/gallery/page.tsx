import type { Metadata } from 'next'
import { Gallery } from '@/components/Gallery'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'A gallery of The Ylang Ylang — the beachfront estate, its six suites, the 16-metre pool, dining and the black sands of Saba, Bali.',
}

export default function GalleryPage() {
  return (
    <>
      <section className="container-luxe pb-8 pt-32 text-center md:pt-40">
        <p className="eyebrow mb-4">The Gallery</p>
        <h1 className="font-serif text-4xl text-bone md:text-6xl">A portrait of the estate</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-stone">
          Every image is genuine property photography of The Ylang Ylang.
        </p>
      </section>
      <div className="pt-6 pb-24">
        <Gallery />
      </div>
    </>
  )
}
