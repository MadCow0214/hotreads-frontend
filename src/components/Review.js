import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../util";

// components
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Avartar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: "10px 20px"
  },
  reviewColumn: {
    "&:first-child": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    "&:last-child": {
      marginLeft: "auto"
    }
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600"
  },
  text: {
    padding: "0 20px"
  },
  user: {
    display: "flex",
    alignItems: "center",
    width: "110px"
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: "5px"
  },
  star: {
    marginTop: "5px"
  }
}));

const Review = ({ review }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.reviewColumn}>
        <Link
          href={`/user/${review.user.nickName}`}
          className={classes.user}
          color="inherit"
          underline="none"
        >
          <Avartar className={classes.avatar} src={review.user.avatar} />
          <Typography className={classes.userName} variant="subtitle2" component="div" noWrap>
            {review.user.nickName}
          </Typography>
        </Link>
        <Typography variant="caption" component="div">
          {formatDate(review.createdAt)}
        </Typography>
      </Box>
      <div className={classes.reviewColumn}>
        <Typography className={classes.text} variant="body1" component="div">
          {review.text}
        </Typography>
      </div>
      <div className={classes.reviewColumn}>
        <Rating
          value={review.star}
          precision={0.5}
          className={classes.star}
          size="small"
          readOnly
        />
      </div>
    </div>
  );
};

export default Review;
