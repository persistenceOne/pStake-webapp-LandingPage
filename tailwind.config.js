module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      light: {
        full: "#ffffff",
        high: "#FCFCFC",
        emphasis: "#ECECEC",
        mid: "#A6A6A6",
        low: "#787878",
        disabled: "#A9A9A9"
      },
      transparent: "transparent",
      dark: {
        full: "#000",
        high: "#1B1B1B",
        emphasis: "#030303",
        mid: "#070B09",
        low: "#787878",
        disabled: "#A9A9A9"
      },
      primary: "#c73238",
      secondary: "#47C28B"
    },
    backgroundImage: {
      "body-bg":
        "radial-gradient(112.6% 112.6% at 50% -12.6%,#372627 0,#030303 44.79%)"
    },
    backgroundColor: {
      none: "none",
      transparent: "transparent",
      "side-bar": "#171717",
      "sideBar-navLinkActive": "#1b1b1b",
      dropDown: "#282828",
      tabHeader: "#181818",
      tabContent: "rgba(24, 24, 24, 0.6)",
      input: "rgba(27, 27, 27, 0.6)"
    },
    fontFamily: {
      primary: ["Poppins", "sans-serif"]
    },
    fontSize: {
      xsm: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", //16px
      lg: "1.125rem", //18px
      xl: "1.25rem", // 20px
      "2xl": "1.375rem", // 22px
      "3xl": "1.5rem", //24px
      "4xl": "2.25rem", // 36px
      h1: ["6rem", { lineHeight: "7rem" }],
      h2: ["3.75rem", { lineHeight: "4.5rem" }],
      h3: ["3rem", { lineHeight: "3.5rem" }],
      h4: ["2.25rem", { lineHeight: "2.25rem" }],
      h5: ["1.5rem", { lineHeight: "2rem" }],
      h6: ["1.25rem", { lineHeight: "1.5rem" }],
      subtitle1: ["1rem", { lineHeight: "1.5rem" }],
      subtitle2: ["0.875rem", { lineHeight: "1.5rem" }],
      body1: ["1rem", { lineHeight: "1.5rem" }],
      body2: ["0.875rem", { lineHeight: "1.25rem" }],
      button: ["0.875rem", { lineHeight: "1rem" }],
      caption: ["0.75rem", { lineHeight: "0.875rem" }],
      overline: ["0.625rem", { lineHeight: "1rem" }]
    },
    screens: {
      "2xl": { max: "1536px" },
      // => @media (max-width: 1536px) { ... }

      "1.5xl": { max: "1408px" },
      // => @media (max-width: 1408px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      "1.5lg": { max: "1152px" },
      // => @media (max-width: 1152px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      "1.5md": { max: "896px" },
      // => @media (max-width: 896px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      "1.5xs": { max: "640px" },
      // => @media (max-width: 640px) { ... }

      // "1.5xs": { max: "512px" },
      // // => @media (max-width: 512px) { ... }

      sm: { max: "512px" }
    }
  },
  plugins: []
};
