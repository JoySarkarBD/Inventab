import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import axios from "../../../utils/axios/axios";
import "./sales.css";

const SalesInvoiceDetails = () => {
  const { invoice_id } = useParams();

  const [invoiceDetails, setInvoiceDetails] = useState();
  const [loading, setLoading] = useState(false);

  /* destructuring */
  const {
    billing_address,
    shipping_address,
    payment_term,
    payment_date,
    delivery_term,
  } = invoiceDetails;

  // fetch invoiceDetails table data
  const leads = async () => {
    try {
      setLoading(true);
      const response = (
        await axios.get(`invoices/fetch/all/invoices/?id=${invoice_id}`)
      ).data;
      setLoading(false);
      setInvoiceDetails(response?.results[0]);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  // load leads
  useEffect(() => {
    leads();
  }, []);

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
      <SectionTitle heading='Sales Invoice xxx' />
      <div className='d-flex justify-content-end me-5 mb-4'>
        <Link
          to='/dashboard/sales-invoices'
          className='btn btn-primary btn-common rounded-1'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
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
                    {!billing_address?.address ? "" : billing_address?.address}
                  </span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Country:
                  <span className='fs-5'>
                    {" "}
                    {!billing_address?.country?.name
                      ? ""
                      : billing_address?.country?.name}
                  </span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Country:
                  <span className='fs-5'>
                    {" "}
                    {!billing_address?.org?.company_name
                      ? ""
                      : billing_address?.org?.company_name}
                  </span>
                </p>
                <p className='text-dark fs-4 my-2'>
                  Pin-Code:
                  <span className='fs-5'>
                    {" "}
                    {!billing_address?.pincode?.pin_code
                      ? ""
                      : billing_address?.pincode?.pin_code}
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
                  {!shipping_address?.address ? "" : shipping_address?.address}
                </span>
              </p>
              <p className='text-dark fs-4 my-2'>
                Country:
                <span className='fs-5'>
                  {" "}
                  {!shipping_address?.country?.name
                    ? ""
                    : shipping_address?.country?.name}
                </span>
              </p>
              <p className='text-dark fs-4 my-2'>
                Country:
                <span className='fs-5'>
                  {" "}
                  {!shipping_address?.org?.company_name
                    ? ""
                    : shipping_address?.country?.name}
                </span>
              </p>
              <p className='text-dark fs-4 my-2'>
                Pin-Code:
                <span className='fs-5'>
                  {" "}
                  {!shipping_address?.pincode?.pin_code ? "" : shipping_address}
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
                Payment Terms{" "}
                <span className='ms-1'>
                  :{!payment_term?.term ? "" : payment_term?.term}
                </span>
              </p>
              <p className='m-0 title'>
                Payment Date{" "}
                <span className='ms-1'>
                  :{!payment_date ? "" : payment_date}
                </span>
              </p>
            </div>

            {/* Delivery Terms */}
            <div className='d-flex align-items-center column-gap-3 mb-2'>
              <p className='m-0 title'>
                Delivery Terms{" "}
                <span className='ms-1'>
                  :{!delivery_term ? "" : delivery_term}
                </span>
              </p>
              <p className='m-0'>XXX</p>
            </div>

            {/* Status */}
            <div className='d-flex align-items-center column-gap-3 mb-2'>
              <p className='m-0 title'>
                Status <span className='ms-1'>: {!status ? "" : status}</span>
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
  );
};

export default SalesInvoiceDetails;
