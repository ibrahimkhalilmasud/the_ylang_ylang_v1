'use client'

import { useEffect, useState } from 'react'
import { ambientAudio } from '@/lib/ambient-audio'

/**
 * Floating ambient-music control. All audio state lives in the `ambientAudio` singleton
 * (lib/ambient-audio.ts), so there is only ever ONE audio element — navigation and
 * remounts never spawn a second track.
 *
 * Behaviour:
 * - Browsers block autoplay-with-sound before a gesture, so unless the visitor previously
 *   turned music OFF, the first interaction anywhere fades it in (close to autoplay).
 * - The button is a clear ON/OFF toggle with a visible label and an aria-label that names
 *   the action. Turning it OFF reliably pauses and never auto-restarts.
 */
export function AmbientAudio() {
  const [on, setOn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setOn(ambientAudio.isOn())
    const unsub = ambientAudio.subscribe(setOn)

    // Arm a one-time auto-start on first interaction — only if the visitor hasn't opted out.
    let armed = ambientAudio.storedPreference() !== 'off'
    const onFirst = () => {
      if (!armed) return
      armed = false
      remove()
      ambientAudio.play()
    }
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll']
    const remove = () => events.forEach((e) => window.removeEventListener(e, onFirst))
    if (armed) events.forEach((e) => window.addEventListener(e, onFirst, { passive: true }))

    return () => {
      unsub()
      remove()
    }
  }, [])

  if (!mounted) return null

  const label = on ? 'Turn music off' : 'Turn music on'

  return (
    <button
      onClick={() => ambientAudio.toggle()}
      aria-label={label}
      aria-pressed={on}
      title={label}
      className="group fixed bottom-20 right-4 z-40 flex items-center gap-2.5 rounded-full border border-gold/30 bg-sand-black/70 py-2 pl-3 pr-4 text-gold backdrop-blur-md transition-colors duration-500 ease-luxe hover:border-gold/70 xl:bottom-6 xl:right-6"
    >
      {/* Equalizer bars — animate only while playing; still under reduced motion */}
      <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block w-[2px] bg-current transition-all duration-300 motion-reduce:!animate-none"
            style={{
              height: on ? `${5 + ((i * 5 + 4) % 10)}px` : '3px',
              animation: on ? `yyeq 0.9s ${i * 0.12}s ease-in-out infinite alternate` : 'none',
            }}
          />
        ))}
      </span>
      <span className="text-[0.62rem] font-medium uppercase tracking-wide2">
        {on ? 'Music on' : 'Music off'}
      </span>
      <style>{`@keyframes yyeq { from { transform: scaleY(0.35) } to { transform: scaleY(1) } }`}</style>
    </button>
  )
}
