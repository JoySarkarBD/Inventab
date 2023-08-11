import { useEffect, useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "./sales.css";

const SalesInvoiceDetails = () => {
  const { invoice_id } = useParams();
  const axios = useAxiosPrivate();

  const [invoiceDetails, setInvoiceDetails] = useState();
  const [loading, setLoading] = useState(false);

  const printRef = useRef();
  // load leads
  useEffect(() => {
    // fetch invoiceDetails table data
    const leads = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `invoices/fetch/all/invoices/?id=${invoice_id}`
        );
        setLoading(false);
        setInvoiceDetails(data?.results[0]);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    leads();
  }, [invoice_id]);

  return (
    <div>
      <PageTitle title='Invoices-Details' />
      <div className='d-flex justify-content-end mb-4'>
        {/* back btn */}
        <Link
          to='/dashboard/sales-invoices'
          className='btn btn-primary btn-common rounded-1 me-2'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
        {/* print btn */}
        <ReactToPrint
          trigger={() => (
            <button className='btn btn-primary text-white rounded-1 border-0 me-2 d-flex justify-content-center align-items-center'>
              <AiOutlinePrinter className='fs-4 me-2' />
              Print
            </button>
          )}
          content={() => printRef.current}
        />
      </div>
      <div ref={printRef} className='mx-2'>
        <div className='d-flex justify-content-center align-items-center'>
          <SectionTitle heading='Sales Invoice Details' />
        </div>
        {/* Billing Address Detail & Shipping address Detail including GST*/}
        <div className='row my-5 row-gap-2'>
          {/* Billing Address Detail */}
          <div className='col-12 col-md-6 col-lg-6'>
            <div className='invoice-details-card'>
              <div className='card-body d-flex'>
                <div className='me-auto'>
                  <h4 className='card-title'>Billing Address Detail</h4>
                  <p className='text-dark fs-4 my-2'>
                    Address:
                    <span className='fs-5'>
                      {" "}
                      {invoiceDetails?.billing_address?.address}
                    </span>
                  </p>
                  <p className='text-dark fs-4 my-2'>
                    Country:
                    <span className='fs-5'>
                      {" "}
                      {invoiceDetails?.billing_address?.country?.name}
                    </span>
                  </p>
                  <p className='text-dark fs-4 my-2'>
                    Company:
                    <span className='fs-5'>
                      {" "}
                      {invoiceDetails?.billing_address?.org?.company_name}
                    </span>
                  </p>
                  <p className='text-dark fs-4 my-2'>
                    Pin-Code:
                    <span className='fs-5'>
                      {" "}
                      {invoiceDetails?.billing_address?.pincode?.pin_code}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping address Detail including GST */}
          <div className='col-12 col-md-6 col-lg-6'>
            <div className='invoice-details-card'>
              <div className='card-body'>
                <h4 className='card-title'>
                  Shipping address Detail including GST
                </h4>
                <p className='text-dark fs-4 my-2'>
                  Address:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.shipping_address?.address}
                  </span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Country:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.shipping_address?.country?.name}
                  </span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Company:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.shipping_address?.org?.company_name}
                  </span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Pin-Code:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.shipping_address?.pincode?.pin_code}
                  </span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  GST:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.shipping_address?.gst_no}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Delivery Terms  */}
          <div className='col-12 col-md-6 col-lg-6'>
            <div className='invoice-details-card'>
              <div className='card-body'>
                <h4 className='card-title'>Payment & Delivery</h4>
                <p className='text-dark fs-4 my-2'>
                  Payment Terms:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.payment_term?.term}
                  </span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Payment Date:
                  <span className='fs-5'> {invoiceDetails?.payment_date}</span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Delivery Terms:
                  <span className='fs-5'> {invoiceDetails?.delivery_term}</span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Status:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.status === null
                      ? "------------"
                      : invoiceDetails?.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Created By Details  */}
          <div className='col-12 col-md-6 col-lg-6'>
            <div className='invoice-details-card'>
              <div className='card-body'>
                <h4 className='card-title'>Contact Details</h4>
                <p className='text-dark fs-4 my-2'>
                  Created By:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.created_by?.first_name +
                      " " +
                      invoiceDetails?.created_by?.last_name}
                  </span>
                </p>

                <p className='text-dark fs-4 my-2'>
                  Email:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.created_by?.email}
                  </span>
                </p>

                <p className='text-dark fs-4 my-2'>
                  Mobile:
                  <span className='fs-5'>
                    {" "}
                    {invoiceDetails?.created_by?.mobile}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body table-responsive'>
                <table className='table table-bordered'>
                  <thead style={{ background: "#343A40" }}>
                    <tr>
                      <th className='text-light ps-4 fs-5'>
                        Part No with Desc
                      </th>
                      <th className='text-light ps-4 fs-5'>Unit Value</th>
                      <th className='text-light ps-4 fs-5'>Qty</th>
                      <th className='text-light ps-4 fs-5'>Extd wo Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceDetails?.parts_invoice?.map((part) => {
                      return (
                        <tr key={part?.id}>
                          <td>
                            {part?.short_description}
                            <br />
                            <button
                              className='btn btn-primary btn-sm'
                              type='button'
                              data-bs-toggle='modal'
                              data-bs-target='#exampleModal'>
                              Serial no
                            </button>
                            {/* mrp in unit value */}
                            {/* Extd Wo Tax this will multipy by unit value and qty */}
                          </td>
                          <td>{part?.parts_no?.mrp}</td>
                          <td>{part?.quantity}</td>
                          <td>{part?.parts_no?.mrp * part?.quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for serial no */}
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead style={{ background: "#343A40" }}>
                  <tr>
                    <th className='text-light ps-4 fs-5'>No</th>
                    <th className='text-light ps-4 fs-5'>Serial No</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetails?.parts_invoice?.map((part) => {
                    return (
                      <tr key={part?.id}>
                        <td>
                          {part?.parts_no?.serialized_parts?.map(
                            (sn, index) => {
                              return <p key={sn?.id}>{"Sl-" + ++index}</p>;
                            }
                          )}
                        </td>
                        <td>
                          {part?.parts_no?.serialized_parts?.map((sn) => {
                            return <p key={sn?.id}>{sn?.serial_number}</p>;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceDetails;
