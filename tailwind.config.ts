import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        earth: {
          50: "#fdf8f0",
          100: "#faefd8",
          200: "#f4dba8",
          300: "#ecc06e",
          400: "#e3a040",
          500: "#d4831f",
          600: "#b86415",
          700: "#984c14",
          800: "#7c3d16",
          900: "#663315",
        },
      },
    },
  },
  plugins: [],
};

export default config;
