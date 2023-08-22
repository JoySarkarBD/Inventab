/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { useAuth } from "../../hooks/useAuth";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../ui/Loader";
import { numDifferentiation } from "../../utils/utilityFunc/utilityFunc";

export default function SalesFunnel() {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId } = auth;
  const [loading, setLoading] = useState(false);
  const [salesFunnel, setSalesFunnel] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // load leads
  useEffect(() => {
    const getSalesFunnelData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`pipo/sales/lead/?org=${orgId}`);

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
          value: statusData[status].value
            ? numDifferentiation(statusData[status].value)
            : `${0} Cr`,
        }));

        setLoading(false);
        setSalesFunnel(finalData);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getSalesFunnelData();
  }, [axios, orgId]);

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
        <>
          <h1 className='text-center'>Sales Funnel Data</h1>
          <DataTable
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
        </>
      )}
    </div>
  );
}
