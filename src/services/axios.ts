import axios from "axios";

import Storage from "./storage";

import { toast } from "react-toastify";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://sum.nfinity.pl/api"
    : "http://localhost:8002";

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
