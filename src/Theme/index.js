import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: 16,
    h3: {
      fontSize: 30,
      fontWeight: "bold",
      color: "purple",
      "@media (max-width:600px)": {
        fontSize: 22,
      },
      "@media (max-width:960px)": {
        fontSize: 25,
      },
    },
    body1: {
      fontSize: 16,
      color: "black ",
    },
  },
  palette: {
    background: {
      default: "#ffe6ff",
    },
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#dc3545",
    },
  },
});
