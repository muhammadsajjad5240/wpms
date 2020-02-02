// below we import modules and create global variables for component
import React, { Component } from 'react';
import './myaccount.css';
let axios = require('axios');
let obj, adminHistory;
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
class MyAccount extends Component {
    // below we create constructor to create class
    constructor(props) {
        super(props);
        // below we bind all the function
        this.handleAdminName = this.handleAdminName.bind(this);
        this.handleAdminUserName = this.handleAdminUserName.bind(this);
        this.handleAdminEmail = this.handleAdminEmail.bind(this);
        this.handleAdminPhone = this.handleAdminPhone.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleAddress = this.handleAdminAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // below we create state to save data
        this.state = {
            admins: [],
            admin_name: '',
            admin_user_name: '',
            admin_password: '',
            admin_email: '',
            admin_id: '',
            joining_date:'',
            admin_address: '',
            admin_phone: '',
            address: '',
            gender: '',
        }
    }
    // below we create method to check validation handle client Name
    handleAdminName = (e) => {
        this.setState({ admin_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let full_name = document.getElementById('update_admin_name').value;
        if (!letters.test(full_name)) {
            document.getElementById('update_admin_name').style.border = '1px solid red';
        }
        else {
            document.getElementById('update_admin_name').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation handle User Name
    handleAdminUserName = (e) => {
        this.setState({ admin_user_name: e.target.value });
        let letters = /^[a-zA-Z0-9]+$/;
        let user_name = document.getElementById('update_user_name').value;
        if (!letters.test(user_name) || user_name.length < 6) {
            document.getElementById('update_user_name').style.border = '1px solid red';
        }
        else {
            document.getElementById('update_user_name').style.border = '1px solid grey';
        }
    }
    handleAdminPassword = (e) => {
        this.setState({ admin_password: e.target.value });
        let letters = /^[a-zA-Z0-9]+$/;
        let password = document.getElementById('update_password').value;
        if (!letters.test(password) || password.length < 6) {
            document.getElementById('update_password').style.border = '1px solid red';
        }
        else {
            document.getElementById('update_password').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation handle Email
    handleAdminEmail = (e) => {
        this.setState({ admin_email: e.target.value });
        let email = document.getElementById('update_admin_email').value;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('update_admin_email').style.border = '1px solid red';
        }
        else {
            document.getElementById('update_admin_email').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation handle client Phone Number
    handleAdminPhone = (e) => {
        this.setState({ admin_phone: e.target.value });
        let letters = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let phone = document.getElementById('update_admin_phone').value;
        if (!letters.test(phone)) {
            document.getElementById('update_admin_phone').style.border = '1px solid red';
        }
        else {
            document.getElementById('update_admin_phone').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation handle client Address
    handleAdminAddress = (e) => {
        this.setState({ admin_address: e.target.value });
        let address = document.getElementById('update_admin_address').value;
        if (address === "") {
            document.getElementById('update_admin_address').style.border = '1px solid red';
        }
        else {
            document.getElementById('update_admin_address').style.border = '1px solid grey';
        }
    }
    handleJoiningDate = (e) =>{
        this.setState({joining_date : e.target.value});
    }
    // below we create method to handle Gender
    handleGender = (e) => {
        this.setState({ gender: e.target.value });
    }
    // below we create method to check validation and save data this method will call when the form will submit
    handleSubmit = (e) => {
        // below we prevent form to reload
        e.preventDefault();
        let full_name = document.getElementById('update_admin_name').value;
        let user_name = document.getElementById('update_user_name').value;
        let email = document.getElementById('update_admin_email').value;
        let adminId = document.getElementById('update_admin_id').value;
        let phone = document.getElementById('update_admin_phone').value;
        let address = document.getElementById('update_admin_address').value;
        let password = document.getElementById('update_password').value;
        let fullNamePattern = /^[a-zA-Z ]+$/;
        let userNamePattern = /^[a-zA-Z0-9]+$/;
        let adminIdPattern = /^[a-zA-Z0-9]+$/;
        let PhonePattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        if (!fullNamePattern.test(full_name)) {
            document.getElementById('update_admin_name').style.border = '1px solid red';
        }
        else if (!userNamePattern.test(user_name) || user_name < 6) {
            document.getElementById('update_user_name').style.border = '1px solid red';
        }
        // else if (!userNamePattern.test(password) || password < 6) {
        //     document.getElementById('_password').style.border = '1px solid red';
        // }
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('update_admin_email').style.border = '1px solid red';
        }
        else if (!adminIdPattern.test(adminId)) {
            document.getElementById('update_admin_id').style.border = '1px solid red';
        }
        else if (!PhonePattern.test(phone)) {
            document.getElementById('update_admin_phone').style.border = '1px solid red';
        }
        else if (address === "") {
            document.getElementById('update_admin_address').style.border = '1px solid red';
        }
        else {
            // below we send request with  to the server to update the specific record
            axios.post('/Admin/updateAdmin', {
                id: this.state.admin_id,
                fullName: this.state.admin_name,
                userName: this.state.admin_user_name,
                email: this.state.admin_email,
                adminId: this.state.admin_id,
                phone: this.state.admin_phone,
                joiningDate: this.state.joining_date,
                password: this.state.admin_password,
                address: this.state.admin_address,
                gender: this.state.gender
            })
                .then(res => {
                    let a = res.statusText
                    if (a === "OK") {
                        console.log(adminHistory);
                        // below we send request to the server to save previous history to the database
                        axios.post('/Admin/addAdminHistory', adminHistory);
                        document.getElementById('success_alert').style.display = 'block';
                    }
                }
                )
            // below we set states to empty
            this.setState({
                admin_name: '',
                admin_user_name: '',
                admin_email: '',
                admin_password: '',
                admin_id: '',
                admin_phone: '',
                admin_address: '',
            })
            // below we replace location
            window.location.replace('/dashboard/admin');
        }
    }
    // below we create method which will call when the use focus on input field
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid #e3e3e3";
    }
    // below is method whih will call when the component load
    componentDidMount = () => {
        let admindata = JSON.parse(sessionStorage.getItem('userData'));
        let userName = admindata["username"];
        // below we send request to the server when the component load to send data to the fron-end
        axios.post('/Admin/getAdminData', {userName: userName})
            .then(res => {
                // below we set state with data which is come from server
                this.setState({ admins: res.data })
                console.log(this.state.admins)
                for (let i in this.state.admins) {
                    obj = this.state.admins[i];
                };
                this.setState({ admin_name: obj.fullName })
                this.setState({ admin_user_name: obj.userName })
                this.setState({ admin_email: obj.email })
                this.setState({ admin_id: obj.adminId })
                this.setState({ admin_phone: obj.phone })
                this.setState({ admin_address: obj.address })
                this.setState({joining_date : obj.joiningDate})
                this.setState({ gender: obj.gender });
                this.setState({ admin_password: obj.password })
                if (this.state.gender === "male") {
                    document.getElementById('_male').checked = true;
                }
                else if (this.state.gender === "female") {
                    document.getElementById('_female').checked = true;
                }
                // below we create object and store values and send this object to the server to save the history
                adminHistory = {
                    fullName: obj.fullName,
                    userName: obj.userName,
                    password:obj.password,
                    email: obj.email,
                    adminId: obj.adminId,
                    phone: obj.phone,
                    joiningDate: obj.joiningDate,
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
                        <h1 className="mr-1 mt-2" style={{ fontSize: '20px', color: '#000', fontWeight: '600' }}>Update Admin Record</h1>
                    </div>
                </div>
                <form>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="clientName" style={lableStyle}>Admin Name</label>
                            <input type="text" class="form-control" maxLength='15' style={inputStyle} id="update_admin_name" name='clienttName' onFocus={() => this.myfocus('update_admin_name')} value={this.state.admin_name} onChange={this.handleAdminName} placeholder="Client name" title='Client name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="email" style={lableStyle}>Admin Email</label>
                            <input type="text" class="form-control" style={inputStyle} id="update_admin_email" name="clientEmail" onFocus={() => this.myfocus('update_admin_email')} rows="1" value={this.state.admin_email} onChange={this.handleAdminEmail} placeholder="Client Email" />
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
                                <label for="userName" style={lableStyle}>User Name</label>
                                <input type="text" class="form-control" style={inputStyle} id="update_user_name" name='userName' onFocus={() => this.myfocus('update_user_name')} value={this.state.admin_user_name} onChange={this.handleAdminUserName} readOnly placeholder="User Name" title='User Name' />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="userName" style={lableStyle}>Password</label>
                                <input type="password" class="form-control" style={inputStyle} id="update_password" name='password' onFocus={() => this.myfocus('update_password')} value={this.state.admin_password} onChange={this.handleAdminPassword} placeholder="PAssword" title='Password' />
                                <span title='Show Password' toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={this.showPassword}></span>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert" style={{ display: 'none' }}>
                        <strong>Admin Record Updated Successfully</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={this.hideAlert}>&times;</span>
                        </button>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="clientId" style={lableStyle}>Admin ID</label>
                            <input type="text" class="form-control" style={inputStyle} id="update_admin_id" name="clientID" readOnly onFocus={() => this.myfocus('update_admin_id')} rows="1" value={this.state.admin_id} placeholder="Client ID" />

                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-4">
                            <label for="phone" style={lableStyle}>Admin Phone</label>
                            <input type="text" class="form-control" style={inputStyle} id="update_admin_phone" name='clientPhone' onFocus={() => this.myfocus('update_admin_phone')} value={this.state.admin_phone} onChange={this.handleAdminPhone} title="Client Phone" />

                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row pt-3">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="address" style={lableStyle}>Joining Date</label>
                            <input type='date' id='update_joining_date' class="form-control" name='joiningDate' value={this.state.joining_date} onChange={this.handleJoiningDate} title='Joining Date' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-4">
                            <label for="address" style={lableStyle}>Admin Address</label>
                            <textarea class="form-control" style={inputStyle} id="update_admin_address" row="1" name='clientAddress' onFocus={() => this.myfocus('update_admin_address')} value={this.state.admin_address} onChange={this.handleAdminAddress} title='Client Address' ></textarea>
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
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
                            <button class="btn" onClick={this.handleSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Update Admin</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default MyAccount;