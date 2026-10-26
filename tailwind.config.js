/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Línea Apple en claro: blanco, grises y salvia. */
        lr: {
          bg: "#FFFFFF",
          surface: "#FFFFFF",
          surfaceAlt: "#F5F5F7",
          surfaceDeep: "#1D1D1F",
          border: "#D2D2D7",
          text: "#1D1D1F",
          textSecondary: "#6E6E73",
          muted: "#6E6E73",
          onDark: "#F5F5F7",
          rose: "#E3EADD",
          roseDeep: "#4F6A45",
          sage: "#4F6A45",
          sageDeep: "#415A38",
          terracotta: "#4F6A45",
          gold: "#B9D0A5",
          wa: "#4F6A45",
        },
      },
      fontFamily: {
        display: ["-apple-system", "BlinkMacSystemFont", '"SF Pro Text"', '"Inter"', '"Segoe UI"', "system-ui", "sans-serif"],
        body: ["-apple-system", "BlinkMacSystemFont", '"SF Pro Text"', '"Inter"', '"Segoe UI"', "system-ui", "sans-serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", '"SF Pro Text"', '"Inter"', '"Segoe UI"', "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.45" }],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(28, 27, 24, 0.06)",
        medium: "0 12px 40px rgba(28, 27, 24, 0.1)",
        warm: "0 8px 32px rgba(28, 27, 24, 0.1)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
