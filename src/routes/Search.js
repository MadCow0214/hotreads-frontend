import React from "react";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";

// hooks
import { useQuery } from "@apollo/react-hooks";

// components
import Box from "@material-ui/core/Box";
import BookList from "../components/BookList";
import Chip from "@material-ui/core/Chip";
import Helmet from "react-helmet";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";

const SEARCH = gql`
  query search($term: String!, $authorCount: Int!, $bookCount: Int!) {
    searchAuthor(term: $term, count: $authorCount) {
      id
      name
    }
    searchBook(term: $term, count: $bookCount) {
      id
      image
      title
      author {
        id
        name
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.grey[100],
    minHeight: "100vh",
    paddingTop: "70px"
  },
  container: {
    padding: "40px 20px",
    maxWidth: 800,
    width: "100%"
  },
  menuTitle: {
    marginBottom: "15px",
    paddingBottom: "10px",
    width: "100%",
    borderBottom: `2px solid ${theme.palette.grey[500]}`
  },
  authorContainer: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const Search = ({ location: { search } }) => {
  const searchTerm = search.split("=")[1];
  const classes = useStyles();
  const { data, loading } = useQuery(SEARCH, {
    skip: !Boolean(searchTerm),
    variables: { term: searchTerm, authorCount: 10, bookCount: 12 }
  });

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{`검색: ${searchTerm} | Hotread`}</title>
      </Helmet>
      <div className={classes.container}>
        <Box className={classes.menuTitle}>
          <Typography variant="h5" component="div" style={{ marginBottom: "10px" }}>
            작가
          </Typography>
          <div className={classes.authorContainer} style={{ minHeight: "40px" }}>
            {loading && <Chip label="검색중..." />}
            {!loading &&
              data?.searchAuthor?.map(author => (
                <Link key={author.id} to={`/author/${author.name}`}>
                  <Chip label={author.name} clickable style={{ margin: "5px 5px" }} />
                </Link>
              ))}
          </div>
        </Box>
        <Typography variant="h5" component="div" style={{ marginBottom: "20px" }}>
          책
        </Typography>
        <BookList
          books={data?.searchBook}
          loading={loading}
          messageForNothing="검색된 책이 없습니다"
          page={1}
          pageCount={1}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
};

export default Search;
