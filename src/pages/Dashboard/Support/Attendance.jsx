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
              className='btn btn-primary btn-common rounded-1'
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
                <div className='modal-dialog modal-lg modal-dialog-centered'>
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
                    <form>
                      <div className='modal-body'>
                        <div className='row'>
                          {/* left */}
                          <div className='col-md-6 col-sm-12 mb-3'>
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
                          {/* right */}
                          <div className='col-md-6 col-sm-12 mb-3'>
                            <select className='w-100 h-25' name='appln-status'>
                              <option
                                disabled
                                value='Select Appln Status'
                                selected>
                                Select Appln Status
                              </option>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                            </select>
                          </div>
                        </div>
                        <div className='row'>
                          {/* form date input */}

                          <label>From:</label>
                          <div className='col-md-4 col-sm-12 '>
                            <input
                              type='date'
                              name='from'
                              placeholder='Select date'
                              id='from'
                              className='w-100 h-75 m-2 rounded-1'
                            />
                          </div>

                          {/* Half or Full Day select */}
                          <div className='col-md-4 col-sm-12 '>
                            <select
                              name='day'
                              className='w-100 h-75 m-2 rounded-1'>
                              <option disabled value='Select Day' selected>
                                Select Day
                              </option>
                              <option value='First Half'>First Half</option>
                              <option value='Second Half'>Second Half</option>
                              <option value='Full Day'>Full Day</option>
                            </select>
                          </div>

                          {/* select status */}
                          <div className='col-md-4 col-sm-12 '>
                            <select
                              className='w-100 h-75 m-2 rounded-1'
                              name='status'>
                              <option disabled value='Select Status' selected>
                                Select Status
                              </option>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                            </select>
                          </div>

                          {/* To Date button */}
                          <label>To:</label>
                          <div className='col-md-4 col-sm-12 '>
                            <input
                              type='date'
                              name='to'
                              id='to'
                              className='w-100 h-75 m-2 rounded-1'
                            />
                          </div>

                          {/* Half/Full Day select */}
                          <div className='col-md-4 col-sm-12 '>
                            <select
                              name='day'
                              className='w-100 h-75 m-2 rounded-1'>
                              <option disabled value='Select Day' selected>
                                Select Day
                              </option>
                              <option value='First Half'>First Half</option>
                              <option value='Second Half'>Second Half</option>
                              <option value='Full Day'>Full Day</option>
                            </select>
                          </div>

                          {/* select status */}
                          <div className='col-md-4 col-sm-12 '>
                            <select
                              className='w-100 h-75 m-2 rounded-1'
                              name='status'>
                              <option disabled value='Select Status' selected>
                                Select Status
                              </option>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary rounded-1'
                          data-bs-dismiss='modal'>
                          Close
                        </button>
                        <input
                          type='submit'
                          value='Submit'
                          className='btn btn-primary rounded-1'
                        />
                      </div>
                    </form>
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
