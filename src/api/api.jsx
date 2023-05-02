import axios from "axios";
import { API_URL } from "../../config";

export const GetOstan = async () => {
  const response = await axios.get(API_URL + "Ostans/GetOstanList");
  return response.data;
};

export const Login = ({ username, password, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "Users/Login",
    data: {
      username,
      password,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      onSuccess != undefined ? onSuccess(response.data) : () => {};
      alert("قیمت ها  با موفقیت ثبت شد!!");
      return response.data;
    })
    .catch(function (error) {
      onFail != undefined ? onFail(error) : () => {};
      console.error(error);
    });
};

export const GetCity = async ({ id, setCities }) => {
  const response = await axios.get(API_URL + `Cities/GetCitiesByOstanId?ostanId=${id}`);
  setCities(response.data);
  return response.data;
};

export const GetShops = async ({ id, setShop }) => {
  const response = await axios.get(API_URL + `Shops/GetShopListByCityId?cityId=${id}`);
  setShop(response.data);
  return response.data;
};

export const GetCategory = async ({ setCategory }) => {
  const response = await axios.get(API_URL + `ProductGroups/GetProductGroupList`);
  setCategory(response.data);
  return response.data;
};
export const GetProductsById = async ({ id, setProductsById }) => {
  const response = await axios.get(
    API_URL + `Products/SearchProductByProductGroupid?productGroupId=${id}`
  );
  setProductsById(response.data);
  return response.data;
};


