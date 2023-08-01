import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../utils/axios/axios";
import {
  getMonthName,
  numDifferentiation,
} from "../../../utils/utilityFunc/utilityFunc";

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
      setSalesOrders(data?.results);
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
      salesOrders?.forEach(item => {
        // Get the month name from the expected_date property
        const month = getMonthName(item.po_date);

        // Find the department in the result array or add it if not found
        let departmentEntry = result.find(
          entry => entry?.department === item?.department?.name
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

      let res = result.filter(res => res.department !== undefined);
      setSalesData(res);
    }
  }, [salesOrders?.length, salesOrders, loading]);

  const columns = [
    {
      name: "Department",
      selector: row => row?.department,
      sortable: true,
    },
    {
      name: "Apr",
      selector: row => numDifferentiation(row?.apr) || 0,
      sortable: true,
    },
    {
      name: "May",
      selector: row => numDifferentiation(row?.may) || 0,
      sortable: true,
    },
    {
      name: "Jun",
      selector: row => numDifferentiation(row?.jun) || 0,
      sortable: true,
    },
    {
      name: "Jul",
      selector: row => numDifferentiation(row?.jul) || 0,
      sortable: true,
    },
    {
      name: "Aug",
      selector: row => numDifferentiation(row?.aug) || 0,
      sortable: true,
    },
    {
      name: "Sep",
      selector: row => numDifferentiation(row?.sep) || 0,
      sortable: true,
    },
    {
      name: "Oct",
      selector: row => numDifferentiation(row?.oct) || 0,
      sortable: true,
    },
    {
      name: "Nov",
      selector: row => numDifferentiation(row?.nov) || 0,
      sortable: true,
    },
    {
      name: "Dec",
      selector: row => numDifferentiation(row?.dec) || 0,
      sortable: true,
    },
    {
      name: "Jan",
      selector: row => numDifferentiation(row?.jan) || 0,
      sortable: true,
    },
    {
      name: "Feb",
      selector: row => numDifferentiation(row?.feb) || 0,
      sortable: true,
    },
    {
      name: "Mar",
      selector: row => numDifferentiation(row?.mar) || 0,
      sortable: true,
    },
  ];
  return (
    <>
      <h2 className='text-center mb-4'>Actual-PO</h2>

      <DataTable
        columns={columns}
        data={salesdata}
        progressPending={loading}
        customStyles={{
          rows: {
            style: {
              fontSize: "16px",
            },
          },
          headCells: {
            style: {
              fontSize: "19px",
              width: "170px",
            },
          },
        }}
      />
    </>
  );
}
