import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        myfont: ["MyFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;