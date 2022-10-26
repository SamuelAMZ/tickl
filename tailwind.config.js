/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        tickl: {
          primary: "#2a6da8",
          secondary: "#1e40af",
          accent: "#1FB2A6",
          neutral: "#d1d5db",
          "base-100": "#f9f9f9",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
