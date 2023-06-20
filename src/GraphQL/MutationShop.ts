import { gql } from "@apollo/client";

export const ADD_SHOP = gql`
  mutation shop_addShop(
    $subregionId: Int
    $goodsType: String
    $ownerFullName: String!
    $fullAddress: String!
    $yCoordinate: Decimal
    $xCoordinate: Decimal
    $phoneNumber: String
    $plaque: Float!
    $postalCode: String!
    $provinceId: Int
    $cityId: Int!
    $regionId: Int
    $name: String!
    $imageName: String!
  ) {
    shop_addShop(
      input: {
        cityId: $cityId
        fullAddress: $fullAddress
        goodsType: $goodsType
        plaque: $plaque
        imageName: $imageName
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
      }
      status {
        code
        value
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation category_addCategory($shopId: Int!, $title: String!) {
    category_addCategory(input: { shopId: $shopId, title: $title }) {
      result {
        title
        shopId
      }
      status {
        code
        value
      }
    }
  }
`;
