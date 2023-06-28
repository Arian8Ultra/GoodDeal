import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query poducts_getProducts($take: Int, $skip: Int) {
    product_getProducts {
      result(take: $take, skip: $skip) {
        items {
          id
          name
          unit
          categoryId
          priceRecords {
            userId
            price
            isApproved
          }
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

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query poducts_getProductsByCategory(
    $take: Int
    $skip: Int
    $categoryId: Int!
  ) {
    product_getProducts {
      result(
        take: $take
        skip: $skip
        where: { categoryId: { eq: $categoryId } }
      ) {
        items {
          id
          name
          unit
          categoryId
          priceRecords {
            userId
            price
            isApproved
          }
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

export const GET_TODAY_PRICE_RECORDS = gql`
  query poducts_getTodayPriceRecords($take: Int, $skip: Int) {
    priceRecord_getTodayPriceRecords {
      result(take: $take, skip: $skip) {
        items {
          id
          userId
          shopId
          productId
          price
          isApproved
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
      __typename
    }
  }
`;

export const GET_PRICE_RECORDS_BY_PRODUCT_AND_USER_AND_SHOP = gql`
  query poducts_getPriceRecordsByProductAndUserAndShop(
    $take: Int
    $skip: Int
    $productId: Int!
    $userId: String!
    $shopId: Int!
  ) {
    priceRecord_getTodayPriceRecords {
      result(
        take: $take
        skip: $skip
        where: {
          productId: { eq: $productId }
          userId: { eq: $userId }
          shopId: { eq: $shopId }
        }
        order: {createdDate: DESC}
      ) {
        items {
          id
          userId
          shopId
          productId
          price
          isApproved
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
      __typename
    }
  }
`;
