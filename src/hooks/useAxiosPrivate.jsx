import axios from "axios";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  return axios.create({
    baseURL: "http://inventab.io/api/v1/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${auth?.accessToken}`,
    },
  });
};

export default useAxiosPrivate;
