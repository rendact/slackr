import gql from "graphql-tag";

export const updateAvatar = gql`
  mutation updateAvatar($input: UpdateFileInput!) {
    updateFile(input: $input) {
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
