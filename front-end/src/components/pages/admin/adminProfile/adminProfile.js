// below we import modules for compoennt
import React, { Component } from 'react';
import emp_1 from '../../../../assets/images/employees/emp_1.jpg';
import './admin_profile.css';
let axios = require('axios');
let obj;
// below we create component class
class AdminProfile extends Component {
    // below we create constructor
    constructor(props) {
        super(props);
        // below we create state to handle data
        this.state = {
            admin: [],
            projects: []
        }
    }
    // below we create method that will call when the component will load
    componentDidMount = () => {
        // below we send request to the server to get specific admin record
        axios.post('/Admin/getSpecifiAdmin')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ admin: res.data });
                for (let i in this.state.admin) {
                    obj = this.state.admin[i];
                };
                document.getElementById('admin_name').innerText = obj.fullName;
                document.getElementById('admin_id').innerText = obj.adminId;
                document.getElementById('admin_phone').innerText = obj.phone;
                document.getElementById('admin_email').innerText = obj.email;
                document.getElementById('admin_address').innerText = obj.address;
                document.getElementById('admin_gender').innerText = obj.gender;
            })
    }
    // below is our main render method
    render() {
        return (
            <div id='client_profile'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1 className='mt-4'>Admin</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" style={{ color: '#000', fontWeight: 600 }}>Dashboard</li>
                                <li class="breadcrumb-item active" style={{ color: 'grey' }}>Admin Profile</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row personal_info">
                    <div className="col-sm-2">
                        <img src={emp_1} alt="Client pic" className="rounded_images ml-2 mt-2 mb-2 overlay" onMouseLeave={this.showimgBtn} />
                    </div>
                    <div className="col-sm-3">
                        <h5 id="admin_name" className="mt-4">Name</h5>
                        <h6>Admin Id:&nbsp;&nbsp;&nbsp;<span id="admin_id"></span></h6>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-4 contact_info">
                        <div className="row mt-4">
                            <div className="col-sm-2">
                                <h4 className="contact_heading">Phone</h4>
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <h5 id="admin_phone" className="contact_data"></h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                <h4 className="contact_heading">Email</h4>
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <h5 id="admin_email" className="contact_data"></h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                <h4 className="contact_heading">Address</h4>
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <h5 id="admin_address" className="contact_data"></h5>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-sm-2">
                                <h4 className="contact_heading">Gender</h4>
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-6">
                                <h5 id="admin_gender" className="contact_data"></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}
// below we export component
export default AdminProfile;