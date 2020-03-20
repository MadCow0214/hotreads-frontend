import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";

import theme from "../styles/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import AppRouter from "./AppRouter";
import Header from "./Header";
import Footer from "./Footer";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const App = () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <BrowserRouter>
          <Header isLoggedIn={isLoggedIn} />
          <AppRouter isLoggedIn={isLoggedIn} />
          <Footer />
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
};

export default App;
