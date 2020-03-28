import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import theme from "../styles/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import AppRouter from "./AppRouter";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { ToastContainer, toast } from "react-toastify";

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
          <ScrollToTop>
            <Header isLoggedIn={isLoggedIn} />
            <AppRouter isLoggedIn={isLoggedIn} />
            <Footer />
          </ScrollToTop>
        </BrowserRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};

export default App;
