import gql from "graphql-tag";

export const checkDMExists = gql`
  query($channelName: String!) {
    viewer {
      allChannels(
        where: { type: { eq: direct }, name: { eq: $channelName } }
        first: 1
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
