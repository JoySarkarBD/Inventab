/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    /*  accessToken:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxOTU3MzgwLCJqdGkiOiJhOGMyNzc2MWE1ZmY0ZGE5YTgxNzg0ZWUxOTE5M2U1ZSIsInVzZXJfaWQiOiJjMGE2ZmE2MC1hNWFmLTQzYWYtOTE4Yi05OTNlZjAxYmQ1NmUifQ.UOrCch02bREFs_BB_J04LLo6UrcLhNXdhafOb9Enfx4",
    email: "mukund.vs.atpl@autopeepal.com",
    firstname: "makku",
    lastname: "kaku",
    orgId: `0a055b26-ae15-40a9-8291-25427b94ebb3`,
    phone: "9503340304",
    userId: "c0a6fa60-a5af-43af-918b-993ef01bd56e", */
  });

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setAuth(userInfo);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
