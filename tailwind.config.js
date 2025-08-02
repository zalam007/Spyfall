/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'spy-red': '#dc2626',
        'spy-blue': '#2563eb',
        'spy-green': '#16a34a',
        'spy-purple': '#9333ea',
      },
      fontFamily: {
        'game': ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
