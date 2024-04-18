/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#D4894A",
        secondary: "#EED8BA",
        tertiary: "#341008",
        pale: "#FCF1D1",
        white: "#FFFFFF",
        offWhite: "#F5F5F5",
        black: "#1D1D1D",
        green1: "#00C9A5",
        green2: "#C5FCEF",
        red1: "#D6775D",
        red2: "#F7B35B",
        transparent: "#00000000",
        faintBlack: "#00000010",
      },
      fontFamily: {
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
