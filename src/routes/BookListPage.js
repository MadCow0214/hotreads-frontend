import React from "react";
import { gql } from "apollo-boost";
import { makeStyles } from "@material-ui/core/styles";

//hooks
import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

//components
import CategorySelector from "../components/CategorySelector";
import BookList from "../components/BookList";

const BOOK_LIST = gql`
  query bookList($category: Int!, $page: Int!) {
    bookList(category: $category, page: $page) {
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

const BOOK_COUNT = gql`
  query bookCount($category: Int!) {
    bookCount(category: $category)
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    minHeight: "100vh",
    paddingTop: "70px",
    display: "flex",
    justifyContent: "center"
  },
  container: {
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    width: "100%"
  },
  selector: {
    marginBottom: "30px"
  }
}));

const BookListPage = () => {
  const classes = useStyles();
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(1);
  const { data: countData, loading: countLoading } = useQuery(BOOK_COUNT, {
    variables: { category }
  });
  const { data, loading } = useQuery(BOOK_LIST, {
    variables: {
      category,
      page
    }
  });

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.selector}>
          <CategorySelector unselectedString="전체" onChange={setCategory} />
        </div>
        <BookList
          books={data?.bookList}
          loading={countLoading || loading}
          messageForNothing="등록된 책이 없습니다"
          page={page}
          pageCount={Math.ceil(countData?.bookCount / 12)}
          onPageChange={(e, newValue) => setPage(newValue)}
        />
      </div>
    </div>
  );
};

export default BookListPage;
