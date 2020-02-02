import React, { Component } from 'react';
import $ from 'jquery';
let axios = require('axios');
class ClientProject extends Component {
    componentDidMount = () => {
        axios.post('/Client/getClientProject')
            .then(res => {
                this.setState({ projects: res.data });
                console.log(res.data);
                for (var i = 0; i <= res.data.length; i++) {
                    var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
                    $(myCol).attr('height', '370');                    
                    var cardMenu = $('<div className="col-sm-12"></div>');
                    var menu1 = $('<i class="fas fa-pencil-alt actionicon" id="_eidt" title="Edit"></i>');
                    var menu2 = $('<a><i class="fas fa-check edit_icon pl-3 actionicon" title="Complete" id="' + res.data[i].projectId + '"></i></a>');
                    menu1.appendTo(cardMenu);
                    menu2.appendTo(cardMenu);
                    let proID = res.data[i].projectId;
                    if(res.data[i].status === "complete"){
                    $(menu2).css("visibility", "hidden");
                    }
                    menu2.on("click", function () {
                        axios.post("/Projects/updateProjectStatus", { id: proID, status: "complete" })
                        document.getElementById(proID).style.display = 'none'
                    });
                    menu1.on("click", function () {
                        axios.post("/Projects/sendupdateProjectid", { id: proID })
                        window.location.replace('/dashboard/updateProject');
                    });
                    $(menu1).css("cursor", "pointer");
                    $(menu2).css("cursor", "pointer");
                    var projectName = $('<h2>' + res.data[i].projectName + '</h2>');
                    var projectDescription = $('<p>' + res.data[i].projectDesc.substr(0, 100) + '</p>');
                    var pro_dead_head = $('<h4>Project Deadline</h4>');
                    var proj_dead = $('<h3>' + res.data[i].projectDeadline + '</h3>');
                    var proj_lead = $('<h4>Project Leader</h4>');
                    var proj_leader_data = $('<h3>' + res.data[i].teamLeader + '</h3>');
                    var proj_team = $('<h4>Team Members</h4>');
                    var proj_team_data = $('<h3>' + res.data[i].teamMembers + '</h3>');
                    var proj_status = $('<h4>Project Status</h4>');
                    var proj_status_data = $('<h3>' + res.data[i].status + '</h3>');
                    $(projectName).attr('class', 'text-center mt-4');
                    $(projectDescription).attr('class', 'ml-4');
                    $(pro_dead_head).attr('class', 'mt-2 ml-4');
                    $(proj_lead).attr('class', 'mt-2 ml-4');
                    $(proj_team).attr('class', 'mt-2 ml-4');
                    $(proj_status).attr('class', 'mt-2 ml-4');
                    $(proj_dead).attr('class', 'mt-2 ml-4');
                    $(proj_leader_data).attr('class', 'mt-2 ml-4');
                    $(proj_status_data).attr('class', 'mt-2 ml-4');
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
                    proj_status.appendTo(myPanel);
                    proj_status_data.appendTo(myPanel);
                    myPanel.appendTo(myCol);
                    myCol.appendTo('#client_projects');
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <div id="client_projects">

                </div>
            </div>
        );
    }
}
export default ClientProject;