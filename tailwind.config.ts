import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette anchored in the property's real materials (see DESIGN_DIRECTION.md).
        sand: {
          black: '#14110E', // volcanic sand / lacquered wood — primary dark ground
          deep: '#1F1B16',
        },
        bone: '#F4EFE7', // warm off-white
        ink: '#1F1B16',
        gold: {
          DEFAULT: '#B8975A', // the signature "golden and black" accent
          deep: '#8A6F3F',
          soft: '#CBB07E',
        },
        stone: '#9A9186',
        sea: '#35463F',
      },
      fontFamily: {
        // Loaded via next/font in app/layout.tsx and exposed as CSS variables.
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.28em',
        wide2: '0.18em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both',
        'ken-burns': 'ken-burns 16s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
