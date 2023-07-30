import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import Select from "react-select";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import axios from "../../../utils/axios/axios";
import "./sales.css";

const SalesInvoices = () => {
  const [search, setSearch] = useState("");
  const [invoices, setInvoice] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  const [selectedEl, setSelectedEL] = useState(null);

// fetch table
const getInvoiceList = async () => {
  try {
    setLoading(true);
    const response = (
      await axios.get(
        "invoices/fetch/all/invoices/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
      )
    ).data;
    setLoading(false);
    setInvoice(response);
    setSearchData(response);
  } catch (error) {
    setLoading(true);
    console.log(error);
  }
};

// load leads
useEffect(() => {
  getInvoiceList();
}, []);

// columns
const columns = [
  {
    name: "Inv No",
    cell: (row) => {
      return (
        <Link
          className='text-center text-primary'
          to={`${row?.invoice_number}`}>
          {row?.invoice_number}
        </Link>
      );
    },
  },

  {
    name: "Sub Org",
    selector: (row) => row?.sub_org || "No data found",
    sortable: true,
  },

  {
    name: "Client",
    selector: (row) => row?.org?.company_name || "No data found",
    sortable: true,
  },

  {
    name: "Sales Order",
    selector: (row) => row?.sale_order || "No data found",
    sortable: true,
  },

  // Ref PO No - which field is this in API?
  {
    name: "Ref PO No",
    selector: (row) => row?.po_no || "No data found",
    sortable: true,
  },

  // Value - which field is this in API?
  {
    name: "Value",
    selector: () => "No data found",
    sortable: true,
  },

  {
    name: "Dept",
    selector: (row) => row?.dept || "No data found",
    sortable: true,
  },

  {
    name: "Status",
    selector: (row) => row?.status || "No data found",
    sortable: true,
  },
];

// search function
useEffect(() => {
  let result;
  if (selectedEl?.value) {
    result = invoices.filter((invoice) => {
      switch (selectedEl?.value) {
        case "invoice_number":
          return invoice?.invoice_number
            ?.toLowerCase()
            ?.match(search.toLowerCase());

        case "client":
          return invoice?.org?.company_name
            ?.toLowerCase()
            ?.match(search.toLowerCase());

        case "sale_order":
          return invoice?.sale_order
            ?.toLowerCase()
            ?.match(search.toLowerCase());

        case "ref_po": //this property was not found
          return invoice?.po_no?.toLowerCase()?.match(search.toLowerCase());

        case "dept":
          return invoice?.dept?.toLowerCase()?.match(search.toLowerCase());
        case "status":
          return invoice?.status?.toLowerCase()?.match(search.toLowerCase());

        default:
          return invoices;
      }
    });
    setSearchData(result);
  } else {
    // if somehow failed the sorting
    setSearchData(invoices);
  }
}, [search, invoices, selectedEl?.value]);

// export as csv
const exportAsCsv = () => {
  let data = [];
  searchData.forEach((salesData) => {
    const csvObj = {
      "Inv No": salesData?.invoice_number || "No data found",
      "Sub Org": salesData?.sub_org || "No data found",
      Client: salesData?.org?.company_name || "No data found",
      "Sales Order": salesData?.sale_order || "No data found",
      "Ref PO No": salesData?.po_no || "No data found", // Ref PO No - which field is this in API?
      Value: salesData?.value || "No data found", // Value - which field is this in API?
      Dept: salesData?.dept || "no data found",
      Status: salesData?.status || "No data found",
    };

    data.push(csvObj);
  });

  setCsv((prev) => [...prev, ...data]);
};

// react select options
const options = [
  { value: "invoice_number", label: "Invoice No" },
  { value: "client", label: "Client" },
  { value: "sale_order", label: "Sale Order" },
  { value: "ref_po", label: "Ref PO" },
  { value: "dept", label: "Department" },
  { value: "status", label: "Status" },
];

  return (
    <div>
      <PageTitle title="Invoices" />
      <SectionTitle title="Invoices" />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title={<h2>Invoices</h2>}
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
                      width:"170px"
                    },
                  },
                }}
                noContextMenu
                fixedHeader
                fixedHeaderScrollHeight="550px"
                pagination
                striped
                highlightOnHover
                subHeader
                progressPending={loading}
                actions={
                  <CSVLink
                    enclosingCharacter={` `}
                    data={csv}
                    filename={`Invoices-${new Date(
                      Date.now()
                    ).toLocaleDateString("en-IN")}`}
                    className="bg-primary btn text-white mb-3 border-0 d-flex align-items-center"
                    onClick={exportAsCsv}
                  >
                    <FiDownload className="fs-4 me-2" />
                    Export as CSV
                  </CSVLink>
                }
                subHeaderComponent={
                  <div className='searchBox-salesLead rounded my-4'>
                    {/* Select Area */}
                    <Select
                      className='select text-start'
                      options={options}
                      onChange={setSelectedEL}
                      isClearable
                      isSearchable
                      placeholder='Search'
                    />
                    {/* Input Search Area */}
                    <input
                      type='search'
                      placeholder='Search here'
                      className='form-control shadow-none' /* border-0 bg-transparent shadow-none */
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                }
                subHeaderAlign="left"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoices;
