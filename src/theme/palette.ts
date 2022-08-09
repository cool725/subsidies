const white = "#FFFFFF";
const black = "#000000";
const gray = "#EBEBEB";
const palette = {
  black,
  white,
  gray,
  primary: {
    contrastText: white,
    dark: "#10192c",
    main: "#17253F",
    light: "#455065",
  },
  secondary: {
    contrastText: white,
    dark: "#7d1021",
    main: "#B41730",
    light: "#c34559",
  },
  success: {
    contrastText: white,
    dark: "#055536",
    main: "#228861",
    light: "#D2F9E4",
  },
  info: {
    contrastText: white,
    dark: "#195CB3",
    main: "#2073DF",
    light: "#A6C7F2",
  },
  warning: {
    contrastText: white,
    dark: "#B26800",
    main: "#FFBF00",
    light: "#FFF2CC ",
  },
  error: {
    contrastText: white,
    dark: "#A51212",
    main: "#E51A1A",
    light: "#FAD1D1",
  },
  text: {
    primary: "#25272B",
  },
  background: {
    default: "#FCFCFC",
    gray: "#3B3E43",
  },
};

export default palette;
