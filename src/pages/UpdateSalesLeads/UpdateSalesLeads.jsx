import { BsArrowLeft, BsSend } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputText from "../../components/Form/InputText";
import SelectInput from "../../components/Form/SelectInput";
import PageTitle from "../../components/Shared/PageTitle";

const UpdateSalesLeads = () => {
  const optionsA = [{ value: "lead_id", label: "Greaves Cotton Limited" }];
  const optionsB = [{ value: "lead_id", label: "Greaves Cotton Limited" }];
  const optionsC = [{ value: "lead_id", label: "Handle Objections" }];
  const optionsD = [{ value: "lead_id", label: "SLS-KAM-WEST" }];

  return (
    <>
      <PageTitle title='Update Sales Leads' />

      <div className='container-fluid'>
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
                <h4 className='card-title'>Update Sales Lead</h4>
              </div>
              <div className='card-body'>
                <form>
                  <div className='row'>
                    {/* update client input */}
                    <div className='mb-3 col-md-6'>
                      <SelectInput title='Client*' options={optionsA} />
                    </div>
                    {/* update sub org input */}
                    <div className='mb-3 col-md-6'>
                      <SelectInput
                        title='Sub org'
                        options={optionsB}
                        placeholder='Select Sub Org...'
                      />
                    </div>
                    {/* update po date input */}
                    <div className='mb-3 col-md-6'>
                      <InputText title='Expected PO Date*' type='date' />
                    </div>
                    {/* update invoice date input */}
                    <div className='mb-3 col-md-6'>
                      <InputText title='Expected Invoice Date*' type='date' />
                    </div>
                    {/* update status input */}
                    <div className='mb-3 col-md-6'>
                      <SelectInput title='Status*' options={optionsC} />
                    </div>
                    {/* update description input */}
                    <div className='mb-3 col-md-6'>
                      <InputText title='Description*' type='text' />
                    </div>
                    {/* update mobile number input */}
                    <div className='mb-3 col-md-6'>
                      <InputText title='Mobile Number*' type='phone' />
                    </div>
                    {/* update contact name input */}
                    <div className='mb-3 col-md-6'>
                      <InputText title='Contact Name' type='text' />
                    </div>
                    {/* update probability input */}
                    <div className='mb-3 col-md-6'>
                      <InputText title='Probability' type='text' />
                    </div>
                    {/* update department input */}
                    <div className='mb-3 col-md-6'>
                      <SelectInput title='Department' options={optionsD} />
                    </div>
                  </div>
                  <div className='d-flex justify-content-end my-4'>
                    <button type='submit' className='btn btn-primary rounded'>
                      <BsSend className='me-2' /> Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSalesLeads;
