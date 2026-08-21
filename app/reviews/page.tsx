import type { Metadata } from 'next'
import { ReviewWall } from '@/components/ReviewWall'
import reviews from '@/content/reviews/reviews.json'

export const metadata: Metadata = {
  title: 'Reviews',
  description: `Guest reviews of The Ylang Ylang — from ${reviews.totalCount} stays across two decades on Bali’s black-sand east coast.`,
}

export default function ReviewsPage() {
  return (
    <>
      <section className="container-luxe pb-4 pt-32 text-center md:pt-40">
        <p className="eyebrow mb-4">Guest Reviews</p>
        <h1 className="font-serif text-4xl text-bone md:text-6xl">Twenty years of returning guests</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-stone">
          A selection from {reviews.totalCount} reviews. Every word is a real guest’s own.
        </p>
      </section>
      <ReviewWall heading={false} />
    </>
  )
}
