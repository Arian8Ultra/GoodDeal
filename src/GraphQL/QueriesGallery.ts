import { gql } from "@apollo/client";

export const GET_ALL_GALLERY = gql`
  query photoGallery_getPhotos(
    $take: Int!
    $skip: Int!
  ) {
    photoGallery_getPhotos {
      result(take: $take, skip: $skip) {
        items {
          name
          id
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
    }
  }
`;
