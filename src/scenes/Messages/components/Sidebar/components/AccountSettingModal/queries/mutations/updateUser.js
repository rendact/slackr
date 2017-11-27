import gql from "graphql-tag";

export const updateUser = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      changedUser {
        fullname
        displayname
        id
        username
      }
    }
  }
`;
