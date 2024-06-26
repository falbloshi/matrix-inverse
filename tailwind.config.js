/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
      },
      fontFamily: {
        inter: [
          "Inter",
          "Helvetica",
          "Noto Sans",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  daisyui: {
    themes: ["pastel", "dim"],
    darkTheme: "dim",
    base: true,
    styled: true,
    utils: true,
    themeRoot: ":root",
  },
  plugins: [require("daisyui")],
}
