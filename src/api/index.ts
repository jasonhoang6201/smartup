import axios from "axios";
import queryString from "query-string";
import { deleteCookie } from "src/helpers/cookie";

const token = localStorage.getItem("token");

export const apiConfig = {
  // baseURL: "https://ec01-03-server.herokuapp.com/",
  baseURL: "http://localhost:3001/",
};

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify({ ...params }),
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      deleteCookie("token");
    }
  }
);

export { axiosClient };
