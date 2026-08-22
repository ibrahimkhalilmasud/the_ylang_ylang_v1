'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AMBIENT_AUDIO } from '@/lib/media'

const KEY = 'yy-ambient-on'
const TARGET_VOLUME = 0.28

/**
 * Ambient audio (brief §23). Browsers forbid autoplay-with-sound before the visitor
 * interacts, so instead we arm a one-time listener: the first click/scroll/keypress/touch
 * ANYWHERE starts the music and fades it in — as close to autoplay as browsers permit.
 * The visitor can mute with the floating toggle; that choice persists in localStorage and
 * is respected (a returning muted visitor is not re-started). Never blocks understanding
 * of the site, and the animated bars respect prefers-reduced-motion.
 */
export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [on, setOn] = useState(false)
  const [mounted, setMounted] = useState(false)

  const fade = useCallback((el: HTMLAudioElement, to: number) => {
    const step = () => {
      const diff = to - el.volume
      if (Math.abs(diff) < 0.03) {
        el.volume = to
        if (to === 0) el.pause()
        return
      }
      el.volume = Math.max(0, Math.min(TARGET_VOLUME, el.volume + diff * 0.12))
      requestAnimationFrame(step)
    }
    step()
  }, [])

  const start = useCallback(
    (el: HTMLAudioElement) => {
      el.play()
        .then(() => {
          setOn(true)
          fade(el, TARGET_VOLUME)
        })
        .catch(() => setOn(false))
    },
    [fade],
  )

  useEffect(() => {
    setMounted(true)
    const el = new Audio(AMBIENT_AUDIO)
    el.loop = true
    el.volume = 0
    el.preload = 'auto'
    audioRef.current = el

    // If the visitor previously muted, honour that and don't auto-start.
    const muted = localStorage.getItem(KEY) === '0'

    let armed = !muted
    const onFirstInteraction = () => {
      if (!armed) return
      armed = false
      removeListeners()
      start(el)
    }
    const events: (keyof WindowEventMap)[] = [
      'pointerdown',
      'keydown',
      'touchstart',
      'wheel',
      'scroll',
    ]
    const opts = { once: false, passive: true } as AddEventListenerOptions
    const removeListeners = () =>
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction))

    if (armed) events.forEach((e) => window.addEventListener(e, onFirstInteraction, opts))

    return () => {
      removeListeners()
      el.pause()
    }
  }, [start])

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    const next = !on
    setOn(next)
    localStorage.setItem(KEY, next ? '1' : '0')
    if (next) start(el)
    else fade(el, 0)
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
      title={on ? 'Mute ambient sound' : 'Play ambient sound'}
      className="fixed bottom-20 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-sand-black/70 text-gold backdrop-blur-md transition-colors hover:border-gold hover:text-gold-soft xl:bottom-5"
    >
      <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block w-[2px] bg-current transition-all duration-300 motion-reduce:!animate-none"
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
