import PageTitle from "../../../components/Shared/PageTitle";

const Attendance = () => {
  return (
    <div>
      <PageTitle title="Attendance" />
      <h1>Attendance Page</h1>

      <section>
        <div className="container-fluid ">
          <div className="row">
            <section className="col-md-6">
              <div className="border border-primary mb-3 p-2">
                <p>Total Leaves: Taken / Available</p>
                <p>Casual Leaves: Taken / Available</p>
                <p>Sick: Taken / Available</p>
              </div>
              <div className="border border-primary mb-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Leave Type</th>
                      <th scope="col">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>From – To (No of days)</td>
                      <td>Status</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border border-primary mb-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Leave Type</th>
                      <th scope="col">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>From – To (No of days)</td>
                      <td>Status</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section className="col-md-6">2</section>
          </div>

          {/* modal section */}
          <div>
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Launch demo modal
            </button>

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
                    <div className="border border-primary mb-3 p-2">
                      <p>Total Leaves: Taken / Available</p>
                      <p>Casual Leaves: Taken / Available</p>
                      <p>Sick: Taken / Available</p>
                    </div>
                    <div>
                      <button className="btn btn-primary">Form Date</button>
                      <button className="btn btn-primary">Form Date</button>
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
        </div>
      </section>
    </div>
  );
};

export default Attendance;
