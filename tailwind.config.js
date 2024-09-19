/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/img/hero-pattern.svg')",
        "footer-texture": "url('/public/images/subtract.png')",
      },
      backgroundColor: {
        primary: "#2158E8",
        offWhite: "#E9EFFF",
        gray: "#F2F4F7",
      },
      textColor: {
        primary: "#2158E8",
        offWhite: "#E9EFFF",
        gray: "#475467",
      },
      borderColor: {
        primary: "#2158E8",
      },
      fontFamily: {
        sans: ["Ubuntu, sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
