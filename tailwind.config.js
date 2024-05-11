/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pt-sans": ["PT Sans", "sans-serif"],
        "pt-serif": ["PT Serif", "serif"],
      },
    },
  },
  plugins: [],
}
