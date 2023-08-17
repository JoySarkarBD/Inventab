import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAuth } from "../../../hooks/useAuth";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../ui/Loader";
import {
  formatChartData,
  getMonthName,
  numDifferentiation,
} from "../../../utils/utilityFunc/utilityFunc";
import RevenueChart from "../../Chart/Chart";

export default function MetricPO() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId } = auth;
  const [loading, setLoading] = useState(false);
  const [salesOrders, setSalesOrders] = useState([]);
  let [salesdata, setSalesData] = useState([]);
  const [actualPoChart, setActualPoChart] = useState();

  let allTotal = 0;

  for (const i of salesdata) {
    allTotal += i.total;
  }

  // load sales order list
  useEffect(() => {
    // get order list
    const getOrderList = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`pipo/so/order/?org=${orgId}`);
        setLoading(false);
        setSalesOrders(data?.results);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getOrderList();
  }, [axios, orgId]);

  useEffect(() => {
    if (!loading && salesOrders?.length && salesOrders?.length > 0) {
      // total dept list obj
      const result = [];

      // sales order total
      salesOrders?.forEach((item) => {
        // Get the month name from the expected_date property
        const month = getMonthName(item.po_date);

        // Find the department in the result array or add it if not found
        let departmentEntry = result?.find(
          (entry) => entry?.department === item?.department?.name
        );
        if (!departmentEntry) {
          departmentEntry = {
            department: item?.department?.name,
            total: 0,
          };
          result.push(departmentEntry);
        }

        // Check if the departmentEntry already has data for the specific month
        if (departmentEntry[month.toLowerCase()]) {
          // If data exists for the month, add the new total to it
          departmentEntry[month.toLowerCase()] += parseFloat(item?.total);
        } else {
          // If data doesn't exist for the month, create a new entry
          departmentEntry[month.toLowerCase()] = parseFloat(item?.total);
        }
        departmentEntry.total += parseFloat(item?.total);
      });

      let res = result.filter((res) => res.department !== undefined);
      setSalesData(res);

      //@desc [chart data]
      const formatObj = formatChartData(res);
      if (
        formatObj?.data?.length > 0 &&
        formatObj?.formattedDataWithTotal?.length > 0
      ) {
        setActualPoChart(formatObj);
      }
    }
  }, [salesOrders?.length, salesOrders, loading]);

  const columns = [
    {
      name: "Department",
      selector: (row) => row?.department,
      sortable: true,
    },
    {
      name: "Apr",
      selector: (row) => numDifferentiation(row?.apr) || 0,
      sortable: true,
    },
    {
      name: "May",
      selector: (row) => numDifferentiation(row?.may) || 0,
      sortable: true,
    },
    {
      name: "Jun",
      selector: (row) => numDifferentiation(row?.jun) || 0,
      sortable: true,
    },
    {
      name: "Jul",
      selector: (row) => numDifferentiation(row?.jul) || 0,
      sortable: true,
    },
    {
      name: "Aug",
      selector: (row) => numDifferentiation(row?.aug) || 0,
      sortable: true,
    },
    {
      name: "Sep",
      selector: (row) => numDifferentiation(row?.sep) || 0,
      sortable: true,
    },
    {
      name: "Oct",
      selector: (row) => numDifferentiation(row?.oct) || 0,
      sortable: true,
    },
    {
      name: "Nov",
      selector: (row) => numDifferentiation(row?.nov) || 0,
      sortable: true,
    },
    {
      name: "Dec",
      selector: (row) => numDifferentiation(row?.dec) || 0,
      sortable: true,
    },
    {
      name: "Jan",
      selector: (row) => numDifferentiation(row?.jan) || 0,
      sortable: true,
    },
    {
      name: "Feb",
      selector: (row) => numDifferentiation(row?.feb) || 0,
      sortable: true,
    },
    {
      name: "Mar",
      selector: (row) => numDifferentiation(row?.mar) || 0,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => numDifferentiation(row?.total) || 0,
      sortable: true,
    },
  ];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-center'>Actual-PO</h1>
          <RevenueChart chartData={actualPoChart} />
          <DataTable
            noContextMenu
            columns={columns}
            data={salesdata}
            pagination
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
            // total KPI Invoice amount
            actions={
              <>
                <h3 className='bg-primary text-white rounded-0 p-3'>
                  Total: {numDifferentiation(allTotal)}
                </h3>
              </>
            }
          />
        </>
      )}
    </>
  );
}
