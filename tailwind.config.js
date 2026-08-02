/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        monastery: {
          maroon: {
            DEFAULT: '#4A0E17',
            dark: '#2A080C',
            light: '#6E1B27',
            deep: '#1D0407',
            velvet: '#8B1E2D'
          },
          gold: {
            DEFAULT: '#F3B23E',
            light: '#FFE29A',
            dark: '#C87B06',
            amber: '#FF9E1B',
            glow: '#FFD700'
          },
          turquoise: {
            DEFAULT: '#16656E',
            dark: '#0F474D',
            light: '#288E99',
            bg: '#EBF7F8'
          },
          cream: {
            DEFAULT: '#FDFBF7',
            light: '#FFFFFF',
            dark: '#F5EFE4',
            warm: '#F7F2E8',
            paper: '#FAF5EA'
          },
          slate: {
            DEFAULT: '#12131A',
            card: '#1C1D26',
            border: '#2E303D',
            light: '#2A2C3A'
          }
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'monastery': '0 15px 35px -5px rgba(74, 14, 23, 0.12), 0 5px 15px -3px rgba(243, 178, 62, 0.1)',
        'monastery-hover': '0 25px 50px -12px rgba(74, 14, 23, 0.25), 0 10px 25px -5px rgba(243, 178, 62, 0.22)',
        'gold-glow': '0 0 25px rgba(243, 178, 62, 0.45)',
        'maroon-glow': '0 0 25px rgba(139, 30, 45, 0.5)',
        'turquoise-glow': '0 0 20px rgba(40, 142, 153, 0.4)',
      }
    },
  },
  plugins: [],
}
