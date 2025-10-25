/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#d4af37',
          foreground: '#0a0a0a',
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          foreground: '#e5e5e5',
        },
        accent: {
          DEFAULT: '#f59e0b',
          foreground: '#0a0a0a',
        },
        muted: {
          DEFAULT: '#2a2a2a',
          foreground: '#a3a3a3',
        },
        border: '#333333',
        input: '#2a2a2a',
        ring: '#d4af37',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}