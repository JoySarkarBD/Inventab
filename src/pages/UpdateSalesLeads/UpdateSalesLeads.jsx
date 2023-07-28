import { BsSend } from "react-icons/bs";
import PageTitle from "../../components/Shared/PageTitle";
import SectionTitle from "../../components/Shared/SectionTitle";


const UpdateSalesLeads = () => {
    return (
        <>
        <PageTitle title='Sales Dashboard' />
        <SectionTitle title='Sales Leads' />
        <div className="container-fluid">
            <div className="row">
            <div className="col-xl-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                    <h4 className="card-title">Horizontal Form</h4>
                    </div>
                    <div className="card-body">
                    <div className="basic-form">
                        <form>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" placeholder="1234 Main St" />
                            </div>
                            <div className="mb-3 col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Email" />
                            </div>
                            <div className="mb-3 col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="mb-3 col-md-6">
                            <label>City</label>
                            <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end my-4">
                        <button type="submit" className="btn btn-primary"><BsSend className="me-2"/> Update</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
        </>
    );
};

export default UpdateSalesLeads;