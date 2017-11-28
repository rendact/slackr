import gql from "graphql-tag";

export const createAvatar = gql`
  mutation createAvatar($input: CreateFileInput!) {
    createFile(input: $input) {
      changedFile {
        id
        userAvatar {
          id
        }
        blobUrl
      }
    }
  }
`;
