/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeYellow: "#D96C2C",
      },
      fontFamily: {
        "shadows-light": ['"Shadows Into Light"', "cursive"], //Font for genre of the movie in hero section
      },
    },
  },
  plugins: [],
};
