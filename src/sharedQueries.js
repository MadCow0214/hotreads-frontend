import { gql } from "apollo-boost";

export const BOOK_BY_NAME = gql`
  query bookByName($title: String!) {
    bookByName(title: $title) {
      id
    }
  }
`;
