import { useEffect, useState } from "react";
import axios from "../../utils/axios/axios";
import {
  kpiEachTotal,
  numDifferentiation,
} from "../../utils/utilityFunc/utilityFunc";

const KpiInvoice = () => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoiceTotal, setInvoicesTotal] = useState([]);

  // get kpi invoices
  const getKpiInvoice = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `pipo/kpi/list/?org=0a055b26-ae15-40a9-8291-25427b94ebb3&metric=INVOICE`
      );
      setLoading(false);
      setInvoices(data);
    } catch (error) {
      console.log(error);
    }
  };

  // load kpi invoices
  useEffect(() => {
    getKpiInvoice();
  }, []);

  //kpi PO each sub total
  useEffect(() => {
    if (invoices.length > 0) {
      let kpiInvoiceTotalArr = [];
      invoices.forEach((invoice) => {
        if (
          invoice.department === "SLS-KAM-WEST" &&
          invoice.id === "54a97d7f-ced4-4308-865b-8b7f9c1e6e99"
        ) {
          let res = kpiEachTotal(invoice);
          kpiInvoiceTotalArr.push(res);
        }

        // south
        if (
          invoice.department === "SLS-KAM-SOUTH" &&
          invoice.id === "e5ad66d4-23a3-485e-8a04-6191e865502b"
        ) {
          let res = kpiEachTotal(invoice);
          kpiInvoiceTotalArr.push(res);
        }

        // north
        if (
          invoice.department === "SLS-KAM-NORTH" &&
          invoice.id === "57bfdda3-ebd2-4ddc-8b19-ac5057572cfd"
        ) {
          let res = kpiEachTotal(invoice);
          kpiInvoiceTotalArr.push(res);
        }
      });

      setInvoicesTotal(kpiInvoiceTotalArr);
    }
  }, [invoices]);

  //invoice sub total
  let invoiceSubtotal = 0;
  for (let i of invoiceTotal) {
    invoiceSubtotal += i?.total;
  }

  return (
    <div className='col-xl-6 col-lg-6 col-xxl-6 col-md-12 col-sm-12'>
      <div className='card rounded-0 h-auto'>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item bg-primary rounded-0 text-white d-flex justify-content-between'>
            <span className='mb-0 fs-4'>KPI-INVOICE </span>
            <span className='fs-4'>
              Total: {numDifferentiation(invoiceSubtotal)}
            </span>
          </li>
        </ul>
        <div className='card-body p-0 rounded-0'>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead style={{ background: "#343A40" }}>
                <tr>
                  <th className='text-light ps-4 fs-5'>Department</th>
                  <th className='text-light ps-4 fs-5'>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceTotal?.length > 0 &&
                  invoiceTotal.map((invoice) => {
                    return (
                      <tr key={invoice?.department}>
                        <td className='ps-4'>{invoice?.department}</td>
                        <td className='ps-4'>
                          {numDifferentiation(invoice?.total)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiInvoice;
