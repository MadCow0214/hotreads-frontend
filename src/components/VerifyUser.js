import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { LOCAL_LOG_IN } from "../sharedQueries";

//hooks
import useInput from "../hooks/useInput";

//components
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Input from "./Input";
import Helmet from "react-helmet";
import { LogoIcon } from "../components/Icons";

const VERIFY_USER = gql`
  mutation verifyUser($email: String!, $verifyCode: String!) {
    verifyUser(email: $email, verifyCode: $verifyCode) {
      error
      token
    }
  }
`;

const REQUSET_VERIFY_MAIL = gql`
  mutation requestVerifyMail($email: String!) {
    requestVerifyMail(email: $email)
  }
`;

const useStyles = makeStyles(theme => ({
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
  },
  sendText: {
    color: theme.palette.secondary.main,
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    }
  }
}));

const VerifyUser = ({ email }) => {
  const classes = useStyles();
  const verifyCode = useInput();
  const [verifyUserMutation] = useMutation(VERIFY_USER, {
    variables: { email, verifyCode: verifyCode.value }
  });
  const [verifyMailMutation] = useMutation(REQUSET_VERIFY_MAIL, { variables: { email } });
  const [localLoginMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();

    const { data } = await verifyUserMutation();

    if (data.verifyUser.error) {
      console.log("verifyUser error");
      return;
    }

    localLoginMutation({ variables: { token: data.verifyUser.token } });
  };

  return (
    <Container className={classes.container}>
      <Helmet>
        <title>계정 확인 | Hotread</title>
      </Helmet>
      <div className={classes.logo}>
        <LogoIcon />
      </div>
      <form onSubmit={onSubmit}>
        <Input
          className={classes.item}
          type="text"
          label="Verify Code"
          onChange={verifyCode.onChange}
          inputProps={{ maxLength: 40 }}
          required
        />
        <Button className={classes.item} type="submit" variant="contained" color="primary">
          확인
        </Button>
        <div className={classes.text}>
          {"이메일을 받지 못하셨나요? "}
          <span className={classes.sendText} onClick={verifyMailMutation}>
            다시보내기
          </span>
        </div>
      </form>
    </Container>
  );
};

VerifyUser.propTypes = {
  email: PropTypes.string.isRequired
};

export default VerifyUser;
