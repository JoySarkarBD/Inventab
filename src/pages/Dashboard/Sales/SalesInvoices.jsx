import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import axios from "../../../utils/axios/axios";
import "./sales.css";

const SalesInvoices = () => {
  const [search, setSearch] = useState("");
  const [invoice, setInvoice] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  const [selectedFiled, setSelectedField] = useState("");

  // fetch table
  const leads = async () => {
    try {
      setLoading(true);
      const response = (
        await axios.get(
          "invoices/fetch/all/invoices/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
        )
      ).data;
      setLoading(false);
      setInvoice(response?.results);
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
      name: "Inv No",
      cell: (row) => {
        return (
          <Link className='text-center text-primary' to="sales-invoices-details">
            {row?.invoice_number}
          </Link>
        );
      },
      sortable: true,
    },

    {
      name: "Sub Org",
      selector: (row) => row?.sub_org || "No data found",
      sortable: true,
    },

    {
      name: "Client",
      selector: (row) => row?.org?.company_name,
      sortable: true,
    },

    {
      name: "Sales Order",
      selector: (row) => row?.sale_order,
      sortable: true,
    },

    // Ref PO No - which field is this in API?
    {
      name: "Ref PO No",
      selector: (row) => row?.ref_po,
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
      selector: (row) => row?.dept,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row?.status,
      sortable: true,
    },
  ];

  // search function
  useEffect(() => {
    let result;
    if (selectedFiled) {
      result = invoice.filter((saleData) => {
        switch (selectedFiled) {
          case "so_id":
            return saleData?.so_id?.toLowerCase()?.match(search.toLowerCase());

          case "client":
            return saleData?.client?.company_name
              ?.toLowerCase()
              ?.match(search.toLowerCase());

          case "description":
            return saleData?.description
              ?.toLowerCase()
              ?.match(search.toLowerCase());

          case "department":
            return saleData?.department?.name
              ?.toLowerCase()
              ?.match(search.toLowerCase());
          case "status":
            return saleData?.status?.toLowerCase()?.match(search.toLowerCase());

          default:
            return invoice;
        }
      });
      setSearchData(result);
    } else {
      // if somehow failed the sorting
      setSearchData(invoice);
    }
  }, [search, invoice, selectedFiled]);

  // export as csv
  const exportAsCsv = () => {
    let data = [];
    searchData.forEach((salesData) => {
      const csvObj = {
        "Inv No": salesData?.invoice_number || "No data found",
        "Sub Org": salesData?.sub_org || "No data found",
        Client: salesData?.org?.company_name || "No data found",
        "Sales Order": salesData?.sale_order || "No data found",
        "Ref PO No": salesData?.ref_po || "No data found", // Ref PO No - which field is this in API?
        Value: salesData?.value || "No data found", // Value - which field is this in API?
        Dept: salesData?.dept || "no data found",
        Status: salesData?.status || "No data found",
      };

      data.push(csvObj);
    });

    setCsv((prev) => [...prev, ...data]);
  };

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
                  <div className="d-flex align-items-center search-area w-100 border overflow-hidden position-relative rounded">
                    <select
                      className="form-select form-select-lg select-type w-25 border bg-transparent border-0 shadow-none"
                      aria-label=".form-select-lg example"
                      onChange={(e) => setSelectedField(e.target.value)}
                    >
                      <option selected disabled>
                        Select Search Type
                      </option>
                      <option value="invoice_number">Inv No</option>
                      <option value="client">Client</option>
                      <option value="description">Description</option>
                      <option value="department">Department</option>
                      <option value="status">Status</option>
                    </select>
                    <div className="separator-light position-absolute"></div>
                    <input
                      type="text"
                      placeholder="Search here"
                      className="form-control border-0 bg-transparent shadow-none"
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
