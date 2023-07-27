/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Header from "../components/Dashboard/Header/Header";
import NavHeader from "../components/Dashboard/Header/NavHeader";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div id='main-wrapper'>
      <NavHeader />
      <Header />
      <Sidebar />
      <main className='content-body'>
        <div className='container-fluid'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
