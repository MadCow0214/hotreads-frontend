import React from "react";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

// components
import Typography from "@material-ui/core/Typography";
import Loader from "../components/Loader";
import BookList from "../components/BookList";
import Helmet from "react-helmet";

const AUTHOR_BY_NAME = gql`
  query authorByName($name: String!) {
    authorByName(name: $name) {
      id
      name
      desc
      bookCount
    }
  }
`;

const BOOK_BY_AUTHOR = gql`
  query bookByAuthor($name: String!, $page: Int!) {
    bookByAuthor(name: $name, page: $page) {
      id
      image
      title
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
    paddingTop: "110px"
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
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(AUTHOR_BY_NAME, { variables: { name } });
  const { data: bookData, loading: bookLoading } = useQuery(BOOK_BY_AUTHOR, {
    variables: { name, page }
  });

  const author = data?.authorByName;
  const books = bookData?.bookByAuthor;

  return (
    <>
      <Helmet>
        <title>{name} | Hotread</title>
      </Helmet>
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
            <BookList
              books={books}
              loading={bookLoading}
              messageForNothing="저서가 없습니다"
              page={page}
              pageCount={Math.ceil(author?.bookCount / 12)}
              onPageChange={(e, newValue) => setPage(newValue)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorProfile;
