import axios, { AxiosRequestHeaders, AxiosInstance } from "axios"; // Added AxiosInstance type

import storage, { STORAGE_KEYS } from "./storage";

const axiosInstance = axios.create(); // Created axios instance

export const setAuthToken = (
  headers?: AxiosRequestHeaders,
  isMultipartClient?: boolean
): AxiosRequestHeaders => {
  let modifiedHeaders: any = { ...headers };
  const token = storage.cookie.get(STORAGE_KEYS.token);
  if (token) modifiedHeaders.Authorization = `Bearer ${token}`;

  if (isMultipartClient) {
    modifiedHeaders["accept"] = "application/json";
    modifiedHeaders["Accept-Language"] = "en-US,en;q=0.8";
    modifiedHeaders["Content-Type"] = "multipart/form-data";
  }

  return modifiedHeaders as AxiosRequestHeaders;
};

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = setAuthToken(config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
