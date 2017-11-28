import gql from "graphql-tag";

export const getUser = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      username
      lastLogin
      fullname
      displayname
      avatar {
        id
        blobUrl
      }
    }
  }
`;
