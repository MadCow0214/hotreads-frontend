import React from "react";
import BookProfilePresenter from "./BookProfilePresenter";

const BookProfileContainer = ({
  match: {
    params: { bookTitle }
  }
}) => {
  return <BookProfilePresenter />;
};

export default BookProfilePresenter;
