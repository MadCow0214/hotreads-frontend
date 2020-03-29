import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

// hooks
import { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

// components
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import SearchInput from "../components/SearchInput";
import Link from "./Link";
import { LogoIcon, LogoText } from "./Icons";
import UserMenu from "./UserMenu";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    display: "flex",
    width: "100%",
    height: "70px",
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
    padding: "0 10px",
    "&:first-child": {
      flexGrow: 1,
      justifyContent: "flex-start"
    },
    "&:nth-child(2)": {
      flexGrow: props => (props.smallScreen ? 0 : 2)
    },
    "&:last-child": {
      flexGrow: 1,
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
  button: {
    fontSize: "30px",
    color: "white",
    "&:hover": {
      cursor: "pointer"
    }
  },
  searchBar: {
    background: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    padding: "0px 20px",
    width: "100%",
    height: "70px",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 3
  },
  loginText: {
    color: "white",
    fontWeight: 500,
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

const Header = ({ isLoggedIn, history }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles({ smallScreen: !matches });
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const onSearchChange = value => {
    setSearchBarOpen(false);

    if (typeof value === "string") {
      history.push(`/search?term=${value}`);
      return;
    }

    if (value.type === "저자") {
      history.push(`/author/${value.name}`);
      return;
    }

    if (value.type === "책") {
      history.push(`/book/${value.name}`);
      return;
    }
  };

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
          {matches && <SearchInput className={classes.searchInput} onChange={onSearchChange} />}
        </Box>
        <Box className={classes.column}>
          {!matches && (
            <SearchIcon
              className={classes.button}
              onClick={() => setSearchBarOpen(true)}
              style={{ marginRight: "5px" }}
            />
          )}
          {isLoggedIn && <UserMenu />}
          {!isLoggedIn && (
            <Link className={classes.loginText} to="/signin" underline="hover">
              로그인
            </Link>
          )}
        </Box>
      </Container>
      {!matches && (
        <Drawer
          anchor="top"
          variant="persistent"
          open={searchBarOpen}
          onClose={() => setSearchBarOpen(false)}
          disableScrollLock
        >
          <div className={classes.searchBar}>
            <SearchInput className={classes.searchInput} onChange={onSearchChange} />
            <CloseIcon
              className={classes.button}
              onClick={() => setSearchBarOpen(false)}
              style={{ marginLeft: "5px" }}
            />
          </div>
        </Drawer>
      )}
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
