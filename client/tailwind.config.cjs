/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark: "#202637",
        bgLight: "#EBF0FF",
        cardDark: "#2C3551",
        cardLight: "#FFFFFF"
      }
    }
  },
  plugins: []
};
