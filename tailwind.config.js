/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.component.ts"],
  important: true,
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "986px",
      xl: "1440px",
    },
  },
  plugins: [],
};
