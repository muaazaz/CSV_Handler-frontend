import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5184EC",
    },
    secondary: {
      main: "#2AB38E",
    },
    info: {
      main: "#F3F3F3",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Poppins",
      textTransform: "none",
    },
    button: {
      textTransform: "none",
    },
  },
});
