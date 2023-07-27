import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import MainLayout from "../../Layout/MainLayout";
import AR from "../../pages/Dashboard/Sales/AR";
import SalesInvoices from "../../pages/Dashboard/Sales/SalesInvoices";
import SalesLead from "../../pages/Dashboard/Sales/SalesLead";
import SalesOrders from "../../pages/Dashboard/Sales/SalesOrders";
import SalesDashboard from "../../pages/Dashboard/SalesDashboard/SalesDashboard";
import Attendance from "../../pages/Dashboard/Support/Attendance";
import LogIn from "../../pages/Login/LogIn";
import ErrorPage from "../../ui/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LogIn />,
      },
    ],
  },
  {
    path: "dashboard/",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sales-dashboard",
        element: <SalesDashboard />,
      },
      {
        path: "sales-leads",
        element: <SalesLead />,
      },
      {
        path: "sales-orders",
        element: <SalesOrders />,
      },
      {
        path: "sales-invoices",
        element: <SalesInvoices />,
      },
      {
        path: "ar",
        element: <AR />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
    ],
  },
]);

export default router;
