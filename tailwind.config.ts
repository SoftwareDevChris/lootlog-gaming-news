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
        "custom-amber-800": "#FF8F00",
      },
      aspectRatio: {
        "3/2": "3 / 2",
        "16/9": "16 / 9",
      },
    },
    fontFamily: {
      PressStart: ['"Press Start 2P"', "system-ui"],
    },
  },
  plugins: [],
};
export default config;
