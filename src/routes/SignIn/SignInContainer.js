import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { LOCAL_LOG_IN } from "../../sharedQueries";
import { toast } from "react-toastify";

import { useMutation } from "@apollo/react-hooks";
import { useGoogleLogin } from "@react-oauth/google";
import useInput from "../../hooks/useInput";

import SignInPresenter from "./SignInPresenter";

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
    toast.error("구글 로그인 초기화 실패");
  };

  const onGoogleLoginSuccess = async response => {
    try {
      const { data } = await googleLoginMutation({ variables: { tokenId: response.tokenId } });

      localLoginMutation({ variables: { token: data.googleLogin } });
      props.history.push("/");
    } catch {
      toast.error("로그인 에러!");
      return;
    }
  };

  const { signIn: googleLogIn } = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    onFailure: onGoogleLoginFailure,
    scope: "profile email",
    redirect_uri: process.env.REACT_APP_FRONTEND_URL,
    select_account: true,
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
      toast.error("가입되지 않은 이메일입니다. 회원가입 후에 진행해주세요.");
      props.history.push("/signup");
      return;
    }

    if (data.login.error === 2) {
      toast.error("비밀번호가 일치하지 않습니다. 확인 후 다시 시도해주세요.");
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
