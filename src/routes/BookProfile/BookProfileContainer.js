import React, { useState } from "react";
import BookProfilePresenter from "./BookProfilePresenter";
import {
  BOOK_BY_TITLE,
  ADD_REVIEW,
  TOGGLE_WANTED,
  BOOK_REVIEWS_CACHE_FRAGMENT,
  USER_REVIEWS_CACHE_FRAGMENT
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
      setWantedCount(data.bookByTitle.wantedCount);
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
      const cacheBook = store.readFragment({
        id: "Book:" + bookData.bookByTitle.id,
        fragment: BOOK_REVIEWS_CACHE_FRAGMENT
      });

      store.writeFragment({
        id: "Book:" + bookData.bookByTitle.id,
        fragment: BOOK_REVIEWS_CACHE_FRAGMENT,
        data: {
          avgStar:
            (cacheBook.avgStar * cacheBook.reviewCount + addReview.star) /
            (cacheBook.reviewCount + 1),
          reviewCount: cacheBook.reviewCount + 1,
          reviews: [...cacheBook.reviews, addReview],
          __typename: cacheBook.__typename
        }
      });

      const cacheUser = store.readFragment({
        id: "User:" + addReview.user.id,
        fragment: USER_REVIEWS_CACHE_FRAGMENT
      });

      store.writeFragment({
        id: "User:" + addReview.user.id,
        fragment: USER_REVIEWS_CACHE_FRAGMENT,
        data: {
          reviews: [...cacheUser.reviews, addReview],
          __typename: cacheUser.__typename
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

  const handleTabSwipeChange = index => {
    setTabIndex(index);
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
          handleTabSwipeChange={handleTabSwipeChange}
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
