import gql from "graphql-tag";

export default gql`
  mutation bindUserRole($userId: ID!, $roleId: ID!) {
    addToUserRolesConnection(
      input: { userId: $userId, roleId: $roleId, accessLevel: readwrite }
    ) {
      changedUserRoles {
        createdAt
      }
    }
  }
`;
