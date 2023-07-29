
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../utils/axios/axios";

export default function KPIPO() {

  const [kipPo, setKpiPo] = useState([]);
  const [loading, setLoading] = useState(false);

 const kpiPo = async ()=>{
  setLoading(true);
  try{
    const { data } = await axios.get(
      "pipo/kpi/list/?org=0a055b26-ae15-40a9-8291-25427b94ebb3&metric=PO"
    );
    setKpiPo(data?.results);
    setLoading(false);
  } catch (error) {
    setLoading(true);
    console.log(error);
  }
 }

 console.log(kipPo);
 
 // load leads
  useEffect(() => {
    kpiPo();
  }, []);

  // columns for table
  const columns = [
    {
      name: "Department",
      selector: (row) => row?.department || "No data found",
      sortable: true,
    },
    {
      name: "Apr",
      selector: (row) => row?.apr || "No data found",
      sortable: true,
    },
    {
      name: "May",
      selector: (row) => row?.may || "No data found",
      sortable: true,
    },
    {
      name: "Jun",
      selector: (row) => row?.jun || "No data found",
      sortable: true,
    },
    {
      name: "Jul",
      selector: (row) => row?.jul || "No data found",
      sortable: true,
    },
    {
      name: "Aug",
      selector: (row) => row?.aug || "No data found",
      sortable: true,
    },
    {
      name: "Sep",
      selector: (row) => row?.sep || "No data found",
      sortable: true,
    },
    {
      name: "Oct",
      selector: (row) => row?.oct || "No data found",
      sortable: true,
    },
    {
      name: "Nov",
      selector: (row) => row?.nov || "No data found",
      sortable: true,
    },
    {
      name: "Dec",
      selector: (row) => row?.dec || "No data found",
      sortable: true,
    },
    {
      name: "Jan",
      selector: (row) => row?.jan || "No data found",
      sortable: true,
    },
    {
      name: "Feb",
      selector: (row) => row?.feb || "No data found",
      sortable: true,
    },
    {
      name: "Mar",
      selector: (row) => row?.mar || "No data found",
      sortable: true,
    },
  ];


    return (
       <>
       {/* <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Department</th>
              <th scope="col">Apr-23</th>
              <th scope="col">May-23</th>
              <th scope="col">Jun-23</th>
              <th scope="col">Jul-23</th>
              <th scope="col">Aug-23</th>
              <th scope="col">Sep-23</th>
              <th scope="col">Oct-23</th>
              <th scope="col">Nov-23</th>
              <th scope="col">Dec-23</th>
              <th scope="col">Jan-24</th>
              <th scope="col">Feb-24</th>
              <th scope="col">Mar-24</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><p className="text-dark">Department-1</p></th>
              <td><p className="text-dark">Mark</p></td>
              <td><p className="text-dark">Mark</p></td>
              <td><p className="text-dark">Mark</p></td>
              <td><p className="text-dark">Mark</p></td>
              <td><p className="text-dark">Otto</p></td>
              <td><p className="text-dark">Otto</p></td>
              <td><p className="text-dark">Otto</p></td>
              <td><p className="text-dark">Otto</p></td>
              <td><p className="text-dark">@mdo</p></td>
              <td><p className="text-dark">@mdo</p></td>
              <td><p className="text-dark">@mdo</p></td>
              <td><p className="text-dark">@mdo</p></td>
            </tr>
            <tr>
              <th scope="row"><p className="text-dark">Department-2</p></th>
              <td><p className="text-dark">Jacob</p></td>
              <td><p className="text-dark">Jacob</p></td>
              <td><p className="text-dark">Jacob</p></td>
              <td><p className="text-dark">Jacob</p></td>
              <td><p className="text-dark">Thornton</p></td>
              <td><p className="text-dark">Thornton</p></td>
              <td><p className="text-dark">Thornton</p></td>
              <td><p className="text-dark">Thornton</p></td>
              <td><p className="text-dark">@fat</p></td>
              <td><p className="text-dark">@fat</p></td>
              <td><p className="text-dark">@fat</p></td>
              <td><p className="text-dark">@fat</p></td>
            </tr>
            <tr>
              <th scope="row"><p className="text-dark">Department-3</p></th>
              <td><p className="text-dark">@fat</p></td>
              <td><p className="text-dark">@fat</p></td>
              <td><p className="text-dark">@fat</p></td>
              <td><p className="text-dark">@fat</p></td>
              <td><p className="text-dark">Larry Bird</p></td>
              <td><p className="text-dark">Larry Bird</p></td>
              <td><p className="text-dark">Larry Bird</p></td>
              <td><p className="text-dark">Larry Bird</p></td>
              <td><p className="text-dark">@twitter</p></td>
              <td><p className="text-dark">@twitter</p></td>
              <td><p className="text-dark">@twitter</p></td>
              <td><p className="text-dark">@twitter</p></td>
            </tr>
          </tbody>
      </table> */}
      <DataTable
                title={<h2 className="text-center">KPI PO</h2>}
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
                      width:"170px"
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
              />
       </> 
    )
}