import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    menu: Palette["primary"];
  }

  interface PaletteOptions {
    menu?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  spacing: (factor: number) => `${0.625 * factor}rem`,
  typography: {
    body1: {
      color: "black",
    },
    body2: {
      color: "rgba(0, 0, 0, 0.60)",
    },
    caption: {
      color: "#757575",
    },
  },
  palette: {
    primary: {
      main: "#26BAD4",
      contrastText: "white",
    },
    menu: {
      main: "#333333",
      contrastText: "white",
    },
  },
});
