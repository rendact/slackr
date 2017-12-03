import gql from "graphql-tag";

export const verify = gql`
  mutation($username: String!, $code: String!) {
    updateUser(input: { id: 1, username: $username, verificationCode: $code }) {
      changedUser {
        id
        verified
      }
    }
  }
`;
