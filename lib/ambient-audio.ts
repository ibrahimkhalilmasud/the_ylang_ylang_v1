// Central ambient-audio controller — a single module-level singleton.
//
// Why a singleton: the audio must never have more than one instance. If each React mount
// created its own `new Audio()`, navigation or a remount could leave a second track
// playing that the user cannot stop. This module owns exactly ONE HTMLAudioElement for the
// whole app; every component talks to it through here. Turning it OFF reliably pauses it,
// and it never restarts on its own.

import { AMBIENT_AUDIO } from './media'

const STORAGE_KEY = 'yy-ambient-on'
const TARGET_VOLUME = 0.28

type Listener = (on: boolean) => void

let el: HTMLAudioElement | null = null
let on = false
let fadeRaf = 0
const listeners = new Set<Listener>()

function getEl(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!el) {
    el = new Audio(AMBIENT_AUDIO)
    el.loop = true
    el.preload = 'auto'
    el.volume = 0
  }
  return el
}

function emit() {
  listeners.forEach((l) => l(on))
}

function fadeTo(target: number, pauseAtZero: boolean) {
  const a = getEl()
  if (!a) return
  cancelAnimationFrame(fadeRaf)
  const step = () => {
    const diff = target - a.volume
    if (Math.abs(diff) < 0.02) {
      a.volume = target
      if (pauseAtZero && target === 0) a.pause()
      return
    }
    a.volume = Math.max(0, Math.min(TARGET_VOLUME, a.volume + diff * 0.12))
    fadeRaf = requestAnimationFrame(step)
  }
  step()
}

export const ambientAudio = {
  isOn: () => on,

  /** Returns the persisted preference: 'on' | 'off' | null (never chosen). */
  storedPreference(): 'on' | 'off' | null {
    if (typeof window === 'undefined') return null
    const v = localStorage.getItem(STORAGE_KEY)
    return v === '1' ? 'on' : v === '0' ? 'off' : null
  },

  /** Start playback and fade in. Safe to call repeatedly (single element). */
  play() {
    const a = getEl()
    if (!a) return
    a.play()
      .then(() => {
        on = true
        try {
          localStorage.setItem(STORAGE_KEY, '1')
        } catch {}
        fadeTo(TARGET_VOLUME, false)
        emit()
      })
      .catch(() => {
        on = false
        emit()
      })
  },

  /** Fade out and pause. Persists the OFF choice so it never auto-restarts. The pause is
   *  applied immediately as a hard guarantee (owner: "hard to stop"), and the fade just
   *  softens the volume tail — audio can never keep playing after OFF. */
  stop() {
    on = false
    try {
      localStorage.setItem(STORAGE_KEY, '0')
    } catch {}
    const a = getEl()
    fadeTo(0, true)
    // Hard stop after the fade window, unconditionally — belt and suspenders.
    if (a) {
      window.setTimeout(() => {
        if (!on) {
          a.pause()
          a.volume = 0
        }
      }, 700)
    }
    emit()
  },

  toggle() {
    if (on) this.stop()
    else this.play()
  },

  subscribe(l: Listener) {
    listeners.add(l)
    return () => listeners.delete(l)
  },
}
