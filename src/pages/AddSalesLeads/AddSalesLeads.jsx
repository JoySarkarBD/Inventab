import { BsArrowLeft } from "react-icons/bs";
import { MdAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import InputText from "../../components/Form/InputText";
import SelectInput from "../../components/Form/SelectInput";
import PageTitle from "../../components/Shared/PageTitle";

const AddSalesLeads = () => {
  return (
    <div>
      <PageTitle title='Add Sales Leads' />
      {/* back button */}
      <div className='d-flex justify-content-end me-5 mb-4'>
        <Link to='/dashboard/sales-leads' className='btn btn-primary'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
      </div>
      <div className='row'>
        <div className='col-xl-12 col-lg-12'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Add Sales Lead</h4>
            </div>
            <div className='card-body'>
              <form>
                <div className='row'>
                  {/* add client input */}
                  <div className='mb-3 col-md-6'>
                    <SelectInput title='Client*' placeholder='Select Client' />
                  </div>
                  {/* add sub org input */}
                  <div className='mb-3 col-md-6'>
                    <SelectInput title='Sub org' placeholder='Select Sub Org' />
                  </div>
                  {/* add po date input */}
                  <div className='mb-3 col-md-6'>
                    <InputText title='Expected PO Date*' type='date' />
                  </div>
                  {/* add invoice date input */}
                  <div className='mb-3 col-md-6'>
                    <InputText title='Expected Invoice Date*' type='date' />
                  </div>
                  {/* add status input */}
                  <div className='mb-3 col-md-6'>
                    <SelectInput title='Status*' placeholder='Select Status' />
                  </div>
                  {/* add description input */}
                  <div className='mb-3 col-md-6'>
                    <InputText title='Description*' type='text' />
                  </div>
                  {/* add mobile number input */}
                  <div className='mb-3 col-md-6'>
                    <InputText title='Mobile Number*' type='phone' />
                  </div>
                  {/* add contact name input */}
                  <div className='mb-3 col-md-6'>
                    <InputText title='Contact Name' type='text' />
                  </div>
                  {/* add probability input */}
                  <div className='mb-3 col-md-6'>
                    <InputText title='Probability' type='text' />
                  </div>
                  {/* add department input */}
                  <div className='mb-3 col-md-6'>
                    <SelectInput title='Department' placeholder='-------' />
                  </div>
                </div>
                <div className='d-flex justify-content-end my-4'>
                  <button type='submit' className='btn btn-primary rounded'>
                    <MdAddCircleOutline className='me-2 fs-4' /> Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalesLeads;
