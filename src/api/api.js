// @ts-nocheck
import axios from "axios";
const API_URL = "http://172.16.37.85:54112/api/"

export const SIGNIN = ({ username,password, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "Users/Login",
    data: {
      username: username,
      password: password,
    } ,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      onSuccess  ? onSuccess(response.data) : () => {};
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => {};
      console.error(error);
    });
};





























export const PostPrices = ({ data, onSuccess, onFail }) => {
    const options = {
      method: "POST",
      url: API_URL + "Prices/AddListPriceRecords",
      data: data,
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