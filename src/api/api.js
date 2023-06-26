/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import axios from "axios";
import { API_URL_UPLOAD } from "../../config";
// const API_URL = "http://172.16.37.85:54112/api/"
// export const API_URL = "http://172.17.139.18/api/"




export function UPLOAD_FILE({ file, token, onSuccess, onFail }) {
  const formData = new FormData();
  formData.append('images', file);



  const options = {
      method: "POST",
      url: API_URL_UPLOAD,
      data: formData,
      headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "content-type": "multipart/form-data",
      },
  };
  console.log(options);

  axios
      .request(options)
      .then(function (response) {
          console.log(response);
          if (response.data.status.code === 1) {
              onSuccess != null ? onSuccess(response.data.result[0].newFileName) : {};
          } else {
              onFail != null ? onFail(response.data.status.value) : {};
          }
          return response;
      })
      .catch(function (error) {
          console.error(error);
          onFail != null ? onFail(error) : {};
          return error;
      });

}