import gql from "graphql-tag";

export const getMessages = gql`
  {
    viewer {
      allMessages(orderBy: { field: createdAt, direction: ASC }) {
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
