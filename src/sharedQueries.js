import { gql } from "apollo-boost";

export const ME = gql`
  query me {
    me {
      id
      avatar
      nickName
    }
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation localLogIn($token: String!) {
    localLogIn(token: $token) @client
  }
`;

export const SEARCH_AUTHOR = gql`
  query searchAuthor($term: String!, $count: Int!) {
    searchAuthor(term: $term, count: $count) {
      id
      name
    }
  }
`;
