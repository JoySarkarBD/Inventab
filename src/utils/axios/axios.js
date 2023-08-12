/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";

const BASE_URL = `http://inventab.io/api/v1/`;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Referer: "unsafe-url",
  },
});

// axios private instance
export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Referer: "unsafe-url",
  },
});
