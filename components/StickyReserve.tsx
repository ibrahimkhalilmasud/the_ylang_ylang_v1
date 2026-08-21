'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RESERVE_HREF } from '@/lib/nav'

/**
 * Mobile sticky booking bar (brief §20/§27) — appears after the first viewport, keeping
 * the primary conversion action always within reach. Hidden on the booking page itself.
 */
export function StickyReserve() {
  const [show, setShow] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === RESERVE_HREF) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-sand-black/95 p-3 backdrop-blur-md transition-transform duration-500 ease-luxe xl:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link href={RESERVE_HREF} className="btn-primary w-full">
        Reserve your stay
      </Link>
    </div>
  )
}
