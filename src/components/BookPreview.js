import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// components
import Box from "@material-ui/core/Box";
import BookImage from "./BookImage";
import Typography from "@material-ui/core/Typography";
import Link from "./Link";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  image: {},
  title: {
    fontWeight: 700,
    fontSize: "13px",
    maxWidth: "120px"
  },
  author: {
    fontWeight: 700,
    color: theme.palette.grey[600],
    fontSize: "11px",
    maxWidth: "120px"
  }
}));

const BookPreview = ({ className, book, imageSize }) => {
  const classes = useStyles();

  return (
    <>
      {book && (
        <Box className={className}>
          <Link to={`/book/${book?.title}`}>
            <BookImage className={classes.image} src={book?.image} size={imageSize} />
            <Typography className={classes.title}>{book?.title}</Typography>
          </Link>
          <Link to={`/author/${book?.author?.name}`}>
            <Typography className={classes.author}>{book?.author?.name}</Typography>
          </Link>
        </Box>
      )}
      {!book && (
        <Box className={className}>
          <Skeleton className={classes.image} variant="rect" width={160} height={240} />
          <Skeleton variant="rect" width={120} height={13} />
          <Skeleton variant="rect" width={60} height={11} />
        </Box>
      )}
    </>
  );
};

BookPreview.propTypes = {
  className: PropTypes.string,
  imageSize: PropTypes.string
};

BookPreview.defaultProps = {
  imageSize: "sm"
};

export default BookPreview;
