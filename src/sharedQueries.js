import { gql } from "apollo-boost";

export const ME = gql`
  query me {
    me {
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
