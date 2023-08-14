import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../ui/Loader";
import {
  kpiEachTotal,
  numDifferentiation,
} from "../../utils/utilityFunc/utilityFunc";

const KpiInvoice = () => {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId } = auth;
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [invoiceTotal, setInvoicesTotal] = useState([]);

  // load kpi invoices
  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();
    // get kpi invoices
    const getKpiInvoice = async () => {
      try {
        setLoading(true);
        // 0a055b26-ae15-40a9-8291-25427b94ebb3
        const { data } = await axios.get(
          `pipo/kpi/list/?org=${orgId}&metric=INVOICE`,
          { signal: controller.signal }
        );
        setLoading(false);
        isMount && setInvoices(data?.results);
      } catch (error) {
        setLoading(false);
        console.log(error?.message);
      }
    };
    getKpiInvoice();
    return () => {
      (isMount = false), controller.abort();
    };
  }, [axios, orgId]);

  //kpi PO each sub total
  useEffect(() => {
    if (invoices.length > 0) {
      let kpiInvoiceTotalArr = [];

      invoices.forEach((invoice) => {
        // find the specific obj
        let findInvoiceEntry = kpiInvoiceTotalArr.find(
          (inv) => inv.department === invoice.data
        );
        // if not found then add
        if (!findInvoiceEntry) {
          findInvoiceEntry = {
            department: invoice?.department,
            total: kpiEachTotal(invoice),
          };
          kpiInvoiceTotalArr.push(findInvoiceEntry);
        }
      });
      setInvoicesTotal(kpiInvoiceTotalArr);
    }
  }, [invoices, loading]);

  //invoice sub total
  let invoiceSubtotal = 0;
  for (let i of invoiceTotal) {
    invoiceSubtotal += i?.total;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default KpiInvoice;
