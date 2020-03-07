import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import GoogleLogin from "react-google-login";

const GOOGLE_LOGIN = gql`
  mutation googleLogin($tokenId: String!) {
    googleLogin(tokenId: $tokenId)
  }
`;

function App() {
  const [googleLogin] = useMutation(GOOGLE_LOGIN);

  const onSuccess = async response => {
    const { data } = await googleLogin({ variables: { tokenId: response.tokenId } });

    console.log(data);
  };

  const onFailure = response => {
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="217958793011-rf62op6r0dkc7qgong09sl4fmmm5raf3.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default App;
