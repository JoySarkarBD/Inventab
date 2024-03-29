/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PageTitle from "../../../components/Shared/PageTitle";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../ui/Loader";
import { calculateGST, inWords } from "../../../utils/utilityFunc/utilityFunc";
import logo from "./../../../assets/images/favicon.ico";
import "./sales.css";

const SalesInvoiceDetails = () => {
  const [serializedNo, setSerializedNo] = useState("");
  // same address
  const [isSameAddress, setIsSameAddress] = useState({
    CGST: 0,
    SGST: 0,
    IGST: 0,
    shipping: 0,
    grossTotal: 0,
  });

  //diff address
  const [isDiffAddress, setIsDiffAddress] = useState({
    IGST: 0,
    shipping: 0,
    grossTotal: 0,
  });

  const { invoice_id } = useParams();
  const axios = useAxiosPrivate();

  const [invoiceDetails, setInvoiceDetails] = useState();

  const [loading, setLoading] = useState(false);

  const printRef = useRef();
  // load leads
  useEffect(() => {
    // fetch invoiceDetails table data
    let isMount = true;
    const controller = new AbortController();
    const leads = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `invoices/fetch/all/invoices/?id=${invoice_id}`,
          { signal: controller.signal }
        );
        setLoading(false);
        isMount && setInvoiceDetails(data?.results[0]);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    leads();

    return () => {
      (isMount = false), controller.abort();
    };
  }, [invoice_id, axios]);

  // check shipping or billign address same or not
  useEffect(() => {
    if (
      invoiceDetails?.billing_address?.id ===
      invoiceDetails?.shipping_address?.id
    ) {
      // calculate gst
      let result = calculateGST(invoiceDetails);

      // shipping charge
      let shippingCharge = invoiceDetails?.shipment_charges;

      //set data for same address ['CGST', "SGST"]
      setIsSameAddress({
        CGST: parseFloat(result / 2).toFixed(2),
        SGST: parseFloat(result / 2).toFixed(2),
        IGST: 0,
        shipping: parseFloat(shippingCharge).toFixed(2),
        grossTotal: parseFloat(result + shippingCharge).toFixed(2),
      });
    } else {
      // calculate gst
      let result = calculateGST(invoiceDetails);
      // shipping charge
      let shippingCharge = invoiceDetails?.shipment_charges;

      //set data for diff address ['IGST']
      setIsDiffAddress({
        IGST: parseFloat(result).toFixed(2),
        shipping: parseFloat(shippingCharge).toFixed(2),
        grossTotal: parseFloat(result + shippingCharge).toFixed(2),
      });
    }
  }, [invoiceDetails]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <PageTitle title='Invoices-Details' />
          <div className='d-flex justify-content-end mb-0'>
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
          <div ref={printRef} className='container-fluid print-area m-0 p-0'>
            <img src={logo} alt='' className='logo-position' />
            {/* section title start */}
            <div className='d-flex justify-content-center align-items-center '>
              <h1 className='fs-3 fw-bold'>Tax Invoice</h1>
            </div>
            <h4 className='text-center fs-5 fw-semibold'>
              {invoiceDetails?.invoice_number}
            </h4>
            {/* section title end */}
            {/* Billing Address Detail & Shipping address Detail including GST*/}
            <div className='row mt-4 mb-2 row-gap-2'>
              {/* Billing Address Detail */}
              <div className='col-12 col-md-6 col-lg-6 '>
                <div className='invoice-details-card'>
                  <div className='card-body d-flex p-3'>
                    <div className='me-auto'>
                      <h4 className='card-title invo_card_title'>
                        Billing Address Detail
                      </h4>

                      <p className='text-dark invo_card_txt my-1'>
                        <span className='invo_card_txt text-black'>
                          {" "}
                          {invoiceDetails?.billing_address?.org?.company_name}
                        </span>
                      </p>

                      <p className='text-dark invo_card_txt my-1'>
                        <span className='invo_card_txt text-black'>
                          {" "}
                          {invoiceDetails?.billing_address?.address}
                        </span>
                      </p>

                      <p className='text-dark invo_card_txt my-1'>
                        <span className='invo_card_txt text-black'>
                          {" "}
                          {invoiceDetails?.billing_address?.pincode?.pin_code}
                          {", "}
                        </span>

                        <span className='invo_card_txt text-black'>
                          {invoiceDetails?.billing_address?.country?.name}
                        </span>
                      </p>
                      <p className='text-dark invo_card_txt my-1'>
                        GST:
                        <span className='invo_card_txt text-black'>
                          {" "}
                          {invoiceDetails?.billing_address?.gst_no}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping address Detail including GST */}
              <div className='col-12 col-md-6 col-lg-6'>
                <div className='invoice-details-card '>
                  <div className='card-body p-3'>
                    <h4 className='card-title invo_card_title'>
                      Shipping address including GST
                    </h4>
                    <p className='text-dark invo_card_txt my-1'>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.shipping_address?.org?.company_name}
                      </span>
                    </p>

                    <p className='text-dark invo_card_txt my-1'>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.shipping_address?.address}
                      </span>
                    </p>

                    <p className='text-dark invo_card_txt my-1'>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.shipping_address?.pincode?.pin_code}
                        {", "}
                      </span>

                      <span className='invo_card_txt text-black'>
                        {invoiceDetails?.shipping_address?.country?.name}
                      </span>
                    </p>

                    <p className='text-dark invo_card_txt my-1 opacity-0'>
                      GST:
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.shipping_address?.gst_no || `N/A`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment & Delivery Terms  */}
              <div className='col-12 col-md-6 col-lg-6'>
                <div className='invoice-details-card'>
                  <div className='card-body p-3'>
                    <h4 className='card-title invo_card_title'>
                      Payment & Delivery
                    </h4>
                    <p className='text-dark invo_card_txt my-1'>
                      <span className='fw-bold'>Payment Terms: </span>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.payment_term?.term}
                      </span>
                    </p>
                    <p className='text-dark invo_card_txt my-1'>
                      <span className='fw-bold'> Payment Date:</span>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.payment_date}
                      </span>
                    </p>
                    <p className='text-dark invo_card_txt my-1'>
                      <span className='fw-bold'>Delivery Terms:</span>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.delivery_term}
                      </span>
                    </p>
                    <p className='text-dark invo_card_txt my-1'>
                      <span className='fw-bold'> Status:</span>
                      <span className='invo_card_txt text-black'>
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
                  <div className='card-body p-3'>
                    <h4 className='card-title invo_card_title '>
                      Contact Details
                    </h4>
                    <p className='text-dark invo_card_txt my-1'>
                      <span className='fw-bold'>Created By:</span>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.created_by?.first_name +
                          " " +
                          invoiceDetails?.created_by?.last_name}
                      </span>
                    </p>

                    <p className='text-dark invo_card_txt my-1'>
                      <span className='fw-bold'> Email:</span>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.created_by?.email}
                      </span>
                    </p>

                    <p className='text-dark invo_card_txt my-1'>
                      <span className='fw-bold'>Mobile:</span>
                      <span className='invo_card_txt text-black'>
                        {" "}
                        {invoiceDetails?.created_by?.mobile}
                      </span>
                    </p>

                    <p className='text-dark invo_card_txt my-1 opacity-0'>
                      <span className='fw-bold'> Mobile:</span>
                      <span className='invo_card_txt text-black'>
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
                  <div className='card-body table-responsive p-3'>
                    <table className='table table-bordered'>
                      <thead style={{ background: "#343A40" }}>
                        <tr>
                          <th className='text-light ps-4 fs-6 fw-bold'>
                            Part No with Desc
                          </th>
                          <th className='text-light ps-4 fs-6 fw-bold'>
                            Unit Value
                          </th>
                          <th className='text-light ps-4 fs-6 fw-bold'>Qty</th>
                          <th className='text-light ps-4 fs-6 fw-bold'>
                            Extd wo Tax
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceDetails?.parts_invoice?.map(part => {
                          return (
                            <tr key={part?.id}>
                              {part?.parts_no?.serialized_parts?.length > 0 ? (
                                <>
                                  {" "}
                                  <td
                                    onClick={() => setSerializedNo(part.id)}
                                    className='text-primary link_txt'
                                    data-bs-toggle='modal'
                                    data-bs-target='#exampleModal'
                                    style={{ cursor: "pointer" }}>
                                    {part?.short_description}
                                  </td>
                                </>
                              ) : (
                                <td className='text-black tb_dt'>
                                  {part?.short_description}
                                </td>
                              )}
                              <td className='tb_dt text-black'>
                                {part?.price}
                              </td>
                              <td className='tb_dt text-black'>
                                {part?.quantity}
                              </td>
                              <td className='tb_dt text-black'>
                                {parseFloat(
                                  part?.price * part?.quantity
                                ).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                        {isSameAddress?.CGST && !isDiffAddress.IGST ? (
                          <>
                            {" "}
                            <tr>
                              <td colSpan='2'></td>
                              <td className='tb_dt text-black'>CGST</td>
                              <td className='tb_dt text-black'>
                                {isSameAddress?.CGST}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan='2'></td>
                              <td className='tb_dt text-black'>SGST</td>
                              <td className='tb_dt text-black'>
                                {isSameAddress?.SGST}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan='2'></td>
                              <td className='tb_dt text-black'>
                                Shipment Charge
                              </td>
                              <td className='tb_dt text-black'>
                                {isSameAddress?.shipping}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan='2'></td>
                              <td className='tb_dt text-black'>Gross Total</td>
                              <td className='tb_dt text-black'>
                                {isSameAddress?.grossTotal}
                              </td>
                            </tr>
                          </>
                        ) : (
                          <>
                            {" "}
                            <tr>
                              <td colSpan='2'></td>

                              <td className='tb_dt text-black'>IGST</td>
                              <td className='tb_dt text-black'>
                                {isDiffAddress?.IGST}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan='2'></td>

                              <td className='tb_dt text-black'>
                                Shipment Charge
                              </td>
                              <td className='tb_dt text-black'>
                                {isDiffAddress?.shipping}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan='2'></td>
                              <td className='tb_dt text-black'>Gross Total</td>
                              <td className='tb_dt text-black'>
                                {isDiffAddress?.grossTotal}
                              </td>
                            </tr>
                          </>
                        )}
                        <tr>
                          {isSameAddress?.grossTotal &&
                          !isDiffAddress?.grossTotal ? (
                            <td
                              className='tb_dt fw-bold text-black'
                              colSpan='4'>{`In words: ${inWords(
                              parseFloat(isSameAddress?.grossTotal)
                            )}`}</td>
                          ) : (
                            <td
                              className='tb_dt fw-bold text-black'
                              colSpan='4'>{`In Words: ${inWords(
                              parseFloat(isDiffAddress?.grossTotal)
                            )}`}</td>
                          )}
                        </tr>
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
                  <table className='table table-bordered text-center'>
                    <thead style={{ background: "#343A40" }}>
                      <tr>
                        <th className='text-light ps-4 fs-5'>No</th>
                        <th className='text-light ps-4 fs-5'>Serial No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceDetails?.parts_invoice?.map(part => {
                        if (part?.id === serializedNo) {
                          return (
                            <tr key={part?.id}>
                              <td>
                                {part?.parts_no?.serialized_parts?.map(
                                  (sn, index) => {
                                    return (
                                      <p key={sn?.id}>{"Sl-" + ++index}</p>
                                    );
                                  }
                                )}
                              </td>
                              <td>
                                {part?.parts_no?.serialized_parts?.map(sn => {
                                  return (
                                    <p key={sn?.id}>{sn?.serial_number}</p>
                                  );
                                })}
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesInvoiceDetails;
