import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PublicRoute = () => {
  const { auth } = useAuth();

  if (!auth?.isLoggedIn) return <Outlet />;
  return <Navigate to='/dashboard' />;
};

export default PublicRoute;
