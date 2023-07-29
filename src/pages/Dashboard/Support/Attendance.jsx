import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from '../../../components/Shared/SectionTitle';
import "./Attendance.css";

const Attendance = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
        <PageTitle title="Attendance Page" />
        <SectionTitle title="Attendance Page" />
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
          <h1>Attendance Page</h1>
          {/* <!-- Button trigger modal --> */}
            <button type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
             Leave Application
          </button>
          </div>
      <section>
          <div className="row">
            <section className="col-md-6">
              <div className="border border-dark mb-3 p-2 rounded-2">
                <p className='text-dark fs-4'>Total Leaves: Taken / Available</p>
                <p className='text-dark fs-4'>Casual Leaves: Taken / Available</p>
                <p className='text-dark fs-4'>Sick: Taken / Available</p>
              </div>
              <div className="border border-dark mb-3 rounded-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className='text-dark fs-4'>Leave Type</th>
                      <th scope="col" className='text-dark fs-4'>Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-dark fs-4'>From – To (No of days)</td>
                      <td className='text-dark fs-4'>Status</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border border-dark mb-3 rounded-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th className='text-dark fs-4' scope="col">Leave Type</th>
                      <th className='text-dark fs-4' scope="col">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-dark fs-4'>From – To (No of days)</td>
                      <td className='text-dark fs-4'>Status</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section className="col-md-6">
              <Calendar className='border-dark' onChange={onChange} value={value} />
            </section>
          </div>

          {/* modal section */}
          <div>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Leave Application
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <p className='text-dark fs-4'>Total Leaves: Taken / Available</p>
                      <p className='text-dark fs-4'>Casual Leaves: Taken / Available</p>
                      <p className='text-dark fs-4'>Sick: Taken / Available</p>
                    </div>
                    <div className="row gap-1">
                      <button className="col-6 btn btn-primary">Form Date</button>
                      <button className="col-6 btn btn-primary">Half/Full Day</button>
                      <button className="col-6 btn btn-primary">To Date</button>
                      <button className="col-6 btn btn-primary">Half/Full Day</button>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
      </div>
      </div>

    </div>
  );
};

export default Attendance;
