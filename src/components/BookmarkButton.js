import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// components
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles(theme => ({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    width: "36px",
    height: "36px",
    borderRadius: "5px",
    border: `1px solid rgba(0,0,0,0.25)`,
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

const BookmarkButton = ({ className, marked, onClick }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      {marked && (
        <div className={classes.button} onClick={onClick}>
          <BookmarkIcon color="primary" fontSize="large" />
        </div>
      )}
      {!marked && (
        <div className={classes.button} onClick={onClick}>
          <BookmarkBorderIcon color="primary" fontSize="large" />
        </div>
      )}
    </div>
  );
};

BookmarkButton.propTypes = {
  className: PropTypes.string,
  marked: PropTypes.bool,
  onClick: PropTypes.func
};

BookmarkButton.defaultProps = {
  marked: false
};

export default BookmarkButton;
