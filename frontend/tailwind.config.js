import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  // DaisyUI theme configuration
  daisyui: {
    themes: ["dark", "light", "cupcake", "synthwave"],
    darkTheme: "dark",
  },
};