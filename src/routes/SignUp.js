import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";

//hooks
import { useMutation } from "@apollo/react-hooks";
import useInput from "../hooks/useInput";

//components
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Input from "../components/Input";
import VerifyUser from "../components/VerifyUser";
import Link from "../components/Link";
import Helmet from "react-helmet";

const REGISTER_USER = gql`
  mutation registerUser($nickName: String!, $email: String!, $password: String!) {
    registerUser(nickName: $nickName, email: $email, password: $password) {
      error
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    minHeight: "100vh",
    paddingTop: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px"
  },
  item: {
    width: "100%",
    "&:not(:first-child)": {
      marginTop: "10px"
    }
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [isVerifying, setIsVerifying] = useState(false);
  const email = useInput();
  const password1 = useInput();
  const password2 = useInput();
  const nickName = useInput();
  const [registerUserMutation] = useMutation(REGISTER_USER, {
    variables: {
      email: email.value,
      nickName: nickName.value,
      password: password1.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();

    if (password1.value !== password2.value) {
      return;
    }

    const { data } = await registerUserMutation();

    if (data.registerUser.error) {
    }

    setIsVerifying(true);
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>회원가입 | Hotread</title>
      </Helmet>
      {isVerifying && <VerifyUser email={email.value} />}
      {!isVerifying && (
        <Container className={classes.container}>
          <form onSubmit={onSubmit}>
            <Input
              className={classes.item}
              type="email"
              label="이메일"
              onChange={email.onChange}
              inputProps={{ maxLength: 40 }}
              required
            />
            <Input
              className={classes.item}
              type="password"
              label="비밀번호 (8-20)"
              onChange={password1.onChange}
              inputProps={{ minLength: 8, maxLength: 20 }}
              required
            />
            <Input
              className={classes.item}
              type="password"
              label="비밀번호 확인"
              onChange={password2.onChange}
              inputProps={{ minLength: 8, maxLength: 20 }}
              required
            />
            <Input
              className={classes.item}
              type="text"
              label="닉네임 (3-10)"
              onChange={nickName.onChange}
              inputProps={{ minLength: 3, maxLength: 10 }}
              required
            />
            <Button className={classes.item} type="submit" variant="contained" color="primary">
              회원 가입
            </Button>
          </form>
          <Link to="/signin" underline="hover">
            로그인
          </Link>
        </Container>
      )}
    </div>
  );
};

export default withRouter(SignUp);
