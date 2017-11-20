import gql from "graphql-tag";

export const getDMs = gql`
  query($userId: ID!) {
    viewer {
      allChannels(
        where: {
          type: { eq: direct }
          participants: { node: { id: { eq: $userId } } }
        }
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
