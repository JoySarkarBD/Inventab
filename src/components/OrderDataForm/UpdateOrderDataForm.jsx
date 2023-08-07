/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import Select from "react-select";
import InputText from "../Form/InputText";
import TextArea from "../Form/TextArea";

const UpdateOrderDataForm = ({ orderData }) => {
  // extract data from order data
  const {
    total,
    sub_org,
    so_status,
    so_id,
    ref_po,
    po_date,
    is_active,
    is_approved,
    id,
    expected_inv_date,
    description,
    department,
  } = orderData;

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      total,
      sub_org,
      ref_po,
      po_date,
      is_active,
      is_approved,
      expected_inv_date,
      description,
      department,
    },

    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className='card-body'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          {/* Po date input */}
          <div className='mb-3 col-md-6'>
            <InputText title='PO Date' type='date' name='po_date' />
          </div>

          {/* ex inv date input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Expected Invoice Date'
              type='date'
              name='expected_inv_date'
            />
          </div>

          {/* Rof PO NO input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Ref PO'
              type='number'
              name='ref_po'
              placeholder='Type Ref Po Number'
            />
          </div>

          {/* So Id input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>So Id</label>
            <Select
              placeholder='Select So Id'
              isSearchable
              isClearable
              name='so_id'
            />
          </div>

          {/* comments input */}
          <div className='mb-3 col-md-6'>
            <TextArea
              title='Comments'
              type='text'
              name='comments'
              placeholder='Type Your Comments'
            />
          </div>

          {/* total input*/}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Total'
              type='number'
              name='total'
              placeholder='Type Total'
            />
          </div>

          {/* so status select*/}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>So Status</label>
            <Select
              placeholder='Select So Status'
              isSearchable
              isClearable
              name='so_status'
            />
          </div>

          {/* created by input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Created By</label>
            <Select
              placeholder='Select Created By'
              isSearchable
              isClearable
              name='created_by'
            />
          </div>

          {/* Select org */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Org</label>
            <Select
              placeholder='Select Org'
              isSearchable
              isClearable
              name='org'
            />
          </div>

          {/* Select client */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Client</label>
            <Select
              placeholder='Select Client'
              isSearchable
              isClearable
              name='client'
            />
          </div>

          {/* Select sub org */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Sub Org</label>
            <Select
              placeholder='Select Sub Org'
              isSearchable
              isClearable
              name='sub_org'
            />
          </div>

          {/* select billing address */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Billing Address
            </label>
            <Select
              placeholder='Select Billing Address'
              isSearchable
              isClearable
              name='billing_address'
            />
          </div>

          {/* select shipping address */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Shipping Address
            </label>
            <Select
              placeholder='Select Shipping Address'
              isSearchable
              isClearable
              name='shipping_address'
            />
          </div>

          {/* payment term select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Payment Term
            </label>
            <Select
              placeholder='Select Payment Term'
              isSearchable
              isClearable
              name='payment_term'
            />
          </div>

          {/* delivery term select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Delivery Term
            </label>
            <Select
              placeholder='Select Delivery Term'
              isSearchable
              isClearable
              name='delivery_term'
            />
          </div>

          {/* contact to select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Contact To</label>
            <Select
              placeholder='Select Contact To'
              isSearchable
              isClearable
              name='contact_to'
            />
          </div>

          {/* department select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Department</label>
            <Select
              placeholder='Select Department'
              isSearchable
              isClearable
              name='department'
            />
          </div>

          {/* transportation term select */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Transportation Term
            </label>
            <Select
              placeholder='Select Transportation Term'
              isSearchable
              isClearable
              name='transportation_term'
            />
          </div>

          {/* description input */}
          <div className='mb-3 col-md-12'>
            <TextArea
              title='Description'
              type='text'
              name='description'
              placeholder='Type Description'
            />
          </div>

          {/* is_active checkbox */}
          <div className='mb-3 col-md-12'>
            <label>
              <input
                type='checkbox'
                name='is_active'
                checked={values.is_active}
                onChange={handleChange}
              />
              Active
            </label>
          </div>

          {/* is_approved checkbox */}
          <div className='mb-3 col-md-12'>
            <label>
              <input
                type='checkbox'
                name='is_approved'
                checked={values.is_approved}
                onChange={handleChange}
              />
              Approved
            </label>
          </div>
        </div>
        {/* Table Part */}
        {/* Table */}
        <div className='row'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='table-responsive111'>
                <table className='table header-border table-responsive-sm111'>
                  <thead>
                    <tr>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Parts No</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>GST</th>
                      <th scope='col'>Net Price</th>
                      <th scope='col'>Extd Gross Price</th>
                      <th scope='col'>Short Description</th>
                      <th scope='col'>Parts Id</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Total Quantity'
                          name='quantity'
                        />
                      </td>
                      <td>
                        <div className='select-port'>
                          <Select
                            className='select'
                            placeholder='Select Part No'
                            isSearchable
                            isClearable
                          />
                        </div>
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Price'
                          name='price'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='GST'
                          name='gst'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Net Price'
                          name='net_price'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Extd Gross Price'
                          name='extd_gross_price'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='text'
                          placeholder='Short Description'
                          name='short_description'
                        />
                      </td>
                      <td>
                        <div className='select-port'>
                          <Select
                            className='select'
                            placeholder='Select Parts Id'
                            isSearchable
                            isClearable
                          />
                        </div>
                      </td>
                      <td>
                        <button className='btn btn-primary rounded-1 py-2 px-4 d-flex justify-content-center align-items-center'>
                          Add
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* dynamic table */}
        <div className='table-responsive111'>
          <table className='table table-bordered table-responsive-sm111'>
            <thead>
              <tr>
                <th scope='col'>Quantity</th>
                <th scope='col'>Parts No</th>
                <th scope='col'>Price</th>
                <th scope='col'>GST</th>
                <th scope='col'>Net Price</th>
                <th scope='col'>Extd Gross Price</th>
                <th scope='col'>Short Description</th>
                <th scope='col'>Parts Id</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    className='new_input_class'
                    type='number'
                    placeholder='Total Quantity'
                    name='quantity'
                  />
                </td>
                <td>
                  <div className='select-port'>
                    <Select
                      className='select'
                      placeholder='Select Part No'
                      isSearchable
                      isClearable
                    />
                  </div>
                </td>
                <td>
                  <input
                    className='new_input_class'
                    type='number'
                    placeholder='Price'
                    name='price'
                  />
                </td>
                <td>
                  <input
                    className='new_input_class'
                    type='number'
                    placeholder='GST'
                    name='gst'
                  />
                </td>
                <td>
                  <input
                    className='new_input_class'
                    type='number'
                    placeholder='Net Price'
                    name='net_price'
                  />
                </td>
                <td>
                  <input
                    className='new_input_class'
                    type='number'
                    placeholder='Extd Gross Price'
                    name='extd_gross_price'
                  />
                </td>
                <td>
                  <input
                    className='new_input_class'
                    type='text'
                    placeholder='Short Description'
                    name='short_description'
                  />
                </td>
                <td>
                  <div className='select-port'>
                    <Select
                      className='select'
                      placeholder='Select Parts Id'
                      isSearchable
                      isClearable
                    />
                  </div>
                </td>
                <td>
                  <button type='button' className='btn btn-danger btn-sm'>
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Submit Button */}
        <div className='d-flex justify-content-end my-4'>
          <input
            className='btn btn-primary btn-common rounded-1'
            type='submit'
            value='Add Sales Order'
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateOrderDataForm;
