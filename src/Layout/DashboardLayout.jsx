/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Dashboard/Header/Header";
import NavHeader from "../components/Dashboard/Header/NavHeader";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Check local storage for the previous state on page reload
    const storedSidebarState = localStorage.getItem("dashboardSidebarState");
    if (storedSidebarState) {
      setIsSidebarOpen(JSON.parse(storedSidebarState));
    }
  }, []);

  useEffect(() => {
    // Save the sidebar state in local storage on every state change
    localStorage.setItem(
      "dashboardSidebarState",
      JSON.stringify(isSidebarOpen)
    );
  }, [isSidebarOpen]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      id='main-wrapper'
      className={`show ${isSidebarOpen ? "menu-toggle" : ""}`}>
      <NavHeader
        handleSidebarToggle={handleSidebarToggle}
        isSidebarOpen={isSidebarOpen}
      />
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
