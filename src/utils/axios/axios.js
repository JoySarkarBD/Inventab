import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `http://inventab.io/api/v1`,
  withCredentials: true,
});
