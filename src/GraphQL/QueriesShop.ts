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
          cityId
          regionId
          subregionId
          goodsType
          id
          ownerFullName
          fullAddress
          yCoordinate
          xCoordinate
          phoneNumber
          name
          shopCategories{
            category{
              title
              id
              imageName
            }
            isDeleted
          }
        }
      }
      status
      __typename
    }
  }
`;

export const GET_SHOPS_BY_CITY_ID = gql`
  query shop_getShops_by_cityId($id: Int!) {
    shop_getShops {
      result(where: { cityId: { eq: $id } }) {
        items {
          cityId
          regionId
          subregionId
          goodsType
          id
          name
          ownerFullName
          fullAddress
          yCoordinate
          xCoordinate
          phoneNumber
          shopCategories{
            category{
              title
              id
              imageName
            }
            isDeleted
          }
        }
      }
      status
      __typename
    }
  }
`;

export const GET_SHOPS_BY_REGION_ID = gql`
  query shop_getShops_by_regionId($id: Int!) {
    shop_getShops {
      result(where: { regionId: { eq: $id } }) {
        items {
          cityId
          regionId
          subregionId
          goodsType
          id
          name
          ownerFullName
          fullAddress
          yCoordinate
          xCoordinate
          phoneNumber
          shopCategories{
            category{
              title
              id
              imageName
            }
            isDeleted
          }
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
          imageName
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


export const GET_SHOP_CATEGORY = gql`
query shopCategory_getShopCategory($id: Int!) {
  shopCategory_getShopCategory(entityId: $id){
    result{
      shopId
      categoryId
      category{
        title
        imageName
        products{
          name
          unit
          description
        }
        id
      }
      id
    }
    status{
      code
      value
    }
  }
}`