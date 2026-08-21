import reviews from '@/content/reviews/reviews.json'
import { Reveal } from './Reveal'

interface Review {
  dates: string
  author: string
  country: string
  text: string
}

interface Props {
  limit?: number
  heading?: boolean
}

/** Editorial review presentation (brief §20). Verbatim testimonials, no fabricated rating. */
export function ReviewWall({ limit, heading = true }: Props) {
  const items = (reviews.sample as Review[]).slice(0, limit ?? reviews.sample.length)

  return (
    <section className="border-t border-gold/15 bg-sand-deep py-20 md:py-28">
      <div className="container-luxe">
        {heading && (
          <div className="mb-14 text-center">
            <p className="eyebrow mb-4">Guest Reviews</p>
            <h2 className="font-serif text-3xl leading-tight text-bone md:text-5xl">
              In their own words
            </h2>
            <p className="mt-4 text-sm text-stone">
              From {reviews.totalCount} guest reviews across two decades on the black-sand coast.
            </p>
          </div>
        )}

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [column-fill:_balance]">
          {items.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06} className="mb-6 break-inside-avoid">
              <figure className="border border-white/10 bg-sand-black/40 p-7">
                <span aria-hidden className="font-serif text-5xl leading-none text-gold/50">“</span>
                <blockquote className="mt-1 font-serif text-lg italic leading-relaxed text-bone/90">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 text-xs uppercase tracking-wide2 text-stone">
                  <span className="text-gold-soft">{r.author}</span> · {r.country}
                  <span className="mt-1 block normal-case tracking-normal text-stone/70">{r.dates}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
