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
        'devop-blue': '#2563eb',
        'devop-purple': '#7c3aed',
        'success-green': '#10b981',
        'warning-yellow': '#f59e0b',
        'error-red': '#ef4444',
      },
    },
  },
  plugins: [],
}
