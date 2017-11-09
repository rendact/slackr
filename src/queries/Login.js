import gql from "graphql-tag";

export const loginQry = gql`
  mutation Login($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`;
