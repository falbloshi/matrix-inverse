/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
    themes: ["cupcake", "dim"],
    darkTheme: "dim",
    base: true,
    styled: true,
    utils: true,
    themeRoot: ":root",
  },
  plugins: [require("daisyui")],
}
