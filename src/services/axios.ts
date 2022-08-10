import axios from "axios";

import Storage from "./storage";
import { API_URL } from "./config";

import { toast } from "react-toastify";

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  (request: any) => {
    const token = Storage.get("access_token");

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    if (error?.response.status === 401) {
      Storage.remove("access_token");
    }

    toast.error(error?.response.data?.message);

    return Promise.reject(error);
  }
);
