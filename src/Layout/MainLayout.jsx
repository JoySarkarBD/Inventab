import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  const noHeaderFooter = location.pathname.includes("/login");

  return (
    <div>
      {noHeaderFooter || ""}
      <Outlet />
    </div>
  );
};

export default MainLayout;
