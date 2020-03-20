import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// components
import Box from "@material-ui/core/Box";

const getWidth = size => {
  if (size === "md") {
    return 160;
  }
  if (size === "lg") {
    return 200;
  }
  return 160;
};

const getHeight = size => {
  if (size === "md") {
    return 240;
  }
  if (size === "lg") {
    return 300;
  }
  return 240;
};

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    width: props => getWidth(props.size) + 2,
    height: props => getHeight(props.size) + 2,
    border: "1px solid rgba(0,0,0,0.25)"
  },
  gradient: {
    position: "absolute",
    left: 0,
    top: 0,
    width: props => getWidth(props.size),
    height: props => getHeight(props.size),
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,0) 95%, rgba(0,0,0,0.2) 100%)"
  }
}));

const BookImage = ({ src, size }) => {
  const classes = useStyles({ size });

  return (
    <Box className={classes.root}>
      <img src={src} alt="" width={getWidth(size)} height={getHeight(size)} />
      <div className={classes.gradient} />
    </Box>
  );
};

BookImage.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"])
};

BookImage.defaultProps = {
  size: "md"
};

export default BookImage;
