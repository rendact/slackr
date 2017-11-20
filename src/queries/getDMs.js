import gql from "graphql-tag";

export const getDMs = gql`
  query {
    viewer {
      allChannels(
        where: { type: { eq: direct } }
        orderBy: { field: createdAt, direction: DESC }
      ) {
        edges {
          node {
            id
            type
            name
            participants {
              edges {
                node {
                  username
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
