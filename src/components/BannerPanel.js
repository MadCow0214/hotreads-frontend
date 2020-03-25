import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import BookPreview from "./BookPreview";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  title: {
    paddingLeft: "20px",
    marginBottom: "15px"
  }
}));

const fakeArray = [null, null, null, null];

const BannerPanel = ({ title, books, loading }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.title}>
        <Typography variant="h5">{title}</Typography>
      </Box>
      {loading && (
        <Grid container spacing={3}>
          {fakeArray.map((book, index) => (
            <Grid item key={index} xs={6} sm={3}>
              <BookPreview className={classes.bookPreview} book={book} imageSize={"md"} />
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && (
        <Grid container spacing={3}>
          {books.map(book => (
            <Grid item key={book.id} xs={6} sm={3}>
              <BookPreview className={classes.bookPreview} book={book} imageSize={"md"} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default BannerPanel;