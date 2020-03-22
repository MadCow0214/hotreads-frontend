import React, { useState } from "react";
import { gql } from "apollo-boost";
import BookProfilePresenter from "./BookProfilePresenter";
import { BOOK_BY_TITLE, ADD_REVIEW } from "./BookProfileQueries";

// hooks
import { useQuery, useMutation } from "@apollo/react-hooks";

// components
import Loader from "../../components/Loader";

const BookProfileContainer = ({
  match: {
    params: { bookTitle }
  },
  isLoggedIn
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [star, setStar] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { data: bookData, loading: bookLoading } = useQuery(BOOK_BY_TITLE, {
    variables: { title: bookTitle }
  });
  const [addReviewMutation, { loading: addingReview }] = useMutation(ADD_REVIEW, {
    variables: {
      bookId: bookData?.bookByTitle.id,
      text: reviewText,
      star: star
    },
    update: (store, { data: { addReview } }) => {
      const fragment = gql`
        fragment reviewedBook on Book {
          reviews {
            id
            __typename
          }
          __typename
        }
      `;

      const data = store.readFragment({ id: "Book:" + bookData.bookByTitle.id, fragment });

      store.writeFragment({
        id: "Book:" + bookData.bookByTitle.id,
        fragment,
        data: {
          reviews: [...data.reviews, addReview],
          __typename: data.__typename
        }
      });
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const onStarChange = (event, number) => {
    setStar(number);
  };

  const onReviewTextChange = event => {
    setReviewText(event.target.value);
  };

  const onReviewSubmit = e => {
    e.preventDefault();

    if (bookLoading) {
      console.log("wait!");
      return;
    }

    if (addingReview) {
      console.log("wait!");
      return;
    }

    addReviewMutation();
    setReviewText("");
    setStar(0);
  };

  return (
    <>
      {bookLoading && <Loader />}
      {!bookLoading && (
        <BookProfilePresenter
          isLoggedIn={isLoggedIn}
          book={bookData?.bookByTitle}
          tabIndex={tabIndex}
          handleTabChange={handleTabChange}
          star={star}
          onStarChange={onStarChange}
          reviewText={reviewText}
          onReviewTextChange={onReviewTextChange}
          onReviewSubmit={onReviewSubmit}
        />
      )}
    </>
  );
};

export default BookProfileContainer;
