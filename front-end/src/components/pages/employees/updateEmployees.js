// below we import modules and import some global variables for component
import React, { Component } from 'react';
import './add_employee.css';
import $ from 'jquery';
let axios = require('axios');
let obj, employeeHistory;
// below we create css for some components
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
class UpdateEmployee extends Component {
    // below we create constructor
    constructor(props) {
        super(props);
        // below we bind all the function 
        this.handleEmployeeName = this.handleEmployeeName.bind(this);
        this.handleEmployeeEmail = this.handleEmployeeEmail.bind(this);
        this.handleEmployeePhone = this.handleEmployeePhone.bind(this);
        this.handleGender = this.handleGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // below we create state to handle component data
        this.state = {
            clients: [],
            employee_name: '',
            employee_email: '',
            employee_id: '',
            employee_phone: '',
            employee_joining_date: '',
            employee_address: '',
            employee_department: '',
            employee_designation: '',
            employee_gender: '',
        }
    }
    // below we create method to check validation and handle employee name
    handleEmployeeName = (e) => {
        this.setState({ employee_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let full_name = document.getElementById('employee_name').value;
        if (!letters.test(full_name)) {
            document.getElementById('employee_name').style.border = '1px solid red';
            document.getElementById('empName').innerText = 'Employee Name *';
            document.getElementById('empName').style.color = 'red';
        }
        else {
            document.getElementById('employee_name').style.border = '1px solid grey';
            document.getElementById('empName').innerText = 'Employee Name';
            document.getElementById('empName').style.color = '#000000';
        }
    }
    // below we create method to check valiation and handle employee name
    handleEmployeeEmail = (e) => {
        this.setState({ employee_email: e.target.value });
        let email = document.getElementById('employee_email').value;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('employee_email').style.border = '1px solid red';
            document.getElementById('empEmail').innerText = 'Employee Email *';
            document.getElementById('empEmail').style.color = 'red';
        }
        else {
            document.getElementById('employee_email').style.border = '1px solid grey';
            document.getElementById('empEmail').innerText = 'Employee Email';
            document.getElementById('empEmail').style.color = '#000000';
        }
    }
    // below we create method to check validation and handle employee phone no
    handleEmployeePhone = (e) => {
        this.setState({ employee_phone: e.target.value });
        let letters = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        let phone = document.getElementById('employee_phone').value;
        if (!letters.test(phone)) {
            document.getElementById('employee_phone').style.border = '1px solid red';
            document.getElementById('empPhone').innerText = 'Employee Phone *';
            document.getElementById('empPhone').style.color = 'red';
        }
        else {
            document.getElementById('employee_phone').style.border = '1px solid grey';
            document.getElementById('empPhone').innerText = 'Employee Phone';
            document.getElementById('empPhone').style.color = '#000000';
        }
    }
    // below we create method to check validatio and handle employee Address
    handleEmployeeAddress = (e) => {
        this.setState({ employee_address: e.target.value });
        let address = document.getElementById('update_employee_address').value;
        if (address === "") {
            document.getElementById('update_employee_address').style.border = '1px solid red';
            document.getElementById('empAddress').innerText = 'Employee Address *';
            document.getElementById('empAddress').style.color = 'red';
        }
        else {
            document.getElementById('update_employee_address').style.border = '1px solid grey';
            document.getElementById('empAddress').innerText = 'Employee Address';
            document.getElementById('empAddress').style.color = '#000000';
        }
    }
    // below we create method to chekc validation and handle employee joining date
    handleJoiningDate = (e) => {
        this.setState({ employee_joining_date: e.target.value });
        let joinigDate = document.getElementById('update_joining_date').value;
        if (joinigDate.length === "") {
            document.getElementById('update_joining_date').style.border = '1px solid red';
            document.getElementById('empDate').innerText = 'Joining Date *';
            document.getElementById('empDate').style.color = 'red';
        }
        else {
            document.getElementById('update_joining_date').style.border = '1px solid grey';
            document.getElementById('empDate').innerText = 'Joining Date';
            document.getElementById('empDate').style.color = '#000000';
        }
    }
    // below we create method to check validation and handle department
    handleDepartment = (e) => {
        this.setState({ employee_department: e.target.value });
        let department = document.getElementById('_department').value;
        if (department === 'Select Department') {
            document.getElementById('empDepart').innerText = 'Select Department *';
            document.getElementById('empDepart').style.color = 'red';
        }
        else {
            document.getElementById('joining_date').style.border = '1px solid grey';
            document.getElementById('empDepart').innerText = 'Select Department';
            document.getElementById('empDepart').style.color = '#000000';
        }
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
    // below we create method to chekc valdation and handle emplloyee desigantion
    handleDesignation = (e) => {
        this.setState({ employee_designation: e.target.value });
        // let designation = document.getElementById('_designation').value;
        // if (designation === 'Select Designation') {
        //     document.getElementById('_designation').style.border = '1px solid red';
        // }
        // else {
        //     document.getElementById('_designation').style.border = '1px solid grey';
        // }
    }
    // below we create method to handle gender
    handleGender = (e) => {
        this.setState({ employee_gender: e.target.value });
    }
    // below we create method to check validation and submit data to database
    handleSubmit = (e) => {
        // below we prevent form to reload
        e.preventDefault();
        let full_name = document.getElementById('employee_name').value;
        let email = document.getElementById('employee_email').value;
        let clientId = document.getElementById('employee_id').value;
        let phone = document.getElementById('employee_phone').value;
        let address = document.getElementById('update_employee_address').value;
        let joinigDate = document.getElementById('update_joining_date').value;
        let department = document.getElementById('_department').value;
        let designation;
        if (department === "Development") {
            designation = document.getElementById('development_designation').value;
        }
        if (department === "Marketing") {
            designation = document.getElementById('marketing_designation').value;
        }
        if (department === "SEO") {
            designation = document.getElementById('seo_designation').value;
        }
        if (department === "Designing") {
            designation = document.getElementById('designer_designation').value;
        }
        let fullNamePattern = /^[a-zA-Z ]+$/;
        let PhonePattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        if (!fullNamePattern.test(full_name)) {
            document.getElementById('employee_name').style.border = '1px solid red';
            document.getElementById('empName').innerText = 'Employee Name *';
            document.getElementById('empName').style.color = 'red';
        }
        else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            document.getElementById('employee_email').style.border = '1px solid red';
            document.getElementById('empEmail').innerText = 'Employee Email *';
            document.getElementById('empEmail').style.color = 'red';
        }
        else if (!PhonePattern.test(phone)) {
            document.getElementById('employee_phone').style.border = '1px solid red';
            document.getElementById('empPhone').innerText = 'Employee Phone *';
            document.getElementById('empPhone').style.color = 'red';
        }
        else if (joinigDate === "") {
            document.getElementById('update_joining_date').style.border = '1px solid red';
            document.getElementById('empDate').innerText = 'Joining Date *';
            document.getElementById('empDate').style.color = 'red';
        }
        else if (department === 'Select Department') {
            document.getElementById('_department').style.border = '1px solid red';
            document.getElementById('empDepart').innerText = 'Select Department *';
            document.getElementById('empDepart').style.color = 'red';
        }
        else if (designation === 'Select Designation') {
            document.getElementById('empDesination').innerText = 'Designation *';
            document.getElementById('empDesination').style.color = 'red';
        }
        else if (address === "") {
            alert(document.getElementById('update_employee_address').value);
            document.getElementById('update_employee_address').style.border = '1px solid red';
            document.getElementById('empAddress').innerText = 'Employee Address *';
            document.getElementById('empAddress').style.color = 'red';
        }
        else if (this.state.employee_gender === ""){
            document.getElementById('EmpGender').innerText = 'Gender *'
            document.getElementById('EmpGender').style.color = 'red';
        }
        else {
            // below we send request to the server to update the record
            axios.post('/Employee/updateEmployee', {
                id: this.state.employee_id,
                fullName: this.state.employee_name,
                email: this.state.employee_email,
                empId: this.state.employee_id,
                phone: this.state.employee_phone,
                address: this.state.employee_address,
                joiningDate: this.state.employee_joining_date,
                department: this.state.employee_department,
                designation: this.state.employee_designation,
                company: this.state.employee_address,
                gender: this.state.employee_gender
            })
                .then(res => {
                    let a = res.statusText;
                    if (a === "OK") {
                        // below we send request to the erver to add previouse employee history
                        axios.post('/Employee/addEmployeeHistory', employeeHistory)
                        document.getElementById('success_alert').style.display = 'block';
                    }
                }
                )
            // below we set states to empty
            this.setState({
                employee_name: '',
                employee_email: '',
                client_id: '',
                employee_phone: '',
                employee_address: '',
            })
            // below we redirect to new url after update the record
            window.location.replace('/dashboard/employees');
        }
    }
    // below we create a method that will call when the use foucs on the input field
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid #e3e3e3";
    }
    // below we create method that will call when the component will load
    componentDidMount = () => {
        // below we send request to server to send specific data 
        axios.post('/Employee/getEmployeeDataForUpdate', {})
            .then(res => {
                // below we set state with data which is comming from the server
                this.setState({ clients: res.data })
                for (let i in this.state.clients) {
                    obj = this.state.clients[i];
                };
                this.setState({ employee_name: obj.fullName })
                this.setState({ employee_email: obj.email })
                this.setState({ employee_id: obj.empId })
                this.setState({ employee_phone: obj.phone })
                this.setState({ employee_joining_date: obj.joiningDate })
                this.setState({ employee_address: obj.address })
                this.setState({ employee_department: obj.department })
                let department = document.getElementById('_department').value;
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
                this.setState({ employee_designation: obj.designation })
                this.setState({ employee_gender: obj.gender });
                if (this.state.employee_gender === "male") {
                    document.getElementById('_male').checked = true;
                }
                else if (this.state.employee_gender === "female") {
                    document.getElementById('_female').checked = true;
                }
                employeeHistory = {
                    fullName: obj.fullName,
                    email: obj.email,
                    empId: obj.empId,
                    joiningDate: obj.joiningDate,
                    phone: obj.phone,
                    address: obj.address,
                    department: obj.department,
                    designation: obj.designation,
                    gender: obj.gender
                }
            })
            // below we console the error in case of error occur
            .catch(error => { console.log(error) });
    }
    // below is our main render method
    render() {
        return (
            <div className="container-fluid">
                <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert" style={{ display: 'none' }}>
                    <strong>Employee Record Updated Successfully</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" onClick={this.hideAlert}>&times;</span>
                    </button>
                </div>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4">
                        <h1 className="mr-1 mt-2" style={{ fontSize: '20px', color: '#000', fontWeight: '700' }}>Update Employee Record</h1>
                    </div>
                </div>
                <form>
                    <div class="form-row mt-2  mb-2">
                        <div class="col-md-2"></div>
                        <div class="col-md-8 col-sm-12 col-xs-12">
                            <label for="clientName" style={lableStyle} id="empName">Employee Name</label>
                            <input type="text" class="form-control" maxLength='20' style={inputStyle} id="employee_name" name='clienttName' onFocus={() => this.myfocus('employee_name')} value={this.state.employee_name} onChange={this.handleEmployeeName} placeholder="Employee name" title='Employee name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="email" style={lableStyle} id="empEmail">Employee Email</label>
                                <input type="text" class="form-control" style={inputStyle} id="employee_email" name="employeeEmail" onFocus={() => this.myfocus('employee_email')} rows="1" value={this.state.employee_email} onChange={this.handleEmployeeEmail} placeholder="Employee Email" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="clientId" style={lableStyle} id="empId">Employee ID</label>
                                <input type="text" class="form-control" style={inputStyle} id="employee_id" name="employeeId" readOnly onFocus={() => this.myfocus('employee_id')} rows="1" value={this.state.employee_id} placeholder="Employee ID" />
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="phone" style={lableStyle} id="empPhone">Employee Phone</label>
                            <input type="text" class="form-control" style={inputStyle} id="employee_phone" name='employeePhone' onFocus={() => this.myfocus('employee_phone')} value={this.state.employee_phone} onChange={this.handleEmployeePhone} title="Employee Phone" />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="joiningDate" style={lableStyle} id="empDate">Joining Date</label>
                            <input type="date" class="form-control" style={inputStyle} id="update_joining_date" name='joiningDate' onFocus={() => this.myfocus('update_joining_date')} value={this.state.employee_joining_date} onChange={this.handleJoiningDate} title="Joining Date" />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="department" style={lableStyle} id="empDepart">Department</label>
                            <select class="form-control" id="_department" style={inputStyle} name='department' onFocus={() => this.myfocus('_department')} value={this.state.employee_department} onChange={this.handleDepartment} title='Select Department'>
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
                        <div class="col-md-4 mb-3" id='development_deis' style={{ display: 'none' }}>
                            <label for="designation" style={lableStyle} id="empDesination">Designation</label>
                            <select class="form-control" id="development_designation" style={inputStyle} name='designation' onFocus={() => this.myfocus('development_designation')} value={this.state.employee_designation} onChange={this.handleDesignation} title='Select Designation' >
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
                        <div class="col-md-4 mb-3" id='seo_deis' style={{ display: 'none' }}>
                            <label for="designation" style={lableStyle} id="empDesination">Designation</label>
                            <select class="form-control" id="seo_designation" name='designation' onFocus={() => this.myfocus('seo_designation')} value={this.state.employee_designation} onChange={this.handleDesignation} title='Select Designation' >
                                <option value='Select Designation' selected>Select Designation</option>
                                <option value='SEO Analyst'>SEO Analyst</option>
                                <option value='SEO Consultant'>SEO Consultant</option>
                                <option value='SEO Project Manager'>SEO Project Manager</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-4 mb-3" id='designing_deis' style={{ display: 'none' }}>
                            <label for="designation" style={lableStyle} id="empDesination">Designation</label>
                            <select class="form-control" id="designer_designation" style={inputStyle} name='designation' onFocus={() => this.myfocus('designer_designation')} value={this.state.employee_designation} onChange={this.handleDesignation} title='Select Designation' >
                                <option value='Select Designation' selected>Select Designation</option>
                                <option value='Web Designer'>Web Designer</option>
                                <option value='Graphic Designer'>Graphic Designer</option>
                                <option value='UI/UX Designer'>UI/UX Designer</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-4 mb-3" id='marketing_deis' style={{ display: 'none' }}>
                            <label for="designation" style={lableStyle} id="empDesination">Designation</label>
                            <select class="form-control" id="marketing_designation" style={inputStyle} name='designation' onFocus={() => this.myfocus('marketing_designation')} value={this.state.employee_designation} onChange={this.handleDesignation} title='Select Designation' >
                                <option value='Select Designation' selected>Select Designation</option>
                                <option value='Content Marketing Manager'>Content Marketing Manager</option>
                                <option value='Digital Marketing Manager'>Digital Marketing Manager</option>
                            </select>
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <label for="address" style={lableStyle} id="empAddress">Employee Address</label>
                            <textarea class="form-control" id="update_employee_address" style={inputStyle} name='employeeAddress' onFocus={() => this.myfocus('update_employee_address')} value={this.state.employee_address} onChange={this.handleEmployeeAddress} title='Employee Address' ></textarea>
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row mt-2">
                        <div class="col-md-2"></div>
                        <div class="col-md-4 mb-3">
                            <label for="exampleFormControlTextarea1" style={lableStyle} id="EmpGender">Gender:</label>
                            <div class="form-check form-check-inline ml-3">
                                <input class="form-check-input" type="radio" name="gender" id="_male" value={this.state.employee_gender} onChange={this.handleGender} />
                                <label class="form-check-label" for="male" style={radioInputStyle}>Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="_female" value={this.state.employee_gender} onChange={this.handleGender} />
                                <label class="form-check-label" for="female" style={radioInputStyle}>Female</label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 offset-sm-5 mr-4'>
                            <button class="btn" onClick={this.handleSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Update Employee</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default UpdateEmployee;