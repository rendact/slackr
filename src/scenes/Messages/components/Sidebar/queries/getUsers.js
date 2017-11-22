import gql from "graphql-tag";

export const getUsers = gql`
  query($id: ID!) {
    viewer {
      allUsers(where: { id: { notIn: [$id] } }) {
        edges {
          node {
            id
            username
          }
        }
      }
    }
  }
`;
