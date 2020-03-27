import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// components
import Box from "@material-ui/core/Box";

export const sizeList = {
  xxs: { w: 60, h: 90 },
  xs: { w: 80, h: 120 },
  sm: { w: 120, h: 180 },
  md: { w: 160, h: 240 },
  lg: { w: 200, h: 300 }
};

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    width: props => sizeList[props.size].w + 2,
    height: props => sizeList[props.size].h + 2,
    border: "1px solid rgba(0,0,0,0.25)",
    background: "white"
  },
  gradient: {
    position: "absolute",
    left: 0,
    top: 0,
    width: props => sizeList[props.size].w,
    height: props => sizeList[props.size].h,
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 5%, rgba(0,0,0,0) 95%, rgba(0,0,0,0.2) 100%)"
  }
}));

const BookImage = ({ id, src, size, className }) => {
  const classes = useStyles({ size });

  return (
    <Box className={`${classes.root} ${className}`}>
      {src && (
        <>
          <img id={id} src={src} alt="" width={sizeList[size].w} height={sizeList[size].h} />
          <div className={classes.gradient} />
        </>
      )}
    </Box>
  );
};

BookImage.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.oneOf(["xxs", "xs", "sm", "md", "lg"]),
  className: PropTypes.string
};

BookImage.defaultProps = {
  size: "md"
};

export default BookImage;
