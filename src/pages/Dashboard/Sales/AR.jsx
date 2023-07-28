import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import axios from "../../../utils/axios/axios";

const AR = () => {
  const [reports, setReports] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);

  // fetch table
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = (
        await axios.get(
          "invoices/fetch/all/invoices/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
        )
      ).data;
      setLoading(false);
      setReports(response?.results);
      setSearchData(response?.results);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };


  // load leads
  useEffect(() => {
    fetchReports();
  }, []);

  // console.log(reports);

  // columns
  const columns = [
    {
      name: "Client",
      cell: () => "No data found",
      sortable: true,
    },

    {
      name: "Invoice No",
      selector: () => "No data found",
      sortable: true,
    },

    {
      name: "Invoice Date",
      selector: () => "No data found",
      sortable: true,
    },

    {
      name: "Total Value",
      selector: () => "No data found",
      sortable: true,
    },


    {
      name: "Paid",
      selector: () => "No data found",
      sortable: true,
    },

    // Value - which field is this in API?
    {
      name: "Unpaid",
      selector: () => "No data found",
      sortable: true,
    },

    {
      name: "Due Date",
      selector: () => "No data found",
      sortable: true,
    },

    {
      name: "Age",
      selector: () => "No data found",
      sortable: true,
    },
  ];


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
      <PageTitle title="AR" />
      <SectionTitle title="AR" />
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
                    filename={`Invoices-${new Date(
                      Date.now()
                    ).toLocaleDateString("en-IN")}`}
                    className="bg-primary btn text-white mb-3 border-0 d-flex align-items-center"
                    onClick={exportAsCsv}
                  >
                    <FiDownload className="fs-4 me-2" />
                    Download
                  </CSVLink>
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
