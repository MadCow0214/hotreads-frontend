import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// components
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Input from "../../components/Input";
import VerifyUser from "../../components/VerifyUser";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[200],
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
              placeHolder="Email"
              maxLength={30}
              onChange={onEmailChange}
            />
            <Input
              className={classes.item}
              type="password"
              placeHolder="Password"
              minLength={8}
              maxLength={20}
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
          <Link to="/signup">계정 만들기</Link>
        </Container>
      )}
    </div>
  );
};

export default SignInPresenter;
