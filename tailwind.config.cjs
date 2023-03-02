/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      sm: { min: "130px", max: "639px" },
      md: { min: "640px", max: "810px" },
      lg: { min: "812px", max: "1279px" },
    },
  },
  plugins: [],
};
