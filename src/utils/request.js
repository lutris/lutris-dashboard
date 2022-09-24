import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/store/index.js";
import { getToken } from "@/utils/auth";

// create an axios instance
export const request = axios.create({
  // baseURL: import.meta.env.BASE_API,
  baseURL: "http://localhost:8000",
  timeout: 25000, // request timeout
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = "Token " + getToken();
      config.headers["Accept"] = "Application/json";
    }
    return config;
  },
  (error) => {
    console.error("Failed to set headers");
    console.error(error);
    Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response) => {
    if (response.status > 299) {
      ElMessage({
        message: "Failed to get response",
        type: "error",
        duration: 5000,
      });
      return Promise.reject(`Server responded with status ${response.status}`);
    } else {
      return response;
    }
  },
  (error) => {
    console.log("Error getting response from server: " + error);
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5000,
    });
    return Promise.reject(error);
  }
);

export default request