import { gql } from "@apollo/client";

export const ADD_SHOP = gql`
  mutation shop_addShop(
    $subregionId: Int
    $goodsType: String
    $ownerFullName: String!
    $fullAddress: String!
    $yCoordinate: Decimal
    $xCoordinate: Decimal
    $phoneNumber: String!
    $plaque: Float
    $postalCode: String
    $provinceId: Int
    $cityId: Int!
    $regionId: Int
    $name: String!
  ) {
    shop_addShop(
      input: {
        cityId: $cityId
        fullAddress: $fullAddress
        goodsType: $goodsType
        plaque: $plaque
        name: $name
        ownerFullName: $ownerFullName
        phoneNumber: $phoneNumber
        postalCode: $postalCode
        provinceId: $provinceId
        regionId: $regionId
        subregionId: $subregionId
        xCoordinate: $xCoordinate
        yCoordinate: $yCoordinate
      }
    ) {
      result {
        name
        ownerFullName
        id
        xCoordinate
        yCoordinate
      }
      status {
        code
        value
      }
    }
  }
`;

export const DELETE_SHOP = gql`
  mutation shop_deleteShop($id: Int!) {
    shop_deleteShop(entityId: $id) {
      result {
        name
        ownerFullName
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation category_addCategory(
    $title: String!
    $imageName: String!
  ) {
    category_addCategory(
      input: { title: $title, imageName: $imageName }
    ) {
      result {
        title
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation category_deleteCategory($id: Int!) {
    category_deleteCategory(entityId: $id) {
      result {
        title
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation category_updateCategory(
    $id: Int!
    $title: String!
    $imageName: String!
  ) {
    category_updateCategory(
      input: { id: $id, title: $title, imageName: $imageName }
    ) {
      result {
        title
        imageName
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const ADD_SHOP_CATEGORY = gql`
  mutation shopCategory_addShopCategory(
    $shopId: Int!
    $categoryId: Int!
  ) {
    shopCategory_addShopCategory(
      input: { categoryId: $categoryId, shopId: $shopId }
    ) {
      result {
        category {
          title
          id
        }
        shop {
          name
          id
        }
      }
      status {
        code
        value
      }
      __typename
    }
  }
`;

export const DELETE_SHOP_CATEGORY = gql`
  mutation shopCategory_deleteShopCategory($id: Int!) {
    shopCategory_deleteShopCategory(entityId: $id) {
      result {
        category {
          title
          id
        }
        shop {
          name
          id
        }
      }
      status {
        code
        value
      }
      __typename
    }
  }
`;
