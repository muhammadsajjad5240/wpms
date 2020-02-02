import React, { Component } from 'react';
import emp_1 from '../../../../../assets/images/employees/emp_1.jpg';
import ClientProject from './clientProject';
import './client_profile.css';
let axios = require('axios');
let obj;
let sendClientName;
class ClientProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: [],
            projects: []
        }
    }
    componentDidMount = () => {
        axios.post('/Client/getSpecifiClient')
            .then(res => {
                this.setState({ client: res.data });
                for (let i in this.state.client) {
                    obj = this.state.client[i];
                };
                sendClientName = obj.fullName;
                axios.post("/Client/sendClienttName", { client_name: sendClientName })
                    .catch(function (error) {
                        console.log(error);
                    })
                document.getElementById('client_name').innerText = obj.fullName;
                document.getElementById('clien_id').innerText = obj.clientId;
                document.getElementById('client_phone').innerText = obj.phone;
                document.getElementById('client_email').innerText = obj.email;
                document.getElementById('client_address').innerText = obj.address;
                document.getElementById('client_gender').innerText = obj.gender;
            })
    }
    render() {
        return (
            <div id='client_profile'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1 className='mt-4'>Client</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" style={{ color: '#000', fontWeight: 600 }}>Dashboard</li>
                                <li class="breadcrumb-item active" style={{ color: 'grey' }}>Client Profile</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row personal_info">
                    <div className="col-sm-2">
                        <img src={emp_1} alt="Client pic" className="rounded_images ml-2 mt-2 mb-2 overlay" onMouseLeave={this.showimgBtn}/>
                    </div>
                    <div className="col-sm-3">
                        <h5 id="client_name" className="mt-4">Name</h5>
                        <h6>Client Id:&nbsp;&nbsp;&nbsp;<span id="clien_id"></span></h6>
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-4 contact_info">
                        <div className="row mt-4">
                            <div className="col-sm-2">
                                <h4 className="contact_heading">Phone</h4>
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <h5 id="client_phone" className="contact_data">Phone</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                <h4 className="contact_heading">Email</h4>
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <h5 id="client_email" className="contact_data">Email</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-2">
                                <h4 className="contact_heading">Address</h4>
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8">
                                <h5 id="client_address" className="contact_data">Address</h5>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-sm-2">
                                <h4 className="contact_heading">Gender</h4>
                            </div>
                            <div className="col-sm-2"></div>
                            <div className="col-sm-6">
                                <h5 id="client_gender" className="contact_data">Gender</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row bg-white">
                    <div className="col-sm-4 offset-sm-4">
                        <h5 className="client_project_heading ml-4 text-center mt-3 mb-3">Projects</h5>
                    </div>
                </div>
                <br />
                <ClientProject />
            </div>
        );
    }
}
export default ClientProfile;