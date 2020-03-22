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
