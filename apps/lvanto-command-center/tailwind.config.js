/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#070707',
        panel: '#0d0d0d',
        panel2: '#141414',
        panel3: '#1c1c1c',
        accent: '#FF6B2B',
        gold: '#C4A35A',
        warm: '#F2EFE9',
        mute: '#888888',
        mute2: '#585858',
      },
      borderColor: {
        hair: 'rgba(255,255,255,.07)',
      },
      borderRadius: {
        xl2: '14px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
