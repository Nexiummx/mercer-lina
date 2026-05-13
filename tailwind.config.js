/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lr: {
          bg: "#F8F3EB",
          surface: "#FFFFFF",
          surfaceAlt: "#EDE5D7",
          surfaceDeep: "#3D2E26",
          border: "#D9CCB8",
          text: "#3D2E26",
          textSecondary: "#7A6B5F",
          muted: "#A89E92",
          onDark: "#F8F3EB",
          rose: "#D4A5A0",
          roseDeep: "#B88378",
          sage: "#8B9D7E",
          sageDeep: "#5F6E54",
          terracotta: "#C97F5F",
          gold: "#C4A574",
          wa: "#7A9B7A",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ['"Fraunces"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(61, 46, 38, 0.06)",
        medium: "0 12px 40px rgba(61, 46, 38, 0.08)",
        warm: "0 8px 32px rgba(196, 127, 95, 0.12)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
