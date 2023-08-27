import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import Select from "react-select";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { useAuth } from "../../../hooks/useAuth";

import { Toaster, toast } from "react-hot-toast";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loader from "../../../ui/Loader";
import "./sales.css";

const SalesOrders = () => {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { orgId } = auth;
  const [search, setSearch] = useState("");
  const [salesOrders, setSalesOrders] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  const [selectedEl, setSelectedEL] = useState(null);

  // load leads
  useEffect(() => {
    // fetch table
    const getSalesOrders = async () => {
      try {
        setLoading(true);
        const response = (await axios.get(`pipo/so/order/?org=${orgId}`)).data;
        setLoading(false);
        setSalesOrders(response?.results);
        setSearchData(response?.results);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
        // console.log(error);
      }
    };
    getSalesOrders();
  }, [axios, orgId]);

  // columns
  const columns = [
    {
      name: "Order No",
      cell: (row) => {
        return (
          <Link
            className='text-center text-info dark_theme_text'
            to={`/dashboard/sales-orders/update-sales-order/${row?.id}`}>
            {row?.so_id}
          </Link>
        );
      },
    },

    {
      name: "Client",
      selector: (row) => row?.client?.company_name || "",
      sortable: true,
    },
    {
      name: "Desc",
      selector: (row) => row?.description || "",
      sortable: true,
    },
    {
      name: "Ref PO No",
      selector: (row) => row?.ref_po || "",
      sortable: true,
    },
    {
      name: "PO Date",
      selector: (row) => row?.po_date || "",
      sortable: true,
    },
    {
      name: "Expected Inv Date",
      selector: (row) => row?.expected_inv_date || "",
      sortable: true,
    },
    {
      name: "Value",
      selector: (row) => {
        let total = 0;
        row?.parts?.forEach((part) => {
          total += part?.quantity * part?.price;
        });

        return total;
      },
      sortable: true,
    },

    {
      name: "Dept",
      selector: (row) => row?.department?.name || "",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row?.so_status || "",
      sortable: true,
    },
  ];

  // search function

  // export as csv
  const exportAsCsv = () => {
    let data = [];

    searchData.forEach((salesData) => {
      // @desc total value calculation
      let total = 0;
      salesData?.parts?.forEach((part) => {
        return (total += part?.price * part?.quantity);
      });

      // @desc sales order csv object
      const csvObj = {
        SO: salesData?.so_id || "",
        Client: salesData?.client?.company_name || "",
        Description: `${salesData?.description?.slice(0, 30)}...` || "",
        "Ref PO No": salesData?.ref_po || "",
        "PO Date": salesData?.po_date || "",
        "Expected Inv Date": salesData?.expected_inv_date || "",
        Value: total,
        Dept: salesData?.department?.name || "",
        Status: salesData?.so_status || "",
      };

      data.push(csvObj);
    });

    setCsv((prev) => [...prev, ...data]);
  };

  // search items sorting
  useEffect(() => {
    let result;
    if (selectedEl?.value) {
      result = salesOrders.filter((order) => {
        switch (selectedEl?.value) {
          case "so_id":
            return order?.so_id?.toLowerCase().match(search.toLowerCase());

          case "client":
            return order?.client?.company_name
              ?.toLowerCase()
              ?.match(search.toLowerCase());

          case "description":
            return order?.description
              ?.toLowerCase()
              ?.match(search.toLowerCase());

          case "ref_po":
            return order?.ref_po?.toLowerCase()?.match(search.toLowerCase());

          case "department":
            return order?.department?.name
              ?.toLowerCase()
              ?.match(search.toLowerCase());

          case "so_status":
            return order?.so_status?.toLowerCase()?.match(search.toLowerCase());
          default:
            return salesOrders;
        }
      });
      setSearchData(result);
    } else {
      setSearchData(salesOrders);
    }
  }, [search, selectedEl?.value, salesOrders]);

  // react select options
  const options = [
    { value: "so_id", label: "Order No" },
    { value: "client", label: "Client" },
    { value: "description", label: "Description" },
    { value: "ref_po", label: "Ref PO" },
    { value: "department", label: "Department" },
    { value: "so_status", label: "Status" },
  ];

  return (
    <div className='position-relative'>
      <Toaster />
      <PageTitle title='Sales Orders' />
      <SectionTitle title='Sales Orders' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              {loading ? (
                <Loader />
              ) : (
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
                    <>
                      <CSVLink
                        enclosingCharacter={` `}
                        data={csv}
                        filename={`Sales-Orders-${new Date(
                          Date.now()
                        ).toLocaleDateString("en-IN")}`}
                        className='bg-primary btn text-white mb-3 border-0 d-flex align-items-center rounded-1'
                        onClick={exportAsCsv}>
                        <FiDownload className='fs-4 me-2' />
                        Export as CSV
                      </CSVLink>

                      {/* Add Sale Order */}
                      <Link to='/dashboard/sales-orders/add-sales-order'>
                        <button className='bg-primary btn text-white mb-3 border-0 d-flex align-items-center ms-2 rounded-1'>
                          Add Sales Order
                        </button>
                      </Link>
                    </>
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

export default SalesOrders;
