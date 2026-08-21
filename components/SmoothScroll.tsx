'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useState } from 'react'

/**
 * Lenis smooth scroll wrapper. Disabled automatically when the user prefers reduced
 * motion, so native scrolling stays understandable (brief §26/§34).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  if (reduced) return <>{children}</>

  return (
    <ReactLenis root options={{ lerp: 0.09, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
