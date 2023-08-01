import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../utils/axios/axios";
import {
  getMonthName,
  numDifferentiation,
} from "../../../utils/utilityFunc/utilityFunc";

export default function MetricInvoice() {
  const [actualInvoices, setactualInvoices] = useState([]);
  const [loading, setloading] = useState();
  const [invoices, setInvoices] = useState([]);

  // get actual invoices
  const getActualInvoices = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `invoices/fetch/all/invoices/?org=0a055b26-ae15-40a9-8291-25427b94ebb3`
      );

      setactualInvoices(data?.results);
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  // load actual invoices
  useEffect(() => {
    getActualInvoices();
  }, []);

  useEffect(() => {
    if (!loading && actualInvoices?.length > 0) {
      const invoices = [];

      actualInvoices.forEach((invoice) => {
        let month = getMonthName(invoice?.invoice_date);

        let findInvoice = invoices.find((inv) => inv?.dept === invoice?.dept);

        if (!findInvoice) {
          findInvoice = {
            dept: invoice?.dept,
            total: 0,
          };
          invoices.push(findInvoice);
        }

        // Check if the findInvoice already has data for the specific month
        if (findInvoice[month.toLowerCase()]) {
          // If data exists for the month, add the new total to it
          findInvoice[month.toLowerCase()] += parseFloat(invoice?.total);
        } else {
          // If data doesn't exist for the month, create a new entry
          findInvoice[month.toLowerCase()] = parseFloat(invoice?.total);
        }
        findInvoice.total += parseFloat(invoice?.total);
      });
      let res = invoices.filter((res) => res.dept !== undefined);

      setInvoices(res);
    }
  }, [loading, actualInvoices, actualInvoices?.length]);

  //
  const columns = [
    {
      name: "Department",
      selector: (row) => row?.dept,
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
  console.log(invoices);

  return (
    <>
      <DataTable
        title={<h2 className='text-start'>Actual-Invoice</h2>}
        columns={columns}
        data={invoices}
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
  );
}
