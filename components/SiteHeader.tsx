'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NAV, RESERVE_HREF } from '@/lib/nav'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

/**
 * Header — wordmark LEFT, navigation + Reserve RIGHT (classic luxury-hotel layout).
 * The centred-wordmark layout collided with the menu on mid-size screens; this never does.
 * The full desktop nav shows from `lg`; below that a single menu button keeps it clean.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
          scrolled
            ? 'bg-sand-black/92 py-3 shadow-[0_1px_0_0_rgba(184,151,90,0.18)] backdrop-blur-md'
            : 'bg-gradient-to-b from-black/55 to-transparent py-5',
        ].join(' ')}
      >
        <div className="container-luxe flex items-center justify-between gap-6">
          {/* Left: wordmark */}
          <div className="flex-shrink-0 text-bone">
            <Logo compact={scrolled} />
          </div>

          {/* Right: nav + reserve (shown from xl where all 10 links fit comfortably) */}
          <nav className="hidden items-center gap-x-5 text-[0.68rem] uppercase tracking-wide2 xl:flex 2xl:gap-x-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline whitespace-nowrap transition-colors ${
                  pathname === item.href ? 'text-gold' : 'text-bone/85 hover:text-bone'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href={RESERVE_HREF} className="btn-primary !px-5 !py-3 !text-[0.66rem]">
              Reserve
            </Link>
          </nav>

          {/* Mobile / tablet / small-laptop trigger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex flex-col items-end gap-[5px] p-2 text-bone xl:hidden"
          >
            <span className="block h-px w-7 bg-current" />
            <span className="block h-px w-7 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </button>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  )
}
