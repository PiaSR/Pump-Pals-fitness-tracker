/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#623CEA",
        "bg-secondary": "#FFA76F",
        "bg-white": "#FAFCEE",
        "primary-half": "#623CEA80",
        "dark-grey": "#6B6666",
        "light-grey": "#D9D9D9",
        "white": "#FFF",
        "black": "000"
      },
      font: {
        "header-white": "'text-white text-5xl font-bold"
      }
    },
  },
  plugins: [],
}

