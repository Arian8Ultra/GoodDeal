import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    user_getUsers {
      result {
        items {
          firstName
          lastName
          userName
          isDeleted
          userRoles {
            roleType
            id
            userId
          }
          normalizedUserName
        }
      }
      status
      __typename
    }
  }
`;


export const GET_USERS = gql`
query user_getUsers{
  user_getUsers {
    result {
      items{
        firstName
        lastName
        id
        userName
        email
        phoneNumber
        userType
        isDeleted
      }
    }
    status
  }
}`