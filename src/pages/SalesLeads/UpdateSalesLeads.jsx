import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import SalesDataForm from "../../components/SalesDataForm/SalesDataForm";
import PageTitle from "../../components/Shared/PageTitle";
import axios from "../../utils/axios/axios";
import "./AddSalesLeads.css";

function SalesLeadHistoryModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          History for Lead - xxx
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table  table-striped">
          <thead className="table-dark ">
            <tr>
              <th scope="col" className="text-light">
                Date & Time
              </th>
              <th scope="col" className="text-light">
                Created by
              </th>
              <th scope="col" className="text-light">
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
          className="rounded-1 px-5 py-3 outline-none border-0"
        >
          Cancel
        </Button>
        <Button className="rounded-1 px-5 py-3 outline-none border-0">
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
        const { data } = await axios.get(
          `http://inventab.io/api/v1/pipo/sales/lead/?lead_no=${lead_no}`
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
      <PageTitle title="Update Sales Leads" />
      {/* back button */}
      <div className="d-flex justify-content-end me-5 mb-4">
        <Link to="/dashboard/sales-leads" className="btn btn-primary">
          <BsArrowLeft className="me-2" />
          Back
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header flex">
              <h4 className="card-title">Update Sales Lead</h4>
              <button
                className="btn btn-primary"
                onClick={() => setModalShow(true)}
              >
                See History
              </button>
            </div>

            {/* -------modal hidden ------ */}
            <SalesLeadHistoryModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            {/* -------modal hidden------- */}

            <div className="card-body ">
              {!loading ? (
                <SalesDataForm salesData={selectedData} />
              ) : (
                <h1 className='custom-loading'>Loading...</h1>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalesLeads;
