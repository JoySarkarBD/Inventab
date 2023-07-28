import { useState } from "react";
import Select from "react-select";
import { v4 } from "uuid";
import InputText from "../Form/InputText";
import TextArea from "../Form/TextArea";

export default function SalesDataForm({ salesData }) {
  const [tableLength, setTableLength] = useState([{}]);

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
    <form>
      {JSON.stringify(salesData)}
      <div className='row'>
        {/* add department input */}
        <div className='mb-3 col-md-6'>
          <label className='mb-2 text-dark text-capitalize'>Department</label>
          <Select title='Department' placeholder='Select Department' />
        </div>

        {/* add sub org input */}
        <div className='mb-3 col-md-6'>
          <label className='mb-2 text-dark text-capitalize'>Sub org</label>
          <Select placeholder='Select Sub Org' />
        </div>

        {/* add probability input */}
        <div className='mb-3 col-md-6'>
          <label className='mb-2 text-dark text-capitalize'>Probability</label>
          <Select title='Probability' type='text' />
        </div>

        {/* add status input */}
        <div className='mb-3 col-md-6'>
          <label className='mb-2 text-dark text-capitalize'>Status*</label>
          <Select placeholder='Select Status' />
        </div>

        {/* add client input */}
        <div className='mb-3 col-md-6'>
          <label className='mb-2 text-dark text-capitalize'>Status*</label>
          <Select placeholder='Select Client' />
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
          <label className='mb-2 text-dark text-capitalize'>Contact Name</label>
          <Select placeholder='Select Contact' />
        </div>

        {/* add mobile number input */}
        <div className='mb-3 col-md-6'>
          <InputText title='Mobile Number*' type='Phone' />
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
  );
}
