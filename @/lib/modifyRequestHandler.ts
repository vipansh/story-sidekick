import axios, { AxiosRequestHeaders, AxiosInstance } from "axios"; // Added AxiosInstance type

import { supabaseClient } from "./supabase";
import storage from "./storage";

const axiosInstance = axios.create(); // Created axios instance

export const setAuthToken = (
  headers?: AxiosRequestHeaders,
): AxiosRequestHeaders => {
  let modifiedHeaders: any = { ...headers };

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
