import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { LogoIcon } from "../components/Icons";

const useStyles = makeStyles(theme => ({
  "@keyframes iconAnimation": {
    "0%": {
      opacity: 0.4
    },
    "5%": {
      opacity: 0.4
    },
    "45%": {
      opacity: 1
    },
    "55%": {
      opacity: 1
    },
    "95%": {
      opacity: 0.4
    },
    "100%": {
      opacity: 0.4
    }
  },
  root: {
    background: theme.palette.grey[200],
    width: "100%",
    minHeight: "100vh",
    paddingTop: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    animationName: "$iconAnimation",
    animationDuration: "1.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite"
  }
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <LogoIcon color="rgba(0,0,0,0.25)" />
      </div>
    </div>
  );
};

export default Loader;
