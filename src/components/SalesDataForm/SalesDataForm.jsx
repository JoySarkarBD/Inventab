/* eslint-disable react/prop-types */
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

export default function SalesDataForm({ salesData }) {
  const [tableLength, setTableLength] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [salesLeads, setSalesLeads] = useState([]);
  const [dept, setDept] = useState([]);
  const [client, setClient] = useState([]);
  const [status, setStatus] = useState([]);
  // fetch table
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
      salesLeads.forEach((sale) => {
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
      console.log(uniqueStatus);
      setStatus(uniqueStatus);
    }
  }, [salesLeads]);
  // ==============================table stuff==============

  const handleTable = () => {
    event.preventDefault();
    const obj = {
      id: v4(),
    };
    setTableLength((prev) => [...prev, obj]);
  };

  const handleRemove = (id) => {
    const modifiedArray = tableLength.filter((table) => table.id !== id);
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

  return (
    <>
      {!loading ? (
        <form>
          {JSON.stringify(salesData)}
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
              />
            </div>

            {/* add sub org input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>Sub org</label>
              <Select placeholder='Select Sub Org' />
            </div>

            {/* add probability input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>
                Probability
              </label>
              <Select title='Probability' type='text' />
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
              />
            </div>

            {/* add po date input */}
            <div className='mb-3 col-md-6'>
              <InputText title='Expected PO Date*' type='date' />
            </div>

            {/* add invoice date input */}
            <div className='mb-3 col-md-6'>
              <InputText title='Expected Invoice Date*' type='date' />
            </div>

            {/* add contact name input */}
            <div className='mb-3 col-md-6'>
              <label className='mb-2 text-dark text-capitalize'>
                Contact Name
              </label>
              <Select placeholder='Select Contact' />
            </div>

            {/* add mobile number input */}
            <div className='mb-3 col-md-6'>
              <InputText title='Mobile Number*' type='Phone' placeholder="Phone"/>
            </div>

            {/* add description input */}
            <div className='mb-3 col-md-6'>
              <TextArea
                title='Description*'
                className='w-100'
                placeholder='Description'
              />
              <br />
            </div>
          </div>
          {/* Table Part */}
          {/* Table Row Add Button */}
          <div className='d-flex justify-content-end my-4'>
            <button className='btn btn-primary rounded' onClick={handleTable}>
              Add Table Row
            </button>
          </div>
          {/* Table */}
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
                {tableLength.map((table) => {
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
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Total Quntity'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Extd Net Cost'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Extd Gross Cost'
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
