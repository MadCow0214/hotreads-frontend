import React from "react";
import { makeStyles } from "@material-ui/core/styles";

//components
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    width: "100%",
    height: "150px",
    borderTop: "1px solid rgba(0,0,0,0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: "16px",
    margin: "50px 0px"
  },
  copyright: {
    color: theme.palette.text.secondary
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.footer} maxWidth="md">
        <span className={classes.copyright}>HotRead {new Date().getFullYear()} &copy;</span>
      </Container>
    </div>
  );
};

export default Footer;
