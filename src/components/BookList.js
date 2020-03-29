import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

// components
import BookPreview from "./BookPreview";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import { LogoIcon } from "./Icons";

const useStyles = makeStyles(theme => ({
  "@keyframes iconAnimation": {
    "0%": {
      opacity: 0.4
    },
    "5%": {
      opacity: 0.4
    },
    "45%": {
      opacity: 1
    },
    "55%": {
      opacity: 1
    },
    "95%": {
      opacity: 0.4
    },
    "100%": {
      opacity: 0.4
    }
  },
  emptyGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh"
  },
  container: {
    minHeight: "80vh"
  },
  pagination: {
    margin: "30px 0px"
  },
  icon: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animationName: "$iconAnimation",
    animationDuration: "1.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite"
  }
}));

const BookList = ({ books, loading, messageForNothing, page, pageCount, onPageChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {loading && (
        <div className={classes.icon}>
          <LogoIcon color="rgba(0,0,0,0.25)" />
        </div>
      )}
      {!loading && (
        <Grid container className={classes.container} spacing={3} alignContent="flex-start">
          {books.length <= 0 && (
            <Grid item className={classes.emptyGrid} key="empty" xs={12}>
              {messageForNothing}
            </Grid>
          )}
          {books.length > 0 &&
            books.map(book => (
              <Grid item key={book.id} xs={4} sm={3}>
                <BookPreview book={book} imageSize={!matches ? "xs" : "sm"} />
              </Grid>
            ))}
        </Grid>
      )}
      <Pagination
        className={classes.pagination}
        page={page}
        onChange={onPageChange}
        count={pageCount}
        color="primary"
        siblingCount={2}
        size={!matches ? "small" : "medium"}
      />
    </>
  );
};

export default BookList;
