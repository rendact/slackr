import gql from "graphql-tag";

let loginMutation = gql`
  mutation LoginUserWithAuth0($input: LoginUserWithAuth0Input!) {
    loginUserWithAuth0(input: $input) {
      user {
        id
        username
        createdAt
        fullname
        displayname
      }
    }
  }
`;

export default loginMutation;
