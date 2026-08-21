'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { NAV, RESERVE_HREF } from '@/lib/nav'

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-sand-black xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="container-luxe flex h-full flex-col py-6">
            <div className="flex items-center justify-between">
              <span className="font-serif text-xl text-bone">Ylang Ylang</span>
              <button onClick={onClose} aria-label="Close menu" className="p-2 text-bone">
                <span className="relative block h-6 w-6">
                  <span className="absolute left-0 top-1/2 h-px w-6 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-6 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col justify-center gap-1 overflow-y-auto">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 font-serif text-3xl text-bone/90 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <Link href={RESERVE_HREF} onClick={onClose} className="btn-primary mt-6 w-full">
              Reserve your stay
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
