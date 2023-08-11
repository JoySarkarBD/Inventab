import { useEffect } from "react";
import { axiosPrivateInstance } from "../utils/axios/axios";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const token = `JWT ${auth?.accessToken}`;
    if (auth?.accessToken) {
      const requestIntercept = axiosPrivateInstance.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers[
              "Authorization"
            ] = `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDE0NzQ0LCJqdGkiOiJlY2NhYmI4ZjliYmU0MmExYWY1NWFiYzc4Y2Q5NDI2MyIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.249jxm4uIP1XiJO_Wo3A_0GFzzsHEzyR6SrBiqcOf3s`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseintercept = axiosPrivateInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
          return Promise.reject(error);
        }
      );

      return () => {
        axiosPrivateInstance.interceptors.request.eject(requestIntercept);
        axiosPrivateInstance.interceptors.response.eject(responseintercept);
      };
    }
  }, [auth]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;
