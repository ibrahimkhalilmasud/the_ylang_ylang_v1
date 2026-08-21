import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms and conditions for The Ylang Ylang.',
}

export default function TermsPage() {
  return (
    <section className="container-luxe max-w-3xl pb-24 pt-36 md:pt-44">
      <p className="eyebrow mb-4">Legal</p>
      <h1 className="font-serif text-4xl text-bone md:text-5xl">Terms &amp; Conditions</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-stone">
        <p className="border border-gold/30 bg-gold/5 p-4 text-gold-soft">
          Placeholder — the property’s official terms and conditions (including rates,
          inclusions, minimum-night and cancellation policies per Elite Havens’ standard)
          will be published here. This prototype does not fabricate legal text.
        </p>
        <p>
          Rates shown are all-inclusive and indicative; final terms are confirmed by the
          reservations team at the time of booking. Promotions are subject to their stated
          conditions and to availability.
        </p>
      </div>
    </section>
  )
}
