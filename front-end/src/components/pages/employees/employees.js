// below we import module for component
import React, { Component } from 'react';
import emp_1 from '../../../assets/images/employees/emp_1.jpg';
import $ from 'jquery';
import './employees.css';
import AddEmployee from './add_employee';
let axios = require('axios');
// below we create and export component class
export default class Employess extends Component {
    // below we create constructor
    constructor(props) {
        super(props)
        // below we create state to save component values
        this.state = {
            employees: [],
            searchEmployees: [],
            search_emp_id: '',
            search_emp_name: '',
            search_emp_designation: ''
        };
    }
    // below we create method to handle employee id
    handleEmpId = (e) => {
        this.setState({ search_emp_id: e.target.value });
    }
    // below we create method to handle employee name
    handleEmpName = (e) => {
        this.setState({ search_emp_name: e.target.value });
    }
    // below we create method to handle employee designation
    handleEmpDesignation = (e) => {
        this.setState({ search_emp_designation: e.target.value });
    }
    // below we create method that will run when the compnent will load
    componentDidMount() {
        // below we send request to the server to get the name of employees
        axios.post('/Employee/getEmployees')
            .then(res => {
                // below we set the state by data which is comming from server
                this.setState({ employees: res.data });
                let row = $('<div class="row"></div>');
                // below we create loop and create elements dynamically and append them to the div container
                for (var i = 0; i <= res.data.length; i++) {
                    var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                    var cardMenu = $('<div className="col-sm-12"></div>');
                    var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                    menu1.appendTo(cardMenu);
                    let proID = res.data[i].empId;
                    menu1.on("click", function () {
                        axios.post("/Employee/sendupdateEmployeeid", { id: proID })
                        window.setTimeout(function () {
                            window.location.href = '/dashboard/update-employee';
                        }, 100);
                    });
                    var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                    var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                    var images = $('<img />');
                    $(menu1).css("cursor", "pointer");
                    $(employeesName).attr('class', 'text-center mt-4');
                    $(employeesDesination).attr('class', 'text-center mt-2');
                    $(images).attr("src", emp_1);
                    $(images).attr('class', 'mt-4 ml-10 rounded_images');
                    $(images).css({ "margin-left": "30%" });
                    $(cardMenu).attr('class', 'client_icons');
                    var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                    $(myPanel).attr('height', '250');
                    cardMenu.appendTo(myPanel);
                    images.appendTo(myPanel);
                    employeesName.appendTo(myPanel);
                    employeesDesination.appendTo(myPanel)
                    myPanel.appendTo(myCol);
                    myCol.appendTo(row);
                    row.appendTo('#card_container');
                }
                for (let i = 0; i < res.data.length; i++) {
                    document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                    document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                    document.getElementById("name" + i).innerHTML = res.data[i].firstName + ' ' + res.data[i].lastName;
                    document.getElementById("designation" + i).innerHTML = res.data[i].designation;
                }
                console.log(this.state.employees);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to search the record that will run when the use click on the search button
    searchRecord = () => {
        let emp_id = document.getElementById('search_id').value;
        let emp_name = document.getElementById('search_name').value;
        let emp_designation = document.getElementById('search_designation').value;
        document.getElementById('nor_record_msg').style.display = 'none';
        $("#card_container").empty();
        if (emp_id === "" && emp_name === "" && emp_designation === "Select Designation") {
            document.getElementById('emp_msg').style.display = 'block';
        }
        else if (emp_id !== "" && emp_name === "" && emp_designation === "Select Designation") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Employee/searchEmployeeId/', { emp_id: this.state.search_emp_id })
                .then((res) => {
                    this.setState({ searchEmployees: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('nor_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            let proID = res.data[i].empId;
                            menu1.on("click", function () {
                                axios.post("/Employee/sendupdateEmployeeid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/update-employee';
                                }, 100);
                            });
                            var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                            var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(employeesDesination).attr('class', 'text-center mt-2');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            $(myPanel).attr('height', '250');
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            employeesDesination.appendTo(myPanel)
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                        for (let i = 0; i < res.data.length; i++) {

                            document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                            document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                            document.getElementById("name" + i).innerHTML = res.data[i].fullName;
                            document.getElementById("designation" + i).innerHTML = res.data[i].designation;
                        }
                        console.log(this.state.searchEmployees);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (emp_id === "" && emp_name !== "" && emp_designation === "Select Designation") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Employee/searchEmployeeName/', { emp_name: this.state.search_emp_name })
                .then((res) => {
                    this.setState({ searchEmployees: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('nor_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            let proID = res.data[i].empId;
                            menu1.on("click", function () {
                                axios.post("/Employee/sendupdateEmployeeid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/update-employee';
                                }, 100);
                            });
                            var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                            var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(employeesDesination).attr('class', 'text-center mt-2');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            $(myPanel).attr('height', '250');
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            employeesDesination.appendTo(myPanel)
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                        for (let i = 0; i < res.data.length; i++) {

                            document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                            document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                            document.getElementById("name" + i).innerHTML = res.data[i].fullName;
                            document.getElementById("designation" + i).innerHTML = res.data[i].designation;
                        }
                        console.log(this.state.searchEmployees);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (emp_id === "" && emp_name === "" && emp_designation !== "Select Designation") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Employee/searchEmployeeDesignation/', { emp_designation: this.state.search_emp_designation })
                .then((res) => {
                    this.setState({ searchEmployees: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('nor_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            let proID = res.data[i].empId;
                            menu1.on("click", function () {
                                axios.post("/Employee/sendupdateEmployeeid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/update-employee';
                                }, 100);
                            });
                            var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                            var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(employeesDesination).attr('class', 'text-center mt-2');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            $(myPanel).attr('height', '250');
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            employeesDesination.appendTo(myPanel)
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                        for (let i = 0; i < res.data.length; i++) {

                            document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                            document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                            document.getElementById("name" + i).innerHTML = res.data[i].fullName;
                            document.getElementById("designation" + i).innerHTML = res.data[i].designation;
                        }
                        console.log(this.state.searchEmployees);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (emp_id !== "" && emp_name !== "" && emp_designation === "Select Designation") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Employee/searchEmployeeIdName/', { emp_id: this.state.search_emp_id, emp_name: this.state.search_emp_name })
                .then((res) => {
                    this.setState({ searchEmployees: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('nor_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            let proID = res.data[i].empId;
                            menu1.on("click", function () {
                                axios.post("/Employee/sendupdateEmployeeid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/update-employee';
                                }, 100);
                            });
                            var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                            var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(employeesDesination).attr('class', 'text-center mt-2');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            $(myPanel).attr('height', '250');
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            employeesDesination.appendTo(myPanel)
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                        for (let i = 0; i < res.data.length; i++) {

                            document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                            document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                            document.getElementById("name" + i).innerHTML = res.data[i].fullName;
                            document.getElementById("designation" + i).innerHTML = res.data[i].designation;
                        }
                        console.log(this.state.searchEmployees);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (emp_id === "" && emp_name !== "" && emp_designation !== "Select Designation") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Employee/searchEmployeeNameDesig/', { emp_name: this.state.search_emp_name, emp_designation: this.state.search_emp_designation })
                .then((res) => {
                    this.setState({ searchEmployees: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('nor_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            let proID = res.data[i].empId;
                            menu1.on("click", function () {
                                axios.post("/Employee/sendupdateEmployeeid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/update-employee';
                                }, 100);
                            });
                            var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                            var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(employeesDesination).attr('class', 'text-center mt-2');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            $(myPanel).attr('height', '250');
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            employeesDesination.appendTo(myPanel)
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                        for (let i = 0; i < res.data.length; i++) {

                            document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                            document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                            document.getElementById("name" + i).innerHTML = res.data[i].fullName;
                            document.getElementById("designation" + i).innerHTML = res.data[i].designation;
                        }
                        console.log(this.state.searchEmployees);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (emp_id !== "" && emp_name === "" && emp_designation !== "Select Designation") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Employee/searchEmployeeIdDesig/', { emp_id: this.state.search_emp_id, emp_designation: this.state.search_emp_designation })
                .then((res) => {
                    this.setState({ searchEmployees: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('nor_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            let proID = res.data[i].empId;
                            menu1.on("click", function () {
                                axios.post("/Employee/sendupdateEmployeeid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/update-employee';
                                }, 100);
                            });
                            var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                            var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(employeesDesination).attr('class', 'text-center mt-2');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            $(myPanel).attr('height', '250');
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            employeesDesination.appendTo(myPanel)
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                        for (let i = 0; i < res.data.length; i++) {

                            document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                            document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                            document.getElementById("name" + i).innerHTML = res.data[i].fullName;
                            document.getElementById("designation" + i).innerHTML = res.data[i].designation;
                        }
                        console.log(this.state.searchEmployees);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (emp_id !== "" && emp_name !== "" && emp_designation !== "Select Designation") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Employee/searchEmployeeIdNameDesig/', { emp_id: this.state.search_emp_id, emp_name: this.state.search_emp_name, emp_designation: this.state.search_emp_designation })
                .then((res) => {
                    this.setState({ searchEmployees: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('nor_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            let proID = res.data[i].empId;
                            menu1.on("click", function () {
                                axios.post("/Employee/sendupdateEmployeeid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/update-employee';
                                }, 100);
                            });
                            var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                            var employeesDesination = $('<h3>' + res.data[i].designation + '</h3>');
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(employeesDesination).attr('class', 'text-center mt-2');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            $(myPanel).attr('height', '250');
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            employeesDesination.appendTo(myPanel)
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                        for (let i = 0; i < res.data.length; i++) {

                            document.getElementsByTagName("H2")[i].setAttribute("id", "name" + i);
                            document.getElementsByTagName("H3")[i].setAttribute("id", "designation" + i);
                            document.getElementById("name" + i).innerHTML = res.data[i].fullName;
                            document.getElementById("designation" + i).innerHTML = res.data[i].designation;
                        }
                        console.log(this.state.searchEmployees);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    // below is our main render method
    render() {
        return (
            <div id='all_employes'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1 className='mt-4'>Employees</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" style={{ color: '#000', fontWeight: 600 }}>Dashboard</li>
                                <li class="breadcrumb-item active" style={{ color: 'grey' }}>Employees</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='col-sm-5'></div>
                    <dv className='col-sm-2'>
                        <button type='button' className='btn add_employee ml-5' data-toggle="modal" data-target="#exampleModalCenter" style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}><i class="fas fa-plus mr-2"></i>Add Employee</button>
                    </dv>
                </div>
                <form>
                    <div class="row">
                        <div class="col-xs-12 col-sm-3">
                            <input type="text" class="form-control" id='search_id' value={this.state.search_emp_id} onChange={this.handleEmpId} placeholder="Employee ID" />
                        </div>
                        <div class="col-xs-12 col-sm-3">
                            <input type="text" class="form-control" id="search_name" value={this.state.search_emp_name} onChange={this.handleEmpName} placeholder="Employee Name" />
                        </div>
                        <div class="col-xs-12 col-sm-3">
                            <select id="search_designation" class="form-control" value={this.state.search_emp_designation} onChange={this.handleEmpDesignation}>
                                <option value='Select Designation' selected>Select Designation</option>
                                <option value='Web Development'>Web Development</option>
                                <option value='. Net Developer'>. Net Developer</option>
                                <option value='Web Designer'>Web Designer</option>
                                <option value='WordPress Developer'>WordPress Developer</option>
                                <option value='Android Developer'>Android Developer</option>
                                <option value='SEO Analyst'>SEO Analyst</option>
                                <option value='SEO Consultant'>SEO Consultant</option>
                                <option value='SEO Project Manager'>SEO Project Manager</option>
                                <option value='Web Designer'>Web Designer</option>
                                <option value='Graphic Designer'>Graphic Designer</option>
                                <option value='UI/UX Designer'>UI/UX Designer</option>
                                <option value='Content Marketing Manager'>Content Marketing Manager</option>
                                <option value='Digital Marketing Manager'>Digital Marketing Manager</option>
                            </select>
                        </div>
                        <div class="col-xs-12 col-sm-3">
                            <button type='button' className='btn search_btn' id='search_btn' name='searchBTn' onClick={this.searchRecord} style={{ backgroundColor: '#55ce63', color: 'white', fontWeight: 700 }}>Search</button>
                        </div>
                    </div>
                </form>
                <br />
                <div id='search_card_container'></div>
                <div className='row' id="nor_record_msg" style={{ display: 'none' }}>
                    <div className='col-sm-4 offset-sm-4'>
                        <h2 className='sorry_msg mt-5 mb-5'>Sorry, No Record Found!</h2>
                    </div>
                </div>
                <div class="alert alert-danger alert-dismissible fade show" role="alert" id="emp_msg" style={{ display: 'none' }}>
                    <strong>Please Fill The Fields</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id='card_container'></div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header" style={{backgroundColor:'rgb(244, 59, 72)'}}>
                                <h1 class="modal-title text-center text-white" id="exampleModalLongTitle">Add Employee</h1>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AddEmployee />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
