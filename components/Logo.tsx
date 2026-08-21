import Link from 'next/link'

/** Text wordmark echoing the official "YY" monogram + wordmark brand lockup (15.png). */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="The Ylang Ylang — home" className="group inline-flex flex-col items-center leading-none">
      <span className="font-serif text-2xl md:text-[1.7rem] tracking-[0.02em] text-current">
        Ylang&nbsp;Ylang
      </span>
      {!compact && (
        <span className="mt-1 font-sans text-[0.55rem] uppercase tracking-luxe text-current/70">
          Bali · Indonesia
        </span>
      )}
    </Link>
  )
}
