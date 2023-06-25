import { gql } from "@apollo/client";

export const USER_SIGNUP = gql`
  mutation USER_SIGNUP(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $confirmPassword: String!
    $nationalCode: String!
    $userType: UserType
    $phoneNumber: String!
    $userName: String!
  ) {
    user_signUp(
      input: {
        email: $email
        confirmPassword: $confirmPassword
        firstName: $firstName
        lastName: $lastName
        nationalCode: $nationalCode
        password: $password
        phoneNumber: $phoneNumber
        userName: $userName
        userType: $userType
      }
    ) {
      code
      value
      __typename
    }
  }
`;

export const USER_SIGNIN = gql`
  mutation USER_SIGNIN($userName: String!, $password: String!) {
    user_signIn(input: { userName: $userName, password: $password }) {
      result {
        user {
          firstName
          lastName
          userName
          email
          userRoles {
            roleType
            id
          }
          phoneNumber
          id
        }
        token
        expireDate
      }
      status {
        code
        value
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD(
    $oldPassword: String!
    $newPassword: String!
    $confirmPassword: String!
    $userId: String!
  ) {
    user_changePassword(
      input: {
        confirmPassword: $confirmPassword
        currentPassword: $oldPassword
        newPassword: $newPassword
        userId: $userId
      }
    ) {
      code
      value
      __typename
    }
  }
`;

export const DELETE_USER = gql`
  mutation DELETE_USER($id: String!) {
    user_deleteUser(userId: $id) {
      code
      value
      __typename
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $firstName: String!
    $lastName: String!
    $nationalCode: String!
    $userName: String!
  ) {
    user_updateProfile(
      input: {
        userName: $userName
        firstName: $firstName
        lastName: $lastName
        nationalCode: $nationalCode
      }
    ) {
      result {
        firstName
        lastName
        email
      }
      status {
        code
        value
      }
    }
  }
`;

export const ADD_ROLE_TO_USER = gql`
  mutation ADD_ROLE_TO_USER($roleType: RoleType!, $userId: String!) {
    userRole_addUserToRole(roleType: $roleType, userId: $userId) {
      code
      value
    }
  }
`;

// export const REMOVE_ROLE_FROM_USER = gql`
//   mutation REMOVE_ROLE_FROM_USER($roleType: RoleType!, $userId: String!) {
//     userRole_removeUserFromRole(roleType: $roleType, userId: $userId) {
//       code
//       value
//     }
//   }
// `;


export interface IAddRoleToUser {
  roleType: "SUPER_ADMIN" | "ADMIN" | "NORMAL" | "EDITOR";
  userId: string;
}

