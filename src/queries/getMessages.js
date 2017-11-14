import gql from "graphql-tag";

export const getMessages = gql`
  {
    viewer {
      allMessages(last: 50, orderBy: { field: createdAt, direction: ASC }) {
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
