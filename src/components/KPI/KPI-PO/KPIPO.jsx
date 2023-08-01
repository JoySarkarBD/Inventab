import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../utils/axios/axios";
import { numDifferentiation } from "../../../utils/utilityFunc/utilityFunc";

export default function KPIPO() {
  const [kipPo, setKpiPo] = useState([]);
  const [loading, setLoading] = useState(false);

  const kpiPo = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "pipo/kpi/list/?org=0a055b26-ae15-40a9-8291-25427b94ebb3&metric=PO"
      );
      setKpiPo(data?.results);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  // load leads
  useEffect(() => {
    kpiPo();
  }, []);

  // columns for table
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
        progressPending={loading}
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
              Total: 00.00 Cr.
            </h3>
          </>
        }
      />
    </>
  );
}
