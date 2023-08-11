import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const createAxiosInstance = () => {
  const { auth } = useAuth();
  const { accessToken } = auth;
  return axios.create({
    baseURL: "http://inventab.io/api/v1/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${accessToken}`,
    },
  });
};

export default createAxiosInstance;
