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

const SalesLead = () => {
  const [search, setSearch] = useState("");
  const [salesLeads, setSalesLeads] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  // const [selectedFiled, setSelectedfield] = useState("");
  const [selectedEl, setSelectedEL] = useState(null);

  // fetch table
  const getLeads = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "pipo/sales/lead/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
      );

      setLoading(false);
      setSalesLeads(data);
      setSearchData(data);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  // load leads
  useEffect(() => {
    getLeads();
  }, []);

  // columns for table
  const columns = [
    {
      name: "SL No",
      cell: (row) => {
        return (
          <Link
            className='text-center text-black dark_theme_text'
            to={`/dashboard/sales/update-sales-leads/${row?.lead_no}`}>
            {row?.lead_id}
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
      selector: (row) => row?.client?.company_name,
      sortable: true,
    },
    {
      name: "Expected PO date",
      selector: (row) => row?.expected_date,
      sortable: true,
    },
    {
      name: "Value",
      selector: () => "No data found",
      sortable: true,
    },
    {
      name: "Probabilistic Value",
      selector: (row) => row?.probability,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row?.description,
      sortable: true,
    },
    {
      name: "Dept",
      selector: (row) => row?.department?.name || "No data found",
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
    if (selectedEl?.value) {
      result = salesLeads.filter((saleData) => {
        switch (selectedEl?.value) {
          case "lead_id":
            return saleData?.lead_id
              ?.toLowerCase()
              ?.match(search.toLowerCase());

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
            return salesLeads;
        }
      });
      setSearchData(result);
    } else {
      // if somehow failed the sorting
      setSearchData(salesLeads);
    }
  }, [search, salesLeads, selectedEl?.value]);

  // export as csv
  const exportAsCsv = () => {
    let data = [];
    searchData.forEach((salesData) => {
      const csvObj = {
        Sl: salesData?.lead_id || "No data found",
        "Sub Org": salesData?.sub_org || "No data found",
        Client: salesData?.client?.company_name || "No data found",
        "Expected PO date": salesData?.expected_date || "No data found",
        Value: salesData?.value || "No data found",
        "Probabilities value": salesData?.probability || "No data found",
        Description: salesData?.description || "No data found",
        Dept: salesData?.department?.name || "no data found",
        Status: salesData?.status || "No data found",
      };

      data.push(csvObj);
    });

    setCsv((prev) => [...prev, ...data]);
  };

  // react select options
  const options = [
    { value: "lead_id", label: "SLS No" },
    { value: "client", label: "Client" },
    { value: "description", label: "Description" },
    { value: "department", label: "Department" },
    { value: "status", label: "Status" },
  ];

  //  main func
  return (
    <div>
      {/* react select */}

      <PageTitle title='Sales Leads' />
      <SectionTitle title='Sales Leads' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <DataTable
                title={<h2>Sales Leads</h2>}
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
                progressPending={loading}
                //Search & select area start
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
                // Search & select area start
                actions={
                  <>
                    <CSVLink
                      enclosingCharacter={` `}
                      data={csv}
                      filename={`Sales-Leads -${new Date(
                        Date.now()
                      ).toLocaleDateString("en-IN")}`}
                      className='bg-primary btn text-white mb-3 border-0 d-flex align-items-center'
                      onClick={exportAsCsv}>
                      <FiDownload className='fs-4 me-2' />
                      Export as CSV
                    </CSVLink>
                    {/* Add Sale Order */}
                    <Link to='/dashboard/sales/add-sales-leads'>
                      <button className='bg-primary btn text-white mb-3 border-0 d-flex align-items-center ms-2'>
                        Add Sales Lead
                      </button>
                    </Link>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesLead;
