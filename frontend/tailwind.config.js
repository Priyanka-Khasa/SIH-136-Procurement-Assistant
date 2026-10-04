/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        raised: 'var(--raised)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        saffron: 'var(--saffron)',
        teal: 'var(--teal)',
        rose: 'var(--rose)',
        amber: 'var(--amber)',
        violet: 'var(--violet)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,176,32,0.2), 0 18px 48px rgba(10,15,30,0.35)',
      },
      borderRadius: {
        card: '1rem',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        slideUp: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};
