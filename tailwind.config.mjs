/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#5446ab",
          600: "#463a8f",
          700: "#3a3078"
        },
        accent: {
          500: "#f59e0b"
        }
      }
    }
  },
  plugins: []
}
