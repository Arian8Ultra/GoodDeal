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
