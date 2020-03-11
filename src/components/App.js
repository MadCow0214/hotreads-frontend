import React from "react";
import { BrowserRouter } from "react-router-dom";

import theme from "../styles/theme";

import { ThemeProvider } from "@material-ui/core";
import AppRouter from "./AppRouter";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;
