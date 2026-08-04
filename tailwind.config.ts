import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          50: "#eef9ff",
          100: "#dcf3fe",
          200: "#b8e7fd",
          300: "#8fdafb",
          400: "#5BCEFA",
          500: "#2FB3E8",
          600: "#1C7ED6",
          700: "#0B5FA5",
          800: "#0a4d86",
          900: "#0d3f6b",
          950: "#0a2c4d",
        },
        navy: {
          700: "#2c2438",
          800: "#241d30",
          900: "#201A2B",
          950: "#17121F",
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        blue: {
          DEFAULT: "#5BCEFA",
          dark: "#1C7ED6",
          deep: "#0B5FA5",
        },
        pink: {
          DEFAULT: "#F5A9B8",
          dark: "#D6336C",
          deep: "#A61E4D",
        },
        ink: "#201A2B",
        slate: {
          DEFAULT: "#5B5568",
          light: "#8A8494",
        },
        "bg-soft": "#FBF6FA",
        "bg-lavender": "#F3ECFA",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #5BCEFA 0%, #F5A9B8 100%)",
        "gradient-brand-deep": "linear-gradient(135deg, #0B5FA5 0%, #A61E4D 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(5, 18, 37, 0.04), 0 8px 24px -8px rgba(5, 18, 37, 0.10)",
        "card-hover":
          "0 2px 4px rgba(5, 18, 37, 0.05), 0 20px 40px -12px rgba(0, 119, 182, 0.22)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px -20px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.9s ease both",
        "bounce-soft": "bounce-soft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
