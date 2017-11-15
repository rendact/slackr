import gql from "graphql-tag";

export const getChannel = gql`
  query getChannel($id: ID!) {
    getChannel(id: $id) {
      id
      name
      type
      participants {
        edges {
          node {
            id
            username
          }
        }
      }
      messages {
        edges {
          node {
            id
            content
            createdAt
            author {
              id
              username
            }
          }
        }
      }
    }
  }
`;
