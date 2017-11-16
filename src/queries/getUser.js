import gql from "graphql-tag";

export const getUser = gql`
  {
    getUser(id: "VXNlcjoz") {
      username
      lastLogin
    }
  }
`;
