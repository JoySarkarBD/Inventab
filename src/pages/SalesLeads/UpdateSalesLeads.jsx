import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import SalesDataForm from "../../components/SalesDataForm/SalesDataForm";
import PageTitle from "../../components/Shared/PageTitle";
import axios from "../../utils/axios/axios";
import "./AddSalesLeads.css";

const UpdateSalesLeads = () => {
  const { lead_no } = useParams();

  const [salesLeads, setSalesLeads] = useState([]);
  const [updateData, setUpdateData] = useState({});

  const [loading, setLoading] = useState(false);

  // load leads
  useEffect(() => {
    // fetch table
    const leads = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "pipo/sales/lead/?org=0a055b26-ae15-40a9-8291-25427b94ebb3"
        );
        setLoading(false);
        const res = data?.results.find((sale) => sale?.lead_no === lead_no);
        setUpdateData(res);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    leads();
  }, [lead_no]);
  console.log(updateData);
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
              <button className='btn btn-primary'>See History</button>
            </div>
            <div className='card-body'>
              {!loading ? (
                <SalesDataForm salesData={updateData} />
              ) : (
                <h1>Loading...</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalesLeads;
