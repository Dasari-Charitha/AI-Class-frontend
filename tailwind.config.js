/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#B8860B",
          light: "#DAA520",
          dark: "#7A5800",
          tint: "#F9F3E3",
          tint2: "#F2E5C0",
        },
        navy: {
          DEFAULT: "#1A1A2E",
          deep: "#16213E",
          royal: "#0F3460",
        },
        parchment: {
          DEFAULT: "#FAF8F2",
          light: "#F5F0E8",
          card: "#FFFDF7",
        },
        muted: "#6B6B80",
        borderWarm: "#E2D9C8",
        success: "#27AE60",
        warning: "#E67E22",
        danger: "#C0392B",
        info: "#2980B9",
      },
      boxShadow: {
        gold: "0 8px 30px rgba(184, 134, 11, 0.14)",
        goldHover: "0 18px 45px rgba(184, 134, 11, 0.25)",
      },
      fontFamily: {
        sans: ["Calibri", "Segoe UI", "sans-serif"],
        display: ["Georgia", "Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};