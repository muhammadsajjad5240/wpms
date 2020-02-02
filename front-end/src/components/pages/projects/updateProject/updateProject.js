// below we import modules for component
import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import $ from 'jquery';
import '../add_project/add_project.css';
// below we create gloabal variables
let Employees = [];
let obj, projectHistory;
// below we create css for input fields
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
// below we create and component class
class updateProject extends Component {
    // below we create constructor
    constructor(props) {
        super(props);
        // below we bind all the function
        this.handleProjecttName = this.handleProjecttName.bind(this);
        this.handleProjectDescription = this.handleProjectDescription.bind(this);
        this.handleDeadline = this.handleDeadline.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleTeamMember = this.handleTeamMember.bind(this);
        this.handleTeamLeader = this.handleTeamLeader.bind(this);
        this.handleProjectAmount = this.handleProjectAmount.bind(this);
        this.handleProjectType = this.handleProjectType.bind(this);
        this.handleTechnology = this.handleTechnology.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // below we create state to manage data
        this.state = {
            employee_name: [],
            data: [],
            project_name: '',
            project_id: '',
            project_desc: '',
            project_deadline: '',
            project_strt_date: '',
            teamMembers: [],
            teamLeader: '',
            project_amount: '',
            project_type: '',
            technology: '',
            status: 'start'
        }
    }
    // below we create method to check validation and handle project name
    handleProjecttName = (e) => {
        this.setState({ project_name: e.target.value });
        let letters = /^[a-zA-Z ]+$/;
        let project_name = document.getElementById('project_name').value;
        if (!letters.test(project_name)) {
            document.getElementById('project_name').style.border = '1px solid red';
        }
        else {
            document.getElementById('project_name').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation and handle project Description
    handleProjectDescription = (e) => {
        this.setState({ project_desc: e.target.value });
        // let letters = /^[a-zA-Z0-9 ]+$/;
        let project_description = document.getElementById('project_description').value;
        if (project_description.length > 100) {
            document.getElementById('project_description').style.border = '1px solid red';
        }
        else {
            document.getElementById('project_description').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation and handle project Deadline
    handleDeadline = (e) => {
        this.setState({ project_deadline: e.target.value });
        let project_deadline = document.getElementById('project_deadline').value;
        if (project_deadline === "") {
            document.getElementById('project_deadline').style.border = '1px solid red';
        }
        else {
            document.getElementById('project_deadline').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation and handle project start date
    handleStartDate = (e) => {
        this.setState({ project_strt_date: e.target.value });
        let project_strt_date = document.getElementById('start_date').value;
        if (project_strt_date === "") {
            document.getElementById('start_date').style.border = '1px solid red';
        }
        else {
            document.getElementById('start_date').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation and handle team member
    handleTeamMember = (teamMembers) => {
        this.setState({ teamMembers });
    }
    // below we create method to check validation and handle project leader
    handleTeamLeader = (teamLeader) => {
        this.setState({ teamLeader });
    }
    // below we create method to check validation and handle project amount
    handleProjectAmount = (e) => {
        this.setState({ project_amount: e.target.value });
        let letters = /^[0-9]+$/;
        let project_amount = document.getElementById('project_amount').value;
        if (!letters.test(project_amount)) {
            document.getElementById('project_amount').style.border = '1px solid red';
        }
        else {
            document.getElementById('project_amount').style.border = '1px solid grey';
        }
    }
    // below we create method to check validation and handle project type
    handleProjectType = (e) => {
        this.setState({ project_type: e.target.value });
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
            document.getElementById('_other_technology').style.display = 'block';
            document.getElementById('android_application').style.display = 'none';
            document.getElementById('desktop_application').style.display = 'none';
            document.getElementById('web_application').style.display = 'none';
        }
    }
    // below we create method to check validation and handle project technology
    handleTechnology = (e) => {
        this.setState({ technology: e.target.value });
    }
    // below we create method to check validation and handle project status
    handleStatus = (e) => {
        this.setState({ status: e.target.value });
    }
    // below we create method to check validation and submit data to database
    handleSubmit = (e) => {
        e.preventDefault();
        let project_name = document.getElementById('project_name').value;
        let project_description = document.getElementById('project_description').value;
        let project_deadline = document.getElementById('project_deadline').value;
        let project_strt_date = document.getElementById('start_date').value;
        let team_members = document.getElementById('team_members').value;
        let team_leader = document.getElementById('team_leader').value;
        let project_amount = document.getElementById('project_amount').value;
        let projectType = document.getElementById('project_type').value;
        let namePattern = /^[a-zA-Z0-9 ]+$/;
        if (!namePattern.test(project_name)) {
            document.getElementById('project_name').style.border = '1px solid red';
        }
        else if (project_description.length >= 100) {
            document.getElementById('project_description').style.border = '1px solid red';
        }
        else if (project_deadline === "") {
            document.getElementById('project_deadline').style.border = '1px solid red';
        }
        else if (project_strt_date === "") {
            document.getElementById('start_date').style.border = '1px solid red';
        }
        else if (project_amount === '') {
            document.getElementById('project_amount').style.border = '1px solid red';
        }
        else if (projectType === "Project Type") {
            document.getElementById('project_type').style.border = '1px solid red';
        }
        else if (!namePattern.test(team_members)) {
            document.getElementById('team_members').style.border = '1px solid red';
        }
        else if (!namePattern.test(team_leader)) {
            document.getElementById('team_leader').style.border = '1px solid red';
        }
        else {
            axios.post('/Projects/updateProject', {
                id: this.state.project_id,
                projectName: this.state.project_name,
                projectId: this.state.project_id,
                projectDesc: this.state.project_desc,
                projectDeadline: this.state.project_deadline,
                projectStrtDate: this.state.project_strt_date,
                teamMembers: this.state.teamMembers,
                teamLeader: this.state.teamLeader,
                projectAmount: this.state.project_amount,
                projectType: this.state.project_type,
                technology: this.state.technology,
                status: this.state.status
            })
            axios.post('/Projects/updateProjectAmounts', {
                projectId: this.state.project_id,
                projectAmount: this.state.project_amount
            })
                .then(res => {
                    console.log(res.data);
                    let a = res.statusText
                    if (a === "OK") {
                        axios.post('/Projects/addProjectHistory', projectHistory);
                        $("#add_emp_form").hide();
                        document.getElementById('success_alert').style.display = 'block';
                    }
                }
                )
            this.setState({
                project_name: '',
                project_id: '',
                project_desc: '',
                project_deadline: '',
                project_strt_date: '',
                teamMembers: '',
                teamLeader: '',
                project_amount: '',
                project_type: '',
                technology: ''
            })
            window.location.replace('/dashboard/projects');
        }
    }
    // below we create method that will call when the use focus on input feld
    myfocus = (a) => {
        document.getElementById(a).style.border = "1px solid #e3e3e3";
    }
    // below we create method that will call when the component will load
    componentDidMount = () => {
        axios.post('/Employee/getEmployees')
            .then(res => {
                this.setState({ employee_name: res.data });
                // alert(object[2].fullName);
                for (let i = 0; i < this.state.employee_name.length; i++) {
                    console.log(this.state.employee_name[i].fullName);
                    Employees = [
                        { label: this.state.employee_name[0].fullName, value: i + 10 },
                        { label: this.state.employee_name[1].fullName, value: i + 11 },
                        // { label: this.state.employee_name[2].fullName, value: i+12 },
                        // { label: this.state.employee_name[3].fullName, value: i+13 }
                    ];
                }

            });
        axios.post('/Projects/getSpecificProject', {})
            .then(res => {
                this.setState({ data: res.data })
                for (let i in this.state.data) {
                    obj = this.state.data[i];
                };
                console.log(res.data)
                this.setState({ project_name: obj.projectName })
                this.setState({ project_id: obj.projectId })
                this.setState({ project_desc: obj.projectDesc })
                this.setState({ project_deadline: obj.projectDeadline })
                this.setState({ project_strt_date: obj.projectStrtDate })
                this.setState({ teamMembers: obj.teamMembers })
                this.setState({ teamLeader: obj.teamLeader });
                this.setState({ project_amount: obj.projectAmount });
                this.setState({ project_type: obj.projectType });
                this.setState({ technology: obj.technology });
                projectHistory = {
                    projectName: obj.projectName,
                    projectId: obj.projectId,
                    clientName: obj.clientName,
                    // clientId: this.state.project_client_id,
                    projectDesc: obj.projectDesc,
                    projectDeadline: obj.projectDeadline,
                    projectStrtDate: obj.projectStrtDate,
                    teamMembers: obj.teamMembers,
                    teamLeader: obj.teamLeader,
                    projectAmount: obj.projectAmount,
                    projectType: obj.projectType,
                    technology: obj.technology,
                    status: obj.status
                }
                if (this.state.technology === "PHP & Laravel") {
                    document.getElementById('web_application').style.display = 'block';
                    document.getElementById('php_laravel').checked = true;
                }
                else if (this.state.technology === "React & Node") {
                    document.getElementById('web_application').style.display = 'block';
                    document.getElementById('react_node').checked = true;
                }
                else if (this.state.technology === "Angular & Node") {
                    document.getElementById('web_application').style.display = 'block';
                    document.getElementById('angular_node').checked = true;
                }
                else if (this.state.technology === "WordPress") {
                    document.getElementById('web_application').style.display = 'block';
                    document.getElementById('wordpress').checked = true;
                }
                else if (this.state.technology === "c#") {
                    document.getElementById('desktop_application').style.display = 'block';
                    document.getElementById('c#').checked = true;
                }
                else if (this.state.technology === "Java") {
                    document.getElementById('desktop_application').style.display = 'block';
                    document.getElementById('java').checked = true;
                }
                else if (this.state.technology === "Flutter") {
                    document.getElementById('android_application').style.display = 'block';
                    document.getElementById('flutter').checked = true;
                }
                else if (this.state.technology === "Kotlin") {
                    document.getElementById('android_application').style.display = 'block';
                    document.getElementById('Kotlin').checked = true;
                }
                else if (this.state.technology === "Other") {
                    document.getElementById('_other_technology').style.display = 'block';
                    document.getElementById('_other_technology').value = obj.technology;
                }
                this.setState({ status: obj.status });
            })
            .catch(error => { console.log(error) });
    }
    // below is our main render method
    render() {
        return (
            <div id='add_employee' className='container'>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4">
                        <h1 className="mr-1 mt-2" style={{ fontSize: '20px', color: '#000', fontWeight: '600' }}>Update Employee Record</h1>
                    </div>
                </div>
                <form>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="projectName" style={lableStyle}>Porject Name</label>
                            <input type="text" class="form-control" style={inputStyle} id="project_name" name='projecttName' onFocus={() => this.myfocus('project_name')} value={this.state.project_name} onChange={this.handleProjecttName} placeholder="Projecct name" title='Project name' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="projectId" style={lableStyle}>Project ID</label>
                            <input type="text" class="form-control" style={inputStyle} id="proj_id" name='projId' onFocus={() => this.myfocus('proj_id')} value={this.state.project_id} onChange={this.handleEmpId} readOnly placeholder="Employee ID" title='Employee ID' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="project_description" style={lableStyle}>Project Description (max-length: 100 char)</label>
                                <textarea class="form-control" style={inputStyle} id="project_description" name="projectDescription" onFocus={() => this.myfocus('project_description')} rows="1" value={this.state.project_desc} onChange={this.handleProjectDescription} placeholder="Project Description"></textarea>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row mb-3">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="startDate" style={lableStyle}>Project Start Date</label>
                            <input type="date" class="form-control" style={inputStyle} id="start_date" name='startgDate' onFocus={() => this.myfocus('start_date')} value={this.state.project_strt_date} onChange={this.handleStartDate} title="Project Start Date" />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-4">
                            <label for="projectDeadling" style={lableStyle}>Project Deadline</label>
                            <input type="date" class="form-control" style={inputStyle} id="project_deadline" name='projectDeadline' onFocus={() => this.myfocus('project_deadline')} value={this.state.project_deadline} onChange={this.handleDeadline} title='Project Deadline' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="alert alert-success alert-dismissible fade show" id="success_alert" role="alert" style={{ display: 'none' }}>
                        <strong>Client Record Updated Successfully</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" onClick={this.hideAlert}>&times;</span>
                        </button>
                    </div>
                    <div class="form-row mb-3">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="projectAmount" style={lableStyle}>Project Amount</label>
                            <input type="text" class="form-control" style={inputStyle} id="project_amount" name='projectAmount' onFocus={() => this.myfocus('project_amount')} value={this.state.project_amount} onChange={this.handleProjectAmount} placeholder="Project Amount" title='Project Amount' />
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="projectType" style={lableStyle}>Project Type</label>
                                <select class="form-control" id="project_type" style={inputStyle} name="projectType" onFocus={() => this.myfocus('project_type')} value={this.state.project_type} onChange={this.handleProjectType}>
                                    <option value='Project Type' selected>Project Type</option>
                                    <option value='Desktop Application'>Desktop Application</option>
                                    <option value='Android Application'>Android Application</option>
                                    <option value='WebSite'>WebSite</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <div class="form-row mb-3">
                        <div class="col-md-2"></div>
                        <label for="exampleFormControlTextarea1" style={lableStyle}>Technology:</label>
                        <div class="col-md-8" id='desktop_application' style={{ display: 'none' }}>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="desktopApp" id="c#" value="c#" onChange={this.handleTechnology} />
                                <label class="form-check-label" for="c#" style={lableStyle}>C#</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="desktopApp" id="java" value="Java" onChange={this.handleTechnology} />
                                <label class="form-check-label" for="java" style={lableStyle}>Java</label>
                            </div>

                        </div>
                        <div class="col-md-8" id='web_application' style={{ display: 'none' }}>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="webApp" id="php_laravel" value="PHP & Laravel" onChange={this.handleTechnology} />
                                <label class="form-check-label" for="phpLaravel" style={lableStyle}>PHP & Laravel</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="webApp" id="react_node" value="React & Node" onChange={this.handleTechnology} />
                                <label class="form-check-label" for="reactNode" style={lableStyle}>React & Node</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="webApp" id="angular_node" value="Angular & Node" onChange={this.handleTechnology} />
                                <label class="form-check-label" for="angularNode" style={lableStyle}>Angular & Node</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="webApp" id="wordpress" value="wordpress" onChange={this.handleTechnology} />
                                <label class="form-check-label" for="Wordpress" style={lableStyle}>WordPress</label>
                            </div>
                        </div>
                        <div class="col-md-8" id='android_application' style={{ display: 'none' }}>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="androidAapp" id="flutter" value="Flutter" onChange={this.handleTechnology} />
                                <label class="form-check-label" for="flutter" style={lableStyle}>Flutter</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="androidAapp" id="kotlin" value="Kotlin" onChange={this.handleTechnology} />
                                <label class="form-check-label" for="Kotlin" style={lableStyle}>Kotlin</label>
                            </div>
                        </div>
                        <div class="form-row mb-3">
                            <div class="col-md-8" id="other_technology" style={{ display: 'none' }}>
                                <label for="projectDeadling" style={lableStyle}>Project Technology</label>
                                <input type="text" class="form-control" style={inputStyle} id='_other_technology' name="otherTechnology" placeholder="Technology Name" value={this.state.technology} onChange={this.handleTechnology} />
                            </div>
                        </div>
                    </div>
                    <div class="form-row mb-3">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <label for="teamMembers" style={lableStyle}>Team Members</label>
                            <Select options={Employees} isMulti style={inputStyle} id="team_members" name='teamMembers' onFocus={() => this.myfocus('team_members')} value={this.state.teamMembers} onChange={this.handleTeamMember} placeholder="Team Members" title='Team Members' />
                            {/* <input type="text" class="form-control" style={inputStyle} id="team_members" name='teamMembers' onFocus={() => this.myfocus('team_members')} value={this.state.teamMembers} onChange={this.handleTeamMember} placeholder="Team Members" title='Team Members' /> */}
                            <div class="valid-feedback">
                                Looks good!
                                 </div>
                        </div>
                        <div class="col-md-4">
                            <label for="company" style={lableStyle}>Team Leader</label>
                            <Select options={Employees} style={inputStyle} id="team_leader" name='teamLeader' onFocus={() => this.myfocus('team_leader')} value={this.state.teamLeader} onChange={this.handleTeamLeader} placeholder="Team Leader" title='Team Leader' />
                            <div class="valid-feedback">
                                Looks good!
                                     </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <br />
                    <div class="form-row mb-3">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <label for="projectStatus" style={lableStyle}>Project Status</label>
                            <div class="form-check form-check-inline ml-3">
                                <input class="form-check-input" type="radio" checked name="status" id="_status" value="Start" onChange={this.handleStatus} />
                                <label class="form-check-label" for="Start" style={lableStyle}>Start</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="status" id="_status" value="Complete" onChange={this.handleStatus} />
                                <label class="form-check-label" for="Complete" style={lableStyle}>Complete</label>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-sm-3 offset-sm-5 mr-4'>
                            <button class="btn" onClick={this.handleSubmit} style={{ backgroundColor: '#f43b48', color: 'white', fontWeight: 700 }}>Update Project</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
// below we export component
export default updateProject;