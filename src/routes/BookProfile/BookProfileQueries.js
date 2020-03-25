import { gql } from "apollo-boost";

export const BOOK_BY_TITLE = gql`
  query bookByTitle($title: String!) {
    bookByTitle(title: $title) {
      id
      title
      subtitle
      category
      author {
        id
        name
        desc
        books {
          id
          title
          image
        }
      }
      company
      image
      desc
      publishDate
      avgStar
      wantedCount
      reviewCount
      isWanted
      reviews {
        id
        user {
          id
          avatar
          nickName
        }
        text
        star
        createdAt
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($bookId: String!, $text: String, $star: Int!) {
    addReview(bookId: $bookId, text: $text, star: $star) {
      id
      user {
        id
        nickName
        avatar
      }
      text
      star
      createdAt
    }
  }
`;

export const TOGGLE_WANTED = gql`
  mutation toggleWanted($bookId: String!, $curState: Boolean!) {
    toggleWanted(bookId: $bookId, curState: $curState)
  }
`;

export const REVIEWS_CACHE_FRAGMENT = gql`
  fragment reviewedBook on Book {
    avgStar
    reviewCount
    reviews {
      id
      __typename
    }
    __typename
  }
`;
