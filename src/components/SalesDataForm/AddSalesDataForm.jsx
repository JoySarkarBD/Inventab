import { useState } from "react";
import Select from "react-select";
import { v4 } from "uuid";
import InputText from "../Form/InputText";
import TextArea from "../Form/TextArea";

const AddSalesDataForm = () => {
  const [tableLength, setTableLength] = useState([{}]);

  const handleTable = () => {
    event.preventDefault();
    const obj = {
      id: v4(),
    };
    setTableLength(prev => [...prev, obj]);
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

  return (
    <div className='card-body'>
      <form>
        <div className='row'>
          {/* Sales Lead input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Sales Lead</label>
            <Select title='Sales Lead' placeholder='Sales Lead' />
          </div>

          {/* add sub org input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Sub org</label>
            <Select placeholder='Select Sub Org' />
          </div>

          {/* Rof PO NO input */}
          <div className='mb-3 col-md-6'>
            <InputText title='Rof PO No' type='text' />
          </div>

          {/* Rof PO Date input */}
          <div className='mb-3 col-md-6'>
            <InputText title='Rof PO Date' type='date' />
          </div>

          {/* add invoice date input */}
          <div className='mb-3 col-md-6'>
            <InputText title='Expected Invoice Date*' type='date' />
          </div>

          {/* Select Payment Term */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Payment Term
            </label>
            <Select placeholder='Select Payment Term' />
          </div>

          {/* Select Delivery Term */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Delivery Term
            </label>
            <Select placeholder='Select Delivery Term' />
          </div>

          {/* Select Client */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Client
            </label>
            <Select placeholder='Select Client' />
          </div>

          {/* Select Client Contact */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Client Contact
            </label>
            <Select placeholder='Select Client Contact' />
          </div>

          {/* Select Billing Address */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Billing Address
            </label>
            <Select placeholder='Select Billing Address' />
          </div>

          {/* Select Shipping Address */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Shipping Address
            </label>
            <Select placeholder='Select Shipping Address' />
          </div>

          {/* description input */}
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
          <button className='btn btn-primary btn-common rounded-1' onClick={handleTable}>
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
              {tableLength.map(table => {
                return (
                  <tr key={table.id}>
                    <td>
                      <div className='select-port'>
                        <Select
                          className='select'
                          options={options}
                          placeholder='Select Port No'
                          menuPortalTarget={document.querySelector("body")}
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
                        className='btn btn-danger btn-sm rounded-1'
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
            className='btn btn-primary btn-common rounded-1'
            type='submit'
            value='Add Sales Lead'
          />
        </div>
      </form>
    </div>
  );
};

export default AddSalesDataForm;
