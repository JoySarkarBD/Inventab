import { useEffect } from "react";
import { axiosPrivateInstance } from "../utils/axios/axios";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const token = `JWT ${auth?.accessToken}`;
    if (auth?.accessToken) {
      const requestIntercept = axiosPrivateInstance.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = token;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseintercept = axiosPrivateInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response.status === 401) {
            const modifiedObj = {
              ...auth,
              isLoggedIn: false,
              sessionStatus: false,
            };

            setAuth(modifiedObj);
            localStorage.setItem("userInfo", JSON.stringify(modifiedObj));
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosPrivateInstance.interceptors.request.eject(requestIntercept);
        axiosPrivateInstance.interceptors.response.eject(responseintercept);
      };
    }
  }, [auth, setAuth]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;

/* `JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNDE0NzQ0LCJqdGkiOiJlY2NhYmI4ZjliYmU0MmExYWY1NWFiYzc4Y2Q5NDI2MyIsInVzZXJfaWQiOiI4N2NmNTQ2My04YjNiLTQwZmMtOWFlZS01ZDdkYzk2Y2EzMmQifQ.249jxm4uIP1XiJO_Wo3A_0GFzzsHEzyR6SrBiqcOf3s` ["expired token"]*/
