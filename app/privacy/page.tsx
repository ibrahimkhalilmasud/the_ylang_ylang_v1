import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy policy for The Ylang Ylang.',
}

export default function PrivacyPage() {
  return (
    <section className="container-luxe max-w-3xl pb-24 pt-36 md:pt-44">
      <p className="eyebrow mb-4">Legal</p>
      <h1 className="font-serif text-4xl text-bone md:text-5xl">Privacy Policy</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-stone">
        <p className="border border-gold/30 bg-gold/5 p-4 text-gold-soft">
          Placeholder — the property’s official privacy policy (per Elite Havens’ standard)
          will be published here. This prototype does not fabricate legal text.
        </p>
        <p>
          The Ylang Ylang is committed to protecting the privacy of its guests. No personal
          data is collected on this prototype site; the reservation enquiry is handled by the
          property’s reservations team.
        </p>
      </div>
    </section>
  )
}
