import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        foreground: "rgba(var(--foreground) / <alpha-value>)",
        background: "rgba(var(--background) / <alpha-value>)",
        "input-placeholder": "rgba(var(--input-placeholder) / <alpha-value>)",
        "input-background": "rgba(var(--input-background) / <alpha-value>)",
        "input-border": "var(--input-border)",
        muted: "rgba(var(--muted) / <alpha-value>)",
        "icon-muted": "rgba(var(--icon-muted) / <alpha-value>)",
        "box-background": "rgba(var(--box-background) / <alpha-value>)",
        "box-border": "var(--box-border)",
        blue: "rgba(var(--blue) / <alpha-value>)",
      },
      height: {
        dvh: "100dvh",
      },
      minHeight: {
        dvh: "100dvh",
      },
      maxWidth: {
        container: "1230px",
      },
    },
  },
  plugins: [],
};
export default config;
