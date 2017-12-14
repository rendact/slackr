import gql from "graphql-tag";

export default gql`
  query($ids: [ID]!) {
    viewer {
      allUsers(where: { id: { notIn: $ids } }) {
        edges {
          node {
            id
            username
            avatar {
              blobUrl
            }
          }
        }
      }
    }
  }
`;
