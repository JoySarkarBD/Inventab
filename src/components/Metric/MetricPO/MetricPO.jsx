import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../utils/axios/axios";
import { getMonthName } from "../../../utils/utilityFunc/utilityFunc";

export default function MetricPO() {
  const [loading, setLoading] = useState(false);
  const [salesOrders, setSalesOrders] = useState([]);
  let [salesdata, setSalesData] = useState([]);

  // get order list
  const getOrderList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `pipo/so/order/?org=0a055b26-ae15-40a9-8291-25427b94ebb3`
      );
      setLoading(false);
      setSalesOrders(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // load sales order list
  useEffect(() => {
    getOrderList();
  }, []);

  useEffect(() => {
    if (!loading && salesOrders?.length && salesOrders?.length > 0) {
      // total dept list obj
      const result = [];

      // sales order total
      salesOrders?.forEach((item) => {
        // Get the month name from the expected_date property
        const month = getMonthName(item.po_date);

        // Find the department in the result array or add it if not found
        let departmentEntry = result.find(
          (entry) => entry?.department === item?.department?.name
        );
        if (!departmentEntry) {
          departmentEntry = {
            department: item?.department?.name,
          };
          result.push(departmentEntry);
        }

        // Check if the departmentEntry already has data for the specific month
        if (departmentEntry[month.toLowerCase()]) {
          // If data exists for the month, add the new total to it
          departmentEntry[month.toLowerCase()] += parseFloat(item.total);
        } else {
          // If data doesn't exist for the month, create a new entry
          departmentEntry[month.toLowerCase()] = parseFloat(item.total);
        }
      });

      let res = result.filter((res) => res.department !== undefined);
      setSalesData(res);
    }
  }, [salesOrders?.length, salesOrders, loading]);

  const columns = [
    {
      name: "Department",
      selector: (row) => row?.department || 0,
    },
    {
      name: "Jan",
      selector: (row) => row?.jan || 0,
    },
    {
      name: "Fab",
      selector: (row) => row?.feb || 0,
    },
    {
      name: "Mar",
      selector: (row) => row?.mar || 0,
    },
    {
      name: "Apr",
      selector: (row) => row?.apr || 0,
    },
    {
      name: "May",
      selector: (row) => row?.may || 0,
    },
    {
      name: "Jun",
      selector: (row) => row?.jun || 0,
    },
    {
      name: "Jul",
      selector: (row) => row?.jul || 0,
    },
    {
      name: "Aug",
      selector: (row) => row?.aug || 0,
    },
    {
      name: "Sep",
      selector: (row) => row?.sep | 0,
    },
    {
      name: "Oct",
      selector: (row) => row?.oct || 0,
    },
    {
      name: "Nov",
      selector: (row) => row?.nov || 0,
    },
    {
      name: "Dec",
      selector: (row) => row?.dec || 0,
    },
  ];
  return (
    <>
      <h2 className='text-center mb-4'>Actual-PO</h2>

      <DataTable columns={columns} data={salesdata} progressPending={loading} />
    </>
  );
}
