import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../../ui/Loader";
import axios from "../../../utils/axios/axios";
import {
  kpiEachTotal,
  numDifferentiation,
} from "../../../utils/utilityFunc/utilityFunc";

export default function KPIPO() {
  const { auth } = useAuth();
  const { orgId } = auth;
  const [kipPo, setKpiPo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // load leads
  useEffect(() => {
    // get kpi po
    const getKpiPo = async () => {
      setLoading(true);
      try {
        // 0a055b26-ae15-40a9-8291-25427b94ebb3
        const { data } = await axios.get(
          `pipo/kpi/list/?org=${orgId}&metric=PO`
        );
        setKpiPo(data?.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getKpiPo();
  }, [orgId]);

  // sub total after mount this page
  useEffect(() => {
    if (!loading && kipPo?.length > 0) {
      let allTotal = 0;

      kipPo.forEach((kip) => {
        let res = kpiEachTotal(kip);
        kip["total"] = res;
        allTotal += res;
      });
      setTotal(allTotal);
    }
  }, [loading, kipPo, kipPo?.length]);

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
        <DataTable
          title={<h2 className='text-start'>KPI PO</h2>}
          data={kipPo}
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
          // total KPI PO amount
          actions={
            <>
              <h3 className='bg-primary text-white rounded-0 p-3'>
                Total: {numDifferentiation(total)}
              </h3>
            </>
          }
        />
      )}
    </>
  );
}
