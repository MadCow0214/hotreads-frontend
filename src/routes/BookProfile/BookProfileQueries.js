import { gql } from "apollo-boost";

export const BOOK_BY_TITLE = gql`
  query bookByTitle($title: String!) {
    bookByTitle(title: $title) {
      id
      title
      subTitle
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
      wantedUserCount
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
