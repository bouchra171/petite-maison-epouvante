/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e293b',
        secondary: '#3b82f6',
        accent: '#06b6d4',
        professional: '#f8fafc',
        card: '#ffffff',
        text: '#1e293b',
        muted: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
