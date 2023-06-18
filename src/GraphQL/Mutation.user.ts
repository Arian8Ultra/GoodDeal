import { gql } from "@apollo/client";

export const USER_SIGNUP = gql`
  mutation USER_SIGNUP(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $confirmPassword: String!
    $nationalCode: String!
    $userType: UserType!
  ) {
    user_signUp(
      input: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        confirmPassword: $confirmPassword
        nationalCode: $nationalCode
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
        __typename
      }
      status {
        code
        value
      }
      __typename
    }
  }
`;
