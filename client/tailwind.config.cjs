/** @type {import('tailwindcss').Config} */

/**
 * bd : border
 * bg : background
 * */

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: { light: "#f9fbfc", dark: "#030712" },
        card: {
          "bg-light": "#ffffff",
          "bg-dark": "#111827",
          "bd-light": "#e5e7eb",
          "bd-dark": "#1f2937"
        },
        field: {
          "bg-light": "#f9fbfc",
          "bg-dark": "#1f2937",
          "bd-light": "#d1d5db",
          "bd-dark": "#374151"
        },
        button: {
          "bg-light": "#f9fbfc",
          "bg-dark": "#1f2937",
          "bd-light": "#d1d5db",
          "bd-dark": "#374151"
        },
        typo: {
          light: "#4b5563",
          dark: "#9ca3af",
          black: "#111827",
          white: "#ffffff"
        },
        primary: "#3b82f6",
        secondary: "#6366f1",
        success: "#14b8a6",
        warning: "#eab308",
        error: "#f43f5e"
      }
    }
  },
  plugins: []
};
