import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Input from "../../components/Input";
import VerifyUser from "../../components/VerifyUser";
import Link from "../../components/Link";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    minHeight: "100vh",
    paddingTop: "70px",
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
          </form>
          <Button
            className={classes.item}
            variant="contained"
            color="primary"
            onClick={onGoogleButtonClick}
          >
            구글
          </Button>
          <Link to="/signup" underline="hover">
            계정 만들기
          </Link>
        </Container>
      )}
    </div>
  );
};

export default SignInPresenter;
