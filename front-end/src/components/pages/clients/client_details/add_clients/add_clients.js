// below we import moduels for the component
import React, { Component } from 'react';
import './add_clients.css';
let axios = require('axios');
// below we create css for component
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
const radioInputStyle = {
    border: 'none',
    color: '#000',
    fontSize: '14px',
    fontWeight: '500',

};
// below we create componnet class
class AddClients extends Component {
    // below we create constructor to create state
    constructor(props) {
        super(props);
        // below we bind all the function
        this.handleClientFullName = this.handleClientFullName.bind(this);
        this.handleClientUserName = this.handleClientUserName.bind(this);
        this.handleClientEmail = this.handleClientEmail.bind(this);
        this.handleClientClientId = this.handleClientId.bind(this);
        this.handleClientPhone = this.handleClientPhone.bind(this);
        this.handleClientSubmit = this.handleClientSubmit.bind(this);
        // below we create state to save component data
        this.state = {
            client_names: [],
            add_client_full_name: '',
            add_client_user_name: '',
            add_client_email: '',
            add_client_id: '',
            add_client_phone: '',
            add_client_address: '',
            add_client_gender: '',
        }
    }
    // below  we create method to check validation handle Full Name
    handleClientFullName = (e) => {
        this.setState({ add_client_full_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let full_name = document.getElementById('add_client_full_name').value;
        if (!letters.test(full_name)) {
            document.getElementById('add_client_full_name').style.border = '1px solid red';
            document.getElementById('addclientnamelable').innerText = 'Full Name *';
            document.getElementById('addclientnamelable').style.color = 'red';
        }
        else {
            document.getElementById('add_client_full_name').style.border = '1px solid grey';
            document.getElementById('addclientnamelable').innerText = 'Full Name';
            document.getElementById('addclientnamelable').style.color = '#000000';
        }
    }
    // below  we create method to check validation handle User Name
    handleClientUserName = (e) => {
        this.setState({ add_client_user_name: e.target.value });
        let letters = /^[a-zA-Z0-9]+$/;
        let user_name = document.getElementById('add_client_user_name').value;
        if (!letters.test(user_name) || user_name.length < 6) {
            document.getElementById('add_client_user_name').style.border = '1px solid red';
            document.getElementById('addclientuserName').style.color = 'red';
            document.getElementById('addclientuserName').innerText = 'User Name *';
        }
        else {
            document.getElementById('add_client_user_name').style.border = '1px solid grey';
            document.getElementById('addclientuserName').style.color = '#000000';
            document.getElementById('addclientuserName').innerText = 'User Name';
        }
    }
    // below  we create method to check validation handle Email
    handleClientEmail = (e) => {
        this.setState({ add_client_email: e.target.value });
        let email = document.getElementById('add_client__email').value;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('add_client__email').style.border = '1px solid red';
            document.getElementById('addclientemail').style.color = 'red';
            document.getElementById('addclientemail').innerText = 'Email *';
        }
        else {
            document.getElementById('add_client__email').style.border = '1px solid grey';
            document.getElementById('addclientemail').style.color = '#000000';
            document.getElementById('addclientemail').innerText = 'Email';
        }
    }
    // below  we create method to set state of cliet_id
    handleClientId = (e) => {
        this.setState({ add_client_client_id: e.target.value });
    }
    // below  we create method to check validation handle Phone Number
    handleClientPhone = (e) => {
        this.setState({ add_client_phone: e.target.value });
        let letters = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let phone = document.getElementById('add_client__phone').value;
        if (!letters.test(phone)) {
            document.getElementById('add_client__phone').style.border = '1px solid red';
            document.getElementById('addclientphone').style.color = 'red';
            document.getElementById('addclientphone').innerText = 'Phone *';
        }
        else {
            document.getElementById('add_client__phone').style.border = '1px solid grey';
            document.getElementById('addclientphone').style.color = '#000000';
            document.getElementById('addclientphone').innerText = 'Phone';
        }
    }
    // below  we create method to check validation handle Address
    handleClientAddress = (e) => {
        this.setState({ add_client_address: e.target.value });
        let address = document.getElementById('add_client_address').value;
        if (address === "") {
            document.getElementById('add_client_address').style.border = '1px solid red';
            document.getElementById('addclientaddress').style.color = 'red';
            document.getElementById('addclientaddress').innerText = 'Phone *';
        }
        else {
            document.getElementById('add_client_address').style.border = '1px solid grey';
            document.getElementById('addclientaddress').style.color = '#000000';
            document.getElementById('addclientaddress').innerText = '';
        }
    }
    // below  we create method to set state gender
    handleClientGender = (e) => {
        this.setState({ add_client_gender: e.target.value });
    }
    // below  we create method to check validation and will run the use submit the form
    handleClientSubmit = (e) => {
        // below we prevent form from reloading
        e.preventDefault();
        // below we send request to the server to get the client names to check duplication
        axios.post('/Client/getClientNames')
            .then(res => {
                this.setState({ client_names: res.data });
            });
        let fullName = document.getElementById('add_client_full_name').value;
        let user_name = document.getElementById('add_client_user_name').value;
        let email = document.getElementById('add_client__email').value;
        let clientId = document.getElementById('add_client_client_id').value;
        let phone = document.getElementById('add_client__phone').value;
        let address = document.getElementById('add_client_address').value;
        let fullNamePattern = /^[a-zA-Z ]+$/;
        let userNamePattern = /^[a-zA-Z0-9]+$/;
        let clientIdPattern = /^[a-zA-Z0-9]+$/;
        let PhonePattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let verfiy = 1;
        for (let i = 0; i < this.state.client_names.length; i++) {
            if (user_name === this.state.client_names[i].userName) {
                verfiy = 0;
            }
            else {
                verfiy = 1;
            }
        }
        if (verfiy === 0) {
            document.getElementById('add_client_user_name').style.border = '1px solid red';
            document.getElementById('addclientuserName').innerText = 'Name Already Exist';
            document.getElementById('addclientuserName').style.color = 'red'
        }
        else if (!fullNamePattern.test(fullName)) {
            document.getElementById('add_client_full_name').style.border = '1px solid red';
            document.getElementById('addclientnamelable').innerText = 'Full Name *';
            document.getElementById('addclientnamelable').style.color = 'red'
        }
        else if (!userNamePattern.test(user_name) || user_name < 6) {
            document.getElementById('add_client_user_name').style.border = '1px solid red';
            document.getElementById('addclientuserName').style.color = 'red';
            document.getElementById('addclientuserName').innerText = 'User Name * (min-len 6)';
        }
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('add_client__email').style.border = '1px solid red';
            document.getElementById('addclientemail').innerText = 'Email *';
            document.getElementById('addclientemail').style.color = 'red';
        }
        else if (!clientIdPattern.test(clientId)) {
            document.getElementById('client_id').style.border = '1px solid red';
        }
        else if (!PhonePattern.test(phone)) {
            document.getElementById('add_client__phone').style.border = '1px solid red';
            document.getElementById('addclientphone').style.color = 'red';
            document.getElementById('addclientphone').innerText = 'Phone *';
        }
        else if (address === "") {
            document.getElementById('add_client_address').style.border = '1px solid red';
            document.getElementById('addclientaddress').style.color = 'red';
            document.getElementById('addclientaddress').innerText = 'Phone *';
        }
        else if (this.state.add_client_gender === "") {
            document.getElementById('addclientgender').style.color = 'red';
            document.getElementById('addclientgender').innerText = 'Gender *';
        }
        else {
        //     // below we create oject to store data and send this object to server to store data to the server
            let newClient = {
                fullName: this.state.add_client_full_name,
                userName: this.state.add_client_user_name,
                email: this.state.add_client_email,
                clientId: this.state.add_client_client_id,
                phone: this.state.add_client_phone,
                address: this.state.add_client_address,
                gender: this.state.add_client_gender
            }
        //     // below we send request to the server to store data in database
            axios.post('/Client/addClient', newClient)
                .then(res => {
                    let a = res.statusText;
                    if (a === "OK") {
                        document.getElementById('success_alert').style.display = 'block';
        //                 // $("#success_alert").fadeOut(5000);
                    }
                })
        //     // below we send request to the server to send email to the client
            axios.post('/Email/send', newClient)
                .then(res => {
                });
        //     // below we set state empty after submit record
            this.setState({
                add_client_full_name: '',
                add_client_user_name: '',
                add_client_email: '',
                add_client_id: '',
                add_client_phone: '',
                add_client_address: ''
            })
        //     // below we replace location
            window.location.replace('/dashboard/client-detail');
        }
    }
    // below we create method which will call when the use focus on the input fields
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid grey";
    }
    // below we create method which will call when the alert close button is clicked
    hideAlert = () => {

        window.location.replace('/dashboard/employees');
    }
    // below we create method which will call when the component will load
    // in this method client id will generate which contain alphabe and numbers
    componentDidMount = () => {
        let length = 6;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        this.setState({ add_client_id: text });

    }
    // below is our render method
    render() {
        return (
            <div id='add_client'>
                <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert" style={{ display: 'none' }}>
                    <strong>New Employee Add Successfully</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" onClick={this.hideAlert}>&times;</span>
                    </button>
                </div>
                <form id="add_client_form">
                    <div class="form-row">
                        <div class="col-md-12 mb-3">
                            <label for="fullName" id="addclientnamelable" style={lableStyle}>Full Name</label>
                            <input type="text" class="form-control" maxLength='20' id="add_client_full_name" style={inputStyle} name='fulltName' onFocus={() => this.myfocus('add_client_full_name')} value={this.state.add_client_full_name} onChange={this.handleClientFullName} placeholder="Full name" title='Full name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="userName" style={lableStyle} id="addclientuserName">User Name</label>
                            <input type="text" class="form-control" maxLength='10' id="add_client_user_name" style={inputStyle} name='userName' onFocus={() => this.myfocus('add_client_user_name')} value={this.state.add_client_user_name} onChange={this.handleClientUserName} placeholder="User Name" title='User Name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="employeeId" style={lableStyle} id="addclientclientID">Client ID</label>
                            <input type="text" class="form-control" id="add_client_client_id" style={inputStyle} name='clientId' readOnly onFocus={() => this.myfocus('add_client_client_id')} value={this.state.add_client_id} onChange={this.handleClientId} placeholder="Client ID" title='Client ID' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="email" style={lableStyle} id="addclientemail">Email</label>
                            <input type="text" class="form-control" id="add_client__email" style={inputStyle} name='email' onFocus={() => this.myfocus('add_client__email')} value={this.state.add_client_email} onChange={this.handleClientEmail} placeholder="Email" title='Eamil' />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="phone" style={lableStyle} id="addclientphone">Phone</label>
                            <input type="text" class="form-control" id="add_client__phone" style={inputStyle} name='phone' onFocus={() => this.myfocus('add_client__phone')} value={this.state.add_client_phone} onChange={this.handleClientPhone} placeholder="Phone No" title='Phone No' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1" style={lableStyle} id="addclientaddress">Address</label>
                                <textarea type="text" class="form-control" id="add_client_address" style={inputStyle} rows="3" onFocus={() => this.myfocus('add_client_address')} value={this.state.add_client_address} onChange={this.handleClientAddress} placeholder="Address" ></textarea>
                            </div>
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="exampleFormControlTextarea1" style={lableStyle} id="addclientgender">Gender:</label>
                            <div class="form-check form-check-inline ml-3">
                                <input class="form-check-input" checked type="radio" style={radioInputStyle} name="gender" id="_male" value="male" checked={this.state.add_client_gender === 'male'} onChange={this.handleClientGender} />
                                <label class="form-check-label" for="male" style={lableStyle}>Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={radioInputStyle} name="gender" id="_female" value="female" checked={this.state.add_client_gender === 'female'} onChange={this.handleClientGender} />
                                <label class="form-check-label" for="female" style={lableStyle}>Female</label>
                            </div>
                        </div>
                        {/* <div class="col-md-6 mb-3">
                            <label for="exampleFormControlTextarea1" style={lableStyle} style={{ color: 'red', display: 'none' }} id="addclientgenderErr">Please Select Gender</label>
                        </div> */}
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 offset-sm-4 mr-4'>
                            <button class="btn" onClick={this.handleClientSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Add Client</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default AddClients;