import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// components
import BookImage from "./BookImage";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontWeight: 700
  }
}));

const BookPreview = ({ className }) => {
  const classes = useStyles();

  return (
    <Container className={className}>
      <div className={classes.root}>
        <BookImage src="https://img.ridicdn.net/cover/703000594/xxlarge" size="md" />
        <Typography className={classes.title}>유 미 에브리싱</Typography>
      </div>
    </Container>
  );
};

BookPreview.propTypes = {
  className: PropTypes.string
};

export default BookPreview;
