import { theme as themeConstants } from './src/theme/constants'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: themeConstants.colors.primary,
        background: themeConstants.colors.background,
        'text-primary': themeConstants.colors.text.primary,
        border: {
          primary: themeConstants.colors.border.primary,
          dashed: themeConstants.colors.border.dashed,
          separator: themeConstants.colors.border.separator
        }
      }
    },
  },
  plugins: [],
} 