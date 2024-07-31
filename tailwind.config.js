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
        body: "Montserrat",
        label: "Indie Flower"
      },
      colors: {
        ecovidrio_dark: '#005746',
        ecovidrio_darkclick: '#004A3F',
        ecovidrio_greenish: "#E7F5BD",
        ecovidrio_light: "#EEF8F1",
        error: '#DA3D33',
        grey01: '#F8F8F8',
        grey02: '#EBEBEB',
        grey03: '#CCCCCC',
        grey04: '#8C8C8C',
        grey05: '#4D4D4D',
        grey06: '#1C1B1F'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
