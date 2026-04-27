/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'dark-bg': '#1a1a1a',
        'dark-surface': '#262626',
        'dark-card': '#2d2d2d',
        'dark-elevated': '#333333',
        'dark-border': '#404040',
        'dark-text': '#f5f5f5',
        'dark-muted': '#a3a3a3',
        'accent-primary': '#FF5722',
        'accent-secondary': '#E64A19',
        'accent-glow': '#FF7043',
      },    
    },

  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
}