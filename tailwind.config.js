/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hoverColor: '#ffaa17',
        darkRed: '#ea0638',
        gold: '#D4AF37',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      }
    },
  },
  variants: {},
  plugins: [],
});