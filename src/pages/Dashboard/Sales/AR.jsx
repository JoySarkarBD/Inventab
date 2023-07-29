import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import "./sales.css";

const AR = () => {
  const [search, setSearch] = useState("");
  const [ar, setAr] = useState([]);
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
          "http://inventab.io/api/v1/invoices/fetch/all/invoices/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
        )
      ).data;
      setLoading(false);
      setAr(response?.results);
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
      name: "Client",
      // selector: (row) => row?.client?.company_name,

      sortable: true,
    },
    {
      name: "Inv No",
      // selector: (row) => row?.invoice_number,

      sortable: true,
    },
    {
      name: "Inv Date",
      // selector: (row) => row?.invoice_date,
      sortable: true,
    },
    {
      name: "Total Value",
      // selector: (row) => row?.total_value,
      sortable: true,
    },
    {
      name: "Paid",
      // selector: (row) => row?.paid,
      sortable: true,
    },
    {
      name: "Unpaid",
      // selector: (row) => row?.unpaid,
      sortable: true,
    },
    {
      name: "Due Date",
      // selector: (row) => row?.due_date,
      sortable: true,
    },
    {
      name: "Age",
      // selector: (row) => row?.age,
      sortable: true,
    },
  ];

  // export as csv
  const exportAsCsv = () => {
    let data = [];
    searchData.forEach((salesData) => {
      const csvObj = {
        "Inv No": salesData?.invoice_number || "No data found",
        "Inv Date": salesData?.sub_org || "No data found",
        Client: salesData?.org?.company_name || "No data found",
        "Total Value": salesData?.sale_order || "No data found",
        "Ref PO No": salesData?.ref_po || "No data found",
        Value: salesData?.value || "No data found",
        Dept: salesData?.dept || "no data found",
        Status: salesData?.status || "No data found",
      };

      data.push(csvObj);
    });

    setCsv((prev) => [...prev, ...data]);
  };

  return (
    <div>
      <PageTitle title="Account Receivables Report" />
      <SectionTitle title="Account Receivables Report" />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title={<h2>Account Receivables Report</h2>}
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
                    filename={`Account-receivables-report-${new Date(
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

export default AR;
