/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.jsx'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '445px',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle farthest-corner at top left, rgba(157, 85, 229, 0.8) 0%, rgba(225, 243, 97,0) 50%),radial-gradient(circle farthest-side at top right, rgba(181, 176, 177,1) 0%, rgba(181, 176, 177,0) 10%), radial-gradient(circle farthest-corner at bottom right, rgba(204, 104, 119,1) 0%, rgba(204, 104, 119, 0) 33%),radial-gradient(circle farthest-corner at top right, rgba(155, 221, 240,1) 0%, rgba(155, 221, 240,0) 50%),radial-gradient(ellipse at bottom center, rgba(254, 43, 0,1) 0%, rgba(254, 43, 0, 0) 80%)'
      },
      colors: {
        "bg-primary": "#623CEA",
        "bg-secondary": "#FFA76F",
        "bg-white": "#FAFCEE",
        "bg-whitegrey": "#E4E6D9",
        "primary-half": "#623CEA80",
        "dark-grey": "#6B6666",
        "light-grey": "#D9D9D9",
        
      },
      font: {
        "header-white": "'text-white text-5xl font-bold"
      }
    },
  },
  plugins: [],
}

