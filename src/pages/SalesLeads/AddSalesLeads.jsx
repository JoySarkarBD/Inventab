import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import AddSalesDataForm from "../../components/SalesDataForm/AddSalesDataForm";
import PageTitle from "../../components/Shared/PageTitle";
import "./AddSalesLeads.css";

function SalesLeadHistoryModal(props) {
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
        <table className='table  table-striped'>
          <thead className='table-dark '>
            <tr>
              <th scope='col' className='text-light'>
                Date & Time
              </th>
              <th scope='col' className='text-light'>
                Created by
              </th>
              <th scope='col' className='text-light'>
                Discussion
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
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

const AddSalesLeads = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <PageTitle title='Add Sales Leads' />
      {/* back button */}
      <div className='d-flex justify-content-end me-5 mb-4'>
        <Link to='/dashboard/sales-leads' className='btn btn-primary btn-common rounded-1'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
      </div>
      <div className='row'>
        <div className='col-xl-12 col-lg-12'>
          <div className='card'>
            <div className='card-header flex justify-content-between align-items-center'>
              <h4 className='card-title'>Add Sales Lead</h4>

              <button
                className='btn btn-primary btn-common rounded-1'
                onClick={() => setModalShow(true)}>
                See History
              </button>
            </div>

            {/* -------modal hidden ------ */}
            <SalesLeadHistoryModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            {/* -------modal hidden------- */}

            <div className='card-body'>
              <AddSalesDataForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalesLeads;
