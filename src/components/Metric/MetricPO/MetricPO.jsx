import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "../../../utils/axios/axios";
import {
  getMonthName,
  monthTotalValue,
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
      // west arr
      let jan = [];
      let feb = [];
      let mar = [];
      let apr = [];
      let may = [];
      let jun = [];
      let jul = [];
      let aug = [];
      let sep = [];
      let oct = [];
      let nov = [];
      let dec = [];

      // south arr
      let sjan = [];
      let sfeb = [];
      let smar = [];
      let sapr = [];
      let smay = [];
      let sjun = [];
      let sjul = [];
      let saug = [];
      let ssep = [];
      let soct = [];
      let snov = [];
      let sdec = [];

      // north arr
      let njan = [];
      let nfeb = [];
      let nmar = [];
      let napr = [];
      let nmay = [];
      let njun = [];
      let njul = [];
      let naug = [];
      let nsep = [];
      let noct = [];
      let nnov = [];
      let ndec = [];

      salesOrders.forEach((order) => {
        if (order?.department?.name === "SLS-KAM-WEST") {
          if ("jan" === getMonthName(order?.po_date)) {
            jan.push(parseFloat(order?.total));
          }
          if ("feb" === getMonthName(order?.po_date)) {
            feb.push(parseFloat(order?.total));
          }
          if ("mar" === getMonthName(order?.po_date)) {
            mar.push(parseFloat(order?.total));
          }
          if ("apr" === getMonthName(order?.po_date)) {
            apr.push(parseFloat(order?.total));
          }
          if ("may" === getMonthName(order?.po_date)) {
            may.push(parseFloat(order?.total));
          }
          if ("jun" === getMonthName(order?.po_date)) {
            jun.push(parseFloat(order?.total));
          }
          if ("jul" === getMonthName(order?.po_date)) {
            jul.push(parseFloat(order?.total));
          }
          if ("aug" === getMonthName(order?.po_date)) {
            aug.push(parseFloat(order?.total));
          }
          if ("sep" === getMonthName(order?.po_date)) {
            sep.push(parseFloat(order?.total));
          }
          if ("oct" === getMonthName(order?.po_date)) {
            oct.push(parseFloat(order?.total));
          }
          if ("nov" === getMonthName(order?.po_date)) {
            nov.push(parseFloat(order?.total));
          }
          if ("dec" === getMonthName(order?.po_date)) {
            dec.push(parseFloat(order?.total));
          }
        }
        if (order?.department?.name === "SLS-KAM-NORTH") {
          if ("jan" === getMonthName(order?.po_date)) {
            njan.push(parseFloat(order?.total));
          }
          if ("feb" === getMonthName(order?.po_date)) {
            nfeb.push(parseFloat(order?.total));
          }
          if ("mar" === getMonthName(order?.po_date)) {
            nmar.push(parseFloat(order?.total));
          }
          if ("apr" === getMonthName(order?.po_date)) {
            napr.push(parseFloat(order?.total));
          }
          if ("may" === getMonthName(order?.po_date)) {
            nmay.push(parseFloat(order?.total));
          }
          if ("jun" === getMonthName(order?.po_date)) {
            njun.push(parseFloat(order?.total));
          }
          if ("jul" === getMonthName(order?.po_date)) {
            njul.push(parseFloat(order?.total));
          }
          if ("aug" === getMonthName(order?.po_date)) {
            naug.push(parseFloat(order?.total));
          }
          if ("sep" === getMonthName(order?.po_date)) {
            nsep.push(parseFloat(order?.total));
          }
          if ("oct" === getMonthName(order?.po_date)) {
            noct.push(parseFloat(order?.total));
          }
          if ("nov" === getMonthName(order?.po_date)) {
            nnov.push(parseFloat(order?.total));
          }
          if ("dec" === getMonthName(order?.po_date)) {
            ndec.push(parseFloat(order?.total));
          }
        }
        if (order?.department?.name === "SLS-KAM-SOUTH") {
          if ("jan" === getMonthName(order?.po_date)) {
            sjan.push(parseFloat(order?.total));
          }
          if ("feb" === getMonthName(order?.po_date)) {
            sfeb.push(parseFloat(order?.total));
          }
          if ("mar" === getMonthName(order?.po_date)) {
            smar.push(parseFloat(order?.total));
          }
          if ("apr" === getMonthName(order?.po_date)) {
            sapr.push(parseFloat(order?.total));
          }
          if ("may" === getMonthName(order?.po_date)) {
            smay.push(parseFloat(order?.total));
          }
          if ("jun" === getMonthName(order?.po_date)) {
            sjun.push(parseFloat(order?.total));
          }
          if ("jul" === getMonthName(order?.po_date)) {
            sjul.push(parseFloat(order?.total));
          }
          if ("aug" === getMonthName(order?.po_date)) {
            saug.push(parseFloat(order?.total));
          }
          if ("sep" === getMonthName(order?.po_date)) {
            ssep.push(parseFloat(order?.total));
          }
          if ("oct" === getMonthName(order?.po_date)) {
            soct.push(parseFloat(order?.total));
          }
          if ("nov" === getMonthName(order?.po_date)) {
            snov.push(parseFloat(order?.total));
          }
          if ("dec" === getMonthName(order?.po_date)) {
            sdec.push(parseFloat(order?.total));
          }
        }
      });

      // west
      let janTotal = monthTotalValue(jan);
      let febTotal = monthTotalValue(feb);
      let marTotal = monthTotalValue(mar);
      let aprTotal = monthTotalValue(apr);
      let mayTotal = monthTotalValue(may);
      let junTotal = monthTotalValue(jun);
      let julTotal = monthTotalValue(jul);
      let augTotal = monthTotalValue(aug);
      let sepTotal = monthTotalValue(sep);
      let octTotal = monthTotalValue(oct);
      let novTotal = monthTotalValue(nov);
      let decTotal = monthTotalValue(dec);

      // south
      let sjanTotal = monthTotalValue(sjan);
      let sfebTotal = monthTotalValue(sfeb);
      let smarTotal = monthTotalValue(smar);
      let saprTotal = monthTotalValue(sapr);
      let smayTotal = monthTotalValue(smay);
      let sjunTotal = monthTotalValue(sjun);
      let sjulTotal = monthTotalValue(sjul);
      let saugTotal = monthTotalValue(saug);
      let ssepTotal = monthTotalValue(ssep);
      let soctTotal = monthTotalValue(soct);
      let snovTotal = monthTotalValue(snov);
      let sdecTotal = monthTotalValue(sdec);

      // north

      let njanTotal = monthTotalValue(njan);
      let nfebTotal = monthTotalValue(nfeb);
      let nmarTotal = monthTotalValue(nmar);
      let naprTotal = monthTotalValue(napr);
      let nmayTotal = monthTotalValue(nmay);
      let njunTotal = monthTotalValue(njun);
      let njulTotal = monthTotalValue(njul);
      let naugTotal = monthTotalValue(naug);
      let nsepTotal = monthTotalValue(nsep);
      let noctTotal = monthTotalValue(noct);
      let nnovTotal = monthTotalValue(nnov);
      let ndecTotal = monthTotalValue(ndec);

      let westObj = {
        department: "SLS-KAM-WEST",
        jan: janTotal,
        feb: febTotal,
        mar: marTotal,
        apr: aprTotal,
        may: mayTotal,
        jun: junTotal,
        jul: julTotal,
        aug: augTotal,
        sep: sepTotal,
        oct: octTotal,
        nov: novTotal,
        dec: decTotal,
      };

      // south
      let southObj = {
        department: "SLS-KAM-SOUTH",
        jan: sjanTotal,
        feb: sfebTotal,
        mar: smarTotal,
        apr: saprTotal,
        may: smayTotal,
        jun: sjunTotal,
        jul: sjulTotal,
        aug: saugTotal,
        sep: ssepTotal,
        oct: soctTotal,
        nov: snovTotal,
        dec: sdecTotal,
      };

      // north
      let northObj = {
        department: "SLS-KAM-NORTH",
        jan: njanTotal,
        feb: nfebTotal,
        mar: nmarTotal,
        apr: naprTotal,
        may: nmayTotal,
        jun: njunTotal,
        jul: njulTotal,
        aug: naugTotal,
        sep: nsepTotal,
        oct: noctTotal,
        nov: nnovTotal,
        dec: ndecTotal,
      };

      /* console.log(westObj);
      console.log(northObj);
      console.log(southObj); */
      setSalesData([westObj, northObj, southObj]);
    }
  }, [salesOrders?.length, salesOrders, loading]);

  console.log(salesdata);
  const columns = [
    {
      name: "Department",
      selector: (row) => row?.department,
    },
    {
      name: "Jan",
      selector: (row) => row?.jan,
    },
    {
      name: "Fab",
      selector: (row) => row?.feb,
    },
    {
      name: "Mar",
      selector: (row) => row?.mar,
    },
    {
      name: "Apr",
      selector: (row) => row?.apr,
    },
    {
      name: "May",
      selector: (row) => row?.may,
    },
    {
      name: "Jun",
      selector: (row) => row?.jun,
    },
    {
      name: "Jul",
      selector: (row) => row?.jul,
    },
    {
      name: "Aug",
      selector: (row) => row?.aug,
    },
    {
      name: "Sep",
      selector: (row) => row?.sep,
    },
    {
      name: "Oct",
      selector: (row) => row?.oct,
    },
    {
      name: "Nov",
      selector: (row) => row?.nov,
    },
    {
      name: "Dec",
      selector: (row) => row?.dec,
    },
  ];
  return (
    <>
      <h2 className='text-center mb-4'>Actual-PO</h2>
      {/* <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Department</th>
            <th scope='col'>Apr-23</th>
            <th scope='col'>May-23</th>
            <th scope='col'>Jun-23</th>
            <th scope='col'>Jul-23</th>
            <th scope='col'>Aug-23</th>
            <th scope='col'>Sep-23</th>
            <th scope='col'>Oct-23</th>
            <th scope='col'>Nov-23</th>
            <th scope='col'>Dec-23</th>
            <th scope='col'>Jan-24</th>
            <th scope='col'>Feb-24</th>
            <th scope='col'>Mar-24</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>
              <p className='text-dark'>Department-1</p>
            </th>
            <td>
              <p className='text-dark'>Mark</p>
            </td>
            <td>
              <p className='text-dark'>Mark</p>
            </td>
            <td>
              <p className='text-dark'>Mark</p>
            </td>
            <td>
              <p className='text-dark'>Mark</p>
            </td>
            <td>
              <p className='text-dark'>Otto</p>
            </td>
            <td>
              <p className='text-dark'>Otto</p>
            </td>
            <td>
              <p className='text-dark'>Otto</p>
            </td>
            <td>
              <p className='text-dark'>Otto</p>
            </td>
            <td>
              <p className='text-dark'>@mdo</p>
            </td>
            <td>
              <p className='text-dark'>@mdo</p>
            </td>
            <td>
              <p className='text-dark'>@mdo</p>
            </td>
            <td>
              <p className='text-dark'>@mdo</p>
            </td>
          </tr>
          <tr>
            <th scope='row'>
              <p className='text-dark'>Department-2</p>
            </th>
            <td>
              <p className='text-dark'>Jacob</p>
            </td>
            <td>
              <p className='text-dark'>Jacob</p>
            </td>
            <td>
              <p className='text-dark'>Jacob</p>
            </td>
            <td>
              <p className='text-dark'>Jacob</p>
            </td>
            <td>
              <p className='text-dark'>Thornton</p>
            </td>
            <td>
              <p className='text-dark'>Thornton</p>
            </td>
            <td>
              <p className='text-dark'>Thornton</p>
            </td>
            <td>
              <p className='text-dark'>Thornton</p>
            </td>
            <td>
              <p className='text-dark'>@fat</p>
            </td>
            <td>
              <p className='text-dark'>@fat</p>
            </td>
            <td>
              <p className='text-dark'>@fat</p>
            </td>
            <td>
              <p className='text-dark'>@fat</p>
            </td>
          </tr>
          <tr>
            <th scope='row'>
              <p className='text-dark'>Department-3</p>
            </th>
            <td>
              <p className='text-dark'>@fat</p>
            </td>
            <td>
              <p className='text-dark'>@fat</p>
            </td>
            <td>
              <p className='text-dark'>@fat</p>
            </td>
            <td>
              <p className='text-dark'>@fat</p>
            </td>
            <td>
              <p className='text-dark'>Larry Bird</p>
            </td>
            <td>
              <p className='text-dark'>Larry Bird</p>
            </td>
            <td>
              <p className='text-dark'>Larry Bird</p>
            </td>
            <td>
              <p className='text-dark'>Larry Bird</p>
            </td>
            <td>
              <p className='text-dark'>@twitter</p>
            </td>
            <td>
              <p className='text-dark'>@twitter</p>
            </td>
            <td>
              <p className='text-dark'>@twitter</p>
            </td>
            <td>
              <p className='text-dark'>@twitter</p>
            </td>
          </tr>
        </tbody>
      </table> */}

      <DataTable columns={columns} data={salesdata} progressPending={loading} />
    </>
  );
}
