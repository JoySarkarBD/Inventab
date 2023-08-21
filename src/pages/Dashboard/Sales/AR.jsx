/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DataTable from "react-data-table-component";
import { FiDownload } from "react-icons/fi";
import Select, { components } from "react-select";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Loader from "../../../ui/Loader";

import { useAuth } from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { daysLeft } from "../../../utils/utilityFunc/utilityFunc";
import "./sales.css";

const AR = () => {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const [reports, setReports] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [csv, setCsv] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  /* React Select with checkbox */
  const InputOption = ({
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
  }) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    // styles
    let bg = "transparent";
    // if (isFocused) bg = "#eee";
    if (isActive) bg = "#B2D4FF";

    const style = {
      alignItems: "center",
      backgroundColor: bg,
      color: "black",
      display: "flex ",
    };

    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style,
    };

    return (
      <components.Option
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}>
        <input type='checkbox' checked={isSelected} className='me-2' />
        {children}
      </components.Option>
    );
  };

  const allOptions = [
    { value: "Overdue (>30 days)", label: "Overdue (>30 days)" },
    { value: "Overdue (>15 days)", label: "Overdue (>15 days)" },
    { value: "Overdue (<15days)", label: "Overdue (<15days)" },
    { value: "Due in 15 Days", label: "Due in 15 Days" },
    { value: "Due in 30 Days", label: "Due in 30 Days" },
    { value: "Due in > 30 Days", label: "Due in > 30 Days" },
  ];
  /* React Select with checkbox */

  // fetch table

  // load reports
  useEffect(() => {
    // fetch table
    let isMount = true;
    const controller = new AbortController();
    const getInvoiceList = async () => {
      try {
        setLoading(true);
        const response = (
          await axios.get(`invoices/fetch/all/invoices/?org=${auth?.orgId}`, {
            signal: controller.signal,
          })
        ).data;
        setLoading(false);
        isMount && setReports(response?.results);
        isMount && setSearchData(response?.results);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    getInvoiceList();

    return () => {
      (isMount = false), controller.abort();
    };
  }, [auth?.orgId, axios]);

  // console.log(reports);

  // columns
  const columns = [
    {
      name: "Client",
      cell: (row) => row?.org?.company_name || "",
      sortable: true,
    },

    {
      name: "Invoice No",
      selector: (row) => row?.invoice_number || "",
      sortable: true,
    },

    {
      name: "Invoice Date",
      selector: (row) =>
        new Date(row?.invoice_date).toLocaleDateString("en-IN") || "",
      sortable: true,
    },

    {
      name: "Total Value",
      selector: (row) => row?.total || 0,
      sortable: true,
    },

    {
      name: "Paid",
      selector: (row) => row?.amount_paid || 0,
      sortable: true,
    },

    // Value - which field is this in API?
    {
      name: "Unpaid",
      selector: (row) => parseInt(row?.total - row?.amount_paid),
      sortable: true,
    },

    {
      name: "Due Date",
      selector: (row) => {
        let date = new Date(row?.invoice_date);
        if (row?.payment_term?.id === 1) {
          return date.toLocaleDateString("en-IN");
        }
        if (row?.payment_term?.id === 2) {
          return date.toLocaleDateString("en-IN");
        }
        if (row?.payment_term?.id === 3) {
          return new Date(
            date.getTime() + 15 * (24 * 60 * 60 * 1000)
          ).toLocaleDateString("en-In");
        }
        if (row?.payment_term?.id === 4) {
          return new Date(
            date.getTime() + 30 * (24 * 60 * 60 * 1000)
          ).toLocaleDateString("en-In");
        }
        if (row?.payment_term?.id === 5) {
          return new Date(
            date.getTime() + 45 * (24 * 60 * 60 * 1000)
          ).toLocaleDateString("en-In");
        }
        if (row?.payment_term?.id === 6) {
          return new Date(
            date.getTime() + 60 * (24 * 60 * 60 * 1000)
          ).toLocaleDateString("en-In");
        }
      },
      sortable: true,
    },

    {
      name: "Age",
      selector: (row) => {
        let date = row?.invoice_date;
        if (row?.payment_term?.id === 1) {
          return daysLeft(date) + ` days`;
        }
        if (row?.payment_term?.id === 2) {
          return daysLeft(date) + ` days`;
        }
        if (row?.payment_term?.id === 3) {
          const futureDate =
            new Date(date).getTime() + 15 * (24 * 60 * 60 * 1000);
          return daysLeft(futureDate) + ` days`;
        }
        if (row?.payment_term?.id === 4) {
          const futureDate =
            new Date(date).getTime() + 30 * (24 * 60 * 60 * 1000);
          return daysLeft(futureDate) + ` days`;
        }
        if (row?.payment_term?.id === 5) {
          const futureDate =
            new Date(date).getTime() + 45 * (24 * 60 * 60 * 1000);
          return daysLeft(futureDate) + ` days`;
        }
        if (row?.payment_term?.id === 6) {
          const futureDate =
            new Date(date).getTime() + 60 * (24 * 60 * 60 * 1000);
          return daysLeft(futureDate) + ` days`;
        }
      },
      sortable: true,
    },
  ];

  const options = [
    { value: "Overdue (>30 days)", label: "Overdue (>30 days)" },
    { value: "Overdue (>15 days)", label: "Overdue (>15 days)" },
    { value: "Overdue (<15days)", label: "Overdue (<15days)" },
    { value: "Due in 15 Days", label: "Due in 15 Days" },
    { value: "Due in 30 Days", label: "Due in 30 Days" },
    { value: "Due in > 30 Days", label: "Due in > 30 Days" },
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
      <PageTitle title='AR' />
      <SectionTitle title='AR' />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              {loading ? (
                <Loader />
              ) : (
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
                        width: "170px",
                      },
                    },
                  }}
                  noContextMenu
                  fixedHeader
                  fixedHeaderScrollHeight='550px'
                  pagination
                  subHeaderComponent={
                    <Select
                      className='text-start w-75 select-ar'
                      defaultValue={[]}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      isMulti
                      onChange={(options) => {
                        if (Array.isArray(options)) {
                          setSelectedOptions(options.map((opt) => opt.value));
                        }
                      }}
                      options={allOptions}
                      components={{
                        Option: InputOption,
                      }}
                    />
                  }
                  striped
                  highlightOnHover
                  subHeader
                  actions={
                    <div className='d-flex align-items-center column-gap-4'>
                      <CSVLink
                        enclosingCharacter={` `}
                        data={csv}
                        filename={`Invoices-${new Date(
                          Date.now()
                        ).toLocaleDateString("en-IN")}`}
                        className='bg-primary btn text-white rounded-1  border-0 d-flex align-items-center'
                        onClick={exportAsCsv}>
                        <FiDownload className='fs-4 me-2' />
                        Download
                      </CSVLink>
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

export default AR;
