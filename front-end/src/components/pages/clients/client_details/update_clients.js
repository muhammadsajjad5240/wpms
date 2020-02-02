// below we import modules and create global variables for component
import React, { Component } from 'react';
import './add_clients/add_clients.css';
let axios = require('axios');
let obj, clientHistory;
// below we create css
const lableStyle = {
    color: '#000',
    fontSize: '14px',
    fontWeight: '700'
};
const inputStyle = {
    color: '#000',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ced4da'
};
// below we create component class
class UpdateClient extends Component {
    // below we create constructor to create class
    constructor(props) {
        super(props);
        // below we bind all the function
        this.handleClientName = this.handleClientName.bind(this);
        this.handleClientUserName = this.handleClientUserName.bind(this);
        this.handleClientEmail = this.handleClientEmail.bind(this);
        this.handleClientPhone = this.handleClientPhone.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleClientAddress = this.handleClientAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // below we create state to save data
        this.state = {
            clients: [],
            client_name: '',
            client_user_name: '',
            client_email: '',
            client_id: '',
            client_address: '',
            client_phone: '',
            address: '',
            gender: '',
        }
    }
    // below we create method to check validation handle client Name
    handleClientName = (e) => {
        this.setState({ client_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let full_name = document.getElementById('client_name').value;
        if (!letters.test(full_name)) {
            document.getElementById('client_name').style.border = '1px solid red';
        }
        else {
            document.getElementById('client_name').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation handle User Name
    handleClientUserName = (e) => {
        this.setState({ client_user_name: e.target.value });
        let letters = /^[a-zA-Z0-9]+$/;
        let user_name = document.getElementById('user_name').value;
        if (!letters.test(user_name) || user_name.length < 6) {
            document.getElementById('user_name').style.border = '1px solid red';
        }
        else {
            document.getElementById('user_name').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation handle Email
    handleClientEmail = (e) => {
        this.setState({ client_email: e.target.value });
        let email = document.getElementById('client_email').value;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('client_email').style.border = '1px solid red';
        }
        else {
            document.getElementById('client_email').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation handle client Phone Number
    handleClientPhone = (e) => {
        this.setState({ client_phone: e.target.value });
        let letters = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let phone = document.getElementById('client_phone').value;
        if (!letters.test(phone)) {
            document.getElementById('client_phone').style.border = '1px solid red';
        }
        else {
            document.getElementById('client_phone').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation handle client Address
    handleClientAddress = (e) => {
        this.setState({ client_address: e.target.value });
        let address = document.getElementById('client_address').value;
        if (address === "") {
            document.getElementById('client_address').style.border = '1px solid red';
        }
        else {
            document.getElementById('client_address').style.border = '1px solid grey';
        }
    }
    // below we create method to handle Gender
    handleGender = (e) => {
        this.setState({ gender: e.target.value });
    }
    // below we create method to check validation and save data this method will call when the form will submit
    handleSubmit = (e) => {
        // below we prevent form to reload
        e.preventDefault();
        let full_name = document.getElementById('client_name').value;
        let user_name = document.getElementById('user_name').value;
        let email = document.getElementById('client_email').value;
        let clientId = document.getElementById('client_id').value;
        let phone = document.getElementById('client_phone').value;
        let address = document.getElementById('client_address').value;
        let fullNamePattern = /^[a-zA-Z ]+$/;
        let userNamePattern = /^[a-zA-Z0-9]+$/;
        let clientIdPattern = /^[a-zA-Z0-9]+$/;
        let PhonePattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        if (!fullNamePattern.test(full_name)) {
            document.getElementById('client_name').style.border = '1px solid red';
        }
        else if (!userNamePattern.test(user_name) || user_name < 6) {
            document.getElementById('user_name').style.border = '1px solid red';
        }
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('client_email').style.border = '1px solid red';
        }
        else if (!clientIdPattern.test(clientId)) {
            document.getElementById('client_id').style.border = '1px solid red';
        }
        else if (!PhonePattern.test(phone)) {
            document.getElementById('client_phone').style.border = '1px solid red';
        }
        else if (address === "") {
            document.getElementById('client_address').style.border = '1px solid red';
        }
        else {
            // below we send request with  to the server to update the specific record
            axios.post('/Client/updateClient', {
                id: this.state.client_id,
                fullName: this.state.client_name,
                userName: this.state.client_user_name,
                email: this.state.client_email,
                clientId: this.state.client_id,
                phone: this.state.client_phone,
                address: this.state.client_address,
                gender: this.state.gender
            })
                .then(res => {
                    let a = res.statusText
                    if (a === "OK") {
                        // below we send request to the server to save previous history to the database
                        axios.post('/Client/addClientHistory', clientHistory);
                        document.getElementById('success_alert').style.display = 'block';
                    }
                }
                )
                // below we set states to empty
            this.setState({
                client_name: '',
                client_user_name: '',
                client_email: '',
                client_id: '',
                client_phone: '',
                client_address: '',
            })
            // below we replace location
            window.location.replace('/dashboard/client-detail');
        }
    }
    // below we create method which will call when the use focus on input field
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid #e3e3e3";
    }
    // below is method whih will call when the component load
    componentDidMount = () => {
        // below we send request to the server when the component load to send data to the fron-end
        axios.post('/Client/getClientDataForUpdate', {})
            .then(res => {
                // below we set state with data which is come from server
                this.setState({ clients: res.data })
                for (let i in this.state.clients) {
                    obj = this.state.clients[i];
                };
                this.setState({ client_name: obj.fullName })
                this.setState({ client_user_name: obj.userName })
                this.setState({ client_email: obj.email })
                this.setState({ client_id: obj.clientId })
                this.setState({ client_phone: obj.phone })
                this.setState({ client_address: obj.address })
                this.setState({ gender: obj.gender });
                if (this.state.gender === "male") {
                    document.getElementById('_male').checked = true;
                }
                else if (this.state.gender === "female") {
                    document.getElementById('_female').checked = true;
                }
                // below we create object and store values and send this object to the server to save the history
                clientHistory = {
                    fullName: obj.fullName,
                    userName: obj.userName,
                    email: obj.email,
                    clientId: obj.clientId,
                    phone: obj.phone,
                    address: obj.address,
                    gender: obj.gender
                }
            })
            .catch(error => { console.log(error) });
    }
    // below is our main render method
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4">
                        <h1 className="mr-1 mt-2" style={{ fontSize: '20px', color: '#000', fontWeight: '600' }}>Update Employee Record</h1>
                    </div>
                </div>
                <form>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="clientName" style={lableStyle}>Client Name</label>
                            <input type="text" class="form-control" style={inputStyle} id="client_name" name='clienttName' onFocus={() => this.myfocus('client_name')} value={this.state.client_name} onChange={this.handleClientName} placeholder="Client name" title='Client name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="userName" style={lableStyle}>User Name</label>
                            <input type="text" class="form-control" style={inputStyle} id="user_name" name='userName' onFocus={() => this.myfocus('user_name')} value={this.state.client_user_name} onChange={this.handleClientUserName} readOnly placeholder="User Name" title='User Name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="email" style={lableStyle}>Client Email</label>
                                <input type="text" class="form-control" style={inputStyle} id="client_email" name="clientEmail" onFocus={() => this.myfocus('client_email')} rows="1" value={this.state.client_email} onChange={this.handleClientEmail} placeholder="Client Email" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="clientId" style={lableStyle}>Client ID</label>
                                <input type="text" class="form-control" style={inputStyle} id="client_id" name="clientID" readOnly onFocus={() => this.myfocus('client_id')} rows="1" value={this.state.client_id} placeholder="Client ID" />
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert" style={{ display: 'none' }}>
                        <strong>Client Record Updated Successfully</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={this.hideAlert}>&times;</span>
                        </button>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="phone" style={lableStyle}>Client Phone</label>
                            <input type="text" class="form-control" style={inputStyle} id="client_phone" name='clientPhone' onFocus={() => this.myfocus('client_phone')} value={this.state.client_phone} onChange={this.handleClientPhone} title="Client Phone" />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-4">
                            <label for="address" style={lableStyle}>Client Address</label>
                            <textarea class="form-control" style={inputStyle} id="client_address" row="1" name='clientAddress' onFocus={() => this.myfocus('client_address')} value={this.state.client_address} onChange={this.handleClientAddress} title='Client Address' ></textarea>
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="exampleFormControlTextarea1" style={lableStyle}>Gender:</label>
                            <div class="form-check form-check-inline ml-3">
                                <input class="form-check-input" type="radio" name="gender" id="_male" value="Male" onChange={this.handleGender} />
                                <label class="form-check-label" for="male" style={lableStyle}>Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="_female" value="Female" onChange={this.handleGender} />
                                <label class="form-check-label" for="female" style={lableStyle}>Female</label>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 offset-sm-5 mr-4'>
                            <button class="btn" onClick={this.handleSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Update Client</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default UpdateClient;