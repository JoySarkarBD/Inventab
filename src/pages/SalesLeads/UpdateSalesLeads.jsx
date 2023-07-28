import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import SalesDataForm from "../../components/SalesDataForm/SalesDataForm";
import PageTitle from "../../components/Shared/PageTitle";
import "./AddSalesLeads.css";

const UpdateSalesLeads = () => {

  return (
    <div>
      <PageTitle title='Update Sales Leads' />
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
            <div className='card-header flex'>
              <h4 className='card-title'>Update Sales Lead</h4>
            </div>
            <div className='card-body'>
              <SalesDataForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalesLeads;
