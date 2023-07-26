import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import AR from "../../pages/Dashboard/Sales/AR";
import SalesInvoices from "../../pages/Dashboard/Sales/SalesInvoices";
import SalesLead from "../../pages/Dashboard/Sales/SalesLead";
import SalesOrders from "../../pages/Dashboard/Sales/SalesOrders";
import ErrorPage from "../../ui/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
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
    ],
  },
]);

export default router;
