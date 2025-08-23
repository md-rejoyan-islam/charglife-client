/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/container/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: ".8rem",
          sm: "2rem",
          lg: "3rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        background: "hsl(var(--background))",
        color: "#04061C",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        primary: "#ef4a23",
        secondary: "#3749bb",
        black: "#081621",
        snow: "#081621",
        gray: "#666666",
        purple: "#6E2594",
        white: "#ffffff",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Trebuchet MS", "sans-serif"],
        serif: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "bounce-horizontal": "bounce-horizontal 1s infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
    keyframes: {
      "bounce-horizontal": {
        "0%, 100%": { transform: "translateX(0)" },
        "50%": { transform: "translateX(10px)" },
      },
      scroll: {
        to: {
          transform: "translate(calc(-50% - 0.5rem))",
        },
      },
    },
    animationDuration: {
      4000: "4000ms",
    },
  },

  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
