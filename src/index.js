import "./env";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Client from "./apollo/Client";

import App from "./components/App";

ReactDOM.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
