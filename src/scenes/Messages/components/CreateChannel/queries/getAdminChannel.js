import gql from "graphql-tag";

export default gql`
  {
    viewer {
      allRoles(where: { name: { eq: "adminChannel" } }, first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
