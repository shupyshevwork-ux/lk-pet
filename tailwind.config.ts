import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220 22% 98%)',
        foreground: 'hsl(220 22% 12%)',
        muted: 'hsl(220 18% 93%)',
        'muted-foreground': 'hsl(220 10% 42%)',
        card: 'hsl(0 0% 100%)',
        primary: 'hsl(244 86% 62%)',
        'primary-foreground': 'hsl(210 40% 98%)',
        border: 'hsl(220 16% 88%)',
        destructive: 'hsl(356 84% 62%)',
      },
      boxShadow: {
        soft: '0 10px 35px -20px rgba(15, 23, 42, 0.25)',
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
} satisfies Config;
