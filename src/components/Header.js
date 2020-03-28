import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

// components
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import SearchInput from "../components/SearchInput";
import Link from "./Link";
import { LogoIcon, LogoText } from "./Icons";
import UserMenu from "./UserMenu";

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
    justifyContent: "center",
    padding: 0
  },
  column: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    minWidth: "120px",
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
  }
}));

const Header = ({ isLoggedIn }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="md">
        <Box className={classes.column}>
          <Link className={classes.homeLink} to="/">
            <LogoIcon />
            <LogoText />
          </Link>
        </Box>
        <Box className={classes.column}>
          <SearchInput className={classes.searchInput} />
        </Box>
        <Box className={classes.column}>
          {isLoggedIn && <UserMenu />}
          {!isLoggedIn && (
            <Link className={classes.loginText} to="/signin" underline="hover">
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

export default Header;
