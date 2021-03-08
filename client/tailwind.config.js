module.exports = {
  purge: ["index.html", "./scripts/index.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: "#E7E7E8",
        secondary: "#A5A5A9",
        accent: "#F6739D",
      },
      backgroundColor: {
        primary: "#181820",
        secondary: "#21212B",
        accent: {
          DEFAULT: "#F6739D",
          dark: "#f04a7f",
        },
        text: "#A5A5A9",
      },
      borderColor: {
        accent: {
          DEFAULT: "#F6739D",
          dark: "#f04a7f",
        },
      },
      fontFamily: {
        serif: "Poppins, sans-serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
