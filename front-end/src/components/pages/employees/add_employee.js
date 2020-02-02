// below we import modules for component
import React, { Component } from 'react';
import './add_employee.css';
let axios = require('axios');
// below we create css for form fields
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
// below we create component class
class AddEmployee extends Component {
    // below we create constructor
    constructor(props) {
        super(props);
        // below we bind all the methods that we create
        this.handleEmpFullName = this.handleEmpFullName.bind(this);
        this.handleEmpAddress = this.handleEmpAddress.bind(this);
        this.handleEmpEmail = this.handleEmpEmail.bind(this);
        this.handleEmpId = this.handleEmpId.bind(this);
        this.handleEmpJoiningDate = this.handleEmpJoiningDate.bind(this);
        this.handleEmpPhone = this.handleEmpPhone.bind(this);
        this.handleEmpDepartment = this.handleEmpDepartment.bind(this);
        this.handleEmpDesignation = this.handleEmpDesignation.bind(this);
        this.handleEmpSubmit = this.handleEmpSubmit.bind(this);
        // below we create state to store the component values
        this.state = {
            employee_names: '',
            add_full_name: '',
            add_email: '',
            add_emp_id: '',
            add_joining_date: '',
            add_phone: '',
            add_employee_address: '',
            add_department: '',
            add_designation: '',
            add_gender: '',
        }
    }
    // below we create method to check validation and handle full Name
    handleEmpFullName = (e) => {
        this.setState({ add_full_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let first_name = document.getElementById('add_emp_full_name').value;
        if (!letters.test(first_name)) {
            document.getElementById('add_emp_full_name').style.border = '1px solid red';
            document.getElementById('add_emp_namelable').style.color = 'red';
            document.getElementById('add_emp_namelable').innerText = 'First Name *';
        }
        else {
            document.getElementById('full_name').style.border = '1px solid grey';
            document.getElementById('add_emp_namelable').style.color = '#000000';
            document.getElementById('add_emp_namelable').innerText = 'First Name';
        }
    }
    // below we create method to check validation and handle Email
    handleEmpEmail = (e) => {
        this.setState({ add_email: e.target.value });
        let email = document.getElementById('add_emp_email').value;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('add_emp_email').style.border = '1px solid red';
            document.getElementById('add_emp_emaillbl').style.color = 'red';
            document.getElementById('add_emp_emaillbl').innerText = 'Email *';
        }
        else {
            document.getElementById('add_emp_email').style.border = '1px solid grey';
            document.getElementById('add_emp_emaillbl').style.color = '#000000';
            document.getElementById('add_emp_emaillbl').innerText = 'Email';
        }
    }
    // below we create method to check validation and handle Employee Id
    handleEmpId = (e) => {
        this.setState({ add_emp_id: e.target.value });
        let letters = /^[a-zA-Z0-9]+$/;
        let empId = document.getElementById('add_emp_emp_id').value;
        if (!letters.test(empId)) {
            document.getElementById('add_emp_emp_id').style.border = '1px solid red';
            document.getElementById('add_emp_empIdlbl').style.color = 'red';
            document.getElementById('add_emp_empIdlbl').innerText = 'Employee ID *';
        }
        else {
            document.getElementById('add_emp_emp_id').style.border = '1px solid grey';
            document.getElementById('add_emp_emaillbl').style.color = '#000000';
            document.getElementById('add_emp_emaillbl').innerText = 'Employee ID';
        }
    }
    // below we create method to check validation and handle Joining Data
    handleEmpJoiningDate = (e) => {
        this.setState({ add_joining_date: e.target.value });
        let n = new Date();
        let joinigDate = new Date(document.getElementById('add_emp_joining_date').value);
        if (joinigDate.length === "") {
            document.getElementById('add_emp_joining_date').style.border = '1px solid red';
            document.getElementById('add_emp_joinlbl').style.color = 'red';
            document.getElementById('add_emp_joinlbl').innerText = 'Joining Date *';
        }
        else {
            document.getElementById('add_emp_joining_date').style.border = '1px solid grey';
            document.getElementById('add_emp_joinlbl').style.color = '#000000';
            document.getElementById('add_emp_joinlbl').innerText = 'Joining Date';
        }
    }
    // below we create method to check validation and handle Phone No
    handleEmpPhone = (e) => {
        this.setState({ add_phone: e.target.value });
        // let letters = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        let letters = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let phone = document.getElementById('add_emp_phone').value;
        if (!letters.test(phone)) {
            document.getElementById('add_emp_phone').style.border = '1px solid red';
            document.getElementById('add_emp_phonelbl').style.color = 'red';
            document.getElementById('add_emp_phonelbl').innerText = 'Phone *';
        }
        else {
            document.getElementById('add_emp_phone').style.border = '1px solid grey';
            document.getElementById('add_emp_phonelbl').style.color = '#000000';
            document.getElementById('add_emp_phonelbl').innerText = 'Phone';
        }
    }
    // below we create method to check validation and handle Address
    handleEmpAddress = (e) => {
        this.setState({ add_employee_address: e.target.value });
        let address = document.getElementById('add_emp_address').value;
        if (address === "") {
            document.getElementById('add_emp_address').style.border = '1px solid red';
            document.getElementById('add_empaddresslbl').style.color = 'red';
            document.getElementById('add_empaddresslbl').innerText = 'Employee Address *';
        }
        else {
            document.getElementById('add_emp_address').style.border = '1px solid grey';
            document.getElementById('add_emp_addresslbl').style.color = '#000000';
            document.getElementById('add_emp_addresslbl').innerText = 'Employee Address';
        }
    }
    // below we create method to check validation and handle Department
    handleEmpDepartment = (e) => {
        this.setState({ add_department: e.target.value });
        let department = document.getElementById('add_emp_department').value;
        if (department === 'Development') {
            document.getElementById('development_deis').style.display = 'block'
            document.getElementById('seo_deis').style.display = 'none'
            document.getElementById('designing_deis').style.display = 'none'
            document.getElementById('marketing_deis').style.display = 'none'
        }
        else if (department === 'SEO') {
            document.getElementById('development_deis').style.display = 'none'
            document.getElementById('seo_deis').style.display = 'block'
            document.getElementById('designing_deis').style.display = 'none'
            document.getElementById('marketing_deis').style.display = 'none'
        }
        else if (department === 'Designing') {
            document.getElementById('development_deis').style.display = 'none'
            document.getElementById('seo_deis').style.display = 'none'
            document.getElementById('designing_deis').style.display = 'block'
            document.getElementById('marketing_deis').style.display = 'none'
        }
        else if (department === 'Marketing') {
            document.getElementById('development_deis').style.display = 'none'
            document.getElementById('seo_deis').style.display = 'none'
            document.getElementById('designing_deis').style.display = 'none'
            document.getElementById('marketing_deis').style.display = 'block'
        }
    }
    // below we create method to check validation and handle Designation
    handleEmpDesignation = (e) => {
        this.setState({ add_designation: e.target.value });
        let department = document.getElementById('add_emp_department').value;
        let designation;
        if (department === 'Development') {
            designation = document.getElementById('add_emp_development_designation').value;
        }
        else if (department === 'SEO') {
            designation = document.getElementById('add_emp_seo_designation').value;
        }
        else if (department === 'Designing') {
            designation = document.getElementById('add_emp_designer_designation').value;
        }
        else if (department === 'Marketing') {
            designation = document.getElementById('add_emp_marketing_designation').value;
        }
        if (designation === 'Select Designation') {
            // document.getElementById('_designation').style.border = '1px solid red';
            document.getElementById('add_emp_development_designation').style.border = '1px solid red';
            document.getElementById('add_emp_seo_designation').style.border = '1px solid red';
            document.getElementById('add_emp_designer_designation').style.border = '1px solid red';
            document.getElementById('add_emp_marketing_designation').style.border = '1px solid red';
        }
        else {
            document.getElementById('add_emp_development_designation').style.border = '1px solid grey';
            document.getElementById('add_emp_seo_designation').style.border = '1px solid grey';
            document.getElementById('add_emp_designer_designation').style.border = '1px solid grey';
            document.getElementById('add_emp_marketing_designation').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation and handle Gender
    handleGender = (e) => {
        this.setState({ add_gender: e.target.value });
    }
    // below we create method to check validation and submit form
    handleEmpSubmit = (e) => {
        // below we prevent form to reloaf
        e.preventDefault();
        let full_name = document.getElementById('add_emp_full_name').value;
        let email = document.getElementById('add_emp_email').value;
        let joinigDate = document.getElementById('add_emp_joining_date').value;
        let phone = document.getElementById('add_emp_phone').value;
        let address = document.getElementById('add_emp_address').value;
        let department = document.getElementById('add_emp_department').value;
        let designation;
        if (department === "Development") {
            designation = document.getElementById('add_emp_development_designation').value;
        }
        if (department === "Marketing") {
            designation = document.getElementById('add_emp_marketing_designation').value;
        }
        if (department === "SEO") {
            designation = document.getElementById('add_emp_seo_designation').value;
        }
        if (department === "Designing") {
            designation = document.getElementById('add_emp_designer_designation').value;
        }
        let fullNamePattern = /^[a-zA-Z ]+$/;
        let PhonePattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let n = new Date();
        if (!fullNamePattern.test(full_name)) {
            document.getElementById('add_emp_full_name').style.border = '1px solid red';
            document.getElementById('add_emp_namelable').innerText = 'Full Name (Please Enter Unique Name)';
            document.getElementById('add_emp_namelable').style.color = 'red'
        }
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('add_emp_email').style.border = '1px solid red';
            document.getElementById('add_emp_emaillbl').innerText = 'Email *'
            document.getElementById('add_emp_emaillbl').style.color = 'red';
        }
        else if (!PhonePattern.test(phone)) {
            document.getElementById('add_emp_phone').style.border = '1px solid red';
            document.getElementById('add_emp_phonelbl').innerText = 'Phone *'
            document.getElementById('add_emp_phonelbl').style.color = 'red';
        }
        else if (joinigDate === ""){
            document.getElementById('add_emp_joining_date').style.border = '1px solid red';
            document.getElementById('add_emp_joinlbl').innerText = 'Joining Date *';
            document.getElementById('add_emp_joinlbl').style.color = 'red';
        }
        else if (address === "") {
            document.getElementById('add_emp_address').style.border = '1px solid red';
            document.getElementById('add_emp_addresslbl').innerText = 'Employee Address *'
            document.getElementById('add_emp_addresslbl').style.color = 'red';
        }
        else if (department === 'Select Department') {
            document.getElementById('add_emp_department').style.border = '1px solid red';
            document.getElementById('add_emp_deaprtlbl').innerText = 'Department *'
            document.getElementById('add_emp_deaprtlbl').style.color = 'red';
        }
        else if (designation === "Select Designation") {
            document.getElementById('add_emp_desgilbl').style.border = '1px solid red';
            document.getElementById('add_emp_desgilbl').innerText = 'Designation *'
            document.getElementById('add_emp_desgilbl').style.color = 'red';
        }
        else if (this.state.add_gender === "") {
            document.getElementById('genderErr').style.display = 'block';
        }
        else {
            let newEmployee = {
                fullName: this.state.add_full_name,
                email: this.state.add_email,
                empId: this.state.add_emp_id,
                joiningDate: this.state.add_joining_date,
                phone: this.state.add_phone,
                address: this.state.add_employee_address,
                department: this.state.add_department,
                designation: this.state.add_designation,
                gender: this.state.add_gender
            }
            console.log(this.state.add_designation);
            // below we send requet to the server to submit form
            axios.post('/Employee/addEmployee', newEmployee)
                .then(res => {
                    let a = res.statusText;
                    if (a === "OK") {
                        window.location.replace('/dashboard/employees');
                        // document.getElementById('success_alert').style.display = 'block';
                    }
                })
            this.setState({
                add_full_name: '',
                add_email: '',
                add_emp_id: '',
                add_employee_address: '',
                add_joining_date: '',
                add_phone: '',
                add_department: '',
                add_designation: ''
            })
        }
    }
    // below we create method that will call when the user focus on the input field
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid grey";
    }
    // below we create method that will call when the alert hide
    hideAlert = () => {
        window.location.replace('/dashboard/employees');
    }
    // below we create method that will call when the component load
    componentDidMount = () => {
        let length = 6;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        this.setState({ add_emp_id: text });
    }
    // below is out main render method
    render() {
        return (
            <div id='add_employee'>
                <form id='add_emp_form'>
                    <div class="form-row">
                        <div class="col-md-12 mb-3">
                            <label for="fullName" style={lableStyle} id="add_emp_namelable">First Name</label>
                            <input type="text" class="form-control" maxLength='18' id="add_emp_full_name" style={inputStyle} name='fullName' onFocus={() => this.myfocus('add_emp_full_name')} value={this.state.add_full_name} onChange={this.handleEmpFullName} placeholder="Full name" title='Full name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="email" style={lableStyle} id="add_emp_emaillbl">Email</label>
                            <input type="text" class="form-control" maxLength='25' id="add_emp_email" style={inputStyle} name='email' onFocus={() => this.myfocus('add_emp_email')} value={this.state.add_email} onChange={this.handleEmpEmail} placeholder="Email" title='Eamil' />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="phone" style={lableStyle} id="add_emp_phonelbl">Phone</label>
                            <input type="text" class="form-control" id="add_emp_phone" style={inputStyle} name='phone' onFocus={() => this.myfocus('add_emp_phone')} value={this.state.add_phone} onChange={this.handleEmpPhone} placeholder="Phone No" title='Phone No' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="employeeId" style={lableStyle} id="add_emp_empIdlbl">Employee ID</label>
                            <input type="text" class="form-control" id="add_emp_id" style={inputStyle} name='empId' onFocus={() => this.myfocus('add_emp_id')} value={this.state.add_emp_id} onChange={this.handleEmpId} readOnly placeholder="Employee ID" title='Employee ID' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="joiningDate" style={lableStyle} id="add_emp_joinlbl">Joining Date</label>
                            <input type="date" class="form-control" id="add_emp_joining_date" style={inputStyle} name='joiningDate' onFocus={() => this.myfocus('add_emp_joining_date')} value={this.state.add_joining_date} onChange={this.handleEmpJoiningDate} title="Joining Date" />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                    </div>
                    <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert" style={{ display: 'none' }}>
                        <strong>New Employee Add Successfully</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={this.hideAlert}>&times;</span>
                        </button>
                    </div>
                    <div class="form-row mb-3">
                        <label for="address" style={lableStyle} id="add_emp_addresslbl">Employee Address</label>
                        <textarea class="form-control" id="add_emp_address" style={inputStyle} name='employeeAddress' onFocus={() => this.myfocus('add_emp_address')} value={this.state.add_employee_address} onChange={this.handleEmpAddress} title='Employee Address' ></textarea>
                        <div class="valid-feedback">
                            Looks good!
                                 </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="department" style={lableStyle} id="add_emp_deaprtlbl">Department</label>
                            <select class="form-control" id="add_emp_department" style={inputStyle} name='department' onFocus={() => this.myfocus('add_emp_department')} value={this.state.add_department} onChange={this.handleEmpDepartment} title='Select Department'>
                                <option value='Select Department' selected>Select Department</option>
                                <option value='Development'>Development</option>
                                <option value='SEO'>SEO</option>
                                <option value='Designing'>Designing</option>
                                <option value='Marketing'>Marketing</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-6 mb-3" id='development_deis' style={{ display: 'none' }}>
                            <label for="designation" style={lableStyle} id="add_emp_desgilbl">Designation</label>
                            <select class="form-control" id="add_emp_development_designation" style={inputStyle} name='designation' onFocus={() => this.myfocus('add_emp_development_deis')} value={this.state.add_designation} onChange={this.handleEmpDesignation} title='Select Designation' >
                                <option value='Select Designation' selected>Select Designation</option>
                                <option value='Web Development'>Web Development</option>
                                <option value='. Net Developer'>. Net Developer</option>
                                <option value='WordPress Developer'>WordPress Developer</option>
                                <option value='Android Developer'>Android Developer</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-6 mb-3" id='seo_deis' style={{ display: 'none' }}>
                            <label for="designation" style={lableStyle} id="add_emp_desgilbl">Designation</label>
                            <select class="form-control" id="add_emp_seo_designation" style={inputStyle} name='designation' onFocus={() => this.myfocus('add_emp_seo_designation')} value={this.state.add_designation} onChange={this.handleEmpDesignation} title='Select Designation' >
                                <option value='Select Designation' selected>Select Designation</option>
                                <option value='SEO Analyst'>SEO Analyst</option>
                                <option value='SEO Consultant'>SEO Consultant</option>
                                <option value='SEO Project Manager'>SEO Project Manager</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-6 mb-3" id='designing_deis' style={{ display: 'none' }}>
                            <label for="designation" style={lableStyle} id="add_emp_desgilbl">Designation</label>
                            <select class="form-control" id="add_emp_designer_designation" style={inputStyle} name='designation' onFocus={() => this.myfocus('add_emp_designer_designation')} value={this.state.add_designation} onChange={this.handleEmpDesignation} title='Select Designation' >
                                <option value='Select Designation' selected>Select Designation</option>
                                <option value='Web Designer'>Web Designer</option>
                                <option value='Graphic Designer'>Graphic Designer</option>
                                <option value='UI/UX Designer'>UI/UX Designer</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-6 mb-3" id='marketing_deis' style={{ display: 'none' }}>
                            <label for="designation" style={lableStyle} id="add_emp_desgilbl">Designation</label>
                            <select class="form-control" id="add_emp_marketing_designation" style={inputStyle} name='designation' onFocus={() => this.myfocus('add_emp_marketing_designation')} value={this.state.add_designation} onChange={this.handleEmpDesignation} title='Select Designation' >
                                <option value='Select Designation' selected>Select Designation</option>
                                <option value='Content Marketing Manager'>Content Marketing Manager</option>
                                <option value='Digital Marketing Manager'>Digital Marketing Manager</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="exampleFormControlTextarea1" style={lableStyle}>Gender:</label>
                            <div class="form-check form-check-inline ml-3">
                                <input class="form-check-input" type="radio" style={radioInputStyle} name="gender" id="add_emp_male" value="male" checked={this.state.add_gender === 'male'} onChange={this.handleGender} />
                                <label class="form-check-label" for="male" style={lableStyle} >Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={radioInputStyle} name="gender" id="add_emp_female" value="female" checked={this.state.add_gender === 'female'} onChange={this.handleGender} />
                                <label class="form-check-label" for="female" style={lableStyle} >Female</label>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="exampleFormControlTextarea1" style={lableStyle} style={{ color: 'red', display: 'none' }} id="genderErr">Please Select Gender</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 offset-sm-4 mr-4'>
                            <button class="btn" onClick={this.handleEmpSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Add Employee</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default AddEmployee;