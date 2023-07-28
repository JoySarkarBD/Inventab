import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import "./sales.css";

const SalesOrders = () => {
  const [search, setSearch] = useState("");
  const [salesOrders, setSalesOrders] = useState([]);
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
          "http://inventab.io/api/v1/pipo/so/order/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
        )
      ).data;
      setLoading(false);
      setSalesOrders(response?.results);
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
      name: "Order No",
      selector: (row) => row?.so_id,
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
      name: "Desc",
      selector: (row) => row?.description,
      sortable: true,
    },
    {
      name: "Ref PO No",
      selector: (row) => row?.ref_po,
      sortable: true,
    },
    {
      name: "PO Date",
      selector: (row) => row?.po_date,
      sortable: true,
    },
    {
      name: "Expected Inv Date",
      selector: (row) => row?.expected_inv_date,
      sortable: true,
    },
    {
      name: "Value",
      selector: () => "No data found",
      sortable: true,
    },
    // {
    //   name: "Probabilistic Value",
    //   selector: (row) => row?.probability,
    //   sortable: true,
    // },
    {
      name: "Dept",
      selector: (row) => row?.department?.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row?.so_status,
      sortable: true,
    },
  ];

  // search function
  useEffect(() => {
    let result;
    if (selectedFiled) {
      result = salesOrders.filter((saleData) => {
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
            return salesOrders;
        }
      });
      setSearchData(result);
    } else {
      // if somehow failed the sorting
      setSearchData(salesOrders);
    }
  }, [search, salesOrders, selectedFiled]);

  // export as csv
  const exportAsCsv = () => {
    let data = [];
    searchData.forEach((salesData) => {
      const csvObj = {
        SO: salesData?.so_id || "No data found",
        "Sub Org": salesData?.sub_org || "No data found",
        Client: salesData?.client?.company_name || "No data found",
        Description: salesData?.description || "No data found",
        "Ref PO No": salesData?.ref_po || "No data found",
        "PO Date": salesData?.po_date || "No data found",
        "Expected Inv Date": salesData?.expected_inv_date || "No data found",
        Value: salesData?.value || "No data found",
        Dept: salesData?.department?.name || "no data found",
        // "Probabilities value": salesData?.probability || "No data found",
        Status: salesData?.so_status || "No data found",
      };

      data.push(csvObj);
    });

    setCsv((prev) => [...prev, ...data]);
  };

  return (
    <div>
      <PageTitle title="Sales Orders" />
      <SectionTitle title="Sales Orders" />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title={<h2>Sales Orders</h2>}
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
                    filename={`Sales-Orders-${new Date(
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
                      <option value="so_id">SO</option>
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

export default SalesOrders;
