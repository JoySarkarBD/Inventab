/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import Loader from "../../ui/Loader";
import axios from "../../utils/axios/axios";
import { numDifferentiation } from "../../utils/utilityFunc/utilityFunc";

export default function SalesFunnel() {
  const [loading, setLoading] = useState(false);
  const [salesFunnel, setSalesFunnel] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const getSalesFunnelData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "pipo/sales/lead/?org=3f31d296-4803-4973-883c-6441af37737a"
      );

      // Create an object to store the counts for each status
      const statusData = {};

      data?.results.forEach((lead) => {
        if (!statusData[lead.status]) {
          statusData[lead.status] = {
            count: 0,
            value: 0,
          };
        }
        statusData[lead.status].count++;
        statusData[lead.status].value += parseFloat(lead.total);
      });

      // Create the data array as per the desired format
      const finalData = Object.keys(statusData).map((status) => ({
        status,
        count: statusData[status].count,
        value: numDifferentiation(statusData[status].value),
      }));

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
    {
      name: "Value",
      selector: "value",
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
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          title={<h2>Sales Funnel Data</h2>}
          columns={columns}
          data={filteredData}
          progressPending={loading}
          pagination
          subHeaderComponent={
            <Select
              options={options}
              value={selectedOption}
              onChange={handleSelectChange}
              placeholder='Select a status...'
              isSearchable
              className='text-start w-25'
            />
          }
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
      )}
    </div>
  );
}
