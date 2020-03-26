import React from "react";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useQuery } from "@apollo/react-hooks";

// components
import Typography from "@material-ui/core/Typography";
import Loader from "../components/Loader";
import Grid from "@material-ui/core/Grid";
import BookPreview from "../components/BookPreview";

const AUTHOR_BY_NAME = gql`
  query authorByName($name: String!) {
    authorByName(name: $name) {
      id
      name
      desc
      books {
        id
        image
        title
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.grey[100],
    width: "100%",
    minHeight: "100vh",
    paddingTop: "140px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    width: "100%",
    padding: "0px 20px 40px"
  },
  name: {
    marginBottom: "20px"
  },
  desc: {
    paddingBottom: "20px",
    marginBottom: "40px",
    borderBottom: `2px solid ${theme.palette.grey[500]}`
  }
}));

const AuthorProfile = ({
  match: {
    params: { name }
  }
}) => {
  const classes = useStyles();
  const { data, loading } = useQuery(AUTHOR_BY_NAME, { variables: { name } });

  const author = data?.authorByName;

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className={classes.root}>
          <div className={classes.container}>
            <Typography className={classes.name} variant="h4">
              {author.name}
            </Typography>
            <Typography className={classes.desc} variant="body1">
              {author.desc}
            </Typography>
            <Grid container spacing={3}>
              {author.books.length <= 0 && (
                <Grid item className={classes.emptyGrid} key="emptyReview" xs={12}>
                  저서가 없습니다.
                </Grid>
              )}
              {author.books.map(book => (
                <Grid item key={book.id} xs={4} sm={3}>
                  <BookPreview book={book} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorProfile;
