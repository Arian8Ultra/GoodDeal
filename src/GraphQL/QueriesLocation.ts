import { gql } from "@apollo/client";

export const GET_PROVINCES = gql`
  query province_getProvinces{
    province_getProvinces {
      result(take: 100) {
        items {
          name
          id
          cities {
            provinceId
            name
          }
        }
      }
    }
  }
`;

export const GET_PROVINCES_SEARCH = gql`
query province_getProvinces ($search: String){
  province_getProvinces {
    result(take: 100 where: {name: {contains: $search}}) {
      items {
        name
        id
        cities {
          provinceId
          name
        }
      }
    }
  }
}
`;

export const GET_CITIES = gql`
  query city_getCities ($search: String){
    city_getCities {
      result(take: 1000 where: {name: {contains: $search}}) {
        items {
          provinceId
          name
          id
          regions {
            name
            id
            cityId
          }
        }
      }
    }
  }
`;

export const GET_CITIES_BY_PROVINCE_ID = gql`
  query city_getCities_by_provinceId($id: Int!) {
    city_getCities {
      result(where: { provinceId: { eq: $id } }, take: 1000) {
        items {
          provinceId
          name
          id
          regions {
            name
            id
            cityId
          }
        }
      }
      status
      __typename
    }
  }
`;

export const GET_REGIONS = gql`
  query region_getRegions ($search: String){
    region_getRegions {
      result (where: {name: {contains: $search}}, take: 1000){
        items {
          cityId
          code
          name
          id
          subregions {
            name
            code
            id
            regionId
          }
        }
      }
      status
      __typename
    }
  }
`;

export const GET_REGIONS_BY_CITY_ID = gql`
  query region_getRegions_by_city_ID($id: Int!) {
    region_getRegions {
      result(where: { cityId: { eq: $id } }, take: 1000) {
        items {
          cityId
          code
          name
          id
          subregions {
            name
            code
            id
            regionId
          }
        }
      }
      status
      __typename
    }
  }
`;

export const GET_SUBREGIONS = gql`
  query subregion_getSubregions($search: String) {
    subregion_getSubregions {
      result (where: {name: {contains: $search}}, take: 1000)
      {
        items {
          name
          code
          regionId
          shops {
            goodsType
            name
            ownerFullName
            phoneNumber
            plaque
            fullAddress
          }
        }
      }
      status
      __typename
    }
  }
`;

export const GET_SUBREGIONS_BY_REGION_ID = gql`
  query subregion_getSubregions_By_region_ID($id: Int!) {
    subregion_getSubregions {
      result(where: { regionId: { eq: $id } }, take: 1000) {
        items {
          name
          code
          id
          regionId
          shops {
            goodsType
            name
            ownerFullName
            phoneNumber
            plaque
            fullAddress
          }
        }
      }
      status
      __typename
    }
  }
`;
