/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 1.5s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'lg-soft': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl-soft': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        primary: '#f97316', // Orange principal
        secondary: '#fed7aa', // Orange clair
        accent: '#ea580c', // Orange foncé
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        background: '#ffffff', // Fond blanc
        foreground: '#1f2937', // Texte gris foncé
        muted: '#f3f4f6', // Fond gris très clair
        'muted-foreground': '#6b7280', // Texte gris
      },
    },
  },
  plugins: [],
}
