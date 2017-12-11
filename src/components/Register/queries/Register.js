import gql from "graphql-tag";

export const register = gql`
  mutation(
    $fullname: String
    $displayname: String
    $username: String!
    $email: String!
    $password: Secret!
  ) {
    createUser(
      input: {
        fullname: $fullname
        displayname: $displayname
        username: $username
        password: $password
        email: $email
      }
    ) {
      changedUser {
        id
      }
    }
  }
`;
