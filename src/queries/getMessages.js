import gql from "graphql-tag";

export const getMessages = gql`
  {
    viewer {
      allMessages(orderBy: { field: createdAt, direction: DESC }) {
        edges {
          node {
            id
            content
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
