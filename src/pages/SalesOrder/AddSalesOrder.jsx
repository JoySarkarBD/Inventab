import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import AddOrderDataForm from "../../components/OrderDataForm/AddOrderDataForm";
import PageTitle from "../../components/Shared/PageTitle";
import "./AddSalesOrder.css";

export default function AddSalesOrder() {
  return (
    <div>
      <PageTitle title='Add Sales Order' />
      {/* back button */}
      <div className='d-flex justify-content-end me-5 mb-4'>
        <Link
          to='/dashboard/sales-orders'
          className='btn btn-primary btn-common rounded-1'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
      </div>
      <div className='row'>
        <div className='col-xl-12 col-lg-12'>
          <div className='card'>
            <div className='card-header flex'>
              <h4 className='card-title'>Add Sales Order</h4>
            </div>
            <AddOrderDataForm />
          </div>
        </div>
      </div>
    </div>
  );
}
