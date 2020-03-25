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
    MuiTab: {
      root: {
        fontSize: "16px",
        fontWeight: "600"
      }
    },
    MuiButton: {
      root: {
        fontWeight: "600"
      }
    },
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "white"
        }
      }
    },
    MuiAutocomplete: {
      inputRoot: {
        paddingTop: "14px  !important"
      }
    },
    MuiInput: {
      input: { padding: 0 }
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.25)",
        borderRadius: "5px",
        height: "48px",
        "&$focused": {
          backgroundColor: "white"
        },
        "&:hover": {
          backgroundColor: "white"
        }
      }
    },
    MuiInputLabel: {
      root: {
        "&$focused": {
          color: "rgba(0,0,0,0.85)"
        }
      },
      filled: {
        transform: "translate(12px, 18px) scale(1)",
        "&$shrink": {
          transform: "translate(12px, 8px) scale(0.75)"
        }
      }
    },
    MuiRating: {
      sizeSmall: {
        fontSize: "0.8rem"
      }
    }
  },
  typography: {
    fontFamily: ["Roboto", "Nanum Gothic", "Helvetica", "Arial", "sans-serif"].join(",")
  }
});

export default theme;
