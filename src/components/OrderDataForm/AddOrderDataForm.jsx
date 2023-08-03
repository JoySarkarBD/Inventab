import Select from "react-select";
import InputText from "../Form/InputText";
import TextArea from "../Form/TextArea";

export default function DataForm() {
  return (
    <div className='card-body'>
      <form>
        <div className='row'>
          {/* Sales Lead input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Sales Lead</label>
            <Select
              title='Sales Lead'
              placeholder='Sales Lead'
              name='sales_lead'
            />
          </div>

          {/* add sub org input */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>Sub org</label>
            <Select placeholder='Select Sub Org' name='sub_org' />
          </div>

          {/* Rof PO NO input */}
          <div className='mb-3 col-md-6'>
            <InputText title='Ref PO No' type='text' name='ref_po_no' />
          </div>

          {/* Rof PO Date input */}
          <div className='mb-3 col-md-6'>
            <InputText title='Rof PO Date' type='date' name='ref_po_date' />
          </div>

          {/* add invoice date input */}
          <div className='mb-3 col-md-6'>
            <InputText
              title='Expected Invoice Date*'
              type='date'
              name='expected_invoice_date'
            />
          </div>

          {/* Select Payment Term */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Payment Term
            </label>
            <Select placeholder='Select Payment Term' name='payment_term' />
          </div>

          {/* Select Delivery Term */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Delivery Term
            </label>
            <Select placeholder='Select Delivery Term' name='delivery_term' />
          </div>

          {/* Select Client */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Client
            </label>
            <Select placeholder='Select Client' name='client' />
          </div>

          {/* Select Client Contact */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Client Contact
            </label>
            <Select placeholder='Select Client Contact' name='contact' />
          </div>

          {/* Select Billing Address */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Billing Address
            </label>
            <Select
              placeholder='Select Billing Address'
              name='billing_address'
            />
          </div>

          {/* Select Shipping Address */}
          <div className='mb-3 col-md-6'>
            <label className='mb-2 text-dark text-capitalize'>
              Select Shipping Address
            </label>
            <Select
              placeholder='Select Shipping Address'
              name='shipping_address'
            />
          </div>

          {/* description input */}
          <div className='mb-3 col-md-6'>
            <TextArea
              title='Description*'
              className='w-100'
              placeholder='Description'
              name='description'
            />
            <br />
          </div>

          {/* Comment input */}
          <div className='mb-3 col-12'>
            <TextArea
              title='Comment*'
              className='w-100'
              placeholder='Comment'
              name='comment'
            />
            <br />
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
                      <th scope='col'>Part No</th>
                      <th scope='col'>Short Description</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Unit Cost</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>GST</th>
                      <th scope='col'>Net Price</th>
                      <th scope='col'>Extd Gross Price</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
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
                          type='text'
                          placeholder='Short Description'
                          name='short_description'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Total Quantity'
                          name='quantity'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='number'
                          placeholder='Unit Cost'
                          name='unit_cost'
                        />
                      </td>
                      <td>
                        <input
                          className='new_input_class'
                          type='text'
                          placeholder='Status'
                          name='status'
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
                <th scope='col'>Part No</th>
                <th scope='col'>Short Description</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Unit Cost</th>
                <th scope='col'>Status</th>
                <th scope='col'>GST</th>
                <th scope='col'>Net Price</th>
                <th scope='col'>Extd Gross Price</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className='select-port'>
                    <Select
                      className='select'
                      placeholder='Select Port No'
                      name='part_id'
                      isSearchable
                      isClearable
                    />
                  </div>
                </td>
                <td>
                  <input
                    className='new_input_class'
                    type='text'
                    placeholder='Short Description'
                  />
                </td>

                <td>
                  <input
                    className='new_input_class'
                    type='number'
                    placeholder='Total Quantity'
                  />
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
                    type='text'
                    placeholder='Status'
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
                  <button className='btn btn-danger btn-sm'>Remove</button>
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
}
