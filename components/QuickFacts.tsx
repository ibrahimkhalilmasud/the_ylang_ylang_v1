import facts from '@/content/villa/facts.json'
import { Reveal } from './Reveal'

const ITEMS: { value: string; label: string }[] = [
  { value: '6', label: 'Ensuite bedrooms' },
  { value: '12', label: 'Guests' },
  { value: '16m', label: 'Beachfront pool' },
  { value: '2,100', label: 'sqm of grounds' },
]

/** Compact verified-facts strip. Sourced from content/villa/facts.json. */
export function QuickFacts() {
  return (
    <section className="border-y border-gold/15 bg-sand-deep">
      <div className="container-luxe grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08} className="text-center">
            <p className="font-serif text-4xl text-gold md:text-5xl">{item.value}</p>
            <p className="mt-2 text-[0.7rem] uppercase tracking-wide2 text-stone">{item.label}</p>
          </Reveal>
        ))}
      </div>
      <span className="sr-only">
        {facts.identity.name}, established {facts.identity.established}, absolute beachfront in{' '}
        {facts.location.village}, {facts.location.area}, {facts.location.regency}.
      </span>
    </section>
  )
}
