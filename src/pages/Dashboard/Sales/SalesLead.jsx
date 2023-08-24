import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import Select from "react-select";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";

import { Toaster } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../ui/Loader";
import "./sales.css";

const SalesLead = () => {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId } = auth;
  const [search, setSearch] = useState("");
  const [salesLeads, setSalesLeads] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  // const [selectedFiled, setSelectedfield] = useState("");
  const [selectedEl, setSelectedEL] = useState(null);

  // load leads
  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();
    // fetch table
    const getLeads = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`pipo/sales/lead/?org=${orgId}`, {
          signal: controller.signal,
        });
        setLoading(false);
        isMount && setSalesLeads(data?.results);
        isMount && setSearchData(data?.results);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };
    getLeads();

    return () => {
      (isMount = false), controller.abort();
    };
  }, [axios, orgId]);

  // columns for table
  const columns = [
    {
      name: "SL No",
      cell: (row) => {
        return (
          <Link
            className='text-center text-info dark_theme_text'
            to={`/dashboard/sales/update-sales-leads/${row?.lead_no}`}>
            {row?.lead_id}
          </Link>
        );
      },
    },

    {
      name: "Sub Org",
      selector: (row) => row?.sub_org?.sub_company_name || "",
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
      selector: (row) => {
        let total = 0;
        row?.parts?.forEach((part) => {
          total += part?.quantity * part?.unit_cost;
        });

        return total;
      },
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
      selector: (row) => row?.department?.name || "",
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
      // @desc total value calculation
      let total = 0;
      salesData?.parts?.forEach((part) => {
        return (total += part?.quantity * part?.unit_cost);
      });

      // @desc sales leads csv object
      const csvObj = {
        Sl: salesData?.lead_id || "",
        "Sub Org": salesData?.sub_org?.sub_company_name || "",
        Client: salesData?.client?.company_name || "",
        "Expected PO date": salesData?.expected_date || "",
        Value: total || 0,
        "Probabilities value": salesData?.probability || 0,
        Description: salesData?.description || "",
        Dept: salesData?.department?.name || "",
        Status: salesData?.status || "",
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
        <Toaster />
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              {loading ? (
                <Loader />
              ) : (
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
                  // progressPending={loading}
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
                        className='bg-primary btn text-white mb-3 border-0 d-flex align-items-center rounded-1'
                        onClick={exportAsCsv}>
                        <FiDownload className='fs-4 me-2' />
                        Export as CSV
                      </CSVLink>
                      {/* Add Sale Order */}
                      <Link to='/dashboard/sales/add-sales-leads'>
                        <button className='bg-primary btn text-white mb-3 border-0 d-flex align-items-center ms-2 rounded-1'>
                          Add Sales Lead
                        </button>
                      </Link>
                    </>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesLead;
