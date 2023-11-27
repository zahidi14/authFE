/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        left: "70%",
        right: "30%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
