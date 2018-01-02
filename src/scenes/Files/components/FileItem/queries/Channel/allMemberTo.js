import gql from "graphql-tag";

export default gql`
  query($userId: ID!) {
    viewer {
      allChannels(
        where: { participants: { node: { id: { eq: $userId } } } }
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
                  id
                  username
                  fullname
                }
              }
            }
          }
        }
      }
    }
  }
`;
