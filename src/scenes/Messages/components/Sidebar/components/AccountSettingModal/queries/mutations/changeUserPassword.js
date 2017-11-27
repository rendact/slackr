import gql from "graphql-tag";

export const changeUserPassword = gql`
  mutation($input: ChangeUserPasswordInput!) {
    changeUserPassword(input: $input) {
      changedUser {
        id
      }
    }
  }
`;
