import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import UpdateOrderDataForm from "../../components/OrderDataForm/UpdateOrderDataForm";
import PageTitle from "../../components/Shared/PageTitle";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../ui/Loader";
import "./AddSalesOrder.css";

export default function UpdateSalesOrder() {
  const axios = useAxiosPrivate();
  const { order_id } = useParams();
  const [loading, setloading] = useState(false);
  const [order, setOrder] = useState({});

  // get && load specific Oreder by id
  useEffect(() => {
    const getOrderData = async () => {
      try {
        setloading(true);
        const {
          data: { results },
        } = await axios.get(`pipo/so/order/?id=${order_id}`);
        setloading(false);
        setOrder(results[0]);
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    getOrderData();
  }, [order_id]);

  return (
    <div>
      <PageTitle title='Update Sales Order' />
      {/* back button */}
      <div className='d-flex justify-content-end me-5 mb-4'>
        <Link
          to='/dashboard/sales-orders'
          className='btn btn-primary rounded-1 border-0 text-white'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
      </div>
      <div className='row'>
        <div className='col-xl-12 col-lg-12'>
          <div className='card'>
            <div className='card-header flex'>
              <h4 className='card-title'>Update Sales Order</h4>
            </div>
            {!loading ? <UpdateOrderDataForm orderData={order} /> : <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
}
