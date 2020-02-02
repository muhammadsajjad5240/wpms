// below we import modules for comopnent 
import React, { Component } from 'react';
import emp_1 from '../../../../assets/images/employees/emp_1.jpg';
import $ from 'jquery';
import './client_detail.css';
import AddClients from './add_clients/add_clients';
let axios = require('axios');
// below we create and export component class
export default class ClientDetail extends Component {
    // below we create constructor to create class
    constructor(props) {
        super(props)
        // below we create state to save data from server and modify.
        this.state = {
            employees: [],
            searchClient: [],
            search_client_id: '',
            search_client_name: '',
            search_client_email: ''
        };
    }
    // below we create method to handle Client Id
    handleSearchClientId = (e) => {
        this.setState({ search_client_id: e.target.value });
    }
    // below we create method to handle Client Name
    handleSearchClientName = (e) => {
        this.setState({ search_client_name: e.target.value });
    }
    // below we create method to handle client Email
    handleSearchClientEmail = (e) => {
        this.setState({ search_client_email: e.target.value });
    }
    // below we create method which will call when component load
    componentDidMount() {
        // below we send request to the server to get client record
        axios.post('/Client/getClients')
            .then(res => {
                // below we set state with data commign data from server
                this.setState({ employees: res.data });
                let row = $('<div class="row"></div>');
                for (var i = 0; i <= res.data.length; i++) {
                    var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                    var cardMenu = $('<div className="col-sm-12"></div>');
                    var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                    menu1.appendTo(cardMenu);
                    cardMenu.appendTo(myCol);
                    var employeesName = $('<h2>' + res.data[i].fullName + '</h2>');
                    var profileBtn = $('<button class="btn">View Profile</button>');
                    let proID = res.data[i].clientId;
                    profileBtn.on("click", function () {
                        axios.post("/Client/sendupdateClienttid", { id: proID })
                        window.setTimeout(function () {
                            window.location.href = '/dashboard/profile';
                        }, 100);
                    });
                    var images = $('<img />');
                    menu1.on("click", function () {
                        axios.post("/Client/sendupdateClienttid", { id: proID })
                        window.setTimeout(function () {
                            window.location.href = '/dashboard/update-client';
                        }, 100);
                    });
                    $(menu1).css("cursor", "pointer");
                    $(employeesName).attr('class', 'text-center mt-4');
                    $(images).attr("src", emp_1);
                    $(images).attr('class', 'mt-4 ml-10 rounded_images');
                    $(images).css({ "margin-left": "30%" });
                    $(profileBtn).css({ "width": "60%" });
                    $(profileBtn).css({ "margin-left": "20%" });
                    $(profileBtn).css({ "background-color": "#f43b48" });
                    $(profileBtn).css({ "font-weight": "700" });
                    $(profileBtn).css({ "color": "white" });
                    $(cardMenu).attr('class', 'client_icons');
                    var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                    $(myPanel).css({ "height": "220"});                    
                    $(myPanel).css({ "height": "220" });
                    cardMenu.appendTo(myPanel);
                    images.appendTo(myPanel);
                    employeesName.appendTo(myPanel);
                    profileBtn.appendTo(myPanel);
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
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to search the record
    searchRecord = () => {
        let client_id = document.getElementById('search_client_id').value;
        let Client_name = document.getElementById('search_client_name').value;
        let Client_email = document.getElementById('search_client_email').value;
        document.getElementById('not_record_msg').style.display = 'none';
        $("#card_container").empty();
        if (client_id === "" && Client_name === "" && Client_email === "") {
            document.getElementById('emp_msg').style.display = 'block';
        }
        else if (client_id !== "" && Client_name === "" && Client_email === "") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Client/searchClientId/', { client_id: this.state.search_client_id })
                .then((res) => {
                    this.setState({ searchClient: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
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
                            var profileBtn = $('<button class="btn">View Profile</button>');
                            profileBtn.on("click", function () {
                                axios.post("/Client/sendupdateClienttid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/profile';
                                }, 100);
                            });
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            $(profileBtn).css({ "width": "60%" });
                            $(profileBtn).css({ "margin-left": "20%" });
                            $(profileBtn).css({ "background-color": "#f43b48" });
                            $(profileBtn).css({ "font-weight": "700" });
                            $(profileBtn).css({ "color": "white" });
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            $(myPanel).css({ "height": "220" });
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            profileBtn.appendTo(myPanel)
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
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (client_id === "" && Client_name !== "" && Client_email === "") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Client/searchClientName/', { client_name: this.state.search_client_name })
                .then((res) => {
                    this.setState({ searchClient: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
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
                            var profileBtn = $('<button class="btn">View Profile</button>');
                            profileBtn.on("click", function () {
                                axios.post("/Client/sendupdateClienttid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/profile';
                                }, 100);
                            });
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            $(profileBtn).css({ "width": "60%" });
                            $(profileBtn).css({ "margin-left": "20%" });
                            $(profileBtn).css({ "background-color": "#f43b48" });
                            $(profileBtn).css({ "font-weight": "700" });
                            $(profileBtn).css({ "color": "white" });
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                    $(myPanel).css({ "height": "220"});                            
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            profileBtn.appendTo(myPanel)
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
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (client_id === "" && Client_name === "" && Client_email !== "") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Client/searchClientEmail/', { client_email: this.state.search_client_email })
                .then((res) => {
                    this.setState({ searchClient: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
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
                            var profileBtn = $('<button class="btn">View Profile</button>');
                            profileBtn.on("click", function () {
                                axios.post("/Client/sendupdateClienttid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/profile';
                                }, 100);
                            });
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            $(profileBtn).css({ "width": "60%" });
                            $(profileBtn).css({ "margin-left": "20%" });
                            $(profileBtn).css({ "background-color": "#f43b48" });
                            $(profileBtn).css({ "font-weight": "700" });
                            $(profileBtn).css({ "color": "white" });
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                    $(myPanel).css({ "height": "220"});                            
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            profileBtn.appendTo(myPanel)
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
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (client_id !== "" && Client_name !== "" && Client_email === "") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Client/searchClientIdName/', { client_id: this.state.search_client_id, client_name: this.state.search_client_name })
                .then((res) => {
                    this.setState({ searchClient: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
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
                            var profileBtn = $('<button class="btn">View Profile</button>');
                            profileBtn.on("click", function () {
                                axios.post("/Client/sendupdateClienttid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/profile';
                                }, 100);
                            });
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            $(profileBtn).css({ "width": "60%" });
                            $(profileBtn).css({ "margin-left": "20%" });
                            $(profileBtn).css({ "background-color": "#f43b48" });
                            $(profileBtn).css({ "font-weight": "700" });
                            $(profileBtn).css({ "color": "white" });
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                    $(myPanel).css({ "height": "220"});                            
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            profileBtn.appendTo(myPanel)
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
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (client_id === "" && Client_name !== "" && Client_email !== "") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Client/searchClientNameEmail/', { client_name: this.state.search_client_name, client_email: this.state.search_client_email })
                .then((res) => {
                    this.setState({ searchClient: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
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
                            var profileBtn = $('<button class="btn">View Profile</button>');
                            profileBtn.on("click", function () {
                                axios.post("/Client/sendupdateClienttid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/profile';
                                }, 100);
                            });
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            $(profileBtn).css({ "width": "60%" });
                            $(profileBtn).css({ "margin-left": "20%" });
                            $(profileBtn).css({ "background-color": "#f43b48" });
                            $(profileBtn).css({ "font-weight": "700" });
                            $(profileBtn).css({ "color": "white" });
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                    $(myPanel).css({ "height": "220"});                            
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            profileBtn.appendTo(myPanel)
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
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (client_id !== "" && Client_name === "" && Client_email !== "") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Client/searchClientIdEmail/', { client_id: this.state.search_client_id, client_email: this.state.search_client_email })
                .then((res) => {
                    this.setState({ searchClient: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
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
                            var profileBtn = $('<button class="btn">View Profile</button>');
                            profileBtn.on("click", function () {
                                axios.post("/Client/sendupdateClienttid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/profile';
                                }, 100);
                            });
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            $(profileBtn).css({ "width": "60%" });
                            $(profileBtn).css({ "margin-left": "20%" });
                            $(profileBtn).css({ "background-color": "#f43b48" });
                            $(profileBtn).css({ "font-weight": "700" });
                            $(profileBtn).css({ "color": "white" });
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                    $(myPanel).css({ "height": "220"});                            
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            profileBtn.appendTo(myPanel)
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
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (client_id !== "" && Client_name !== "" && Client_email !== "") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Client/searchClientIdNameEmail/', { client_id: this.state.search_client_id, client_name: this.state.search_client_name, client_email: this.state.search_client_email })
                .then((res) => {
                    this.setState({ searchClient: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
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
                            var profileBtn = $('<button class="btn">View Profile</button>');
                            profileBtn.on("click", function () {
                                axios.post("/Client/sendupdateClienttid", { id: proID })
                                window.setTimeout(function () {
                                    window.location.href = '/dashboard/profile';
                                }, 100);
                            });
                            var images = $('<img />');
                            $(menu1).css("cursor", "pointer");
                            $(employeesName).attr('class', 'text-center mt-4');
                            $(images).attr("src", emp_1);
                            $(images).attr('class', 'mt-4 ml-10 rounded_images');
                            $(images).css({ "margin-left": "30%" });
                            $(cardMenu).attr('class', 'client_icons');
                            $(profileBtn).css({ "width": "60%" });
                            $(profileBtn).css({ "margin-left": "20%" });
                            $(profileBtn).css({ "background-color": "#f43b48" });
                            $(profileBtn).css({ "font-weight": "700" });
                            $(profileBtn).css({ "color": "white" });
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                    $(myPanel).css({ "height": "220"});                            
                            cardMenu.appendTo(myPanel);
                            images.appendTo(myPanel);
                            employeesName.appendTo(myPanel);
                            profileBtn.appendTo(myPanel)
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
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    render() {
        return (
            <div id='all_employes'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1 className='mt-4'>Clients</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" style={{ color: '#000', fontWeight: 600 }}>Dashboard</li>
                                <li class="breadcrumb-item active" style={{ color: 'grey' }}>Clients</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='col-sm-5'></div>
                    <dv className='col-sm-2'>
                        <button type='button' className='btn  add_employee ml-5' data-toggle="modal" data-target="#exampleModalCenter" style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}><i class="fas fa-plus mr-2" ></i>Add Client</button>
                    </dv>
                </div>
                <form>
                    <div class="row">
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id='search_client_id' value={this.state.search_client_id} onChange={this.handleSearchClientId} placeholder="Client ID" />
                        </div>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" id='search_client_name' value={this.state.search_client_name} onChange={this.handleSearchClientName} placeholder="Client Name" />
                        </div>
                        <div class="col-sm-3">
                            <input type="email" class="form-control" id='search_client_email' value={this.state.search_client_email} onChange={this.handleSearchClientEmail} placeholder="Client Email" />
                        </div>
                        <div class="col-sm-3">
                            <button type='button' className='btn search_btn' id='search_btn' name='searchBTn' onClick={this.searchRecord} style={{ backgroundColor: '#55ce63', color: 'white', fontWeight: 700 }}>Search</button>
                        </div>
                    </div>
                </form>
                <br />
                <div className='row' id="not_record_msg" style={{ display: 'none' }}>
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
                            <div class="modal-header" style={{ backgroundColor: 'rgb(244, 59, 72)' }}>
                                <h1 class="modal-title text-center text-white" id="exampleModalLongTitle">Add Client</h1>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AddClients />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}