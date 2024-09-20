/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeYellow: "#D96C2C",
        themeGrayExteral: "#222222",
        themeBorderBottom: "#333333",
      },
      fontFamily: {
        "shadows-light": ['"Shadows Into Light"', "cursive"], //Font for genre of the movie in hero section
      },
    },
  },
  plugins: [],
};
