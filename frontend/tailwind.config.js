/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#0D9488',
        accent: '#FBBF24',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F97316',
        gray: {
          100: '#F3F4F6',
          400: '#9CA3AF',
          700: '#374151',
        },
        bg: {
          page: '#F9FAFB',
          card: '#FFFFFF',
        }
      }
    },
  },
  plugins: [],
}

