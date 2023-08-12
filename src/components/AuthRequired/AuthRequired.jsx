import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PreLoader from "../PreLoader/PreLoader";

const AuthRequired = () => {
  const location = useLocation();
  const { auth } = useAuth();

  const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {
    // Simulate loading behavior
    setTimeout(() => {
      setLoading(false); // Once loading is done, set loading state to false
    }, 10); // Adjust the time as needed
  }, []);

  if (loading) return <PreLoader />;

  if (auth?.isLoggedIn) return <Outlet />;
  return <Navigate to='/' state={{ from: location }} replace />;
};

export default AuthRequired;
