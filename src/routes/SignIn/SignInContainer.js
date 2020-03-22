import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import { LOCAL_LOG_IN } from "../../sharedQueries";

import SignInPresenter from "./SignInPresenter";
import { useGoogleLogin } from "react-google-login";
import useInput from "../../hooks/useInput";

const GOOGLE_LOGIN = gql`
  mutation googleLogin($tokenId: String!) {
    googleLogin(tokenId: $tokenId)
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      error
      token
    }
  }
`;

const SignInContainer = props => {
  const [verifyEmail, setVerifyEmail] = useState();
  const email = useInput();
  const password = useInput();
  const [loginMutation] = useMutation(LOGIN, {
    variables: { email: email.value, password: password.value }
  });
  const [googleLoginMutation] = useMutation(GOOGLE_LOGIN);
  const [localLoginMutation] = useMutation(LOCAL_LOG_IN);

  const onGoogleLoginFailure = () => {
    console.log("google Failure");
  };

  const onGoogleLoginSuccess = async response => {
    try {
      const { data } = await googleLoginMutation({ variables: { tokenId: response.tokenId } });

      localLoginMutation({ variables: { token: data.googleLogin } });
      props.history.push("/");
    } catch {
      console.log("login error!");
      return;
    }
  };

  const { signIn: googleLogIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    cookiePolicy: "single_host_origin",
    onSuccess: onGoogleLoginSuccess,
    onFailure: onGoogleLoginFailure,
    scope: "profile email",
    accessType: "online",
    prompt: "",
    fetchBasicProfile: true,
    isSignedIn: false,
    uxMode: "popup",
    onRequest: () => {},
    jsSrc: "https://apis.google.com/js/api.js"
  });

  const onGoogleButtonClick = e => {
    e.preventDefault();
    googleLogIn();
  };

  const onSubmit = async e => {
    e.preventDefault();

    const { data } = await loginMutation({
      variables: { email: email.value, password: password.value }
    });

    if (data.login.error === 1) {
      console.log("login error!");
      return;
    }

    if (data.login.error === 2) {
      console.log("login error!");
      return;
    }

    if (data.login.error === 3) {
      setVerifyEmail(email.value);
      return;
    }

    localLoginMutation({ variables: { token: data.login.token } });
    props.history.push("/");
  };

  return (
    <SignInPresenter
      onSubmit={onSubmit}
      onGoogleButtonClick={onGoogleButtonClick}
      onEmailChange={email.onChange}
      onPasswordChange={password.onChange}
      verifyEmail={verifyEmail}
    />
  );
};

export default withRouter(SignInContainer);
