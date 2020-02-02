// below we import modules for component
import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import RestoreIcon from '@material-ui/icons/Restore';
import { Delete } from "@material-ui/icons";
// below we create component class
class ProjectHistory extends Component {
    // below we create constructor
    constructor(props) {
        super(props)
        // below we create state to handle data
        this.state = {
            projectHistory: [],
        };
    }
    // below we create method that will call when the component will load
    componentDidMount() {
        // below we send request to the server to get project history
        axios.post('/Projects/getProjectHistory')
            .then(res => {
                // below we set state with data comming from server
                this.setState({ projectHistory: res.data });
            })
            // below we console the error in case of error occur
            .catch(function (error) {
                console.log(error);
            })
    }
    // below we create method to delete the record
    deleteRecord = (id) => {
        let pramerter = id;
        // below we send request to the server to delete the record
        axios.post('/Projects/deleteProjectHistory/',{
          id: pramerter
        })
        .then((res) =>{
            // below we redirect to new url
          window.location.replace('/dashboard/project-history');
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    // below we create method to update the record
    updateRecord = (projectName, projectId, clientName, projectDesc,projectDeadline, projectStrtDate, teamMembers,teamLeader,projectAmount,projectType,technology,status) => {
        let pramerter = projectId;
        // below we send request to the server to update the record
        axios.post('/Projects/updateProjectFromHistory/', {
            projectId: projectId,
            projectName: projectName,
            clientName: clientName,
            projectDesc: projectDesc,
            projectDeadline: projectDeadline,
            projectStrtDate: projectStrtDate,
            teamMembers: teamMembers,
            teamLeader: teamLeader,
            projectAmount: projectAmount,
            projectType: projectType,
            technology: technology,
            status: status,
        })
            .then((res) => {
                window.location.replace('/dashboard/project-history');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // below we create method to style the data table which is default
    getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MUIDataTable: {
                    responsiveScroll: { maxWidth: "100%" },
                    root: {
                    },
                    paper: {
                        boxShadow: "none"
                    }
                },
                MUIDataTableBodyCell: {
                    root: {
                        fontSize: '0.9em',
                        fontWeight: '600'
                    }
                }
            }
        });
        // below is our main render method
    render() {
        // below we create columns for constructor
        const columns = ["ID", "Name", "Client Name", "Deadline","Leader", "Amount","Technology", "Revert", "Delete"];
        const options = {
            filter: false,
            responsive: "scroll",
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15, 25, 100],
            selectableRows: 'single',
            selectableRowsOnClick: false,

        };
        return (
            <div>
                <br />
                <div className='row'>
                    <div className='col-sm-12 col-lg-12'>
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Project History"}
                                data={this.state.projectHistory.map(record => {
                                    return [
                                        record.projectId,
                                        record.projectName.substr(0, 20),
                                        record.clientName.substr(0, 20),
                                        record.projectDeadline,
                                        record.teamLeader.substr(0, 20),
                                        record.projectAmount.toString().substr(0, 6),
                                        record.technology,
                                        // <Link to={'/dashboard/update-slip?id=' + record.clientId}>
                                            <IconButton >
                                            <RestoreIcon title="Revert"  onClick={() => this.updateRecord(record.projectName, record.projectId, record.clientName, record.projectDesc,
                                                record.projectDeadline, record.projectStrtDate, record.teamMembers,record.teamLeader,record.projectAmount,
                                                record.projectType,record.technology,record.status)} />
                                        </IconButton>,
                                        // </Link>,
                                        <IconButton >
                                            <Delete onClick={() => this.deleteRecord(record.projectId)}/>
                                        </IconButton>
                                    ]
                                })}
                                columns={columns}
                                options={options}
                            />
                        </MuiThemeProvider> <br /> <br />
                    </div>
                </div>
            </div>
        );
    }
}
// below we export component
export default ProjectHistory;