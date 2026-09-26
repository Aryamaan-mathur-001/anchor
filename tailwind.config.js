/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        sand: "#F1EAD9",
        cream: "#FFFDF8",
        coral: "#E7623C",
        teal: "#0B4F4A",
        slate: "#4A5568",
        line: "#DCD3BE",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
