/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jothishyan: {
          bg: '#05040a',
          card: 'rgba(15, 12, 28, 0.75)',
          border: 'rgba(139, 92, 246, 0.25)',
          gold: '#fbbf24',
          'gold-dark': '#b45309',
          purple: '#8b5cf6',
          'purple-deep': '#1e0938',
          cyan: '#06b6d4',
          neon: '#a855f7',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        mono: ['Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 12s linear infinite',
        'scan-laser': 'scanLaser 2.5s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'orb-glow': 'orbGlow 5s ease-in-out infinite',
        'wave-bar': 'waveBar 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        scanLaser: {
          '0%': { top: '0%', opacity: '0.8' },
          '50%': { top: '95%', opacity: '1' },
          '100%': { top: '0%', opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        orbGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.08)' },
        },
        waveBar: {
          '0%': { height: '15%' },
          '100%': { height: '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
