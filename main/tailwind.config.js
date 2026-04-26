/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'dark-bg': '#0f0f0f',
        'dark-surface': '#1a1a2e',
        'dark-card': '#16213e',
        'dark-elevated': '#1e293b',
        'dark-border': '#2d3748',
        'dark-text': '#e2e8f0',
        'dark-muted': '#94a3b8',
        'accent-primary': '#6366f1',
        'accent-secondary': '#8b5cf6',
        'accent-glow': '#818cf8',
      },    
    },

  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
}