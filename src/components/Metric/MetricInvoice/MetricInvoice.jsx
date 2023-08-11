import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../../ui/Loader";
import axios from "../../../utils/axios/axios";
import {
  getMonthName,
  numDifferentiation,
} from "../../../utils/utilityFunc/utilityFunc";

export default function MetricInvoice() {
  const { auth } = useAuth();
  const { orgId } = auth;
  const [actualInvoices, setactualInvoices] = useState([]);
  const [loading, setloading] = useState();
  const [invoices, setInvoices] = useState([]);

  // load actual invoices
  useEffect(() => {
    // get actual invoices
    const getActualInvoices = async () => {
      try {
        setloading(true);
        const { data } = await axios.get(
          `invoices/fetch/all/invoices/?org=${orgId}`
        );

        setactualInvoices(data?.results);
        setloading(false);
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    getActualInvoices();
  }, [orgId]);

  useEffect(() => {
    if (!loading && actualInvoices?.length > 0) {
      // total dept list obj
      const result = [];

      // sales order total
      actualInvoices?.forEach((item) => {
        // Get the month name from the expected_date property
        const month = getMonthName(item?.invoice_date);

        // Find the department in the result array or add it if not found
        let departmentEntry = result?.find(
          (entry) => entry?.department === item?.dept?.name
        );
        if (!departmentEntry) {
          departmentEntry = {
            department: item?.dept?.name,
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

      let res = result.filter((res) => res?.department !== undefined);
      setInvoices(res);
    }
  }, [loading, actualInvoices, actualInvoices?.length]);

  //
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

  let allTotal = 0;

  for (const i of invoices) {
    allTotal += i?.total;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          noContextMenu
          title={<h2 className='text-start'>Actual-Invoice</h2>}
          columns={columns}
          data={invoices}
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
      )}
    </>
  );
}
