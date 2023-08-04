/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import axios from "../../utils/axios/axios";

export default function SalesFunnel() {
  const [loading, setLoading] = useState(false);
  const [salesFunnel, setSalesFunnel] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Create an object to store the counts for each status
  const statusCounts = {};

  const getSalesFunnelData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "pipo/sales/lead/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
      );
      // console.log(data);

      data?.results.forEach((lead) => {
        const status = lead.status;
        if (statusCounts.hasOwnProperty(status)) {
          statusCounts[status]++;
        } else {
          statusCounts[status] = 1;
        }
      });

      // Create the final data array
      const finalData = [
        { status: "Prospect", count: statusCounts["Prospect"] || 0 },
        { status: "Approach", count: statusCounts["Approach"] || 0 },
        { status: "Qualify", count: statusCounts["Qualify"] || 0 },
        { status: "Pitch", count: statusCounts["Pitch"] || 0 },
        {
          status: "Handle Objections",
          count: statusCounts["Handle Objections"] || 0,
        },
        {
          status: "Close the Deal",
          count: statusCounts["Close the Deal"] || 0,
        },
        { status: "Lost Deal", count: statusCounts["Lost Deal"] || 0 },
      ];
      setLoading(false);
      setSalesFunnel(finalData);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  // load leads
  useEffect(() => {
    getSalesFunnelData();
  }, []);

  // Define the columns for the DataTable
  const columns = [
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Count",
      selector: "count",
      sortable: true,
    },
  ];

  // Options for react-select
  const options = [
    { value: "", label: "Show All" },
    { value: "Prospect", label: "Prospect" },
    { value: "Approach", label: "Approach" },
    { value: "Qualify", label: "Qualify" },
    { value: "Pitch", label: "Pitch" },
    { value: "Handle Objections", label: "Handle Objections" },
    { value: "Close the Deal", label: "Close the Deal" },
    { value: "Lost Deal", label: "Lost Deal" },
  ];

  // Handle selection change in react-select
  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  // Filter the data based on the selected option
  const filteredData =
    selectedOption && selectedOption.value
      ? salesFunnel.filter(
          (item) =>
            item.status === selectedOption.value || selectedOption.value === ""
        )
      : salesFunnel;

  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder='Select a status...'
        isSearchable
      />
      <DataTable
        title={<h2>Sales Funnel Data</h2>}
        columns={columns}
        data={filteredData}
        progressPending={loading}
        pagination
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
        striped
        highlightOnHover
        subHeader
      />
    </div>
  );
}
