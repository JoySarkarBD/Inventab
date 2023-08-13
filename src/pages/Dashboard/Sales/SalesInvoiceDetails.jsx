import { useEffect, useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "./sales.css";

const data = {
  id: "fcc644c1-9579-42d7-8f94-d6744ce8e72a",
  org: {
    id: "64cdfb09-1b78-4bc6-8d9f-c7cd2b38f50a",
  },
  sale_order: "SO-100000194-000025-(1831123030)",
  parts_invoice: [
    {
      id: "14a8b278-cbc2-432a-b4b8-6814a1d83eaf",
      parts_no: {
        id: "55032561-c0bc-40ec-bfeb-ee3f410b0271",
        part_type: {
          id: 3,
          created: "2021-08-10T07:30:09.466454+05:30",
          modified: "2021-10-07T15:33:23.967533+05:30",
          name: "Product",
        },
        gst_itm: {
          id: "f80e93a9-1605-4434-a356-f005df6f873d",
          hsn_or_sac: "90318000",
          description:
            "MEASURING OR CHECKING INSTRUMENTS, APPLIANCES AND MACHINES, NOT SPECIFIED OR INCLUDED ELSEWHERE IN THIS CHAPTER; PROFILE PROJECTORS OTHER INSTRUMENTS, APPLIANCES AND MACHINES",
        },
        serialized_parts: [
          {
            id: "af13ef5f-117b-4ca8-9d4d-6b92b9bfa340",
            serial_number: "08:3A:F2:15:CC:24",
          },
          {
            id: "af13ef5f-117b-4ca8-9d4d-6b92b9bfa370",
            serial_number: "08:3A:F2:15:CC:26",
          },
          {
            id: "af13ef5f-117b-4ca8-9d4d-6b92b9bfa390",
            serial_number: "08:3A:F2:15:CC:28",
          },
        ],
        created: "2022-07-14T18:45:35.828393+05:30",
        modified: "2023-07-09T09:49:30.997513+05:30",
        internal_part_no: "PN-INV-0000000210",
        part_number: "ST000070",
        customer_part_number: "ST000070",
        bom: false,
        short_description: "ST000070 - DA Lite WIFI Dongle Auto (Pink)",
        long_description: "ST000070 - DA Lite WIFI Dongle Auto (Pink)",
        mrp: 8500.0,
        weight: "0.08",
        length: "100.00",
        breadth: "60.00",
        height: "30.00",
        serialization: true,
        is_active: true,
        warranty_period: 12,
        warranty_terms: "12 MONTH",
        packing_charge: 0.0,
        manufacturer: "e9524f74-e70e-4aee-aeb1-56825d8e23ee",
        part_category: 5,
        sub_category: 13,
      },
      created: "2023-07-07T17:33:54.951442+05:30",
      modified: "2023-07-07T17:33:54.951476+05:30",
      quantity: 150,
      customer_part_no: "ST000070",
      price: 8500.0,
      warranty: 12,
      short_description: "ST000070 - DA Lite WIFI Dongle Auto (Pink)",
      invoice: "fcc644c1-9579-42d7-8f94-d6744ce8e72a",
      part: "249c3d04-5b5e-4eae-978d-33374e895bec",
    },
    {
      id: "14a8b278-cbc2-432a-b4b8-6814a1d83eag",
      parts_no: {
        id: "55032561-c0bc-40ec-bfeb-ee3f410b0271",
        part_type: {
          id: 3,
          created: "2021-08-10T07:30:09.466454+05:30",
          modified: "2021-10-07T15:33:23.967533+05:30",
          name: "Product",
        },
        gst_itm: {
          id: "f80e93a9-1605-4434-a356-f005df6f873d",
          hsn_or_sac: "90318000",
          description:
            "MEASURING OR CHECKING INSTRUMENTS, APPLIANCES AND MACHINES, NOT SPECIFIED OR INCLUDED ELSEWHERE IN THIS CHAPTER; PROFILE PROJECTORS OTHER INSTRUMENTS, APPLIANCES AND MACHINES",
        },
        serialized_parts: [
          {
            id: "af13ef5f-117b-4ca8-9d4d-6b92b9bfa341",
            serial_number: "08:3A:F2:15:CC:31",
          },
          {
            id: "af13ef5f-117b-4ca8-9d4d-6b92b9bfa342",
            serial_number: "08:3A:F2:15:CC:25",
          },
        ],
        created: "2022-07-14T18:45:35.828393+05:30",
        modified: "2023-07-09T09:49:30.997513+05:30",
        internal_part_no: "PN-INV-0000000210",
        part_number: "ST000012",
        customer_part_number: "ST000012",
        bom: false,
        short_description: "ST00012 - DA Lite WIFI Dongle Auto (Yellow)",
        long_description: "ST00012 - DA Lite WIFI Dongle Auto (Yellow)",
        mrp: 85300.0,
        weight: "0.08",
        length: "100.00",
        breadth: "60.00",
        height: "30.00",
        serialization: true,
        is_active: true,
        warranty_period: 12,
        warranty_terms: "12 MONTH",
        packing_charge: 0.0,
        manufacturer: "e9524f74-e70e-4aee-aeb1-56825d8e23ee",
        part_category: 5,
        sub_category: 13,
      },
      created: "2023-07-07T17:33:54.951442+05:30",
      modified: "2023-07-07T17:33:54.951476+05:30",
      quantity: 150,
      customer_part_no: "ST000012",
      price: 500.0,
      warranty: 12,
      short_description: "ST00012 - DA Lite WIFI Dongle Auto (Yellow)",
      invoice: "fcc644c1-9579-42d7-8f94-d6744ce8e72a",
      part: "249c3d04-5b5e-4eae-978d-33374e895becaaa",
    },
    {
      id: "14a8b278-cbc2-432a-b4b8-6814a1d83eaw",
      parts_no: {
        id: "55032561-c0bc-40ec-bfeb-ee3f410b0271",
        part_type: {
          id: 3,
          created: "2021-08-10T07:30:09.466454+05:30",
          modified: "2021-10-07T15:33:23.967533+05:30",
          name: "Product",
        },
        gst_itm: {
          id: "f80e93a9-1605-4434-a356-f005df6f873d",
          hsn_or_sac: "90318000",
          description:
            "MEASURING OR CHECKING INSTRUMENTS, APPLIANCES AND MACHINES, NOT SPECIFIED OR INCLUDED ELSEWHERE IN THIS CHAPTER; PROFILE PROJECTORS OTHER INSTRUMENTS, APPLIANCES AND MACHINES",
        },
        serialized_parts: [
          {
            id: "af13ef5f-117b-4ca8-9d4d-6b92b9bfa344",
            serial_number: "08:3A:F2:15:CC:35",
          },
          {
            id: "af13ef5f-117b-4ca8-9d4d-6b92b9bfa347",
            serial_number: "08:3A:F2:15:CC:38",
          },
        ],
        created: "2022-07-14T18:45:35.828393+05:30",
        modified: "2023-07-09T09:49:30.997513+05:30",
        internal_part_no: "PN-INV-0000000210",
        part_number: "ST000090",
        customer_part_number: "ST000090",
        bom: false,
        short_description: "ST000090- DA Lite WIFI Dongle Auto (Red)",
        long_description: "ST000090- DA Lite WIFI Dongle Auto (Red)",
        mrp: 8500.0,
        weight: "0.08",
        length: "100.00",
        breadth: "60.00",
        height: "30.00",
        serialization: true,
        is_active: true,
        warranty_period: 12,
        warranty_terms: "12 MONTH",
        packing_charge: 0.0,
        manufacturer: "e9524f74-e70e-4aee-aeb1-56825d8e23ees",
        part_category: 5,
        sub_category: 13,
      },
      created: "2023-07-07T17:33:54.951442+05:30",
      modified: "2023-07-07T17:33:54.951476+05:30",
      quantity: 40,
      customer_part_no: "ST000090",
      price: 800.0,
      warranty: 12,
      short_description: "ST000090- DA Lite WIFI Dongle Auto (Red)",
      invoice: "fcc644c1-9579-42d7-8f94-d6744ce8e72a",
      part: "249c3d04-5b5e-4eae-978d-33374e895bec",
    },
  ],
};

const SalesInvoiceDetails = () => {
  const [serializedNo, setSerializedNo] = useState("");
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
                              data-bs-target='#exampleModal'
                              onClick={() => setSerializedNo(part.id)}>
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
                    <tr>
                      <td></td>
                      <td></td>
                      <td>CGST</td>
                      <td>20</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>SGST</td>
                      <td>20</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>IGST</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Shipment Charge</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Gross Total</td>
                      <td>120</td>
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
              <table className='table table-bordered'>
                <thead style={{ background: "#343A40" }}>
                  <tr>
                    <th className='text-light ps-4 fs-5'>No</th>
                    <th className='text-light ps-4 fs-5'>Serial No</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetails?.parts_invoice?.map((part) => {
                    if (part?.id === serializedNo) {
                      return (
                        <tr key={part?.id}>
                          {part?.parts_no?.serialized_parts?.length ? (
                            <>
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
                                {part?.parts_no?.serialized_parts?.map((sn) => {
                                  return (
                                    <p key={sn?.id}>{sn?.serial_number}</p>
                                  );
                                })}
                              </td>
                            </>
                          ) : (
                            <td colSpan='2' className='text-center'>
                              No Data Found
                            </td>
                          )}
                        </tr>
                      );
                    }
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
