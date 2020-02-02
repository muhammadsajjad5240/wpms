// below we import some modules for component
import React, { Component } from 'react';
import $ from 'jquery';
// import './signUp.css';
let axios = require('axios');
// below we create style for some input field
let names = [];
let verfiy = 1;
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
// below we create and export component class
export default class NewUser extends Component {
    // below we create constructor
    constructor(props) {
        super(props);
        // below we bind all the functions we create
        this.handleFullName = this.handleFullName.bind(this);
        this.handleEmployeeAddress = this.handleEmployeeAddress.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleAdminId = this.handleAdminId.bind(this);
        this.handleJoiningDate = this.handleJoiningDate.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.showPassword = this.showPassword.bind(this);
        // below we create state to handle component data
        this.state = {
            employee_names: '',
            full_name: '',
            user_name: '',
            password:'',
            email: '',
            admin_id: '',
            joining_date: '',
            phone: '',
            employee_address: '',
            gender: '',
            admin_names:[]
        }
    }
    // below we create method that will check validation and handle full name
    handleFullName = (e) => {
        this.setState({ full_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let first_name = document.getElementById('full_name').value;
        if (!letters.test(first_name)) {
            document.getElementById('full_name').style.border = '1px solid red';
            document.getElementById('namelable').innerText = 'First Name *';
            document.getElementById('namelable').style.color ='red';
        }
        else {
            document.getElementById('full_name').style.border = '1px solid grey';
            document.getElementById('namelable').innerText = 'First Name';
            document.getElementById('namelable').style.color ='#000000';
        }
    }
    // below we create method that will check validation and handle Email
    handleEmail = (e) => {
        this.setState({ email: e.target.value });
        let email = document.getElementById('_email').value;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('_email').style.border = '1px solid red';
            document.getElementById('emaillbl').innerText = 'Email *';
            document.getElementById('emaillbl').style.color ='#000000';
        }
        else {
            document.getElementById('_email').style.border = '1px solid grey';
            document.getElementById('emaillbl').innerText = 'Email';
            document.getElementById('emaillbl').style.color ='#000000';
        }
    }
    // below we create method that will check validation and handle user name
    handleUserName = (e) => {
        this.setState({ user_name: e.target.value });
        let letters = /^[a-zA-Z0-9]+$/;
        let user_name = document.getElementById('user_name').value;
        if (!letters.test(user_name)) {
            document.getElementById('user_name').style.border = '1px solid red';
            document.getElementById('userNamelable').innerText = 'User Name * (Must Unique)';
            document.getElementById('userNamelable').style.color ='#000000';
        }
        else {
            document.getElementById('user_name').style.border = '1px solid grey';
            document.getElementById('userNamelable').innerText = 'User Name'
            document.getElementById('userNamelable').style.color ='#000000';
        }
    }
    // below we create method that will check validation and handle ID
    handleAdminId = (e) => {
        this.setState({ emp_id: e.target.value });
        let letters = /^[a-zA-Z0-9]+$/;
        let empId = document.getElementById('admin_id').value;
        if (!letters.test(empId)) {
            document.getElementById('admin_id').style.border = '1px solid red';
            document.getElementById('admIdlbl').innerText = 'Admin ID *';
            document.getElementById('admIdlbl').style.color ='#000000';
        }
        else {
            document.getElementById('admin_id').style.border = '1px solid grey';
            document.getElementById('admIdlbl').innerText = 'Admin ID'
            document.getElementById('admIdlbl').style.color ='#000000';
        }
    }
    // below we create method that will check validation and handle password
    handlePassword = (e) =>{
        this.setState({ password: e.target.value });
        // let passwordPattern = /^[a-z0-9]+$/;
        // let password = document.getElementById('_password').value;
        // if (!passwordPattern.test(password)) {
        //     document.getElementById('_password').style.border = '1px solid red';
        //     document.getElementById('passwordlbl').innerText = 'Password *';
        //     document.getElementById('passwordlbl').style.color ='#000000';
        // }
        // else {
        //     document.getElementById('_password').style.border = '1px solid grey';
        //     document.getElementById('passwordlbl').innerText = 'Password';
        //     document.getElementById('passwordlbl').style.color ='#000000';
        // }
    }
    // below we create method that will check validation and handle joining Date
    handleJoiningDate = (e) => {
        this.setState({ joining_date: e.target.value });
        let n = new Date();
        let joinigDate = new Date(document.getElementById('joining_date').value);
        if (joinigDate.length === "" || joinigDate.getTime() > n.getTime()) {
            document.getElementById('joining_date').style.border = '1px solid red';
            document.getElementById('joinlbl').innerText = 'Joining Date *';
            document.getElementById('joinlbl').style.color ='#000000';
        }
        else {
            document.getElementById('joining_date').style.border = '1px solid grey';
            document.getElementById('joinlbl').innerText = 'Joining Date';
            document.getElementById('joinlbl').style.color ='#000000';
        }
    }
    // below we create method that will check validation and handle phone no
    handlePhone = (e) => {
        this.setState({ phone: e.target.value });
        let letters = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let phone = document.getElementById('_phone').value;
        if (!letters.test(phone)) {
            document.getElementById('_phone').style.border = '1px solid red';
            document.getElementById('phonelbl').innerText = 'Phone *';
            document.getElementById('phonelbl').style.color ='#000000';
        }
        else {
            document.getElementById('_phone').style.border = '1px solid grey';
            document.getElementById('phonelbl').innerText = 'Phone';
            document.getElementById('phonelbl').style.color ='#000000';
        }
    }
    // below we create method that will check validation and handle address
    handleEmployeeAddress = (e) => {
        this.setState({ employee_address: e.target.value });
        let address = document.getElementById('employee_address').value;
        if (address === "") {
            document.getElementById('employee_address').style.border = '1px solid red';
            document.getElementById('addresslbl').innerText = 'Employee Address *'
            document.getElementById('addresslbl').style.color ='#000000';
        }
        else {
            document.getElementById('employee_address').style.border = '1px solid grey';
            document.getElementById('addresslbl').innerText = 'Employee Address';
            document.getElementById('addresslbl').style.color ='#000000';
        }
    }
    // below we create method that will check validation and handle gender
    handleGender = (e) => {
        this.setState({ gender: e.target.value });
    }
    // below we create method that will check validation and submit data to database
    handleSubmit = (e) => {
        // below we prevent form to reload
        e.preventDefault();
        let full_name = document.getElementById('full_name').value;
        let user_name = document.getElementById('user_name').value;
        let email = document.getElementById('_email').value;
        let joinigDate = document.getElementById('joining_date').value;
        let phone = document.getElementById('_phone').value;
        let address = document.getElementById('employee_address').value;
        let password = document.getElementById('_password').value;
        let fullNamePattern = /^[a-zA-Z ]+$/;
        let userNamePattern = /^[a-z0-9]+$/;
        let passwordPattern = /^[a-z0-9]+$/;
        let PhonePattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let n = new Date();
        let names = this.state.admin_names;
        for (let i = 0; i < names.length; i++) {
            if (user_name === names[i].userName) {
                verfiy = 0;
                // alert('Name Match');
            }
            else {
                // alert(names[i].userName + " " + full_name);
                verfiy = 1;
            }
        }
        // alert('Hi');
        if (!fullNamePattern.test(full_name)) {
            document.getElementById('full_name').style.border = '1px solid red';
            document.getElementById('namelable').innerText = 'Full Name Unique *';
            document.getElementById('namelable').style.color = 'red';
        }
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('_email').style.border = '1px solid red';
            document.getElementById('emaillbl').innerText = 'Email *'
            document.getElementById('emaillbl').style.color = 'red';
        }
        else if (!userNamePattern.test(user_name) || verfiy === 0 || (fullNamePattern.test(user_name) && verfiy === 0)) {
            document.getElementById('user_name').style.border = '1px solid red';
            document.getElementById('userNamelable').style.color = 'red';
            document.getElementById('userNamelable').innerText = 'User Name * (Must Unique)';
        }
        else if (verfiy === 0) {
            document.getElementById('user_name').style.border = '1px solid red';
            document.getElementById('userNamelable').style.color = 'red';
            document.getElementById('userNamelable').innerText = 'User Name * (Must Unique)';
        }
        // else if (!userNamePattern.test(password)) {
        //     document.getElementById('_password').style.border = '1px solid red';
        //     document.getElementById('passwordlbl').innerText = 'Password *'
        //     document.getElementById('passwordlbl').style.color = 'red';
        // }
        else if (joinigDate === "" ) {
            document.getElementById('joining_date').style.border = '1px solid red';
            document.getElementById('joinlbl').innerText = 'Joining Date * *'
            document.getElementById('joinlbl').style.color = 'red';
        }
        else if (!PhonePattern.test(phone)) {
            document.getElementById('_phone').style.border = '1px solid red';
            document.getElementById('phonelbl').innerText = 'Phone *'
            document.getElementById('phonelbl').style.color = 'red';
        }
        else if (address === "") {
            document.getElementById('employee_address').style.border = '1px solid red';
            document.getElementById('addresslbl').innerText = 'Employee Address *'
            document.getElementById('addresslbl').style.color = 'red';
        }
        else if (this.state.gender === "") {
            document.getElementById('genderErr').style.display = 'block';
        }
        else {
            let newAdmin = {
                fullName: this.state.full_name,
                userName:this.state.user_name,
                password: this.state.password,
                email: this.state.email,
                adminId: this.state.admin_id,
                joiningDate: this.state.joining_date,
                phone: this.state.phone,
                address: this.state.employee_address,
                gender: this.state.gender
            }
            // below we send request to the server to store data in database
            axios.post('/Admin/addAdmin', newAdmin)
                .then(res => {
                    console.log(res.data)
                    let a = res.statusText;
                    // if data store then we will display the alert
                    if (a === "OK") {
                        // document.getElementById('success_alert').style.display = 'block';
                    }
                })
                // below we set state to empty
            this.setState({
                full_name: '',
                email: '',
                user_name:'',
                password:'',
                admin_id: '',
                employee_address: '',
                joining_date: '',
                phone: '',
                employee_address:'',
            })
            sessionStorage.clear();
            window.location.reload();
        }
    }
    // below we create method that will call when the component will load
    componentDidMount = () => {
        let length = 6;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        this.setState({ admin_id: text });
        axios.post('/Admin/getAdminNames')
        .then(res => {
            this.setState({ admin_names: res.data });
        });
    }
    // below we create method that will call when the user will focues on input field
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid grey";
    }
    // below we create method that will call when the user will hide the alert
    hideAlert = () => {
        window.location.replace('/dashboard/employees');
    }
    showPassword = (e) => {
        e.preventDefault();
        // let pwd = document.getElementById('_password');        
        let password = document.getElementById('_password');
        if (password.type === "text") {
            password.type = "password";
        }
        else {
            password.type = "text";
        }
    }
    // below is our main render method
    render() {
        return (
            <div id='add_employee'>
                <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert" style={{ display: 'none' }}>
                    <strong>New Employee Add Successfully</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" onClick={this.hideAlert}>&times;</span>
                    </button>
                </div>
                <form id='add_emp_form'>
                    <h2 className='text-center'>Sign Up</h2>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="fullName" style={lableStyle} id="namelable">First Name</label>
                            <input type="text" class="form-control" id="full_name" style={inputStyle} name='fullName' onFocus={() => this.myfocus('full_name')} value={this.state.full_name} onChange={this.handleFullName} placeholder="Full name" title='Full name' />
                            <div class="valid-feedback">
                                Looks good!
                             </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="email" style={lableStyle} id="emaillbl">Email</label>
                            <input type="text" class="form-control" id="_email" style={inputStyle} name='email' onFocus={() => this.myfocus('_email')} value={this.state.handleEmail} onChange={this.handleEmail} placeholder="Email" title='Eamil' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="userName" style={lableStyle} id="userNamelable">User Name</label>
                            <input type="text" class="form-control" id="user_name" style={inputStyle} name='fullName' onFocus={() => this.myfocus('user_name')} value={this.state.user_name} onChange={this.handleUserName} placeholder="User name" title='User name' />
                            <div class="valid-feedback">
                                Looks good!
                             </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="password" style={lableStyle} id="passwordlbl">Password</label>
                            <input type="password" class="form-control" id="_password" style={inputStyle} name='password' onFocus={() => this.myfocus('_password')} value={this.state.password} onChange={this.handlePassword} placeholder="Password" title='Password' />
                            <span title='Show Password' toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={this.showPassword}></span>                            
                            <div class="valid-feedback">
                                Looks good!
                             </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="adminId" style={lableStyle} id="admIdlbl">Admin ID</label>
                            <input type="text" class="form-control" id="admin_id" style={inputStyle} name='adminId' onFocus={() => this.myfocus('admin_id')} value={this.state.admin_id} onChange={this.handleAdminId} readOnly placeholder="Admin ID" title='Admin ID' />
                            <div class="valid-feedback">
                                Looks good!
                             </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="joiningDate" style={lableStyle} id="joinlbl">Joining Date</label>
                            <input type="date" class="form-control" id="joining_date" style={inputStyle} name='joiningDate' onFocus={() => this.myfocus('joining_date')} value={this.state.joining_date} onChange={this.handleJoiningDate} title="Joining Date" />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row mb-3">
                        <div class="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="phone" style={lableStyle} id="phonelbl">Phone</label>
                            <input type="text" class="form-control" id="_phone" style={inputStyle} name='phone' onFocus={() => this.myfocus('_phone')} value={this.state.phone} onChange={this.handlePhone} placeholder="Phone No" title='Phone No' />
                            <div class="valid-feedback">
                                Looks good!
                             </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="address" style={lableStyle} id="addresslbl">Employee Address</label>
                            <textarea class="form-control" id="employee_address" style={inputStyle} name='employeeAddress' onFocus={() => this.myfocus('employee_address')} value={this.state.employee_address} onChange={this.handleEmployeeAddress} title='Employee Address' placeholder="Address"></textarea>
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
                                <input class="form-check-input" type="radio" style={radioInputStyle} name="gender" id="_male" value="male" checked={this.state.gender === 'male'} onChange={this.handleGender} />
                                <label class="form-check-label" for="male" style={lableStyle} >Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={radioInputStyle} name="gender" id="_female" value="female" checked={this.state.gender === 'female'} onChange={this.handleGender} />
                                <label class="form-check-label" for="female" style={lableStyle} >Female</label>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                        <div class="col-md-6 mb-3">
                            <label for="exampleFormControlTextarea1" style={lableStyle} style={{ color: 'red', display: 'none' }} id="genderErr">Please Select Gender</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 offset-sm-5'>
                            <button class="btn" onClick={this.handleSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};