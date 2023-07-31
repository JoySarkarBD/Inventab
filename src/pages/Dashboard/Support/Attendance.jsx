/* eslint-disable no-unused-vars */
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { useState } from "react";
import PageTitle from "../../../components/Shared/PageTitle";
import SectionTitle from "../../../components/Shared/SectionTitle";
import "./Attendance.css";

const Attendance = () => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });

  return (
    <div>
      <PageTitle title='Attendance Page' />
      <SectionTitle title='Attendance Page' />
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between mb-3'>
            <h1>Attendance Page</h1>
            {/* <!-- Button trigger modal --> */}
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'>
              Leave Application
            </button>
          </div>
          <section>
            <div className='row'>
              <section className='col-md-6'>
                <div className='border border-dark mb-3 p-2 rounded-2'>
                  <p className='text-dark fs-4'>
                    Total Leaves: Taken / Available
                  </p>
                  <p className='text-dark fs-4'>
                    Casual Leaves: Taken / Available
                  </p>
                  <p className='text-dark fs-4'>Sick: Taken / Available</p>
                </div>
                <div className='border border-dark mb-3 rounded-2'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col' className='text-dark fs-4'>
                          Leave Type
                        </th>
                        <th scope='col' className='text-dark fs-4'>
                          Applied Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='text-dark fs-4'>
                          From – To (No of days)
                        </td>
                        <td className='text-dark fs-4'>Status</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='border border-dark mb-3 rounded-2'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th className='text-dark fs-4' scope='col'>
                          Leave Type
                        </th>
                        <th className='text-dark fs-4' scope='col'>
                          Applied Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='text-dark fs-4'>
                          From – To (No of days)
                        </td>
                        <td className='text-dark fs-4'>Status</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section className='col-md-6'>
                <div className='d-flex align-items-center justify-content-center h-100'>
                  <Calendar
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    shouldHighlightWeekends
                    calendarClassName='custom-calendar'
                    calendarTodayClassName='custom-today-day'
                    renderFooter={() => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "1rem 2rem",
                        }}>
                        <button
                          type='button'
                          onClick={() => {
                            setSelectedDayRange({
                              from: null,
                              to: null,
                            });
                          }}
                          style={{
                            background: "red",
                            fontSize: "15px",
                            border: "#0fbcf9",
                            color: "#fff",
                            borderRadius: "0.5rem",
                            padding: "1rem 2rem",
                          }}>
                          Reset Value!
                        </button>
                      </div>
                    )}
                  />
                </div>
              </section>
            </div>

            {/* modal section */}
            <div>
              {/* <!-- Modal --> */}
              <div
                className='modal fade'
                id='exampleModal'
                tabIndex='-1'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'>
                <div className='modal-dialog modal-dialog-centered'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-4' id='exampleModalLabel'>
                        Leave Application
                      </h1>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                      <div className='mb-3'>
                        <p className='text-dark fs-5'>
                          Total Leaves: Taken / Available
                        </p>
                        <p className='text-dark fs-5'>
                          Casual Leaves: Taken / Available
                        </p>
                        <p className='text-dark fs-5'>
                          Sick: Taken / Available
                        </p>
                      </div>
                      <div className='row'>
                        {/* form date button */}
                        <div className='col-md-6 col-sm-12 text-center'>
                          <button className=' btn btn-primary w-100 m-2 rounded-1'>
                            Form Date
                          </button>
                        </div>

                        {/* Half or Full Day button */}
                        <div className='col-md-6 col-sm-12 text-center'>
                          <button className=' btn btn-primary w-100 m-2 rounded-1'>
                            Half/Full Day
                          </button>
                        </div>

                        {/* To Date button */}
                        <div className='col-md-6 col-sm-12 text-center'>
                          <button className=' btn btn-primary w-100 m-2 rounded-1'>
                            To Date
                          </button>
                        </div>

                        {/* Half/Full Day button */}
                        <div className='col-md-6 col-sm-12 text-center'>
                          <button className=' btn btn-primary w-100 m-2 rounded-1'>
                            Half/Full Day
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary rounded-1 w-25'
                        data-bs-dismiss='modal'>
                        Close
                      </button>
                      <button
                        type='button'
                        className='btn btn-primary rounded-1'>
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
