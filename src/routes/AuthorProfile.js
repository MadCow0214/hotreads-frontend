import React from "react";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useQuery } from "@apollo/react-hooks";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.grey[100],
    width: "100%",
    minHeight: "100vh",
    paddingTop: "140px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    width: "100%",
    padding: "0 20px"
  }
}));

const AuthorProfile = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>작가 프로필</div>
    </div>
  );
};

export default AuthorProfile;
