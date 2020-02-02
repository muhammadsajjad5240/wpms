// below we import modules for component
import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import './add_project.css';
import Select from 'react-select';
// below we create some global variables
let obj, object = [];
let Employees = [];
const lableStyle = {
    color: '#000',
    fontSize: '14px',
    fontWeight: '700'
};
// below we create css for input fields
const inputStyle = {
    color: '#000',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #ced4da'
};
// below we create component class
class AddProject extends Component {
    // below we create constructor
    constructor(props) {
        super(props);
        // below we bind all the function
        this.handleProjecttName = this.handleProjecttName.bind(this);
        this.handleProjectDescription = this.handleProjectDescription.bind(this);
        this.handleProjectDeadline = this.handleProjectDeadline.bind(this);
        this.handleProjectStartDate = this.handleProjectStartDate.bind(this);
        this.handleProjectTeamMember = this.handleProjectTeamMember.bind(this);
        this.handleProjectTeamLeader = this.handleProjectTeamLeader.bind(this);
        this.handleProjectAmount = this.handleProjectAmount.bind(this);
        this.handleProjectType = this.handleProjectType.bind(this);
        this.handleProjectTechnology = this.handleProjectTechnology.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // below we create state to handle data
        this.state = {
            add_project_name: '',
            add_project_id: '',
            add_project_client_names: [],
            add_employee_name: [],
            add_project_client_name: '',
            add_project_client_id: '',
            add_project_desc: '',
            add_project_deadline: '',
            add_project_strt_date: '',
            add_teamMembers: [],
            add_teamLeader: '',
            add_project_amount: '',
            add_project_type: '',
            add_technology: '',
            add_status: 'start'
        }
    }
    // below we create method that will check validation and handle project name
    handleProjecttName = (e) => {
        this.setState({ add_project_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let project_name = document.getElementById('project_name').value;
        if (!letters.test(project_name)) {
            document.getElementById('project_name').style.border = '1px solid red';
        }
        else {
            document.getElementById('project_name').style.border = '1px solid grey';
        }
    }
    // below we create method that will check validation and handle projec client name
    handleProjectClientName = (e) => {
        this.setState({ add_project_client_name: e.target.value });
        let project_client_name = document.getElementById('client_name').value;
        document.getElementById('not_client_name').style.display = 'none';
        if (project_client_name === "Client Name" || project_client_name === "Not Present") {
            document.getElementById('client_name').style.border = '1px solid red';
            document.getElementById('not_client_name').style.display = 'block';
        }
        else {
            document.getElementById('client_name').style.border = '1px solid grey';
        }
    }
    // below we create method that will check validation and handle project description    
    handleProjectDescription = (e) => {
        this.setState({ add_project_desc: e.target.value });
        // let letters = /^[a-zA-Z0-9 ]+$/;
        let project_description = document.getElementById('project_description').value;
        if (project_description.length > 100) {
            document.getElementById('project_description').style.border = '1px solid red';
        }
        else {
            document.getElementById('project_description').style.border = '1px solid grey';
        }
    }
    // below we create method that will check validation and handle project deadline
    handleProjectDeadline = (e) => {
        this.setState({ add_project_deadline: e.target.value });
        let project_deadline = document.getElementById('project_deadline').value;
        if (project_deadline === "") {
            document.getElementById('project_deadline').style.border = '1px solid red';
        }
        else {
            document.getElementById('project_deadline').style.border = '1px solid grey';
        }
    }
    // below we create method that will check validation and handle project start date
    handleProjectStartDate = (e) => {
        this.setState({ add_project_strt_date: e.target.value });
        let project_strt_date = document.getElementById('start_date').value;
        if (project_strt_date === "") {
            document.getElementById('start_date').style.border = '1px solid red';
        }
        else {
            document.getElementById('start_date').style.border = '1px solid grey';
        }
    }
    // below we create method that will check validation and handle project team mebers
    handleProjectTeamMember = add_teamMembers => {
        this.setState({ add_teamMembers });
    }
    // below we create method that will check validation and handle project leader
    handleProjectTeamLeader = (add_teamLeader) => {
        this.setState({ add_teamLeader });
    }
    // below we create method that will check validation and handle project amount
    handleProjectAmount = (e) => {
        this.setState({ add_project_amount: e.target.value });
        let letters = /^[0-9]+$/;
        let project_amount = document.getElementById('project_amount').value;
        if (!letters.test(project_amount)) {
            document.getElementById('project_amount').style.border = '1px solid red';
        }
        else {
            document.getElementById('project_amount').style.border = '1px solid grey';
        }
    }
    // below we create method that will check validation and handle project type
    handleProjectType = (e) => {
        this.setState({ add_project_type: e.target.value });
        let projectType = document.getElementById('project_type').value;
        if (projectType === "Desktop Application") {
            document.getElementById('desktop_application').style.display = 'block';
            document.getElementById('web_application').style.display = 'none';
            document.getElementById('android_application').style.display = 'none';
            document.getElementById('other_technology').style.display = 'none';
        }
        else if (projectType === "WebSite") {
            document.getElementById('web_application').style.display = 'block';
            document.getElementById('desktop_application').style.display = 'none';
            document.getElementById('android_application').style.display = 'none';
            document.getElementById('other_technology').style.display = 'none';
        }
        else if (projectType === "Android Application") {
            document.getElementById('android_application').style.display = 'block';
            document.getElementById('desktop_application').style.display = 'none';
            document.getElementById('web_application').style.display = 'none';
            document.getElementById('other_technology').style.display = 'none';
        }
        else if (projectType === "Other") {
            document.getElementById('other_technology').style.display = 'block';
            document.getElementById('android_application').style.display = 'none';
            document.getElementById('desktop_application').style.display = 'none';
            document.getElementById('web_application').style.display = 'none';
        }
    }
    // below we create method that will check validation and handle project technology
    handleProjectTechnology = (e) => {
        this.setState({ add_technology: e.target.value });
        let technology = document.getElementById('technology').value;
        if (technology === '') {
            document.getElementById('technology').style.display = 'block';
        }
        else {
            document.getElementById('technology').style.border = '1px solid grey';
        }
    }
    // below we create method that will check validation and handle project status
    handleProjectStatus = (e) => {
        this.setState({ add_status: e.target.value });
    }
    // below we create method that will check validation and submit data to database
    handleSubmit = (e) => {
        e.preventDefault();
        let project_name = document.getElementById('project_name').value;
        let project_description = document.getElementById('project_description').value;
        let project_deadline = document.getElementById('project_deadline').value;
        let project_strt_date = document.getElementById('start_date').value;
        // let team_members = document.getElementById('team_members').value;
        let team_leader = this.state.add_teamLeader.label;
        let project_amount = document.getElementById('project_amount').value;
        let projectType = document.getElementById('project_type').value;
        let technology = document.getElementById('technology').value;
        let project_client_name = document.getElementById('client_name').value;
        let namePattern = /^[a-zA-Z0-9 ]+$/;
        if (!namePattern.test(project_name)) {
            document.getElementById('project_name').style.border = '1px solid red';
        }
        else if (project_client_name === "Client Name" || project_client_name === "Not Present") {
            document.getElementById('client_name').style.border = '1px solid red';
            document.getElementById('not_client_name').style.display = 'block';
        }
        else if (project_description.length >= 100) {
            document.getElementById('project_description').style.border = '1px solid red';
        }
        else if (project_strt_date === "") {
            document.getElementById('start_date').style.border = '1px solid red';
        }
        else if (project_deadline === "") {
            document.getElementById('project_deadline').style.border = '1px solid red';
        }
        else if (project_amount === '') {
            document.getElementById('project_amount').style.border = '1px solid red';
        }
        else if (projectType === "Project Type") {
            document.getElementById('project_type').style.border = '1px solid red';
        }
        else if (this.state.add_technology === "") {
            alert("Please Select the project technology");
        }
        // else if (team_leader.length === 0) {
        //     document.getElementById('team_leader').style.border = '1px solid red';
        // }
        else {
            let newProject = {
                projectName: this.state.add_project_name,
                projectId: this.state.add_project_id,
                clientName: this.state.add_project_client_name,
                projectDesc: this.state.add_project_desc,
                projectDeadline: this.state.add_project_deadline,
                projectStrtDate: this.state.add_project_strt_date,
                teamMembers: this.state.add_teamMembers,
                teamLeader: this.state.add_teamLeader,
                projectAmount: this.state.add_project_amount,
                projectType: this.state.add_project_type,
                technology: this.state.add_technology,
                status: this.state.add_status
            }
            let newProjectAmount = {
                projectName: this.state.add_project_name,
                projectId: this.state.add_project_id,
                clientName: this.state.add_project_client_name,
                projectDesc: this.state.add_project_desc,
                projectDeadline: this.state.add_project_deadline,
                projectStrtDate: this.state.add_project_strt_date,
                projectAmount: this.state.add_project_amount,
                paid: '',
                paymentType: '',
                projectType: this.state.add_project_type,
                technology: this.state.add_technology,
            }
            // below we send request to  the server to store data in database
            axios.post('/Projects/addProject', newProject)
                .then(res =>
                    console.log(res.data))
            // below we send request to  the server to store data in database
            axios.post('/Projects/addProjectAmount', newProjectAmount)
                .then(res =>
                    console.log(res.data))
            this.setState({
                add_project_name: '',
                add_project_id: '',
                add_project_client_name: '',
                add_project_desc: '',
                add_project_deadline: '',
                add_project_strt_date: '',
                add_teamMembers: '',
                add_teamLeader: '',
                add_project_amount: '',
                add_project_type: '',
                add_technology: ''
            })
            window.location.replace('/dashboard/projects');
        }
    }
    // below we create method that will call when the user will focus on input field
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid #e3e3e3";
    }
    // belwo we create method that will call when the component will load
    componentDidMount = () => {
        let length = 4;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        this.setState({ add_project_id: text });
        axios.post('/Projects/getProjectClients')
            .then(res => {
                this.setState({ add_project_client_names: res.data });
            });
        axios.post('/Employee/getEmployees')
            .then(res => {
                this.setState({ add_employee_name: res.data });
                // if (!res.data.length === 0) {
                    for (let i = 0; i < this.state.add_employee_name.length; i++) {
                        Employees = [
                            { label: this.state.add_employee_name[i].fullName, value: i + 10 },
                            // { label: this.state.employee_name[1].fullName, value: i + 11 },
                            // { label: this.state.employee_name[1].fullName, value: i + 12 },
                            // { label: this.state.employee_name[i].fullName, value: i + 13 }
                        ];
                    }
                // }

            });
    }
    // below is our main render method
    render() {
        return (
            <div id='add_project'>
                <form>
                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="projectName" style={lableStyle}>Porject Name</label>
                            <input type="text" class="form-control" maxLength='20' style={inputStyle} id="project_name" name='projecttName' onFocus={() => this.myfocus('project_name')} value={this.state.add_project_name} onChange={this.handleProjecttName} placeholder="Projecct name" title='Project name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="projectId" style={lableStyle}>Project ID</label>
                            <input type="text" class="form-control" style={inputStyle} id="proj_id" name='projId' onFocus={() => this.myfocus('proj_id')} value={this.state.add_project_id} onChange={this.handleEmpId} readOnly placeholder="Employee ID" title='Employee ID' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                    </div>
                    <div class="alert alert-danger alert-dismissible fade show" id="not_client_name" role="alert" style={{ display: 'none' }}>
                        <strong>Sign Up If You Are New Client!</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="projectType" style={lableStyle}>Client Name</label>
                                <select class="form-control" id="client_name" style={inputStyle} name="clientName" onFocus={() => this.myfocus('client_name')} value={this.state.add_project_client_name} onChange={this.handleProjectClientName}>
                                    <option value='Client Name' selected>Client Name</option>
                                    <option value='Not Present'>Not Present</option>
                                    {this.state.add_project_client_names.map(function (client, index) {
                                        return <option key={index}>{client.fullName}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="project_description" style={lableStyle}>Project Description (max-length: 100 char)</label>
                                <textarea class="form-control" id="project_description" name="projectDescription" onFocus={() => this.myfocus('project_description')} rows="1" value={this.state.add_project_desc} onChange={this.handleProjectDescription} placeholder="Project Description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="startDate" style={lableStyle}>Project Start Date</label>
                            <input type="date" class="form-control" style={inputStyle} id="start_date" name='startgDate' onFocus={() => this.myfocus('start_date')} value={this.state.add_project_strt_date} onChange={this.handleProjectStartDate} title="Project Start Date" />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-6">
                            <label for="projectDeadling" style={lableStyle}>Project Deadline</label>
                            <input type="date" class="form-control" style={inputStyle} id="project_deadline" name='projectDeadline' onFocus={() => this.myfocus('project_deadline')} value={this.state.add_project_deadline} onChange={this.handleProjectDeadline} title='Project Deadline' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>

                    </div>
                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="projectAmount" style={lableStyle}>Project Amount</label>
                            <input type="text" class="form-control" maxLength="7" style={inputStyle} id="project_amount" name='projectAmount' onFocus={() => this.myfocus('project_amount')} value={this.state.add_project_amount} onChange={this.handleProjectAmount} placeholder="Project Amount" title='Project Amount' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="projectType" style={lableStyle}>Project Type</label>
                                <select class="form-control" id="project_type" style={inputStyle} name="projectType" onFocus={() => this.myfocus('project_type')} value={this.state.add_project_type} onChange={this.handleProjectType}>
                                    <option value='Project Type' selected>Project Type</option>
                                    <option value='Desktop Application'>Desktop Application</option>
                                    <option value='Android Application'>Android Application</option>
                                    <option value='WebSite'>WebSite</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12" id='desktop_application' style={{ display: 'none' }}>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={inputStyle} name="desktopApp" id="technology" value="c#" onChange={this.handleProjectTechnology} />
                                <label class="form-check-label" for="c#" style={lableStyle}>C#</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={inputStyle} name="desktopApp" id="technology" value="Java" onChange={this.handleProjectTechnology} />
                                <label class="form-check-label" for="java" style={lableStyle}>Java</label>
                            </div>

                        </div>
                        <div class="col-md-12" id='web_application' style={{ display: 'none' }}>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={inputStyle} name="webApp" id="technology" value="PHP & Laravel" onChange={this.handleProjectTechnology} />
                                <label class="form-check-label" for="phpLaravel" style={lableStyle}>PHP & Laravel</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={inputStyle} name="webApp" id="technology" value="React & Node" onChange={this.handleProjectTechnology} />
                                <label class="form-check-label" for="reactNode" style={lableStyle}>React & Node</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={inputStyle} name="webApp" id="technology" value="Angular & Node" onChange={this.handleProjectTechnology} />
                                <label class="form-check-label" for="angularNode" style={lableStyle}>Angular & Node</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={inputStyle} name="webApp" id="technology" value="wordpress" onChange={this.handleProjectTechnology} />
                                <label class="form-check-label" for="Wordpress" style={lableStyle}>WordPress</label>
                            </div>
                        </div>
                        <div class="col-md-12" id='android_application' style={{ display: 'none' }}>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={inputStyle} name="androidAapp" id="technology" value="Flutter" onChange={this.handleProjectTechnology} />
                                <label class="form-check-label" for="flutter" style={lableStyle}>Flutter</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" style={inputStyle} name="androidAapp" id="technology" value="Kotlin" onChange={this.handleProjectTechnology} />
                                <label class="form-check-label" for="Kotlin" style={lableStyle}>Kotlin</label>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-12" id="other_technology" style={{ display: 'none' }}>
                                <label for="projectDeadling" style={lableStyle}>Project Deadline</label>
                                <input type="text" class="form-control" id='technology' style={inputStyle} name="otherTechnology" placeholder="Technology Name" value={this.state.add_technology} onChange={this.handleProjectTechnology} />
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="teamMembers" style={lableStyle}>Team Members</label>
                            {/* {this.state.project_client_names.map(function (client, index) {
                                return <Select options={client.fullName} key={index} isMulti />
                            })} */}
                            <Select options={Employees} isMulti value={this.state.add_teamMembers} onChange={this.handleProjectTeamMember} id="team_members" />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-6">
                            <label for="company" style={lableStyle}>Team Leader</label>
                            <Select options={Employees} value={this.state.add_teamLeader} onChange={this.handleProjectTeamLeader} id="team_leader" />
                            {/* <input type="text" class="form-control" id="team_leader" style={inputStyle} name='teamLeader' onFocus={() => this.myfocus('team_leader')} value={this.state.teamLeader} onChange={this.handleTeamLeader} placeholder="Team Leader" title='Team Leader' /> */}
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                    </div>
                    <br />
                    <div class="form-row">
                        <div class="col-md-12">
                            <label for="projectStatus" style={lableStyle}>Project Status</label>
                            <div class="form-check form-check-inline ml-3">
                                <input class="form-check-input" type="radio" checked name="status" id="_status" value="Start" onChange={this.handleProjectStatus} />
                                <label class="form-check-label" for="Start" style={lableStyle}>Start</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" disabled type="radio" name="status" id="_status" value="End" onChange={this.handleProjectStatus} />
                                <label class="form-check-label" for="End" style={lableStyle}>End</label>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-sm-3 offset-sm-4 mr-4'>
                            <button class="btn" onClick={this.handleSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Add Project</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
// below we export the component
export default AddProject;