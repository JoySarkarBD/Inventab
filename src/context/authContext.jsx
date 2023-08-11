/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const prevOrg = null; /* `0a055b26-ae15-40a9-8291-25427b94ebb3` */
  const [auth, setAuth] = useState({
    accessToken: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxNzYyMDgyLCJqdGkiOiI5MmMwYmFjMDMwY2Q0YTNmYTI5NDQ0NDgzMjY2MzZjNyIsInVzZXJfaWQiOiIyYWYwZTcwMC00NGE5LTQ0OWUtYjg1MS0xMDU1MDRlZjdmYTIifQ.LRC9tVNjRN5cyEQnLWCOAPCLZ06Yd2WX0J6kE7qiVWI`,
    userId: `2af0e700-44a9-449e-b851-105504ef7fa2`,
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
