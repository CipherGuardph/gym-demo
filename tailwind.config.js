/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#102033",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(31, 88, 158, 0.12)",
      },
    },
  },
  plugins: [],
};
