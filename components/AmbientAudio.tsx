'use client'

import { useEffect, useRef, useState } from 'react'
import { AMBIENT_AUDIO } from '@/lib/media'

const KEY = 'yy-ambient-on'

/**
 * Optional ambient audio (brief §23). OFF by default, opt-in only, never autoplays with
 * sound. Preference persists in localStorage. Fades in/out. A small floating toggle.
 */
export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [on, setOn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const el = new Audio(AMBIENT_AUDIO)
    el.loop = true
    el.volume = 0
    audioRef.current = el
    return () => {
      el.pause()
    }
  }, [])

  const fade = (el: HTMLAudioElement, to: number) => {
    const step = () => {
      const diff = to - el.volume
      if (Math.abs(diff) < 0.03) {
        el.volume = to
        if (to === 0) el.pause()
        return
      }
      el.volume = Math.max(0, Math.min(0.35, el.volume + diff * 0.12))
      requestAnimationFrame(step)
    }
    step()
  }

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    const next = !on
    setOn(next)
    localStorage.setItem(KEY, next ? '1' : '0')
    if (next) {
      el.play().then(() => fade(el, 0.28)).catch(() => setOn(false))
    } else {
      fade(el, 0)
    }
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
      title={on ? 'Mute ambient sound' : 'Play ambient sound'}
      className="fixed bottom-5 right-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-sand-black/70 text-gold backdrop-blur-md transition-colors hover:border-gold hover:text-gold-soft xl:flex"
    >
      <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block w-[2px] bg-current transition-all duration-300"
            style={{
              height: on ? `${6 + ((i * 5 + 4) % 12)}px` : '4px',
              animation: on ? `eq 0.9s ${i * 0.12}s ease-in-out infinite alternate` : 'none',
            }}
          />
        ))}
      </span>
      <style>{`@keyframes eq { from { transform: scaleY(0.4) } to { transform: scaleY(1) } }`}</style>
    </button>
  )
}
