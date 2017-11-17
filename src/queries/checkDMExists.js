import gql from "graphql-tag";

export const checkDMExists = gql`
  query($meId: ID!, $otherId: ID!) {
    viewer {
      allChannels(
        where: {
          type: { eq: direct }
          AND: {
            participants: { node: { id: { eq: $meId } } }
            AND: { participants: { node: { id: { eq: $otherId } } } }
          }
        }
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
