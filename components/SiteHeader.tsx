'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NAV, RESERVE_HREF } from '@/lib/nav'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

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

  // Home has a full-bleed hero; header starts transparent over it.
  const overHero = pathname === '/' && !scrolled

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
          scrolled
            ? 'bg-sand-black/90 backdrop-blur-md py-3 shadow-[0_1px_0_0_rgba(184,151,90,0.18)]'
            : 'bg-gradient-to-b from-black/50 to-transparent py-5',
        ].join(' ')}
      >
        <div className="container-luxe flex items-center justify-between gap-4">
          {/* Left: desktop nav (first half) */}
          <nav className="hidden xl:flex flex-1 items-center gap-6 text-[0.72rem] uppercase tracking-wide2">
            {NAV.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline transition-colors ${
                  pathname === item.href ? 'text-gold' : 'text-bone/85 hover:text-bone'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center: logo */}
          <div className="flex-shrink-0 text-bone">
            <Logo compact={scrolled} />
          </div>

          {/* Right: desktop nav (second half) + reserve */}
          <nav className="hidden xl:flex flex-1 items-center justify-end gap-6 text-[0.72rem] uppercase tracking-wide2">
            {NAV.slice(5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline transition-colors ${
                  pathname === item.href ? 'text-gold' : 'text-bone/85 hover:text-bone'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href={RESERVE_HREF} className="btn-primary !px-6 !py-3 !text-[0.68rem]">
              Reserve
            </Link>
          </nav>

          {/* Mobile / tablet trigger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="xl:hidden inline-flex flex-col gap-[5px] p-2 text-bone"
          >
            <span className="block h-px w-7 bg-current" />
            <span className="block h-px w-7 bg-current" />
            <span className="block h-px w-5 bg-current" />
          </button>
        </div>
        {overHero && <span className="sr-only">Over hero</span>}
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  )
}
