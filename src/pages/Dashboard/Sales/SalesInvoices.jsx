import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import Select from "react-select";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";

import { useAuth } from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../ui/Loader";
import "./sales.css";

const SalesInvoices = () => {
  const { auth } = useAuth();
  const axios = useAxiosPrivate();
  const [search, setSearch] = useState("");
  const [invoices, setInvoice] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  const [selectedEl, setSelectedEL] = useState(null);

  // load invoices
  useEffect(() => {
    // fetch table
    let isMount = true;
    const controller = new AbortController();
    const getInvoiceList = async () => {
      try {
        setLoading(true);
        const response = (
          await axios.get(`invoices/fetch/all/invoices/?org=${auth?.orgId}`, {
            signal: controller.signal,
          })
        ).data;
        setLoading(false);
        isMount && setInvoice(response?.results);
        isMount && setSearchData(response?.results);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    getInvoiceList();

    return () => {
      (isMount = false), controller.abort();
    };
  }, [auth?.orgId, axios]);

  //@desc  columns for react data table component
  const columns = [
    {
      name: "Inv No",
      cell: (row) => {
        return (
          <Link
            className='text-center text-info dk_theme_text'
            to={`/dashboard/sales-invoices/sales-invoices-details/${row?.id}`}>
            {row?.invoice_number}
          </Link>
        );
      },
    },

    {
      name: "Client",
      selector: (row) => row?.org?.company_name || "",
      sortable: true,
    },

    {
      name: "Sales Order",
      selector: (row) => row?.sale_order || "",
      sortable: true,
    },

    {
      name: "Ref PO No",
      selector: (row) => row?.po_no || "",
      sortable: true,
    },

    {
      name: "Value",
      selector: (row) => {
        let total = 0;
        row?.parts_invoice.forEach((part) => {
          total += part.price * part?.quantity;
        });
        return total;
      },
      sortable: true,
    },

    {
      name: "Invoice Date",
      selector: (row) =>
        new Date(row?.invoice_date).toLocaleDateString("en-IN") || "",
      sortable: true,
    },
    {
      name: "Dept",
      selector: (row) => row?.dept?.name || "",
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row?.status || "",
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
            return invoice?.dept?.name
              ?.toLowerCase()
              ?.match(search.toLowerCase());
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
      // @desc total value calculation
      let total = 0;
      salesData?.parts_invoice.forEach((part) => {
        return (total += part.price * part?.quantity);
      });

      // @desc sales invoice csv object
      const csvObj = {
        "Inv No": salesData?.invoice_number || "",
        Client: salesData?.org?.company_name || "",
        "Sales Order": salesData?.sale_order || "",
        "Ref PO No": salesData?.po_no || "",
        "Invoice Date": new Date(salesData?.invoice_date).toLocaleDateString(
          "en-IN"
        ),
        Value: total || "",
        Dept: salesData?.dept?.name || "",
        Status: salesData?.status || "",
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
      <PageTitle title='Invoices' />
      <SectionTitle title='Invoices' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              {loading ? (
                <Loader />
              ) : (
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
                        width: "170px",
                      },
                    },
                  }}
                  noContextMenu
                  fixedHeader
                  fixedHeaderScrollHeight='550px'
                  pagination
                  striped
                  highlightOnHover
                  subHeader
                  actions={
                    <CSVLink
                      enclosingCharacter={` `}
                      data={csv}
                      filename={`Invoices-${new Date(
                        Date.now()
                      ).toLocaleDateString("en-IN")}`}
                      className='bg-primary btn text-white mb-3 border-0 d-flex align-items-center rounded-1'
                      onClick={exportAsCsv}>
                      <FiDownload className='fs-4 me-2' />
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
                  subHeaderAlign='left'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInvoices;
