/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import SalesDataForm from "../../components/SalesDataForm/SalesDataForm";
import PageTitle from "../../components/Shared/PageTitle";
import Loader from "../../ui/Loader";
import axios from "../../utils/axios/axios";
import "./AddSalesLeads.css";

function SalesLeadHistoryModal(props) {
  // console.log(props.salesData?.sales_lead_history);

  const sales_lead_history = [
    {
      id: "3fe9baea-f95a-4560-a736-105b4eab1248",
      created_by: "44dbaf21-9946-46ae-ad07-17fa3c1995e5",
      date: "2023-08-04",
      comment: "Testing",
    },
    {
      id: "3fe9baea-f95a-4560-a736-105b4eab1247",
      created_by: "44dbaf21-9946-46ae-ad07-17fa3c1995e5",
      date: "2023-08-04",
      comment: "Testing",
    },
  ];

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          History for Lead - xxx
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {sales_lead_history.map((s) => (
          <div className='card border' key={s?.id}>
            <div className='card-header text-dark fs-5'>Date: {s?.date}</div>
            <div className='card-body'>
              <blockquote className='blockquote mb-0'>
                <p className='text-dark fs-5 mb-0'>
                  Comment:
                  <span className='fs-6'> {s?.comment}</span>
                </p>
                <p className='text-dark fs-5 mb-0'>
                  Created By:
                  <span className='fs-6'> {s?.created_by}</span>
                </p>
              </blockquote>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          // onClick={props.onHide}
          className='rounded-1 px-5 py-3 outline-none border-0'>
          Cancel
        </Button>
        <Button className='rounded-1 px-5 py-3 outline-none border-0'>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const UpdateSalesLeads = () => {
  const { lead_no } = useParams();

  const [selectedData, setSelectedData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // load leads
  useEffect(() => {
    // fetch table
    const leads = async () => {
      try {
        setLoading(true);
        // const { data } = await axios.get(
        //   `http://inventab.io/api/v1/pipo/sales/lead/?lead_no=${lead_no}`
        // );
        const { data } = await axios.get(
          "http://inventab.io/api/v1/pipo/sales/lead/?lead_no=62176817-cce6-48ae-94a0-ffeb0663305d"
        );
        setLoading(false);

        setSelectedData(data?.results[0]);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    leads();
  }, [lead_no]);

  return (
    <div>
      <PageTitle title='Update Sales Leads' />
      {/* back button */}
      <div className='d-flex justify-content-end me-5 mb-4 '>
        <Link
          to='/dashboard/sales-leads'
          className='btn btn-primary rounded-1 border-0'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
      </div>
      <div className='row'>
        <div className='col-xl-12 col-lg-12'>
          <div className='card'>
            <div className='card-header flex'>
              <h4 className='card-title'>Update Sales Lead</h4>
              <button
                className='btn btn-primary text-white rounded-1 border-0 py-3 px-4'
                onClick={() => setModalShow(true)}>
                See History
              </button>
            </div>

            {/* -------modal hidden ------ */}
            <SalesLeadHistoryModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              salesData={selectedData}
            />
            {/* -------modal hidden------- */}

            <div className='card-body'>
              {!loading ? (
                <SalesDataForm salesData={selectedData} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalesLeads;
