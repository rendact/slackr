import gql from "graphql-tag";

export const getChannels = gql`
  query {
    viewer {
      allChannels(
        where: { type: { ne: direct } }
        orderBy: { field: createdAt, direction: DESC }
      ) {
        edges {
          node {
            id
            type
            name
          }
        }
      }
    }
  }
`;
