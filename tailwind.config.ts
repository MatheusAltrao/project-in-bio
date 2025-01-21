import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-primary': "#050505",
        'background-secondary': "#0F0F10",
        'background-tertiary': "#19191A",
        'content-heading': "#FFFFFF",
        'content-body': "#CDCBCC",
        'content-headline': "#050505",
        'content-placeholder': "#827D7F",
        'accent-purple': "#4B2DBB",
        'accent-blue': "#30B9E3",
        'accent-green': "#87BB2D",
        'accent-pink': "#B5446B",
        'accent-yellow': "#DCCB2E",
        'border-primary': "#19191A",
        'border-secondary': "#323234",
        'border-tertiary': "#97979B",
      },
    },
  },
  plugins: [],
} satisfies Config;
