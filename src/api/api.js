// @ts-nocheck
import axios from "axios";
// const API_URL = "http://172.16.37.85:54112/api/"
export const API_URL = "http://172.17.139.18/api/"

export const SIGNIN = ({ username, password, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "Users/Login",
    data: {
      username: username,
      password: password,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      onSuccess ? onSuccess(response.data) : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};


export const GET_OSTAN_LIST = ({ setOstanList, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'Ostans/GetOstanList',
    headers: { Authorization:  `Bearer ${token}`, }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setOstanList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}


export const GET_CITY_LIST_BY_OSTANID = ({ setCityList,ostanId, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'Cities/GetCitiesByOstanId',
    params: { ostanId: ostanId },
    headers: { Authorization:  `Bearer ${token}`, }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setCityList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}

export const GET_REGION_LIST_BY_CITYID = ({ setRegionList,cityId, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'Regions/GetRegionsByCityId',
    params: { cityId: cityId },
    headers: { Authorization:  `Bearer ${token}`, }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setRegionList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}

export const GET_SUBREGION_LIST_BY_REGIONID = ({ setSubRegionList,regionId, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'Subregions/GetRegionsByRegionId',
    params: { regionId: regionId },
    headers: { Authorization:  `Bearer ${token}`, }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setSubRegionList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}

export const GET_SHOP_LIST_BY_CITYID = ({ setShopList,cityId, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'Shops/GetShopListByCityId',
    params: { cityId: cityId },
    headers: { Authorization:  `Bearer ${token}`, }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setShopList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}


export const GET_SHOP_LIST_BY_REGIONID = ({ setShopList,regionId, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'Shops/GetShopListBySubregionId',
    params: { regionId: regionId },
    headers: { Authorization:  `Bearer ${token}`, }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setShopList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}


export const GET_SHOP_LIST_BY_SUBREGIONID = ({ setShopList,subRegionId, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'Shops/GetShopListBySubRegionId',
    params: { subRegionId: subRegionId },
    headers: { Authorization:  `Bearer ${token}`, }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setShopList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}


export const GET_PRODUCT_GROUP_LIST = ({ setProductGroupList, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'ProductGroups/GetProductGroupList',
    headers: { Authorization:  `Bearer ${token}`, }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setProductGroupList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}


export const GET_PRODUCT_LIST_BY_GROUPID = ({ setProductList,groupId, token, onSuccess, onFail }) => {
  const options = {
    method: 'GET',
    url: API_URL + 'Products/SearchProductByProductGroupid',
    params: { groupId: groupId },
    headers: { Authorization: token }
  };

  axios.request(options).then(function (response) {
    onSuccess ? onSuccess(response.data) : () => { };
    setProductList(response.data);
    console.log(response.data);
  }).catch(function (error) {
    onFail ? onFail(error) : () => { };
    console.error(error);
  });
}
















