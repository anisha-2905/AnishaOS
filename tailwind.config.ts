import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        galaxy: {
          void: 'var(--color-galaxy-void)',
          night: 'var(--color-galaxy-night)',
          plum: 'var(--color-galaxy-plum)',
          violet: 'var(--color-galaxy-violet)',
          nebula: 'var(--color-galaxy-nebula)',
          starlight: 'var(--color-galaxy-starlight)',
          mist: 'var(--color-galaxy-mist)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '420px',
      },
      boxShadow: {
        galaxy: '0 24px 80px rgb(96 39 158 / 0.22)',
      },
    },
  },
  plugins: [],
} satisfies Config;
