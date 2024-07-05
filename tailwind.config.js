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
    themes: [
      {
        customPastel: {
          "color-scheme": "light",
          primary: "#b4e9d6",
          secondary: "#cba2a8",
          accent: "#d1c1d7",
          neutral: "#70acc7",
          "base-100": "oklch(100% 0 0)",
          "base-200": "#f9fafb",
          "base-300": "#d1d5db",
          "--rounded-btn": "1.9rem",
          "--tab-radius": "0.7rem",
        },
      },
      "dim",
    ],
    darkTheme: "dim",
    base: true,
    styled: true,
    utils: true,
    themeRoot: ":root",
  },
  plugins: [require("daisyui")],
}
