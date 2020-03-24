import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../util";

// components
import Box from "@material-ui/core/Box";
import BookImage from "./BookImage";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: "10px 10px",
    "&:not(last-child)": {
      borderBottom: "1px solid rgba(0,0,0,0.25)"
    }
  },
  reviewColumn: {
    padding: "0px 5px",
    "&:first-child": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    "&:last-child": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "28px",
      marginLeft: "auto"
    }
  },
  title: {
    fontWeight: 700,
    fontSize: "13px",
    maxWidth: "120px"
  },
  author: {
    fontWeight: 700,
    color: theme.palette.grey[600],
    fontSize: "11px",
    maxWidth: "120px",
    marginBottom: "6px"
  },
  star: {
    marginBottom: "5px"
  }
}));

const ProfileReview = ({ review }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.reviewColumn}>
        <Link href={`/book/${review.book.title}`} color="inherit" underline="none">
          <BookImage src={review.book.image} size="xs" />
        </Link>
      </Box>
      <Box className={classes.reviewColumn}>
        <Link href={`/book/${review.book.title}`} color="inherit" underline="none">
          <Typography className={classes.title}>{review.book.title}</Typography>
        </Link>
        <Link href={`/author/${review.book.author?.name}`} color="inherit" underline="none">
          <Typography className={classes.author}>{review.book.author?.name}</Typography>
        </Link>
        <Typography>{review.text}</Typography>
      </Box>
      <Box className={classes.reviewColumn}>
        <Rating
          value={review.star}
          precision={0.5}
          className={classes.star}
          size="small"
          readOnly
        />
        <Typography variant="caption" component="div">
          {formatDate(review.createdAt)}
        </Typography>
      </Box>
    </div>
  );
};

export default ProfileReview;
