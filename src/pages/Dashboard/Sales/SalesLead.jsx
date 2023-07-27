import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";

const SalesLead = () => {
  const [search, setSearch] = useState("");
  const [salesLeads, setSalesLeads] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  const [selectedFiled, setSelectedfield] = useState("");

  // fetch table
  const leads = async () => {
    try {
      setLoading(true);
      const response = (
        await axios.get(
          "http://inventab.io/api/v1/pipo/sales/lead/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
        )
      ).data;
      setLoading(false);
      setSalesLeads(response?.results);
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
      name: "SL",
      selector: (row) => row?.lead_id,
      sortable: true,
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
      selector: (row) => row?.department?.name,
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
      result = salesLeads.filter((saleData) => {
        switch (selectedFiled) {
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
  }, [search, salesLeads, selectedFiled]);

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

  //  main func
  return (
    <div>
      <select
        className='form-select form-select-lg mb-3'
        aria-label='.form-select-lg example'
        onChange={(e) => setSelectedfield(e.target.value)}>
        <option selected disabled>
          Open this select menu
        </option>
        <option value='lead_id'>SLS</option>
        <option value='client'>client</option>
        <option value='description'>description</option>
        <option value='department'>department</option>
        <option value='status'>status</option>
      </select>

      <PageTitle title='Sales Leads' />
      <SectionTitle title='Sales Leads' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <DataTable
                title='Sales Leads'
                columns={columns}
                data={searchData}
                fixedHeader
                fixedHeaderScrollHeight='550px'
                pagination
                striped
                highlightOnHover
                subHeader
                progressPending={loading}
                actions={
                  <CSVLink
                    enclosingCharacter={` `}
                    data={csv}
                    filename={`Sales-Leads -${new Date(
                      Date.now()
                    ).toLocaleDateString("en-IN")}`}
                    className='btn btn-success'
                    onClick={exportAsCsv}>
                    Export as CSV
                  </CSVLink>
                }
                subHeaderComponent={
                  <input
                    type='text'
                    placeholder='Search here'
                    className='form-control w-25'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
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

/* 
<CSVLink
                    data={csv}
                    enclosingCharacter={`'`}
                    className='btn btn-primary'
                    onClick={() => {
                      let data = [];
                      searchData.forEach((salesData) => {
                        const csvObj = {
                          Sl: salesData?.lead_id || "No data found",
                          "Sub Org": salesData?.sub_org || "No data found",
                          Client:
                            salesData?.client?.company_name || "No data found",
                          "Expected PO date":
                            salesData?.expected_date || "No data found",
                          Value: salesData?.value || "No data found",
                          "Probabilities value":
                            salesData?.probability || "No data found",
                          Description:
                            salesData?.description || "No data found",
                          Dept: salesData?.department?.name || "no data found",
                          Status: salesData?.status || "No data found",
                        };

                        data.push(csvObj);
                      });

                      setCsv((prev) => [...prev, ...data]);
                    }}>
                    Export as CSV
                  </CSVLink> */
