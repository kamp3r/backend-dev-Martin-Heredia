/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/views/**/*.ejs",
    "./public/views/**/*.html",
    "./public/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
