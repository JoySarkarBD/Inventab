/* eslint-disable no-undef */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import TextArea from "../../components/Form/TextArea";
import SalesDataForm from "../../components/SalesDataForm/SalesDataForm";
import PageTitle from "../../components/Shared/PageTitle";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../ui/Loader";
import { formatDateToIndianVersion } from "../../utils/utilityFunc/utilityFunc";
import "./AddSalesLeads.css";

// sales lead history  modal
function SalesLeadHistoryModal(props) {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const { firstname, lastname, userId } = auth;

  const [histories, setHistories] = useState([]);
  const {
    salesData,
    show: { modalShow, setModalShow },
  } = props;

  const { toggleForm, setToggleForm } = props?.modalState;

  const [commentValue, setCommentValue] = useState("");

  // submit modal
  const submitData = async (e) => {
    try {
      const { lead_no } = salesData;
      e.preventDefault();

      // date [indian format]
      const date = formatDateToIndianVersion(new Date());

      // history data
      const newHistoryData = {
        saleslead: lead_no,
        date,
        created_by: userId,
        comment: commentValue,
      };

      // return console.log(newHistoryData);
      const res = await axios.post(
        `pipo/create/lead/history/`,
        JSON.stringify(newHistoryData)
      );
      if (res.status === 201) {
        setToggleForm(false);
        toast.success("History created successfully");

        // history obj for showing UI
        const historyObj = {
          created_by: {
            first_name: firstname,
            last_name: lastname,
          },
          date: newHistoryData.date,
          comment: commentValue,
        };
        setHistories((prev) => [historyObj, ...prev]);
      } else {
        toast.error("Something wrong", { duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  // this one for submitting the form of add history
  useEffect(() => {
    if (toggleForm) {
      var myModal = new bootstrap.Modal(document.getElementById("myModal1"), {
        backdrop: "static",
      });

      myModal.show();
    }
  }, [toggleForm]);

  // this one for show the history update data list
  useEffect(() => {
    if (modalShow) {
      var myModal = new bootstrap.Modal(document.getElementById("myModal2"), {
        backdrop: "static",
      });
      myModal.show();
    }
  }, [modalShow]);

  // sorting the results to show perfectly
  useEffect(() => {
    if (salesData?.sales_lead_history) {
      setHistories(salesData?.sales_lead_history.reverse());
    }
  }, [salesData?.sales_lead_history]);

  return (
    <>
      {/* add history modal */}
      {toggleForm && (
        <div className='modal fade' id='myModal1'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Modal Title</h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={() => {
                    setToggleForm(false);
                  }}
                />
              </div>

              <>
                <div className='modal-body'>
                  <TextArea
                    title='Comment'
                    name='comment'
                    placeHolder='Type your comment.......'
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                  />
                </div>
                <div className='w-50 mx-auto mb-4'>
                  <button
                    className='rounded-1 w-100  px-5 py-3 outline-none border-0 btn btn-primary'
                    type='submit'
                    form='salesLeadHistoryForm'
                    data-bs-dismiss='modal'
                    onClick={(e) => submitData(e, props)}>
                    Submit
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      )}

      {/* see history modal */}
      <div className='modal fade' id='myModal2'>
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>See History</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => {
                  setModalShow(false);
                }}
              />
            </div>

            <>
              <div className='modal-body'>
                {histories.length === 0 ? (
                  <h2 className='text-center fw-bold fs-3'>
                    Histories Not Found
                  </h2>
                ) : (
                  histories?.map((s, i) => (
                    <div className='card border' key={i}>
                      <div className='card-header text-dark fs-5'>
                        Date: {s?.date}
                      </div>
                      <div className='card-body'>
                        <blockquote className='blockquote mb-0'>
                          <p className='text-dark fs-5 mb-0'>
                            Comment:
                            <span className='fs-6'> {s?.comment}</span>
                          </p>
                          <p className='text-dark fs-5 mb-0'>
                            Created By:
                            <span className='fs-6'>
                              {" "}
                              {s?.created_by.first_name +
                                " " +
                                s?.created_by.last_name}
                            </span>
                          </p>
                        </blockquote>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

const UpdateSalesLeads = () => {
  const axios = useAxiosPrivate();
  const [toggleForm, setToggleForm] = useState(false);
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
        setLoading(false);
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
          className='btn btn-primary btn-common rounded-1 border-0'>
          <BsArrowLeft className='me-2' />
          Back
        </Link>
      </div>
      <div className='row'>
        <div className='col-xl-12 col-lg-12'>
          <div className='card'>
            <div className='card-header flex gap-3 gap-sm-3 gap-md-0 gap-lg-0 flex-column flex-md-row flex-lg-row flex-sm-column'>
              <h4 className='card-title'>Update Sales Lead</h4>
              <div className='d-flex align-items-center gap-3'>
                <button
                  className='btn btn-primary btn-common text-white rounded-1 border-0 py-3 px-4 '
                  onClick={() => setModalShow(true)}>
                  See History
                </button>
                <button
                  className='btn btn-primary btn-common text-white rounded-1 border-0 py-3 px-4'
                  onClick={() => setToggleForm(true)}>
                  Add History
                </button>
              </div>
            </div>

            {/* -------modal hidden ------ */}
            <SalesLeadHistoryModal
              show={{ modalShow, setModalShow }}
              salesData={selectedData}
              modalState={{ toggleForm, setToggleForm }}
            />
            {/* -------modal hidden------- */}

            <div className='card-body'>
              {!loading ? (
                <SalesDataForm
                  salesData={selectedData}
                  modalState={{ toggleForm, setToggleForm }}
                />
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
