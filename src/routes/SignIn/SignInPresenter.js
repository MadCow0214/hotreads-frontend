import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Input from "../../components/Input";
import VerifyUser from "../../components/VerifyUser";
import Link from "../../components/Link";
import Helmet from "react-helmet";
import { LogoIcon, GoogleIcon } from "../../components/Icons";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    minHeight: "85vh",
    paddingTop: "70px",
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
    marginTop: "5px",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(0,0,0,0.25)"
  },
  googleButon: {
    width: "100%",
    marginTop: "29px",
    background: "white"
  }
}));

const SignInPresenter = ({
  onSubmit,
  onGoogleButtonClick,
  onEmailChange,
  onPasswordChange,
  verifyEmail
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {verifyEmail && <VerifyUser email={verifyEmail} />}
      {!verifyEmail && (
        <Container className={classes.container}>
          <Helmet>
            <title>로그인 | Hotread</title>
          </Helmet>
          <div className={classes.logo}>
            <LogoIcon />
          </div>
          <form onSubmit={onSubmit}>
            <Input
              className={classes.item}
              type="email"
              label="이메일"
              inputProps={{ maxLength: 40 }}
              onChange={onEmailChange}
            />
            <Input
              className={classes.item}
              type="password"
              label="비밀번호"
              inputProps={{ minLength: 8, maxLength: 20 }}
              onChange={onPasswordChange}
            />
            <Button className={classes.item} type="submit" variant="contained" color="primary">
              로그인
            </Button>
            <div className={classes.text}>
              {"계정이 없으신가요? "}
              <Link to="/signup" underline="hover" color="secondary">
                회원가입
              </Link>
            </div>
          </form>
          <Button
            className={classes.googleButon}
            variant="contained"
            onClick={onGoogleButtonClick}
            startIcon={<GoogleIcon />}
          >
            Google 계정으로 로그인
          </Button>
        </Container>
      )}
    </div>
  );
};

export default SignInPresenter;
