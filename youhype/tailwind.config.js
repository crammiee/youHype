/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d",
        surface: "#1a1a1a",
        surfaceLight: "#2a2a2a",
        textPrimary: "#ffffff",
        textSecondary: "#aaaaaa",
        accent: {
          DEFAULT: "#7c3aed",
          hover: "#a78bfa",
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
