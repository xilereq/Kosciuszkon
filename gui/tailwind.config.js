/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Główny motyw aplikacji (Fiolety - nowoczesność, technologia)
        brand: {
          50: '#f5f3ff',  // bardzo jasny fiolet
          100: '#ede9fe',
          200: '#ddd6fe',
          500: '#8b5cf6',
          600: '#7c3aed', // Główny kolor platformy
          700: '#6d28d9',
          900: '#4c1d95',
        },
        // Kolor Akcentów (Malinowy róż - przyciski Call To Action, grywalizacja)
        accent: {
          50: '#fff1f2',
          100: '#ffe4e6',
          500: '#f43f5e',
          600: '#e11d48', // Główne akcenty i przyciski
          700: '#be123c',
        },
        // Sukces i bezpieczeństwo (Neonowa/Jaskrawa zieleń - streaki, dobra kondycja)
        safe: {
          50: '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80', // Jaskrawy zielony (np. dla 100% bezpieczeństwa)
          500: '#22c55e',
          600: '#16a34a',
        },
        // Ostrzeżenia (Bursztynowy)
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Zagrożenie / Błędy (Czerwień)
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
        }
      }
    },
  },
  plugins: [],
}