import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: { main: "#951919" },
  secondary: { main: "#1976D2" }
};
const themeName = "Old Brick Denim Chicken";

const theme = createMuiTheme({
  themeName,
  palette,
  overrides: {
    MuiInputLabel: {
      root: {
        "&$focused": {
          color: "rgba(0,0,0,0.85)"
        }
      },
      filled: {
        transform: "translate(12px, 17px) scale(1)",
        "&$shrink": {
          transform: "translate(12px, 5px) scale(0.75)"
        }
      }
    }
  },
  typography: {
    fontFamily: ["Roboto", "Nanum Gothic", "Helvetica", "Arial", "sans-serif"].join(",")
  }
});

export default theme;
