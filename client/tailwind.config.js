/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
        inter: ["Inter"],
      },
      boxShadow: {
        "inline-article": "inset 0px -58px 21px -12px rgba(0,0,0,0.66)",
      },
    },
  },
  variants: {},
};
