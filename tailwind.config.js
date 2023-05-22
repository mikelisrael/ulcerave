/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors
      colors: {
        primaryBlue: "#0082e8",
        darkerBlue: "#0061b8",
        lightBlue: "#e7f4ff",
        dark: "#1f1f1f",
        orangeColor: "#ff8c00",
        grey: "#808080",
        lightGrey: "#f6f6f6",
        goldColor: "#EF9645",
      },
    },
  },
  plugins: [],
};
