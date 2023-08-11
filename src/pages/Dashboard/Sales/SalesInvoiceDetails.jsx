import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import axios from "../../../utils/axios/axios";
import "./sales.css";

const SalesInvoiceDetails = () => {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch invoiceDetails table data
  const leads = async () => {
    try {
      setLoading(true);
      const response = (
        await axios.get(
          "invoices/fetch/all/invoices/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
        )
      ).data;
      setLoading(false);
      setInvoiceDetails(response?.results);
      setSearchData(response?.results);
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
      <PageTitle title="Invoices-Details" />
      <SectionTitle heading="Sales Invoice xxx" />
      {/* Billing Address Detail & Shipping address Detail including GST*/}
      <div className="row my-5 row-gap-2">
        {/* Billing Address Detail */}
        <div className="col-12 col-md-6 col-lg-6">
          <div className="invoice-details-card bg-white">
            <div className="card-body d-flex">
              <div className="me-auto">
                <h4 className="card-title">Billing Address Detail</h4>
                <p className="mt-3">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Obcaecati qui fuga placeat beatae porro. Molestias voluptas
                  adipisci asperiores vel. Fuga aliquam ullam quod rerum facilis
                  autem accusantium est amet veniam!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping address Detail including GST */}
        <div className="col-12 col-md-6 col-lg-6">
          <div className="invoice-details-card bg-white">
            <div className="card-body">
              <h4 className="card-title">
                Shipping address Detail including GST
              </h4>
              <p className="mt-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Obcaecati qui fuga placeat beatae porro. Molestias voluptas
                adipisci asperiores vel. Fuga aliquam ullam quod rerum facilis
                autem accusantium est amet veniam!
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 invoice-details-card">
          <div className="invoice-details bg-white mt-3 card-body">
            {/* Payment Terms */}
            <div className="d-flex align-items-center column-gap-3 mb-2">
              <p className="m-0 title">
                Payment Terms <span className="ms-1">:</span>
              </p>
              <p className="m-0">XXX</p>
            </div>

            {/* Delivery Terms */}
            <div className="d-flex align-items-center column-gap-3 mb-2">
              <p className="m-0 title">
                Delivery Terms <span className="ms-1">:</span>
              </p>
              <p className="m-0">XXX</p>
            </div>

            {/* Payment */}
            <div className="d-flex align-items-center column-gap-3 mb-2">
              <p className="m-0 title">
                Delivery Terms <span className="ms-1">:</span>
              </p>
              <p className="m-0">XXX</p>
            </div>

            {/* Status */}
            <div className="d-flex align-items-center column-gap-3 mb-2">
              <p className="m-0 title">
                Status <span className="ms-1">:</span>
              </p>
              <p className="m-0">XXX</p>
            </div>
          </div>
        </div>
      </div>

      {/*user contact email name */}
      <div className="row my-4">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card bg-primary userInfo-invoice-details">
            <div className="card-body text-center">
              <span className="text-white card-title">
                Contact person, mail, email
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                columns={columns}
                data={searchData}
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
                fixedHeaderScrollHeight="550px"
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
