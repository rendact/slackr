import gql from "graphql-tag";

export const avatarSubscription = gql`
  subscription {
    subscribeToFile(mutations: [createFile, updateFile]) {
      value {
        id
        blobUrl
        userAvatar {
          id
        }
      }
    }
  }
`;
