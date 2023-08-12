import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PublicRoute = () => {
  const { auth } = useAuth();
  const { isLoggedIn } = auth;

  if (!isLoggedIn) return <Outlet />;
  return <Navigate to='/dashboard' />;
};

export default PublicRoute;
