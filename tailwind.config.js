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
      },
      textColor: {
        primary: "#2158E8",
        offWhite: "#E9EFFF",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
