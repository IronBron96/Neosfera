export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
        5000: "5000ms",
      },
      colors: {
        primary: "#EF8354", // arancione acceso
        dark: "#252422", // nero/marrone scuro
        lightDark: "#27272a", // grigio scuro
        navi: "#2D3142", // grigio profondo
        lightNavi: "#4F5D75",
        beige: "#CCC5B9", // beige neutro
        light: "#FFFFFF", // avorio chiaro
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
