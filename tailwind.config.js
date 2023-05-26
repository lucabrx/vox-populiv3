/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      "xs" : "375px",
      "ss" : "390px",
      "sm" : "640px",
      "md" : "768px",
      "lg" : "1024px",
      "px0" : "1280px",
      "pc" : "1368px",
      "pc2" : "1400px",
      "lpc" : "1624px"
    },
    extend: {
      colors: {
        "my-primary-500": "#19AFA4",
        "my-primary-700": "#289F97",
        "my-neutral-50": "#F9FBFB",
        "my-neutral-75": "#F4F4F5",
        "my-neutral-100": "#E0EBEA",
        "my-neutral-250" : "#E4E4E7",
        "my-neutral-200" : "#C5D3D2",
        "my-neutral-400" : "#8FA3A2",
        "my-neutral-600" : "#566C6A",
        "my-neutral-700" : "#3F504F",
        "my-neutral-750" : "#3F3F46",
        "my-neutral-900" : "#121212",
        "my-neutral-950": "#080807"
      },
      transitionProperty: {
        "width": "width",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}
