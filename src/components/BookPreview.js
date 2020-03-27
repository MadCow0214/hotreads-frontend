import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// components
import Box from "@material-ui/core/Box";
import BookImage, { sizeList } from "./BookImage";
import Typography from "@material-ui/core/Typography";
import Link from "./Link";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex"
  },
  container: {
    margin: "auto"
  },
  title: {
    fontWeight: 700,
    fontSize: "13px",
    maxWidth: props => sizeList[props.size].w
  },
  author: {
    fontWeight: 700,
    color: theme.palette.grey[600],
    fontSize: "11px",
    maxWidth: props => sizeList[props.size].w
  }
}));

const BookPreview = ({ className, book, imageSize }) => {
  const classes = useStyles({ size: imageSize });

  return (
    <>
      {book && (
        <div className={`${classes.wrapper} ${className}`}>
          <Box className={classes.container}>
            <Link to={`/book/${book?.title}`}>
              <BookImage className={classes.image} src={book?.image} size={imageSize} />
              <Typography className={classes.title}>{book?.title}</Typography>
            </Link>
            <Link to={`/author/${book?.author?.name}`}>
              <Typography className={classes.author}>{book?.author?.name}</Typography>
            </Link>
          </Box>
        </div>
      )}
      {!book && (
        <div className={`${classes.wrapper} ${className}`}>
          <Box className={classes.container}>
            <Skeleton
              className={classes.image}
              variant="rect"
              width={sizeList[imageSize].w}
              height={sizeList[imageSize].h}
            />
            <Skeleton variant="rect" width={sizeList[imageSize].w * 0.8} height={13} />
            <Skeleton variant="rect" width={sizeList[imageSize].w * 0.5} height={11} />
          </Box>
        </div>
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
