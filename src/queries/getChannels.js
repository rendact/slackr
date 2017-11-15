import gql from "graphql-tag";

export const getChannels = gql`
  query {
    viewer {
      allChannels {
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
