import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    user_getUsers {
      result {
        items {
          firstName
          lastName
          userName
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
