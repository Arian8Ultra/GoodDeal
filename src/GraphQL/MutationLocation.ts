import { gql } from "@apollo/client";

export const CREATE_PROVINCE = gql`
  mutation createProvince($name: String!) {
    province_addProvince(input: { name: $name }) {
      result {
        name
        id
        isDeleted
        cities {
          name
        }
      }
      status {
        code
        value
      }
    }
  }
`;
export const DELETE_PROVINCE = gql`
  mutation deleteProvince($id: Int!) {
    province_deleteProvince(entityId: $id) {
      result {
        name
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const CREATE_CITY = gql`
  mutation createCity($name: String!, $provinceId: Int!) {
    city_addCity(input: { name: $name, provinceId: $provinceId }) {
      result {
        name
        provinceId
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const DELETE_CITY = gql`
  mutation deleteCity($id: Int!) {
    city_deleteCity(entityId: $id) {
      result {
        name
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const CREATE_REGION = gql`
  mutation createRegion($name: String!, $cityId: Int!) {
    region_addRegion(input: { name: $name, cityId: $cityId }) {
      result {
        name
        cityId
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const DELETE_REGION = gql`
  mutation deleteRegion($id: Int!) {
    region_deleteRegion(entityId: $id) {
      result {
        name
        id
      }
      status {
        code
        value
      }
    }
  }
`;

export const CREATE_SUBREGION = gql`
  mutation createSubRegion($name: String!, $regionId: Int!) {
    subregion_addSubregion(
      input: { subregionName: $name, regionId: $regionId }
    ) {
      result {
        regionId
        id
        subregionName
      }
      status {
        code
        value
      }
    }
  }
`;

export const DELETE_SUBREGION = gql`
  mutation deleteSubRegion($id: Int!) {
    subregion_deleteSubregion(entityId: $id) {
      result {
        id
        subregionName
      }
      status {
        code
        value
      }
    }
  }
`;
