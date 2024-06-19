/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      base: "var(--base)",
      box: "var(--box)",
      border: "var(--border-color)",
      text: "var(--text)",

      accent: {
        light: "var(--accent-light)",
        DEFAULT: "var(--accent)",
        dark: "var(--accent-dark)",
      },
      error: {
        light: "var(--error-light)",
        DEFAULT: "var(--error)",
        dark: "var(--error-dark)",
      },
      info: {
        light: "var(--info-light)",
        DEFAULT: "var(--info)",
        dark: "var(--info-dark)",
      },
      warning: {
        light: "var(--warning-light)",
        DEFAULT: "var(--warning)",
        dark: "var(--warning-dark)",
      },
      success: {
        light: "var(--success-light)",
        DEFAULT: "var(--success)",
        dark: "var(--success-dark)",
      },
    },
  },
  plugins: [],
};
