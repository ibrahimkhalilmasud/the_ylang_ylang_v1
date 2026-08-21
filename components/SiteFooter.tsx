import Link from 'next/link'
import { NAV, RESERVE_HREF } from '@/lib/nav'
import facts from '@/content/villa/facts.json'

export function SiteFooter() {
  const year = 2026 // static; avoids hydration + Date.now concerns

  return (
    <footer className="border-t border-gold/15 bg-sand-black">
      <div className="container-luxe py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-serif text-3xl text-bone">The Ylang Ylang</p>
            <p className="mt-2 font-serif text-lg italic text-gold-soft">Passionate Serenity</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone">
              A private six-bedroom absolute-beachfront estate in Saba, Ketewel, Bali —
              established {facts.identity.established}. Marketed by {facts.identity.managedBy}.
            </p>
            <Link href={RESERVE_HREF} className="btn-primary mt-7">
              Reserve your stay
            </Link>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="text-sm">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2.5 text-bone/80">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact / location */}
          <div className="text-sm">
            <p className="eyebrow mb-4">Find us</p>
            <address className="not-italic leading-relaxed text-bone/80">
              Saba Village, Ketewel<br />
              Gianyar Regency, Bali<br />
              Indonesia
            </address>
            <p className="mt-4 text-stone">
              29 km from Ngurah Rai International Airport (DPS)
            </p>
            <Link href="/contact" className="link-underline mt-4 inline-block text-gold">
              Enquiries &amp; contact
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-stone md:flex-row md:items-center md:justify-between">
          <p>© {year} The Ylang Ylang. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-bone">Privacy</Link>
            <Link href="/terms" className="hover:text-bone">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
