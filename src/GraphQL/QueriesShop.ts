import { gql } from "@apollo/client";

export const GET_SHOPS = gql`
  query shop_getShops {
    shop_getShops {
      result {
        items {
          subregionId
          goodsType
          id
          ownerFullName
          fullAddress
          yCoordinate
          xCoordinate
          phoneNumber
        }
      }
      status
      __typename
    }
  }
`;

export const GET_SHOPS_BY_SUBREGION_ID = gql`
  query shop_getShops_by_subregionId($id: Int!) {
    shop_getShops {
      result(where: { subregionId: { eq: $id } }) {
        items {
          subregionId
          goodsType
          id
          ownerFullName
          fullAddress
          yCoordinate
          xCoordinate
          phoneNumber
        }
      }
      status
      __typename
    }
  }
`;





export const GET_CATEGORIES = gql`
  query category_getCategories {
    category_getCategories {
      result {
        items {
          title
          id
          products {
            name
            unit
            id
            categoryId
          }
        }
      }
      status
      __typename
    }
  }
`;

export const GET_PRODUCTS = gql`
  query product_getProducts {
    product_getProducts {
      result {
        items {
          name
          unit
          categoryId
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query product_getProducts_by_categoryId($id: Int!) {
    product_getProducts {
      result(where: { categoryId: { eq: $id } }) {
        items {
          name
          unit
          categoryId
        }
      }
      status
      __typename
    }
  }
`;
