/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0d14",
        foreground: "#f3f4f6",
        surface: "#111726",
        surfaceBorder: "#1f293d",
        primary: {
          DEFAULT: "#06b6d4", // cyan
          hover: "#0891b2",
          light: "#22d3ee",
          dark: "#0e7490"
        },
        accent: {
          purple: "#8b5cf6",
          emerald: "#10b981",
          amber: "#f59e0b"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
