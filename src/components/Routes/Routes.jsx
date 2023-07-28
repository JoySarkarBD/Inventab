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
import AddSalesLeads from "../../pages/SalesLeads/AddSalesLeads";
import UpdateSalesLeads from "../../pages/SalesLeads/UpdateSalesLeads";
import AddSalesOrder from "../../pages/SalesOrder/AddSalesOrder";
import UpdateSalesOrder from "../../pages/SalesOrder/UpdateSalesOrder";
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
      //UpdateSalesLeads form test
      {
        path: "sales/add-sales-leads",
        element: <AddSalesLeads />,
      },
      {
        path: "sales/update-sales-leads/:lead_no",
        element: <UpdateSalesLeads />,
      },
      {
        path: "sales-orders/add-sales-order",
        element: <AddSalesOrder />,
      },
      {
        path: "sales-orders/update-sales-order",
        element: <UpdateSalesOrder />,
      },
    ],
  },
]);

export default router;
