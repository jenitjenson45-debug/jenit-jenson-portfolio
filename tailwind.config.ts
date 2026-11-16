import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Reference 01 Color System
        jj: {
          deep: "#051F20",       // Deepest Navy Green (main backgrounds)
          dark: "#0B2B26",       // Dark Forest Green (secondary backgrounds)
          forest: "#163832",     // Forest Green (secondary surfaces / cards)
          emerald: "#235347",    // Emerald Green (accents & borders)
          sage: "#8EB69B",       // Sage Green (highlights, muted text, details)
          mint: "#DAF1DE",       // Pale Mint / Ivory (light typography, contrast)
        },
      },
      fontFamily: {
        serif: [
          '"Bodoni Moda"',
          '"Playfair Display"',
          '"Cormorant Garamond"',
          "Didot",
          "Bodoni MT",
          "Georgia",
          "serif",
        ],
        sans: ['"DM Sans"', '"Inter"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      boxShadow: {
        "emerald-glow": "0 0 30px rgba(35, 83, 71, 0.35)",
        "emerald-glow-lg": "0 0 60px rgba(35, 83, 71, 0.45)",
        "sage-glow": "0 0 25px rgba(142, 182, 155, 0.25)",
        "mint-glow": "0 0 35px rgba(218, 241, 222, 0.2)",
        "card-glass": "0 20px 50px rgba(5, 31, 32, 0.8), inset 0 1px 0 rgba(218, 241, 222, 0.08)",
      },
      animation: {
        "float-gentle": "float-gentle 7s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "shimmer-sage": "shimmer-sage 3s linear infinite",
      },
      keyframes: {
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
        "shimmer-sage": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
