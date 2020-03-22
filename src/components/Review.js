import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// components
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Avartar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

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
  text: {
    padding: "0 20px"
  },
  user: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px"
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
        <div className={classes.user}>
          <Avartar className={classes.avatar} />
          <Typography variant="subtitle2" noWrap>
            손한성
          </Typography>
        </div>
        <Typography variant="caption" component="div">
          2020.03.21
        </Typography>
      </Box>
      <div className={classes.reviewColumn}>
        <Typography className={classes.text} variant="body1" component="div">
          책 아주 재밌어요책 아주 재밌어요책 아주 재밌어요책 아주 재밌어요책 아주 재밌어요책 아주
          재밌어요책 아주 재밌어요책 아주 재밌어요책 아주 재밌어요책 아주 재밌어요책 아주 재밌어요책
          아주 재밌어요책 아주 재밌어요책 아주 재밌어요책 아주 재밌어요책 아주 재밌어요책 아주
          재밌어요책 아주 재밌어요책 아주 재밌어요
        </Typography>
      </div>
      <div className={classes.reviewColumn}>
        <Rating className={classes.star} size="small" readOnly />
      </div>
    </div>
  );
};

export default Review;
