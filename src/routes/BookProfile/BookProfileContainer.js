import React, { useState } from "react";
import BookProfilePresenter from "./BookProfilePresenter";
import { BOOK_BY_TITLE } from "./BookProfileQueries";
import { ME } from "../../sharedQueries";

// hooks
import { useQuery } from "@apollo/react-hooks";

const BookProfileContainer = ({
  match: {
    params: { bookTitle }
  },
  isLoggedIn
}) => {
  const { data: bookData, loading: bookLoading } = useQuery(BOOK_BY_TITLE, {
    variables: { title: bookTitle }
  });

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <BookProfilePresenter
      isLoggedIn={isLoggedIn}
      book={bookData?.bookByTitle}
      tabIndex={tabIndex}
      handleTabChange={handleTabChange}
    />
  );
};

export default BookProfileContainer;
