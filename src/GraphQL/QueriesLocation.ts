import { gql } from "@apollo/client";

export const GET_PROVINCES = gql`
query province_getProvinces {
  province_getProvinces {
    result(take: 100){
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
}`

export const GET_CITIES = gql`
query city_getCities {
  city_getCities {
    result (take: 100){
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
}`

export const GET_CITIES_BY_PROVINCE_ID = gql`
query city_getCities_by_provinceId($id: Int!) {
  city_getCities {
    result(where: { provinceId: { eq: $id } },take: 1000) {
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
}`



export const GET_REGIONS = gql`
query region_getRegions {
  region_getRegions {
    result {
      items {
        cityId
        regionCode
        name
        id
        subregions {
          subregionName
          subregionCode
          id
          regionId
        }
      }
    }
    status
    __typename
  }
}`


export const GET_REGIONS_BY_CITY_ID = gql`
query region_getRegions_by_city_ID($id: Int!) {
  region_getRegions {
    result(where: { cityId: { eq: $id } },take: 1000) {
      items {
        cityId
        regionCode
        name
        id
        subregions {
          subregionName
          subregionCode
          id
          regionId
        }
      }
    }
    status
    __typename
  }
}`



export const GET_SUBREGIONS = gql`
query subregion_getSubregions {
  subregion_getSubregions {
    result {
      items {
        subregionName
        subregionCode
        regionId
        shops {
          goodsType
          name
          ownerFullName
          phoneNumber
          plaque
          fullAddress
          imageName
        }
      }
    }
    status
    __typename
  }
}`



export const GET_SUBREGIONS_BY_REGION_ID = gql`
query subregion_getSubregions_By_region_ID($id: Int!) {
  subregion_getSubregions {
    result(where: { regionId: { eq: $id } },take: 1000) {
      items {
        subregionName
        subregionCode
        regionId
        shops {
          goodsType
          name
          ownerFullName
          phoneNumber
          plaque
          fullAddress
          imageName
        }
      }
    }
    status
    __typename
  }
}
`