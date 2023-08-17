import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAuth } from "../../../hooks/useAuth";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../ui/Loader";
import {
  kpiEachTotal,
  numDifferentiation,
} from "../../../utils/utilityFunc/utilityFunc";

import RevenueChart from "../../Chart/Chart";

export default function KPIInvoice() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId } = auth;
  const [kipInvoice, setKpiInvoice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // load kpi po invoice
  useEffect(() => {
    // get kpi po invoice
    const kpiPoInvoice = async () => {
      try {
        setLoading(true);
        // 0a055b26-ae15-40a9-8291-25427b94ebb3 [if u wanna see some data then change the org with it]
        const { data } = await axios.get(
          `pipo/kpi/list/?org=${orgId}&metric=INVOICE`
        );
        setKpiInvoice(data?.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    kpiPoInvoice();
  }, [axios, orgId]);

  // calculate total after mount page
  useEffect(() => {
    let total = 0;
    if (!loading && kipInvoice?.length && kipInvoice?.length > 0) {
      kipInvoice.forEach((invoice) => {
        let res = kpiEachTotal(invoice);
        // added total property in existing invoice obj
        invoice["total"] = res;
        // calculate all total
        total += res;
      });
      setTotal(total);
    }
  }, [kipInvoice?.length, kipInvoice, loading]);

  // columns for table
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
          <RevenueChart data={kipInvoice} />
          <DataTable
            title={<h2 className='text-start'>KPI Invoice</h2>}
            data={kipInvoice}
            columns={columns}
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
            noContextMenu
            fixedHeader
            fixedHeaderScrollHeight='550px'
            pagination
            striped
            highlightOnHover
            subHeader
            // total KPI Invoice amount
            actions={
              <>
                <h3 className='bg-primary text-white rounded-0 p-3'>
                  Total:{numDifferentiation(total)}
                </h3>
              </>
            }
          />
        </>
      )}
    </>
  );
}
