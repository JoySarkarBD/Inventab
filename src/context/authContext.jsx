/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const prevOrg = null; /* || `0a055b26-ae15-40a9-8291-25427b94ebb3` */
  const [auth, setAuth] = useState({
    accessToken: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNzczODg2LCJqdGkiOiI5ZWNmMjkyOWMzMjk0ZGM2YmNkZGE3ODkyNGFmNDg1MCIsInVzZXJfaWQiOiIyYWYwZTcwMC00NGE5LTQ0OWUtYjg1MS0xMDU1MDRlZjdmYTIifQ.ACu686g9BpXPapGfMs79OfcG3xPJtNmCij0DxMUwPcI`,
    firstname: `Ura1`,
    lastname: `com`,
    userMobileNo: `1234567890`,
    userEmail: `ura1@test.com`,
    orgId: prevOrg || `3f31d296-4803-4973-883c-6441af37737a`,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
