import Link from 'next/link'
import Image from 'next/image'

/**
 * Brand identity. ONE clean wordmark — no duplicate "Bali · Indonesia" subtext
 * (that belongs in the hero/footer, not repeated on every header).
 *
 * To use the owner's approved logo: set LOGO_SRC to the asset path (e.g.
 * '/media/images/logo.svg') and give its intrinsic width/height. When LOGO_SRC is null
 * the text wordmark is used, so swapping to the real logo is a one-line change.
 */
const LOGO_SRC: string | null = null
const LOGO_SIZE = { w: 180, h: 48 }

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="The Ylang Ylang — home"
      className="inline-flex items-center leading-none"
    >
      {LOGO_SRC ? (
        <Image
          src={LOGO_SRC}
          alt="The Ylang Ylang"
          width={LOGO_SIZE.w}
          height={LOGO_SIZE.h}
          priority
          className={`w-auto ${compact ? 'h-7' : 'h-9'} transition-all duration-500`}
        />
      ) : (
        <span
          className={`whitespace-nowrap font-serif tracking-[0.04em] text-current transition-all duration-500 ${
            compact ? 'text-lg md:text-xl' : 'text-xl md:text-[1.6rem]'
          }`}
        >
          The&nbsp;Ylang&nbsp;Ylang
        </span>
      )}
    </Link>
  )
}
