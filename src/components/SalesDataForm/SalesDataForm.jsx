/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 } from "uuid";
import axios from "../../utils/axios/axios";
import {
  removeDuplicateObjects,
  removeUndefinedObj,
} from "../../utils/utilityFunc/utilityFunc";
import InputText from "../Form/InputText";
import TextArea from "../Form/TextArea";
import "./SalesDataForm.css";

export default function SalesDataForm({ salesData }) {
  const [tableLength, setTableLength] = useState([]);
  const [loading, setLoading] = useState(false);
  const [salesLeads, setSalesLeads] = useState([]);
  const [dept, setDept] = useState([]);
  const [client, setClient] = useState([]);
  const [status, setStatus] = useState([]);

  // table lowerpart data
  const [unitCost, setUnitCost] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [net_price, setNet_price] = useState(0);
  const [extd_gross_price, setExtd_gross_price] = useState(0);

  // extract data from props
  const {
    department,
    sub_org,
    probability,
    status: st,
    client: cl,
    expected_date,
    expected_invoice_date,
    company_name,
    mobile,
    description,
    lead_id,
    contact_name,
  } = salesData;

  // fetch all leads
  const getLeads = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "pipo/sales/lead/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
      );
      setLoading(false);
      setSalesLeads(data);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  // load leads
  useEffect(() => {
    getLeads();
  }, []);

  // sort all select type el
  useEffect(() => {
    let deptArr = [];
    let clientArr = [];
    let statusArr = [];

    if (salesLeads.length > 0) {
      salesLeads.forEach(sale => {
        // dept obj
        let deptObj = {
          label: sale?.department?.name,
          value: sale?.department?.id,
        };

        // client obj
        let clientObj = {
          label: sale?.client?.company_name,
          value: sale?.client?.id,
        };

        // status obj
        let statusObj = {
          label: sale?.status,
          value: sale?.status,
        };

        // push them array
        deptArr.push(deptObj);
        clientArr.push(clientObj);
        statusArr.push(statusObj);
      });

      // remove undefined data from arr
      let newDept = removeUndefinedObj(deptArr);
      let newClient = removeUndefinedObj(clientArr);
      let newStatus = removeUndefinedObj(statusArr);

      // remove duplicates data from arr of obj
      // dept
      const uniqueDept = removeDuplicateObjects(newDept);
      setDept(uniqueDept);

      // client
      const uniqueClient = removeDuplicateObjects(newClient);
      setClient(uniqueClient);

      // status
      const uniqueStatus = removeDuplicateObjects(newStatus);
      setStatus(uniqueStatus);
    }
  }, [salesLeads]);
  // ==============================table stuff==============

  const handleTable = () => {
    event.preventDefault();
    const obj = {
      id: v4(),
      unit_cost: unitCost,
      quantity: totalQuantity,
      net_price,
      extd_gross_price,
    };
    setTableLength(prev => [...prev, obj]);

    // clear input field
    setUnitCost(0);
    setTotalQuantity(0);
    setNet_price(0);
    setExtd_gross_price(0);
  };

  const handleRemove = id => {
    const modifiedArray = tableLength.filter(table => table.id !== id);
    setTableLength(modifiedArray);
  };

  // react select options
  const options = [
    { value: "lead_id", label: "SLS No" },
    { value: "client", label: "Client" },
    { value: "description", label: "Description" },
    { value: "department", label: "Department" },
    { value: "status", label: "Status" },
  ];

  // dept
  const deptDefaultSelect = {
    label: department?.name,
    value: department?.id,
  };

  // status
  const statusDefaultSelect = {
    label: st,
    value: st,
  };

  // client
  const clientDefaultSelect = {
    label: cl?.company_name,
    value: cl?.id,
  };

  // handle update form
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      department: "" || deptDefaultSelect.value,
      sub_org: "" || null,
      probability,
      status: "" || statusDefaultSelect.value,
      client: "" || clientDefaultSelect.value,
      expected_date: expected_date,
      expected_invoice_date,
      contact_name,
      mobile,
      description,
    },
    onSubmit: async values => {
      console.log({ ...values, parts: tableLength });
    },
  });

  return (
    <>
      {!loading ? (
        <form onSubmit={handleSubmit}>
          <div className='row'>
            {/* add department input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>
                Department
              </label>
              <Select
                title='Department'
                placeholder='Select Department'
                options={dept}
                isClearable
                isSearchable
                name='department'
                defaultValue={deptDefaultSelect}
                onChange={option => setFieldValue("department", option.value)}
              />
            </div>

            {/* add sub org input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>Sub org</label>
              <Select placeholder='Select Sub Org' name='sub-org' />
            </div>

            {/* add probability input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>
                Probability
              </label>
              <InputText
                type='number'
                name='probability'
                value={values.probability}
                onChange={handleChange}
              />
            </div>

            {/* add status input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>Status*</label>
              <Select
                placeholder='Select Status'
                options={status}
                isClearable
                isSearchable
                isLoading
                name='status'
                defaultValue={statusDefaultSelect}
                onChange={option => setFieldValue("status", option.value)}
              />
            </div>

            {/* add client input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>Client*</label>
              <Select
                placeholder='Select Client'
                options={client}
                isSearchable
                isClearable
                name='client'
                defaultValue={clientDefaultSelect}
                value={clientDefaultSelect}
                onChange={option => setFieldValue("client", option.value)}
              />
            </div>

            {/* add po date input */}
            <div className='mb-3 col-md-6'>
              <InputText
                title='Expected PO Date*'
                type='date'
                name='expected_date'
                value={values.expected_date}
                onChange={handleChange}
              />
            </div>

            {/* add invoice date input */}
            <div className='mb-3 col-md-6'>
              <InputText
                title='Expected Invoice Date*'
                type='date'
                name='expected_invoice_date'
                value={values.expected_invoice_date}
                onChange={handleChange}
              />
            </div>

            {/* add contact name input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>
                Contact Name
              </label>
              <InputText
                name='contact_name'
                type='text'
                value={values.contact_name}
                onChange={handleChange}
              />
            </div>

            {/* add mobile number input */}
            <div className='mb-3 col-md-6'>
              <InputText
                title='Mobile Number*'
                type='Phone'
                name='mobile'
                value={values.mobile}
                onChange={handleChange}
              />
            </div>

            {/* add description input */}
            <div className='mb-3 col-md-6'>
              <TextArea
                title='Description*'
                className='w-100'
                placeholder='Description'
                name='description'
                value={values.description}
                onChange={handleChange}
              />
              <br />
            </div>
          </div>
          {/* Table Part */}

          {/* Table */}
          <div className='row'>
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-body'>
                  <div className='table-responsive111'>
                    <table className='table header-border table-responsive-sm111'>
                      <thead>
                        <tr>
                          <th scope='col'>Port No</th>
                          <th scope='col'>Unit Cost</th>
                          <th scope='col'>Total Quantity</th>
                          <th scope='col'>Extd Net Cost</th>
                          <th scope='col'>Extd Gross Cost</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className='select-port'>
                              <Select
                                className='select'
                                options={options}
                                placeholder='Select Port No'
                                menuPortalTarget={document.querySelector(
                                  "body"
                                )}
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              placeholder='Unit Cost'
                              name='unit_cost'
                              value={unitCost || ""}
                              onChange={e => setUnitCost(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              placeholder='Total Quntity'
                              name='quantity'
                              value={totalQuantity || ""}
                              onChange={e => setTotalQuantity(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              placeholder='Extd Net Cost'
                              name='net_price'
                              value={net_price || ""}
                              onChange={e => setNet_price(e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              className='new_input_class'
                              type='number'
                              placeholder='Extd Gross Cost'
                              name='extd_gross_price'
                              value={extd_gross_price || ""}
                              onChange={e =>
                                setExtd_gross_price(e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <button
                              className='btn btn-primary rounded'
                              disabled={
                                !(
                                  net_price ||
                                  unitCost ||
                                  extd_gross_price ||
                                  net_price
                                )
                              }
                              onClick={handleTable}>
                              Add Table Row
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          {/*========================= dynamic table=============== */}

          {tableLength?.length > 0 && (
            <div className='table-responsive'>
              <table className='table table-bordered table-responsive'>
                <thead>
                  <tr>
                    <th scope='col'>Port No</th>
                    <th scope='col'>Unit Cost</th>
                    <th scope='col'>Total Quantity</th>
                    <th scope='col'>Extd Net Cost</th>
                    <th scope='col'>Extd Gross Cost</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableLength.map(table => {
                    return (
                      <tr key={table.id}>
                        <td>
                          <div className='select-port'>
                            <Select
                              className='select'
                              options={options}
                              placeholder='Select Port No'
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            className='new_input_class'
                            type='number'
                            placeholder='Unit Cost'
                            name='unit_cost'
                            defaultValue={table?.unit_cost}
                          />
                        </td>
                        <td>
                          <input
                            className='new_input_class'
                            type='number'
                            placeholder='Total Quntity'
                            name='quantity'
                            defaultValue={table?.quantity}
                          />
                        </td>
                        <td>
                          <input
                            className='new_input_class'
                            type='number'
                            placeholder='Extd Net Cost'
                            name='net_price'
                            defaultValue={table?.net_price}
                          />
                        </td>
                        <td>
                          <input
                            className='new_input_class'
                            type='number'
                            placeholder='Extd Gross Cost'
                            name='extd_gross_price'
                            defaultValue={table?.extd_gross_price}
                          />
                        </td>
                        <td>
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => handleRemove(table.id)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Submit Button */}
          <div className='d-flex justify-content-end my-4'>
            <input
              className='btn btn-primary'
              type='submit'
              value='Add Sales Lead'
            />
          </div>
        </form>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
