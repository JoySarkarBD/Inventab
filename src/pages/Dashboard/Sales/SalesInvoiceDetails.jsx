import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlinePrinter } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import axios from "../../../utils/axios/axios";
import "./sales.css";

const SalesInvoiceDetails = () => {
  const { invoice_id } = useParams();

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

  // columns
  const columns = [
    {
      name: "Part No with Desc",
      cell: () => "No Data Found",
      sortable: true,
    },

    {
      name: "Unit Value",
      selector: () => "No data found",
      sortable: true,
    },

    {
      name: "Qty",
      selector: () => "No data found",
      sortable: true,
    },

    {
      name: "Extd wo Tax",
      selector: () => "No data found",
      sortable: true,
    },
  ];

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
          <SectionTitle heading='Sales Invoice xxx' />
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
              </div>
            </div>
          </div>

          <div className='col-12'>
            <div className='invoice-details invoice-details-card mt-3 card-body'>
              {/* Payment Terms */}
              <div className='d-flex align-items-center column-gap-3 mb-2'>
                <p className='m-0 title'>
                  Payment Terms
                  <span className='ms-1'>
                    : {invoiceDetails?.payment_term?.term}
                  </span>
                </p>
              </div>
              <div className='d-flex align-items-center column-gap-3 mb-2'>
                <p className='m-0 title'>
                  Payment Date{" "}
                  <span className='ms-1'>: {invoiceDetails?.payment_date}</span>
                </p>
              </div>

              {/* Delivery Terms */}
              <div className='d-flex align-items-center column-gap-3 mb-2'>
                <p className='m-0 title'>
                  Delivery Terms{" "}
                  <span className='ms-1'>
                    : {invoiceDetails?.delivery_term}
                  </span>
                </p>
              </div>

              {/* Status */}
              <div className='d-flex align-items-center column-gap-3 mb-2'>
                <p className='m-0 title'>
                  Status{" "}
                  <span className='ms-1'>
                    :{" "}
                    {invoiceDetails?.status === null
                      ? "------------"
                      : invoiceDetails?.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*user contact email name */}
        <div className='row my-4'>
          <div className='col-12 col-md-12 col-lg-12'>
            <div className='card bg-primary userInfo-invoice-details'>
              <div className='card-body text-center'>
                <span className='text-white card-title'>
                  Contact person, mail, email
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body'>
                <DataTable
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
                      },
                    },
                  }}
                  noContextMenu
                  fixedHeader
                  fixedHeaderScrollHeight='550px'
                  pagination
                  striped
                  highlightOnHover
                  progressPending={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoiceDetails;
