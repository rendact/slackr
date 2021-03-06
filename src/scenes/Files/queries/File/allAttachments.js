import gql from "graphql-tag";

export default gql`
  query allFiles($userId: ID!) {
    viewer {
      allMessages(
        where: {
          attachment: { blobUrl: { isNull: false } }
          channel: { participants: { node: { id: { eq: $userId } } } }
        }
      ) {
        edges {
          node {
            id
            attachment {
              blobUrl
              id
              name
            }
            author {
              username
              id
              fullname
            }
            channel {
              id
              name
              type
            }
            createdAt
          }
        }
      }
    }
  }
`;
