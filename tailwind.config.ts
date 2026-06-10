import type { Config } from "tailwindcss";
import fontFamily from "tailwindcss/defaultTheme";

const config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["var(--font-manrope)", ...fontFamily.fontFamily.sans],
      },
    },
  },
} satisfies Config;

export default config;
