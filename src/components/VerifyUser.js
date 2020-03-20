import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";

//hooks
import useInput from "../hooks/useInput";

//components
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Input from "../components/Input";

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
    maxWidth: "400px"
  },
  item: {
    width: "100%",
    "&:not(:first-child)": {
      marginTop: "10px"
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

  const onSubmit = async e => {
    e.preventDefault();

    const { data } = await verifyUserMutation();

    if (data.verifyUser.error) {
    }

    //로그인
  };

  return (
    <Container className={classes.container}>
      <form onSubmit={onSubmit}>
        <Input
          className={classes.item}
          type="text"
          placeHolder="Verify Code"
          onChange={verifyCode.onChange}
          required
        />
        <Button className={classes.item} type="submit" variant="contained" color="primary">
          확인
        </Button>
        <span onClick={verifyMailMutation}>다시보내기</span>
      </form>
    </Container>
  );
};

VerifyUser.propTypes = {
  email: PropTypes.string.isRequired
};

export default VerifyUser;
