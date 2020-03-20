import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useQuery } from "@apollo/react-hooks";

// components
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Input from "./Input";
import Link from "@material-ui/core/Link";
import { LogoIcon, LogoText } from "./Icons";
import { Typography } from "@material-ui/core";

const ME = gql`
  query me {
    me {
      avatar
      nickName
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    display: "flex",
    width: "100%",
    height: "100px",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 2
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  column: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    minWidth: "150px",
    padding: "0 10px",
    "&:first-child": {
      justifyContent: "flex-start"
    },
    "&:last-child": {
      justifyContent: "flex-end"
    }
  },
  searchInput: {
    width: "100%"
  },
  homeLink: {
    display: "flex",
    minWidth: "150px"
  },
  loginText: {
    color: "white",
    fontWeight: 500,
    "&:hover": {
      cursor: "pointer"
    }
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: "5px"
  }
}));

const Header = ({ isLoggedIn }) => {
  const classes = useStyles();
  let meData;

  if (isLoggedIn) {
    const { data } = useQuery(ME);
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="md">
        <Box className={classes.column}>
          <Link className={classes.homeLink} href="/">
            <LogoIcon />
            <LogoText />
          </Link>
        </Box>
        <Box className={classes.column}>
          <Input className={classes.searchInput} placeHolder="제목/저자" />
        </Box>
        <Box className={classes.column}>
          {isLoggedIn && (
            <>
              <Avatar className={classes.avatar} src={loading ? "" : data.me.avatar} />
              <Typography className={classes.loginText}>
                {loading ? "" : data.me.nickName}
              </Typography>
            </>
          )}
          {!isLoggedIn && (
            <Link className={classes.loginText} href="/signin" underline="hover">
              로그인
            </Link>
          )}
        </Box>
      </Container>
    </div>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool
};

Header.defaultProps = {
  isLoggedIn: false
};

export default withRouter(Header);
