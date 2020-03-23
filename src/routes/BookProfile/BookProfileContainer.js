import React, { useState } from "react";
import BookProfilePresenter from "./BookProfilePresenter";
import {
  BOOK_BY_TITLE,
  ADD_REVIEW,
  TOGGLE_WANTED,
  REVIEWS_CACHE_FRAGMENT
} from "./BookProfileQueries";

// hooks
import { useQuery, useMutation } from "@apollo/react-hooks";

// components
import Loader from "../../components/Loader";

const BookProfileContainer = ({
  history,
  match: {
    params: { bookTitle }
  },
  isLoggedIn
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [star, setStar] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [wanted, setWanted] = useState(false);
  const [wantedCount, setWantedCount] = useState(0);
  const { data: bookData, loading: bookLoading } = useQuery(BOOK_BY_TITLE, {
    variables: { title: bookTitle },
    onCompleted: data => {
      setWanted(data.bookByTitle.isWanted);
      setWantedCount(data.bookByTitle.wantedUserCount);
    }
  });
  const [toggleWantedMutation, { loading: togglingWanted }] = useMutation(TOGGLE_WANTED, {
    variables: {
      bookId: bookData?.bookByTitle.id,
      curState: wanted
    }
  });
  const [addReviewMutation, { loading: addingReview }] = useMutation(ADD_REVIEW, {
    variables: {
      bookId: bookData?.bookByTitle.id,
      text: reviewText,
      star: star
    },
    update: (store, { data: { addReview } }) => {
      const data = store.readFragment({
        id: "Book:" + bookData.bookByTitle.id,
        fragment: REVIEWS_CACHE_FRAGMENT
      });

      store.writeFragment({
        id: "Book:" + bookData.bookByTitle.id,
        fragment: REVIEWS_CACHE_FRAGMENT,
        data: {
          reviews: [...data.reviews, addReview],
          __typename: data.__typename
        }
      });
    }
  });

  if (!bookLoading && !bookData) {
    history.push("/");
    return null;
  }

  const onBookmarkClick = event => {
    event.preventDefault();

    if (!isLoggedIn) {
      console.log("please log in!");
      return;
    }

    if (bookLoading) {
      console.log("wait!");
      return;
    }

    if (togglingWanted) {
      console.log("wait!");
      return;
    }

    toggleWantedMutation();
    setWanted(!wanted);
    setWantedCount(wanted ? wantedCount - 1 : wantedCount + 1);
  };

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
          isWanted={wanted}
          wantedCount={wantedCount}
          onBookmarkClick={onBookmarkClick}
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
