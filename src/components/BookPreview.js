import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// components
import BookImage from "./BookImage";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  image: {
    margin: "auto",
    padding: "0px"
  },
  title: {
    margin: "auto",
    padding: "0px",
    fontWeight: 700,
    fontSize: "13px",
    maxWidth: "120px"
  },
  author: {
    margin: "auto",
    padding: "0px",
    fontWeight: 700,
    color: theme.palette.grey[600],
    fontSize: "11px",
    maxWidth: "120px"
  }
}));

const BookPreview = ({ className, book, author }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Link href={`/book/${book?.title}`} color="inherit" underline="none">
        <BookImage className={classes.image} src={book?.image} size="sm" />
        <Typography className={classes.title}>{book?.title}</Typography>
      </Link>
      <Link href={`/author/${book?.author?.name}`} color="inherit" underline="none">
        <Typography className={classes.author}>{book?.author?.name}</Typography>
      </Link>
    </div>
  );
};

BookPreview.propTypes = {
  className: PropTypes.string,
  author: PropTypes.string
};

export default BookPreview;
