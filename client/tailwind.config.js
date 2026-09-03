/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: "#0A0F1C",
        accent: "#2563EB",
        cyan: "#06B6D4",
      },
      fontFamily: {
        sans: ["Sora", "Inter", "Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(37, 99, 235, 0.18)",
      },
    },
  },
  plugins: [],
};
