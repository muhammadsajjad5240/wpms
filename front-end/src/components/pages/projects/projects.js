// below we import modules for component
import React, { Component } from 'react';
import AddProject from './add_project/add_project';
import $ from 'jquery';
import axios from 'axios';
import './projects.css';
// below we create and export component class
export default class Projects extends Component {
    // below we create constructor 
    constructor(props) {
        super(props);
        // below we create state to handle component data
        this.state = {
            projects: [],
            searchProject: [],
            search_project_id: '',
            search_project_name: '',
            search_project_type: ''
        };
    }
// below we create method to check validation and handle project id
    handleSearchProjectId = (e) => {
        this.setState({ search_project_id: e.target.value });
    }
    // below we create method to handle project Name
    handleSearchProjectName = (e) => {
        this.setState({ search_project_name: e.target.value });
    }
    // below we create method to handle project Type
    handleSearchProjectType = (e) => {
        this.setState({ search_project_type: e.target.value });
    }
    // below we create method that will call when the componetn will load
    componentDidMount() {
        // bleow we send request to the server to get project details
        axios.post('/Projects/getAllProjects')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ projects: res.data });
                console.log(this.state.projects);
                // alert(res.data.length);
                // let row = $('<div class="row"></div>');
                let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            $(myCol).attr('height', '350');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            // var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                            //     menu2.appendTo(cardMenu);
                            menu1.appendTo(cardMenu);
                            if (res.data[i].status === "start") {
                                var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                                menu2.appendTo(cardMenu);
                                let proID = res.data[i].projectId;
                                menu2.on("click", function () {
                                    axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                                    document.getElementById(proID).style.visibility = "hidden";
                                });
                            }
                            let proID = res.data[i].projectId;
                            menu1.on("click", function () {
                                axios.post("/Projects/sendupdateProjectid", { id: proID })
                                window.location.replace('/dashboard/updateProject');
                            });
                            $(menu1).css("cursor", "pointer");
                            $(menu2).css("cursor", "pointer");
                            var projectName = $('<h2>' + res.data[i].projectName.substr(0, 20) + '</h2>');
                            var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                            var pro_dead_head = $('<h4>Project Deadline</h4>');
                            var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                            var proj_lead = $('<h4>Project Leader</h4>');
                            var proj_leader_data = $('<h3>' + res.data[i].teamLeader[0].label + '</h3>');
                            var proj_team = $('<h4>Team Members</h4>');
                            var proj_team_data = $('<h3>' + res.data[i].teamLeader[0].label + '</h3>');
                            $(projectName).attr('class', 'text-center mt-4');
                            $(projectDescription).attr('class', 'ml-4');
                            $(pro_dead_head).attr('class', 'mt-2 ml-4');
                            $(proj_lead).attr('class', 'mt-2 ml-4');
                            $(proj_team).attr('class', 'mt-2 ml-4');
                            $(proj_dead).attr('class', 'mt-2 ml-4');
                            $(proj_leader_data).attr('class', 'mt-2 ml-4');
                            $(proj_team_data).attr('class', 'mt-2 ml-4');
                            $(cardMenu).attr('class', 'icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            cardMenu.appendTo(myPanel);
                            projectName.appendTo(myPanel);
                            projectDescription.appendTo(myPanel);
                            pro_dead_head.appendTo(myPanel);
                            proj_dead.appendTo(myPanel);
                            proj_lead.appendTo(myPanel);
                            proj_leader_data.appendTo(myPanel);
                            proj_team.appendTo(myPanel);
                            proj_team_data.appendTo(myPanel);
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
// below we create method to search the record from database
    searchRecord = () => {
        let project_id = document.getElementById('search_proj_id').value;
        let project_name = document.getElementById('search_proj_name').value;
        let project_type = document.getElementById('search_project_type').value;
        document.getElementById('not_record_msg').style.display = 'none';
        $("#card_container").empty();
        if (project_id === "" && project_name === "" && project_type === "Project Type") {
            document.getElementById('emp_msg').style.display = 'block';
        }
        else if (project_id !== "" && project_name === "" && project_type === "Project Type") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Projects/searchProjectId/', { project_id: this.state.search_project_id })
                .then((res) => {
                    this.setState({ searchProject: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            $(myCol).attr('height', '350');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            if (res.data[i].status === "start") {
                                var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                                menu2.appendTo(cardMenu);
                                let proID = res.data[i].projectId;
                                menu2.on("click", function () {
                                    axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                                    document.getElementById(proID).style.visibility = "hidden";
                                });
                            }
                            let proID = res.data[i].projectId;
                            menu1.on("click", function () {
                                axios.post("/Projects/sendupdateProjectid", { id: proID })
                                window.location.replace('/dashboard/updateProject');
                            });
                            $(menu1).css("cursor", "pointer");
                            $(menu2).css("cursor", "pointer");
                            var projectName = $('<h2>' + res.data[i].projectName.substr(0, 20) + '</h2>');
                            var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                            var pro_dead_head = $('<h4>Project Deadline</h4>');
                            var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                            var proj_lead = $('<h4>Project Leader</h4>');
                            var proj_leader_data = $('<h3>' + res.data[i].teamLeader + '</h3>');
                            var proj_team = $('<h4>Team Members</h4>');
                            var proj_team_data = $('<h3>' + res.data[i].teamMembers + '</h3>');
                            $(projectName).attr('class', 'text-center mt-4');
                            $(projectDescription).attr('class', 'ml-4');
                            $(pro_dead_head).attr('class', 'mt-2 ml-4');
                            $(proj_lead).attr('class', 'mt-2 ml-4');
                            $(proj_team).attr('class', 'mt-2 ml-4');
                            $(proj_dead).attr('class', 'mt-2 ml-4');
                            $(proj_leader_data).attr('class', 'mt-2 ml-4');
                            $(proj_team_data).attr('class', 'mt-2 ml-4');
                            $(cardMenu).attr('class', 'icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            cardMenu.appendTo(myPanel);
                            projectName.appendTo(myPanel);
                            projectDescription.appendTo(myPanel);
                            pro_dead_head.appendTo(myPanel);
                            proj_dead.appendTo(myPanel);
                            proj_lead.appendTo(myPanel);
                            proj_leader_data.appendTo(myPanel);
                            proj_team.appendTo(myPanel);
                            proj_team_data.appendTo(myPanel);
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (project_id === "" && project_name !== "" && project_type === "Project Type") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Projects/searchProjectName/', { project_name: this.state.search_project_name })
                .then((res) => {
                    this.setState({ searchProject: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            $(myCol).attr('height', '350');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            if (res.data[i].status === "start") {
                                var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                                menu2.appendTo(cardMenu);
                                let proID = res.data[i].projectId;
                                menu2.on("click", function () {
                                    axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                                    document.getElementById(proID).style.visibility = "hidden";
                                });
                            }
                            let proID = res.data[i].projectId;
                            menu1.on("click", function () {
                                axios.post("/Projects/sendupdateProjectid", { id: proID })
                                window.location.replace('/dashboard/updateProject');
                            });
                            $(menu1).css("cursor", "pointer");
                            $(menu2).css("cursor", "pointer");
                            var projectName = $('<h2>' + res.data[i].projectName.substr(0, 20) + '</h2>');
                            var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                            var pro_dead_head = $('<h4>Project Deadline</h4>');
                            var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                            var proj_lead = $('<h4>Project Leader</h4>');
                            var proj_leader_data = $('<h3>' + res.data[i].teamLeader + '</h3>');
                            var proj_team = $('<h4>Team Members</h4>');
                            var proj_team_data = $('<h3>' + res.data[i].teamMembers + '</h3>');
                            $(projectName).attr('class', 'text-center mt-4');
                            $(projectDescription).attr('class', 'ml-4');
                            $(pro_dead_head).attr('class', 'mt-2 ml-4');
                            $(proj_lead).attr('class', 'mt-2 ml-4');
                            $(proj_team).attr('class', 'mt-2 ml-4');
                            $(proj_dead).attr('class', 'mt-2 ml-4');
                            $(proj_leader_data).attr('class', 'mt-2 ml-4');
                            $(proj_team_data).attr('class', 'mt-2 ml-4');
                            $(cardMenu).attr('class', 'icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            cardMenu.appendTo(myPanel);
                            projectName.appendTo(myPanel);
                            projectDescription.appendTo(myPanel);
                            pro_dead_head.appendTo(myPanel);
                            proj_dead.appendTo(myPanel);
                            proj_lead.appendTo(myPanel);
                            proj_leader_data.appendTo(myPanel);
                            proj_team.appendTo(myPanel);
                            proj_team_data.appendTo(myPanel);
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (project_id === "" && project_name === "" && project_type !== "Project Type") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Projects/searchProjectType/', { project_type: this.state.search_project_type })
                .then((res) => {
                    this.setState({ searchProject: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            $(myCol).attr('height', '350');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            if (res.data[i].status === "start") {
                                var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                                menu2.appendTo(cardMenu);
                                let proID = res.data[i].projectId;
                                menu2.on("click", function () {
                                    axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                                    document.getElementById(proID).style.visibility = "hidden";
                                });
                            }
                            let proID = res.data[i].projectId;
                            menu1.on("click", function () {
                                axios.post("/Projects/sendupdateProjectid", { id: proID })
                                window.location.replace('/dashboard/updateProject');
                            });
                            $(menu1).css("cursor", "pointer");
                            $(menu2).css("cursor", "pointer");
                            var projectName = $('<h2>' + res.data[i].projectName.substr(0, 20) + '</h2>');
                            var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                            var pro_dead_head = $('<h4>Project Deadline</h4>');
                            var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                            var proj_lead = $('<h4>Project Leader</h4>');
                            var proj_leader_data = $('<h3>' + res.data[i].teamLeader + '</h3>');
                            var proj_team = $('<h4>Team Members</h4>');
                            var proj_team_data = $('<h3>' + res.data[i].teamMembers + '</h3>');
                            $(projectName).attr('class', 'text-center mt-4');
                            $(projectDescription).attr('class', 'ml-4');
                            $(pro_dead_head).attr('class', 'mt-2 ml-4');
                            $(proj_lead).attr('class', 'mt-2 ml-4');
                            $(proj_team).attr('class', 'mt-2 ml-4');
                            $(proj_dead).attr('class', 'mt-2 ml-4');
                            $(proj_leader_data).attr('class', 'mt-2 ml-4');
                            $(proj_team_data).attr('class', 'mt-2 ml-4');
                            $(cardMenu).attr('class', 'icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            cardMenu.appendTo(myPanel);
                            projectName.appendTo(myPanel);
                            projectDescription.appendTo(myPanel);
                            pro_dead_head.appendTo(myPanel);
                            proj_dead.appendTo(myPanel);
                            proj_lead.appendTo(myPanel);
                            proj_leader_data.appendTo(myPanel);
                            proj_team.appendTo(myPanel);
                            proj_team_data.appendTo(myPanel);
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (project_id !== "" && project_name !== "" && project_type === "Project Type") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Projects/searchProjectIdName/', { project_id: this.state.search_project_id, project_name: this.state.search_project_name })
                .then((res) => {
                    this.setState({ searchProject: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            $(myCol).attr('height', '350');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            if (res.data[i].status === "start") {
                                var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                                menu2.appendTo(cardMenu);
                                let proID = res.data[i].projectId;
                                menu2.on("click", function () {
                                    axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                                    document.getElementById(proID).style.visibility = "hidden";
                                });
                            }
                            let proID = res.data[i].projectId;
                            menu1.on("click", function () {
                                axios.post("/Projects/sendupdateProjectid", { id: proID })
                                window.location.replace('/dashboard/updateProject');
                            });
                            $(menu1).css("cursor", "pointer");
                            $(menu2).css("cursor", "pointer");
                            var projectName = $('<h2>' + res.data[i].projectName.substr(0, 20) + '</h2>');
                            var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                            var pro_dead_head = $('<h4>Project Deadline</h4>');
                            var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                            var proj_lead = $('<h4>Project Leader</h4>');
                            var proj_leader_data = $('<h3>' + res.data[i].teamLeader + '</h3>');
                            var proj_team = $('<h4>Team Members</h4>');
                            var proj_team_data = $('<h3>' + res.data[i].teamMembers + '</h3>');
                            $(projectName).attr('class', 'text-center mt-4');
                            $(projectDescription).attr('class', 'ml-4');
                            $(pro_dead_head).attr('class', 'mt-2 ml-4');
                            $(proj_lead).attr('class', 'mt-2 ml-4');
                            $(proj_team).attr('class', 'mt-2 ml-4');
                            $(proj_dead).attr('class', 'mt-2 ml-4');
                            $(proj_leader_data).attr('class', 'mt-2 ml-4');
                            $(proj_team_data).attr('class', 'mt-2 ml-4');
                            $(cardMenu).attr('class', 'icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            cardMenu.appendTo(myPanel);
                            projectName.appendTo(myPanel);
                            projectDescription.appendTo(myPanel);
                            pro_dead_head.appendTo(myPanel);
                            proj_dead.appendTo(myPanel);
                            proj_lead.appendTo(myPanel);
                            proj_leader_data.appendTo(myPanel);
                            proj_team.appendTo(myPanel);
                            proj_team_data.appendTo(myPanel);
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (project_id === "" && project_name !== "" && project_type !== "Project Type") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Projects/searchProjectNameType/', { project_name: this.state.search_project_name, project_type: this.state.search_project_type })
                .then((res) => {
                    this.setState({ searchProject: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            $(myCol).attr('height', '350');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            if (res.data[i].status === "start") {
                                var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                                menu2.appendTo(cardMenu);
                                let proID = res.data[i].projectId;
                                menu2.on("click", function () {
                                    axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                                    document.getElementById(proID).style.visibility = "hidden";
                                });
                            }
                            let proID = res.data[i].projectId;
                            menu1.on("click", function () {
                                axios.post("/Projects/sendupdateProjectid", { id: proID })
                                window.location.replace('/dashboard/updateProject');
                            });
                            $(menu1).css("cursor", "pointer");
                            $(menu2).css("cursor", "pointer");
                            var projectName = $('<h2>' + res.data[i].projectName.substr(0, 20) + '</h2>');
                            var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                            var pro_dead_head = $('<h4>Project Deadline</h4>');
                            var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                            var proj_lead = $('<h4>Project Leader</h4>');
                            var proj_leader_data = $('<h3>' + res.data[i].teamLeader + '</h3>');
                            var proj_team = $('<h4>Team Members</h4>');
                            var proj_team_data = $('<h3>' + res.data[i].teamMembers + '</h3>');
                            $(projectName).attr('class', 'text-center mt-4');
                            $(projectDescription).attr('class', 'ml-4');
                            $(pro_dead_head).attr('class', 'mt-2 ml-4');
                            $(proj_lead).attr('class', 'mt-2 ml-4');
                            $(proj_team).attr('class', 'mt-2 ml-4');
                            $(proj_dead).attr('class', 'mt-2 ml-4');
                            $(proj_leader_data).attr('class', 'mt-2 ml-4');
                            $(proj_team_data).attr('class', 'mt-2 ml-4');
                            $(cardMenu).attr('class', 'icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            cardMenu.appendTo(myPanel);
                            projectName.appendTo(myPanel);
                            projectDescription.appendTo(myPanel);
                            pro_dead_head.appendTo(myPanel);
                            proj_dead.appendTo(myPanel);
                            proj_lead.appendTo(myPanel);
                            proj_leader_data.appendTo(myPanel);
                            proj_team.appendTo(myPanel);
                            proj_team_data.appendTo(myPanel);
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (project_id !== "" && project_name === "" && project_type !== "Project Type") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Projects/searchProjectIdType/', { project_id: this.state.search_project_id, project_type: this.state.search_project_type })
                .then((res) => {
                    this.setState({ searchProject: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            $(myCol).attr('height', '350');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            if (res.data[i].status === "start") {
                                var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                                menu2.appendTo(cardMenu);
                                let proID = res.data[i].projectId;
                                menu2.on("click", function () {
                                    axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                                    document.getElementById(proID).style.visibility = "hidden";
                                });
                            }
                            let proID = res.data[i].projectId;
                            menu1.on("click", function () {
                                axios.post("/Projects/sendupdateProjectid", { id: proID })
                                window.location.replace('/dashboard/updateProject');
                            });
                            $(menu1).css("cursor", "pointer");
                            $(menu2).css("cursor", "pointer");
                            var projectName = $('<h2>' + res.data[i].projectName.substr(0, 20) + '</h2>');
                            var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                            var pro_dead_head = $('<h4>Project Deadline</h4>');
                            var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                            var proj_lead = $('<h4>Project Leader</h4>');
                            var proj_leader_data = $('<h3>' + res.data[i].teamLeader + '</h3>');
                            var proj_team = $('<h4>Team Members</h4>');
                            var proj_team_data = $('<h3>' + res.data[i].teamMembers + '</h3>');
                            $(projectName).attr('class', 'text-center mt-4');
                            $(projectDescription).attr('class', 'ml-4');
                            $(pro_dead_head).attr('class', 'mt-2 ml-4');
                            $(proj_lead).attr('class', 'mt-2 ml-4');
                            $(proj_team).attr('class', 'mt-2 ml-4');
                            $(proj_dead).attr('class', 'mt-2 ml-4');
                            $(proj_leader_data).attr('class', 'mt-2 ml-4');
                            $(proj_team_data).attr('class', 'mt-2 ml-4');
                            $(cardMenu).attr('class', 'icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            cardMenu.appendTo(myPanel);
                            projectName.appendTo(myPanel);
                            projectDescription.appendTo(myPanel);
                            pro_dead_head.appendTo(myPanel);
                            proj_dead.appendTo(myPanel);
                            proj_lead.appendTo(myPanel);
                            proj_leader_data.appendTo(myPanel);
                            proj_team.appendTo(myPanel);
                            proj_team_data.appendTo(myPanel);
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (project_id !== "" && project_name !== "" && project_type !== "Project Type") {
            document.getElementById('emp_msg').style.display = 'none';
            axios.post('/Projects/searchProjectIdNameType/', { project_id: this.state.search_project_id, project_name: this.state.search_project_name, project_type: this.state.search_project_type })
                .then((res) => {
                    this.setState({ searchProject: res.data });
                    if (res.data.length === 0) {
                        document.getElementById('not_record_msg').style.display = 'block';
                    }
                    else {
                        let row = $('<div class="row"></div>');
                        for (var i = 0; i <= res.data.length; i++) {
                            var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                            $(myCol).attr('height', '350');
                            var cardMenu = $('<div className="col-sm-12"></div>');
                            var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                            menu1.appendTo(cardMenu);
                            if (res.data[i].status === "start") {
                                var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                                menu2.appendTo(cardMenu);
                                let proID = res.data[i].projectId;
                                menu2.on("click", function () {
                                    axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                                    document.getElementById(proID).style.visibility = "hidden";
                                });
                            }
                            let proID = res.data[i].projectId;
                            menu1.on("click", function () {
                                axios.post("/Projects/sendupdateProjectid", { id: proID })
                                window.location.replace('/dashboard/updateProject');
                            });
                            $(menu1).css("cursor", "pointer");
                            $(menu2).css("cursor", "pointer");
                            var projectName = $('<h2>' + res.data[i].projectName.substr(0, 20) + '</h2>');
                            var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                            var pro_dead_head = $('<h4>Project Deadline</h4>');
                            var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                            var proj_lead = $('<h4>Project Leader</h4>');
                            var proj_leader_data = $('<h3>' + res.data[i].teamLeader + '</h3>');
                            var proj_team = $('<h4>Team Members</h4>');
                            var proj_team_data = $('<h3>' + res.data[i].teamMembers + '</h3>');
                            $(projectName).attr('class', 'text-center mt-4');
                            $(projectDescription).attr('class', 'ml-4');
                            $(pro_dead_head).attr('class', 'mt-2 ml-4');
                            $(proj_lead).attr('class', 'mt-2 ml-4');
                            $(proj_team).attr('class', 'mt-2 ml-4');
                            $(proj_dead).attr('class', 'mt-2 ml-4');
                            $(proj_leader_data).attr('class', 'mt-2 ml-4');
                            $(proj_team_data).attr('class', 'mt-2 ml-4');
                            $(cardMenu).attr('class', 'icons');
                            var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"></div></div>');
                            cardMenu.appendTo(myPanel);
                            projectName.appendTo(myPanel);
                            projectDescription.appendTo(myPanel);
                            pro_dead_head.appendTo(myPanel);
                            proj_dead.appendTo(myPanel);
                            proj_lead.appendTo(myPanel);
                            proj_leader_data.appendTo(myPanel);
                            proj_team.appendTo(myPanel);
                            proj_team_data.appendTo(myPanel);
                            myPanel.appendTo(myCol);
                            myCol.appendTo(row);
                            row.appendTo('#card_container');
                        }
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
            <div id='projects'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1 className='mt-4'>Projects</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" style={{ color: '#000', fontWeight: 600 }}>Dashboard</li>
                                <li class="breadcrumb-item active" style={{ color: 'grey' }}>All Projects</li>
                            </ol>
                        </nav>
                    </div>
                    <div className='col-sm-5'></div>
                    <dv className='col-sm-2'>
                        <button type='button' className='btn add_employee ml-5' data-toggle="modal" data-target="#exampleModalCenter" style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}><i class="fas fa-plus mr-2"></i>Create Project</button>
                    </dv>
                </div>
                <form>
                    <div class="row">
                        <div class="col">
                            <input type="text" id="search_proj_id" name="projID" value={this.state.search_project_id} onChange={this.handleSearchProjectId} class="form-control" placeholder="Project ID" />
                        </div>
                        <div class="col">
                            <input type="text" id="search_proj_name" name="projName" value={this.state.search_project_name} onChange={this.handleSearchProjectName} class="form-control" placeholder="Project Name" />
                        </div>
                        <div class="col">
                            <select id="search_project_type" value={this.state.search_project_type} onChange={this.handleSearchProjectType} class="form-control">
                                <option value='Project Type' selected>Project Type</option>
                                <option value='Desktop Application'>Desktop Application</option>
                                <option value='Android Application'>Android Application</option>
                                <option value='WebSite'>WebSite</option>
                            </select>
                        </div>
                        <div class="col">
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
                <div class="alert alert-success alert-dismissible fade show" id="project_complete_alert" role="alert" style={{ display: 'none' }}>
                    <strong>Project Completed Successfully.</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id='card_container'></div>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header" style={{backgroundColor:'rgb(244, 59, 72)'}}>
                                <h1 class="modal-title text-center text-white" id="exampleModalLongTitle">Add Project</h1>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AddProject />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}