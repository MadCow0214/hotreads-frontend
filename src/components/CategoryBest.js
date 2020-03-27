import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useQuery } from "@apollo/react-hooks";

// components
import BookImage from "./BookImage";
import Grid from "@material-ui/core/Grid";
import Link from "./Link";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import Skeleton from "@material-ui/lab/Skeleton";

const CATEGORY_BEST = gql`
  query categoryBest($category: Int!) {
    categoryBest(category: $category) {
      id
      image
      title
      author {
        id
        name
      }
      avgStar
      reviewCount
    }
  }
`;

const useStyles = makeStyles(theme => ({
  item: {
    display: "flex"
  },
  number: {
    display: "flex",
    alignItems: "center",
    padding: "0px 15px"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.25)"
  },
  title: {
    fontWeight: 700,
    fontSize: "13px"
  },
  author: {
    fontWeight: 700,
    color: theme.palette.grey[600],
    fontSize: "11px"
  },
  starContainer: {
    display: "flex"
  },
  starIcon: {
    color: "#F8B32E",
    fontSize: "18px"
  },
  avgStar: {
    margin: "auto 1px 0px",
    fontSize: "14px",
    fontWeight: "500"
  },
  reviewCount: {
    margin: "auto 0px 1px",
    fontSize: "10px"
  }
}));

const CategoryBest = ({ category }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(CATEGORY_BEST, { variables: { category } });

  if (data?.categoryBest) {
    data.categoryBest.sort((a, b) => b.avgStar - a.avgStar);
  }

  return (
    <Grid container spacing={3}>
      {!loading &&
        data.categoryBest.map((book, index) => (
          <Grid item className={classes.item} key={book.id} xs={6} sm={4}>
            <Link to={`/book/${book?.title}`}>
              <BookImage src={book.image} size="xxs" />
            </Link>
            <div className={classes.number}>
              <Typography variant="h5">{index + 1}</Typography>
            </div>
            <div className={classes.info}>
              <Link to={`/book/${book?.title}`}>
                <Typography className={classes.title}>{book?.title}</Typography>
              </Link>
              <Link to={`/author/${book.author.name}`}>
                <Typography className={classes.author}>{book.author.name}</Typography>
              </Link>
              <div className={classes.starContainer}>
                <StarIcon className={classes.starIcon} />
                <span className={classes.avgStar}>{` ${book.avgStar.toFixed(1)} `}</span>
                <span className={classes.reviewCount}>({book.reviewCount})</span>
              </div>
            </div>
          </Grid>
        ))}
      {loading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <Grid item className={classes.item} key={number} xs={6} sm={4}>
            <Skeleton variant="rect" width={120} height={90} />
            <div className={classes.number}>
              <Typography variant="h5">{number}</Typography>
            </div>
            <div className={classes.info}>
              <Skeleton variant="rect" height={13} />
              <Skeleton variant="rect" width="50%" height={11} />
              <div className={classes.starContainer}>
                <StarIcon className={classes.starIcon} />
                <span className={classes.avgStar}>{` 0.0 `}</span>
                <span className={classes.reviewCount}>(0)</span>
              </div>
            </div>
          </Grid>
        ))}
    </Grid>
  );
};

CategoryBest.propTypes = {
  category: PropTypes.number.isRequired
};

export default CategoryBest;
