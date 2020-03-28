import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "../util";

// components
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Avartar from "@material-ui/core/Avatar";
import Link from "./Link";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: "15px 0px",
    borderBottom: "1px solid rgba(0,0,0,0.25)"
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600"
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={2}>
          <Link to={`/user/${review.user.nickName}`} className={classes.user}>
            <Avartar className={classes.avatar} src={review.user.avatar} />
            <Typography className={classes.userName} variant="subtitle2" component="div" noWrap>
              {review.user.nickName}
            </Typography>
          </Link>
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
        </Grid>
        <Grid item xs={12} sm={10}>
          <Typography variant="body2" component="div">
            {review.text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Review;
