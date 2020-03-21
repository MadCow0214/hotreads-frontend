import { gql } from "apollo-boost";

export const BOOK_BY_TITLE = gql`
  query bookByTitle($title: String!) {
    bookByTitle(title: $title) {
      id
      title
      image
      desc
    }
  }
`;
