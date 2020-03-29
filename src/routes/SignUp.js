import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

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
import { LogoIcon } from "../components/Icons";

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
    alignItems: "center",
    maxWidth: "340px",
    border: "1px solid rgba(0,0,0,0.25)",
    borderRadius: "5px",
    padding: "20px"
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "56px",
    height: "56px",
    background: theme.palette.primary.main,
    borderRadius: "10px",
    marginBottom: "20px"
  },
  item: {
    width: "100%",
    "&:not(:first-child)": {
      marginTop: "10px"
    }
  },
  text: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5px"
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
      toast.error("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
      return;
    }

    const { data } = await registerUserMutation();

    if (data.registerUser.error === 1) {
      toast.error("이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.");
      return;
    }

    if (data.registerUser.error === 2) {
      toast.error("이미 가입한 이메일입니다. 로그인해주세요.");
      return;
    }

    setIsVerifying(true);
  };

  return (
    <div className={classes.root}>
      {isVerifying && <VerifyUser email={email.value} />}
      {!isVerifying && (
        <Container className={classes.container}>
          <Helmet>
            <title>회원가입 | Hotread</title>
          </Helmet>
          <div className={classes.logo}>
            <LogoIcon />
          </div>
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
          <div className={classes.text}>
            {"이미 회원이신가요? "}
            <Link to="/signin" underline="hover" color="secondary">
              로그인
            </Link>
          </div>
        </Container>
      )}
    </div>
  );
};

export default withRouter(SignUp);
