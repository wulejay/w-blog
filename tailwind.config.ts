import type { Config } from "tailwindcss";
import daisyui from "daisyui";

// @ts-ignore
export default {
  darkMode: ["selector", "[data-theme='dark']"],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    base: false,
    logs: false,
  },
} satisfies Config;
